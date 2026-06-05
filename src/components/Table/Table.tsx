import { JSX, splitProps, mergeProps, For, Show } from 'solid-js';
import styles from './table.module.less';

export interface TableColumn<T = any> {
    title: JSX.Element;
    dataIndex?: keyof T;
    render?: (value: any, record: T, index: number) => JSX.Element;
    width?: string | number;
    align?: 'left' | 'center' | 'right';
    fixed?: 'left' | 'right';
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
    const merged = mergeProps(
        {
            columns: [],
            dataSource: [],
            rowKey: 'key',
            striped: true,
            showHeader: true,
            emptyText: '暂无数据',
            loading: false,
        },
        props
    );

    const [local, rest] = splitProps(merged, [
        'columns',
        'dataSource',
        'rowKey',
        'striped',
        'showHeader',
        'rowClassName',
        'onRow',
        'loading',
        'emptyText',
        'scroll',
        'class',
        'classList',
        'style',
    ]);

    const getRowKey = (record: any, index: number): string => {
        if (typeof local.rowKey === 'function') {
            return local.rowKey(record);
        }
        return (record[local.rowKey!] as string) || String(index);
    };

    const getRowClassName = (record: any, index: number): string => {
        const classes: string[] = [styles.row];
        if (local.striped && index % 2 === 1) {
            classes.push(styles.striped);
        }
        if (local.rowClassName) {
            if (typeof local.rowClassName === 'function') {
                classes.push(local.rowClassName(record, index));
            } else {
                classes.push(local.rowClassName);
            }
        }
        return classes.join(' ');
    };

    const renderCell = (column: TableColumn, record: any, index: number) => {
        const value = column.dataIndex ? record[column.dataIndex as string] : undefined;
        if (column.render) {
            return column.render(value, record, index);
        }
        return value;
    };

    return (
        <div
            class={styles.wrapper}
            classList={{ [styles.scrollable]: !!local.scroll }}
            style={local.style}
        >
            <table
                class={local.class}
                classList={{
                    [styles.table]: true,
                    [styles.loading]: local.loading,
                    ...local.classList,
                }}
            >
                <Show when={local.showHeader}>
                    <thead class={styles.thead}>
                        <tr class={styles.headerRow}>
                            <For each={local.columns}>
                                {(column) => (
                                    <th
                                        class={styles.headerCell}
                                        style={{
                                            width:
                                                typeof column.width === 'number'
                                                    ? `${column.width}px`
                                                    : column.width,
                                            'text-align': column.align || 'left',
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
                        when={local.dataSource.length > 0}
                        fallback={
                            <tr>
                                <td colSpan={local.columns.length} class={styles.emptyCell}>
                                    <div class={styles.emptyContent}>
                                        <svg
                                            class={styles.emptyIcon}
                                            viewBox="0 0 24 24"
                                            width="48"
                                            height="48"
                                        >
                                            <path
                                                fill="currentColor"
                                                d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V5h14v14zM7 10h2v7H7zm4-3h2v10h-2zm4 6h2v4h-2z"
                                            />
                                        </svg>
                                        <span>{local.emptyText}</span>
                                    </div>
                                </td>
                            </tr>
                        }
                    >
                        <For each={local.dataSource}>
                            {(record, index) => (
                                <tr
                                    class={getRowClassName(record, index())}
                                    {...local.onRow?.(record, index())}
                                >
                                    <For each={local.columns}>
                                        {(column) => (
                                            <td
                                                class={styles.cell}
                                                style={{
                                                    'text-align': column.align || 'left',
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
            <Show when={local.loading}>
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
