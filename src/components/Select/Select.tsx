import { JSX, createSignal, For, createEffect, onCleanup, Show } from 'solid-js';
import styles from './select.module.less';

export type SelectOption = {
    key: string;
    label: string;
};

export interface SelectProps {
    options: SelectOption[];
    value: string;
    onChange: (key: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

export const Select = (props: SelectProps) => {
    const [open, setOpen] = createSignal(false);
    const [hoveredKey, setHoveredKey] = createSignal<string | null>(null);
    const [dropdownStyle, setDropdownStyle] = createSignal<JSX.CSSProperties>({});
    const [mounted, setMounted] = createSignal(false);
    
    let wrapperRef: HTMLDivElement | undefined;
    const currentLabel = () => props.options.find((o) => o.key === props.value)?.label || (props.placeholder || '请选择');

    createEffect(() => {
        if (!open()) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (wrapperRef && !wrapperRef.contains(e.target as Node)) {
                setOpen(false);
                setMounted(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        onCleanup(() => document.removeEventListener('mousedown', handleClickOutside));
    });

    createEffect(() => {
        if (open() && wrapperRef) {
            const rect = wrapperRef.getBoundingClientRect();
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;
            const dropdownHeight = props.options.length * 44 + 24;

            const newStyle: JSX.CSSProperties = {
                position: 'absolute',
            };

            if (rect.right + 200 > viewportWidth) {
                newStyle.right = '100%';
                newStyle['margin-right'] = '6px';
                newStyle.left = 'auto';
            } else {
                newStyle.left = '100%';
                newStyle['margin-left'] = '6px';
                newStyle.right = 'auto';
            }

            const spaceBelow = viewportHeight - rect.bottom;
            const spaceAbove = rect.top;

            if (spaceBelow < dropdownHeight && spaceAbove > spaceBelow) {
                newStyle.top = 'auto';
                newStyle.bottom = '100%';
                newStyle['margin-bottom'] = '6px';
            } else if (spaceBelow < dropdownHeight || rect.top < dropdownHeight) {
                newStyle.top = '100%';
                newStyle['margin-top'] = '6px';
                newStyle.bottom = 'auto';
            } else {
                newStyle.top = '50%';
                newStyle.transform = 'translateY(-50%)';
                newStyle.bottom = 'auto';
            }

            setDropdownStyle(newStyle);
            requestAnimationFrame(() => {
                setMounted(true);
            });
        } else if (!open()) {
            setMounted(false);
        }
    });

    const handleSelect = (key: string) => {
        props.onChange(key);
        setOpen(false);
        setMounted(false);
    };

    return (
        <div
            ref={wrapperRef}
            class={styles.wrapper}
            classList={{ [styles.disabled]: props.disabled }}
        >
            <div
                class={styles.trigger}
                classList={{ [styles.open]: open() }}
                onClick={() => !props.disabled && setOpen(!open())}
            >
                <span class={props.value ? styles.value : styles.placeholder}>
                    {currentLabel()}
                </span>
                <span class={styles.arrow}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </span>
            </div>
            <Show when={open() && mounted()}>
                <div class={styles.dropdown} style={dropdownStyle()}>
                    <For each={props.options}>
                        {(option) => (
                            <div
                                class={styles.option}
                                classList={{
                                    [styles.active]: props.value === option.key,
                                    [styles.hovered]: hoveredKey() === option.key
                                }}
                                onClick={() => handleSelect(option.key)}
                                onMouseEnter={() => setHoveredKey(option.key)}
                                onMouseLeave={() => setHoveredKey(null)}
                            >
                                <span class={styles.optionDot} />
                                {option.label}
                                {props.value === option.key && <div class={styles.pillBar} />}
                            </div>
                        )}
                    </For>
                </div>
            </Show>
        </div>
    );
};
