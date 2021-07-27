import React from "react";
import Loading from "react-loader-spinner";

const Loader = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Loading type="ThreeDots" color="#3480eb" height={80} width={80} />
    </div>
  );
};

export default Loader;
