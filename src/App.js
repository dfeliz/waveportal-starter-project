import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ethereumIcon from "./assets/ethereum.png";
import './App.css';

export default function App() {
  const [donations, _setDonations] = useState("0");
  const [quantity, _setQuantity] = useState("");
  const [currentAccount, setCurrentAccount] = useState("");

  const addDonation = () => {
    const sum = Number(donations) + Number(quantity);
    _setDonations(sum.toFixed(8).toString());
  }

  const checkIfWalletIsConnected = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        console.log("Make sure you have metamask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);
      }

      /*
      * Check if we're authorized to access the user's wallet
      */
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

  /**
  * Implement your connectWallet method here
  */
  const connectWallet = async () => {
    try {
      const { ethereum } = window;

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

  const setQuantity = (number) => {
    const string = Number(number).toFixed(8).toString();
    console.log(string);
    _setQuantity(string);
  }

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [])

  return (
    <div className="mainContainer">

      <div className="dataContainer">
        <div className="header">
          Ethereum donations
        </div>

        <div className="bio">
          This is an example donations app, just to learn how does this work.
        </div>

        <div className="bio">
          <p>
            Total donations until now: {donations}
          </p>
          <div className="currency">
            <img
              className="icon"
              src={ethereumIcon}
            />
            <p>ETH</p>
          </div>
        </div>

        <div className="actionsContainer">
          {!currentAccount ? (
            <button className="waveButton" onClick={connectWallet}>
              Connect Wallet
          </button>
          ) : (
            <>
              <input
                type="number"
                className="input"
                value={quantity}
                step="0.00000001"
                placeholder="0.00000001"
                onChange={(e) => setQuantity(e.target.value)}
                onInput={(e) => setQuantity(e.target.value)}
              >
              </input>
              <img
                className="icon"
                src={ethereumIcon}
              />
              <p>ETH</p>
              <button className="waveButton" onClick={addDonation}>
                Donate
            </button>
          </>
        )}
        </div>
        { currentAccount && (<p className="bio">Connected with {currentAccount}</p>) }
      </div>
    </div>
  );
}
