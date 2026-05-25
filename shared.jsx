// Shared UI atoms used across all three home-screen variations.

const FONT = '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", system-ui, sans-serif';

// ─── Icons ──────────────────────────────────────────────────────────────────
const Ico = {
  search: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" />
    </svg>
  ),
  pin: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M12 21s-7-6.5-7-12a7 7 0 1 1 14 0c0 5.5-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" />
    </svg>
  ),
  clock: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" />
    </svg>
  ),
  users: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
      <circle cx="9.5" cy="7" r="3.5" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  ball: (p = {}) => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="1.8" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="9.5" />
      <path d="M12 4l3.2 2.4-1.2 3.8h-4l-1.2-3.8L12 4z" />
      <path d="M14 10l3.2 2.2-1.2 3.8-3.6.7-3.6-.7-1.2-3.8L10 10" />
    </svg>
  ),
  bell: (p = {}) => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 8 3 8H3s3-1 3-8" /><path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  ),
  filter: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M3 5h18M6 12h12M10 19h4" />
    </svg>
  ),
  chevR: (p = {}) => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M9 6l6 6-6 6" />
    </svg>
  ),
  chevD: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
  flame: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M13.5 2c.5 3-1.5 4-1.5 6.5 0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5c1 1.5 2 3.5 2 5.5 0 4-3 7.5-7 7.5s-7-3-7-7c0-4 4-7 4-10 0-1 .5-2 2-2.5 1 1 2.5 1 2.5 0z" />
    </svg>
  ),
  bolt: (p = {}) => (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  ),
  plus: (p = {}) => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2.6" strokeLinecap="round" {...p}>
      <path d="M12 5v14M5 12h14" />
    </svg>
  ),
  star: (p = {}) => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4-6 4 1.5-7.5L2 9h7z" />
    </svg>
  ),
  locate: (p = {}) => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...p}>
      <circle cx="12" cy="12" r="3" /><circle cx="12" cy="12" r="9" />
      <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
    </svg>
  ),
};

// ─── Stacked player avatars ─────────────────────────────────────────────────
function Avatars({ count = 4, size = 24, total, filled, ring = '#fff' }) {
  const pick = AVATARS.slice(0, count);
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        {pick.map((a, i) => (
          <div key={i} style={{
            width: size, height: size, borderRadius: '50%',
            background: a.c, color: '#fff',
            border: `2px solid ${ring}`,
            marginLeft: i === 0 ? 0 : -size * 0.35,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: size * 0.42, fontWeight: 700, letterSpacing: -0.3,
            fontFamily: FONT,
          }}>{a.i}</div>
        ))}
        {filled > count && (
          <div style={{
            width: size, height: size, borderRadius: '50%',
            background: '#e6ebe7', color: COLORS.inkSoft,
            border: `2px solid ${ring}`,
            marginLeft: -size * 0.35,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: size * 0.38, fontWeight: 700,
            fontFamily: FONT,
          }}>+{filled - count}</div>
        )}
      </div>
    </div>
  );
}

// ─── Slot progress bar ──────────────────────────────────────────────────────
function SlotBar({ filled, total, hot, w = '100%' }) {
  const pct = filled / total;
  const color = hot ? '#ef4444' : COLORS.greenDeep;
  return (
    <div style={{ width: w }}>
      <div style={{
        height: 5, background: '#eef0ec', borderRadius: 99, overflow: 'hidden',
      }}>
        <div style={{ width: `${pct * 100}%`, height: '100%', background: color, borderRadius: 99 }} />
      </div>
    </div>
  );
}

// ─── Skill chip ─────────────────────────────────────────────────────────────
function SkillChip({ level, sm = false }) {
  const s = SKILL[level];
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 5,
      background: s.bg, color: s.fg,
      padding: sm ? '2px 7px' : '3px 9px',
      borderRadius: 99,
      fontSize: sm ? 10 : 11, fontWeight: 650, letterSpacing: 0.1,
      fontFamily: FONT,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: 99, background: s.dot }} />
      {level}
    </div>
  );
}

// ─── Pitch background — three abstract palette variations ───────────────────
function PitchBG({ hue = 0, style = {} }) {
  const stops = [
    [COLORS.pitch, COLORS.pitchDeep, COLORS.grass],           // classic
    ['#1a3d8a', '#0a2570', '#3258b0'],                        // night blue
    ['#7a4a18', '#52310f', '#a36a2a'],                        // clay
  ][hue];
  return (
    <div style={{
      position: 'absolute', inset: 0, overflow: 'hidden',
      background: `linear-gradient(135deg, ${stops[0]} 0%, ${stops[1]} 100%)`,
      ...style,
    }}>
      {/* mowed-pitch stripes */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `repeating-linear-gradient(180deg, transparent 0 22px, ${stops[2]}33 22px 44px)`,
        opacity: 0.7,
      }} />
      {/* center circle hint */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: 'translate(-50%, -50%)',
        width: 180, height: 180, borderRadius: '50%',
        border: `1.5px solid ${stops[2]}66`,
      }} />
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%',
        height: 1.5, background: `${stops[2]}66`,
      }} />
      {/* corner glow */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'radial-gradient(120% 80% at 30% 30%, rgba(255,255,255,0.18), transparent 60%)',
      }} />
    </div>
  );
}

// ─── Bottom tab bar ─────────────────────────────────────────────────────────
// Reads/writes the active tab through useApp(); falls back to a static prop
// for places (like the design-canvas variations) where the app context isn't
// mounted.
function TabBar({ active }) {
  const app = (typeof useApp === 'function' && React.useContext(AppCtx)) || null;
  const cur = active || (app && app.tab) || 'Games';
  const onTap = (k) => {
    if (!app) return;
    if (k === 'Games' || k === 'Profile') app.switchTab(k);
  };
  const tabs = [
    { k: 'Games',   ic: Ico.ball },
    { k: 'Map',     ic: Ico.pin },
    { k: 'Host',    ic: Ico.plus,  fab: true },
    { k: 'Inbox',   ic: Ico.bell },
    { k: 'Profile', ic: Ico.users },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: '#fff',
      borderTop: `1px solid ${COLORS.hairline}`,
      paddingBottom: 28, paddingTop: 8,
      display: 'flex', justifyContent: 'space-around', alignItems: 'flex-start',
      fontFamily: FONT,
      zIndex: 30,
    }}>
      {tabs.map((t) => {
        if (t.fab) return (
          <div key={t.k} style={{ marginTop: -22, cursor: 'pointer' }}>
            <div style={{
              width: 52, height: 52, borderRadius: 26,
              background: COLORS.pitch, color: COLORS.lime,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 6px 16px rgba(10,61,31,0.35)',
            }}><t.ic /></div>
          </div>
        );
        const on = t.k === cur;
        return (
          <div key={t.k} onClick={() => onTap(t.k)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: on ? COLORS.pitch : COLORS.muted,
            minWidth: 56, cursor: 'pointer',
          }}>
            <t.ic />
            <div style={{ fontSize: 10.5, fontWeight: on ? 700 : 500 }}>{t.k}</div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Header strip with greeting + city + bell ───────────────────────────────
function AppHeader({ title = 'Games', sub, right }) {
  return (
    <div style={{
      padding: '14px 20px 10px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      fontFamily: FONT,
    }}>
      <div>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          fontSize: 12, fontWeight: 600, color: COLORS.muted, letterSpacing: 0.3,
          textTransform: 'uppercase',
        }}>
          <Ico.pin /> {BRAND.city} <Ico.chevD />
        </div>
        <div style={{
          fontSize: 28, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.8,
          marginTop: 2, lineHeight: 1.05,
        }}>{title}</div>
        {sub && <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 2 }}>{sub}</div>}
      </div>
      {right || (
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 19,
            background: '#f3f5f2', color: COLORS.inkSoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Ico.search /></div>
          <div style={{
            width: 38, height: 38, borderRadius: 19,
            background: '#f3f5f2', color: COLORS.inkSoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative',
          }}>
            <Ico.bell />
            <span style={{
              position: 'absolute', top: 8, right: 9,
              width: 8, height: 8, borderRadius: 4, background: '#ef4444',
              border: '2px solid #f3f5f2',
            }} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Filter chips row ───────────────────────────────────────────────────────
function FilterChips({ items, active }) {
  return (
    <div style={{
      display: 'flex', gap: 7, padding: '4px 20px 14px',
      overflowX: 'hidden', fontFamily: FONT,
    }}>
      <div style={{
        flexShrink: 0,
        display: 'flex', alignItems: 'center', gap: 5,
        background: COLORS.ink, color: '#fff',
        padding: '7px 11px', borderRadius: 99,
        fontSize: 12.5, fontWeight: 600,
      }}><Ico.filter width="13" height="13" /> Filters</div>
      {items.map((it) => {
        const on = it === active;
        return (
          <div key={it} style={{
            flexShrink: 0,
            background: on ? COLORS.pitch : '#fff',
            color: on ? '#fff' : COLORS.inkSoft,
            border: `1px solid ${on ? COLORS.pitch : COLORS.hairline}`,
            padding: '7px 12px', borderRadius: 99,
            fontSize: 12.5, fontWeight: on ? 700 : 500,
          }}>{it}</div>
        );
      })}
    </div>
  );
}

Object.assign(window, {
  FONT, Ico, Avatars, SlotBar, SkillChip, PitchBG, TabBar, AppHeader, FilterChips,
});
