import { Switch, Route, Redirect } from "react-router-dom";
import { useContext } from "react";
import Auth from "./pages/Auth";
import Army from "./pages/Army";
import AuthContext from "./store/store";
import Layout from "./components/UI/Layout";
import Battalions from "./pages/Battalions";

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const isLoading = authCtx.isLoading;

  return (
    <Switch>
      <Route path="/" exact>
        {!isLoggedIn && <Redirect to="/login" />}
        {isLoggedIn && <Redirect to="/army" />}
      </Route>
      <Route path="/login">
        {!isLoggedIn && <Auth />}
        {isLoggedIn && !isLoading && <Redirect to="/army" />}
      </Route>

      <Layout>
        <Route path="/army">
          {authCtx.isLoggedIn && !isLoading && <Army />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
        <Route path="/battalions">
          {authCtx.isLoggedIn && !isLoading && <Battalions />}
          {!authCtx.isLoggedIn && <Redirect to="/login" />}
        </Route>
      </Layout>
    </Switch>
  );
}
export default App;
