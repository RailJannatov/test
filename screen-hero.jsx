// Variation C — Hero / image-forward stack. Big featured "next game" card
// with pitch artwork up top, then a tight grid of upcoming games below.

function HeroCard({ g }) {
  const remaining = g.total - g.filled;
  return (
    <div style={{
      borderRadius: 22,
      overflow: 'hidden',
      position: 'relative',
      height: 230,
      fontFamily: FONT,
      boxShadow: '0 8px 22px rgba(12,20,16,0.18)',
    }}>
      <PitchBG hue={g.hue} />
      {/* gradient overlay for legibility */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.55) 100%)',
      }} />

      {/* top row */}
      <div style={{
        position: 'absolute', top: 14, left: 14, right: 14,
        display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
        color: '#fff',
      }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          background: 'rgba(255,255,255,0.18)',
          backdropFilter: 'blur(8px)',
          padding: '5px 10px', borderRadius: 99,
          fontSize: 11, fontWeight: 700, letterSpacing: 0.3,
        }}>
          <Ico.bolt />
          NEXT UP · {g.when}
        </div>
        <div style={{
          background: COLORS.lime,
          color: COLORS.pitchDeep,
          padding: '4px 10px',
          borderRadius: 99,
          fontSize: 12, fontWeight: 800,
        }}>€{g.price}</div>
      </div>

      {/* bottom block */}
      <div style={{
        position: 'absolute', left: 14, right: 14, bottom: 14,
        color: '#fff',
      }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', gap: 8,
        }}>
          <div style={{
            fontSize: 36, fontWeight: 900, letterSpacing: -1.2, lineHeight: 1,
          }}>{g.time}</div>
          <div style={{
            fontSize: 12, fontWeight: 600, opacity: 0.85, letterSpacing: 0.1,
          }}>· {g.dur} · {g.format}</div>
        </div>
        <div style={{
          fontSize: 16, fontWeight: 700, marginTop: 6, letterSpacing: -0.3,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{g.venue}</div>
        <div style={{
          fontSize: 12, opacity: 0.85, marginTop: 2,
          display: 'flex', alignItems: 'center', gap: 4,
        }}><Ico.pin /> {g.area} · {g.distKm} km away</div>

        <div style={{
          marginTop: 12, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Avatars count={4} size={24} filled={g.filled} ring={COLORS.pitch} />
          <div style={{ fontSize: 11.5, fontWeight: 700 }}>
            {remaining} {remaining === 1 ? 'spot' : 'spots'} left
          </div>
          <div style={{ flex: 1 }} />
          <div style={{
            background: '#fff', color: COLORS.pitch,
            padding: '8px 16px', borderRadius: 99,
            fontSize: 13, fontWeight: 800, letterSpacing: -0.1,
            display: 'inline-flex', alignItems: 'center', gap: 4,
          }}>Reserve <Ico.chevR width="13" height="13" /></div>
        </div>
      </div>
    </div>
  );
}

function MiniGame({ g }) {
  const remaining = g.total - g.filled;
  return (
    <div style={{
      background: '#fff',
      borderRadius: 16,
      padding: 12,
      fontFamily: FONT,
      boxShadow: '0 1px 2px rgba(12,20,16,0.04), 0 4px 10px rgba(12,20,16,0.04)',
      display: 'flex', gap: 10, alignItems: 'center',
    }}>
      {/* mini pitch chip */}
      <div style={{
        width: 54, height: 54, borderRadius: 12,
        position: 'relative', overflow: 'hidden', flexShrink: 0,
      }}>
        <PitchBG hue={g.hue} />
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          color: '#fff', textShadow: '0 1px 2px rgba(0,0,0,0.4)',
        }}>
          <div style={{ fontSize: 9.5, fontWeight: 700, letterSpacing: 0.3, opacity: 0.9 }}>
            {g.when === 'Today' ? 'TODAY' : g.when.toUpperCase().slice(0, 3)}
          </div>
          <div style={{ fontSize: 14, fontWeight: 800, letterSpacing: -0.4, marginTop: -1 }}>
            {g.time}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontSize: 13.5, fontWeight: 700, color: COLORS.ink, letterSpacing: -0.2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{g.venue}</div>
        <div style={{
          fontSize: 11.5, color: COLORS.muted, marginTop: 1,
          display: 'flex', alignItems: 'center', gap: 4,
        }}>
          <span>{g.area}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <span>{g.format}</span>
          <span style={{ opacity: 0.5 }}>·</span>
          <SkillChip level={g.skill} sm />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
          <div style={{ flex: 1 }}>
            <SlotBar filled={g.filled} total={g.total} hot={g.hot} />
          </div>
          <div style={{ fontSize: 10.5, fontWeight: 700, color: COLORS.inkSoft }}>
            {g.filled}/{g.total}
          </div>
        </div>
      </div>

      <div style={{
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4,
        flexShrink: 0,
      }}>
        <div style={{ fontSize: 14, fontWeight: 800, color: COLORS.ink }}>€{g.price}</div>
        <div style={{
          fontSize: 10.5, fontWeight: 700,
          color: g.hot ? '#c2410c' : COLORS.greenDeep,
        }}>{remaining} left</div>
      </div>
    </div>
  );
}

function QuickPill({ ic: I, label, value, sub }) {
  return (
    <div style={{
      flex: 1,
      background: '#fff',
      border: `1px solid ${COLORS.hairline}`,
      borderRadius: 14,
      padding: '10px 11px',
      fontFamily: FONT,
    }}>
      <div style={{
        width: 26, height: 26, borderRadius: 8,
        background: COLORS.chalk, color: COLORS.pitch,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 6,
      }}><I /></div>
      <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>{label}</div>
      <div style={{
        fontSize: 14, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.3,
        marginTop: 1,
      }}>{value}</div>
      {sub && <div style={{ fontSize: 10.5, color: COLORS.muted, marginTop: 1 }}>{sub}</div>}
    </div>
  );
}

function ScreenHero() {
  const hero = GAMES[0];
  const rest = GAMES.slice(1, 4);
  return (
    <div style={{
      width: '100%', height: '100%',
      background: COLORS.chalk,
      fontFamily: FONT, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ height: 54 }} />

      {/* tighter header */}
      <div style={{
        padding: '8px 20px 14px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{
            fontSize: 12, color: COLORS.muted, fontWeight: 600,
            display: 'flex', alignItems: 'center', gap: 3,
          }}>Hi, Marc 👋</div>
          <div style={{
            fontSize: 22, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.6,
            marginTop: 1,
          }}>Ready to play?</div>
        </div>
        <div style={{
          width: 40, height: 40, borderRadius: 20,
          background: COLORS.pitch, color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontWeight: 800, fontSize: 14,
        }}>MR</div>
      </div>

      <div style={{ padding: '0 16px' }}>
        <HeroCard g={hero} />

        {/* quick stats row */}
        <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
          <QuickPill ic={Ico.ball} label="Games played" value="24" sub="this season" />
          <QuickPill ic={Ico.star} label="Player rating" value="4.6" sub="from 18 players" />
          <QuickPill ic={Ico.users} label="Squad" value="12" sub="teammates" />
        </div>

        {/* upcoming list */}
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          padding: '18px 4px 10px',
        }}>
          <div style={{
            fontSize: 16, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.3,
          }}>More this week</div>
          <div style={{
            fontSize: 12, fontWeight: 700, color: COLORS.greenDeep,
            display: 'flex', alignItems: 'center', gap: 2,
          }}>See all <Ico.chevR width="12" height="12" /></div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {rest.map((g) => <MiniGame key={g.id} g={g} />)}
        </div>
      </div>

      <TabBar active="Games" />
    </div>
  );
}

window.ScreenHero = ScreenHero;
