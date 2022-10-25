import React, { useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { useMoralis } from 'react-moralis';

export default function ManualHeader() {
  const { enableWeb3, account, isWeb3Enabled, Moralis, deactivateWeb3 } =
    useMoralis();
  useEffect(() => {
    console.log('Running in startup');
    if (isWeb3Enabled) return;
    if (localStorage.getItem('connected')) {
      enableWeb3();
    }
  }, [isWeb3Enabled]);
  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      if (account == null) {
        deactivateWeb3();
        localStorage.removeItem('connected');
        console.log('No account connected');
      }
    });
  });
  return (
    <div>
      {account ? (
        <div className="title">
          Connected to account {account.slice(0, 6)}...
          {account.slice(account.length - 4)}
        </div>
      ) : (
        <button
          onClick={async () => {
            await enableWeb3();
            localStorage.setItem('connected', 'injected');
          }}
        >
          Connect
        </button>
      )}

      <style jsx>
        {`
          button{
            padding:18px,
            margin:4px
          }
      `}
      </style>
    </div>
  );
}
