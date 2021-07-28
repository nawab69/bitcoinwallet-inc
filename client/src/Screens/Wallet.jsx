import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Balances } from "../actions/tradeActions";
import Loader from "../component/Loader";
import { Button, NavBar } from "../component/dashboard/index";

const Wallet = () => {
  const [state, setstate] = useState({});
  const dispatch = useDispatch();
  const currency = ["eth", "bnb", "usdt", "busd"];

  const renderCurrency = () => {
    return currency.map((coin) => (
      <option value={coin} className="form-control">
        {coin}
      </option>
    ));
  };

  const { loading, balances, error } = useSelector((state) => state.balances);
  useEffect(() => {
    if (!balances) dispatch(Balances());
    console.log(balances);
  }, [balances]);

  const renderWalletCard = () => {
    return balances?.map((card) => {
      return (
        <div className="w-full md:w-1/2">
          <div className="m-4 px-4 py-2 bg-white flex flex-col justify-center hover:shadow-md">
            <div className="flex justify-between w-full items-center">
              <div className="">
                <p className="m-0 p-0" style={{ color: "#B9B9B9" }}>
                  Current Price
                </p>
                <p
                  className="text-center"
                  style={{ color: "#B9B9B9", fontSize: "24px" }}
                >
                  ${card.price}
                </p>
              </div>
              <div className="">
                <img
                  src={`${process.env.PUBLIC_URL}/assets/images/icons/${card.currency}.svg`}
                  alt=""
                  className="inline-block w-24 h-24"
                />
              </div>
            </div>
            <div>
              <p className="m-0 p-0">Current Balance</p>
              <h3>
                <strong style={{ textTransform: "uppercase" }}>
                  {Number(card.balance).toFixed(card.decimal ?? 4)}&nbsp;
                  {card.currency}
                </strong>
              </h3>
              <p className="-m-1">~{Number(card.usd).toFixed(4)}&nbsp;USD</p>
              <div className="flex justify-around mt-4 mb-3">
                <Link to={`send/${card.currency}`}>
                  <Button>
                    <i class="fa fa-paper-plane mr-2" aria-hidden="true"></i>
                    Send
                  </Button>
                </Link>
                <Link to={`receive/${card.currency}/`}>
                  <Button>
                    <i class="fa fa-qrcode mr-2" aria-hidden="true"></i>
                    Recieve
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };
  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <div className="w-full min-h-screen dashboard">
        <div className="container pt-24">
          <div className="alert alert-warning">
            Bitcoin network is running on Testnet. Don't Send any BTC from main
            net. This is for testing perpose only{" "}
          </div>
          <div className="flex flex-row flex-wrap justify-around">
            {renderWalletCard()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wallet;
