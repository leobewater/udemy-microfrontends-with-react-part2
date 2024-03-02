import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory } from "history";
import App from "./App";

// Mount function to start up the app
const mount = (el, { onNavigate }) => {
  // set up Memory history instead of using browser history
  const history = createMemoryHistory();

  // 1. call the Container onNavigate function when path changes to sync the routing history
  // (see readme file)
  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  // 2. when Container navigates a new path, tells submodules to update the history and navigate to the nextPathname
  // (see readme file)
  return {
    onParentNavigate({ pathname: nextPathname }) {
      // console.log("Container just navigated");
      // console.log(nextPathname);
      const { pathname } = history.location;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in development and in isolation, call mount immediately
if (process.env.NODE_ENV === "development") {
  const devRoot = document.querySelector("#_marketing-dev-root");
  if (devRoot) {
    mount(devRoot, {});
  }
}

// we're running through CONTAINER and we should export the mount function
export { mount };
