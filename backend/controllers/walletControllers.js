import expressAsyncHandler from "express-async-handler";
import {
  transferBNB,
  transferBUSD,
  transferEth,
  transferUSDT,
  userBalance,
} from "../utils/wallet.js";
import axios from "axios";

import CoinGecko from "coingecko-api";
import connectDB from "../connectDB.js";
import Wallet from "../models/Wallet.js";
const CoinGeckoClient = new CoinGecko();

export const getWallet = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const ethBalance = await userBalance(user._id, "eth");
  const bnbBalance = await userBalance(user._id, "bnb");
  const usdtBalance = await userBalance(user._id, "usdt");
  const busdBalance = await userBalance(user._id, "busd");

  const addresses = await Wallet.findOne({ user: user._id });

  let btcBalance = "Error Fetching Balance";

  try {
    const btcData = await axios.get(
      "https://chain.so/api/v2/get_address_balance/btctest/mnuNFddvNjbwmfbP3aqVGzVW89PGDDtDRF"
    );

    btcBalance = btcData.data.data["confirmed_balance"];
  } catch {}

  let price = {};
  try {
    price = await CoinGeckoClient.simple.price({
      ids: ["binancecoin", "binance-usd", "tether", "ethereum", "bitcoin"],
      vs_currencies: ["usd"],
    });
  } catch {
    price.data = {
      ethereum: {
        usd: 0,
      },
      binancecoin: {
        usd: 0,
      },
      tether: {
        usd: 1,
      },
      "binance-usd": {
        usd: 1,
      },
    };
  }
  const data = [
    {
      name: "bitcoin",
      currency: "btc",
      price: price.data?.bitcoin.usd,
      balance: btcBalance,
      usd: price.data?.bitcoin.usd * btcBalance,
      address: addresses.btcWallet.address,
    },
    {
      name: "ethereum",
      currency: "eth",
      price: price.data?.ethereum.usd,
      balance: ethBalance,
      usd: price.data?.ethereum.usd * ethBalance,
      address: addresses.ethWallet.address,
    },
    {
      name: "binance coin",
      currency: "bnb",
      price: price.data?.binancecoin.usd,
      balance: bnbBalance,
      usd: price.data?.binancecoin.usd * bnbBalance,
      address: addresses.bnbWallet.address,
    },
    {
      name: "Tether Token",
      currency: "usdt",
      price: price.data?.tether.usd,
      balance: usdtBalance,
      usd: price.data?.tether.usd * usdtBalance,
      address: addresses.ethWallet.address,
    },
    {
      name: "Binance USD",
      currency: "busd",
      price: price.data?.["binance-usd"].usd,
      balance: busdBalance,
      usd: price.data?.["binance-usd"].usd * busdBalance,
      address: addresses.bnbWallet.address,
    },
  ];

  res.json(data);
});

export const sendCrypto = expressAsyncHandler(async (req, res) => {
  const user = req.user;

  const { recipient, currency, amount, password } = req.body;

  if (!recipient || !currency || !amount || !password) {
    throw new Error("Invalid inputs");
  }

  let trx;

  switch (currency) {
    case "eth":
      trx = await transferEth(user._id, recipient, password, amount);
      break;

    case "bnb":
      trx = await transferBNB(user._id, recipient, password, amount);
      break;

    case "usdt":
      trx = await transferUSDT(user._id, recipient, password, amount);
      break;

    case "busd":
      trx = await transferBUSD(user._id, recipient, password, amount);
      break;

    default:
      throw new Error("Currency not found");
  }

  res.json(trx);
});
