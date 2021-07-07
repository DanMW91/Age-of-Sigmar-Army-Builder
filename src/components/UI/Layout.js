import { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import LoadingSpinner from "./LoadingSpinner";
import AuthContext from "../../store/store";

const Layout = (props) => {
  const authCtx = useContext(AuthContext);

  return (
    <>
      <Navbar />
      {authCtx.isLoading && <LoadingSpinner />}

      <main>{props.children}</main>
    </>
  );
};

export default Layout;
