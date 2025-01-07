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

export const getBalance = async (address: string) => {
  const web3 = await getMetaMaskProvider();
  const balance = await web3.eth.getBalance(address);
  return balance;
};
