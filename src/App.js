import "./styles.css";
import { Routes, Route } from "react-router-dom";

import Layout from "./Components/Layout";
import Trash from "./Pages/Trash";
import InboxDetails from "./Pages/InboxDetails";
import Inbox from "./Pages/Inbox";
import Spam from "./Pages/Spam";

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inbox />} />
          <Route path="trash" element={<Trash />} />
          <Route path="spam" element={<Spam />} />
          <Route path="detail/:mailId" element={<InboxDetails />} />
        </Route>
      </Routes>
    </div>
  );
}
