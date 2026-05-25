// Game detail screen — hero pitch image, info rows, lineup, host, rules,
// sticky CTA opens the payment bottom sheet.

function InfoRow({ icon: I, label, value, sub }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', gap: 12,
      padding: '12px 0',
      borderBottom: `1px solid ${COLORS.hairline}`,
    }}>
      <div style={{
        width: 36, height: 36, borderRadius: 10,
        background: COLORS.chalk, color: COLORS.pitch,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}><I /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600, letterSpacing: 0.3, textTransform: 'uppercase' }}>{label}</div>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: COLORS.ink, marginTop: 1 }}>{value}</div>
        {sub && <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 1 }}>{sub}</div>}
      </div>
    </div>
  );
}

function LineupSlot({ avatar, idx, isMe }) {
  if (!avatar) {
    return (
      <div style={{
        width: 44, height: 44, borderRadius: 22,
        border: `1.5px dashed #cfd6cf`,
        background: 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: COLORS.mutedLight, fontSize: 11, fontWeight: 700,
      }}>{idx}</div>
    );
  }
  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        width: 44, height: 44, borderRadius: 22,
        background: avatar.c, color: '#fff',
        border: isMe ? `2.5px solid ${COLORS.lime}` : '2.5px solid #fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700,
        fontFamily: FONT,
        boxShadow: '0 2px 6px rgba(0,0,0,0.08)',
      }}>{avatar.i}</div>
      {isMe && (
        <div style={{
          position: 'absolute', bottom: -3, left: '50%', transform: 'translateX(-50%)',
          fontSize: 9, fontWeight: 800,
          background: COLORS.pitch, color: COLORS.lime,
          padding: '1px 5px', borderRadius: 99,
          letterSpacing: 0.3,
        }}>YOU</div>
      )}
    </div>
  );
}

function DetailScreen({ gameId }) {
  const { user, joined, pop, push } = useApp();
  const g = GAMES.find((x) => x.id === gameId);
  if (!g) return null;
  const isJoined = joined[gameId];
  const remaining = g.total - g.filled;
  const displayedFilled = isJoined ? g.filled + 1 : g.filled;
  const meSlotIndex = g.filled; // user takes the next empty slot

  const slots = Array.from({ length: g.total }, (_, i) => {
    if (i < g.filled) return AVATARS[i % AVATARS.length];
    if (isJoined && i === meSlotIndex) return { i: user.initials, c: user.avatarColor };
    return null;
  });

  return (
    <div style={{
      width: '100%', height: '100%', background: '#fff',
      fontFamily: FONT, position: 'relative',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Hero pitch */}
      <div style={{ position: 'relative', height: 240, flexShrink: 0 }}>
        <PitchBG hue={g.hue} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(180deg, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0) 30%, rgba(0,0,0,0.6) 100%)',
        }} />

        {/* status spacer + top chrome */}
        <div style={{
          position: 'absolute', top: 54, left: 0, right: 0,
          padding: '10px 16px',
          display: 'flex', justifyContent: 'space-between',
        }}>
          <div onClick={pop} style={{
            width: 38, height: 38, borderRadius: 19,
            background: 'rgba(255,255,255,0.92)', color: COLORS.ink,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(8px)', cursor: 'pointer',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <div style={{
              width: 38, height: 38, borderRadius: 19,
              background: 'rgba(255,255,255,0.92)', color: COLORS.ink,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              backdropFilter: 'blur(8px)',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" /><path d="M16 6l-4-4-4 4" /><path d="M12 2v13" />
              </svg>
            </div>
          </div>
        </div>

        {/* bottom block on hero */}
        <div style={{
          position: 'absolute', bottom: 14, left: 16, right: 16,
          color: '#fff',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <SkillChip level={g.skill} sm />
            {g.hot && (
              <span style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                color: '#fff', fontSize: 10.5, fontWeight: 700,
                background: 'rgba(239,68,68,0.85)', padding: '2px 7px', borderRadius: 99,
              }}><Ico.flame /> Filling fast</span>
            )}
            <div style={{
              fontSize: 10.5, fontWeight: 700,
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(8px)',
              padding: '2px 7px', borderRadius: 99,
            }}>{g.format} · {g.surface}</div>
          </div>
          <div style={{
            fontSize: 22, fontWeight: 800, letterSpacing: -0.5,
            marginTop: 8, lineHeight: 1.15,
          }}>{g.venue}</div>
          <div style={{
            fontSize: 13, opacity: 0.9, marginTop: 2,
            display: 'flex', alignItems: 'center', gap: 5,
          }}><Ico.pin /> {g.venueSub}</div>
        </div>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '8px 20px 140px' }}>
        {/* When */}
        <div style={{
          background: COLORS.chalk,
          border: `1px solid ${COLORS.hairline}`,
          borderRadius: 14,
          padding: '12px 14px',
          marginTop: 14,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            background: COLORS.pitch, color: '#fff',
            width: 48, height: 48, borderRadius: 12,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: 0.3, opacity: 0.9 }}>
              {g.whenLong.split(',')[0].toUpperCase()}
            </div>
            <div style={{ fontSize: 17, fontWeight: 800, letterSpacing: -0.3 }}>
              {g.whenLong.split(' ')[2]}
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, letterSpacing: 0.3, textTransform: 'uppercase' }}>When</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.ink, marginTop: 1 }}>
              {g.time} – {g.endTime}
            </div>
            <div style={{ fontSize: 12.5, color: COLORS.muted }}>{g.dur} · arrive 10 min early</div>
          </div>
        </div>

        {/* Lineup */}
        <div style={{ marginTop: 22 }}>
          <div style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            marginBottom: 10,
          }}>
            <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.3 }}>
              Lineup
            </div>
            <div style={{ fontSize: 12.5, fontWeight: 700, color: COLORS.muted }}>
              {displayedFilled}/{g.total} · {Math.max(0, g.total - displayedFilled)} left
            </div>
          </div>
          <SlotBar filled={displayedFilled} total={g.total} hot={g.hot} />
          <div style={{
            marginTop: 14,
            display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8,
            justifyItems: 'center',
          }}>
            {slots.map((a, i) => (
              <LineupSlot key={i} avatar={a} idx={i + 1}
                isMe={isJoined && i === meSlotIndex} />
            ))}
          </div>
        </div>

        {/* About */}
        <div style={{ marginTop: 22 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.3, marginBottom: 6 }}>
            About this game
          </div>
          <div style={{ fontSize: 14, color: COLORS.inkSoft, lineHeight: 1.5 }}>
            {g.description}
          </div>
        </div>

        {/* Host */}
        <div style={{
          marginTop: 18,
          background: '#fff',
          border: `1px solid ${COLORS.hairline}`,
          borderRadius: 14,
          padding: 12,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{
            width: 44, height: 44, borderRadius: 22,
            background: AVATARS.find((a) => a.n === g.host)?.c || COLORS.pitch,
            color: '#fff',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700,
          }}>{g.host.split(' ').map((p) => p[0]).join('')}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: COLORS.muted, letterSpacing: 0.3, textTransform: 'uppercase' }}>Hosted by</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: COLORS.ink, marginTop: 1 }}>{g.host}</div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginTop: 2,
              fontSize: 11.5, color: COLORS.muted,
            }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                <Ico.star /> {g.hostRating}
              </span>
              <span style={{ opacity: 0.5 }}>·</span>
              <span>{g.hostGames} games hosted</span>
            </div>
          </div>
          <div style={{
            color: COLORS.greenDeep, fontSize: 12, fontWeight: 700,
            padding: '6px 10px', border: `1px solid ${COLORS.hairline}`,
            borderRadius: 99,
          }}>Message</div>
        </div>

        {/* Info */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.3, marginBottom: 4 }}>
            Details
          </div>
          <InfoRow icon={Ico.pin} label="Venue" value={g.venue} sub={g.address} />
          <InfoRow icon={Ico.users} label="Format" value={`${g.format} · ${g.total} players total`} sub={`${g.surface} pitch · ${g.lighting}`} />
          <InfoRow icon={Ico.clock} label="Duration" value={`${g.dur} (${g.time} – ${g.endTime})`} />
        </div>

        {/* Rules */}
        <div style={{ marginTop: 18 }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.3, marginBottom: 8 }}>
            House rules
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {g.rules.map((r, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'flex-start', gap: 8,
                fontSize: 13.5, color: COLORS.inkSoft, lineHeight: 1.4,
              }}>
                <span style={{
                  width: 5, height: 5, borderRadius: 99, background: COLORS.pitch,
                  marginTop: 8, flexShrink: 0,
                }} />
                {r}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky bottom CTA */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: '#fff',
        borderTop: `1px solid ${COLORS.hairline}`,
        padding: '12px 16px 28px',
        display: 'flex', alignItems: 'center', gap: 12,
        boxShadow: '0 -4px 16px rgba(12,20,16,0.06)',
        zIndex: 20,
      }}>
        <div>
          <div style={{ fontSize: 11, color: COLORS.muted, fontWeight: 600 }}>Price</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.5 }}>
            {BRAND.currency}{g.price}
          </div>
        </div>
        <div style={{ flex: 1 }} />
        {isJoined ? (
          <div style={{
            flex: 1.5,
            background: '#e8f7ec', color: COLORS.greenDeep,
            padding: '14px 20px', borderRadius: 14,
            textAlign: 'center', fontSize: 15, fontWeight: 800,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
            You're in — see you Wednesday
          </div>
        ) : (
          <div onClick={() => push({ name: 'payment', props: { gameId } })} style={{
            flex: 1.5,
            background: COLORS.pitch, color: '#fff',
            padding: '14px 20px', borderRadius: 14,
            textAlign: 'center', fontSize: 15, fontWeight: 800, letterSpacing: -0.2,
            boxShadow: '0 4px 14px rgba(10,61,31,0.25)',
            cursor: 'pointer',
          }}>
            Join game · {remaining} {remaining === 1 ? 'spot' : 'spots'} left
          </div>
        )}
      </div>
    </div>
  );
}

window.DetailScreen = DetailScreen;
