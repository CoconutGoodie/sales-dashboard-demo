import { LoaderFunction, defer } from "react-router";
import { ProductSale } from "@src/components/widgets/ProductSalesWidget";
import { MathUtils } from "@src/util/math.utils";
import { DonutPool } from "@src/const/donuts";

export interface HomeLoaderData {
  sales: number[];
  yearlySales: number[];
  productSales: ProductSale[];
}

const HomeLoader: LoaderFunction = async () => {
  return defer({
    sales: Array.from({ length: 8 }).map(
      (_, i) => 50 + Math.random() * 1000 * (i + 1)
    ),

    yearlySales: Array.from({ length: 12 }).map((_, i, { length }) =>
      i < length / 2
        ? 1000 + (19000 * MathUtils.randomFloat(i * 0.3, i + 1)) / length
        : 20000 - (19000 * MathUtils.randomFloat(i * 0.3, i + 1)) / length
    ),

    productSales: MathUtils.uniqueSample(
      DonutPool,
      MathUtils.randomInt(DonutPool.length * 0.6, DonutPool.length)
    ).map((donut) => ({
      ...donut,
      price: MathUtils.randomFloat(0.5, 5),
      unit: "$",
      rating: MathUtils.randomFloat(3, 5),
      totalSales: MathUtils.randomInt(1000, 30_000),
    })),
  } satisfies HomeLoaderData);
};

export default HomeLoader;

/* ---------------------- */
