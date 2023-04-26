import { useContext } from "react";
import { Link } from "react-router-dom";

import { MailContext } from "..";

const Spam = () => {
  const { state, dispatch } = useContext(MailContext);

  const handleChange = (e) => {
    dispatch({ type: "SEARCH_TEXT", payload: e.target.value });
  };

  let mailList = state.spamData;

  mailList = mailList.filter(
    (mail) =>
      mail.subject.toLowerCase().includes(state.searchText.toLowerCase()) ||
      mail.content.toLowerCase().includes(state.searchText.toLowerCase())
  );
  return mailList.length === 0 ? (
    "No spam message here"
  ) : (
    <div style={{width: "100%"}}>
      <input
        type="text"
        name="search"
        onChange={(event) => handleChange(event)}
        className="search-input"
        placeholder="Search mail"
      />
      {mailList.map((e) => (
        <div key={e.mId}>
          <h4>Subject : {e.subject}</h4>

          <div className="span--btns">
            <p>{e.content}</p>
            <p>
              {" "}
              <Link to={`/detail/${e.mId}`}>View Details</Link>
            </p>

            <button
              className="move-to-inbox--btn"
              onClick={() =>
                dispatch({ type: "MOVE_SPAMMED_TO_INBOX", payload: e.mId })
              }
            >
              Move to inbox
            </button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
export default Spam;
