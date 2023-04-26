import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div>
        {" "}
        <Link to="/">Inbox</Link>
      </div>
      <div>
        <Link to="/spam">Spam</Link>
      </div>
      <div>
        <Link to="/trash">Trash</Link>
      </div>
    </div>
  );
};
export default Sidebar;
