import bitcore from "bitcore-lib";
import axios from "axios";
import Wallet from "../models/Wallet.js";
import { decryptPrivateKey } from "./encryption.js";
import connectDB from "../connectDB.js";

connectDB();

// Generate random Private key and address

export const generateRandomAddress = () => {
  const privateKey = new bitcore.PrivateKey(bitcore.Networks.testnet);
  const address = privateKey.toAddress();
  const wif = privateKey.toWIF();

  return {
    privateKey: privateKey.toString(),
    address: address.toString(),
    wif,
  };
};

// import wif to get private key and Address

const importWIF = (wif) => {
  const importedWallet = bitcore.PrivateKey.fromWIF(wif);
  return {
    privateKey: importedWallet.toString(),
    address: importedWallet.toAddress().toString(),
  };
};

const fetchUtxo = async (address) => {
  console.log(address);
  try {
    const data = await axios.get(
      `https://sochain.com/api/v2/get_tx_unspent/btctest/${address}`
    );

    const rawUtxos = data.data.data.txs;

    const utxo = rawUtxos.map((e) => {
      return {
        txId: e.txid,
        vout: e["output_no"],
        address: address,
        script: e["script_hex"],
        satoshis: e["value"] * 100000000,
      };
    });

    return utxo;
  } catch {
    throw new Error("UTXO fetch failed");
  }
};

const fetchFee = async () => {
  try {
    const data = await axios.get(
      "https://bitcoiner.live/api/fees/estimates/latest"
    );

    const perKBytes = data.data.estimates["30"]["sat_per_vbyte"] * 1024;
    return perKBytes;
  } catch {
    throw new Error("Can't fetch the estimate fee");
  }
};

const createTransaction = async (to, amount, wif) => {
  const { privateKey, address } = importWIF(wif);
  const privKey = new bitcore.PrivateKey(privateKey, bitcore.Networks.testnet);
  const utxos = await fetchUtxo(address);

  const transaction = new bitcore.Transaction()
    .from(utxos)
    .to(to, amount * 10e8)
    .change(address)
    .feePerKb(await fetchFee())
    .sign(privKey);

  if (transaction._inputAmount < transaction._outputAmount) {
    throw new Error("Insufficient Balance");
  } else {
    return transaction.serialize();
  }
};

const sendTransaction = async () => {
  const wallet = await Wallet.findById("60ffc774cdc4410fa7f81cd0");
  const wif = decryptPrivateKey(wallet.btcWallet.privateKey, "password");
  const to = "mrpunUouGa5LB3pJj8B6zK9eCQ5FuPjW8e";
  const value = "0.000002";

  return await createTransaction(to, value, wif);
};

const brodcastTransaction = async (trxHex) => {
  const body = {
    tx_hex: trxHex,
  };

  try {
    const res = await axios.post(
      "https://sochain.com/api/v2/send_tx/btctest",
      body
    );

    const data = res.data;
    return data.txid;
  } catch (e) {
    throw new Error(e.message);
  }
};
