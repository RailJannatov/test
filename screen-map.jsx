// Variation B — Map-first. Mocked street map with pin price tags and a
// horizontally scrolling bottom sheet of game cards.

function MapBG() {
  // Mock OSM-style map: warm paper background with road network drawn as SVG.
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'linear-gradient(180deg, #ecf3eb 0%, #e6ede4 100%)',
      overflow: 'hidden',
    }}>
      <svg viewBox="0 0 402 700" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {/* parks */}
        <path d="M-20,180 C60,160 140,220 220,200 C280,185 340,210 430,180 L430,300 C360,310 290,280 220,300 C140,322 60,300 -20,330 Z"
          fill="#dde9d4" opacity="0.9" />
        <circle cx="80" cy="540" r="70" fill="#dde9d4" opacity="0.85" />
        <path d="M280,500 Q340,460 420,520 L420,620 Q360,640 280,610 Z" fill="#dde9d4" opacity="0.85" />
        {/* water */}
        <path d="M-20,640 C80,620 160,660 260,640 C320,628 380,648 430,640 L430,720 L-20,720 Z" fill="#c8dff2" opacity="0.7" />

        {/* roads — primary */}
        <g stroke="#ffffff" strokeWidth="14" strokeLinecap="round" fill="none">
          <path d="M-20,120 L420,140" />
          <path d="M-20,400 L420,380" />
          <path d="M200,-20 L210,720" />
        </g>
        <g stroke="#dfe3dd" strokeWidth="14" strokeLinecap="round" fill="none">
          <path d="M-20,120 L420,140" />
          <path d="M-20,400 L420,380" />
          <path d="M200,-20 L210,720" />
        </g>
        <g stroke="#ffffff" strokeWidth="10" strokeLinecap="round" fill="none">
          <path d="M-20,260 L420,250" />
          <path d="M-20,540 L420,560" />
          <path d="M80,-20 L70,720" />
          <path d="M320,-20 L330,720" />
        </g>
        {/* roads — secondary */}
        <g stroke="#ffffff" strokeWidth="5" fill="none" opacity="0.9">
          <path d="M-20,200 L420,210" />
          <path d="M-20,330 L420,320" />
          <path d="M-20,470 L420,485" />
          <path d="M-20,610 L420,605" />
          <path d="M140,-20 L135,720" />
          <path d="M260,-20 L270,720" />
        </g>
        {/* blocks */}
        <g fill="#f3f6f1" opacity="0.6">
          <rect x="90" y="155" width="100" height="40" rx="2" />
          <rect x="220" y="155" width="90" height="40" rx="2" />
          <rect x="90" y="270" width="50" height="50" rx="2" />
          <rect x="160" y="270" width="35" height="50" rx="2" />
          <rect x="225" y="270" width="80" height="50" rx="2" />
          <rect x="320" y="270" width="80" height="50" rx="2" />
          <rect x="160" y="395" width="35" height="70" rx="2" />
          <rect x="225" y="395" width="80" height="70" rx="2" />
        </g>
      </svg>

      {/* attribution micro */}
      <div style={{
        position: 'absolute', bottom: 290, right: 10,
        fontSize: 8, color: 'rgba(0,0,0,0.4)', fontFamily: FONT,
      }}>© Mapbox · OSM</div>
    </div>
  );
}

function MapPin({ left, top, price, hot, active, dist, big }) {
  return (
    <div style={{
      position: 'absolute', left, top,
      transform: 'translate(-50%, -100%)',
      fontFamily: FONT, zIndex: active ? 5 : 1,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 5,
        background: active ? COLORS.pitch : '#fff',
        color: active ? '#fff' : COLORS.ink,
        border: active ? `2px solid ${COLORS.pitch}` : '2px solid #fff',
        outline: hot ? '2px solid #ef4444' : 'none',
        padding: big ? '7px 11px 7px 8px' : '5px 9px 5px 6px',
        borderRadius: 99,
        fontSize: big ? 13 : 11.5, fontWeight: 800,
        letterSpacing: -0.2,
        boxShadow: '0 4px 12px rgba(12,20,16,0.18)',
      }}>
        <span style={{
          width: big ? 18 : 14, height: big ? 18 : 14, borderRadius: 99,
          background: active ? COLORS.lime : COLORS.pitch,
          color: active ? COLORS.pitch : COLORS.lime,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Ico.ball width={big ? 12 : 10} height={big ? 12 : 10} /></span>
        €{price}
        {dist && <span style={{ opacity: 0.6, fontWeight: 600 }}>· {dist}km</span>}
      </div>
      <div style={{
        width: 0, height: 0, marginLeft: 'auto', marginRight: 'auto',
        borderLeft: '6px solid transparent',
        borderRight: '6px solid transparent',
        borderTop: `8px solid ${active ? COLORS.pitch : '#fff'}`,
        marginTop: -1,
      }} />
    </div>
  );
}

function MapMiniCard({ g, active }) {
  return (
    <div style={{
      width: 260, flexShrink: 0,
      background: '#fff',
      border: active ? `2px solid ${COLORS.pitch}` : `1px solid ${COLORS.hairline}`,
      borderRadius: 16,
      padding: 12,
      fontFamily: FONT,
      boxShadow: active
        ? '0 12px 28px rgba(10,61,31,0.18)'
        : '0 4px 12px rgba(12,20,16,0.06)',
      transform: active ? 'translateY(-2px)' : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontSize: 12, fontWeight: 700, color: COLORS.ink,
        }}>
          <Ico.clock />
          <span>{g.when} · {g.time}</span>
        </div>
        <div style={{ fontSize: 15, fontWeight: 800, color: COLORS.ink }}>€{g.price}</div>
      </div>
      <div style={{
        fontSize: 14, fontWeight: 700, color: COLORS.ink,
        letterSpacing: -0.2, lineHeight: 1.25,
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>{g.venue}</div>
      <div style={{ fontSize: 11.5, color: COLORS.muted, marginTop: 2 }}>
        {g.area} · {g.distKm} km · {g.format}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
        <Avatars count={3} size={22} filled={g.filled} />
        <div style={{ flex: 1 }}>
          <SlotBar filled={g.filled} total={g.total} hot={g.hot} />
        </div>
        <div style={{
          fontSize: 11, fontWeight: 700, color: COLORS.inkSoft,
        }}>{g.filled}/{g.total}</div>
      </div>
    </div>
  );
}

function ScreenMap() {
  // 6 pin positions on the mock map (matched to roughly map to game order).
  const pins = [
    { left: 130, top: 230, g: GAMES[0], active: true, big: true },
    { left: 280, top: 200, g: GAMES[1] },
    { left: 90,  top: 380, g: GAMES[2] },
    { left: 240, top: 430, g: GAMES[3] },
    { left: 340, top: 340, g: GAMES[4] },
    { left: 180, top: 540, g: GAMES[5] },
  ];
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative',
      fontFamily: FONT, overflow: 'hidden', background: '#e6ede4',
    }}>
      <MapBG />

      {/* status spacer + floating top chrome */}
      <div style={{
        position: 'absolute', top: 54, left: 0, right: 0,
        padding: '8px 16px', zIndex: 10,
      }}>
        <div style={{
          background: 'rgba(255,255,255,0.96)',
          backdropFilter: 'blur(12px)',
          borderRadius: 16,
          padding: '10px 12px',
          display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: '0 6px 20px rgba(12,20,16,0.10)',
        }}>
          <div style={{ color: COLORS.muted }}><Ico.search /></div>
          <div style={{ flex: 1, fontSize: 14, color: COLORS.muted, fontWeight: 500 }}>
            Search venue, neighborhood…
          </div>
          <div style={{
            width: 1, height: 18, background: COLORS.hairline,
          }} />
          <div style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 12.5, fontWeight: 700, color: COLORS.ink,
          }}><Ico.pin /> Eixample</div>
        </div>
        <div style={{ display: 'flex', gap: 6, marginTop: 10, overflow: 'hidden' }}>
          {['Today', 'Tomorrow', 'Weekend', '€ Any'].map((t, i) => (
            <div key={t} style={{
              flexShrink: 0,
              background: i === 0 ? COLORS.pitch : 'rgba(255,255,255,0.95)',
              color: i === 0 ? '#fff' : COLORS.ink,
              padding: '6px 11px', borderRadius: 99,
              fontSize: 12, fontWeight: i === 0 ? 700 : 600,
              boxShadow: '0 2px 6px rgba(12,20,16,0.08)',
            }}>{t}</div>
          ))}
        </div>
      </div>

      {/* pins */}
      {pins.map((p, i) => (
        <MapPin key={i} left={p.left} top={p.top}
          price={p.g.price} hot={p.g.hot} active={p.active} big={p.big}
          dist={p.active ? p.g.distKm : null} />
      ))}

      {/* my-location FAB */}
      <div style={{
        position: 'absolute', right: 14, bottom: 310,
        width: 44, height: 44, borderRadius: 22,
        background: '#fff', color: COLORS.pitch,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(12,20,16,0.18)',
      }}><Ico.locate /></div>

      {/* bottom sheet */}
      <div style={{
        position: 'absolute', bottom: 84, left: 0, right: 0,
        background: 'transparent',
        zIndex: 8,
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 20px 8px',
        }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 7 }}>
            <div style={{ fontSize: 16, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.3 }}>
              6 games in this area
            </div>
          </div>
          <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.greenDeep }}>List view</div>
        </div>
        <div style={{
          display: 'flex', gap: 10, padding: '4px 16px 14px',
          overflow: 'hidden',
        }}>
          {[GAMES[0], GAMES[1], GAMES[3]].map((g, i) => (
            <MapMiniCard key={g.id} g={g} active={i === 0} />
          ))}
        </div>
      </div>

      <TabBar active="Map" />
    </div>
  );
}

window.ScreenMap = ScreenMap;
