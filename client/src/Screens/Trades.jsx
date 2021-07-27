import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { allTrade, CreateTrade } from "../actions/tradeActions";
import { Button } from "../component/dashboard";
import Loader from "../component/Loader";
import Paginate from "../component/Paginate";
import { NavBar } from "../component/dashboard";

const Trades = (props) => {
  const [state, setstate] = useState({});
  const currency = ["eth", "bnb", "usdt", "busd"];
  const dispatch = useDispatch();
  const paramPage = Number(props.match.params.page) || 1;

  const renderCurrency = () => {
    return currency.map((coin) => (
      <option value={coin} className="form-control text-uppercase">
        {coin}
      </option>
    ));
  };

  const { loading, trades, page, pages, error } = useSelector(
    (state) => state.trades
  );
  const trade = useSelector((state) => state.trade);
  useEffect(() => {
    dispatch(allTrade(paramPage));

    if (trade.loading) {
      toast.loading("Creating ..... ");
    }
    if (trade.error) {
      toast.dismiss();
      toast.error(trade.error);
    }
    if (trade.trade && trade.success) {
      toast.dismiss();
      toast.success("Trade created Successfully");
      setstate((state) => ({}));
    }
  }, [paramPage, trade.success, trade.loading, trade.error]);

  const renderTrades = () => {
    return trades?.map((trade) => {
      return (
        <tr>
          <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center">
            <span class="ml-3 font-bold text-blueGray-600">
              {trade.tradeId}
            </span>
          </th>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            {trade.amount} {trade.currency}
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <i class="fas fa-circle text-blue-500 mr-2"></i>
            {trade.status}
          </td>
          <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
            <Link to={`/trades/${trade.tradeId}`}>
              <Button>
                <i class="fas fa-info-circle mr-2"></i>Details
              </Button>
            </Link>
          </td>
        </tr>
      );
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const { amount, currency, description, email } = state;
    dispatch(CreateTrade(amount, currency, description, email));
    // dispatch(allTrade(props.match.params.page));
  };
  return loading ? (
    <Loader />
  ) : (
    <>
      <NavBar />
      <div className="w-full min-h-screen dashboard">
        <div className="container">
          <div className="pt-24">
            <div className="flex justify-center flex-column items-center">
              <form method="post" name="myForm" className="w-96 bg-white">
                <div className="h1 text-center text-gray pt-4">
                  <strong>Create Trade</strong>
                </div>
                <p id="error-msg"></p>
                <div id="simple-msg"></div>
                <div className="row d-flex justify-content-center">
                  <div className="col-sm-12 px-5">
                    <div className="mb-4">
                      <label for="amount" className="text-muted form-label">
                        Amount
                      </label>
                      <input
                        name="amount"
                        id="amount"
                        type="number"
                        className="form-control"
                        placeholder="Enter amount*"
                        value={state.amount}
                        onChange={(e) =>
                          setstate((state) => ({
                            ...state,
                            amount: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="mb-4">
                      <label for="Currency" className="text-muted form-label">
                        Currency
                      </label>
                      <select
                        name="currency"
                        id="currency"
                        className="form-control text-uppercase"
                        // value={currency}
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
                      <label
                        for="description"
                        className="text-muted form-label"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        style={{ height: "90px" }}
                        className="form-control"
                        id=""
                        rows="5"
                        value={state.description}
                        placeholder="Enter description"
                        onChange={(e) =>
                          setstate((state) => ({
                            ...state,
                            description: e.target.value,
                          }))
                        }
                      ></textarea>
                    </div>
                    <div className="mb-4">
                      <label for="email" className="text-muted form-label">
                        Buyer email
                      </label>
                      <input
                        name="email"
                        id="email"
                        type="email"
                        className="form-control"
                        placeholder="Enter email*"
                        value={state.email}
                        onChange={(e) =>
                          setstate((state) => ({
                            ...state,
                            email: e.target.value,
                          }))
                        }
                      />
                    </div>

                    <div className="text-center pb-4">
                      {/* <button
                    type="submit"
                    id="submit"
                    name="send"
                    className="btn btn-pexful"
                    onClick={handleClick}
                  >
                    Create
                  </button> */}
                      <Button onClick={handleClick}>Create</Button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div>
            <div class="w-full py-24">
              <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded bg-white">
                <div class="rounded-t mb-0 px-4 py-3 border-0">
                  <div class="flex flex-wrap items-center">
                    <div class="relative w-full px-4 max-w-full flex-grow flex-1">
                      <h3 class="font-semibold text-lg text-blueGray-700">
                        Trades
                      </h3>
                    </div>
                  </div>
                </div>
                <div class="block w-full overflow-x-auto">
                  <table class="items-center w-full bg-transparent border-collapse">
                    <thead>
                      <tr>
                        <th class="table-header-tw">Trade Id</th>
                        <th class="table-header-tw">Amount</th>
                        <th class="table-header-tw">Status</th>
                        <th class="table-header-tw">Details</th>
                      </tr>
                    </thead>
                    <tbody>{renderTrades()}</tbody>
                    <Paginate page={paramPage} pages={pages} isAdmin={false} />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Trades;
