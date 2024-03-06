import { useLocation } from "react-router-dom";

const AboutUsPage = () => {
  const location = useLocation();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid red",
        padding: 15,
      }}
    >
      <span>Route: {location.pathname}</span>
      <span>About Us :id Page!</span>
    </div>
  );
};

export default AboutUsPage;
