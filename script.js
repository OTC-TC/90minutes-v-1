// ════════════════════════════════════════════
// RANK SYSTEM
// ════════════════════════════════════════════
const RANKS = [
  { name: 'Bronze',   icon: '🥉', color: '#cd7f32', minXP: 0,    maxXP: 99  },
  { name: 'Silver',   icon: '🥈', color: '#b0b7c3', minXP: 100,  maxXP: 299 },
  { name: 'Gold',     icon: '🥇', color: '#ffd600', minXP: 300,  maxXP: 599 },
  { name: 'Platinum', icon: '💎', color: '#a8d8ea', minXP: 600,  maxXP: 999 },
  { name: 'Diamond',  icon: '💠', color: '#b9f2ff', minXP: 1000, maxXP: 1999},
  { name: 'Legend',   icon: '👑', color: '#ff6b6b', minXP: 2000, maxXP: Infinity }
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
// PLAYER DATA (localStorage fallback)
// ════════════════════════════════════════════
let playerData = {
  name: '',
  xp: 0,
  gamesPlayed: 0,
  bestScore: 0
};

function loadPlayerData() {
  try {
    const saved = localStorage.getItem('90min_player');
    if (saved) playerData = JSON.parse(saved);
  } catch(e) {}
}

function savePlayerData() {
  try {
    localStorage.setItem('90min_player', JSON.stringify(playerData));
  } catch(e) {}
}

function saveToLeaderboard() {
  try {
    const lb = JSON.parse(localStorage.getItem('90min_leaderboard') || '[]');
    const idx = lb.findIndex(p => p.name === playerData.name);
    const entry = { name: playerData.name, xp: playerData.xp, gamesPlayed: playerData.gamesPlayed, bestScore: playerData.bestScore };
    if (idx >= 0) lb[idx] = entry;
    else lb.push(entry);
    lb.sort((a, b) => b.xp - a.xp);
    localStorage.setItem('90min_leaderboard', JSON.stringify(lb.slice(0, 20)));
  } catch(e) {}
}

function getLeaderboard() {
  try {
    return JSON.parse(localStorage.getItem('90min_leaderboard') || '[]');
  } catch(e) { return []; }
}

function updateHomeRankDisplay() {
  document.getElementById('home-rank-icon').textContent = getRank(playerData.xp).icon;
  document.getElementById('home-rank-name').textContent = getRank(playerData.xp).name;
  document.getElementById('home-rank-xp').textContent = playerData.xp + ' XP';
}

// ════════════════════════════════════════════
// QUIZ DATA
// ════════════════════════════════════════════
const QUESTION_POOLS = {
  prem: {
    name: 'PREMIER LEAGUE', icon: '🦁',
    questions: [
      // Original 10
      { q: "Who is the Premier League's all-time top goal scorer?", opts: ["Wayne Rooney","Thierry Henry","Alan Shearer","Sergio Agüero"], ans: 2, diff: 'easy', fact: "Alan Shearer scored 260 goals, mainly for Blackburn Rovers and Newcastle United." },
      { q: "Which player wore the No. 11 shirt for Manchester City in 2025?", opts: ["Kevin De Bruyne","Jack Grealish","Phil Foden","Erling Haaland"], ans: 1, diff: 'easy', fact: "Jack Grealish, famous for his dribbling style and signature shin-pad placement." },
      { q: "Which team is nicknamed \"The Gunners\"?", opts: ["Liverpool","Manchester City","Arsenal","Tottenham Hotspur"], ans: 2, diff: 'medium', fact: "Arsenal were named after the Royal Arsenal armament factory in Woolwich." },
      { q: "Who managed Arsenal's 'Invincibles' in the 2003–04 season?", opts: ["Arsène Wenger","Unai Emery","Mikel Arteta","George Graham"], ans: 0, diff: 'medium', fact: "Arsène Wenger led Arsenal to a 38-game unbeaten league season — a record that still stands." },
      { q: "Which current Premier League club is nicknamed \"The Seagulls\"?", opts: ["West Ham","Crystal Palace","Brighton","Bournemouth"], ans: 2, diff: 'medium', fact: "Brighton & Hove Albion's nickname refers to their seaside location on the south coast." },
      { q: "Which goalkeeper has the most clean sheets in Premier League history?", opts: ["David De Gea","Petr Čech","Edwin van der Sar","Peter Schmeichel"], ans: 1, diff: 'hard', fact: "Petr Čech holds the record with 202 clean sheets across his Premier League career." },
      { q: "Which player scored a Premier League goal for seven different clubs?", opts: ["Darren Bent","Nicolas Anelka","Andy Cole","Craig Bellamy"], ans: 3, diff: 'hard', fact: "Craig Bellamy scored for Coventry, Newcastle, Blackburn, Liverpool, West Ham, Man City, and Cardiff." },
      { q: "Who is the all-time Premier League assist leader?", opts: ["Frank Lampard","Ryan Giggs","Cesc Fàbregas","Kevin De Bruyne"], ans: 1, diff: 'hard', fact: "Ryan Giggs leads with 162 Premier League assists, all for Manchester United." },
      { q: "Which player scored the first-ever perfect hat-trick (left, right, header) in PL history?", opts: ["Ian Wright","Jimmy Floyd Hasselbaink","Matt Le Tissier","Mark Robins"], ans: 2, diff: 'impossible', fact: "Matt Le Tissier achieved the feat early in the Premier League era during his time at Southampton." },
      { q: "Who is the only player to score, assist, and receive a red card in the same Premier League match?", opts: ["Aleksandar Mitrović","Steven Gerrard","Gareth Bale","Luis Suárez"], ans: 0, diff: 'impossible', fact: "Mitrović achieved the rare trifecta while playing for Fulham — goal, assist, then red card." },
      // 8 New
      { q: "Who scored the fastest hat-trick in Premier League history (4 minutes 33 seconds)?", opts: ["Michael Owen","Robbie Fowler","Sadio Mané","Harry Kane"], ans: 2, diff: 'hard', fact: "Sadio Mané scored a hat-trick in 4 mins 33 secs for Southampton against Aston Villa in May 2015." },
      { q: "Which club has won the most Premier League titles?", opts: ["Arsenal","Chelsea","Liverpool","Manchester United"], ans: 3, diff: 'easy', fact: "Manchester United have won the Premier League 13 times, more than any other club." },
      { q: "Who became the first player to score 200 Premier League goals?", opts: ["Wayne Rooney","Andrew Cole","Frank Lampard","Alan Shearer"], ans: 3, diff: 'medium', fact: "Alan Shearer was the first and still the only player to reach 200 Premier League goals, finishing on 260." },
      { q: "In which year was the Premier League founded?", opts: ["1988","1990","1992","1995"], ans: 2, diff: 'easy', fact: "The Premier League was founded on 20 February 1992, replacing the old First Division as the top tier of English football." },
      { q: "Which manager has won the most Premier League titles?", opts: ["Pep Guardiola","Alex Ferguson","José Mourinho","Arsène Wenger"], ans: 1, diff: 'medium', fact: "Sir Alex Ferguson won 13 Premier League titles with Manchester United between 1993 and 2013." },
      { q: "Who holds the record for the most Premier League appearances?", opts: ["Ryan Giggs","Gareth Barry","James Milner","Frank Lampard"], ans: 1, diff: 'hard', fact: "Gareth Barry made 653 Premier League appearances across his career — the all-time record." },
      { q: "Which team went an entire Premier League season unbeaten in 2003-04?", opts: ["Chelsea","Manchester United","Arsenal","Liverpool"], ans: 2, diff: 'easy', fact: "Arsenal's 'Invincibles' went 38 games unbeaten in the 2003-04 Premier League season, winning 26 and drawing 12." },
      { q: "Who scored the first ever Premier League goal?", opts: ["Teddy Sheringham","Brian Deane","Mark Hughes","Eric Cantona"], ans: 1, diff: 'impossible', fact: "Brian Deane scored for Sheffield United against Manchester United on 15 August 1992 — the very first Premier League goal." }
    ]
  },
  liga: {
    name: 'LA LIGA', icon: '🌞',
    questions: [
      // Original 10
      { q: "Who is La Liga's all-time top goal scorer?", opts: ["Cristiano Ronaldo","El Stiffano","Lionel Messi","Luis Suárez"], ans: 2, diff: 'easy', fact: "Lionel Messi scored 474 La Liga goals across his career at Barcelona." },
      { q: "Which club has won the most La Liga titles?", opts: ["Barcelona","Atlético Madrid","Real Madrid","Valencia"], ans: 2, diff: 'medium', fact: "Real Madrid have won La Liga a record 35 times." },
      { q: "Who is known as 'El Niño' in La Liga?", opts: ["Fernando Torres","David Villa","Iker Casillas","Andrés Iniesta"], ans: 0, diff: 'medium', fact: "Fernando Torres earned the nickname 'The Kid' due to his youth and explosive emergence at Atlético Madrid." },
      { q: "Which team went unbeaten throughout the 1929–30 La Liga season?", opts: ["Athletic Bilbao","Real Sociedad","Real Madrid","Espanyol"], ans: 0, diff: 'hard', fact: "Athletic Bilbao went the entire inaugural La Liga season without losing a match." },
      { q: "Who scored the fastest hat-trick in La Liga history?", opts: ["David Villa","Cristiano Ronaldo","Kevin Gameiro","Luis Suárez"], ans: 2, diff: 'hard', fact: "Kevin Gameiro scored his hat-trick in just 3 minutes 30 seconds for Sevilla in 2015." },
      { q: "Which goalkeeper has the most clean sheets in La Liga?", opts: ["Iker Casillas","Jan Oblak","Victor Valdés","Thibaut Courtois"], ans: 0, diff: 'hard', fact: "Iker Casillas kept 177 La Liga clean sheets, all for Real Madrid." },
      { q: "Who was the first non-Spanish player to win the Pichichi Trophy?", opts: ["Ferenc Puskás","Hugo Sánchez","Samuel Eto'o","Ronaldo Nazário"], ans: 1, diff: 'impossible', fact: "Mexican striker Hugo Sánchez won the Pichichi five times with Real Madrid in the 1980s." },
      { q: "Which club has never been relegated from La Liga?", opts: ["Barcelona","Real Madrid","Athletic Bilbao","Sevilla"], ans: 2, diff: 'impossible', fact: "Athletic Bilbao have played every season in La Liga since its founding in 1929 — a remarkable record." },
      { q: "Who scored against every single La Liga team?", opts: ["Telmo Zarra","Cristiano Ronaldo","Lionel Messi","Luis Suárez"], ans: 2, diff: 'impossible', fact: "Lionel Messi is the only player in history to score against all 38 different La Liga clubs he faced." },
      { q: "Who is the youngest player to score in El Clásico?", opts: ["Lamine Yamal","Raúl","Vinícius Júnior","Bojan Krkić"], ans: 0, diff: 'impossible', fact: "Lamine Yamal scored for Barcelona against Real Madrid at just 17 years old." },
      // 8 New
      { q: "Which player won the Pichichi Trophy the most times?", opts: ["Telmo Zarra","Ronaldo Nazário","Lionel Messi","Cristiano Ronaldo"], ans: 2, diff: 'hard', fact: "Lionel Messi won La Liga's top scorer award (Pichichi) a record 8 times throughout his Barcelona career." },
      { q: "Who is known as 'El Buitre' (The Vulture) in La Liga?", opts: ["Emilio Butragueño","Fernando Hierro","Raúl","Michel"], ans: 0, diff: 'medium', fact: "Emilio Butragueño earned the nickname 'El Buitre' for his predatory instincts in front of goal during his time at Real Madrid in the 1980s." },
      { q: "Which La Liga club is nicknamed 'Los Blancos'?", opts: ["Atlético Madrid","Sevilla","Valencia","Real Madrid"], ans: 3, diff: 'easy', fact: "Real Madrid are known as 'Los Blancos' (The Whites) due to their iconic all-white kit." },
      { q: "In which year was La Liga founded?", opts: ["1925","1929","1933","1936"], ans: 1, diff: 'medium', fact: "La Liga was founded in 1929, with FC Barcelona winning the inaugural title." },
      { q: "Which player scored the most goals in a single La Liga season (50 goals)?", opts: ["Cristiano Ronaldo","Lionel Messi","Telmo Zarra","Hugo Sánchez"], ans: 1, diff: 'hard', fact: "Lionel Messi scored a jaw-dropping 50 La Liga goals in the 2011–12 season, smashing all previous records." },
      { q: "What is the name of the stadium where Real Madrid play their home matches?", opts: ["Camp Nou","Wanda Metropolitano","Estadio Santiago Bernabéu","Ramón Sánchez Pizjuán"], ans: 2, diff: 'easy', fact: "The Santiago Bernabéu Stadium in Madrid has been Real Madrid's home since 1947." },
      { q: "Which country does La Liga's Atlético Madrid striker Ángel Correa represent?", opts: ["Spain","Colombia","Argentina","Brazil"], ans: 2, diff: 'medium', fact: "Ángel Correa is an Argentine international who has played for Atlético Madrid since 2015." },
      { q: "Who became the first player to score in 7 consecutive El Clásico matches?", opts: ["Alfredo Di Stéfano","Raúl","Cristiano Ronaldo","Lionel Messi"], ans: 3, diff: 'impossible', fact: "Lionel Messi scored in 7 consecutive El Clásico fixtures — an extraordinary and unmatched record." }
    ]
  },
  ucl: {
    name: 'CHAMPIONS LEAGUE', icon: '⭐',
    questions: [
      // Original 10
      { q: "Which club has won the most UEFA Champions League/European Cup titles?", opts: ["AC Milan","Liverpool","Real Madrid","Bayern Munich"], ans: 2, diff: 'easy', fact: "Real Madrid have won the Champions League/European Cup a record 15 times." },
      { q: "Who is the all-time top scorer in Champions League history?", opts: ["Lionel Messi","Robert Lewandowski","Cristiano Ronaldo","Karim Benzema"], ans: 2, diff: 'easy', fact: "Cristiano Ronaldo holds the record with 140 Champions League goals." },
      { q: "Which team completed the first treble (League, Cup, Champions League) in men's football?", opts: ["Celtic","Ajax","Barcelona","Manchester United"], ans: 0, diff: 'medium', fact: "Celtic's 1966–67 'Lisbon Lions' won every competition they entered — the first ever treble in European football." },
      { q: "Which player has the most Champions League assists in history?", opts: ["Cristiano Ronaldo","Lionel Messi","Angel Di Maria","Kevin De Bruyne"], ans: 1, diff: 'medium', fact: "Lionel Messi leads with 42 Champions League assists." },
      { q: "Which goalkeeper holds the record for most clean sheets in UCL history?", opts: ["Iker Casillas","Gianluigi Buffon","Petr Čech","Manuel Neuer"], ans: 0, diff: 'medium', fact: "Iker Casillas kept 57 clean sheets in the Champions League." },
      { q: "Which team has the longest unbeaten home record in UCL history?", opts: ["Bayern Munich","Barcelona","Real Madrid","Manchester United"], ans: 0, diff: 'hard', fact: "Bayern Munich went 43 consecutive home games unbeaten in the Champions League." },
      { q: "Who scored the fastest goal in Champions League history?", opts: ["Roy Makaay","Paolo Maldini","Clarence Seedorf","Alessandro Del Piero"], ans: 0, diff: 'hard', fact: "Roy Makaay scored for Bayern Munich against Real Madrid in just 10.12 seconds in 2007 — the fastest ever UCL goal." },
      { q: "Which player has won the most Champions League titles?", opts: ["Francisco Gento","Cristiano Ronaldo","Paolo Maldini","Lionel Messi"], ans: 0, diff: 'hard', fact: "Francisco Gento won 6 European Cups with Real Madrid between 1956 and 1966." },
      { q: "Which team achieved the biggest aggregate win in UCL history?", opts: ["Liverpool","Real Madrid","Bayern Munich","Barcelona"], ans: 2, diff: 'impossible', fact: "Bayern Munich beat Sporting CP 12–1 on aggregate in the 2008–09 round of 16." },
      { q: "Who is the youngest goalscorer in Champions League history?", opts: ["Ansu Fati","Peter Ofori-Quaye","Bojan Krkić","Youssoufa Moukoko"], ans: 1, diff: 'impossible', fact: "Peter Ofori-Quaye scored for Rosenborg in 1996 at just 17 years and 195 days old." },
      // 8 New
      { q: "Which city has hosted the most Champions League/European Cup finals?", opts: ["London","Madrid","Paris","Milan"], ans: 0, diff: 'hard', fact: "London has hosted more European Cup/Champions League finals than any other city, with Wembley and other venues staging the showpiece event multiple times." },
      { q: "Who scored the winning goal in the 1999 Champions League final for Manchester United?", opts: ["Andy Cole","Ole Gunnar Solskjær","Teddy Sheringham","Dwight Yorke"], ans: 1, diff: 'medium', fact: "Ole Gunnar Solskjær scored a dramatic injury-time winner to complete United's comeback from 1–0 down against Bayern Munich." },
      { q: "Which club has appeared in the most Champions League finals?", opts: ["AC Milan","Bayern Munich","Real Madrid","Juventus"], ans: 2, diff: 'medium', fact: "Real Madrid have appeared in 17 Champions League/European Cup finals — more than any other club." },
      { q: "What is the nickname for the Champions League anthem?", opts: ["The Hymn of Europe","The UCL Theme","The Champions","Zadok the Priest"], ans: 2, diff: 'easy', fact: "The iconic Champions League anthem is officially titled 'The Champions' and was composed by Tony Britten, based on Handel's 'Zadok the Priest'." },
      { q: "Which club was banned from European competition for one year in 2020 (later overturned)?", opts: ["Chelsea","Paris Saint-Germain","Manchester City","Juventus"], ans: 2, diff: 'hard', fact: "Manchester City were initially banned from UEFA competitions for two seasons for alleged Financial Fair Play breaches, but the Court of Arbitration for Sport overturned the ban in 2020." },
      { q: "Who scored a bicycle kick goal considered among the greatest in UCL history in the 2018 semifinal?", opts: ["Cristiano Ronaldo","Gareth Bale","Karim Benzema","Luka Modrić"], ans: 1, diff: 'medium', fact: "Gareth Bale's stunning overhead kick for Real Madrid against Liverpool in the 2018 UCL final is widely regarded as one of the greatest goals in the competition's history." },
      { q: "Which English club famously won the Champions League despite finishing 6th in their domestic league?", opts: ["Chelsea","Liverpool","Manchester United","Nottingham Forest"], ans: 1, diff: 'impossible', fact: "Liverpool qualified for the 2004-05 Champions League only because they were defending champions, despite finishing 5th in the Premier League. They went on to win it in Istanbul." },
      { q: "How many times has a team won the Champions League in back-to-back seasons in the modern era (post-1992)?", opts: ["Never","Once — Real Madrid (2016 & 2017)","Twice","Three times"], ans: 1, diff: 'impossible', fact: "Real Madrid won back-to-back Champions League titles in 2016 and 2017, and then again in 2017 and 2018 — the only team to achieve this feat in the modern era." }
    ]
  },
  wc: {
    name: 'WORLD CUP', icon: '🌍',
    questions: [
      // Original 10
      { q: "Which country has won the most FIFA World Cup titles?", opts: ["Germany","Italy","Brazil","Argentina"], ans: 2, diff: 'easy', fact: "Brazil have won the World Cup five times: 1958, 1962, 1970, 1994, and 2002." },
      { q: "Who is the all-time top scorer in World Cup history?", opts: ["Ronaldo Nazário","Miroslav Klose","Gerd Müller","Pelé"], ans: 1, diff: 'easy', fact: "Miroslav Klose scored 16 World Cup goals across four tournaments for Germany." },
      { q: "Which country hosted and won the very first FIFA World Cup?", opts: ["Brazil","Uruguay","Argentina","Italy"], ans: 1, diff: 'medium', fact: "Uruguay hosted and won the inaugural 1930 World Cup, defeating Argentina 4–2 in the final." },
      { q: "Who holds the record for most goals in a single World Cup tournament?", opts: ["Eusébio","Just Fontaine","Gerd Müller","Sandor Kocsis"], ans: 1, diff: 'medium', fact: "Just Fontaine scored 13 goals for France at the 1958 World Cup — a record that has stood for over 60 years." },
      { q: "Which player has appeared in the most World Cup tournaments?", opts: ["Diego Maradona","Lothar Matthäus","Paolo Maldini","Cafu"], ans: 1, diff: 'medium', fact: "Lothar Matthäus appeared in five World Cups between 1982 and 1998." },
      { q: "Which team scored the most goals in a single World Cup tournament?", opts: ["Brazil 1970","Hungary 1954","Germany 2014","France 1958"], ans: 1, diff: 'hard', fact: "Hungary scored 27 goals at the 1954 World Cup in Switzerland, despite losing the final." },
      { q: "Who holds the record for most goals in a single World Cup match?", opts: ["Gerd Müller","Oleg Salenko","Eusébio","Gary Lineker"], ans: 1, diff: 'hard', fact: "Oleg Salenko scored 5 goals against Cameroon for Russia at the 1994 World Cup." },
      { q: "Who is the youngest player to ever play in a World Cup?", opts: ["Pelé","Norman Whiteside","Michael Owen","Samuel Eto'o"], ans: 1, diff: 'hard', fact: "Norman Whiteside represented Northern Ireland at just 17 years and 41 days in 1982." },
      { q: "Who is the oldest goalscorer in World Cup history?", opts: ["Dino Zoff","Roger Milla","Pat Jennings","Peter Shilton"], ans: 1, diff: 'impossible', fact: "Roger Milla scored for Cameroon at the 1994 World Cup at 42 years and 39 days old." },
      { q: "Who is the only player to win three World Cup tournaments?", opts: ["Cafu","Franz Beckenbauer","Pelé","Ronaldo"], ans: 2, diff: 'impossible', fact: "Pelé is the only player to win the World Cup three times: 1958, 1962, and 1970 with Brazil." },
      // 8 New
      { q: "Which country won the 2022 FIFA World Cup?", opts: ["France","Brazil","Argentina","Croatia"], ans: 2, diff: 'easy', fact: "Argentina won the 2022 World Cup in Qatar, defeating France on penalties after a thrilling 3–3 draw. It was Lionel Messi's long-awaited first World Cup title." },
      { q: "Who scored a famous 'Hand of God' goal at the 1986 World Cup?", opts: ["Ronaldo","Zinedine Zidane","Diego Maradona","Pelé"], ans: 2, diff: 'easy', fact: "Diego Maradona controversially punched the ball into England's net in the 1986 World Cup quarter-final, later claiming it was scored 'a little with the head of Maradona and a little with the hand of God.'" },
      { q: "How many teams participated in the first-ever FIFA World Cup in 1930?", opts: ["13","16","24","32"], ans: 0, diff: 'medium', fact: "Only 13 nations participated in the 1930 World Cup in Uruguay — 7 from South America, 4 from Europe, and 2 from North America." },
      { q: "Which country has hosted the World Cup the most times?", opts: ["Brazil","Germany","Italy","Mexico"], ans: 3, diff: 'hard', fact: "Mexico has hosted the FIFA World Cup twice: in 1970 and again in 1986, and is set to co-host the 2026 tournament." },
      { q: "Who won the Golden Boot at the 2018 World Cup?", opts: ["Cristiano Ronaldo","Harry Kane","Kylian Mbappé","Romelu Lukaku"], ans: 1, diff: 'medium', fact: "Harry Kane scored 6 goals to win the Golden Boot at the 2018 World Cup in Russia, helping England reach the semi-finals." },
      { q: "In what year did Germany win their fourth World Cup title?", opts: ["2002","2006","2010","2014"], ans: 3, diff: 'easy', fact: "Germany won the 2014 World Cup in Brazil, defeating the host nation 7–1 in the semi-final in one of football's most shocking results." },
      { q: "Which goalkeeper has played the most World Cup matches?", opts: ["Gianluigi Buffon","Dino Zoff","Sepp Maier","Essam El-Hadary"], ans: 0, diff: 'hard', fact: "Gianluigi Buffon appeared in 17 World Cup matches across his career with Italy, the most of any goalkeeper." },
      { q: "What is the record winning margin in a World Cup match?", opts: ["9–0","10–1","13–0","14–0"], ans: 1, diff: 'impossible', fact: "Hungary defeated El Salvador 10–1 in the 1982 World Cup group stage — the record winning margin in World Cup history." }
    ]
  },
  weekly: {
    name: 'WEEKLY EVENT', icon: '🏆',
    questions: [
      // Original 10
      { q: "Which player scored the most goals in a single Premier League season?", opts: ["Mohamed Salah","Alan Shearer","Erling Haaland","Cristiano Ronaldo"], ans: 2, diff: 'easy', fact: "Erling Haaland broke the record with 36 Premier League goals in the 2022–23 season." },
      { q: "Who was the first player to score 100 Champions League goals?", opts: ["Lionel Messi","Raul","Cristiano Ronaldo","Karim Benzema"], ans: 1, diff: 'easy', fact: "Raúl González was the first to reach 100 UCL goals, a record later shattered by Ronaldo and Messi." },
      { q: "Which country won the first ever World Cup?", opts: ["Brazil","Argentina","Uruguay","Italy"], ans: 2, diff: 'medium', fact: "Uruguay defeated Argentina 4–2 in the 1930 final on home soil in Montevideo." },
      { q: "Who is the only defender ever to win the FIFA World Player of the Year award?", opts: ["Lionel Messi","Zinedine Zidane","Kaká","Fabio Cannavaro"], ans: 3, diff: 'medium', fact: "Fabio Cannavaro won the 2006 FIFA World Player of the Year award after captaining Italy to World Cup glory — the only outfield defender to ever win it." },
      { q: "Which team has completed the continental treble the most times?", opts: ["Barcelona","Bayern Munich","Manchester United","Inter Milan"], ans: 0, diff: 'medium', fact: "Barcelona won the treble in 2008–09 and 2014–15 under Pep Guardiola and Luis Enrique." },
      { q: "Who was the first African player to win the Ballon d'Or?", opts: ["George Weah","Samuel Eto'o","Didier Drogba","Yaya Touré"], ans: 0, diff: 'hard', fact: "George Weah won the Ballon d'Or in 1995 with AC Milan — a historic first for African football." },
      { q: "Which player has scored the most goals in El Clásico history?", opts: ["Cristiano Ronaldo","Alfredo Di Stéfano","Lionel Messi","Raúl"], ans: 2, diff: 'hard', fact: "Lionel Messi scored 26 El Clásico goals across his Barcelona career." },
      { q: "Who is the youngest player to ever play in a World Cup final?", opts: ["Pelé","Kylian Mbappé","Lionel Messi","Neymar"], ans: 0, diff: 'hard', fact: "Pelé played in the 1958 World Cup final for Brazil at just 17 years old." },
      { q: "Which manager has won the most Champions League titles?", opts: ["Alex Ferguson","Carlo Ancelotti","Pep Guardiola","Zinedine Zidane"], ans: 1, diff: 'impossible', fact: "Carlo Ancelotti has won the Champions League four times: 2003, 2007 (Milan), 2014, 2022 (Real Madrid)." },
      { q: "Which player has won the most trophies in football history?", opts: ["Lionel Messi","Dani Alves","Cristiano Ronaldo","Sergio Ramos"], ans: 1, diff: 'impossible', fact: "Dani Alves won 43 major trophies across his career, the most by any footballer in history." },
      // 8 New
      { q: "Who won the Ballon d'Or the most times?", opts: ["Cristiano Ronaldo","Zinedine Zidane","Lionel Messi","Ronaldo Nazário"], ans: 2, diff: 'easy', fact: "Lionel Messi has won the Ballon d'Or a record 8 times, most recently in 2023." },
      { q: "Which nation won the inaugural UEFA European Championship in 1960?", opts: ["West Germany","Czechoslovakia","Spain","Soviet Union"], ans: 3, diff: 'hard', fact: "The Soviet Union won the first UEFA European Championship in 1960, defeating Yugoslavia 2–1 in the final in Paris." },
      { q: "Which player has scored the most international goals in men's football history?", opts: ["Cristiano Ronaldo","Lionel Messi","Ali Daei","Ferenc Puskás"], ans: 0, diff: 'medium', fact: "Cristiano Ronaldo holds the record for most international goals, surpassing Ali Daei's record of 109 goals for Iran." },
      { q: "Which club is known as 'The Special One's' former club where José Mourinho achieved back-to-back league titles?", opts: ["Real Madrid","Chelsea","Inter Milan","FC Porto"], ans: 2, diff: 'hard', fact: "José Mourinho won back-to-back Serie A titles with Inter Milan in 2009 and 2010, also completing a historic treble in 2010." },
      { q: "Who scored the winning penalty in the 2006 World Cup final shootout for Italy?", opts: ["Alessandro Del Piero","Fabio Grosso","Francesco Totti","Luca Toni"], ans: 1, diff: 'hard', fact: "Fabio Grosso scored the decisive fifth penalty to win the World Cup for Italy against France, after Zidane's infamous headbutt led to his red card in extra time." },
      { q: "Which club did Kylian Mbappé join after leaving Paris Saint-Germain in 2024?", opts: ["Manchester City","Arsenal","Real Madrid","Bayern Munich"], ans: 2, diff: 'easy', fact: "Kylian Mbappé joined Real Madrid in the summer of 2024 on a free transfer, fulfilling a long-rumoured move to the Spanish giants." },
      { q: "Which player holds the record for most appearances in the Copa América?", opts: ["Lionel Messi","Paolo Guerrero","Javier Mascherano","Marcelo"], ans: 0, diff: 'medium', fact: "Lionel Messi has made the most Copa América appearances in history, winning the tournament with Argentina in 2021 and 2024." },
      { q: "What year did football first appear in the Olympic Games?", opts: ["1896","1900","1904","1908"], ans: 1, diff: 'impossible', fact: "Football made its Olympic debut at the 1900 Paris Games, though it was not part of the official programme. It became a full medal sport from 1908." }
    ]
  }
};

// Build QUIZZES by picking 10 random questions from each pool
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
  leaderboard: 'leaderboard-screen'
};

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(SCREEN_IDS[id] || id).classList.add('active');
}

// ── Init ──
loadPlayerData();
updateHomeRankDisplay();

// If no name, show name modal on first interaction
function ensureName(callback) {
  if (playerData.name) { callback(); return; }
  document.getElementById('name-modal').classList.add('active');
  document.getElementById('name-confirm-btn').onclick = () => {
    const val = document.getElementById('name-input').value.trim();
    if (!val) return;
    playerData.name = val;
    savePlayerData();
    document.getElementById('name-modal').classList.remove('active');
    callback();
  };
  document.getElementById('name-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('name-confirm-btn').click();
  });
}

// ── Category click ──
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
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
document.getElementById('leaderboard-open-btn').addEventListener('click', () => {
  renderLeaderboard();
  showScreen('leaderboard');
});

document.getElementById('leaderboard-back-btn').addEventListener('click', () => {
  showScreen('home');
});

function renderLeaderboard() {
  const lb = getLeaderboard();
  const table = document.getElementById('leaderboard-table');
  if (lb.length === 0) {
    table.innerHTML = '<div class="lb-empty">No players yet. Be the first to set a score!</div>';
    return;
  }
  const medals = ['🥇','🥈','🥉'];
  table.innerHTML = lb.map((p, i) => {
    const rank = getRank(p.xp);
    const isPlayer = p.name === playerData.name;
    return `<div class="lb-row ${isPlayer ? 'is-player' : ''} ${i < 3 ? 'top-'+(i+1) : ''}">
      <div class="lb-rank-num">${i < 3 ? medals[i] : '#'+(i+1)}</div>
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
  // Pick 10 random questions from the full pool each time
  const pool = QUESTION_POOLS[currentQuizKey];
  const picked = [...pool.questions].sort(() => Math.random() - 0.5).slice(0, 10);
  currentQuiz = { name: pool.name, icon: pool.icon, questions: picked };
  document.getElementById('quiz-cat-label').textContent = currentQuiz.name;
  showScreen('quiz');
  renderQuestion();
  startTimer();
}

function reset() {
  currentQ = 0;
  score = 0;
  correct = 0;
  wrong = 0;
  streak = 0;
  sessionXP = 0;
  sessionXPBreakdown = { base: 0, streak: 0, perfect: 0 };
  answered = false;
  timedOut = false;
  timeLeft = TOTAL_TIME;
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

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }

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
  } else {
    _fillQuestion(q);
  }
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
  const feedbackText = document.getElementById('feedback-text');
  const xpDisplay = document.getElementById('xp-earned-display');

  if (isCorrect) {
    score++;
    correct++;
    streak++;
    document.getElementById('score-display').textContent = score;

    // XP calculation
    const baseXP = DIFF_XP[q.diff] || 10;
    const streakBonus = streak >= 3 ? Math.min(streak * 2, 15) : 0;
    const thisXP = baseXP + streakBonus;
    sessionXP += thisXP;
    sessionXPBreakdown.base += baseXP;
    sessionXPBreakdown.streak += streakBonus;

    feedbackBox.className = 'feedback-box show feedback-correct';
    feedbackLabel.textContent = '✅ Correct!';
    xpDisplay.innerHTML = `<div class="xp-earned-popup">+${thisXP} XP${streakBonus > 0 ? ' (🔥 streak bonus!)' : ''}</div>`;

    // Float XP
    floatXP('+' + thisXP + ' XP', btns[idx]);

    // Update streak badge
    if (streak >= 2) {
      document.getElementById('streak-badge').className = 'streak-badge active';
      document.getElementById('streak-count').textContent = streak;
    }
  } else {
    wrong++;
    streak = 0;
    document.getElementById('streak-badge').className = 'streak-badge';
    feedbackBox.className = 'feedback-box show feedback-wrong';
    feedbackLabel.textContent = '❌ Wrong!';
    xpDisplay.innerHTML = '';
  }
  feedbackText.textContent = q.fact;

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
  if (currentQ >= currentQuiz.questions.length) {
    finishQuiz();
  } else {
    renderQuestion(true);
  }
});

// ── Timer ──
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

// ── Results ──
function finishQuiz() {
  clearInterval(timerInterval);
  document.getElementById('timeout-overlay').classList.remove('active');

  // Perfect score bonus
  if (score === 10) {
    sessionXP += 20;
    sessionXPBreakdown.perfect = 20;
  }

  const totalAnswered = correct + wrong;
  const pct = totalAnswered > 0 ? Math.round((correct / currentQuiz.questions.length) * 100) : 0;

  document.getElementById('results-score-num').textContent = score;
  document.getElementById('stat-correct').textContent = correct;
  document.getElementById('stat-wrong').textContent = wrong;
  document.getElementById('stat-pct').textContent = pct + '%';

  // Ring
  const circumference = 2 * Math.PI * 70;
  const offset = circumference - (score / 10) * circumference;
  const ring = document.getElementById('ring-fill');
  ring.style.strokeDashoffset = offset;

  let grade, quote, attr, ringClass;
  if (score >= 9) { grade = '⚡ Legendary'; quote = '"You know this game better than most coaches. I would sign you tomorrow."'; attr = '— Pep Guardiola'; ringClass = ''; }
  else if (score >= 7) { grade = '🔥 World Class'; quote = '"You did incredible. The way you understand the game, it\'s beautiful. Like Messi in 2011."'; attr = '— Pep Guardiola'; ringClass = ''; }
  else if (score >= 5) { grade = '🎯 Solid Display'; quote = '"Decent. Not special… yet."'; attr = '— Jose Mourinho'; ringClass = 'mid'; }
  else if (score >= 3) { grade = '😬 Room to Grow'; quote = '"This is not football. This is comedy."'; attr = '— Jose Mourinho'; ringClass = 'fail'; }
  else { grade = '💀 Did You Even Watch?'; quote = '"I have seen better decisions made by a goalpost. Start over."'; attr = '— Jose Mourinho'; ringClass = 'fail'; }

  ring.className = 'ring-fill' + (ringClass ? ' ' + ringClass : '');
  document.getElementById('results-grade').textContent = grade;
  document.getElementById('results-quote').textContent = quote;
  document.getElementById('results-attr').textContent = attr;

  // XP & Rank
  const oldRank = getRank(playerData.xp);
  const oldXP = playerData.xp;
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

  // Rank up?
  const rankUpBanner = document.getElementById('rank-up-banner');
  if (newRank.name !== oldRank.name) {
    document.getElementById('rank-up-name').textContent = newRank.name;
    rankUpBanner.classList.add('show');
  } else {
    rankUpBanner.classList.remove('show');
  }

  setTimeout(() => showScreen('results'), 100);
}

document.getElementById('retry-btn').addEventListener('click', () => {
  startQuiz();
});

document.getElementById('home-btn').addEventListener('click', () => {
  showScreen('home');
  reset();
});
