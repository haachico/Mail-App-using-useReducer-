import { createContext, useEffect, useReducer } from "react";

import { mails } from "../API/fakeFetch";
export const MailContext = createContext();

export const MailProvider = ({ children }) => {
  const initialState = {
    mailData: [],

    backupMailData: [],
    trashData: [],
    spamData: [],
    isLoading: false,
    error: null,
    isUnreadChecked: false,
    isStarredChecked: false,
    searchText: "",
  };

  const mailReducer = (state, action) => {
    switch (action.type) {
      case "FETCH_DATA_REQUEST":
        return {
          ...state,
          isLoading: true,
          error: null,
        };
      case "FETCH_DATA_SUCCESS":
        return {
          ...state,
          mailData: action.payload,
          backupMailData: action.payload,
          mailList: action.payload,
          isLoading: false,
        };
      case "FETCH_DATA_FAILURE":
        return {
          ...state,
          error: action.err,
          isLoading: false,
        };
      case "DELETE_MAIL":
        return {
          ...state,
          trashData: [
            ...state.trashData,
            ...state.mailData.filter((e) => e.mId === action.payload),
          ],
          mailData: state.mailData.filter((e) => e.mId !== action.payload),
        };
      case "ADD_TO_SPAM":
        return {
          ...state,
          spamData: [
            ...state.spamData,
            ...state.mailData.filter((e) => e.mId === action.payload),
          ],
          mailData: state.mailData.filter((e) => e.mId !== action.payload),
        };
      case "ADD_TO_READ":
        return {
          ...state,
          mailData: state.mailData.map((e) =>
            e.mId === action.payload ? { ...e, unread: !e.unread } : e
          ),
        };
      case "MARK_AS_STARRED":
        return {
          ...state,
          mailData: state.mailData.map((e) =>
            e.mId === action.payload ? { ...e, isStarred: !e.isStarred } : e
          ),
        };
      case "MOVE_TRASH_TO_INBOX":
        return {
          ...state,
          mailData: [
            ...state.mailData,
            ...state.trashData.filter((e) => e.mId === action.payload),
          ],
          trashData: state.trashData.filter((e) => e.mId !== action.payload),
        };

      case "MOVE_SPAMMED_TO_INBOX":
        return {
          ...state,
          mailData: [
            ...state.mailData,
            ...state.spamData.filter((e) => e.mId === action.payload),
          ],
          spamData: state.spamData.filter((e) => e.mId !== action.payload),
        };

      case "TOGGLE_UNREAD":
        return {
          ...state,
          isUnreadChecked: !state.isUnreadChecked,
        };
      case "TOGGLE_STARRED":
        return {
          ...state,
          isStarredChecked: !state.isStarredChecked,
        };
      case "SEARCH_TEXT":
        return {
          ...state,
          searchText: action.payload,
        };

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(mailReducer, initialState);
  console.log(state.trashData);
  console.log(state.searchText);
  const fetchData = async () => {
    try {
      dispatch({ type: "FETCH_DATA_REQUEST" });

      const response = await mails;
      dispatch({ type: "FETCH_DATA_SUCCESS", payload: response });
    } catch (err) {
      dispatch({ type: "FETCH_DATA_FAILURE", error: err.message });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <MailContext.Provider value={{ state, dispatch }}>
        {children}
      </MailContext.Provider>
    </div>
  );
};
