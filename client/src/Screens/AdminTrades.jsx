import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminTrades } from "../actions/adminActions";
import { Link } from "react-router-dom";
import Paginate from "../component/Paginate";
import queryString from "query-string";
import Loader from "../component/Loader";
import { AdminNav, Button } from "../component/dashboard";

const AdminTrades = (props) => {
  const dispatch = useDispatch();
  const qs = props.location.search;
  const { status, page: paramPage = 1 } = queryString.parse(qs);
  const { loading, trades, page, pages, error } = useSelector(
    (state) => state.adminTradesList
  );

  useEffect(() => {
    dispatch(fetchAdminTrades(qs));
  }, [paramPage, status]);

  const stat = [
    "pending",
    "processing",
    "marked paid",
    "completed",
    "on dispute",
    "cancelled",
  ];

  const handleStatusChange = (e) => {
    const query = {};
    query.status = e.target.value;
    const search = `?${queryString.stringify(query)}`;
    console.log(search);
    props.history.push(search);
  };

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
            {trade.status == "on dispute" ? (
              <Link
                to={
                  trade.status === "on dispute" &&
                  `/admin/trades/${trade.tradeId}`
                }
              >
                <Button>
                  <i class="fas fa-info-circle mr-2"></i>
                  Details
                </Button>
              </Link>
            ) : (
              <span className="text-warning">Not available</span>
            )}
          </td>
        </tr>
      );
    });
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <AdminNav />
      <div className="dashboard min-h-screen">
        <div className="container pt-24 pb-24">
          <h2 className="text-center">
            <strong>Trades</strong>
          </h2>
          <div class="table-responsive py-4 bg-white text-center">
            <div>
              <select
                className="w-1/4 py-2 px-3 bg-gray-100 rounded-lg border-l-4 border-indigo-500 mb-2 focus:outline-none text-xl"
                onChange={handleStatusChange}
              >
                <option value="" readonly>
                  Select Status
                </option>
                {stat.map((item) => (
                  <option value={item} readonly>
                    {item}
                  </option>
                ))}
              </select>
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
                <Paginate
                  page={paramPage}
                  pages={pages}
                  status={status}
                  isAdmin={true}
                />
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminTrades;
