// Dashboard App is Vue
import React, { useRef, useEffect } from "react";
import { mount } from "dashboard/DashboardApp";

export default () => {
  // reference a html element
  const ref = useRef(null);

  useEffect(() => {
    mount(ref.current);
  }, []);

  return <div ref={ref} />;
};
