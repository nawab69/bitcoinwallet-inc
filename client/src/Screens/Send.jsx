import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Balances, TRANSFER } from "../actions/tradeActions";
import { Button } from "../component/dashboard";

const Send = ({ match }) => {
  const [state, setstate] = useState({ currency: match.params.slug });
  const dispatch = useDispatch();
  const currencies = ["eth", "bnb", "usdt", "busd"];
  const { success, loading, error } = useSelector((state) => state.transfer);
  const renderCurrency = () => {
    return currencies.map((coin) => (
      <option
        value={coin}
        selected={coin === state.currency}
        className="form-control"
      >
        {coin}
      </option>
    ));
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { recipient, amount, currency, password } = state;
    dispatch(TRANSFER(recipient, currency, amount, password));
    // alert(amount);
  };

  useEffect(() => {
    if (loading) {
      toast.loading("Sending ..... ");
    }
    if (error) {
      toast.dismiss();
      toast.error(error);
    }
    if (success) {
      toast.dismiss();
      toast.success("Transaction Successfull");
    }
  }, [success, loading, error]);

  return (
    <div className="w-full h-screen dashboard">
      <div className="container pt-24 flex justify-center w-full">
        <form method="post" name="myForm" className="w-96 bg-white">
          <div className="h2 text-center text-gray mt-4">
            <strong>Send</strong>
          </div>
          <p id="error-msg"></p>
          <div id="simple-msg"></div>
          <div className="flex justify-center">
            <div className="col-12 px-4">
              <div className="mb-4">
                <label for="recipient" className="text-sm mb-1 text-gray-500">
                  Recipient
                </label>
                <input
                  name="recipient"
                  id="recipient"
                  type="text"
                  className="form-control"
                  placeholder="Enter recipient*"
                  onChange={(e) =>
                    setstate((state) => ({
                      ...state,
                      recipient: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="mb-4">
                <label for="Currency" className="text-sm mb-1 text-gray-500">
                  Currency
                </label>
                <select
                  name="currency"
                  id="currency"
                  className="form-control"
                  onChange={(e) =>
                    setstate((state) => ({
                      ...state,
                      currency: e.target.value,
                    }))
                  }
                >
                  {renderCurrency()}
                </select>
              </div>
              <div className="mb-4">
                <label for="amount" className="text-sm mb-1 text-gray-500">
                  Amount
                </label>
                <input
                  name="amount"
                  id="amount"
                  type="number"
                  step="0.0001"
                  className="form-control"
                  placeholder="Enter amount*"
                  onChange={(e) =>
                    setstate((state) => ({
                      ...state,
                      amount: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="mb-4">
                <label for="amount" className="text-sm mb-1 text-gray-500">
                  Password
                </label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  className="form-control"
                  placeholder="Enter password*"
                  onChange={(e) =>
                    setstate((state) => ({
                      ...state,
                      password: e.target.value,
                    }))
                  }
                />
              </div>

              <div className="text-center mb-4">
                {/* <button
                    type="submit"
                    id="submit"
                    name="send"
                    className="btn btn-pexful"
                    onClick={handleClick}
                  >
                    Send
                  </button> */}
                <Button onClick={handleClick}>Send</Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Send;
