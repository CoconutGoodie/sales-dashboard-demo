import clsx from "clsx";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";

import Star from "@src/assets/icons/hugeicons/star.svg?component";

import styles from "./ProductSalesWidget.module.scss";

interface Props {
  className?: string;
  sales: ProductSale[];
}

export interface ProductSale {
  icon: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  rating: number;
  totalSales: number;
}

const columnHelper = createColumnHelper<ProductSale>();

const columns = [
  columnHelper.accessor("title", {
    header: () => <h1>Product</h1>,
    cell: ({ row, getValue }) => {
      return (
        <div className={styles.titleCell}>
          <img src={row.original.icon} />
          <h1>{getValue()}</h1>
          <h2>{row.original.description}</h2>
        </div>
      );
    },
  }),

  columnHelper.accessor("price", {
    header: () => <h1>Price</h1>,
    cell: ({ row, getValue }) => {
      return (
        <span className={styles.priceCell}>
          {row.original.unit}
          {getValue().toFixed(2)}
        </span>
      );
    },
  }),

  columnHelper.accessor("rating", {
    header: () => <h1>Rating</h1>,
    cell: ({ getValue }) => {
      return (
        <div className={styles.ratingCell}>
          <Star width={18} height={18} />
          <span>{getValue().toFixed(1)}</span>
        </div>
      );
    },
  }),

  columnHelper.accessor("totalSales", {
    header: () => <h1>Total Sales</h1>,
    cell: ({ row, getValue }) => {
      return <span>{getValue()}</span>;
    },
  }),
];

export const ProductSalesWidget = (props: Props) => {
  const table = useReactTable<ProductSale>({
    columns,
    data: props.sales,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className={clsx(props.className, styles.widget)}>
      <div className={styles.header}>
        <h1>Product Sales</h1>
        <div>TODO: Select</div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead className={styles.thead}>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} colSpan={header.colSpan}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody className={styles.tbody}>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    <div className={styles.cellWrapper}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
