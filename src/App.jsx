import { useEffect, useState } from 'react'
import logo from '/logo.png'

const TALLY_URL = 'https://tally.so/r/J9JyA4'

const STARS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  size: [2, 2, 3, 3, 4][i % 5],
  top: [6, 14, 22, 30, 38, 50, 58, 65, 72, 80, 88, 93][i],
  left: [12, 82, 4, 94, 18, 97, 75, 8, 55, 88, 28, 45][i],
  delay: (i * 0.35).toFixed(1),
}))

function Countdown() {
  const target = new Date('2026-05-30T18:30:00')
  const [diff, setDiff] = useState(() => target - Date.now())
  useEffect(() => {
    const id = setInterval(() => setDiff(target - Date.now()), 1000)
    return () => clearInterval(id)
  }, [])
  const total = Math.max(0, Math.floor(diff / 1000))
  const days = Math.floor(total / 86400)
  const hours = Math.floor((total % 86400) / 3600)
  const mins = Math.floor((total % 3600) / 60)
  const secs = total % 60
  const units = [{ label: 'Jours', value: days }, { label: 'Heures', value: hours }, { label: 'Min', value: mins }, { label: 'Sec', value: secs }]
  return (
    <div style={S.countdownWrap}>
      <span style={S.countdownTitle}>⏳  La fête commence dans</span>
      <div style={S.countdownRow}>
        {units.map(({ label, value }) => (
          <div key={label} style={S.countdownUnit}>
            <span style={S.countdownNum}>{String(value).padStart(2, '0')}</span>
            <span style={S.countdownLabel}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function GoldLine() {
  return <div style={{ width: '100%', height: 1, background: 'linear-gradient(90deg, transparent, #C9A84C, #FFD700, #C9A84C, transparent)', margin: '16px 0' }} />
}

function DetailItem({ icon, label, value, fullWidth }) {
  return (
    <div style={{ ...S.detailItem, ...(fullWidth ? S.detailFull : {}) }}>
      <span style={S.detailIcon}>{icon}</span>
      <span style={S.detailLabel}>{label}</span>
      <div style={S.detailValue}>{value}</div>
    </div>
  )
}

export default function App() {
  return (
    <div style={S.body}>
      <div style={S.card}>
        <div style={S.starsContainer}>
          {STARS.map(s => (
            <span key={s.id} style={{ ...S.star, width: s.size, height: s.size, top: s.top + '%', left: s.left + '%', animationDelay: s.delay + 's' }} />
          ))}
        </div>
        <div style={{ ...S.corner, ...S.cornerTL }} />
        <div style={{ ...S.corner, ...S.cornerTR }} />
        <div style={{ ...S.corner, ...S.cornerBL }} />
        <div style={{ ...S.corner, ...S.cornerBR }} />
        <div style={S.surpriseHeader}>
          <span style={S.surpriseBadge}>🎉   Fête Surprise   🎉</span>
        </div>
        <GoldLine />
        <div style={S.logoSection}>
          <img src={logo} alt="70 ans Maman Antoinette" style={S.logoImg} />
        </div>
        <div style={S.mainTitle}>
          <h1 style={S.h1}>Maman Antoinette</h1>
          <p style={S.subtitle}>✦   Célébration des 70 ans   ✦</p>
        </div>
        <GoldLine />
        <div style={S.invitationText}>
          <p style={S.invitP}>
            Vous êtes chaleureusement invité(e) à célébrer<br />
            les <strong style={S.gold}>70 magnifiques années</strong> de Maman<br />
            lors d'une <strong style={S.gold}>soirée surprise</strong> en son honneur.
          </p>
        </div>
        <div style={S.secretBox}>
          <p style={S.secretP}>🤫   C'est une <strong style={S.gold}>SURPRISE</strong> — gardez le secret absolu !   🤫</p>
        </div>
        <div style={S.detailsGrid}>
          <DetailItem icon="📅" label="Date" value={<>Vendredi<br />30 Mai 2026</>} />
          <DetailItem icon="🕕" label="Arrivée des invités" value="18h30" />
          <DetailItem icon="📍" label="Lieu" value="À préciser" fullWidth />
        </div>
        <div style={S.dressCode}>
          <span style={S.dcLabel}>👗   Code Vestimentaire</span>
          <div style={S.dcValue}>Violet &amp; Or</div>
          <div style={S.colorDots}>
            {['#6B21A8', '#C084FC', '#FFD700'].map(c => <span key={c} style={{ ...S.dot, background: c }} />)}
          </div>
        </div>
        <div style={S.importantNotice}>
          <p style={S.noticeP}>⏰   Merci d'être présents <strong style={S.gold}>avant 19h00</strong> afin d'accueillir Maman comme il se doit.</p>
        </div>
        <Countdown />
        <GoldLine />
        <div style={S.rsvpSection}>
          <span style={S.rsvpLabel}>📩   Confirmez votre présence</span>
          <a href={TALLY_URL} target="_blank" rel="noopener noreferrer" style={S.rsvpBtn}>
            ✨   Je confirme ma présence   ✨
          </a>
          <div style={S.rsvpDate}>avant le 20 Mai 2026</div>
        </div>
        <div style={S.footer}>
          <p style={S.footerText}>Avec tout notre amour ♡</p>
        </div>
      </div>
      <style>{`
        @keyframes twinkle { 0%{opacity:.15;transform:scale(1)} 100%{opacity:.65;transform:scale(1.4)} }
        a:hover { transform: scale(1.04) !important; box-shadow: 0 6px 30px rgba(255,215,0,0.65) !important; }
      `}</style>
    </div>
  )
}

const S = {
  body: { background: '#0f001f', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'flex-start', padding: '20px 10px 40px', fontFamily: "'Cormorant Garamond', serif" },
  card: { width: '100%', maxWidth: 560, background: 'linear-gradient(160deg,#2D0A4E 0%,#1a0033 45%,#2D0A4E 100%)', border: '2px solid #C9A84C', borderRadius: 6, position: 'relative', overflow: 'hidden', padding: '35px 40px', boxShadow: '0 0 80px rgba(201,168,76,0.35), inset 0 0 100px rgba(0,0,0,0.3)' },
  starsContainer: { position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' },
  star: { position: 'absolute', background: '#FFD700', borderRadius: '50%', animation: 'twinkle 3s infinite alternate' },
  corner: { position: 'absolute', width: 80, height: 80, borderColor: '#C9A84C', borderStyle: 'solid', opacity: 0.65 },
  cornerTL: { top: 10, left: 10, borderWidth: '2px 0 0 2px' },
  cornerTR: { top: 10, right: 10, borderWidth: '2px 2px 0 0' },
  cornerBL: { bottom: 10, left: 10, borderWidth: '0 0 2px 2px' },
  cornerBR: { bottom: 10, right: 10, borderWidth: '0 2px 2px 0' },
  surpriseHeader: { textAlign: 'center', marginBottom: 10 },
  surpriseBadge: { display: 'inline-block', background: 'linear-gradient(135deg,#C9A84C,#FFD700,#C9A84C)', color: '#1a0033', fontFamily: "'Playfair Display',serif", fontSize: 11, fontWeight: 700, letterSpacing: 3, textTransform: 'uppercase', padding: '7px 22px', borderRadius: 30, boxShadow: '0 2px 12px rgba(201,168,76,0.5)' },
  logoSection: { textAlign: 'center', margin: '16px 0' },
  logoImg: { width: 180, height: 'auto', filter: 'drop-shadow(0 4px 24px rgba(201,168,76,0.55))' },
  mainTitle: { textAlign: 'center', margin: '8px 0 12px' },
  h1: { fontFamily: "'Great Vibes',cursive", fontSize: 48, color: '#FFD700', textShadow: '0 0 24px rgba(201,168,76,0.7),2px 2px 4px rgba(0,0,0,0.6)', lineHeight: 1.1, marginBottom: 6 },
  subtitle: { fontFamily: "'Playfair Display',serif", fontSize: 11, color: '#C9A84C', letterSpacing: 4, textTransform: 'uppercase' },
  invitationText: { textAlign: 'center', margin: '8px 0' },
  invitP: { fontSize: 17, color: '#E8D5B7', lineHeight: 1.7, fontStyle: 'italic' },
  gold: { color: '#FFD700', fontStyle: 'normal', fontWeight: 600 },
  secretBox: { textAlign: 'center', background: 'rgba(201,168,76,0.10)', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 8, padding: '10px 18px', margin: '12px 0' },
  secretP: { fontFamily: "'Playfair Display',serif", fontSize: 13, color: '#FFD700', letterSpacing: 1 },
  detailsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, margin: '14px 0' },
  detailItem: { background: 'rgba(201,168,76,0.07)', border: '1px solid rgba(201,168,76,0.22)', borderRadius: 8, padding: '13px 14px', textAlign: 'center' },
  detailFull: { gridColumn: '1 / -1' },
  detailIcon: { fontSize: 20, marginBottom: 5, display: 'block' },
  detailLabel: { fontFamily: "'Playfair Display',serif", fontSize: 9, color: '#C9A84C', letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 4 },
  detailValue: { fontFamily: "'Cormorant Garamond',serif", fontSize: 16, color: '#F5E6C8', fontWeight: 600, lineHeight: 1.3 },
  dressCode: { background: 'linear-gradient(135deg,rgba(138,43,226,0.2),rgba(201,168,76,0.1))', border: '1px solid rgba(201,168,76,0.35)', borderRadius: 8, padding: '12px 18px', margin: '10px 0', textAlign: 'center' },
  dcLabel: { fontFamily: "'Playfair Display',serif", fontSize: 9, color: '#C9A84C', letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 5 },
  dcValue: { fontFamily: "'Cormorant Garamond',serif", fontSize: 18, color: '#E8D5B7', fontWeight: 600 },
  colorDots: { marginTop: 6 },
  dot: { display: 'inline-block', width: 14, height: 14, borderRadius: '50%', margin: '0 4px' },
  importantNotice: { background: 'rgba(138,43,226,0.15)', borderLeft: '3px solid #C9A84C', padding: '11px 15px', borderRadius: '0 8px 8px 0', margin: '10px 0' },
  noticeP: { fontSize: 15, color: '#E8D5B7', lineHeight: 1.5 },
  countdownWrap: { textAlign: 'center', background: 'rgba(201,168,76,0.08)', border: '1px solid rgba(201,168,76,0.2)', borderRadius: 8, padding: '12px 10px', margin: '12px 0' },
  countdownTitle: { fontFamily: "'Playfair Display',serif", fontSize: 9, color: '#C9A84C', letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 8 },
  countdownRow: { display: 'flex', justifyContent: 'center', gap: 16 },
  countdownUnit: { display: 'flex', flexDirection: 'column', alignItems: 'center' },
  countdownNum: { fontFamily: "'Playfair Display',serif", fontSize: 28, color: '#FFD700', fontWeight: 700, lineHeight: 1 },
  countdownLabel: { fontFamily: "'Cormorant Garamond',serif", fontSize: 11, color: '#C9A84C', marginTop: 2 },
  rsvpSection: { textAlign: 'center', margin: '18px 0 10px' },
  rsvpLabel: { fontFamily: "'Playfair Display',serif", fontSize: 10, color: '#C9A84C', letterSpacing: 3, textTransform: 'uppercase', display: 'block', marginBottom: 10 },
  rsvpBtn: { display: 'inline-block', background: 'linear-gradient(135deg,#C9A84C,#FFD700,#C9A84C)', color: '#1a0033', fontFamily: "'Playfair Display',serif", fontSize: 15, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', padding: '14px 36px', borderRadius: 40, textDecoration: 'none', boxShadow: '0 4px 20px rgba(201,168,76,0.55)', transition: 'transform 0.2s ease, box-shadow 0.2s ease' },
  rsvpDate: { fontFamily: "'Cormorant Garamond',serif", fontSize: 14, color: '#C9A84C', marginTop: 8, fontStyle: 'italic' },
  footer: { textAlign: 'center', marginTop: 14 },
  footerText: { fontFamily: "'Great Vibes',cursive", fontSize: 30, color: '#C9A84C', opacity: 0.85 },
}
