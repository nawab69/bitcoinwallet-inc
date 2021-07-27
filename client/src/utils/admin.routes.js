import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const AdminRoute = ({ component: Component, ...rest }) => {
  const [redirect, setRedirect] = useState("/login");
  const { loading, success, userInfo } = useSelector(
    (state) => state.userLogin
  );
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push(redirect);
    }
  }, [userInfo]);

  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export default AdminRoute;