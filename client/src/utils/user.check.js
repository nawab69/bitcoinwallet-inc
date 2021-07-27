import React from "react";
import { useDispatch, useSelector } from "react-redux";

export const IsLogged = (props) => {
  const { userInfo, loading, success } = useSelector(
    (state) => state.userLogin
  );

  if (userInfo && !userInfo.isAdmin) {
    return <>{props.children}</>;
  } else return <></>;
};

export const IsAdmin = (props) => {
  const { userInfo, loading, success } = useSelector(
    (state) => state.userLogin
  );

  if (userInfo?.isAdmin) {
    return <>{props.children}</>;
  } else return <></>;
};


