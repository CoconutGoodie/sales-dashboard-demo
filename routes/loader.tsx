import { LoaderFunction, defer } from "react-router";

async function delay<V>(value: V, ms: number) {
  return new Promise<V>((resolve, reject) => {
    if (Math.random() <= 0.5) {
      reject(new Error("Cosmic rays brrr"));
    }
    setTimeout(() => {
      resolve(value);
    }, ms);
  });
}

const RootLoader: LoaderFunction = async ({ request }) => {
  console.log(request);
  return defer({
    success: delay(true, 2000),
  });
};

export default RootLoader;
