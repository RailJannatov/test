// Meydan — pickup football MVP in Baku, AZN.

const BRAND = {
  name: 'Meydan',
  city: 'Baku',
  currency: '\u20BC',  // AZN sign
};

const COLORS = {
  pitch: '#0a3d1f',
  pitchDeep: '#06321a',
  grass: '#1a6b34',
  lime: '#c6f24e',
  green: '#22c55e',
  greenDeep: '#16a34a',
  chalk: '#f6f7ef',
  ink: '#0c1410',
  inkSoft: '#2a3a30',
  muted: '#6b7a72',
  mutedLight: '#a3aea7',
  hairline: '#e3e8e2',
  cardBg: '#ffffff',
  amber: '#f59e0b',
  red: '#ef4444',
  redDeep: '#c2410c',
};

const SKILL = {
  'All levels':   { bg: '#eef7e9', fg: '#2a6b2a', dot: '#7ec46a' },
  'Beginner':     { bg: '#e9f3ff', fg: '#1d4e89', dot: '#3a82e0' },
  'Intermediate': { bg: '#fff5e6', fg: '#a35a00', dot: '#f59e0b' },
  'Advanced':     { bg: '#ffe9e9', fg: '#a13030', dot: '#e25a5a' },
};

const POSITIONS = [
  { id: 'GK', name: 'Goalkeeper', sub: 'Between the sticks' },
  { id: 'DF', name: 'Defender',   sub: 'Back line, tackles' },
  { id: 'MF', name: 'Midfielder', sub: 'Box-to-box, passing' },
  { id: 'FW', name: 'Forward',    sub: 'Scoring goals' },
  { id: 'AN', name: 'Anywhere',   sub: 'Wherever the team needs' },
];

const SKILL_LEVELS = [
  { id: 'Beginner',     name: 'Beginner',     sub: 'Just started, learning the basics' },
  { id: 'Intermediate', name: 'Intermediate', sub: 'Comfortable with the ball, regular player' },
  { id: 'Advanced',     name: 'Advanced',     sub: 'Strong technique, semi-competitive level' },
];

const AVATARS = [
  { i: 'RM', c: '#f59e0b', n: 'Rashad M.' },
  { i: 'NA', c: '#3b82f6', n: 'Nigar A.' },
  { i: 'EH', c: '#ec4899', n: 'Elvin H.' },
  { i: 'TQ', c: '#10b981', n: 'Tural Q.' },
  { i: 'OB', c: '#8b5cf6', n: 'Orxan B.' },
  { i: 'AR', c: '#ef4444', n: 'Aysel R.' },
  { i: 'VR', c: '#0ea5e9', n: 'Vusal R.' },
  { i: 'LM', c: '#84cc16', n: 'Leyla M.' },
  { i: 'MH', c: '#f97316', n: 'Murad H.' },
  { i: 'AS', c: '#a855f7', n: 'Aytac S.' },
  { i: 'KA', c: '#14b8a6', n: 'Kamran A.' },
  { i: 'NT', c: '#facc15', n: 'Nigar T.' },
];

// Six pickup games in Baku.
const GAMES = [
  {
    id: 'g1',
    when: 'Today', whenLong: 'Wed, 27 May', time: '19:30', endTime: '20:30', dur: '1h',
    venue: 'Neftchi Mini-Pitch',
    venueSub: 'Pitch 2 \u00b7 Nizami District',
    area: 'Nizami', address: 'Mehdi Hus\u0259ynzad\u0259 32, Baku',
    distKm: 1.4,
    format: '7v7', surface: 'Turf', lighting: 'Floodlit',
    skill: 'All levels',
    price: 12,
    filled: 11, total: 14,
    host: 'Rashad M.', hostRating: 4.9, hostGames: 47,
    hue: 0, hot: true,
    description: 'Friendly pickup game, mixed skill. Show up 10 min early for warm-up. Bibs provided.',
    rules: ['No slide tackles', 'Respect the referee', 'Pay before kickoff'],
  },
  {
    id: 'g2',
    when: 'Today', whenLong: 'Wed, 27 May', time: '20:45', endTime: '21:45', dur: '1h',
    venue: 'AZAL Indoor Arena',
    venueSub: 'Court A \u00b7 Khirdalan',
    area: 'Khirdalan', address: 'AZAL Sport Complex, Khirdalan',
    distKm: 3.8,
    format: '5v5', surface: 'Indoor', lighting: 'Indoor',
    skill: 'Intermediate',
    price: 15,
    filled: 8, total: 10,
    host: 'Nigar A.', hostRating: 4.8, hostGames: 32,
    hue: 1,
    description: 'Fast-paced 5-a-side indoor. Wear non-marking shoes.',
    rules: ['Non-marking shoes only', 'Time limit \u2014 strict 60 min', 'Pay before kickoff'],
  },
  {
    id: 'g3',
    when: 'Tomorrow', whenLong: 'Thu, 28 May', time: '08:00', endTime: '09:00', dur: '1h',
    venue: 'Bayil Sports Park',
    venueSub: 'Field 1 \u00b7 Sabail',
    area: 'Sabail', address: 'Bayil Hwy 14, Baku',
    distKm: 2.1,
    format: '8v8', surface: 'Turf', lighting: 'Daylight',
    skill: 'Beginner',
    price: 10,
    filled: 5, total: 16,
    host: 'Tural Q.', hostRating: 4.7, hostGames: 21,
    hue: 2,
    description: 'Morning kickabout for beginners. Coffee at the cafe after.',
    rules: ['Beginner-friendly only', 'Bring water', 'Cleats optional'],
  },
  {
    id: 'g4',
    when: 'Tomorrow', whenLong: 'Thu, 28 May', time: '19:00', endTime: '20:30', dur: '1h 30',
    venue: 'Khazar Pitch',
    venueSub: 'Yasamal District',
    area: 'Yasamal', address: 'Hasan Aliyev 12, Baku',
    distKm: 2.6,
    format: '7v7', surface: 'Turf', lighting: 'Floodlit',
    skill: 'Advanced',
    price: 14,
    filled: 13, total: 14,
    host: 'Orxan B.', hostRating: 4.9, hostGames: 64,
    hue: 0, hot: true,
    description: 'Competitive 7v7. Ref provided. Strong technical level expected.',
    rules: ['Strict offside enforced', 'Substitutions on the fly', 'Pay before kickoff'],
  },
  {
    id: 'g5',
    when: 'Tomorrow', whenLong: 'Thu, 28 May', time: '21:15', endTime: '22:15', dur: '1h',
    venue: 'Narimanov Sport Centre',
    venueSub: 'Pitch B \u00b7 Narimanov',
    area: 'Narimanov', address: 'Ataturk Ave 96, Baku',
    distKm: 4.9,
    format: '5v5', surface: 'Turf', lighting: 'Floodlit',
    skill: 'All levels',
    price: 11,
    filled: 6, total: 10,
    host: 'Aysel R.', hostRating: 4.6, hostGames: 18,
    hue: 1,
    description: 'Late-night casual game. Good vibe, no egos.',
    rules: ['No slide tackles', 'Respect the venue', 'Pay before kickoff'],
  },
  {
    id: 'g6',
    when: 'Sat 31', whenLong: 'Sat, 31 May', time: '10:30', endTime: '11:30', dur: '1h',
    venue: 'Sahil Sports Park',
    venueSub: 'Pitch 3 \u00b7 Bayil',
    area: 'Bayil', address: 'Neftchilar Ave 4, Baku',
    distKm: 3.4,
    format: '7v7', surface: 'Turf', lighting: 'Daylight',
    skill: 'Intermediate',
    price: 13,
    filled: 9, total: 14,
    host: 'Vusal R.', hostRating: 4.8, hostGames: 41,
    hue: 2,
    description: 'Weekend morning game with regulars. New faces welcome.',
    rules: ['Fair play', 'Bibs provided', 'Pay before kickoff'],
  },
];

// User's booking history (past games).
const PAST_GAMES = [
  {
    id: 'p1', date: 'Sat, 24 May', time: '11:00',
    venue: 'Sahil Sports Park', format: '7v7',
    result: 'Team won 4\u20132', mvp: false, rating: 4.5, price: 13, hue: 2,
  },
  {
    id: 'p2', date: 'Thu, 22 May', time: '20:00',
    venue: 'Khazar Pitch', format: '5v5',
    result: 'Team lost 3\u20135', mvp: true, rating: 4.8, price: 12, hue: 0,
  },
  {
    id: 'p3', date: 'Tue, 20 May', time: '19:30',
    venue: 'Neftchi Mini-Pitch', format: '7v7',
    result: 'Drew 2\u20132', mvp: false, rating: 4.6, price: 12, hue: 0,
  },
  {
    id: 'p4', date: 'Sun, 18 May', time: '10:30',
    venue: 'AZAL Indoor Arena', format: '5v5',
    result: 'Team won 6\u20133', mvp: false, rating: 4.7, price: 15, hue: 1,
  },
];

Object.assign(window, { BRAND, COLORS, SKILL, AVATARS, GAMES, PAST_GAMES, POSITIONS, SKILL_LEVELS });
