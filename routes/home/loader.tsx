import { LoaderFunction, defer } from "react-router";

import vanillaSprinkled from "@src/assets/donuts/vanilla-sprinkled.svg?base64";
import { ProductSale } from "@src/components/widgets/ProductSalesWidget";
import { MathUtils } from "@src/util/math.utils";

export interface HomeLoaderData {
  sales: number[];
  productSales: ProductSale[];
}

const HomeLoader: LoaderFunction = async () => {
  return defer({
    sales: Array.from({ length: 12 }).map(
      (_, i) => 50 + Math.random() * 1000 * (i + 1)
    ),
    productSales: Array.from({ length: MathUtils.randomBetween(5, 20) }).map(
      () => ({
        icon: `data:image/svg+xml;base64,${vanillaSprinkled}`,
        title: "Vanilla Sprinkled Donut",
        description: "Vanilla cream, sprinkles",
        price: MathUtils.randomBetween(0.5, 5),
        unit: "$",
        rating: MathUtils.randomBetween(3, 5),
        totalSales: MathUtils.randomBetween(1000, 30_000),
      })
    ),
  } satisfies HomeLoaderData);
};

export default HomeLoader;
