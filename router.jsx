// Router — manages a stack of screens with slide push/pop transitions.
// Single source of truth for app state (current user, joined game IDs, etc.).

// ─── App state context ──────────────────────────────────────────────────────
const AppCtx = React.createContext(null);

function AppProvider({ children }) {
  const [user, setUser] = React.useState(null); // null until onboarding done
  const [joined, setJoined] = React.useState({});  // { [gameId]: true }
  const [tab, setTab] = React.useState('Games');  // active bottom tab
  const [stack, setStack] = React.useState([{ name: 'home', anim: 'none' }]);
  const [pendingPop, setPendingPop] = React.useState(false);

  const push = React.useCallback((screen, opts = {}) => {
    const kind = opts.kind || 'page';
    setStack((s) => [...s, { ...screen, kind, phase: 'enter' }]);
  }, []);

  const pop = React.useCallback(() => {
    setStack((s) => {
      if (s.length <= 1) return s;
      return s.map((sc, i) => (i === s.length - 1 ? { ...sc, phase: 'exit' } : sc));
    });
    setPendingPop(true);
  }, []);

  // When a pop transition finishes, actually drop the top.
  React.useEffect(() => {
    if (!pendingPop) return;
    const t = setTimeout(() => {
      setStack((s) => s.slice(0, -1));
      setPendingPop(false);
    }, 320);
    return () => clearTimeout(t);
  }, [pendingPop]);

  const resetTo = React.useCallback((screen) => {
    setStack([{ ...screen, kind: 'page', phase: null }]);
  }, []);

  // Onboarding finishes by setting user + reset stack to home.
  const finishOnboarding = React.useCallback((u) => {
    setUser(u);
    setStack([{ name: 'home', kind: 'fade', phase: 'enter' }]);
  }, []);

  // Switching tabs replaces the stack.
  const switchTab = React.useCallback((t) => {
    setTab(t);
    if (t === 'Games') setStack([{ name: 'home', kind: 'fade', phase: 'enter' }]);
    if (t === 'Profile') setStack([{ name: 'profile', kind: 'fade', phase: 'enter' }]);
  }, []);

  const joinGame = React.useCallback((gameId) => {
    setJoined((j) => ({ ...j, [gameId]: true }));
  }, []);

  const api = {
    user, setUser,
    joined, joinGame,
    tab, switchTab,
    stack, push, pop, resetTo, finishOnboarding,
  };

  return <AppCtx.Provider value={api}>{children}</AppCtx.Provider>;
}

function useApp() { return React.useContext(AppCtx); }

// ─── Screen frame ───────────────────────────────────────────────────────────
// Animates entrance/exit based on entry.kind ('page' | 'sheet' | 'fade').
// 'page'  → slide horizontally from right
// 'sheet' → wrapper fades; sheet content (CSS keyframe) slides up from bottom
// 'fade'  → cross-fade
function ScreenSlot({ entry, isTop }) {
  const { name, kind, phase, props } = entry;
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Pre-position based on kind + entering phase.
    if (phase === 'enter') {
      if (kind === 'page') { el.style.transform = 'translateX(100%)'; el.style.opacity = '1'; }
      else if (kind === 'sheet' || kind === 'fade') { el.style.opacity = '0'; el.style.transform = 'none'; }
      requestAnimationFrame(() => requestAnimationFrame(() => {
        if (kind === 'page') {
          el.style.transition = 'transform .32s cubic-bezier(.2,.7,.2,1)';
          el.style.transform = 'translateX(0)';
        } else if (kind === 'sheet') {
          el.style.transition = 'opacity .22s ease-out';
          el.style.opacity = '1';
        } else if (kind === 'fade') {
          el.style.transition = 'opacity .25s ease-out';
          el.style.opacity = '1';
        }
      }));
    } else if (phase === 'exit') {
      if (kind === 'page') {
        el.style.transition = 'transform .32s cubic-bezier(.2,.7,.2,1)';
        el.style.transform = 'translateX(100%)';
      } else if (kind === 'sheet') {
        el.style.transition = 'opacity .22s ease-in';
        el.style.opacity = '0';
      }
    }
  }, [phase, kind]);

  const Comp = SCREENS[name];
  if (!Comp) return null;

  return (
    <div ref={ref} style={{
      position: 'absolute', inset: 0,
      overflow: 'hidden',
      zIndex: isTop ? 2 : 1,
      pointerEvents: phase === 'exit' ? 'none' : 'auto',
    }}>
      <Comp {...(props || {})} />
    </div>
  );
}

function Router() {
  const { stack, user } = useApp();

  // Show only the top two screens (underlay + top) to keep things light.
  // When popping, both the leaving (top) and the one underneath need to be in
  // the DOM so the slide-out reveals it.
  const visible = stack.slice(-2);

  // If user isn't onboarded yet, the onboarding flow owns the whole frame.
  if (!user) {
    return (
      <div style={{ position: 'absolute', inset: 0, background: COLORS.chalk, overflow: 'hidden' }}>
        <OnboardingFlow />
      </div>
    );
  }

  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
      {visible.map((s, i) => (
        <ScreenSlot key={`${stack.length - visible.length + i}-${s.name}`}
          entry={s} isTop={i === visible.length - 1} />
      ))}
    </div>
  );
}

Object.assign(window, { AppProvider, useApp, Router });
