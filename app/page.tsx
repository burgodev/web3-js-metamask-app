"use client";

import { useState } from "react";
import {
  getMetaMaskProvider,
  getBalance,
  transfer,
} from "./metamask/metaMaskService";

export default function Home() {
  const [message, setMessage] = useState("");
  const [address, setAddress] = useState<string | undefined>(undefined);

  const handleGetBalance = async () => {
    const balance = await getBalance();
    setMessage(balance.toString());
  };

  const handleTransfer = async () => {
    const transferMessage = await transfer(
      "0xbcbf7fda3ef5dc7aff7ed77ec903201fab7eed4a",
      "0.0001"
    ); // TODO: dynamic values
    setMessage(transferMessage[0].toString());
  };

  const handleLogin = async () => {
    const web3 = await getMetaMaskProvider();

    const address = await web3.eth.requestAccounts();

    setAddress(address[0]);
  };

  return (
    <div className="flex flex-col justify-between items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-orbitron bg-gradient-to-b from-gray-900 to-black text-white">
      <header className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <h1 className="text-[48px]">Metamask Wallet</h1>
      </header>
      <main className="flex gap-8 row-start-2 items-center sm:items-start">
        {!address && (
          <button
            onClick={handleLogin}
            className="rounded-lg bg-gradient-to-r from-blue-900 to-blue-500 text-white px-6 py-3 hover:from-blue-800 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Login on MetaMask
          </button>
        )}
        {address && (
          <div className="flex gap-4 items-center">
            <div>
              <button
                onClick={() => handleGetBalance()}
                className="rounded-lg bg-gradient-to-r from-blue-900 to-blue-500 text-white px-6 py-3 hover:from-blue-800 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Get Balance
              </button>

              {message}
            </div>
            <button
              onClick={() => handleTransfer()}
              className="rounded-lg bg-gradient-to-r from-blue-900 to-blue-500 text-white px-6 py-3 hover:from-blue-800 hover:to-blue-400 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Transfer
            </button>
          </div>
        )}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Powered by @burgoDev</p>
      </footer>
    </div>
  );
}
