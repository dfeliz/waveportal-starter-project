import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import ethereumIcon from "./assets/ethereum.png";
import './App.css';

export default function App() {
  const [donations, _setDonations] = useState("0");
  const [quantity, _setQuantity] = useState("");

  const addDonation = () => {
    const sum = Number(donations) + Number(quantity);
    _setDonations(sum.toFixed(8).toString());
  }

  const checkIfWalletIsConnected = () => {
    /*
    * First make sure we have access to window.ethereum
    */
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
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
          Donations app!
        </div>

        <div className="bio">
          This is an example donations app, just to learn how does this work.
        </div>

        <div className="bio">
          Total donations until now: {donations}
        </div>

        <div className="actionsContainer">
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
        </div>
      </div>
    </div>
  );
}
