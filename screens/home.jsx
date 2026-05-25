// Home — interactive list of pickup games. Tapping a card pushes detail.

function ListGameCard({ g, onTap, joined }) {
  const remaining = g.total - g.filled;
  const hot = g.hot;
  return (
    <div onClick={onTap} style={{
      background: '#fff',
      borderRadius: 18,
      padding: 14,
      marginBottom: 12,
      boxShadow: '0 1px 2px rgba(12,20,16,0.04), 0 4px 14px rgba(12,20,16,0.05)',
      fontFamily: FONT,
      position: 'relative',
      cursor: 'pointer',
      transition: 'transform .12s',
    }}>
      <div style={{ display: 'flex', gap: 12 }}>
        {/* Time block */}
        <div style={{
          width: 60, flexShrink: 0,
          background: COLORS.chalk,
          border: `1px solid ${COLORS.hairline}`,
          borderRadius: 12,
          padding: '8px 0 9px',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            fontSize: 9.5, fontWeight: 700, color: COLORS.muted,
            letterSpacing: 0.4, textTransform: 'uppercase',
          }}>{g.when.slice(0, 3)}</div>
          <div style={{
            fontSize: 18, fontWeight: 800, color: COLORS.ink,
            letterSpacing: -0.5, marginTop: 1,
          }}>{g.time}</div>
          <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 1 }}>{g.dur}</div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 8 }}>
            <div style={{
              fontSize: 15, fontWeight: 700, color: COLORS.ink,
              letterSpacing: -0.3, lineHeight: 1.2,
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>{g.venue}</div>
            <div style={{
              fontSize: 15, fontWeight: 800, color: COLORS.ink,
              letterSpacing: -0.3, flexShrink: 0,
            }}>{BRAND.currency}{g.price}</div>
          </div>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 6,
            fontSize: 12, color: COLORS.muted, marginTop: 3,
          }}>
            <Ico.pin />
            <span>{g.area}</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>{g.distKm} km</span>
            <span style={{ opacity: 0.5 }}>·</span>
            <span>{g.format} {g.surface.toLowerCase()}</span>
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            <SkillChip level={g.skill} sm />
            {hot && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                color: '#c2410c', fontSize: 10.5, fontWeight: 700,
                background: '#fff1e6', padding: '2px 7px', borderRadius: 99,
              }}><Ico.flame /> Filling fast</span>
            )}
            {joined && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                color: COLORS.greenDeep, fontSize: 10.5, fontWeight: 700,
                background: '#e8f7ec', padding: '2px 7px', borderRadius: 99,
              }}>✓ Joined</span>
            )}
          </div>
        </div>
      </div>

      <div style={{
        marginTop: 12, paddingTop: 12,
        borderTop: `1px dashed ${COLORS.hairline}`,
        display: 'flex', alignItems: 'center', gap: 12,
      }}>
        <Avatars count={4} size={26} filled={g.filled} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            marginBottom: 5,
          }}>
            <div style={{ fontSize: 12, color: COLORS.inkSoft, fontWeight: 600 }}>
              <span style={{ color: COLORS.ink, fontWeight: 800 }}>{g.filled}</span>
              <span style={{ color: COLORS.muted }}>/{g.total}</span> players
            </div>
            <div style={{
              fontSize: 11, color: hot ? '#c2410c' : COLORS.greenDeep, fontWeight: 700,
            }}>{remaining} {remaining === 1 ? 'spot' : 'spots'} left</div>
          </div>
          <SlotBar filled={g.filled} total={g.total} hot={hot} />
        </div>
        <div style={{
          background: joined ? '#e8f7ec' : COLORS.pitch,
          color: joined ? COLORS.greenDeep : '#fff',
          padding: '9px 14px', borderRadius: 12,
          fontSize: 13, fontWeight: 700,
          flexShrink: 0,
        }}>{joined ? 'Joined' : 'Join'}</div>
      </div>
    </div>
  );
}

function SectionLabel({ label, count }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
      padding: '14px 4px 10px', fontFamily: FONT,
    }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <div style={{
          fontSize: 18, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.4,
        }}>{label}</div>
        <div style={{ fontSize: 13, color: COLORS.muted, fontWeight: 600 }}>{count}</div>
      </div>
      <div style={{
        fontSize: 12, fontWeight: 600, color: COLORS.greenDeep,
        display: 'flex', alignItems: 'center', gap: 2,
      }}>View all <Ico.chevR width="12" height="12" /></div>
    </div>
  );
}

function HomeScreen() {
  const { user, joined, push } = useApp();
  const today = GAMES.filter((g) => g.when === 'Today');
  const tomorrow = GAMES.filter((g) => g.when === 'Tomorrow');

  const open = (g) => push({ name: 'detail', props: { gameId: g.id } });

  return (
    <div style={{
      width: '100%', height: '100%', background: COLORS.chalk,
      fontFamily: FONT, position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      <div style={{
        padding: '14px 20px 10px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
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
            fontSize: 26, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.6,
            marginTop: 2, lineHeight: 1.05,
          }}>Hey, {user.name.split(' ')[0]} 👋</div>
          <div style={{ fontSize: 13, color: COLORS.muted, marginTop: 3 }}>
            {GAMES.length} games near you this week
          </div>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 19,
            background: '#fff', color: COLORS.inkSoft,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: `1px solid ${COLORS.hairline}`,
          }}><Ico.search /></div>
        </div>
      </div>

      <div style={{ flexShrink: 0 }}>
        <FilterChips items={['Today', 'Tomorrow', 'Weekend', '5v5', '7v7', 'Indoor']} active="Today" />
      </div>

      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: '0 16px 100px',
      }}>
        <SectionLabel label="Today" count={`${today.length} games`} />
        {today.map((g) => (
          <ListGameCard key={g.id} g={g} joined={joined[g.id]} onTap={() => open(g)} />
        ))}
        <SectionLabel label="Tomorrow" count={`${tomorrow.length} games`} />
        {tomorrow.map((g) => (
          <ListGameCard key={g.id} g={g} joined={joined[g.id]} onTap={() => open(g)} />
        ))}
      </div>

      <TabBar />
    </div>
  );
}

window.HomeScreen = HomeScreen;
