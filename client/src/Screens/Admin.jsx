import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCount } from "../actions/adminActions";
import { AdminNav } from "../component/dashboard";

const Admin = () => {
  const dispatch = useDispatch();

  const count = useSelector((state) => state.count);
  const cards = [
    {
      title: "Total Users",
      number: count?.count?.users || 0,
      color: "green",
    },
    {
      title: "Total Trades",
      number: count?.count?.total || 0,
      color: "blue",
    },
    {
      title: "Pending Trades",
      number: count?.count?.pending || 0,
      color: "yellow",
    },
    {
      title: "Dispute Trades",
      number: count?.count?.["on dispute"] || 0,
      color: "red",
    },
    {
      title: "Processing Trades",
      number: count?.count?.processing || 0,
      color: "indigo",
    },
    {
      title: "Cancelled Trades",
      number: count?.count?.cancelled || 0,
      color: "red",
    },

    {
      title: "Completed Trades",
      number: count?.count?.completed || 0,
      color: "green",
    },

    {
      title: "Marks Paid Trades",
      number: count?.count?.["marked paid"] || 0,
      color: "blue",
    },
  ];

  useEffect(() => {
    dispatch(fetchCount());
  }, []);

  const RenderCard = ({ number, title, color }) => {
    return (
      <div
        className={`bg-gray-50 border-l-4 border-${color}-300 rounded-lg py-4 mx-2 my-2 shadow-lg`}
      >
        <div className="text-center">
          <strong>
            {" "}
            <div className="h3">{number}</div>{" "}
          </strong>
          <div className="h5">{title}</div>
        </div>
      </div>
    );
  };
  return (
    <>
      <AdminNav />
      <div className="dashboard min-h-screen">
        <div className="container pt-24">
          <div className="flex justify-center flex-wrap">
            {cards?.map((card) => {
              return (
                <div className="w-full md:w-1/3">
                  <RenderCard
                    title={card.title}
                    number={card.number}
                    color={card.color}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
