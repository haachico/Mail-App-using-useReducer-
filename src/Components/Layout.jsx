import { Outlet } from "react-router-dom";

import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div>
      <Sidebar />
      <div className="main--body">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
export default Layout;
