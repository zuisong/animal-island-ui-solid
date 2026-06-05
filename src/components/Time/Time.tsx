import { JSX, createSignal, onMount, onCleanup, splitProps } from 'solid-js';
import styles from './time.module.less';

export interface TimeProps {
    class?: string;
}

const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export const Time = (props: TimeProps) => {
    const [local, rest] = splitProps(props, ['class']);
    const [currentTime, setCurrentTime] = createSignal(new Date());

    onMount(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        onCleanup(() => clearInterval(timer));
    });

    return (
        <div class={`${styles.acDatetime} ${local.class || ''}`}>
            <div class={styles.acDate}>
                <span class={styles.acWeekday}>{weekdays[currentTime().getDay()]}</span>
                <span class={styles.acMonthday}>
                    {months[currentTime().getMonth()]} {currentTime().getDate()}
                </span>
            </div>
            <div class={styles.acTime}>
                {currentTime().getHours().toString().padStart(2, '0')}
                <span class={styles.acColon}>:</span>
                {currentTime().getMinutes().toString().padStart(2, '0')}
            </div>
        </div>
    );
};
