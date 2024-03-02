import React, { useRef, useEffect } from "react";
import { mount } from "marketing/MarketingApp";

export default () => {
  // reference a html element
  const ref = useRef(null);

  useEffect(() => {
    // passing the reference to mount function
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
