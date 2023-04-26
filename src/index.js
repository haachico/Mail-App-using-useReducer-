import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { MailContext, MailProvider } from "./useContext/MailContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

export { MailContext };

root.render(
  <StrictMode>
    <BrowserRouter>
      <MailProvider>
        <App />
      </MailProvider>
    </BrowserRouter>
  </StrictMode>
);
