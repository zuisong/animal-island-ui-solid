import { JSX, createSignal, onMount, onCleanup, For } from 'solid-js';
import styles from './phone.module.less';
import { Icon, IconName } from '../Icon';

export interface PhoneProps {
    class?: string;
}

interface App {
    id: string;
    iconName: IconName;
    color: string;
    offset?: boolean;
    hasNewMessage?: boolean;
    iconStyle?: JSX.CSSProperties;
}

const apps: App[] = [
    { id: 'camera', iconName: 'icon-camera', color: '#B77DEE', hasNewMessage: true },
    { id: 'app', iconName: 'icon-miles', color: '#889DF0', offset: true },
    { id: 'critterpedia', iconName: 'icon-critterpedia', color: '#F7CD67', iconStyle: { width: '105px' } },
    { id: 'diy', iconName: 'icon-diy', color: '#E59266' },
    { id: 'shopping', iconName: 'icon-design', color: '#F8A6B2' },
    { id: 'variant', iconName: 'icon-map', color: '#82D5BB', hasNewMessage: true, iconStyle: { width: '90px' } },
    { id: 'design', iconName: 'icon-variant', color: '#8AC68A', iconStyle: { width: '80px' } },
    { id: 'map', iconName: 'icon-helicopter', color: '#FC736D' },
    { id: 'chat', iconName: 'icon-chat', color: '#D1DA49' },
];

export const Phone = (props: PhoneProps) => {
    const [time, setTime] = createSignal(new Date());

    onMount(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        onCleanup(() => clearInterval(timer));
    });

    const displayTime = () => {
        const t = time();
        const hours = t.getHours();
        const minutes = t.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const displayHours = hours % 12 || 12;
        const displayMinutes = minutes.toString().padStart(2, '0');
        return { displayHours, displayMinutes, ampm };
    };

    return (
        <div class={`${styles.phoneContainer} ${props.class || ''}`}>
            <div class={styles.phone}>
                <div class={styles.screenContent}>
                    <div class={styles.homeScreen}>
                        <div class={styles.dateDisplay}>
                            <div class={styles.dateDisplayHeader}>
                                <span class={styles.iconWifi} />
                                <div>{displayTime().displayHours}<span class={styles.blink}>:</span>{displayTime().displayMinutes}{displayTime().ampm}</div>
                                <span class={styles.iconLocation} />
                            </div>
                            <div class={styles.dayText}>Welcome!</div>
                        </div>
                        <div class={styles.appsGrid}>
                            <For each={apps}>
                                {(app) => (
                                    <div
                                        class={styles.appItem}
                                        classList={{ [styles.appItemOffset]: app.offset }}
                                        style={{ 'background-color': app.color }}
                                    >
                                        {app.hasNewMessage && <span class={styles.badge} />}
                                        <Icon
                                            name={app.iconName}
                                            size="100%"
                                            class={styles.appIcon}
                                            classList={{ [styles.appIconOffset]: app.offset }}
                                            style={{ 'background-size': '70% auto', ...app.iconStyle }}
                                        />
                                    </div>
                                )}
                            </For>
                        </div>
                        <div class={styles.pageIndicator}>
                            <span class={styles.iconPage} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
