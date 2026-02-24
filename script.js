// ════════════════════════════════════════════
// RANK SYSTEM
// ════════════════════════════════════════════
const RANKS = [
  { name: 'Bronze', icon: '🥉', color: '#cd7f32', minXP: 0, maxXP: 99 },
  { name: 'Silver', icon: '🥈', color: '#b0b7c3', minXP: 100, maxXP: 299 },
  { name: 'Gold', icon: '🥇', color: '#ffd600', minXP: 300, maxXP: 599 },
  { name: 'Platinum', icon: '💎', color: '#a8d8ea', minXP: 600, maxXP: 999 },
  { name: 'Diamond', icon: '💠', color: '#b9f2ff', minXP: 1000, maxXP: 1999 },
  { name: 'Legend', icon: '👑', color: '#ff6b6b', minXP: 2000, maxXP: Infinity }
];

function getRank(xp) {
  for (let i = RANKS.length - 1; i >= 0; i--) {
    if (xp >= RANKS[i].minXP) return RANKS[i];
  }
  return RANKS[0];
}
function getRankProgress(xp) {
  const rank = getRank(xp);
  if (rank.maxXP === Infinity) return { pct: 100, current: xp - rank.minXP, needed: 0 };
  const progress = xp - rank.minXP;
  const total = rank.maxXP - rank.minXP + 1;
  return { pct: Math.min(100, Math.round((progress / total) * 100)), current: progress, needed: total - progress };
}

// ════════════════════════════════════════════
// PLAYER DATA
// ════════════════════════════════════════════
let playerData = { name: '', xp: 0, gamesPlayed: 0, bestScore: 0, unlockedCards: [] };

function loadPlayerData() {
  try {
    const saved = localStorage.getItem('90min_player');
    if (saved) {
      const parsed = JSON.parse(saved);
      playerData = { ...playerData, ...parsed };
      if (!playerData.unlockedCards) playerData.unlockedCards = [];
    }
  } catch (e) { }
}
function savePlayerData() {
  try { localStorage.setItem('90min_player', JSON.stringify(playerData)); } catch (e) { }
}
function saveToLeaderboard() {
  try {
    const lb = JSON.parse(localStorage.getItem('90min_leaderboard') || '[]');
    const idx = lb.findIndex(p => p.name === playerData.name);
    const entry = { name: playerData.name, xp: playerData.xp, gamesPlayed: playerData.gamesPlayed, bestScore: playerData.bestScore };
    if (idx >= 0) lb[idx] = entry; else lb.push(entry);
    lb.sort((a, b) => b.xp - a.xp);
    localStorage.setItem('90min_leaderboard', JSON.stringify(lb.slice(0, 20)));
  } catch (e) { }
}
function getLeaderboard() {
  try { return JSON.parse(localStorage.getItem('90min_leaderboard') || '[]'); } catch (e) { return []; }
}
function updateHomeRankDisplay() {
  document.getElementById('home-rank-icon').textContent = getRank(playerData.xp).icon;
  document.getElementById('home-rank-name').textContent = getRank(playerData.xp).name;
  document.getElementById('home-rank-xp').textContent = playerData.xp + ' XP';
}

// ════════════════════════════════════════════
// FOOTBALLER CARDS DATABASE — 30 Players/Managers
// ════════════════════════════════════════════
const FOOTBALLER_CARDS = [
  // ── LEGEND RARITY ──
  {
    id: 'pele', name: 'Pelé', emoji: '🇧🇷', nation: 'Brazil', rarity: 'legend', type: 'player',
    stats: { goals: 770, trophies: 3, era: '1958-77' },
    bio: 'The king of football. Won three World Cups with Brazil and scored over 1,000 career goals.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Três Corações, Brazil in 1940.' },
      { cat: 'Club', text: 'I spent most of my club career at Santos FC, a Brazilian club.' },
      { cat: 'Achievement', text: 'I won the FIFA World Cup three times.' },
      { cat: 'Record', text: 'I scored over 1,000 career goals — a feat never matched.' },
      { cat: 'Legacy', text: 'FIFA named me "Player of the Century" jointly with Diego Maradona.' },
    ],
    options: ['Pelé', 'Garrincha', 'Zico', 'Romário']
  },
  {
    id: 'maradona', name: 'Diego Maradona', emoji: '🇦🇷', nation: 'Argentina', rarity: 'legend', type: 'player',
    stats: { goals: 312, trophies: 5, era: '1976-97' },
    bio: 'Author of the Hand of God and Goal of the Century. Led Argentina to the 1986 World Cup.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Buenos Aires, Argentina in 1960.' },
      { cat: 'Club', text: 'I famously played for Napoli in Italy, winning two Serie A titles.' },
      { cat: 'Achievement', text: 'I captained Argentina to World Cup glory in 1986 in Mexico.' },
      { cat: 'Infamous', text: 'I scored two goals against England in 1986 — one legal, one with my hand.' },
      { cat: 'Legacy', text: 'I was named FIFA Player of the 20th Century alongside Pelé.' },
    ],
    options: ['Diego Maradona', 'Gabriel Batistuta', 'Mario Kempes', 'Hernán Crespo']
  },
  {
    id: 'beckenbauer', name: 'Franz Beckenbauer', emoji: '🇩🇪', nation: 'Germany', rarity: 'legend', type: 'player',
    stats: { goals: 95, trophies: 8, era: '1964-83' },
    bio: 'Der Kaiser. Won the World Cup as player in 1974 AND as manager in 1990.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Munich, Germany in 1945.' },
      { cat: 'Club', text: 'I was the iconic captain of Bayern Munich for over a decade.' },
      { cat: 'Position', text: 'I revolutionised the sweeper (libero) role, marauding forward from defence.' },
      { cat: 'Achievement', text: 'I won the World Cup in 1974 as captain of West Germany.' },
      { cat: 'Manager', text: 'I am one of only three men to win the World Cup as both player AND manager.' },
    ],
    options: ['Franz Beckenbauer', 'Gerd Müller', 'Karl-Heinz Rummenigge', 'Sepp Maier']
  },
  {
    id: 'ronaldo_r9', name: 'Ronaldo R9', emoji: '🇧🇷', nation: 'Brazil', rarity: 'legend', type: 'player',
    stats: { goals: 352, trophies: 5, era: '1993-2011' },
    bio: 'The original Ronaldo. Two-time Ballon d\'Or winner and two-time World Cup champion.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Rio de Janeiro, Brazil in 1976.' },
      { cat: 'Club', text: 'I famously played for Barcelona, Inter Milan, Real Madrid, and Brazil.' },
      { cat: 'Achievement', text: 'I won the Ballon d\'Or twice (1997, 2002) and the FIFA World Cup twice.' },
      { cat: 'Tournament', text: 'I was top scorer at both the 1998 and 2002 World Cups.' },
      { cat: 'Legacy', text: 'I wore the iconic "R9" shirt and was nicknamed "O Fenômeno" — The Phenomenon.' },
    ],
    options: ['Ronaldo R9', 'Rivaldo', 'Ronaldinho', 'Roberto Carlos']
  },
  {
    id: 'cruyff', name: 'Johan Cruyff', emoji: '🇳🇱', nation: 'Netherlands', rarity: 'legend', type: 'player',
    stats: { goals: 284, trophies: 9, era: '1964-84' },
    bio: 'The architect of Total Football. Won three Ballon d\'Or awards and created the Cruyff Turn.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Amsterdam, Netherlands in 1947.' },
      { cat: 'Club', text: 'I dominated European football with Ajax and later Barcelona.' },
      { cat: 'Tactic', text: 'I was the living embodiment of "Total Football" — every player in any position.' },
      { cat: 'Skill', text: 'I invented a famous dribbling move — a reverse turn — named after me.' },
      { cat: 'Manager', text: 'As Barcelona\'s manager I created the "Dream Team" that dominated Spain.' },
    ],
    options: ['Johan Cruyff', 'Marco van Basten', 'Dennis Bergkamp', 'Ruud Gullit']
  },
  // ── GOLD RARITY ──
  {
    id: 'messi', name: 'Lionel Messi', emoji: '🇦🇷', nation: 'Argentina', rarity: 'gold', type: 'player',
    stats: { goals: 850, trophies: 44, era: '2004-' },
    bio: '8-time Ballon d\'Or winner. La Liga all-time top scorer. 2022 World Cup winner.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Rosario, Argentina in 1987.' },
      { cat: 'Club', text: 'I spent the majority of my career at FC Barcelona, debuting as a teenager.' },
      { cat: 'Record', text: 'I have won the Ballon d\'Or a record 8 times.' },
      { cat: 'Achievement', text: 'I finally won the FIFA World Cup in 2022 in Qatar.' },
      { cat: 'Current', text: 'I currently play for Inter Miami in Major League Soccer.' },
    ],
    options: ['Lionel Messi', 'Sergio Agüero', 'Angel Di Maria', 'Gonzalo Higuain']
  },
  {
    id: 'ronaldo_cr7', name: 'Cristiano Ronaldo', emoji: '🇵🇹', nation: 'Portugal', rarity: 'gold', type: 'player',
    stats: { goals: 900, trophies: 34, era: '2002-' },
    bio: '5-time Ballon d\'Or. All-time top scorer in Champions League and international football.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Funchal, Madeira, Portugal in 1985.' },
      { cat: 'Club', text: 'I have played for Sporting CP, Manchester United, Real Madrid, Juventus, and Al Nassr.' },
      { cat: 'Record', text: 'I am the all-time leading goal scorer in both the Champions League and international football.' },
      { cat: 'Number', text: 'My iconic shirt number is #7, worn at every major club.' },
      { cat: 'Nickname', text: 'My worldwide nickname is "CR7".' },
    ],
    options: ['Cristiano Ronaldo', 'Luis Figo', 'Eusébio', 'Rui Costa']
  },
  {
    id: 'zidane_player', name: 'Zinedine Zidane', emoji: '🇫🇷', nation: 'France', rarity: 'gold', type: 'player',
    stats: { goals: 125, trophies: 15, era: '1989-2006' },
    bio: 'The 1998 World Cup hero. Elegant midfield maestro who won the Ballon d\'Or three times.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Marseille, France to Algerian parents in 1972.' },
      { cat: 'Club', text: 'I played for Cannes, Bordeaux, Juventus, and Real Madrid.' },
      { cat: 'Achievement', text: 'I scored twice in the 1998 World Cup final to win the trophy for France.' },
      { cat: 'Infamous', text: 'My final act in football was a headbutt on Materazzi in the 2006 World Cup final.' },
      { cat: 'Manager', text: 'I managed Real Madrid and won three consecutive Champions League titles.' },
    ],
    options: ['Zinedine Zidane', 'Thierry Henry', 'Patrick Vieira', 'David Trezeguet']
  },
  {
    id: 'ronaldinho', name: 'Ronaldinho', emoji: '🇧🇷', nation: 'Brazil', rarity: 'gold', type: 'player',
    stats: { goals: 282, trophies: 14, era: '1998-2015' },
    bio: 'The most naturally gifted player of his generation. Made football look like art.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Porto Alegre, Brazil in 1980.' },
      { cat: 'Club', text: 'My greatest years were at Barcelona, where I won back-to-back Liga titles.' },
      { cat: 'Achievement', text: 'I won the Ballon d\'Or in 2005 and the FIFA World Cup in 2002.' },
      { cat: 'Style', text: 'I was famous for my flicks, elasticos, and no-look passes. Football was my joy.' },
      { cat: 'Legacy', text: 'Even Real Madrid fans gave me a standing ovation at the Bernabéu in 2005.' },
    ],
    options: ['Ronaldinho', 'Robinho', 'Rivaldo', 'Kaká']
  },
  {
    id: 'henry', name: 'Thierry Henry', emoji: '🇫🇷', nation: 'France', rarity: 'gold', type: 'player',
    stats: { goals: 411, trophies: 11, era: '1994-2012' },
    bio: 'Arsenal\'s all-time top scorer. Part of the "Invincibles". Elegant and lethal.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Les Ulis, France in 1977.' },
      { cat: 'Club', text: 'I am the all-time top scorer for Arsenal Football Club.' },
      { cat: 'Achievement', text: 'I went an entire Premier League season unbeaten with Arsenal in 2003-04.' },
      { cat: 'Infamous', text: 'I handled the ball to set up France\'s goal against Ireland in the 2010 World Cup play-off.' },
      { cat: 'Manager', text: 'I managed the Canadian national team after retiring.' },
    ],
    options: ['Thierry Henry', 'Nicolas Anelka', 'Robert Pirès', 'Sylvain Wiltord']
  },
  // ── SILVER RARITY ──
  {
    id: 'haaland', name: 'Erling Haaland', emoji: '🇳🇴', nation: 'Norway', rarity: 'silver', type: 'player',
    stats: { goals: 290, trophies: 8, era: '2016-' },
    bio: 'The most lethal striker of his generation. Broke the Premier League goals record in debut season.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Leeds, England but represent Norway internationally.' },
      { cat: 'Club', text: 'I joined Manchester City from Borussia Dortmund in 2022.' },
      { cat: 'Record', text: 'I scored 36 Premier League goals in my debut season, breaking the all-time record.' },
      { cat: 'Father', text: 'My father, Alfie Haaland, also played in the Premier League.' },
      { cat: 'Style', text: 'I am known for my incredible pace, clinical finishing, and ice-cold composure.' },
    ],
    options: ['Erling Haaland', 'Alexander Sörloth', 'Ødegaard', 'Joshua King']
  },
  {
    id: 'mbappe', name: 'Kylian Mbappé', emoji: '🇫🇷', nation: 'France', rarity: 'silver', type: 'player',
    stats: { goals: 340, trophies: 15, era: '2015-' },
    bio: 'The fastest player in world football. 2018 World Cup winner. Joined Real Madrid in 2024.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Paris, France in 1998 to a Cameroonian father and Algerian mother.' },
      { cat: 'Club', text: 'I played for Monaco before joining PSG, and moved to Real Madrid in 2024.' },
      { cat: 'Achievement', text: 'I won the 2018 World Cup with France, scoring in the final aged just 19.' },
      { cat: 'Speed', text: 'I have been recorded as the fastest player in football history at over 38 km/h.' },
      { cat: 'Legacy', text: 'Pelé once said I was the most exciting young player since himself.' },
    ],
    options: ['Kylian Mbappé', 'Ousmane Dembélé', 'Antoine Griezmann', 'Kingsley Coman']
  },
  {
    id: 'buffon', name: 'Gianluigi Buffon', emoji: '🇮🇹', nation: 'Italy', rarity: 'silver', type: 'player',
    stats: { goals: 0, trophies: 26, era: '1995-2023' },
    bio: 'The greatest goalkeeper of all time. Served Juventus for over two decades.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Carrara, Italy in 1978.' },
      { cat: 'Club', text: 'I am synonymous with Juventus, where I played for over two decades.' },
      { cat: 'Achievement', text: 'I won the 2006 World Cup with Italy, conceding only 2 goals in the entire tournament.' },
      { cat: 'Record', text: 'I hold the record for most Champions League appearances of any goalkeeper.' },
      { cat: 'Number', text: 'I always wore the number 1 shirt, and it was retired by Parma in my honour.' },
    ],
    options: ['Gianluigi Buffon', 'Dino Zoff', 'Angelo Peruzzi', 'Sebastiano Rossi']
  },
  {
    id: 'iniesta', name: 'Andrés Iniesta', emoji: '🇪🇸', nation: 'Spain', rarity: 'silver', type: 'player',
    stats: { goals: 93, trophies: 35, era: '2002-2023' },
    bio: 'Scored the 2010 World Cup winning goal. The engine of Barcelona\'s golden era.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Fuentealbilla, Spain in 1984.' },
      { cat: 'Club', text: 'I spent my entire Spanish career at FC Barcelona, La Masia\'s finest product.' },
      { cat: 'Achievement', text: 'I scored the winning goal in the 2010 FIFA World Cup final in extra time.' },
      { cat: 'Style', text: 'I was known for my calmness under pressure, vision, and ability to navigate tight spaces.' },
      { cat: 'End', text: 'I played my final years for Vissel Kobe in Japan before retiring.' },
    ],
    options: ['Andrés Iniesta', 'Xavi Hernández', 'David Silva', 'Cesc Fàbregas']
  },
  {
    id: 'van_basten', name: 'Marco van Basten', emoji: '🇳🇱', nation: 'Netherlands', rarity: 'silver', type: 'player',
    stats: { goals: 301, trophies: 11, era: '1981-1995' },
    bio: 'Three-time Ballon d\'Or winner. Scored one of the greatest goals ever in Euro 1988.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Utrecht, Netherlands in 1964.' },
      { cat: 'Club', text: 'I played for Ajax and AC Milan during my career, winning multiple European trophies.' },
      { cat: 'Achievement', text: 'I won the Ballon d\'Or three times and the European Championship in 1988.' },
      { cat: 'Famous goal', text: 'My volley in the 1988 Euro final against the USSR is considered one of the greatest ever scored.' },
      { cat: 'Career end', text: 'A chronic ankle injury tragically forced me to retire aged just 28.' },
    ],
    options: ['Marco van Basten', 'Ruud Gullit', 'Frank Rijkaard', 'Patrick Kluivert']
  },
  {
    id: 'cantona', name: 'Eric Cantona', emoji: '🇫🇷', nation: 'France', rarity: 'silver', type: 'player',
    stats: { goals: 143, trophies: 10, era: '1983-1997' },
    bio: 'The King of Old Trafford. Transformed Manchester United into Premier League champions.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Paris, France in 1966 to a Sardinian father.' },
      { cat: 'Club', text: 'I joined Manchester United from Leeds and became a legend under Sir Alex Ferguson.' },
      { cat: 'Achievement', text: 'I won four Premier League titles in five years with Manchester United.' },
      { cat: 'Infamous', text: 'I was banned for eight months after a kung-fu kick on a Crystal Palace fan in 1995.' },
      { cat: 'Quote', text: 'I famously said "The seagulls follow the trawler" at a press conference.' },
    ],
    options: ['Eric Cantona', 'David Ginola', 'Laurent Blanc', 'Didier Deschamps']
  },
  // ── BRONZE RARITY ──
  {
    id: 'gerrard', name: 'Steven Gerrard', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', nation: 'England', rarity: 'bronze', type: 'player',
    stats: { goals: 186, trophies: 9, era: '1998-2016' },
    bio: 'Liverpool\'s greatest ever captain. Inspired the 2005 Champions League miracle.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Whiston, Merseyside, England in 1980.' },
      { cat: 'Club', text: 'I spent my entire English career at Liverpool, the club I supported as a boy.' },
      { cat: 'Achievement', text: 'I captained Liverpool to a miraculous Champions League comeback from 3-0 down to win in 2005.' },
      { cat: 'Infamous', text: 'I slipped at a crucial moment vs Chelsea in 2014, costing Liverpool the Premier League title.' },
      { cat: 'Manager', text: 'I managed Rangers in Scotland before taking jobs in MLS and Saudi Arabia.' },
    ],
    options: ['Steven Gerrard', 'Frank Lampard', 'Paul Scholes', 'Patrick Vieira']
  },
  {
    id: 'weah', name: 'George Weah', emoji: '🇱🇷', nation: 'Liberia', rarity: 'bronze', type: 'player',
    stats: { goals: 244, trophies: 9, era: '1985-2003' },
    bio: 'Africa\'s greatest footballer. The only African to win the FIFA World Player of the Year award.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Monrovia, Liberia in 1966.' },
      { cat: 'Club', text: 'I played for Monaco, PSG, and most famously AC Milan.' },
      { cat: 'Achievement', text: 'I won the 1995 FIFA World Player of the Year and Ballon d\'Or — the first and only African to do so.' },
      { cat: 'Goal', text: 'My solo goal against Verona in 1996, starting from inside my own half, is legendary.' },
      { cat: 'Post-football', text: 'I became the President of Liberia in 2018.' },
    ],
    options: ['George Weah', 'Samuel Eto\'o', 'Didier Drogba', 'Michael Essien']
  },
  {
    id: 'shearer', name: 'Alan Shearer', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', nation: 'England', rarity: 'bronze', type: 'player',
    stats: { goals: 423, trophies: 1, era: '1988-2006' },
    bio: 'The Premier League\'s all-time top scorer. A Geordie legend who never won the title.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Gosforth, Newcastle, England in 1970.' },
      { cat: 'Club', text: 'I rejected Manchester United to return home to Newcastle United in 1996 for a world record fee.' },
      { cat: 'Record', text: 'I scored 260 Premier League goals — more than anyone else, ever.' },
      { cat: 'International', text: 'I scored 30 goals for England, captaining my country at Euro 96 on home soil.' },
      { cat: 'Celebration', text: 'My trademark celebration was raising one arm straight in the air.' },
    ],
    options: ['Alan Shearer', 'Michael Owen', 'Andy Cole', 'Les Ferdinand']
  },
  {
    id: 'yashin', name: 'Lev Yashin', emoji: '🇷🇺', nation: 'Soviet Union', rarity: 'bronze', type: 'player',
    stats: { goals: 0, trophies: 13, era: '1950-1970' },
    bio: 'The Black Spider. The only goalkeeper to win the Ballon d\'Or.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Moscow, Russia (then Soviet Union) in 1929.' },
      { cat: 'Club', text: 'I played my entire career for Dynamo Moscow — over 300 games.' },
      { cat: 'Achievement', text: 'I am the only goalkeeper in history to have won the Ballon d\'Or (1963).' },
      { cat: 'Nickname', text: 'I was known as "The Black Spider" because I always wore black and seemed to have eight arms.' },
      { cat: 'Legacy', text: 'The annual award for the best goalkeeper at the World Cup is named "The Lev Yashin Award."' },
    ],
    options: ['Lev Yashin', 'Peter Shilton', 'Gordon Banks', 'Dino Zoff']
  },
  {
    id: 'modric', name: 'Luka Modrić', emoji: '🇭🇷', nation: 'Croatia', rarity: 'bronze', type: 'player',
    stats: { goals: 117, trophies: 24, era: '2002-' },
    bio: 'Broke the Messi/Ronaldo Ballon d\'Or monopoly in 2018. The metronome of Real Madrid.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Zadar, Yugoslavia (now Croatia) in 1985.' },
      { cat: 'Club', text: 'I joined Real Madrid from Tottenham Hotspur in 2012 and became a legend.' },
      { cat: 'Achievement', text: 'I won the Ballon d\'Or in 2018 — the first non-Messi/Ronaldo winner since 2007.' },
      { cat: 'World Cup', text: 'I led Croatia to the 2018 World Cup final and the 2022 third-place play-off.' },
      { cat: 'Style', text: 'I am known for my tireless pressing, vision, and composure on the ball despite my small frame.' },
    ],
    options: ['Luka Modrić', 'Ivan Rakitić', 'Davor Šuker', 'Dejan Lovren']
  },
  {
    id: 'salah', name: 'Mohamed Salah', emoji: '🇪🇬', nation: 'Egypt', rarity: 'bronze', type: 'player',
    stats: { goals: 260, trophies: 10, era: '2010-' },
    bio: 'The Egyptian King. Liverpool\'s greatest ever modern player.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Nagrig, Egypt in 1992.' },
      { cat: 'Club', text: 'I am most associated with Liverpool, where I have been a sensation since 2017.' },
      { cat: 'Record', text: 'I broke the Premier League scoring record with 32 goals in a 38-game season in 2017-18.' },
      { cat: 'Character', text: 'I am known for my charity work in Egypt and my dedication to my faith.' },
      { cat: 'Nickname', text: 'Liverpool fans call me "The Egyptian King."' },
    ],
    options: ['Mohamed Salah', 'Sadio Mané', 'Roberto Firmino', 'Diogo Jota']
  },
  // ── MANAGERS ──
  {
    id: 'ferguson', name: 'Sir Alex Ferguson', emoji: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', nation: 'Scotland', rarity: 'legend', type: 'manager',
    stats: { goals: 13, trophies: 49, era: '1974-2013' },
    bio: 'The greatest manager in football history. 13 Premier League titles with Manchester United.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Govan, Glasgow, Scotland in 1941.' },
      { cat: 'Club', text: 'I managed Aberdeen before taking over Manchester United in 1986.' },
      { cat: 'Achievement', text: 'I won 13 Premier League titles, 5 FA Cups, and 2 Champions Leagues with Manchester United.' },
      { cat: 'Famous moment', text: 'I won the treble in my final Champions League campaign — in 1999 in Barcelona.' },
      { cat: 'Legacy', text: 'A clock at Old Trafford reads "Fergie Time" in tribute to my team\'s habit of late goals.' },
    ],
    options: ['Sir Alex Ferguson', 'Brian Clough', 'Bob Paisley', 'Bill Shankly']
  },
  {
    id: 'mourinho', name: 'José Mourinho', emoji: '🇵🇹', nation: 'Portugal', rarity: 'gold', type: 'manager',
    stats: { goals: 2, trophies: 26, era: '2000-' },
    bio: '"The Special One." Won the Champions League with Porto and Inter. Master of mind games.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Setúbal, Portugal in 1963.' },
      { cat: 'Achievement', text: 'I won the Champions League with FC Porto in 2004 — considered one of the greatest upsets.' },
      { cat: 'Title', text: 'I gave myself the nickname "The Special One" at my very first Chelsea press conference in 2004.' },
      { cat: 'Clubs', text: 'I have managed Porto, Chelsea, Inter Milan, Real Madrid, Man United, Spurs, Roma, and Fenerbahçe.' },
      { cat: 'Style', text: 'I am renowned for ultra-defensive tactics, incredible preparation, and mind games with rivals.' },
    ],
    options: ['José Mourinho', 'Carlo Ancelotti', 'Claudio Ranieri', 'Roberto Mancini']
  },
  {
    id: 'guardiola', name: 'Pep Guardiola', emoji: '🇪🇸', nation: 'Spain', rarity: 'gold', type: 'manager',
    stats: { goals: 11, trophies: 38, era: '2007-' },
    bio: 'The greatest tactical innovator in modern football. Created tiki-taka at Barcelona.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Santpedor, Catalonia, Spain in 1971.' },
      { cat: 'Player', text: 'As a player, I was the central midfielder in Johan Cruyff\'s Barcelona Dream Team.' },
      { cat: 'Achievement', text: 'I won the historic treble with Barcelona in 2009 and repeated it in 2011.' },
      { cat: 'City', text: 'I joined Manchester City in 2016 and won 6 Premier Leagues in 8 seasons.' },
      { cat: 'Style', text: 'I invented the "False 9" position and perfected the art of positional play (juego de posición).' },
    ],
    options: ['Pep Guardiola', 'Mikel Arteta', 'Ernesto Valverde', 'Luis Enrique']
  },
  {
    id: 'klopp', name: 'Jürgen Klopp', emoji: '🇩🇪', nation: 'Germany', rarity: 'silver', type: 'manager',
    stats: { goals: 7, trophies: 12, era: '2001-2024' },
    bio: '"The Normal One." Brought the Gegenpressing revolution. Won everything at Liverpool.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Stuttgart, Germany in 1967.' },
      { cat: 'Early career', text: 'I achieved back-to-back Bundesliga titles with Borussia Dortmund, playing thrilling football.' },
      { cat: 'Achievement', text: 'I won Liverpool\'s first league title in 30 years in 2020 and the Champions League in 2019.' },
      { cat: 'Style', text: 'I am famous for "Gegenpressing" — immediate high-intensity pressing after losing the ball.' },
      { cat: 'Retirement', text: 'I retired from management in 2024, saying I had run out of energy for the job.' },
    ],
    options: ['Jürgen Klopp', 'Thomas Tuchel', 'Julian Nagelsmann', 'Hansi Flick']
  },
  {
    id: 'ancelotti', name: 'Carlo Ancelotti', emoji: '🇮🇹', nation: 'Italy', rarity: 'silver', type: 'manager',
    stats: { goals: 26, trophies: 29, era: '1992-' },
    bio: 'The most decorated manager in Champions League history. Won it four times.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Reggiolo, Italy in 1959.' },
      { cat: 'Player', text: 'As a player, I was a creative midfielder in the great AC Milan teams of the late 1980s.' },
      { cat: 'Achievement', text: 'I have won the Champions League four times — more than any other manager.' },
      { cat: 'Clubs', text: 'I have managed Juventus, AC Milan, Chelsea, PSG, Real Madrid, Bayern Munich, and Everton.' },
      { cat: 'Calm', text: 'I am famous for my calm demeanour and a raised eyebrow that became a viral internet meme.' },
    ],
    options: ['Carlo Ancelotti', 'Fabio Capello', 'Arrigo Sacchi', 'Giovanni Trapattoni']
  },
  {
    id: 'clough', name: 'Brian Clough', emoji: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', nation: 'England', rarity: 'bronze', type: 'manager',
    stats: { goals: 2, trophies: 7, era: '1965-1993' },
    bio: 'The most charismatic manager in British football. Won back-to-back European Cups with Nottingham Forest.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Middlesbrough, England in 1935.' },
      { cat: 'Achievement', text: 'I took Nottingham Forest from the Second Division to back-to-back European Cup wins (1979 & 1980).' },
      { cat: 'Quote', text: 'I famously said: "I wouldn\'t say I was the best manager in the business, but I was in the top one."' },
      { cat: 'Style', text: 'I was known for my outspoken personality, absolute authority over players, and attacking football.' },
      { cat: 'Legacy', text: 'I never managed the England national team, despite many considering me the obvious choice.' },
    ],
    options: ['Brian Clough', 'Ron Greenwood', 'Bobby Robson', 'Don Revie']
  },
  {
    id: 'wenger', name: 'Arsène Wenger', emoji: '🇫🇷', nation: 'France', rarity: 'bronze', type: 'manager',
    stats: { goals: 10, trophies: 17, era: '1984-2019' },
    bio: 'Transformed Arsenal and English football. Created the "Invincibles". The Professor.',
    clues: [
      { cat: 'Nationality', text: 'I was born in Strasbourg, France (then Alsace region) in 1949.' },
      { cat: 'Achievement', text: 'I led Arsenal to an entire Premier League season without losing — the "Invincibles" in 2003-04.' },
      { cat: 'Revolution', text: 'I transformed English football with continental training methods, nutrition, and tactical ideas.' },
      { cat: 'Nickname', text: 'The press called me "The Professor" for my methodical and intellectual approach to football.' },
      { cat: 'Quote', text: 'I became famous for saying "I didn\'t see the incident" about controversial moments.' },
    ],
    options: ['Arsène Wenger', 'George Graham', 'Terry Neill', 'Bruce Rioch']
  },
];

// ════════════════════════════════════════════
// QUIZ DATA
// ════════════════════════════════════════════
const QUESTION_POOLS = {
  prem: {
    name: 'PREMIER LEAGUE', icon: '🦁',
    questions: [
      { q: "Who is the Premier League's all-time top goal scorer?", opts: ["Wayne Rooney", "Thierry Henry", "Alan Shearer", "Sergio Agüero"], ans: 2, diff: 'easy', fact: "Alan Shearer scored 260 goals, mainly for Blackburn Rovers and Newcastle United." },
      { q: "Which player wore the No. 11 shirt for Manchester City in 2025?", opts: ["Kevin De Bruyne", "Jack Grealish", "Phil Foden", "Erling Haaland"], ans: 1, diff: 'easy', fact: "Jack Grealish, famous for his dribbling style and signature shin-pad placement." },
      { q: "Which team is nicknamed \"The Gunners\"?", opts: ["Liverpool", "Manchester City", "Arsenal", "Tottenham Hotspur"], ans: 2, diff: 'medium', fact: "Arsenal were named after the Royal Arsenal armament factory in Woolwich." },
      { q: "Who managed Arsenal's 'Invincibles' in the 2003–04 season?", opts: ["Arsène Wenger", "Unai Emery", "Mikel Arteta", "George Graham"], ans: 0, diff: 'medium', fact: "Arsène Wenger led Arsenal to a 38-game unbeaten league season — a record that still stands." },
      { q: "Which current Premier League club is nicknamed \"The Seagulls\"?", opts: ["West Ham", "Crystal Palace", "Brighton", "Bournemouth"], ans: 2, diff: 'medium', fact: "Brighton & Hove Albion's nickname refers to their seaside location on the south coast." },
      { q: "Which goalkeeper has the most clean sheets in Premier League history?", opts: ["David De Gea", "Petr Čech", "Edwin van der Sar", "Peter Schmeichel"], ans: 1, diff: 'hard', fact: "Petr Čech holds the record with 202 clean sheets across his Premier League career." },
      { q: "Who is the all-time Premier League assist leader?", opts: ["Frank Lampard", "Ryan Giggs", "Cesc Fàbregas", "Kevin De Bruyne"], ans: 1, diff: 'hard', fact: "Ryan Giggs leads with 162 Premier League assists, all for Manchester United." },
      { q: "Who scored the fastest hat-trick in Premier League history (4 minutes 33 seconds)?", opts: ["Michael Owen", "Robbie Fowler", "Sadio Mané", "Harry Kane"], ans: 2, diff: 'hard', fact: "Sadio Mané scored a hat-trick in 4 mins 33 secs for Southampton against Aston Villa in May 2015." },
      { q: "Which club has won the most Premier League titles?", opts: ["Arsenal", "Chelsea", "Liverpool", "Manchester United"], ans: 3, diff: 'easy', fact: "Manchester United have won the Premier League 13 times, more than any other club." },
      { q: "In which year was the Premier League founded?", opts: ["1988", "1990", "1992", "1995"], ans: 2, diff: 'easy', fact: "The Premier League was founded on 20 February 1992." },
      { q: "Which manager has won the most Premier League titles?", opts: ["Pep Guardiola", "Alex Ferguson", "José Mourinho", "Arsène Wenger"], ans: 1, diff: 'medium', fact: "Sir Alex Ferguson won 13 Premier League titles with Manchester United between 1993 and 2013." },
      { q: "Who holds the record for the most Premier League appearances?", opts: ["Ryan Giggs", "Gareth Barry", "James Milner", "Frank Lampard"], ans: 1, diff: 'hard', fact: "Gareth Barry made 653 Premier League appearances across his career — the all-time record." },
      { q: "Which team went an entire Premier League season unbeaten in 2003-04?", opts: ["Chelsea", "Manchester United", "Arsenal", "Liverpool"], ans: 2, diff: 'easy', fact: "Arsenal's 'Invincibles' went 38 games unbeaten, winning 26 and drawing 12." },
      { q: "Who scored the first ever Premier League goal?", opts: ["Teddy Sheringham", "Brian Deane", "Mark Hughes", "Eric Cantona"], ans: 1, diff: 'impossible', fact: "Brian Deane scored for Sheffield United against Manchester United on 15 August 1992." },
      { q: "Who scored the most goals in a single Premier League season?", opts: ["Mohamed Salah", "Alan Shearer", "Erling Haaland", "Cristiano Ronaldo"], ans: 2, diff: 'easy', fact: "Erling Haaland broke the record with 36 Premier League goals in the 2022–23 season." },
    ]
  },
  liga: {
    name: 'LA LIGA', icon: '🌞',
    questions: [
      { q: "Who is La Liga's all-time top goal scorer?", opts: ["Cristiano Ronaldo", "El Stiffano", "Lionel Messi", "Luis Suárez"], ans: 2, diff: 'easy', fact: "Lionel Messi scored 474 La Liga goals across his career at Barcelona." },
      { q: "Which club has won the most La Liga titles?", opts: ["Barcelona", "Atlético Madrid", "Real Madrid", "Valencia"], ans: 2, diff: 'medium', fact: "Real Madrid have won La Liga a record 35 times." },
      { q: "Who is known as 'El Niño' in La Liga?", opts: ["Fernando Torres", "David Villa", "Iker Casillas", "Andrés Iniesta"], ans: 0, diff: 'medium', fact: "Fernando Torres earned the nickname 'The Kid' due to his explosive emergence at Atlético Madrid." },
      { q: "Who scored the fastest hat-trick in La Liga history?", opts: ["David Villa", "Cristiano Ronaldo", "Kevin Gameiro", "Luis Suárez"], ans: 2, diff: 'hard', fact: "Kevin Gameiro scored his hat-trick in just 3 minutes 30 seconds for Sevilla in 2015." },
      { q: "Which goalkeeper has the most clean sheets in La Liga?", opts: ["Iker Casillas", "Jan Oblak", "Victor Valdés", "Thibaut Courtois"], ans: 0, diff: 'hard', fact: "Iker Casillas kept 177 La Liga clean sheets, all for Real Madrid." },
      { q: "Who was the first non-Spanish player to win the Pichichi Trophy?", opts: ["Ferenc Puskás", "Hugo Sánchez", "Samuel Eto'o", "Ronaldo Nazário"], ans: 1, diff: 'impossible', fact: "Mexican striker Hugo Sánchez won the Pichichi five times with Real Madrid in the 1980s." },
      { q: "Which club has never been relegated from La Liga?", opts: ["Barcelona", "Real Madrid", "Athletic Bilbao", "Sevilla"], ans: 2, diff: 'impossible', fact: "Athletic Bilbao have played every season in La Liga since its founding in 1929." },
      { q: "Who is the youngest player to score in El Clásico?", opts: ["Lamine Yamal", "Raúl", "Vinícius Júnior", "Bojan Krkić"], ans: 0, diff: 'impossible', fact: "Lamine Yamal scored for Barcelona against Real Madrid at just 17 years old." },
      { q: "Which player won the Pichichi Trophy the most times?", opts: ["Telmo Zarra", "Ronaldo Nazário", "Lionel Messi", "Cristiano Ronaldo"], ans: 2, diff: 'hard', fact: "Lionel Messi won La Liga's top scorer award (Pichichi) a record 8 times." },
      { q: "Who is known as 'El Buitre' (The Vulture) in La Liga?", opts: ["Emilio Butragueño", "Fernando Hierro", "Raúl", "Michel"], ans: 0, diff: 'medium', fact: "Emilio Butragueño earned the nickname 'El Buitre' for his predatory instincts at Real Madrid." },
      { q: "Which La Liga club is nicknamed 'Los Blancos'?", opts: ["Atlético Madrid", "Sevilla", "Valencia", "Real Madrid"], ans: 3, diff: 'easy', fact: "Real Madrid are known as 'Los Blancos' (The Whites) due to their iconic all-white kit." },
      { q: "Which player scored the most goals in a single La Liga season (50 goals)?", opts: ["Cristiano Ronaldo", "Lionel Messi", "Telmo Zarra", "Hugo Sánchez"], ans: 1, diff: 'hard', fact: "Lionel Messi scored 50 La Liga goals in the 2011–12 season." },
      { q: "What is the name of the stadium where Real Madrid play their home matches?", opts: ["Camp Nou", "Wanda Metropolitano", "Estadio Santiago Bernabéu", "Ramón Sánchez Pizjuán"], ans: 2, diff: 'easy', fact: "The Santiago Bernabéu Stadium in Madrid has been Real Madrid's home since 1947." },
      { q: "In which year was La Liga founded?", opts: ["1925", "1929", "1933", "1936"], ans: 1, diff: 'medium', fact: "La Liga was founded in 1929, with FC Barcelona winning the inaugural title." },
      { q: "Who became the first player to score in 7 consecutive El Clásico matches?", opts: ["Alfredo Di Stéfano", "Raúl", "Cristiano Ronaldo", "Lionel Messi"], ans: 3, diff: 'impossible', fact: "Lionel Messi scored in 7 consecutive El Clásico fixtures." },
    ]
  },
  ucl: {
    name: 'CHAMPIONS LEAGUE', icon: '⭐',
    questions: [
      { q: "Which club has won the most UEFA Champions League/European Cup titles?", opts: ["AC Milan", "Liverpool", "Real Madrid", "Bayern Munich"], ans: 2, diff: 'easy', fact: "Real Madrid have won the Champions League/European Cup a record 15 times." },
      { q: "Who is the all-time top scorer in Champions League history?", opts: ["Lionel Messi", "Robert Lewandowski", "Cristiano Ronaldo", "Karim Benzema"], ans: 2, diff: 'easy', fact: "Cristiano Ronaldo holds the record with 140 Champions League goals." },
      { q: "Which player has the most Champions League assists in history?", opts: ["Cristiano Ronaldo", "Lionel Messi", "Angel Di Maria", "Kevin De Bruyne"], ans: 1, diff: 'medium', fact: "Lionel Messi leads with 42 Champions League assists." },
      { q: "Which goalkeeper holds the record for most clean sheets in UCL history?", opts: ["Iker Casillas", "Gianluigi Buffon", "Petr Čech", "Manuel Neuer"], ans: 0, diff: 'medium', fact: "Iker Casillas kept 57 clean sheets in the Champions League." },
      { q: "Who scored the fastest goal in Champions League history?", opts: ["Roy Makaay", "Paolo Maldini", "Clarence Seedorf", "Alessandro Del Piero"], ans: 0, diff: 'hard', fact: "Roy Makaay scored for Bayern Munich against Real Madrid in just 10.12 seconds in 2007." },
      { q: "Which player has won the most Champions League titles?", opts: ["Francisco Gento", "Cristiano Ronaldo", "Paolo Maldini", "Lionel Messi"], ans: 0, diff: 'hard', fact: "Francisco Gento won 6 European Cups with Real Madrid between 1956 and 1966." },
      { q: "Who is the youngest goalscorer in Champions League history?", opts: ["Ansu Fati", "Peter Ofori-Quaye", "Bojan Krkić", "Youssoufa Moukoko"], ans: 1, diff: 'impossible', fact: "Peter Ofori-Quaye scored for Rosenborg in 1996 at just 17 years and 195 days old." },
      { q: "Who scored the winning goal in the 1999 Champions League final for Manchester United?", opts: ["Andy Cole", "Ole Gunnar Solskjær", "Teddy Sheringham", "Dwight Yorke"], ans: 1, diff: 'medium', fact: "Ole Gunnar Solskjær scored a dramatic injury-time winner to complete United's comeback." },
      { q: "Which club has appeared in the most Champions League finals?", opts: ["AC Milan", "Bayern Munich", "Real Madrid", "Juventus"], ans: 2, diff: 'medium', fact: "Real Madrid have appeared in 17 Champions League/European Cup finals." },
      { q: "Who scored a bicycle kick goal in the 2018 final?", opts: ["Cristiano Ronaldo", "Gareth Bale", "Karim Benzema", "Luka Modrić"], ans: 1, diff: 'medium', fact: "Gareth Bale's stunning overhead kick for Real Madrid against Liverpool in the 2018 UCL final." },
      { q: "Which team achieved the biggest aggregate win in UCL history?", opts: ["Liverpool", "Real Madrid", "Bayern Munich", "Barcelona"], ans: 2, diff: 'impossible', fact: "Bayern Munich beat Sporting CP 12–1 on aggregate in the 2008–09 round of 16." },
      { q: "Which English club won the Champions League despite finishing 5th in their domestic league?", opts: ["Chelsea", "Liverpool", "Manchester United", "Nottingham Forest"], ans: 1, diff: 'impossible', fact: "Liverpool qualified as defending champions in 2004-05 and won it in Istanbul." },
      { q: "What is the Champions League anthem officially titled?", opts: ["The Hymn of Europe", "The UCL Theme", "The Champions", "Zadok the Priest"], ans: 2, diff: 'easy', fact: "The Champions League anthem is officially titled 'The Champions', based on Handel's 'Zadok the Priest'." },
      { q: "Which manager has won the most Champions League titles?", opts: ["Alex Ferguson", "Carlo Ancelotti", "Pep Guardiola", "Zinedine Zidane"], ans: 1, diff: 'impossible', fact: "Carlo Ancelotti has won the Champions League four times: 2003, 2007 (Milan), 2014, 2022 (Real Madrid)." },
      { q: "Which team completed the first treble in men's football?", opts: ["Celtic", "Ajax", "Barcelona", "Manchester United"], ans: 0, diff: 'medium', fact: "Celtic's 1966–67 'Lisbon Lions' won every competition they entered — the first ever treble." },
    ]
  },
  wc: {
    name: 'WORLD CUP', icon: '🌍',
    questions: [
      { q: "Which country has won the most FIFA World Cup titles?", opts: ["Germany", "Italy", "Brazil", "Argentina"], ans: 2, diff: 'easy', fact: "Brazil have won the World Cup five times: 1958, 1962, 1970, 1994, and 2002." },
      { q: "Who is the all-time top scorer in World Cup history?", opts: ["Ronaldo Nazário", "Miroslav Klose", "Gerd Müller", "Pelé"], ans: 1, diff: 'easy', fact: "Miroslav Klose scored 16 World Cup goals across four tournaments for Germany." },
      { q: "Which country hosted and won the very first FIFA World Cup?", opts: ["Brazil", "Uruguay", "Argentina", "Italy"], ans: 1, diff: 'medium', fact: "Uruguay hosted and won the inaugural 1930 World Cup, defeating Argentina 4–2 in the final." },
      { q: "Who holds the record for most goals in a single World Cup tournament?", opts: ["Eusébio", "Just Fontaine", "Gerd Müller", "Sandor Kocsis"], ans: 1, diff: 'medium', fact: "Just Fontaine scored 13 goals for France at the 1958 World Cup — a record standing over 60 years." },
      { q: "Who scored a famous 'Hand of God' goal at the 1986 World Cup?", opts: ["Ronaldo", "Zinedine Zidane", "Diego Maradona", "Pelé"], ans: 2, diff: 'easy', fact: "Diego Maradona controversially punched the ball into England's net in the 1986 quarter-final." },
      { q: "Who holds the record for most goals in a single World Cup match?", opts: ["Gerd Müller", "Oleg Salenko", "Eusébio", "Gary Lineker"], ans: 1, diff: 'hard', fact: "Oleg Salenko scored 5 goals against Cameroon for Russia at the 1994 World Cup." },
      { q: "Who is the youngest player to ever play in a World Cup?", opts: ["Pelé", "Norman Whiteside", "Michael Owen", "Samuel Eto'o"], ans: 1, diff: 'hard', fact: "Norman Whiteside represented Northern Ireland at just 17 years and 41 days in 1982." },
      { q: "Who is the only player to win three World Cup tournaments?", opts: ["Cafu", "Franz Beckenbauer", "Pelé", "Ronaldo"], ans: 2, diff: 'impossible', fact: "Pelé is the only player to win the World Cup three times: 1958, 1962, and 1970 with Brazil." },
      { q: "Which country won the 2022 FIFA World Cup?", opts: ["France", "Brazil", "Argentina", "Croatia"], ans: 2, diff: 'easy', fact: "Argentina won the 2022 World Cup in Qatar, defeating France on penalties after a 3–3 draw." },
      { q: "How many teams participated in the first-ever FIFA World Cup in 1930?", opts: ["13", "16", "24", "32"], ans: 0, diff: 'medium', fact: "Only 13 nations participated in the 1930 World Cup in Uruguay." },
      { q: "Who won the Golden Boot at the 2018 World Cup?", opts: ["Cristiano Ronaldo", "Harry Kane", "Kylian Mbappé", "Romelu Lukaku"], ans: 1, diff: 'medium', fact: "Harry Kane scored 6 goals to win the Golden Boot at the 2018 World Cup in Russia." },
      { q: "In what year did Germany win their fourth World Cup title?", opts: ["2002", "2006", "2010", "2014"], ans: 3, diff: 'easy', fact: "Germany won the 2014 World Cup in Brazil, defeating the host nation 7–1 in the semi-final." },
      { q: "Which goalkeeper has played the most World Cup matches?", opts: ["Gianluigi Buffon", "Dino Zoff", "Sepp Maier", "Essam El-Hadary"], ans: 0, diff: 'hard', fact: "Gianluigi Buffon appeared in 17 World Cup matches across his career with Italy." },
      { q: "What is the record winning margin in a World Cup match?", opts: ["9–0", "10–1", "13–0", "14–0"], ans: 1, diff: 'impossible', fact: "Hungary defeated El Salvador 10–1 in the 1982 World Cup group stage." },
      { q: "Which player appeared in the most World Cup tournaments?", opts: ["Diego Maradona", "Lothar Matthäus", "Paolo Maldini", "Cafu"], ans: 1, diff: 'medium', fact: "Lothar Matthäus appeared in five World Cups between 1982 and 1998." },
    ]
  },
  weekly: {
    name: 'WEEKLY EVENT', icon: '🏆',
    questions: [
      { q: "Who was the first player to score 100 Champions League goals?", opts: ["Lionel Messi", "Raul", "Cristiano Ronaldo", "Karim Benzema"], ans: 1, diff: 'easy', fact: "Raúl González was the first to reach 100 UCL goals, a record later shattered by Ronaldo and Messi." },
      { q: "Which country won the first ever World Cup?", opts: ["Brazil", "Argentina", "Uruguay", "Italy"], ans: 2, diff: 'medium', fact: "Uruguay defeated Argentina 4–2 in the 1930 final on home soil in Montevideo." },
      { q: "Who is the only defender ever to win the FIFA World Player of the Year award?", opts: ["Lionel Messi", "Zinedine Zidane", "Kaká", "Fabio Cannavaro"], ans: 3, diff: 'medium', fact: "Fabio Cannavaro won the 2006 FIFA World Player of the Year award after captaining Italy to World Cup glory." },
      { q: "Who was the first African player to win the Ballon d'Or?", opts: ["George Weah", "Samuel Eto'o", "Didier Drogba", "Yaya Touré"], ans: 0, diff: 'hard', fact: "George Weah won the Ballon d'Or in 1995 with AC Milan — a historic first for African football." },
      { q: "Which player has scored the most goals in El Clásico history?", opts: ["Cristiano Ronaldo", "Alfredo Di Stéfano", "Lionel Messi", "Raúl"], ans: 2, diff: 'hard', fact: "Lionel Messi scored 26 El Clásico goals across his Barcelona career." },
      { q: "Which manager has won the most Champions League titles?", opts: ["Alex Ferguson", "Carlo Ancelotti", "Pep Guardiola", "Zinedine Zidane"], ans: 1, diff: 'impossible', fact: "Carlo Ancelotti has won the Champions League four times: 2003, 2007 (Milan), 2014, 2022 (Real Madrid)." },
      { q: "Which player has won the most trophies in football history?", opts: ["Lionel Messi", "Dani Alves", "Cristiano Ronaldo", "Sergio Ramos"], ans: 1, diff: 'impossible', fact: "Dani Alves won 43 major trophies across his career, the most by any footballer in history." },
      { q: "Who won the Ballon d'Or the most times?", opts: ["Cristiano Ronaldo", "Zinedine Zidane", "Lionel Messi", "Ronaldo Nazário"], ans: 2, diff: 'easy', fact: "Lionel Messi has won the Ballon d'Or a record 8 times, most recently in 2023." },
      { q: "Which nation won the inaugural UEFA European Championship in 1960?", opts: ["West Germany", "Czechoslovakia", "Spain", "Soviet Union"], ans: 3, diff: 'hard', fact: "The Soviet Union won the first UEFA European Championship in 1960, defeating Yugoslavia 2–1 in the final." },
      { q: "Which player has scored the most international goals in men's football history?", opts: ["Cristiano Ronaldo", "Lionel Messi", "Ali Daei", "Ferenc Puskás"], ans: 0, diff: 'medium', fact: "Cristiano Ronaldo holds the record for most international goals, surpassing Ali Daei's record of 109 goals for Iran." },
      { q: "Which club did Kylian Mbappé join after leaving Paris Saint-Germain in 2024?", opts: ["Manchester City", "Arsenal", "Real Madrid", "Bayern Munich"], ans: 2, diff: 'easy', fact: "Kylian Mbappé joined Real Madrid in the summer of 2024 on a free transfer." },
      { q: "Who scored the winning penalty in the 2006 World Cup final shootout for Italy?", opts: ["Alessandro Del Piero", "Fabio Grosso", "Francesco Totti", "Luca Toni"], ans: 1, diff: 'hard', fact: "Fabio Grosso scored the decisive fifth penalty to win the World Cup for Italy against France." },
      { q: "Which team has completed the continental treble the most times?", opts: ["Barcelona", "Bayern Munich", "Manchester United", "Inter Milan"], ans: 0, diff: 'medium', fact: "Barcelona won the treble in 2008–09 and 2014–15 under Pep Guardiola and Luis Enrique." },
      { q: "Who is the youngest player to ever play in a World Cup final?", opts: ["Pelé", "Kylian Mbappé", "Lionel Messi", "Neymar"], ans: 0, diff: 'hard', fact: "Pelé played in the 1958 World Cup final for Brazil at just 17 years old." },
      { q: "What year did football first appear in the Olympic Games?", opts: ["1896", "1900", "1904", "1908"], ans: 1, diff: 'impossible', fact: "Football made its Olympic debut at the 1900 Paris Games. It became a full medal sport from 1908." },
    ]
  }
};

function buildQuizzes() {
  const result = {};
  for (const key in QUESTION_POOLS) {
    const pool = QUESTION_POOLS[key];
    const shuffled = [...pool.questions].sort(() => Math.random() - 0.5);
    result[key] = { name: pool.name, icon: pool.icon, questions: shuffled.slice(0, 10) };
  }
  return result;
}

let QUIZZES = buildQuizzes();

const DIFF_CLASSES = { easy: 'diff-easy', medium: 'diff-medium', hard: 'diff-hard', impossible: 'diff-impossible' };
const DIFF_LABELS = { easy: '⚽ Easy', medium: '🎯 Medium', hard: '🔥 Hard', impossible: '💀 Impossible' };
const DIFF_XP = { easy: 10, medium: 12, hard: 15, impossible: 20 };
const LETTERS = ['A', 'B', 'C', 'D'];
const TOTAL_TIME = 90;

let currentQuiz = null;
let currentQuizKey = null;
let currentQ = 0;
let score = 0;
let correct = 0;
let wrong = 0;
let answered = false;
let timerInterval = null;
let timeLeft = TOTAL_TIME;
let timedOut = false;
let streak = 0;
let sessionXP = 0;
let sessionXPBreakdown = { base: 0, streak: 0, perfect: 0 };

// ── Screen Manager ──
const SCREEN_IDS = {
  home: 'home-screen',
  quiz: 'quiz-screen',
  results: 'results-screen',
  leaderboard: 'leaderboard-screen',
  guess: 'guess-screen',
  guessResults: 'guess-results-screen',
  collectables: 'collectables-screen',
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const el = document.getElementById(SCREEN_IDS[id] || id);
  if (el) el.classList.add('active');
}

// ── Init ──
loadPlayerData();
updateHomeRankDisplay();

function ensureName(callback) {
  if (playerData.name) { callback(); return; }
  document.getElementById('name-modal').classList.add('active');
  const confirmFn = () => {
    const val = document.getElementById('name-input').value.trim();
    if (!val) return;
    playerData.name = val;
    savePlayerData();
    document.getElementById('name-modal').classList.remove('active');
    callback();
  };
  document.getElementById('name-confirm-btn').onclick = confirmFn;
  document.getElementById('name-input').onkeydown = e => { if (e.key === 'Enter') confirmFn(); };
}

// ── Category click ──
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    if (card.dataset.mode === 'guess') {
      ensureName(() => startGuessMode());
      return;
    }
    ensureName(() => {
      currentQuizKey = card.dataset.quiz;
      const quiz = QUIZZES[currentQuizKey];
      document.getElementById('modal-icon').textContent = quiz.icon;
      document.getElementById('modal-cat-name').textContent = quiz.name;
      document.getElementById('modal').classList.add('active');
    });
  });
});

document.getElementById('modal-cancel-btn').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('active');
});
document.getElementById('modal-start-btn').addEventListener('click', () => {
  document.getElementById('modal').classList.remove('active');
  startQuiz();
});

// ── Rank Pill ──
document.getElementById('rank-pill-btn').addEventListener('click', () => {
  document.getElementById('rank-info-xp').textContent = playerData.xp;
  renderRankTiers();
  document.getElementById('rank-info-modal').classList.add('active');
});
document.getElementById('rank-info-close-btn').addEventListener('click', () => {
  document.getElementById('rank-info-modal').classList.remove('active');
});

function renderRankTiers() {
  const list = document.getElementById('rank-tiers-list');
  const currentRank = getRank(playerData.xp);
  list.innerHTML = RANKS.map(r => {
    const isCurrent = r.name === currentRank.name;
    const isUnlocked = playerData.xp >= r.minXP;
    return `<div class="rank-tier-row ${isCurrent ? 'current-rank' : ''}" style="${isUnlocked ? '' : 'opacity:0.4'}">
      <div class="rank-tier-icon">${r.icon}</div>
      <div class="rank-tier-info">
        <div class="rank-tier-name" style="color:${r.color}">${r.name}</div>
        <div class="rank-tier-xp">${r.maxXP === Infinity ? r.minXP + '+ XP' : r.minXP + ' – ' + r.maxXP + ' XP'}</div>
      </div>
      ${isCurrent ? '<span class="rank-tier-badge">CURRENT</span>' : ''}
    </div>`;
  }).join('');
}

// ── Leaderboard ──
document.getElementById('leaderboard-open-btn').addEventListener('click', () => { renderLeaderboard(); showScreen('leaderboard'); });
document.getElementById('leaderboard-back-btn').addEventListener('click', () => { showScreen('home'); });

function renderLeaderboard() {
  const lb = getLeaderboard();
  const table = document.getElementById('leaderboard-table');
  if (lb.length === 0) {
    table.innerHTML = '<div class="lb-empty">No players yet. Be the first to set a score!</div>';
    return;
  }
  const medals = ['🥇', '🥈', '🥉'];
  table.innerHTML = lb.map((p, i) => {
    const rank = getRank(p.xp);
    const isPlayer = p.name === playerData.name;
    return `<div class="lb-row ${isPlayer ? 'is-player' : ''} ${i < 3 ? 'top-' + (i + 1) : ''}">
      <div class="lb-rank-num">${i < 3 ? medals[i] : '#' + (i + 1)}</div>
      <div class="lb-rank-icon">${rank.icon}</div>
      <div class="lb-info">
        <div class="lb-name">${p.name}${isPlayer ? ' (You)' : ''}</div>
        <div class="lb-sub">${rank.name} · ${p.gamesPlayed} games · Best: ${p.bestScore}/10</div>
      </div>
      <div class="lb-xp" style="color:${rank.color}">${p.xp} XP</div>
    </div>`;
  }).join('');
}

// ── Quiz Back ──
document.getElementById('quiz-back-btn').addEventListener('click', () => {
  clearInterval(timerInterval);
  document.getElementById('timeout-overlay').classList.remove('active');
  showScreen('home');
  reset();
});

// ── Start Quiz ──
function startQuiz() {
  reset();
  const pool = QUESTION_POOLS[currentQuizKey];
  const picked = [...pool.questions].sort(() => Math.random() - 0.5).slice(0, 10);
  currentQuiz = { name: pool.name, icon: pool.icon, questions: picked };
  document.getElementById('quiz-cat-label').textContent = currentQuiz.name;
  showScreen('quiz');
  renderQuestion();
  startTimer();
}

function reset() {
  currentQ = 0; score = 0; correct = 0; wrong = 0;
  streak = 0; sessionXP = 0;
  sessionXPBreakdown = { base: 0, streak: 0, perfect: 0 };
  answered = false; timedOut = false; timeLeft = TOTAL_TIME;
  clearInterval(timerInterval);
  document.getElementById('score-display').textContent = '0';
  document.getElementById('progress-bar').style.width = '0%';
  document.getElementById('timer-bar').style.width = '100%';
  document.getElementById('timer-bar').className = 'timer-bar-fill';
  document.getElementById('timer-count').textContent = TOTAL_TIME;
  document.getElementById('timer-count').style.color = '';
  document.getElementById('timer-count').style.animation = '';
  document.getElementById('feedback-box').className = 'feedback-box';
  document.getElementById('next-wrap').className = 'next-btn-wrap';
  document.getElementById('next-btn').textContent = 'Next →';
  document.getElementById('streak-badge').className = 'streak-badge';
  document.getElementById('streak-count').textContent = '0';
}

function renderQuestion(animate = false) {
  const q = currentQuiz.questions[currentQ];
  answered = false;
  if (animate) {
    const body = document.getElementById('quiz-body');
    body.classList.add('slide-out');
    setTimeout(() => {
      body.classList.remove('slide-out');
      body.classList.add('slide-in');
      _fillQuestion(q);
      setTimeout(() => body.classList.remove('slide-in'), 300);
    }, 200);
  } else { _fillQuestion(q); }
}

function _fillQuestion(q) {
  document.getElementById('quiz-progress-text').textContent = `Question ${currentQ + 1} of ${currentQuiz.questions.length}`;
  document.getElementById('progress-bar').style.width = `${(currentQ / currentQuiz.questions.length) * 100}%`;
  document.getElementById('diff-tag').className = 'difficulty-tag ' + DIFF_CLASSES[q.diff];
  document.getElementById('diff-tag').textContent = DIFF_LABELS[q.diff];
  document.getElementById('question-text').textContent = q.q;
  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => selectAnswer(i, q));
    grid.appendChild(btn);
  });
  document.getElementById('feedback-box').className = 'feedback-box';
  document.getElementById('next-wrap').className = 'next-btn-wrap';
  document.getElementById('next-btn').textContent = 'Next →';
  document.getElementById('xp-earned-display').innerHTML = '';
}

function selectAnswer(idx, q) {
  if (answered) return;
  answered = true;
  const btns = document.getElementById('options-grid').querySelectorAll('.option-btn');
  btns.forEach(b => b.disabled = true);
  const isCorrect = idx === q.ans;
  btns[idx].classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) btns[q.ans].classList.add('correct');

  const feedbackBox = document.getElementById('feedback-box');
  const feedbackLabel = document.getElementById('feedback-label');
  const xpDisplay = document.getElementById('xp-earned-display');

  if (isCorrect) {
    score++; correct++; streak++;
    document.getElementById('score-display').textContent = score;
    const baseXP = DIFF_XP[q.diff] || 10;
    const streakBonus = streak >= 3 ? Math.min(streak * 2, 15) : 0;
    const thisXP = baseXP + streakBonus;
    sessionXP += thisXP;
    sessionXPBreakdown.base += baseXP;
    sessionXPBreakdown.streak += streakBonus;
    feedbackBox.className = 'feedback-box show feedback-correct';
    feedbackLabel.textContent = '✅ Correct!';
    xpDisplay.innerHTML = `<div class="xp-earned-popup">+${thisXP} XP${streakBonus > 0 ? ' (🔥 streak bonus!)' : ''}</div>`;
    floatXP('+' + thisXP + ' XP', btns[idx]);
    if (streak >= 2) {
      document.getElementById('streak-badge').className = 'streak-badge active';
      document.getElementById('streak-count').textContent = streak;
    }
  } else {
    wrong++; streak = 0;
    document.getElementById('streak-badge').className = 'streak-badge';
    feedbackBox.className = 'feedback-box show feedback-wrong';
    feedbackLabel.textContent = '❌ Wrong!';
    xpDisplay.innerHTML = '';
  }
  document.getElementById('feedback-text').textContent = q.fact;
  const nextWrap = document.getElementById('next-wrap');
  const nextBtn = document.getElementById('next-btn');
  if (currentQ < currentQuiz.questions.length - 1) {
    nextWrap.className = 'next-btn-wrap show';
  } else {
    nextBtn.textContent = 'See Results 🏆';
    nextWrap.className = 'next-btn-wrap show';
  }
}

function floatXP(text, anchorEl) {
  const el = document.createElement('div');
  el.className = 'xp-float';
  el.textContent = text;
  const rect = anchorEl.getBoundingClientRect();
  el.style.left = (rect.left + rect.width / 2 - 30) + 'px';
  el.style.top = (rect.top - 10) + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1300);
}

document.getElementById('next-btn').addEventListener('click', () => {
  currentQ++;
  if (currentQ >= currentQuiz.questions.length) finishQuiz();
  else renderQuestion(true);
});

function startTimer() {
  document.getElementById('timer-bar').style.width = '100%';
  document.getElementById('timer-count').textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer-count').textContent = timeLeft;
    const pct = (timeLeft / TOTAL_TIME) * 100;
    document.getElementById('timer-bar').style.width = pct + '%';
    if (timeLeft <= 20) document.getElementById('timer-bar').classList.add('warn');
    if (timeLeft <= 10) {
      document.getElementById('timer-bar').classList.remove('warn');
      document.getElementById('timer-bar').classList.add('danger');
      document.getElementById('timer-count').style.color = '#e53935';
      document.getElementById('timer-count').style.animation = 'pulse 1s infinite';
    }
    if (timeLeft <= 0) { clearInterval(timerInterval); onTimeout(); }
  }, 1000);
}

function onTimeout() {
  timedOut = true;
  document.getElementById('timeout-overlay').classList.add('active');
}

document.getElementById('timeout-results-btn').addEventListener('click', () => {
  document.getElementById('timeout-overlay').classList.remove('active');
  finishQuiz();
});

function finishQuiz() {
  clearInterval(timerInterval);
  document.getElementById('timeout-overlay').classList.remove('active');
  if (score === 10) { sessionXP += 20; sessionXPBreakdown.perfect = 20; }
  const totalAnswered = correct + wrong;
  const pct = totalAnswered > 0 ? Math.round((correct / currentQuiz.questions.length) * 100) : 0;
  document.getElementById('results-score-num').textContent = score;
  document.getElementById('stat-correct').textContent = correct;
  document.getElementById('stat-wrong').textContent = wrong;
  document.getElementById('stat-pct').textContent = pct + '%';
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 10) * circumference;
  const ring = document.getElementById('ring-fill');
  ring.style.strokeDashoffset = offset;
  let grade, quote, attr, ringClass;
  if (score >= 9) { grade = '⚡ Legendary'; quote = '"You know this game better than most coaches. I would sign you tomorrow."'; attr = '— Pep Guardiola'; ringClass = ''; }
  else if (score >= 7) { grade = '🔥 World Class'; quote = '"You did incredible. Like Messi in 2011."'; attr = '— Pep Guardiola'; ringClass = ''; }
  else if (score >= 5) { grade = '🎯 Solid Display'; quote = '"Decent. Not special… yet."'; attr = '— Jose Mourinho'; ringClass = 'mid'; }
  else if (score >= 3) { grade = '😬 Room to Grow'; quote = '"This is not football. This is comedy."'; attr = '— Jose Mourinho'; ringClass = 'fail'; }
  else { grade = '💀 Did You Even Watch?'; quote = '"I have seen better decisions made by a goalpost."'; attr = '— Jose Mourinho'; ringClass = 'fail'; }
  ring.className = 'ring-fill' + (ringClass ? ' ' + ringClass : '');
  document.getElementById('results-grade').textContent = grade;
  document.getElementById('results-quote').textContent = quote;
  document.getElementById('results-attr').textContent = attr;
  const oldRank = getRank(playerData.xp);
  playerData.xp += sessionXP;
  playerData.gamesPlayed += 1;
  if (score > playerData.bestScore) playerData.bestScore = score;
  const newRank = getRank(playerData.xp);
  savePlayerData();
  saveToLeaderboard();
  updateHomeRankDisplay();
  document.getElementById('results-xp-gained').textContent = '+' + sessionXP;
  let breakdownParts = [];
  if (sessionXPBreakdown.base > 0) breakdownParts.push(correct + ' correct × base XP');
  if (sessionXPBreakdown.streak > 0) breakdownParts.push('+' + sessionXPBreakdown.streak + ' streak');
  if (sessionXPBreakdown.perfect > 0) breakdownParts.push('+20 perfect score!');
  document.getElementById('results-xp-breakdown').textContent = breakdownParts.join(' · ') || '0 correct';
  document.getElementById('results-rank-icon').textContent = newRank.icon;
  document.getElementById('results-rank-name').textContent = newRank.name;
  document.getElementById('results-rank-name').style.color = newRank.color;
  const progress = getRankProgress(playerData.xp);
  const rankBar = document.getElementById('results-rank-bar');
  rankBar.style.background = newRank.color;
  rankBar.style.width = '0%';
  setTimeout(() => { rankBar.style.width = progress.pct + '%'; }, 500);
  document.getElementById('results-rank-progress-label').textContent =
    newRank.maxXP === Infinity ? 'MAX RANK' : progress.current + ' / ' + (newRank.maxXP - newRank.minXP + 1) + ' XP to next rank';
  document.getElementById('stat-total-xp').textContent = playerData.xp;
  const rankUpBanner = document.getElementById('rank-up-banner');
  if (newRank.name !== oldRank.name) {
    document.getElementById('rank-up-name').textContent = newRank.name;
    rankUpBanner.classList.add('show');
  } else { rankUpBanner.classList.remove('show'); }
  setTimeout(() => showScreen('results'), 100);
}

document.getElementById('retry-btn').addEventListener('click', () => { startQuiz(); });
document.getElementById('home-btn').addEventListener('click', () => { showScreen('home'); reset(); });

// ═══════════════════════════════════════════
// GUESS THE FOOTBALLER MODE
// ═══════════════════════════════════════════
let guessGameFootballers = [];
let currentGuessIdx = 0;
let currentClueIdx = 0;
let guessScore = 0;
let guessXP = 0;
let newlyUnlockedCards = [];
const GUESS_ROUND_SIZE = 5;

function startGuessMode() {
  newlyUnlockedCards = [];
  guessScore = 0;
  guessXP = 0;
  currentGuessIdx = 0;
  // Pick 5 random footballers
  guessGameFootballers = [...FOOTBALLER_CARDS].sort(() => Math.random() - 0.5).slice(0, GUESS_ROUND_SIZE);
  showScreen('guess');
  renderGuessQuestion();
}

function renderGuessQuestion() {
  const footballer = guessGameFootballers[currentGuessIdx];
  currentClueIdx = 0;

  document.getElementById('guess-progress-text').textContent = `Footballer ${currentGuessIdx + 1} of ${GUESS_ROUND_SIZE}`;
  document.getElementById('guess-score-display').textContent = guessScore;

  // Clue cards
  const clueWrap = document.getElementById('clue-cards-wrap');
  clueWrap.innerHTML = '';

  // Only show first clue
  renderClueCards(footballer, 0);

  // Points
  updatePointsBadge(footballer.clues.length);

  // Options (shuffled)
  const optGrid = document.getElementById('guess-options');
  optGrid.innerHTML = '';
  footballer.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'guess-option-btn';
    btn.textContent = opt;
    btn.addEventListener('click', () => handleGuessAnswer(opt, footballer));
    optGrid.appendChild(btn);
  });

  // Hide feedback & next
  document.getElementById('guess-feedback').style.display = 'none';
  document.getElementById('guess-next-wrap').style.display = 'none';

  // Reveal clue button
  const revealBtn = document.getElementById('reveal-clue-btn');
  revealBtn.disabled = false;
  revealBtn.onclick = () => revealNextClue(footballer);
  updateRevealButton(footballer);

  document.getElementById('clue-counter').textContent = `Clue 1 of ${footballer.clues.length}`;
}

function renderClueCards(footballer, upToIdx) {
  const clueWrap = document.getElementById('clue-cards-wrap');
  clueWrap.innerHTML = '';
  for (let i = 0; i <= upToIdx; i++) {
    const clue = footballer.clues[i];
    const card = document.createElement('div');
    card.className = 'clue-card';
    card.style.animationDelay = (i === upToIdx ? '0s' : '0s');
    if (i === upToIdx) card.style.animation = 'clueReveal 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards';
    card.innerHTML = `
      <div class="clue-number">${i + 1}</div>
      <div>
        <div class="clue-category">${clue.cat}</div>
        <div class="clue-text">${clue.text}</div>
      </div>`;
    clueWrap.appendChild(card);
  }
}

function revealNextClue(footballer) {
  if (currentClueIdx >= footballer.clues.length - 1) return;
  currentClueIdx++;
  renderClueCards(footballer, currentClueIdx);
  document.getElementById('clue-counter').textContent = `Clue ${currentClueIdx + 1} of ${footballer.clues.length}`;
  updatePointsBadge(footballer.clues.length - currentClueIdx);
  updateRevealButton(footballer);
}

function updateRevealButton(footballer) {
  const btn = document.getElementById('reveal-clue-btn');
  if (currentClueIdx >= footballer.clues.length - 1) {
    btn.disabled = true;
    btn.textContent = '👁 All Clues Revealed';
  } else {
    btn.disabled = false;
    btn.textContent = `👁 Reveal Clue ${currentClueIdx + 2} (-1 pt)`;
  }
}

function updatePointsBadge(remaining) {
  document.getElementById('clue-points-badge').textContent = `🌟 ${remaining} Point${remaining !== 1 ? 's' : ''} Available`;
}

function handleGuessAnswer(chosen, footballer) {
  // Disable all option buttons
  document.querySelectorAll('.guess-option-btn').forEach(b => {
    b.disabled = true;
    if (b.textContent === footballer.name) b.classList.add('correct');
    else if (b.textContent === chosen && chosen !== footballer.name) b.classList.add('wrong');
  });

  const isCorrect = chosen === footballer.name;
  const pointsEarned = isCorrect ? Math.max(1, footballer.clues.length - currentClueIdx) : 0;
  const xpEarned = isCorrect ? pointsEarned * 8 : 0;

  if (isCorrect) {
    guessScore += pointsEarned;
    guessXP += xpEarned;
    // Unlock card
    if (!playerData.unlockedCards.includes(footballer.id)) {
      playerData.unlockedCards.push(footballer.id);
      newlyUnlockedCards.push(footballer.id);
    }
  }
  document.getElementById('guess-score-display').textContent = guessScore;

  // Show feedback
  const feedback = document.getElementById('guess-feedback');
  feedback.style.display = 'block';
  document.getElementById('guess-feedback-icon').textContent = isCorrect ? '✅' : '❌';
  document.getElementById('guess-feedback-name').textContent = isCorrect
    ? `${footballer.name}!`
    : `It was ${footballer.name}`;
  document.getElementById('guess-feedback-detail').textContent = isCorrect
    ? `+${pointsEarned} points · +${xpEarned} XP${newlyUnlockedCards.includes(footballer.id) && !playerData.unlockedCards.includes(footballer.id + '_shown') ? ' · 🃏 Card Unlocked!' : ''}`
    : footballer.bio;

  // Show mini card
  const cardReveal = document.getElementById('guess-card-reveal');
  cardReveal.innerHTML = '';
  cardReveal.appendChild(buildCard(footballer, true));

  // Next button
  const nextWrap = document.getElementById('guess-next-wrap');
  const nextBtn = document.getElementById('guess-next-btn');
  nextWrap.style.display = 'flex';
  nextWrap.className = 'next-btn-wrap show';
  if (currentGuessIdx >= GUESS_ROUND_SIZE - 1) {
    nextBtn.textContent = 'See Results 🏆';
  } else {
    nextBtn.textContent = 'Next Footballer →';
  }
  // Disable reveal btn
  document.getElementById('reveal-clue-btn').disabled = true;
}

document.getElementById('guess-next-btn').addEventListener('click', () => {
  currentGuessIdx++;
  if (currentGuessIdx >= GUESS_ROUND_SIZE) {
    finishGuessMode();
  } else {
    renderGuessQuestion();
  }
});

document.getElementById('guess-back-btn').addEventListener('click', () => {
  showScreen('home');
});

function finishGuessMode() {
  // Award XP
  const oldRank = getRank(playerData.xp);
  playerData.xp += guessXP;
  playerData.gamesPlayed += 1;
  savePlayerData();
  saveToLeaderboard();
  updateHomeRankDisplay();
  const newRank = getRank(playerData.xp);

  const maxScore = GUESS_ROUND_SIZE * 5;
  const pct = guessScore / maxScore;
  let grade;
  if (pct >= 0.9) grade = '🕵️ World-Class Detective';
  else if (pct >= 0.7) grade = '🔍 Senior Scout';
  else if (pct >= 0.5) grade = '📋 Football Analyst';
  else if (pct >= 0.3) grade = '🤔 Football Casual';
  else grade = '😅 Start Watching More Football';

  document.getElementById('guess-results-big-score').textContent = guessScore;
  document.getElementById('guess-results-grade').textContent = `Detective Level: ${grade.split(' ').slice(1).join(' ')} ${grade.split(' ')[0]}`;
  document.getElementById('guess-results-xp').textContent = '+' + guessXP;
  document.getElementById('guess-results-rank-icon').textContent = newRank.icon;
  document.getElementById('guess-results-rank-name').textContent = newRank.name;
  document.getElementById('guess-results-rank-name').style.color = newRank.color;

  const rankUpBanner = document.getElementById('guess-rank-up-banner');
  if (newRank.name !== oldRank.name) {
    document.getElementById('guess-rank-up-name').textContent = newRank.name;
    rankUpBanner.classList.add('show');
  } else { rankUpBanner.classList.remove('show'); }

  // Show unlocked cards
  const unlockedGrid = document.getElementById('unlocked-cards-grid');
  unlockedGrid.innerHTML = '';
  if (newlyUnlockedCards.length === 0) {
    unlockedGrid.innerHTML = '<p style="color:var(--grey);font-size:13px;">No new cards this round — try more footballers!</p>';
  } else {
    newlyUnlockedCards.forEach(id => {
      const footballer = FOOTBALLER_CARDS.find(f => f.id === id);
      if (footballer) unlockedGrid.appendChild(buildCard(footballer, true));
    });
  }

  showScreen('guessResults');
}

document.getElementById('guess-retry-btn').addEventListener('click', () => { startGuessMode(); });
document.getElementById('guess-home-btn').addEventListener('click', () => { showScreen('home'); });
document.getElementById('guess-collection-btn').addEventListener('click', () => { renderCollection(); showScreen('collectables'); });

// ═══════════════════════════════════════════
// COLLECTABLES SYSTEM
// ═══════════════════════════════════════════
let currentFilter = 'all';

document.getElementById('collectables-open-btn').addEventListener('click', () => {
  renderCollection();
  showScreen('collectables');
});
document.getElementById('collectables-back-btn').addEventListener('click', () => { showScreen('home'); });

document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentFilter = btn.dataset.rarity;
    renderCollection();
  });
});

function renderCollection() {
  const grid = document.getElementById('collection-grid');
  grid.innerHTML = '';
  const unlocked = playerData.unlockedCards || [];
  const total = FOOTBALLER_CARDS.length;
  const unlockedCount = FOOTBALLER_CARDS.filter(f => unlocked.includes(f.id)).length;
  document.getElementById('collection-count-label').textContent = `${unlockedCount} / ${total} Collected`;

  let filtered = FOOTBALLER_CARDS;
  if (currentFilter !== 'all') filtered = FOOTBALLER_CARDS.filter(f => f.rarity === currentFilter);

  filtered.forEach(footballer => {
    const isUnlocked = unlocked.includes(footballer.id);
    const card = buildCard(footballer, isUnlocked);
    card.addEventListener('click', () => openCardDetail(footballer, isUnlocked));
    grid.appendChild(card);
  });
}

function buildCard(footballer, isUnlocked) {
  const wrapper = document.createElement('div');
  wrapper.className = `footballer-card card-rarity-${footballer.rarity}`;

  const rarityLabels = { bronze: 'Bronze', silver: 'Silver', gold: 'Gold', legend: 'Legend' };
  const typeIcon = footballer.type === 'manager' ? '🎩' : '⚽';

  let statsHtml = '';
  const statKeys = Object.keys(footballer.stats);
  statKeys.slice(0, 3).forEach(key => {
    const val = footballer.stats[key];
    const lbl = key === 'goals' ? 'Goals' : key === 'trophies' ? 'Trophies' : key;
    statsHtml += `<div class="card-stat"><div class="card-stat-val" style="color:${getRarityColor(footballer.rarity)}">${val}</div><div class="card-stat-lbl">${lbl}</div></div>`;
  });

  wrapper.innerHTML = `
    <div class="card-inner">
      <div class="card-emoji-area">
        <span style="font-size:44px;">${footballer.emoji}</span>
        <span class="card-rarity-tag">${rarityLabels[footballer.rarity]}</span>
      </div>
      <div class="card-info">
        <div class="card-name">${footballer.name}</div>
        <div class="card-nation">${typeIcon} ${footballer.nation}</div>
        <div class="card-stat-row">${statsHtml}</div>
      </div>
      ${!isUnlocked ? `
        <div class="card-locked-overlay">
          <div class="lock-icon">🔒</div>
          <div class="lock-label">Play Guess Mode</div>
        </div>` : ''}
    </div>`;
  return wrapper;
}

function getRarityColor(rarity) {
  const map = { bronze: '#cd7f32', silver: '#c0c0c0', gold: '#ffd600', legend: '#ff6b6b' };
  return map[rarity] || '#fff';
}

function openCardDetail(footballer, isUnlocked) {
  const modal = document.getElementById('card-detail-modal');
  const box = document.getElementById('card-detail-box');
  const rarityColor = getRarityColor(footballer.rarity);
  const rarityLabels = { bronze: 'Bronze', silver: 'Silver', gold: 'Gold', legend: 'Legend' };

  if (!isUnlocked) {
    box.innerHTML = `
      <button class="card-detail-close" id="card-detail-close">✕</button>
      <div class="card-detail-emoji">🔒</div>
      <div class="card-detail-name" style="color:${rarityColor}">${rarityLabels[footballer.rarity]} Card</div>
      <p class="card-detail-locked-msg">Play <strong>Guess The Footballer</strong> mode to unlock <strong>${footballer.name}</strong>!</p>
      <button class="btn-primary" id="card-go-guess-btn" style="margin-top:8px;">Play Guess Mode 🕵️</button>`;
    modal.classList.add('active');
    document.getElementById('card-detail-close').onclick = () => modal.classList.remove('active');
    document.getElementById('card-go-guess-btn').onclick = () => {
      modal.classList.remove('active');
      startGuessMode();
    };
    return;
  }

  const statKeys = Object.keys(footballer.stats);
  const statsHtml = statKeys.map(key => {
    const val = footballer.stats[key];
    const lbl = key === 'goals' ? 'Goals' : key === 'trophies' ? 'Trophies' : key;
    return `<div class="card-detail-stat"><div class="card-detail-stat-val" style="color:${rarityColor}">${val}</div><div class="card-detail-stat-lbl">${lbl}</div></div>`;
  }).join('');

  box.innerHTML = `
    <button class="card-detail-close" id="card-detail-close">✕</button>
    <div class="card-detail-emoji">${footballer.emoji}</div>
    <div class="card-detail-name">${footballer.name}</div>
    <div class="card-detail-sub" style="color:${rarityColor}">${rarityLabels[footballer.rarity].toUpperCase()} · ${footballer.nation} · ${footballer.type === 'manager' ? 'Manager 🎩' : 'Player ⚽'}</div>
    <div class="card-detail-stats">${statsHtml}</div>
    <p class="card-detail-bio">${footballer.bio}</p>`;
  modal.classList.add('active');
  document.getElementById('card-detail-close').onclick = () => modal.classList.remove('active');
}

// Close modal on overlay click
document.getElementById('card-detail-modal').addEventListener('click', function (e) {
  if (e.target === this) this.classList.remove('active');
});       
