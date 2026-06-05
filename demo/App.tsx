import {
  createSignal,
  createEffect,
  onCleanup,
  createMemo,
  Loading as SolidLoading,
  lazy,
  Show,
  For,
} from "solid-js";
import type { JSX } from "@solidjs/web";
import { Cursor, Loading } from "../src";
import "../src/styles/index.less";
import "@fontsource/nunito/latin-500.css";
import "@fontsource/nunito/latin-700.css";
import "@fontsource/nunito/latin-900.css";
import "@fontsource/noto-sans-sc/latin-400.css";
import "@fontsource/noto-sans-sc/latin-500.css";
import "@fontsource/noto-sans-sc/latin-700.css";
import "@fontsource/noto-sans-sc/chinese-simplified-400.css";
import "@fontsource/noto-sans-sc/chinese-simplified-500.css";
import "@fontsource/noto-sans-sc/chinese-simplified-700.css";
import HomePage from "./HomePage";
import { PAGE_INFO } from "./pageInfo";
import { useIsMobile } from "./tools";

// Lazy-load ComponentPage so homepage does not pull in every demo on initial load
const ComponentPage = lazy(() => import("./ComponentPage"));

// ============================================
// Simple hash router
// ============================================
const useHash = () => {
  const [hash, setHash] = createSignal(window.location.hash.slice(1) || "/");

  const onHashChange = () => setHash(window.location.hash.slice(1) || "/");
  window.addEventListener("hashchange", onHashChange);
  onCleanup(() => window.removeEventListener("hashchange", onHashChange));

  const navigate = (path: string) => {
    window.location.hash = path;
  };

  return { hash, navigate };
};

interface MenuItemChild {
  key: string;
  label: string;
  isNew?: boolean;
}

interface MenuItem {
  key: string;
  label: string;
  children?: MenuItemChild[];
}

// ============================================
// Menu config
// ============================================
const MENU_ITEMS: MenuItem[] = [
  {
    key: "cat-basic",
    label: "── 基础组件 ──",
    children: [
      { key: "title", label: "Title 标题", isNew: true },
      { key: "button", label: "Button 按钮" },
      { key: "input", label: "Input 输入框" },
      { key: "switch", label: "Switch 开关" },
      { key: "card", label: "Card 卡片" },
      { key: "collapse", label: "Collapse 折叠面板" },
      { key: "cursor", label: "Cursor 光标" },
      { key: "modal", label: "Modal 弹窗" },
      { key: "typewriter", label: "Typewriter 打字机" },
      { key: "divider-comp", label: "Divider 分割线" },
      { key: "icon", label: "Icon 图标", isNew: true },
      { key: "select", label: "Select 选择器" },
      { key: "checkbox", label: "Checkbox 多选框" },
      { key: "radio", label: "Radio 单选框" },
      { key: "tooltip", label: "Tooltip 气泡提示" },
      { key: "tabs", label: "Tabs 标签页" },
      { key: "footer", label: "Footer 页脚" },
      { key: "codeblock", label: "CodeBlock 代码高亮" },
      { key: "loading", label: "Loading 加载", isNew: true },
      { key: "table", label: "Table 表格" },
    ],
  },
  {
    key: "cat-complex",
    label: "── 复杂组件 ──",
    children: [
      { key: "wallet", label: "Wallet 钱包", isNew: true },
      { key: "time", label: "Time 时间" },
      { key: "phone", label: "Phone 手机" },
      { key: "wedding-invitation", label: "Wedding 婚礼请柬", isNew: true },
    ],
  },
];

// ============================================
// Shared styles
// ============================================
const S = {
  layout: {
    display: "flex",
    height: "100dvh",
    overflow: "hidden",
    "font-family":
      "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
    background: `url(${new URL("./img/content_bg_pc.jpg", import.meta.url).href}) center / auto repeat`,
  } as JSX.CSSProperties,
  sidebar: {
    width: "220px",
    "min-width": "220px",
    background: `url(${new URL("./img/menu_bg.svg", import.meta.url).href}) center/cover no-repeat`,
    display: "flex",
    "flex-direction": "column",
    overflow: "hidden",
  } as JSX.CSSProperties,
  homeBg: {
    background: `url(${new URL("./img/home_bg.webp", import.meta.url).href}) 0 0 / auto repeat, #7DC395`,
    animation: "bgScroll 80s linear infinite",
  } as JSX.CSSProperties,
  sidebarHeader: {
    padding: "20px 16px 12px",
    "border-bottom": "1px solid #e8e2d6",
    "font-weight": 700,
    "font-size": "15px",
    color: "#725d42",
    "letter-spacing": "-0.3px",
    display: "flex",
    "align-items": "center",
  } as JSX.CSSProperties,
  menuList: {
    flex: 1,
    overflow: "auto",
    padding: "8px 0",
  } as JSX.CSSProperties,
  menuItem: (active: boolean) =>
    ({
      display: "flex",
      "align-items": "center",
      "justify-content": "space-between",
      gap: "8px",
      margin: "1px 5px",
      height: "40px",
      padding: "0 12px",
      "font-family":
        "Nunito, 'Noto Sans SC', 'Zen Maru Gothic', -apple-system, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', sans-serif",
      "font-style": "normal",
      "font-weight": 600,
      "font-size": "14px",
      "padding-left": "26px",
      color: active ? "#fff" : "#8a7b66",
      background: active ? "#B7C6E5" : "transparent",
      "border-radius": "12px",
      "border-right": "none",
      transition: "all 0.15s",
    }) as JSX.CSSProperties,
  menuBadge: (active: boolean) =>
    ({
      "flex-shrink": 0,
      padding: "1px 7px",
      "font-size": "9px",
      "font-weight": 800,
      "letter-spacing": "0.6px",
      color: active ? "#fc736d" : "#fff",
      background: active ? "#fff" : "linear-gradient(135deg, #fc736d, #f7825a)",
      "border-radius": "8px",
      "line-height": "14px",
      "box-shadow": active ? "0 1px 0 rgba(114, 93, 66, 0.15)" : "0 1px 0 rgba(114, 93, 66, 0.25)",
      animation: "menuBadgePulse 1.8s ease-in-out infinite",
    }) as JSX.CSSProperties,
  main: {
    flex: 1,
    overflow: "auto",
    padding: "32px 40px",
  } as JSX.CSSProperties,
};

// ============================================
// Sidebar content (shared between desktop & mobile drawer)
// ============================================
const SidebarContent = (props: { activeKey: string; onNavigate: (path: string) => void }) => (
  <>
    <div style={S.sidebarHeader} onClick={() => props.onNavigate("/")}>
      <img
        src={new URL("./img/nook-phone/nook1.svg", import.meta.url).href}
        style={{ width: "24px", height: "24px", "margin-right": "8px" }}
        alt="nook"
      />
      集合啦！Animal
    </div>
    <nav style={S.menuList}>
      <For each={MENU_ITEMS}>
        {(item) => (
          <Show
            when={item.children}
            fallback={
              <div
                style={S.menuItem(props.activeKey === item.key)}
                onClick={() => props.onNavigate(`/${item.key}`)}
              >
                <span style={{ color: props.activeKey === item.key ? "#fff" : "#8a7b66" }}>
                  {item.label}
                </span>
              </div>
            }
          >
            <div>
              <div
                style={{
                  padding: "12px 16px 4px",
                  "font-size": "11px",
                  color: "#a0936e",
                  "font-weight": "600",
                  "letter-spacing": "0.5px",
                }}
              >
                {item.label}
              </div>
              <For each={item.children}>
                {(child) => (
                  <div
                    style={S.menuItem(props.activeKey === child.key)}
                    onClick={() => props.onNavigate(`/${child.key}`)}
                    onMouseEnter={(e) => {
                      if (props.activeKey !== child.key)
                        e.currentTarget.style.background = "#d6dff0";
                    }}
                    onMouseLeave={(e) => {
                      if (props.activeKey !== child.key)
                        e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <span
                      style={{
                        color: props.activeKey === child.key ? "#fff" : "#8a7b66",
                      }}
                    >
                      {child.label}
                    </span>
                    <Show when={child.isNew}>
                      <span style={S.menuBadge(props.activeKey === child.key)}>NEW</span>
                    </Show>
                  </div>
                )}
              </For>
            </div>
          </Show>
        )}
      </For>
    </nav>
  </>
);

// ============================================
// App
// ============================================
const App = () => {
  const { hash, navigate } = useHash();
  const isMobile = useIsMobile();
  const [drawerOpen, setDrawerOpen] = createSignal(false);
  const [loadingActive, setLoadingActive] = createSignal(false);
  const [loadingMounted, setLoadingMounted] = createSignal(false);
  let mainRef: HTMLElement | undefined;

  const activeKey = createMemo(() =>
    hash().startsWith("/") && hash().length > 1 ? hash().slice(1) : "home",
  );
  const isHomePage = () => activeKey() === "home";

  createEffect(() => isMobile(), (mobile) => {
    if (!mobile) setDrawerOpen(false);
  });

  createEffect(() => activeKey(), () => {
    setDrawerOpen(false);
    mainRef?.scrollTo({ top: 0 });
  });

  const handleNavigate = (path: string) => {
    navigate(path);
    setDrawerOpen(false);
  };

  const handleHomeNavigate = (path: string) => {
    setLoadingMounted(true);
    setLoadingActive(true);
    navigate(path);
    setTimeout(() => setLoadingActive(false), 2000);
    setTimeout(() => setLoadingMounted(false), 3500);
  };

  return (
    <Cursor>
      <style>{`
                @keyframes bgScroll {
                    0% { background-position: 100% 0%; }
                    100% { background-position: 0% 100%; }
                }
                @keyframes menuBadgePulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                }
            `}</style>
      <Show
        when={!isHomePage()}
        fallback={
          <div
            style={{
              ...S.layout,
              ...S.homeBg,
              "justify-content": "center",
            }}
          >
            <HomePage onNavigate={handleHomeNavigate} />
          </div>
        }
      >
        <div style={S.layout}>
          <Show when={!isMobile()}>
            <aside style={S.sidebar}>
              <SidebarContent activeKey={activeKey()} onNavigate={handleNavigate} />
            </aside>
          </Show>

          <Show when={isMobile()}>
            <div
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                height: "52px",
                display: "flex",
                "align-items": "center",
                "justify-content": "space-between",
                padding: "0 12px",
                background: "rgba(255,252,244,0.92)",
                "backdrop-filter": "blur(8px)",
                "border-bottom": "1px solid #e8e2d6",
                "z-index": 50,
                "font-family": S.layout["font-family"] as string,
              }}
            >
              <button
                onClick={() => navigate("/")}
                style={{
                  background: "none",
                  border: "none",
                  "font-size": "20px",
                  color: "#725d42",
                  padding: "4px 8px",
                  "border-radius": "8px",
                  "line-height": 1,
                }}
              >
                ←
              </button>
              <span
                style={{
                  "font-weight": 700,
                  "font-size": "15px",
                  color: "#725d42",
                }}
              >
                {PAGE_INFO[activeKey()]?.title ?? "组件文档"}
              </span>
              <button
                onClick={() => setDrawerOpen(true)}
                style={{
                  background: "none",
                  border: "none",
                  "font-size": "20px",
                  color: "#725d42",
                  padding: "4px 8px",
                  "border-radius": "8px",
                  "line-height": 1,
                }}
              >
                ☰
              </button>
            </div>
          </Show>

          <Show when={isMobile() && drawerOpen()}>
            <>
              <div
                style={{
                  position: "fixed",
                  inset: 0,
                  background: "rgba(0,0,0,0.35)",
                  "z-index": 98,
                }}
                onClick={() => setDrawerOpen(false)}
              />
              <aside
                style={{
                  ...S.sidebar,
                  position: "fixed",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "240px",
                  "z-index": 99,
                  "box-shadow": "4px 0 24px rgba(0,0,0,0.15)",
                }}
              >
                <SidebarContent activeKey={activeKey()} onNavigate={handleNavigate} />
              </aside>
            </>
          </Show>

          <main
            ref={mainRef}
            style={{
              ...S.main,
              position: "relative",
              "z-index": 1,
              padding: isMobile() ? "16px" : "32px 40px",
              "padding-top": isMobile() ? "68px" : "32px",
            }}
          >
            <SolidLoading fallback={null}>
              <ComponentPage activeKey={activeKey()} />
            </SolidLoading>
          </main>

          <Show when={!isMobile()}>
            <img
              src={new URL("./img/guide-bg-line.webp", import.meta.url).href}
              alt=""
              loading="lazy"
              decoding="async"
              style={{
                position: "fixed",
                left: "220px",
                right: 0,
                bottom: 0,
                width: "calc(100% - 220px)",
                "pointer-events": "none",
                "z-index": 0,
              }}
            />
          </Show>
        </div>
      </Show>
      <Show when={loadingMounted()}>
        <div
          style={{
            position: "fixed",
            inset: 0,
            "z-index": 9999,
            "pointer-events": loadingActive() ? "auto" : "none",
          }}
        >
          <Loading active={loadingActive()} />
        </div>
      </Show>
    </Cursor>
  );
};

export default App;
