// Payment bottom sheet — Apple Pay / card method, summary, pay button.
// Auto-flips to a "confirmed" celebration state after pay, then pops itself.

function PayMethodRow({ icon, label, sub, on, onTap, badge }) {
  return (
    <div onClick={onTap} style={{
      background: '#fff',
      border: `1.5px solid ${on ? COLORS.pitch : COLORS.hairline}`,
      borderRadius: 14,
      padding: '12px 14px',
      display: 'flex', alignItems: 'center', gap: 12,
      cursor: 'pointer', transition: 'all .15s',
    }}>
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14.5, fontWeight: 700, color: COLORS.ink }}>{label}</div>
        <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 1 }}>{sub}</div>
      </div>
      {badge && (
        <div style={{
          fontSize: 10, fontWeight: 700, color: COLORS.greenDeep,
          background: '#e8f7ec', padding: '2px 6px', borderRadius: 99,
          letterSpacing: 0.3, marginRight: 4,
        }}>{badge}</div>
      )}
      <div style={{
        width: 22, height: 22, borderRadius: 11,
        border: `2px solid ${on ? COLORS.pitch : '#d5dcd6'}`,
        background: on ? COLORS.pitch : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .15s',
      }}>
        {on && (
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#fff"
            strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
    </div>
  );
}

function ConfirmedView({ g, user, onDone }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      position: 'relative', overflow: 'hidden',
    }}>
      <PitchBG hue={g.hue} />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(180deg, rgba(10,61,31,0.4) 0%, rgba(10,61,31,0.85) 100%)',
      }} />
      <div style={{
        position: 'relative', zIndex: 2,
        height: '100%', display: 'flex', flexDirection: 'column',
        padding: '54px 24px 32px', color: '#fff',
        fontFamily: FONT,
      }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {/* tick badge */}
          <div style={{
            width: 96, height: 96, borderRadius: 48,
            background: COLORS.lime, color: COLORS.pitchDeep,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: 24,
            boxShadow: '0 18px 40px rgba(0,0,0,0.4)',
            animation: 'pop 0.4s cubic-bezier(.18,.9,.32,1.3)',
          }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div style={{
            fontSize: 30, fontWeight: 900, letterSpacing: -0.8,
            textAlign: 'center', lineHeight: 1.1,
          }}>You're in!</div>
          <div style={{
            fontSize: 14.5, opacity: 0.9, marginTop: 10, textAlign: 'center',
            maxWidth: 280, lineHeight: 1.4,
          }}>We've added you to the lineup at {g.venue}.</div>

          {/* Ticket card */}
          <div style={{
            marginTop: 28, width: '100%',
            background: 'rgba(255,255,255,0.12)',
            backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 16,
            padding: 16,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 10.5, fontWeight: 700, opacity: 0.7, letterSpacing: 0.4, textTransform: 'uppercase' }}>When</div>
                <div style={{ fontSize: 15, fontWeight: 800, marginTop: 1 }}>{g.whenLong}</div>
                <div style={{ fontSize: 13, opacity: 0.85 }}>{g.time} – {g.endTime}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10.5, fontWeight: 700, opacity: 0.7, letterSpacing: 0.4, textTransform: 'uppercase' }}>Format</div>
                <div style={{ fontSize: 15, fontWeight: 800, marginTop: 1 }}>{g.format}</div>
                <div style={{ fontSize: 13, opacity: 0.85 }}>{g.surface}</div>
              </div>
            </div>
            <div style={{ height: 1, background: 'rgba(255,255,255,0.2)', margin: '14px 0' }} />
            <div style={{ fontSize: 10.5, fontWeight: 700, opacity: 0.7, letterSpacing: 0.4, textTransform: 'uppercase' }}>Venue</div>
            <div style={{ fontSize: 15, fontWeight: 700, marginTop: 1 }}>{g.venue}</div>
            <div style={{ fontSize: 12.5, opacity: 0.85, marginTop: 1 }}>{g.address}</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{
            background: '#fff', color: COLORS.pitch,
            padding: '14px 20px', borderRadius: 14,
            textAlign: 'center', fontSize: 15, fontWeight: 800,
          }}>Add to Calendar</div>
          <div onClick={onDone} style={{
            background: 'transparent', color: '#fff',
            padding: '14px 20px', borderRadius: 14,
            textAlign: 'center', fontSize: 14.5, fontWeight: 700,
            border: '1px solid rgba(255,255,255,0.25)',
            cursor: 'pointer',
          }}>Done</div>
        </div>
      </div>
    </div>
  );
}

function PaymentScreen({ gameId }) {
  const { user, joined, joinGame, pop } = useApp();
  const g = GAMES.find((x) => x.id === gameId);
  const [method, setMethod] = React.useState('applepay');
  const [phase, setPhase] = React.useState('select'); // select | processing | confirmed

  if (!g) return null;

  const pay = () => {
    setPhase('processing');
    setTimeout(() => {
      joinGame(gameId);
      setPhase('confirmed');
    }, 900);
  };

  // CSS keyframes for sheet slide-up and confirmation pop.
  const css = `
    @keyframes sheetUp {
      from { transform: translateY(100%); }
      to   { transform: translateY(0); }
    }
    @keyframes pop {
      0%   { transform: scale(0.4); opacity: 0; }
      60%  { transform: scale(1.1); opacity: 1; }
      100% { transform: scale(1);   opacity: 1; }
    }
  `;

  if (phase === 'confirmed') {
    return (
      <>
        <style>{css}</style>
        <ConfirmedView g={g} user={user} onDone={() => { pop(); /* underlying detail now shows joined state */ }} />
      </>
    );
  }

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: 'rgba(12,20,16,0.45)',
      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
      fontFamily: FONT,
    }}>
      <style>{css}</style>

      {/* Backdrop tap-to-close (above status bar inset) */}
      <div onClick={pop} style={{ flex: 1 }} />

      <div style={{
        background: '#fff',
        borderTopLeftRadius: 28, borderTopRightRadius: 28,
        padding: '14px 20px 32px',
        boxShadow: '0 -8px 32px rgba(0,0,0,0.18)',
        animation: 'sheetUp 0.28s cubic-bezier(.2,.7,.2,1)',
        maxHeight: '88%',
        overflowY: 'auto',
      }}>
        {/* drag handle */}
        <div style={{
          width: 38, height: 4.5, borderRadius: 99,
          background: '#d5dcd6', margin: '0 auto 14px',
        }} />

        <div style={{
          fontSize: 22, fontWeight: 800, color: COLORS.ink, letterSpacing: -0.5,
        }}>Confirm and pay</div>
        <div style={{ fontSize: 13.5, color: COLORS.muted, marginTop: 3 }}>
          You're joining {g.venue} on {g.whenLong} at {g.time}.
        </div>

        {/* Summary */}
        <div style={{
          marginTop: 16, padding: 14,
          background: COLORS.chalk,
          border: `1px solid ${COLORS.hairline}`,
          borderRadius: 14,
        }}>
          <Row label="Pickup game" value={`${BRAND.currency}${g.price}.00`} />
          <Row label="Service fee" value={`${BRAND.currency}0.50`} muted />
          <div style={{ height: 1, background: COLORS.hairline, margin: '10px 0' }} />
          <Row label="Total" value={`${BRAND.currency}${(g.price + 0.5).toFixed(2)}`} bold />
        </div>

        {/* Method */}
        <div style={{
          fontSize: 12, fontWeight: 700, color: COLORS.muted,
          letterSpacing: 0.4, textTransform: 'uppercase',
          margin: '18px 0 8px',
        }}>Pay with</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <PayMethodRow
            icon={<div style={{
              width: 38, height: 38, borderRadius: 10,
              background: '#000', color: '#fff',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13, letterSpacing: -0.3,
            }}>Pay</div>}
            label="Apple Pay" sub="Touch ID or Face ID"
            on={method === 'applepay'} onTap={() => setMethod('applepay')}
            badge="FASTEST"
          />
          <PayMethodRow
            icon={<div style={{
              width: 38, height: 38, borderRadius: 10,
              background: 'linear-gradient(135deg, #1a1f71 0%, #00579f 100%)',
              color: '#fff', fontWeight: 800,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 10, letterSpacing: 0.3,
            }}>VISA</div>}
            label="Visa ··· 4288" sub="Expires 09/27"
            on={method === 'card'} onTap={() => setMethod('card')}
          />
        </div>

        {/* Cancellation policy */}
        <div style={{
          marginTop: 16,
          fontSize: 12, color: COLORS.muted, lineHeight: 1.5,
        }}>
          Free cancellation up to 4 hours before kickoff.
          See full <span style={{ color: COLORS.greenDeep, fontWeight: 600 }}>cancellation policy</span>.
        </div>

        {/* Pay button */}
        <div onClick={phase === 'select' ? pay : null} style={{
          marginTop: 18,
          background: COLORS.pitch, color: '#fff',
          padding: '15px 20px', borderRadius: 14,
          textAlign: 'center', fontSize: 15.5, fontWeight: 800, letterSpacing: -0.2,
          boxShadow: '0 4px 14px rgba(10,61,31,0.25)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          {phase === 'processing' ? (
            <>
              <div style={{
                width: 16, height: 16, borderRadius: 99,
                border: '2.5px solid rgba(255,255,255,0.3)',
                borderTopColor: '#fff',
                animation: 'spin .8s linear infinite',
              }} />
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
              Confirming…
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Pay {BRAND.currency}{(g.price + 0.5).toFixed(2)}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, bold, muted }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '4px 0',
    }}>
      <div style={{
        fontSize: bold ? 15 : 13.5,
        fontWeight: bold ? 700 : 500,
        color: muted ? COLORS.muted : COLORS.inkSoft,
      }}>{label}</div>
      <div style={{
        fontSize: bold ? 17 : 13.5,
        fontWeight: bold ? 800 : 600,
        color: muted ? COLORS.muted : COLORS.ink,
        letterSpacing: bold ? -0.3 : 0,
      }}>{value}</div>
    </div>
  );
}

window.PaymentScreen = PaymentScreen;
