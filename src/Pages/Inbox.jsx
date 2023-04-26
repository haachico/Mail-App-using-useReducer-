import { useContext } from "react";
import { Link } from "react-router-dom";

import { MailContext } from "..";

const Inbox = () => {
  const { state, dispatch } = useContext(MailContext);

  const unreadMails = state.mailData.filter((e) => e.unread === true);

  const handleChange = (e) => {
    dispatch({ type: "SEARCH_TEXT", payload: e.target.value });
  };

  //Whenever you want to just display by filter, dont make a new copy. Just directly filter.

  ///LIKE THESE BELOW CASES [NO NEED TO MODIFY COPY IN THESE CASES]

  //Just checkbox filtering happening
  let mailList = state.mailData;

  mailList = state.isUnreadChecked
    ? mailList.filter((mail) => mail.unread === true)
    : mailList;

  mailList = state.isStarredChecked
    ? mailList.filter((mail) => mail.isStarred === true)
    : mailList;

  //Just search filtering happeninh
  mailList = mailList.filter(
    (mail) =>
      mail.subject.toLowerCase().includes(state.searchText.toLowerCase()) ||
      mail.content.toLowerCase().includes(state.searchText.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        name="search"
        onChange={(event) => handleChange(event)}
        className="search-input"
        placeholder="Search mail"
      />
      <fieldset>
        <legend>Filter</legend>
        <div className="input--btns">
          <label>
            Show unread mails
            <input
              type="checkbox"
              name="Show unread mails"
              value={state.isUnreadChecked}
              onChange={() => dispatch({ type: "TOGGLE_UNREAD" })}
            />
          </label>
          <label>
            Show starred mails
            <input
              type="checkbox"
              name="Show starred mails"
              value={state.isStarredChecked}
              onChange={() => dispatch({ type: "TOGGLE_STARRED" })}
            />
          </label>
        </div>
      </fieldset>
      <h5> Unread mails : {unreadMails.length} </h5>

      {mailList.map((e) => (
        <div
          className="mails--box"
          key={e.mId}
          style={{ backgroundColor: e.unread ? "#f4f4f5" : "white" }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h4>Subject : {e.subject}</h4>
            <button
              className="star--btn"
              onClick={() =>
                dispatch({ type: "MARK_AS_STARRED", payload: e.mId })
              }
              style={{ backgroundColor: e.unread ? "#f4f4f5" : "white" }}
            >
              {e.isStarred ? "unstar" : "star"}
            </button>
          </div>

          <p>{e.content}</p>
          <p className="inbox--detail--link">
            {" "}
            <Link to={`detail/${e.mId}`}>View details</Link>
          </p>
          <div className="inbox--btns">
            <button
              onClick={() => dispatch({ type: "DELETE_MAIL", payload: e.mId })}
              style={{ backgroundColor: e.unread ? "#f4f4f5" : "white" }}
            >
              Delete
            </button>
            <button
              onClick={() => dispatch({ type: "ADD_TO_SPAM", payload: e.mId })}
              style={{ backgroundColor: e.unread ? "#f4f4f5" : "white" }}
            >
              Mark as Spam
            </button>
            <button
              onClick={() => dispatch({ type: "ADD_TO_READ", payload: e.mId })}
              style={{ backgroundColor: e.unread ? "#f4f4f5" : "white" }}
            >
              {e.unread ? "Mark as read" : "Mark as unread"}
            </button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};
export default Inbox;
