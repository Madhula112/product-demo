import "./App.css";

import React, { useEffect, useState } from "react";

import VendorForm from "./components/VendorForm";
import { ethers } from "ethers";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DistributorForm from "./components/DistributorForm";
import Home from "./components/Home";
import AssetTracker from "./utils/AssetTracker.json";

import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import Products from "./components/TrackProducts";
import Distributors from "./components/Distributors";

// import SideBar from "./components/SideBar";

import Authenticate from "./components/Authenticate";
import GetStarted from "./components/getStarted";

import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

import ConnectWallet from './components/walletConnect/ConnectWallet';
import { injected } from './components/walletConnect/Connector';
import { useWeb3React } from "@web3-react/core";

const CONTRACT_ADDRESS = process.env.REACT_APP_CONTRACT_ADD;



library.add(fas);

const App = () => {
  // console.log(process.env.REACT_APP_WALLET_ADD);
  const [wallet, setWallet] = useState("Please Connect Your Wallet to Proceed");
  const [contract, setContract] = useState(null);

  const [openWallets, setOpenWallets] = useState(false)
  const { active, account, activate } = useWeb3React()

  useEffect(() => {
    if(account && active) {
      setOpenWallets(false)
      checkIfWalletIsConnected()
    }
  },[active, account])

  useEffect(() => {
   const connectWalletOnPageLoad = async () => {
     if (localStorage?.getItem('isWalletConnected') === 'true') {
       try {
         await activate(injected)
       } catch (ex) {
         console.log(ex)
       }
     }
   }
   connectWalletOnPageLoad()
 }, [activate]) 

 const btnhandler = () => {
   setOpenWallets(true)
 };

 const handleClose = () => {
   setOpenWallets(false)
 }

  const checkIfWalletIsConnected = async () => {
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];

      console.log("Found an authorized account:", account);
      setWallet("Connected");

      // setaccount(account);

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        AssetTracker.abi,
        signer
      );
      console.log("contract", contract);
      setContract(contract);
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);

      setWallet("Connected");

      // setaccount(accounts[0]);
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        AssetTracker.abi,
        signer
      );
      setContract(contract);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(account);


  return (
    <>
         {openWallets && <ConnectWallet handleClose={handleClose}/> }
      {contract ? (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home account={account} />}></Route>
            {/* <Route
              path="/vendor"
              element={<SideBar contract={contract} account={account} />}
            ></Route> */}
            <Route
              path="/vendor"
              element={
                <GetStarted contract={contract} account={account} />
              }
            >
              <Route
                path="products"
                element={
                  <Products contract={contract} account={account} />
                }
              ></Route>
              <Route
                path="addproduct"
                element={
                  <VendorForm contract={contract} account={account} />
                }
              />
              <Route
                path="available-distributors"
                element={
                  <Distributors contract={contract} account={account} />
                }
              />
            </Route>
            <Route
              path="/distributorform"
              element={
                <DistributorForm contract={contract} account={account} />
              }
            ></Route>
            <Route
              path="/vendor/products"
              element={
                <Products contract={contract} account={account} />
              }
            ></Route>
            <Route
              path="/vendor/addproduct"
              element={
                <VendorForm contract={contract} account={account} />
              }
            />
            <Route
              path="/vendor/available-distributors"
              element={
                <Distributors contract={contract} account={account} />
              }
            />
            <Route
              path="/authenticate"
              element={
                <Authenticate contract={contract} account={account} />
              }
            />
          </Routes>
        </BrowserRouter>
      ) : (
        <div>
          <div>
            <div className="connectWalletContainer">
              {wallet === "Please Connect Your Wallet to Proceed" && (
                <button onClick={() => setOpenWallets(true)} className="connectWalletBtn">
                  <img
                    src={
                      "https://cdn.iconscout.com/icon/free/png-256/metamask-2728406-2261817.png"
                    }
                    className="img"
                    alt="metamask"
                  />{" "}
                  {wallet}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
