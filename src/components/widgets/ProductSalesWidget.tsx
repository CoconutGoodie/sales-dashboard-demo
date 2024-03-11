import clsx from "clsx";
import {
  useReactTable,
  getCoreRowModel,
  createColumnHelper,
  flexRender,
} from "@tanstack/react-table";

import styles from "./ProductSalesWidget.module.scss";

interface Props {
  className?: string;
}

interface Product {
  icon: string;
  title: string;
  description: string;
  price: number;
  unit: string;
  rating: number;
  totalSales: number;
}

const columnHelper = createColumnHelper<Product>();

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
        <span>
          {row.original.unit}
          {getValue()}
        </span>
      );
    },
  }),

  columnHelper.accessor("rating", {
    header: () => <h1>Rating</h1>,
    cell: ({ row, getValue }) => {
      return <span>⭐{getValue()}</span>;
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
  const table = useReactTable<Product>({
    columns,
    data: [
      ...Array.from({ length: 20 }).map(() => ({
        icon: "data:image/png;base64,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",
        title: "Vanilla Sprinkled Donut",
        description: "Hey this is a generic donut",
        price: 1.57,
        unit: "$",
        rating: 4.2,
        totalSales: 15410,
      })),
    ],
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
