// Onboarding — 3 lightweight steps: name, skill level, position.

function OnboardingDots({ step, total }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          height: 6, width: i === step ? 24 : 6,
          borderRadius: 99,
          background: i <= step ? COLORS.pitch : '#dde2db',
          transition: 'all .3s ease',
        }} />
      ))}
    </div>
  );
}

function OnboardingShell({ step, total, onBack, children, ctaLabel, ctaDisabled, onCta, skip }) {
  return (
    <div style={{
      width: '100%', height: '100%',
      background: COLORS.chalk,
      display: 'flex', flexDirection: 'column',
      fontFamily: FONT,
    }}>
      <div style={{ height: 54 }} />

      {/* top: back + dots + skip */}
      <div style={{
        padding: '8px 16px 0',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div onClick={onBack} style={{
          width: 36, height: 36, borderRadius: 18,
          background: '#fff', color: COLORS.inkSoft,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          visibility: onBack ? 'visible' : 'hidden',
          boxShadow: '0 1px 3px rgba(12,20,16,0.06)',
          cursor: 'pointer',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
            strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </div>
        <OnboardingDots step={step} total={total} />
        {skip ? (
          <div onClick={skip} style={{
            fontSize: 13, fontWeight: 600, color: COLORS.muted, cursor: 'pointer',
            padding: '8px 4px',
          }}>Skip</div>
        ) : <div style={{ width: 36 }} />}
      </div>

      <div style={{ flex: 1, padding: '32px 24px 16px', overflow: 'hidden' }}>
        {children}
      </div>

      <div style={{ padding: '12px 20px 36px' }}>
        <div
          onClick={ctaDisabled ? null : onCta}
          style={{
            background: ctaDisabled ? '#d5dcd6' : COLORS.pitch,
            color: '#fff',
            padding: '16px 20px', borderRadius: 16,
            textAlign: 'center', fontSize: 15.5, fontWeight: 700,
            letterSpacing: -0.2,
            cursor: ctaDisabled ? 'default' : 'pointer',
            transition: 'background .15s',
            boxShadow: ctaDisabled ? 'none' : '0 4px 14px rgba(10,61,31,0.25)',
          }}>{ctaLabel}</div>
      </div>
    </div>
  );
}

// ─── Step 1: name + brand intro ─────────────────────────────────────────────
function OnboardingName({ value, onChange, onNext }) {
  return (
    <OnboardingShell step={0} total={3}
      ctaLabel="Continue" ctaDisabled={!value.trim()} onCta={onNext}>
      {/* Brand mark */}
      <div style={{
        width: 64, height: 64, borderRadius: 18,
        background: COLORS.pitch, color: COLORS.lime,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 22,
        boxShadow: '0 10px 24px rgba(10,61,31,0.22)',
      }}>
        <Ico.ball width="34" height="34" />
      </div>
      <div style={{
        fontSize: 11, fontWeight: 700, color: COLORS.greenDeep,
        letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6,
      }}>{BRAND.name} · {BRAND.city}</div>
      <div style={{
        fontSize: 30, fontWeight: 800, color: COLORS.ink,
        letterSpacing: -0.8, lineHeight: 1.1, marginBottom: 10,
      }}>What should we call you?</div>
      <div style={{
        fontSize: 14.5, color: COLORS.muted, lineHeight: 1.45,
        marginBottom: 28,
      }}>This is how teammates will see you in the lineup. You can change it anytime.</div>

      <div style={{
        background: '#fff', borderRadius: 14,
        border: `1.5px solid ${value ? COLORS.pitch : COLORS.hairline}`,
        padding: '14px 16px',
        transition: 'border-color .2s',
      }}>
        <div style={{
          fontSize: 11, fontWeight: 700, color: COLORS.muted,
          letterSpacing: 0.4, textTransform: 'uppercase', marginBottom: 4,
        }}>Your name</div>
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Murad"
          style={{
            width: '100%', border: 'none', outline: 'none', background: 'transparent',
            fontSize: 18, fontWeight: 600, color: COLORS.ink,
            fontFamily: FONT, padding: 0,
          }}
        />
      </div>
    </OnboardingShell>
  );
}

// ─── Step 2: skill level ────────────────────────────────────────────────────
function OnboardingSkill({ value, onChange, onNext, onBack }) {
  return (
    <OnboardingShell step={1} total={3} onBack={onBack}
      ctaLabel="Continue" ctaDisabled={!value} onCta={onNext}>
      <div style={{
        fontSize: 30, fontWeight: 800, color: COLORS.ink,
        letterSpacing: -0.8, lineHeight: 1.1, marginBottom: 10,
      }}>How would you rate your level?</div>
      <div style={{
        fontSize: 14.5, color: COLORS.muted, lineHeight: 1.45,
        marginBottom: 24,
      }}>We use this to match you with games at the right pace.</div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {SKILL_LEVELS.map((lvl) => {
          const on = value === lvl.id;
          const s = SKILL[lvl.id];
          return (
            <div key={lvl.id} onClick={() => onChange(lvl.id)}
              style={{
                background: '#fff',
                border: `1.5px solid ${on ? COLORS.pitch : COLORS.hairline}`,
                borderRadius: 16, padding: '14px 16px',
                display: 'flex', alignItems: 'center', gap: 14,
                cursor: 'pointer',
                boxShadow: on ? '0 4px 14px rgba(10,61,31,0.10)' : 'none',
                transition: 'all .15s',
              }}>
              <div style={{
                width: 38, height: 38, borderRadius: 11,
                background: s.bg, color: s.fg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 16, fontWeight: 800,
              }}>{lvl.id.charAt(0)}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: COLORS.ink }}>{lvl.name}</div>
                <div style={{ fontSize: 12.5, color: COLORS.muted, marginTop: 1 }}>{lvl.sub}</div>
              </div>
              <div style={{
                width: 22, height: 22, borderRadius: 11,
                border: `2px solid ${on ? COLORS.pitch : '#d5dcd6'}`,
                background: on ? COLORS.pitch : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                transition: 'all .15s',
              }}>
                {on && (
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#fff"
                    strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </OnboardingShell>
  );
}

// ─── Step 3: position ───────────────────────────────────────────────────────
function OnboardingPosition({ value, onChange, onNext, onBack }) {
  return (
    <OnboardingShell step={2} total={3} onBack={onBack}
      ctaLabel={`Start playing in ${BRAND.city}`} ctaDisabled={!value} onCta={onNext}>
      <div style={{
        fontSize: 30, fontWeight: 800, color: COLORS.ink,
        letterSpacing: -0.8, lineHeight: 1.1, marginBottom: 10,
      }}>Where do you play?</div>
      <div style={{
        fontSize: 14.5, color: COLORS.muted, lineHeight: 1.45,
        marginBottom: 24,
      }}>Pick your preferred position. Hosts use this to balance teams.</div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        {POSITIONS.slice(0, 4).map((p) => {
          const on = value === p.id;
          return (
            <div key={p.id} onClick={() => onChange(p.id)}
              style={{
                background: on ? COLORS.pitch : '#fff',
                color: on ? '#fff' : COLORS.ink,
                border: `1.5px solid ${on ? COLORS.pitch : COLORS.hairline}`,
                borderRadius: 16, padding: '14px 14px 12px',
                cursor: 'pointer',
                transition: 'all .15s',
                boxShadow: on ? '0 4px 14px rgba(10,61,31,0.18)' : 'none',
              }}>
              <div style={{
                fontSize: 22, fontWeight: 900, letterSpacing: -0.5,
                color: on ? COLORS.lime : COLORS.pitch,
              }}>{p.id}</div>
              <div style={{ fontSize: 14.5, fontWeight: 700, marginTop: 6 }}>{p.name}</div>
              <div style={{
                fontSize: 11.5,
                color: on ? 'rgba(255,255,255,0.7)' : COLORS.muted,
                marginTop: 2,
              }}>{p.sub}</div>
            </div>
          );
        })}
      </div>
      <div style={{ marginTop: 10 }}>
        {(() => {
          const p = POSITIONS[4];
          const on = value === p.id;
          return (
            <div onClick={() => onChange(p.id)} style={{
              background: on ? COLORS.pitch : '#fff',
              color: on ? '#fff' : COLORS.ink,
              border: `1.5px solid ${on ? COLORS.pitch : COLORS.hairline}`,
              borderRadius: 16, padding: '12px 16px',
              display: 'flex', alignItems: 'center', gap: 12,
              cursor: 'pointer',
              transition: 'all .15s',
            }}>
              <div style={{
                fontSize: 18, fontWeight: 900, letterSpacing: -0.5,
                color: on ? COLORS.lime : COLORS.pitch,
              }}>{p.id}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14.5, fontWeight: 700 }}>{p.name}</div>
                <div style={{
                  fontSize: 11.5,
                  color: on ? 'rgba(255,255,255,0.7)' : COLORS.muted,
                  marginTop: 1,
                }}>{p.sub}</div>
              </div>
            </div>
          );
        })()}
      </div>
    </OnboardingShell>
  );
}

function OnboardingFlow() {
  const { finishOnboarding } = useApp();
  const [step, setStep] = React.useState(0);
  const [name, setName] = React.useState('');
  const [skill, setSkill] = React.useState(null);
  const [pos, setPos] = React.useState(null);

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => Math.max(0, s - 1));

  const finish = () => {
    finishOnboarding({
      name: name.trim(),
      skill,
      position: pos,
      initials: name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase(),
      avatarColor: '#f59e0b',
      city: BRAND.city,
      rating: 4.7,
      gamesPlayed: 24,
    });
  };

  return (
    <>
      {step === 0 && <OnboardingName value={name} onChange={setName} onNext={next} />}
      {step === 1 && <OnboardingSkill value={skill} onChange={setSkill} onNext={next} onBack={back} />}
      {step === 2 && <OnboardingPosition value={pos} onChange={setPos} onNext={finish} onBack={back} />}
    </>
  );
}

window.OnboardingFlow = OnboardingFlow;
