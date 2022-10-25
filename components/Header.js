import React from 'react';
import { ConnectButton } from 'web3uikit';
export default function Header() {
  return (
    <div className="border-b-2 font-bold flex flex-box">
      <h2 className=" px-4 py-4 text-3xl"> Hardhat FundMe</h2>
      <div className="ml-auto py-2 px-4">
        <ConnectButton moralisAuth={false} />
      </div>
    </div>
  );
}
