import { JSX, createSignal, splitProps, mergeProps, For, Show } from 'solid-js';
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
    const merged = mergeProps({ leafAnimation: true, shadow: true }, props);
    const [local, rest] = splitProps(merged, [
        'items',
        'defaultActiveKey',
        'activeKey',
        'onChange',
        'class',
        'classList',
        'style',
        'leafAnimation',
        'shadow',
    ]);

    const [internalActiveKey, setInternalActiveKey] = createSignal(
        local.defaultActiveKey || local.items[0]?.key
    );

    const currentActiveKey = () => (local.activeKey !== undefined ? local.activeKey : internalActiveKey());

    const handleTabClick = (key: string) => {
        if (local.activeKey === undefined) {
            setInternalActiveKey(key);
        }
        local.onChange?.(key);
    };

    const activeItem = () => local.items.find((item) => item.key === currentActiveKey());

    return (
        <div
            class={local.class}
            classList={{
                [styles.tabs]: true,
                ...local.classList,
            }}
            style={local.style}
        >
            <div class={styles.tabList}>
                <For each={local.items}>
                    {(item) => {
                        const isActive = () => item.key === currentActiveKey();
                        return (
                            <button
                                class={styles.tabItem}
                                classList={{
                                    [styles.active]: isActive(),
                                    [styles['active-shadow']]: isActive() && local.shadow,
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
                                        classList={{ [styles.tabLeafStatic]: !local.leafAnimation }}
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
