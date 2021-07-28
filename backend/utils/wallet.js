import Web3 from "web3";
import Wallet from "../models/Wallet.js";
import User from "../models/User.js";
import { decryptPrivateKey, encryptPrivateKey } from "./encryption.js";
import { ERC20 } from "../contracts/contracts.js";
import {
  BSC_RPC,
  ETH_RPC,
  BUSD_CONTRACT,
  USDT_CONTRACT,
} from "../Constants.js";
import BigNumber from "bignumber.js";
import { generateRandomAddress } from "./bitcoin.js";

// constatnts

const bnbRpc = BSC_RPC;
const ethRpc = ETH_RPC;

const web3 = new Web3(new Web3.providers.HttpProvider(ethRpc));
const bnb = new Web3(new Web3.providers.HttpProvider(bnbRpc));
const networkId = await web3.eth.net.getId();
const bnbNetworkId = await bnb.eth.net.getId();
console.log({ networkId, bnbNetworkId });
const usdt = new web3.eth.Contract(ERC20, USDT_CONTRACT);
const busd = new bnb.eth.Contract(ERC20, BUSD_CONTRACT);

const transfer = async (
  addressFrom,
  addressTo,
  currency,
  value,
  encryptedPrivateKey,
  password
) => {
  let web3provider;
  if (currency == "eth") {
    web3provider = new Web3(new Web3.providers.HttpProvider(ethRpc));
  } else if (currency == "bnb") {
    web3provider = new Web3(new Web3.providers.HttpProvider(bnbRpc));
  } else {
    throw Error("Invalid currency");
  }
  const privateKey = decryptPrivateKey(encryptedPrivateKey, password);
  const gasPrice = await web3provider.eth.getGasPrice();
  const nonce = await web3provider.eth.getTransactionCount(addressFrom);
  const signedTx = await web3provider.eth.accounts.signTransaction(
    {
      to: addressTo,
      value: web3.utils.toWei(value, "ether"),
      gas: 21000,
      gasPrice,
      nonce,
    },
    privateKey
  );
  const receipt = await web3provider.eth.sendSignedTransaction(
    signedTx.rawTransaction
  );
  console.log(receipt);
  return receipt;
};

const checkBalance = async (address, currency) => {
  let web3provider;
  if (currency == "eth") {
    web3provider = new Web3(new Web3.providers.HttpProvider(ethRpc));
  } else if (currency == "bnb") {
    web3provider = new Web3(new Web3.providers.HttpProvider(bnbRpc));
  } else {
    throw Error("Invalid currency");
  }
  const balance = await web3provider.eth.getBalance(address);
  return web3provider.utils.fromWei(balance, "ether");
};

const usdtBalance = async (address) => {
  const balance = await usdt.methods.balanceOf(address).call();
  const decimal = await usdt.methods.decimals().call();
  return balance / Math.pow(10, decimal);
};

const busdBalance = async (address) => {
  const balance = await busd.methods.balanceOf(address).call();
  console.log(balance);
  const decimal = await busd.methods.decimals().call();
  return balance / Math.pow(10, decimal);
};

// @ Function: check balance
// @ Params:  userID, currency

export const userBalance = async (userId, currency) => {
  const wallet = await Wallet.findOne({ user: userId });
  let address;
  if (currency === "eth" || currency === "usdt") {
    address = wallet.ethWallet.address;
  } else if (currency === "bnb" || currency === "busd") {
    address = wallet.bnbWallet.address;
  } else {
    throw Error("Invalid currency");
  }

  if (currency === "eth" || currency === "bnb") {
    return await checkBalance(address, currency);
  } else if (currency === "usdt") {
    return await usdtBalance(address);
  } else if (currency === "busd") {
    return busdBalance(address);
  } else {
    throw Error("Invalid currency");
  }
};

// @ Function: Tramnsfer ETH
// @ Params:  userID, addressTo , password, amount

export const transferEth = async (userId, addressTo, password, value) => {
  const wallet = await Wallet.findOne({ user: userId });
  const { address, privateKey: encryptedPrivateKey } = wallet.ethWallet;
  return await transfer(
    address,
    addressTo,
    "eth",
    value,
    encryptedPrivateKey,
    password
  );
};

// @ Function: Tramnsfer BNB
// @ Params:  userID, addressTo , password, amount

export const transferBNB = async (userId, addressTo, password, value) => {
  const wallet = await Wallet.findOne({ user: userId });
  const { address, privateKey: encryptedPrivateKey } = wallet.bnbWallet;
  return await transfer(
    address,
    addressTo,
    "bnb",
    value,
    encryptedPrivateKey,
    password
  );
};

// @ Function: Tramnsfer USDT
// @ Params:  userID, addressTo , password, amount

export const transferUSDT = async (userID, addressTo, password, amount) => {
  const wallet = await Wallet.findOne({ user: userID });
  const { address, privateKey: encryptedPrivateKey } = wallet.ethWallet;
  const privateKey = decryptPrivateKey(encryptedPrivateKey, password);

  const decimal = await usdt.methods.decimals().call();
  const Bigvalue = (amount * Math.pow(10, decimal)).toString();
  const bigNumber = BigNumber(Bigvalue);
  const value = bigNumber.toFixed();

  // transactions

  const tx = usdt.methods.transfer(addressTo, value);
  const gas = await tx.estimateGas({ from: address });
  const gasPrice = await web3.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await web3.eth.getTransactionCount(address);

  const signedTx = await web3.eth.accounts.signTransaction(
    {
      to: usdt.options.address,
      data,
      gas,
      gasPrice,
      nonce,
    },
    privateKey
  );

  const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

  return receipt;
};

// @ Function: Tramnsfer BUSD
// @ Params:  userID, addressTo , password, amount
export const transferBUSD = async (userID, addressTo, password, amount) => {
  const wallet = await Wallet.findOne({ user: userID });
  const { address, privateKey: encryptedPrivateKey } = wallet.bnbWallet;
  const privateKey = decryptPrivateKey(encryptedPrivateKey, password);

  const decimal = await busd.methods.decimals().call();
  const Bigvalue = (amount * Math.pow(10, decimal)).toString();
  const bigNumber = BigNumber(Bigvalue);
  const value = bigNumber.toFixed();

  // transactions

  const tx = busd.methods.transfer(addressTo, value);
  const gas = await tx.estimateGas({ from: address });
  const gasPrice = await bnb.eth.getGasPrice();
  const data = tx.encodeABI();
  const nonce = await bnb.eth.getTransactionCount(address);

  const signedTx = await bnb.eth.accounts.signTransaction(
    {
      to: busd.options.address,
      data,
      gas,
      gasPrice,
      nonce,
    },
    privateKey
  );

  const receipt = await bnb.eth.sendSignedTransaction(signedTx.rawTransaction);
  return receipt;
};

// @ Function: Create wallet
// @ Params:  userID , password
export const CreateWallet = async (userID, password) => {
  const ethWallet = web3.eth.accounts.wallet.create(1);
  const bnbWallet = bnb.eth.accounts.wallet.create(1);
  const btcWallet = generateRandomAddress();

  const { address: ethAddress, privateKey: ethPrivateKey } = ethWallet[0];
  const { address: bnbAddress, privateKey: bnbPrivateKey } = bnbWallet[0];
  const encryptedEthPrivateKey = encryptPrivateKey(ethPrivateKey, password);
  const encryptedBnbPrivateKey = encryptPrivateKey(bnbPrivateKey, password);
  const encryptedBtcPrivateKey = encryptPrivateKey(btcWallet.wif, password);
  const user = await User.findById(userID);
  const new_wallet = await Wallet.create({
    user: user._id,
    ethWallet: { address: ethAddress, privateKey: encryptedEthPrivateKey },
    bnbWallet: { address: bnbAddress, privateKey: encryptedBnbPrivateKey },
    btcWallet: {
      address: btcWallet.address,
      privateKey: encryptedBtcPrivateKey,
    },
  });
  return new_wallet;
};
