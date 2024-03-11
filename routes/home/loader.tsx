import { LoaderFunction, defer } from "react-router";
import { ProductSale } from "@src/components/widgets/ProductSalesWidget";
import { MathUtils } from "@src/util/math.utils";
import { DonutPool } from "@src/const/donuts";

export interface HomeLoaderData {
  sales: number[];
  productSales: ProductSale[];
}

const HomeLoader: LoaderFunction = async () => {
  return defer({
    sales: Array.from({ length: 12 }).map(
      (_, i) => 50 + Math.random() * 1000 * (i + 1)
    ),
    productSales: MathUtils.sample(DonutPool, MathUtils.randomInt(3, 15)).map(
      (donut) => ({
        ...donut,
        price: MathUtils.randomInt(0.5, 5),
        unit: "$",
        rating: MathUtils.randomInt(3, 5),
        totalSales: MathUtils.randomInt(1000, 30_000),
      })
    ),
  } satisfies HomeLoaderData);
};

export default HomeLoader;

/* ---------------------- */
