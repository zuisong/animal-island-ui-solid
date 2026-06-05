import { JSX, createSignal, For, Show } from 'solid-js';
import styles from './tabs.module.less';
import leafIcon from '../../assets/img/icons/icon-leaf.png';

export interface TabItem {
    key: string;
    label: JSX.Element;
    children: JSX.Element;
}

export interface TabsProps {
    items: TabItem[];
    defaultActiveKey?: string;
    activeKey?: string;
    onChange?: (key: string) => void;
    class?: string;
    classList?: { [key: string]: boolean | undefined };
    style?: JSX.CSSProperties;
    leafAnimation?: boolean;
    shadow?: boolean;
}

export const Tabs = (props: TabsProps) => {
    const items = () => props.items || [];
    const [internalActiveKey, setInternalActiveKey] = createSignal(
        props.defaultActiveKey || items()[0]?.key
    );

    const currentActiveKey = () => (props.activeKey !== undefined ? props.activeKey : internalActiveKey());

    const handleTabClick = (key: string) => {
        if (props.activeKey === undefined) {
            setInternalActiveKey(key);
        }
        props.onChange?.(key);
    };

    const activeItem = () => items().find((item) => item.key === currentActiveKey());

    return (
        <div
            class={props.class}
            classList={{
                [styles.tabs]: true,
                ...props.classList,
            }}
            style={props.style}
        >
            <div class={styles.tabList}>
                <For each={items()}>
                    {(item) => {
                        const isActive = () => item.key === currentActiveKey();
                        return (
                            <button
                                class={styles.tabItem}
                                classList={{
                                    [styles.active]: isActive(),
                                    [styles['active-shadow']]: isActive() && props.shadow !== false,
                                }}
                                onClick={() => handleTabClick(item.key)}
                            >
                                <span class={styles.tabIcon}>{isActive() ? '●' : '○'}</span>
                                <span class={styles.tabLabel}>{item.label}</span>
                                <Show when={isActive()}>
                                    <img
                                        src={leafIcon}
                                        alt=""
                                        class={styles.tabLeaf}
                                        classList={{ [styles.tabLeafStatic]: props.leafAnimation === false }}
                                    />
                                </Show>
                            </button>
                        );
                    }}
                </For>
            </div>
            <div class={styles.tabContent}>
                <div class={styles.tabContentInner}>{activeItem()?.children}</div>
            </div>
        </div>
    );
};
