import "./css/bootstrap.min.css";
import "./css/materialdesignicons.min.css";
import "./scss/style.scss";
import "./css/style.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Wallet from "./Screens/Wallet";
import NavBar from "./component/NavBar";
import Admin from "./Screens/Admin";
import Login from "./Screens/Login";
import Register from "./Screens/Register";
import Send from "./Screens/Send";
import Home from "./Screens/Home";
import UserRoute from "./utils/user.routes";
import AdminRoute from "./utils/admin.routes";
import Receive from "./Screens/Receive";
import { Toaster } from "react-hot-toast";
import ForgotPassword from "./Screens/ForgotPassword";
import Profile from "./Screens/Profile";
import ResetPassword from "./Screens/ResetPassword";

function App() {
  AOS.init({
    duration: 1200,
  });

  return (
    <>
      <Toaster />
      <Router>
        <Switch>
          <UserRoute path="/wallet" exact component={Wallet} />
          <AdminRoute path="/admin" component={Admin} exact />

          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/forgot-password" exact component={ForgotPassword} />
          <Route path="/password-reset/:code" exact component={ResetPassword} />

          <UserRoute path="/send/:slug" exact component={Send} />
          <UserRoute path="/profile" exact component={Profile} />
          <UserRoute path="/receive/:slug" exact component={Receive} />
          {/* <Route path="/" exact component={Home} /> */}
        </Switch>
      </Router>
    </>
  );
}

export default App;
