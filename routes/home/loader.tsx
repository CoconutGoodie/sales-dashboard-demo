import { LoaderFunction, defer } from "react-router";

export interface HomeLoaderData {
  sales: number[];
}

const HomeLoader: LoaderFunction = async () => {
  return defer({
    sales: Array.from({ length: 8 }).map(
      (_, i) => 50 + Math.random() * 1000 * (i + 1)
    ),
  } satisfies HomeLoaderData);
};

export default HomeLoader;
