"use client";

import { useState } from "react";
import {
  getMetaMaskProvider,
  getBalance,
  transfer,
} from "./metamask/metaMaskService";

export default function Home() {
  const [message, setMessage] = useState("");

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

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <button onClick={() => getMetaMaskProvider()} className="rounded">
          Get MetaMask
        </button>
        <button onClick={() => handleGetBalance()} className="rounded">
          Get Balance
        </button>
        <button onClick={() => handleTransfer()} className="rounded">
          Transfer
        </button>
        {message}
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Powered by @burgoDev</p>
      </footer>
    </div>
  );
}
