import { useParams } from "react-router-dom";
import { useContext } from "react";

import { MailContext } from "..";
import Sidebar from "../Components/Sidebar";

const InboxDetails = () => {
  const { state } = useContext(MailContext);
  const { mailId } = useParams();
  const mailDetail = state.backupMailData.find((mail) => mail.mId == mailId);
  console.log(mailId);
  return (
    <div className="main--body">
      <Sidebar />
      <div className="details--box">
        <h4> Subject : {mailDetail?.subject}</h4>
        <p>{mailDetail?.content}</p>
      </div>
    </div>
  );
};
export default InboxDetails;
