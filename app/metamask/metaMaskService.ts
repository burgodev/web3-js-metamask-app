import Web3 from "web3";

const getMetaMaskProvider = async () => {
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

export default getMetaMaskProvider;
