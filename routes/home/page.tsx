import { RouteUtils } from "@src/util/route.utils";
import { Suspense } from "react";
import { Await, useLoaderData, useLocation } from "react-router-dom";

const RootPage = () => {
  const location = useLocation();

  const loaderData = useLoaderData() as { success: boolean };

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

      <Suspense fallback={<span>Loading...</span>}>
        <Await resolve={loaderData.success} errorElement={<span>Oopsie</span>}>
          {(success) => <span>Success: {success.toString()}</span>}
        </Await>
      </Suspense>

      <span>Root Page!</span>
    </div>
  );
};

RouteUtils.bindMetadata(RootPage, {
  id: "foo",
});

export default RootPage;
