import { useLocation } from "react-router-dom";

const RootPage = () => {
  const location = useLocation();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        border: "2px solid red",
      }}
    >
      <span>{location.pathname}</span>
      <span>Root Page!</span>
    </div>
  );
};

export default RootPage;
