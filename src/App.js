import React, { useState, useEffect } from "react";
import ethereumIcon from "./assets/ethereum.png";
import { useWeb3Integration } from "./useWeb3Integration";
import './App.css';

export default function App() {
  const [donationsTotal, setDonationsTotal] = useState("0");
  const [donationQuantity, setDonationQuantity] = useState("0");
  const [inputValue, _setInputValue] = useState("");
  const { connectWallet, currentAccount, donate, getTotal, getDonations } = useWeb3Integration();

  const refreshDonationsTotal = async () => {
    const total = await getTotal();
    setDonationsTotal(total.toString());
  }

  const refreshDonationQuantity = async () => {
    const total = await getDonations();
    setDonationQuantity(total.toString());
  }

  useEffect(() => {
    refreshDonationsTotal();
    refreshDonationQuantity();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  const addDonation = async () => {
    await donate(Number(inputValue));
    refreshDonationsTotal();
    refreshDonationQuantity();
  }

  const setInputValue = (number) => {
    const string = Number(number).toFixed(8).toString();
    _setInputValue(string);
  }

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
            {donationQuantity} total donations until now, making a total of {donationsTotal}
          </p>
          <div className="currency">
            <img
              className="icon"
              src={ethereumIcon}
              alt="eth"
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
                value={inputValue}
                step="0.00000001"
                placeholder="0.00000001"
                onChange={(e) => setInputValue(e.target.value)}
                onInput={(e) => setInputValue(e.target.value)}
              >
              </input>
              <img
                className="icon"
                src={ethereumIcon}
                alt="eth"
              />
              <p>ETH</p>
              <button className="waveButton" onClick={addDonation}>
                Donate
              </button>
            </>
          )
        }
        </div>
        { currentAccount && (<p className="bio">Connected with {currentAccount}</p>) }
      </div>
    </div>
  );
}
