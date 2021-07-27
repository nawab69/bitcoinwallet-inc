import Web3 from "web3";
import Wallet from "../models/Wallet.js";
import User from "../models/User.js";
import Trade from "../models/Trade.js";
import { decryptPrivateKey, encryptPrivateKey } from "./encryption.js";
import { ERC20, EthEscrow } from "../contracts/contracts.js";
import { ETH_ESCROW_CONTRACT, ETH_RPC, USDT_CONTRACT } from "../Constants.js";
import BigNumber from "bignumber.js";
import AdminWallet from "../models/AdminWallet.js";

const web3 = new Web3(new Web3.providers.HttpProvider(ETH_RPC));
const networkId = await web3.eth.net.getId();
const usdt = new web3.eth.Contract(ERC20, USDT_CONTRACT);
const escrowContract = new web3.eth.Contract(EthEscrow, ETH_ESCROW_CONTRACT);

export const depositEth = async (tradeId, password) => {
  const trade = await Trade.findOne({ tradeId });

  if (trade.status === "pending") {
    const buyerWallet = await Wallet.findOne({ user: trade.buyer });
    const sellerWallet = await Wallet.findOne({ user: trade.seller });

    const { address, privateKey: encryptedPrivateKey } = buyerWallet.ethWallet;
    const payee = sellerWallet.ethWallet.address;
    const privateKey = decryptPrivateKey(encryptedPrivateKey, password);

    const value = web3.utils.toWei(trade.amount.toString(), "ether");

    // create transactions

    const tx = escrowContract.methods.deposit(payee, tradeId);
    const gas = await tx.estimateGas({ from: address, value });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);

    // sign Transaction

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: escrowContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
        value,
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    return receipt;
  } else {
    new Error("Trade already started");
  }
};

export const depositUsdt = async (tradeId, password) => {
  const trade = await Trade.findOne({ tradeId });
  if (trade.status === "pending") {
    const buyerWallet = await Wallet.findOne({ user: trade.buyer });
    const sellerWallet = await Wallet.findOne({ user: trade.seller });
    const { address, privateKey: encryptedPrivateKey } = buyerWallet.ethWallet;
    const payee = sellerWallet.ethWallet.address;
    const privateKey = decryptPrivateKey(encryptedPrivateKey, password);
    const decimal = await usdt.methods.decimals().call();
    const Bigvalue = trade.amount * Math.pow(10, decimal);
    const bigNumber = BigNumber(Bigvalue);
    const value = bigNumber.toFixed();
    // allow escrow contract for USDT

    const tx1 = usdt.methods.approve(ETH_ESCROW_CONTRACT, value);
    const gas1 = await tx1.estimateGas({ from: address });
    const gasPrice1 = await web3.eth.getGasPrice();
    const data1 = tx1.encodeABI();
    const nonce1 = await web3.eth.getTransactionCount(address);
    const signedTx1 = await web3.eth.accounts.signTransaction(
      {
        to: usdt.options.address,
        data: data1,
        gas: gas1,
        gasPrice: gasPrice1,
        nonce: nonce1,
      },
      privateKey
    );
    const receipt1 = await web3.eth.sendSignedTransaction(
      signedTx1.rawTransaction
    );

    // create transactions
    const tx = await escrowContract.methods.depositUsdt(payee, value, tradeId);
    const gas = await tx.estimateGas({ from: address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);

    // sign Transaction

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: escrowContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
      },
      privateKey
    );
    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );
    console.log(receipt);
    return receipt;
  } else {
    new Error("Trade already started");
  }
};

export const cancel = async (tradeId, password) => {
  const trade = await Trade.findOne({ tradeId });
  if (trade.status !== "completed") {
    const buyerWallet = await Wallet.findOne({ user: trade.buyer });
    const sellerWallet = await Wallet.findOne({ user: trade.seller });

    const { address, privateKey: encryptedPrivateKey } = sellerWallet.ethWallet;
    const privateKey = decryptPrivateKey(encryptedPrivateKey, password);
    // transactions
    const tx = escrowContract.methods.cancel(tradeId);
    const gas = await tx.estimateGas({ from: address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: escrowContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    return receipt;
  } else {
    throw new Error("Trade already completed");
  }
};

export const tradeDetails = async (tradeId) => {
  const tx = await escrowContract.methods.trades(tradeId).call();
  console.log(tx);
};

export const withdrawEth = async (tradeId, password) => {
  const trade = await Trade.findOne({ tradeId });
  if (trade.status !== "pending") {
    const buyerWallet = await Wallet.findOne({ user: trade.buyer });
    const sellerWallet = await Wallet.findOne({ user: trade.seller });

    const { address, privateKey: encryptedPrivateKey } = buyerWallet.ethWallet;
    const payee = sellerWallet.ethWallet.address;
    const privateKey = decryptPrivateKey(encryptedPrivateKey, password);
    // create transactions

    const tx = escrowContract.methods.withdraw(tradeId);
    const gas = await tx.estimateGas({ from: address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);

    // sign Transaction

    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: escrowContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    console.log(receipt);
    return receipt;
  } else {
    new Error("Trade is not started");
  }
};

export const adminCancelEth = async (tradeId, password) => {
  const trade = await Trade.findOne({ tradeId });
  if (trade.status === "on dispute") {
    const wallet = await AdminWallet.findOne({ uid: 1 });

    const { address, privateKey: encryptedPrivateKey } = wallet.eth;
    const privateKey = decryptPrivateKey(encryptedPrivateKey, password);
    // transactions
    const tx = await escrowContract.methods.cancel(tradeId);
    const gas = await tx.estimateGas({ from: address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: escrowContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    return receipt;
  } else {
    throw new Error("Trade is not on dispute");
  }
};

export const adminCompleteEth = async (tradeId, password) => {
  const trade = await Trade.findOne({ tradeId });
  if (trade.status === "on dispute") {
    const wallet = await AdminWallet.findOne({ uid: 1 });

    const { address, privateKey: encryptedPrivateKey } = wallet.eth;
    const privateKey = decryptPrivateKey(encryptedPrivateKey, password);
    // transactions
    const tx = await escrowContract.methods.withdrawFromAgent(tradeId);
    const gas = await tx.estimateGas({ from: address });
    const gasPrice = await web3.eth.getGasPrice();
    const data = tx.encodeABI();
    const nonce = await web3.eth.getTransactionCount(address);
    const signedTx = await web3.eth.accounts.signTransaction(
      {
        to: escrowContract.options.address,
        data,
        gas,
        gasPrice,
        nonce,
      },
      privateKey
    );

    const receipt = await web3.eth.sendSignedTransaction(
      signedTx.rawTransaction
    );

    return receipt;
  } else {
    throw new Error("Trade is not on dispute");
  }
};
