import React, { useState } from 'react';
import { useMoralis, useWeb3Contract } from 'react-moralis';
import { abi, contractAddressess } from '../constants';
import { useEffect } from 'react';
import { ethers } from 'ethers';
import { useNotification } from 'web3uikit';
export default function LotteryEntrance() {
  const { chainId: hexChainId, isWeb3Enabled } = useMoralis();
  const [entranceFee, setEntranceFee] = useState(0);
  const [latestWinner, setLatestWinner] = useState(0);
  const [numPlayers, setNumPlayers] = useState(0);

  const chainId = parseInt(hexChainId);

  const dispatch = useNotification();

  const raffleAddress =
    chainId in contractAddressess ? contractAddressess[chainId][0] : null;
  const {
    runContractFunction: enterRaffle,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'enterInLottery',
    params: {},
    msgValue: entranceFee,
  });
  const { runContractFunction: minAmountToEnter } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'getRequiredAmountToEnter',
    params: {},
  });
  /**
   * @hook
   * @description this hooks is for getting number of players in lottery
   */
  const { runContractFunction: getNumPlayers } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'getNumberOfPlayers',
    params: {},
  });

  /**
   * @description this is for getting latest winner
   */
  const { runContractFunction: getLatestWinner } = useWeb3Contract({
    abi,
    contractAddress: raffleAddress,
    functionName: 'getLatestWinner',
    params: {},
  });

  const fetch = async () => {
    const amount = (await minAmountToEnter()).toString();
    const numPlayers = (await getNumPlayers()).toString();
    const latestWinner = (await getLatestWinner()).toString();
    console.log('Min:' + amount);
    setEntranceFee(amount);
    setNumPlayers(numPlayers);
    setLatestWinner(latestWinner);
  };
  useEffect(() => {
    if (isWeb3Enabled) {
      console.log(raffleAddress);

      fetch();
    }
  }, [isWeb3Enabled]);
  const handleSuccess = async (tx) => {
    await tx.wait(1);
    handleNotitification();
    fetch();
  };

  const handleNotitification = () => {
    dispatch({
      title: 'Entrance Sucess',
      type: 'success',
      icon: 'bell',
      position: 'topR',
    });
  };
  return (
    <div className="p-5 flex flex-box">
      {raffleAddress ? (
        <div>
          <button
            disabled={isLoading || isFetching}
            className="py-2  px-4 ml-auto bg-blue-500 hover:bg-blue-800 rounded text-white"
            onClick={async () => {
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (err) => console.log(err),
              });
            }}
          >
            {isLoading || isFetching ? (
              <div className="animate-spin spinner-border w-8 h-8 border-b-2 rounded-full"></div>
            ) : (
              <div> Enter Raffle</div>
            )}
          </button>
          <div>
            Lottery Entrance Fee : {ethers.utils.formatUnits(entranceFee)} ETH
          </div>
          <div>Number of players : {numPlayers}</div>
          <div> Latest Winner : {latestWinner}</div>
        </div>
      ) : (
        <div>No Account Connected</div>
      )}
    </div>
  );
}
