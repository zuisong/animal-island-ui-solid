import { JSX, createSignal, Show, onMount, For } from "solid-js";
import { domToCanvas } from "modern-screenshot";
import styles from "./weddingInvitation.module.less";
import weddingTitleImg from "./img/wedding.PNG";
import brideAndGroomImg from "./img/brideandgroom.PNG";
import { injectWeddingFonts, prepareWeddingFontsForExport } from "./fonts";
import { Icon } from "../Icon";

// 模块加载即注入 @font-face —— 网页本身就用这套字体；
// 导出 PNG 时同一批字体会被转成 data URL 注入 SVG，确保渲染一致。
injectWeddingFonts();

export interface WeddingInvitationProps {
  /** 新郎名 */
  groomName?: string;
  /** 新娘名 */
  brideName?: string;
  /** 婚礼日期，例如 "2026.06.15" */
  date?: string;
  /** 星期，例如 "星期六" */
  weekday?: string;
  /** 时间，例如 "10:00 AM" */
  time?: string;
  /** 婚礼地点 */
  venue?: string;
  /** 地点详细地址 */
  address?: string;
  /** 标题 */
  title?: JSX.Element;
  /** 副标题 */
  subtitle?: JSX.Element;
  /** 主信息（动森风邀请语） */
  message?: JSX.Element;
  /** 是否显示底部抽奖号码区，默认 true */
  showLotteryNumber?: boolean;
  /** 抽奖号码，默认 '0001' */
  lotteryNumber?: string;
  /** 抽奖号码区前缀文案，默认 'LUCKY NUMBER' */
  lotteryLabel?: JSX.Element;
  /** 抽奖号码区底部说明文案 */
  lotteryHint?: JSX.Element;
  /** 自定义类名 */
  class?: string;
  /** 自定义类名列表 */
  classList?: { [key: string]: boolean | undefined };
  /** 自定义样式 */
  style?: JSX.CSSProperties;
  /** Ref callback */
  ref?: (el: WeddingInvitationRef) => void;
}

/** 通过 ref 暴露的方法 */
export interface WeddingInvitationRef {
  /** 把请柬导出为 PNG 图片并触发浏览器下载 */
  exportAsImage: (filename?: string) => Promise<void>;
  /** 获取请柬 DOM 根节点 */
  getElement: () => HTMLDivElement | undefined;
}

export type WeddingInvitationExportTarget =
  | WeddingInvitationRef
  | undefined
  | (() => WeddingInvitationRef | undefined)
  | { current?: WeddingInvitationRef | undefined };

// ---------- Decorative SVGs ----------
const Leaf = (p: { class?: string }) => (
  <svg class={p.class} viewBox="0 0 64 64" width="56" height="56" aria-hidden="true">
    <path
      d="M8 56 C 8 24, 32 4, 60 6 C 58 36, 38 58, 8 56 Z"
      fill="#8ac68a"
      stroke="#3d5a1a"
      stroke-width="2.5"
      stroke-linejoin="round"
    />
    <path
      d="M14 50 C 26 40, 40 26, 56 12"
      stroke="#3d5a1a"
      stroke-width="2"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M22 42 C 28 38, 32 34, 36 30"
      stroke="#3d5a1a"
      stroke-width="1.4"
      fill="none"
      stroke-linecap="round"
    />
    <path
      d="M30 48 C 34 44, 38 40, 42 36"
      stroke="#3d5a1a"
      stroke-width="1.4"
      fill="none"
      stroke-linecap="round"
    />
  </svg>
);

const Flower = (p: { color?: string; center?: string; size?: number }) => {
  return (
    <svg viewBox="0 0 32 32" width={p.size || 28} height={p.size || 28} aria-hidden="true">
      <For each={[0, 72, 144, 216, 288]}>
        {(angle) => (
          <ellipse
            cx="16"
            cy="8"
            rx="5"
            ry="7"
            fill={p.color || "#f8a6b2"}
            stroke="#725d42"
            stroke-width="1.2"
            transform={`rotate(${angle} 16 16)`}
          />
        )}
      </For>
      <circle
        cx="16"
        cy="16"
        r="3.5"
        fill={p.center || "#f7cd67"}
        stroke="#725d42"
        stroke-width="1.2"
      />
    </svg>
  );
};

const Heart = (p: { size?: number }) => {
  return (
    <svg viewBox="0 0 64 64" width={p.size || 64} height={p.size || 64} aria-hidden="true">
      <path
        d="M32 56 C 8 40, 4 22, 16 14 C 24 9, 30 14, 32 20 C 34 14, 40 9, 48 14 C 60 22, 56 40, 32 56 Z"
        fill="#fc736d"
        stroke="#725d42"
        stroke-width="2.5"
        stroke-linejoin="round"
      />
      <ellipse
        cx="22"
        cy="22"
        rx="3.5"
        ry="5"
        fill="#fff"
        opacity="0.7"
        transform="rotate(-25 22 22)"
      />
    </svg>
  );
};

const Star = (p: { size?: number; color?: string }) => {
  return (
    <svg viewBox="0 0 24 24" width={p.size || 18} height={p.size || 18} aria-hidden="true">
      <path
        d="M12 2 L14.5 9 L22 9.5 L16 14.5 L18 22 L12 17.5 L6 22 L8 14.5 L2 9.5 L9.5 9 Z"
        fill={p.color || "#f7cd67"}
        stroke="#725d42"
        stroke-width="1.4"
        stroke-linejoin="round"
      />
    </svg>
  );
};

const ScissorsIcon = () => (
  <svg viewBox="0 0 24 24" width="11" height="11" aria-hidden="true">
    <g
      fill="none"
      stroke="#725d42"
      stroke-width="1.6"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="6" cy="18" r="2.4" />
      <path d="M8 7.5 L21 17 M8 16.5 L21 7" />
    </g>
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
    <path
      d="M12 3v12m0 0l-5-5m5 5l5-5M4 17v3a1 1 0 001 1h14a1 1 0 001-1v-3"
      stroke="currentColor"
      stroke-width="2.4"
      stroke-linecap="round"
      stroke-linejoin="round"
      fill="none"
    />
  </svg>
);

const NOTCH_RADIUS = 14;
const LOTTERY_HEIGHT = 160;

const exportNodeAsPng = async (node: HTMLElement, filename: string, scale = 2): Promise<void> => {
  const fontCssText = await prepareWeddingFontsForExport();
  const prevMask = node.style.maskImage;
  node.style.maskImage = "none";

  const fontStyleEl = document.createElement("style");
  fontStyleEl.textContent = fontCssText;
  node.insertBefore(fontStyleEl, node.firstChild);

  try {
    const canvas = await domToCanvas(node, {
      scale,
      backgroundColor: undefined,
      font: { cssText: fontCssText },
    });

    const ctx = canvas.getContext("2d");
    if (ctx) {
      const r = NOTCH_RADIUS * scale;
      const y = canvas.height - LOTTERY_HEIGHT * scale;
      ctx.save();
      ctx.globalCompositeOperation = "destination-out";
      for (const x of [0, canvas.width]) {
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    const dataUrl = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = filename.endsWith(".png") ? filename : `${filename}.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  } finally {
    fontStyleEl.remove();
    node.style.maskImage = prevMask;
  }
};

export const WeddingInvitation = (props: WeddingInvitationProps) => {
  let rootRef: HTMLDivElement | undefined;

  const exportAsImage = async (filename = "wedding-invitation") => {
    if (rootRef) await exportNodeAsPng(rootRef, filename);
  };

  onMount(() => {
    props.ref?.({
      exportAsImage,
      getElement: () => rootRef,
    });
  });

  return (
    <div
      ref={rootRef}
      class={props.class}
      classList={{
        [styles.envelope]: true,
        [styles.noLottery]: props.showLotteryNumber === false,
        ...props.classList,
      }}
      style={props.style}
    >
      <Leaf class={`${styles.cornerLeaf} ${styles.tl}`} />
      <Leaf class={`${styles.cornerLeaf} ${styles.tr}`} />
      <Leaf class={`${styles.cornerLeaf} ${styles.bl}`} />
      <Leaf class={`${styles.cornerLeaf} ${styles.br}`} />

      <span class={`${styles.floatItem} ${styles.f1}`}>
        <Flower color="#f8a6b2" />
      </span>
      <span class={`${styles.floatItem} ${styles.f2}`}>
        <Flower color="#ecdf52" center="#e59266" size={22} />
      </span>
      <span class={`${styles.floatItem} ${styles.f3}`}>
        <Flower color="#b77dee" size={20} />
      </span>
      <span class={`${styles.floatItem} ${styles.s1}`}>
        <Star color="#f7cd67" />
      </span>
      <span class={`${styles.floatItem} ${styles.s2}`}>
        <Star color="#82d5bb" size={14} />
      </span>

      <div class={styles.banner}>
        <span class={styles.bannerLine} />
        <Star size={16} color="#f7cd67" />
        <span class={styles.bannerLine} />
      </div>

      <div class={styles.titleEn}>{props.title || "Wedding Invitation"}</div>
      <div class={styles.titleZh}>
        {props.subtitle === undefined ? (
          <img src={weddingTitleImg} alt="集合啦 婚礼森友会" />
        ) : (
          props.subtitle
        )}
      </div>

      <div class={styles.brideAndGroom}>
        <img src={brideAndGroomImg} alt="bride and groom" />
      </div>

      <div class={styles.coupleRow}>
        <div class={styles.mascot}>
          <div class={styles.name}>{props.brideName || "小兔"}</div>
        </div>
        <div class={styles.heartCol}>
          <Heart size={30} />
        </div>
        <div class={styles.mascot}>
          <div class={styles.name}>{props.groomName || "小狸"}</div>
        </div>
      </div>

      <div class={styles.dateCard}>
        <div class={styles.dateLabel}>婚礼时间</div>
        <div class={styles.dateValue}>{props.date || "2026.06.15"}</div>
        <div class={styles.dateMeta}>
          <span>{props.weekday || "星期六"}</span>
          <span class={styles.dot}>·</span>
          <span>{props.time || "10:00 AM"}</span>
        </div>
      </div>

      <div class={styles.venueCard}>
        <span class={styles.venueIcon}>
          <Icon name="icon-map" size={26} />
        </span>
        <div class={styles.venueText}>
          <div class={styles.venueName}>{props.venue || "彩虹岛 · 樱花广场"}</div>
          <div class={styles.venueAddr}>{props.address || "动物之森 · 无人岛 · K.K. 演奏台前"}</div>
        </div>
      </div>

      <div class={styles.message}>
        {props.message ||
          "哎呀，恭喜恭喜！我们要在小岛上举办婚礼啦~ 诚挚邀请您一同前来见证这个被花瓣和音符包围的日子！"}
      </div>

      <Show when={props.showLotteryNumber !== false}>
        <div class={styles.signatureLottery}>
          <span>抽奖码</span>
          <span class={styles.signatureLotteryNo}>
            <span class={styles.lotteryHash}>NO.</span>
            {props.lotteryNumber || "0001"}
          </span>
        </div>

        <div class={styles.lottery}>
          <span class={styles.tearHint}>
            <ScissorsIcon />
            <span>沿虚线剪开</span>
            <ScissorsIcon />
          </span>
          <div class={styles.lotteryTitle}>婚礼抽奖券</div>
          <div class={styles.lotteryLabel}>
            <Star size={12} color="#f7cd67" />
            <span>{props.lotteryLabel || "LUCKY NUMBER"}</span>
            <Star size={12} color="#f7cd67" />
          </div>
          <div class={styles.lotteryNumber}>
            <span class={styles.lotteryHash}>NO.</span>
            {props.lotteryNumber || "0001"}
          </div>
          <Show when={props.lotteryHint !== undefined}>
            <div class={styles.lotteryHint}>
              {props.lotteryHint || "凭此号码参与现场抽奖 · Keep this stub for the lucky draw"}
            </div>
          </Show>
        </div>
      </Show>
    </div>
  );
};

export interface WeddingInvitationExportButtonProps {
  /** 关联的请柬 ref */
  targetRef: WeddingInvitationExportTarget;
  /** 文件名（不含扩展名） */
  filename?: string;
  /** 自定义文案，默认「保存为图片」 */
  children?: JSX.Element;
  class?: string;
  classList?: { [key: string]: boolean | undefined };
  style?: JSX.CSSProperties;
}

export const WeddingInvitationExportButton = (props: WeddingInvitationExportButtonProps) => {
  const [exporting, setExporting] = createSignal(false);
  const targetRef = () => {
    const target = props.targetRef;
    if (typeof target === "function") return target();
    if (target && "exportAsImage" in target) return target;
    return target?.current;
  };

  const handleClick = async () => {
    if (exporting()) return;
    setExporting(true);
    try {
      await targetRef()?.exportAsImage(props.filename || "wedding-invitation");
    } catch (err) {
      console.error("[WeddingInvitation] 导出图片失败：", err);
      alert(`导出失败：${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setExporting(false);
    }
  };
  return (
    <button
      type="button"
      class={props.class}
      classList={{
        [styles.exportBtn]: true,
        ...props.classList,
      }}
      style={props.style}
      onClick={handleClick}
      disabled={exporting()}
    >
      <DownloadIcon />
      {exporting() ? "生成中…" : props.children || "保存为图片"}
    </button>
  );
};
