// Profile — leads with bookings (upcoming + past), then stats below.

function UpcomingBookingCard({ g, onTap }) {
  return (
    <div onClick={onTap} style={{
      background: '#fff',
      border: `1px solid ${COLORS.hairline}`,
      borderRadius: 16,
      overflow: 'hidden',
      cursor: 'pointer',
      boxShadow: '0 1px 2px rgba(12,20,16,0.04), 0 4px 10px rgba(12,20,16,0.04)',
    }}>
      {/* Top strip with pitch art */}
      <div style={{ position: 'relative', height: 92, overflow: 'hidden' }}>
        <PitchBG hue={g.hue} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0) 30%, rgba(0,0,0,0.5) 100%)',
        }} />
        <div style={{
          position: 'absolute', top: 10, left: 12, right: 12,
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: COLORS.lime, color: COLORS.pitchDeep,
            padding: '4px 9px', borderRadius: 99,
            fontSize: 10.5, fontWeight: 800, letterSpacing: 0.3, textTransform: 'uppercase',
          }}>
            <Ico.bolt /> {g.when}
          </div>
          <div style={{
            background: 'rgba(255,255,255,0.18)',
            backdropFilter: 'blur(8px)',
            color: '#fff', fontSize: 10.5, fontWeight: 700,
            padding: '4px 8px', borderRadius: 99,
          }}>{g.format}</div>
        </div>
        <div style={{
          position: 'absolute', bottom: 10, left: 14, right: 14,
          color: '#fff', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
        }}>
          <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: -0.8, lineHeight: 1 }}>
            {g.time}
          </div>
          <div style={{ fontSize: 11.5, fontWeight: 600, opacity: 0.9 }}>{g.whenLong}</div>
        </div>
      </div>

      <div style={{ padding: '12px 14px' }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.2 }}>
          {g.venue}
        </div>
        <div style={{
          fontSize: 11.5, color: COLORS.muted, marginTop: 2,
          display: 'flex', alignItems: 'center', gap: 4,
        }}><Ico.pin /> {g.area} · {g.distKm} km</div>
        <div style={{
          marginTop: 10, paddingTop: 10,
          borderTop: `1px dashed ${COLORS.hairline}`,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <Avatars count={3} size={22} filled={g.filled + 1} />
            <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>
              {g.filled + 1}/{g.total} in
            </div>
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 3,
            fontSize: 12, fontWeight: 700, color: COLORS.greenDeep,
          }}>View ticket <Ico.chevR width="12" height="12" /></div>
        </div>
      </div>
    </div>
  );
}

function PastBookingRow({ p }) {
  return (
    <div style={{
      background: '#fff',
      border: `1px solid ${COLORS.hairline}`,
      borderRadius: 14,
      padding: 12,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 11,
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <PitchBG hue={p.hue} />
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13.5, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{p.venue}</div>
        <div style={{
          fontSize: 11.5, color: COLORS.muted, marginTop: 1,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span>{p.date} · {p.time}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{p.format}</span>
        </div>
        <div style={{ marginTop: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            fontSize: 11, fontWeight: 700, color: COLORS.inkSoft,
          }}>{p.result}</div>
          {p.mvp && (
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              color: '#a35a00', fontSize: 10, fontWeight: 800,
              background: '#fff5e6', padding: '2px 6px', borderRadius: 99,
              letterSpacing: 0.3, textTransform: 'uppercase',
            }}><Ico.star width="10" height="10" /> MVP</span>
          )}
        </div>
      </div>
      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4,
        flexShrink: 0,
      }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: COLORS.ink,
          display: 'inline-flex', alignItems: 'center', gap: 2,
        }}><Ico.star /> {p.rating}</div>
        <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>
          {BRAND.currency}{p.price}
        </div>
      </div>
    </div>
  );
}

function StatTile({ value, label, sub }) {
  return (
    <div style={{
      flex: 1,
      background: '#fff',
      border: `1px solid ${COLORS.hairline}`,
      borderRadius: 14,
      padding: '12px 12px 10px',
    }}>
      <div style={{
        fontSize: 22, fontWeight: 900, color: COLORS.ink, letterSpacing: -0.6,
        lineHeight: 1.05,
      }}>{value}</div>
      <div style={{ fontSize: 11.5, fontWeight: 600, color: COLORS.muted, marginTop: 4 }}>
        {label}
      </div>
      {sub && <div style={{ fontSize: 10.5, color: COLORS.mutedLight, marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

function ProfileScreen() {
  const { user, joined, push, switchTab } = useApp();
  const [tab, setTab] = React.useState('Upcoming');
  const myUpcoming = GAMES.filter((g) => joined[g.id]);

  return (
    <div style={{
      width: '100%', height: '100%', background: COLORS.chalk,
      fontFamily: FONT, position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ height: 54, flexShrink: 0 }} />

      {/* Header */}
      <div style={{
        padding: '14px 20px 16px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.5 }}>
          Profile
        </div>
        <div style={{
          width: 36, height: 36, borderRadius: 18,
          background: '#fff', border: `1px solid ${COLORS.hairline}`,
          color: COLORS.inkSoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="3" />
            <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 11-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 11-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 11-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 110-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 112.83-2.83l.06.06a1.65 1.65 0 001.82.33h.01a1.65 1.65 0 001-1.51V3a2 2 0 114 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 112.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82v.01a1.65 1.65 0 001.51 1H21a2 2 0 110 4h-.09a1.65 1.65 0 00-1.51 1z" />
          </svg>
        </div>
      </div>

      <div style={{ flex: 1, overflowY: 'auto', padding: '0 16px 100px' }}>
        {/* Identity card */}
        <div style={{
          background: '#fff',
          borderRadius: 18,
          padding: 16,
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 1px 2px rgba(12,20,16,0.04), 0 4px 14px rgba(12,20,16,0.05)',
        }}>
          <div style={{
            width: 60, height: 60, borderRadius: 30,
            background: user.avatarColor, color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 800, letterSpacing: -0.5,
            border: '3px solid #fff',
            boxShadow: '0 0 0 2px ' + COLORS.lime,
          }}>{user.initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.4 }}>
              {user.name}
            </div>
            <div style={{
              fontSize: 12.5, color: COLORS.muted, marginTop: 2,
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3 }}>
                <Ico.pin /> {user.city}
              </span>
              <span style={{ opacity: 0.5 }}>·</span>
              <SkillChip level={user.skill} sm />
            </div>
            <div style={{
              fontSize: 11.5, color: COLORS.greenDeep, fontWeight: 700, marginTop: 4,
            }}>
              {POSITIONS.find((p) => p.id === user.position)?.name}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <StatTile value={user.gamesPlayed} label="Games" sub="this season" />
          <StatTile value={
            <span>{user.rating} <Ico.star width="14" height="14" /></span>
          } label="Player rating" sub="fair play 4.9" />
          <StatTile value="6" label="Squad" sub="teammates" />
        </div>

        {/* Bookings tabs */}
        <div style={{
          display: 'flex', gap: 6,
          padding: '4px',
          marginTop: 22,
          background: '#eaedea',
          borderRadius: 12,
        }}>
          {['Upcoming', 'Past'].map((t) => {
            const on = tab === t;
            const count = t === 'Upcoming' ? myUpcoming.length : PAST_GAMES.length;
            return (
              <div key={t} onClick={() => setTab(t)} style={{
                flex: 1,
                background: on ? '#fff' : 'transparent',
                color: on ? COLORS.ink : COLORS.muted,
                padding: '9px 12px', borderRadius: 9,
                textAlign: 'center',
                fontSize: 13, fontWeight: on ? 700 : 600,
                boxShadow: on ? '0 1px 3px rgba(12,20,16,0.06)' : 'none',
                cursor: 'pointer',
                transition: 'all .15s',
              }}>{t} <span style={{ opacity: 0.6, marginLeft: 2 }}>{count}</span></div>
            );
          })}
        </div>

        {/* Tab content */}
        {tab === 'Upcoming' ? (
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {myUpcoming.length === 0 ? (
              <div style={{
                background: '#fff',
                border: `1.5px dashed ${COLORS.hairline}`,
                borderRadius: 16,
                padding: '24px 20px',
                textAlign: 'center',
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 24,
                  background: COLORS.chalk, color: COLORS.pitch,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 10px',
                }}><Ico.ball width="24" height="24" /></div>
                <div style={{ fontSize: 14.5, fontWeight: 700, color: COLORS.ink }}>
                  No games booked yet
                </div>
                <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 2, lineHeight: 1.4 }}>
                  Join a pickup game and it'll show up here.
                </div>
                <div onClick={() => switchTab('Games')} style={{
                  marginTop: 14,
                  display: 'inline-block',
                  background: COLORS.pitch, color: '#fff',
                  padding: '10px 16px', borderRadius: 12,
                  fontSize: 13, fontWeight: 700, cursor: 'pointer',
                }}>Browse games</div>
              </div>
            ) : myUpcoming.map((g) => (
              <UpcomingBookingCard key={g.id} g={g}
                onTap={() => push({ name: 'detail', props: { gameId: g.id } })} />
            ))}
          </div>
        ) : (
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 8 }}>
            {PAST_GAMES.map((p) => <PastBookingRow key={p.id} p={p} />)}
          </div>
        )}
      </div>

      <TabBar />
    </div>
  );
}

window.ProfileScreen = ProfileScreen;
