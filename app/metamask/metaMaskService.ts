import Web3 from "web3";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ethereum: any;
  }
}

export const getMetaMaskProvider = async () => {
  if (!window.ethereum) {
    throw new Error("MetaMask not found!");
  }

  const web3 = new Web3(window.ethereum);

  try {
    const accounts = await web3.eth.requestAccounts();

    if (!accounts || !accounts.length) {
      throw new Error("Permission required!");
    }

    console.log("accounts", accounts);
  } catch (e) {
    alert(e.message);
  }

  return web3;
};

export const getBalance = async () => {
  const web3 = await getMetaMaskProvider();
  const accounts = await web3.eth.requestAccounts();

  const balance = await web3.eth.getBalance(accounts[0]);

  return web3.utils.fromWei(balance, "ether");
};

export const transfer = async (to: string, quantity: string) => {
  const web3 = await getMetaMaskProvider();
  const accounts = await web3.eth.requestAccounts();
  const from = accounts[0];
  const value = web3.utils.toWei(quantity, "ether");
  const nonce = await web3.eth.getTransactionCount(from, "latest");

  const transaction = {
    from,
    to,
    value,
    gas: 21000,
    nonce,
  };

  const tx = await web3.eth.sendTransaction(transaction);

  return tx.transactionHash;
};
