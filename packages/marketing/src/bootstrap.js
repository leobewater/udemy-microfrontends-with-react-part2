import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";
import App from "./App";

// Mount function to start up the app
const mount = (el, { onNavigate }) => {
  // set up Memory history instead of using browser history
  const history = createMemoryHistory();

  // call the Container onNavigate function when path changes to sync the routing history
  history.listen(onNavigate);

  ReactDOM.render(<App history={history} />, el);
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot);
  }
}
// we're running through CONTAINER and we should export the mount function
export { mount };
