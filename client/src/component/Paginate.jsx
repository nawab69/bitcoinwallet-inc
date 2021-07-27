import React from "react";
import { Pagination } from "react-bootstrap";
import { Link } from "react-router-dom";

const Paginate = ({ pages, page, isAdmin = false, status }) => {
  return (
    pages > 1 && (
      <ul className="flex">
        <p className="leading-8">
          {page} page out of {pages} pages&nbsp;&nbsp;
        </p>
        <>
          {[...Array(pages).keys()].map((x, index) => (
            <li active={index + 1 === Number(page)} className="m-0 p-0 mx-1">
              {console.log({ x, page })}
              <Link
                key={x + 1}
                to={
                  !isAdmin
                    ? `/trades/page/${index + 1}`
                    : `/admin/trades?page=${index + 1}${
                        status ? "&status=" + status : ""
                      }`
                }
              >
                <span
                  className={
                    x + 1 == page
                      ? "h-8 w-8 flex justify-center items-center inline-block bg-indigo-500 shadow-lg text-white rounded-full"
                      : "h-8 w-8 bg-gray-50 inline-block flex justify-center items-center shadow-md rounded-full"
                  }
                >
                  {x + 1}
                </span>
              </Link>
            </li>
          ))}
        </>
      </ul>
    )
  );
};

export default Paginate;
