import { useState } from "react";
import { ethers } from "ethers";
import abi from "./utils/DonationPortal.json";

export const useWeb3Integration = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  
  const { ethereum } = window;
  let contractAddress, contractABI, provider, signer, donationContract

  if (ethereum) {
    contractAddress = "0x3bB8158C1c2eca83F7DD6eC925B3329eFC980Bbe";
    contractABI = abi.abi;
  
    provider = new ethers.providers.Web3Provider(ethereum);
    signer = provider.getSigner();
    donationContract = new ethers.Contract(contractAddress, contractABI, signer);
  }


  const checkIfWalletIsConnected = async () => {
    try {
      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      const accounts = await ethereum.request({ method: 'eth_accounts' });

      if (accounts.length !== 0) {
        const account = accounts[0];
        console.log("Found an authorized account:", account);
        setCurrentAccount(account)
      } else {
        console.log("No authorized account found")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error)
    }
  }

  const donate = async (quantity) => {
    try {
      if (ethereum) {
        let count = await donationContract.donate(quantity);
        console.log("Retrieved total donations...", count.toNumber());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getTotal = async () => {
    try {
      if (ethereum) {
        const donationContract = new ethers.Contract(contractAddress, contractABI, signer);
        return (await donationContract.getTotal());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  const getDonations = async () => {
    try {
      if (ethereum) {
        const donationContract = new ethers.Contract(contractAddress, contractABI, signer);
        return (await donationContract.getDonations());
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
    }
  }

  checkIfWalletIsConnected();

  return { connectWallet, currentAccount, donate, getTotal, getDonations };
}
