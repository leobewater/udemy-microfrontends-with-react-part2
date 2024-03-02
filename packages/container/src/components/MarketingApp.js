import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";
import { useHistory } from "react-router-dom";

export default () => {
  // reference a html element
  const ref = useRef(null);
  const history = useHistory();

  useEffect(() => {
    // passing the reference to mount function
    // passing object onNavigate to handle Routing to marketing component
    // Marking App returns an object including "onParentNavigate" so Container can use it
    const { onParentNavigate } = mount(ref.current, {
      // extract submodule's location's pathname and rename it
      onNavigate: ({ pathname: nextPathname }) => {
        // console.log("The container noticed navigation in Marketing");
        // console.log(location);
        // console.log(nextPathname);

        // Update Container's browser history when this is being called from the submodules memory history
        // Check current pathname and nextPathname to avoid infinite loop
        const { pathname } = history.location;
        if (pathname !== nextPathname) {
          history.push(nextPathname);
        }
      },
    });

    history.listen(onParentNavigate);
  }, []);

  return <div ref={ref} />;
};
