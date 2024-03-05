import { router } from "@src/app.router";
import { RouterProvider } from "react-router-dom";

export const App = () => {
  return <RouterProvider router={router} />;
};
