import { Outlet } from "react-router-dom";

const AboutLayout = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid blue",
        padding: 15,
      }}
    >
      <span>About Layout</span>
      <Outlet />
    </div>
  );
};

export default AboutLayout;
