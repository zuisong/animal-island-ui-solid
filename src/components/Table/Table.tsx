import { For, Show } from "solid-js";
import type { JSX } from "@solidjs/web";
import styles from "./table.module.less";

export interface TableColumn<T = any> {
  title: JSX.Element;
  dataIndex?: keyof T;
  render?: (value: any, record: T, index: number) => JSX.Element;
  width?: string | number;
  align?: "left" | "center" | "right";
  fixed?: "left" | "right";
  style?: JSX.CSSProperties;
}

export interface TableProps {
  columns?: TableColumn[];
  dataSource?: any[];
  rowKey?: string | ((record: any) => string);
  striped?: boolean;
  showHeader?: boolean;
  rowClassName?: string | ((record: any, index: number) => string);
  onRow?: (record: any, index: number) => JSX.HTMLAttributes<HTMLTableRowElement>;
  loading?: boolean;
  emptyText?: JSX.Element;
  scroll?: {
    x?: number | string;
    y?: number | string;
  };
  class?: string;
  classList?: { [key: string]: boolean | undefined };
  style?: JSX.CSSProperties;
}

export const Table = (props: TableProps) => {
  const getRowClassName = (record: any, index: number): string => {
    const classes: string[] = [styles.row];
    if (props.striped !== false && index % 2 === 1) {
      classes.push(styles.striped);
    }
    if (props.rowClassName) {
      if (typeof props.rowClassName === "function") {
        classes.push(props.rowClassName(record, index));
      } else {
        classes.push(props.rowClassName);
      }
    }
    return classes.join(" ");
  };

  const renderCell = (column: TableColumn, record: any, index: number) => {
    const value = column.dataIndex ? record[column.dataIndex as string] : undefined;
    if (column.render) {
      return column.render(value, record, index);
    }
    return value;
  };

  const columns = () => props.columns || [];
  const dataSource = () => props.dataSource || [];

  return (
    <div
      class={[styles.wrapper, props.scroll ? styles.scrollable : undefined]
        .flat()
        .filter(Boolean) as any}
      style={props.style}
    >
      <table
        class={[
          styles.table,
          props.class,
          props.loading ? styles.loading : undefined,
          props.classList,
        ]
          .flat()
          .filter(Boolean) as any}
      >
        <Show when={props.showHeader !== false}>
          <thead class={styles.thead}>
            <tr class={styles.headerRow}>
              <For each={columns()}>
                {(column) => (
                  <th
                    class={styles.headerCell}
                    style={{
                      width: typeof column.width === "number" ? `${column.width}px` : column.width,
                      "text-align": column.align || "left",
                      ...column.style,
                    }}
                  >
                    {column.title}
                  </th>
                )}
              </For>
            </tr>
          </thead>
        </Show>
        <tbody class={styles.tbody}>
          <Show
            when={dataSource().length > 0}
            fallback={
              <tr>
                <td colspan={columns().length} class={styles.emptyCell}>
                  <div class={styles.emptyContent}>
                    <svg class={styles.emptyIcon} viewBox="0 0 24 24" width="48" height="48">
                      <path
                        fill="currentColor"
                        d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"
                      />
                    </svg>
                    <span>{props.emptyText || "暂无数据"}</span>
                  </div>
                </td>
              </tr>
            }
          >
            <For each={dataSource()}>
              {(record, index) => (
                <tr class={getRowClassName(record, index())} {...props.onRow?.(record, index())}>
                  <For each={columns()}>
                    {(column) => (
                      <td
                        class={styles.cell}
                        style={{
                          "text-align": column.align || "left",
                          ...column.style,
                        }}
                      >
                        {renderCell(column, record, index())}
                      </td>
                    )}
                  </For>
                </tr>
              )}
            </For>
          </Show>
        </tbody>
      </table>
      <Show when={props.loading}>
        <div class={styles.loadingOverlay}>
          <div class={styles.loadingSpinner}>
            <svg viewBox="0 0 50 50" width="40" height="40">
              <circle
                cx="25"
                cy="25"
                r="20"
                fill="none"
                stroke="currentColor"
                stroke-width="4"
                stroke-linecap="round"
                stroke-dasharray="31.4 31.4"
              />
            </svg>
          </div>
        </div>
      </Show>
    </div>
  );
};
