// ════════════════════════════════════════════
// RANK SYSTEM
// ════════════════════════════════════════════
const RANKS = [
  { name:'Bronze',   icon:'🥉', color:'#cd7f32', minXP:0,    maxXP:599 },
  { name:'Silver',   icon:'🥈', color:'#b8c0cc', minXP:600,  maxXP:999 },
  { name:'Gold',     icon:'🥇', color:'#ffc400', minXP:1000,  maxXP:1599 },
  { name:'Platinum', icon:'💎', color:'#7dd3fc', minXP:1600, maxXP:2199 },
  { name:'Diamond',  icon:'💠', color:'#a5f3fc', minXP:2200, maxXP:3999 },
  { name:'Legend',   icon:'👑', color:'#ff6b6b', minXP:4000, maxXP:Infinity }
];
function getRank(xp){ for(let i=RANKS.length-1;i>=0;i--) if(xp>=RANKS[i].minXP) return RANKS[i]; return RANKS[0]; }
function getRankProgress(xp){
  const r=getRank(xp);
  if(r.maxXP===Infinity) return {pct:100,current:xp-r.minXP,needed:0};
  const p=xp-r.minXP, t=r.maxXP-r.minXP+1;
  return {pct:Math.min(100,Math.round(p/t*100)),current:p,needed:t-p};
}

// ════════════════════════════════════════════
// PLAYER DATA
// ════════════════════════════════════════════
let pd={name:'',xp:0,gamesPlayed:0,bestScore:0,unlockedCards:[]};
function loadPD(){try{const s=localStorage.getItem('90m_v2');if(s){const p=JSON.parse(s);pd={...pd,...p};if(!pd.unlockedCards)pd.unlockedCards=[];}}catch(e){}}
function savePD(){try{localStorage.setItem('90m_v2',JSON.stringify(pd));}catch(e){}}
function saveLB(){
  try{
    const lb=JSON.parse(localStorage.getItem('90m_lb_v2')||'[]');
    const idx=lb.findIndex(p=>p.name===pd.name);
    const e={name:pd.name,xp:pd.xp,gamesPlayed:pd.gamesPlayed,bestScore:pd.bestScore};
    if(idx>=0) lb[idx]=e; else lb.push(e);
    lb.sort((a,b)=>b.xp-a.xp);
    localStorage.setItem('90m_lb_v2',JSON.stringify(lb.slice(0,20)));
  }catch(e){}
}
function getLB(){try{return JSON.parse(localStorage.getItem('90m_lb_v2')||'[]');}catch(e){return [];}}
function updateHomeRank(){
  const r=getRank(pd.xp);
  document.getElementById('home-rank-icon').textContent=r.icon;
  document.getElementById('home-rank-name').textContent=r.name;
  document.getElementById('home-rank-xp').textContent=pd.xp+' XP';
}

// ════════════════════════════════════════════
// 50 FOOTBALLER CARDS
// ════════════════════════════════════════════
const FOOTBALLER_CARDS = [
  {id:'pele',name:'Pelé',emoji:'🇧🇷',nation:'Brazil',rarity:'legend',type:'player',stats:{goals:770,trophies:3,era:'58-77'},bio:'The king of football. Won three World Cups and scored over 1,000 career goals.',
   clues:[{cat:'Birthplace',text:'I was born in Três Corações, Brazil in 1940.'},{cat:'Club',text:'I spent most of my career at Santos FC in Brazil.'},{cat:'World Cup',text:'I won the FIFA World Cup three times with Brazil.'},{cat:'Record',text:'I scored over 1,000 career goals — a feat never matched.'},{cat:'Legacy',text:'FIFA named me "Player of the Century" alongside Maradona.'}],
   options:['Pelé','Garrincha','Zico','Romário']},
  {id:'maradona',name:'Diego Maradona',emoji:'🇦🇷',nation:'Argentina',rarity:'legend',type:'player',stats:{goals:312,trophies:5,era:'76-97'},bio:'Author of the Hand of God. Led Argentina to the 1986 World Cup.',
   clues:[{cat:'Birthplace',text:'I was born in Buenos Aires, Argentina in 1960.'},{cat:'Club',text:'I played for Napoli, winning two Serie A titles.'},{cat:'World Cup',text:'I captained Argentina to glory in 1986 in Mexico.'},{cat:'Infamous',text:'I scored two goals against England in 1986 — one with my hand.'},{cat:'Legacy',text:'I was named FIFA Player of the 20th Century alongside Pelé.'}],
   options:['Diego Maradona','Gabriel Batistuta','Mario Kempes','Hernán Crespo']},
  {id:'cruyff',name:'Johan Cruyff',emoji:'🇳🇱',nation:'Netherlands',rarity:'legend',type:'player',stats:{goals:284,trophies:9,era:'64-84'},bio:"Architect of Total Football. Won three Ballon d'Or awards. Created the Cruyff Turn.",
   clues:[{cat:'Birthplace',text:'I was born in Amsterdam, Netherlands in 1947.'},{cat:'Club',text:'I dominated with Ajax and later FC Barcelona.'},{cat:'Philosophy',text:'I embodied "Total Football" — every player can play any position.'},{cat:'Skill',text:'I invented a famous reverse dribbling turn named after me.'},{cat:'Manager',text:"As Barcelona's manager I created the legendary \"Dream Team\"."}],
   options:['Johan Cruyff','Marco van Basten','Dennis Bergkamp','Ruud Gullit']},
  {id:'beckenbauer',name:'Franz Beckenbauer',emoji:'🇩🇪',nation:'Germany',rarity:'legend',type:'player',stats:{goals:95,trophies:8,era:'64-83'},bio:'Der Kaiser. Won the World Cup as both player (1974) and manager (1990).',
   clues:[{cat:'Nickname',text:'I was known as "Der Kaiser" — The Emperor of German football.'},{cat:'Club',text:'I was captain of Bayern Munich for over a decade.'},{cat:'Position',text:'I revolutionised the sweeper (libero) role, attacking from defence.'},{cat:'World Cup',text:'I won the 1974 World Cup as captain of West Germany.'},{cat:'Manager',text:'I am one of only three men to win the World Cup as player AND manager.'}],
   options:['Franz Beckenbauer','Gerd Müller','Karl-Heinz Rummenigge','Sepp Maier']},
  {id:'ronaldo_r9',name:'Ronaldo R9',emoji:'🇧🇷',nation:'Brazil',rarity:'legend',type:'player',stats:{goals:352,trophies:5,era:'93-2011'},bio:'Two-time Ballon d\'Or. Two-time World Cup champion. "O Fenômeno".',
   clues:[{cat:'Birthplace',text:'I was born in Rio de Janeiro, Brazil in 1976.'},{cat:'Clubs',text:'I played for Barcelona, Inter Milan, and Real Madrid.'},{cat:'Awards',text:'I won the Ballon d\'Or twice (1997, 2002).'},{cat:'World Cup',text:'I was top scorer at both the 1998 and 2002 World Cups.'},{cat:'Nickname',text:'I was nicknamed "O Fenômeno" — The Phenomenon.'}],
   options:['Ronaldo R9','Rivaldo','Ronaldinho','Roberto Carlos']},
  {id:'ferguson',name:'Sir Alex Ferguson',emoji:'🏴󠁧󠁢󠁳󠁣󠁴󠁿',nation:'Scotland',rarity:'legend',type:'manager',stats:{goals:13,trophies:49,era:'74-2013'},bio:'Greatest manager in history. 13 Premier League titles with Manchester United.',
   clues:[{cat:'Birthplace',text:'I was born in Govan, Glasgow, Scotland in 1941.'},{cat:'Before United',text:'I managed Aberdeen before taking over Manchester United in 1986.'},{cat:'Titles',text:'I won 13 Premier League titles and 2 Champions Leagues with Manchester United.'},{cat:'Treble',text:'I won the historic treble in 1999 with a late comeback in Barcelona.'},{cat:'Legacy',text:'A clock at Old Trafford reads "Fergie Time" — tribute to my team\'s late goals.'}],
   options:['Sir Alex Ferguson','Brian Clough','Bob Paisley','Bill Shankly']},
  {id:'messi',name:'Lionel Messi',emoji:'🇦🇷',nation:'Argentina',rarity:'gold',type:'player',stats:{goals:850,trophies:44,era:'2004-'},bio:'8-time Ballon d\'Or. 2022 World Cup winner. La Liga all-time top scorer.',
   clues:[{cat:'Birthplace',text:'I was born in Rosario, Argentina in 1987.'},{cat:'Club',text:'I spent the majority of my career at FC Barcelona from age 13.'},{cat:'Awards',text:'I have won the Ballon d\'Or a record 8 times.'},{cat:'World Cup',text:'I finally won the FIFA World Cup in 2022 in Qatar.'},{cat:'Current',text:'I currently play for Inter Miami in Major League Soccer.'}],
   options:['Lionel Messi','Sergio Agüero','Angel Di Maria','Gonzalo Higuain']},
  {id:'ronaldo_cr7',name:'Cristiano Ronaldo',emoji:'🇵🇹',nation:'Portugal',rarity:'gold',type:'player',stats:{goals:900,trophies:34,era:'2002-'},bio:'5-time Ballon d\'Or. All-time top scorer in Champions League and international football.',
   clues:[{cat:'Birthplace',text:'I was born in Funchal, Madeira, Portugal in 1985.'},{cat:'Clubs',text:'I have played for Sporting CP, Man United, Real Madrid, Juventus, and Al Nassr.'},{cat:'Record',text:'I am all-time top scorer in both the Champions League and international football.'},{cat:'Number',text:'My iconic shirt number is #7 — worn at every major club.'},{cat:'Nickname',text:'My worldwide nickname is "CR7".'}],
   options:['Cristiano Ronaldo','Luis Figo','Eusébio','Rui Costa']},
  {id:'zidane',name:'Zinedine Zidane',emoji:'🇫🇷',nation:'France',rarity:'gold',type:'player',stats:{goals:125,trophies:15,era:'89-2006'},bio:'1998 World Cup hero. Elegant maestro who won three Ballon d\'Or awards.',
   clues:[{cat:'Birthplace',text:'I was born in Marseille, France to Algerian parents in 1972.'},{cat:'Clubs',text:'I played for Cannes, Bordeaux, Juventus, and Real Madrid.'},{cat:'World Cup',text:'I scored twice in the 1998 World Cup final to win the trophy for France.'},{cat:'Infamous',text:'My final act in football was a headbutt on Materazzi in the 2006 World Cup final.'},{cat:'Manager',text:'I managed Real Madrid to three consecutive Champions League titles.'}],
   options:['Zinedine Zidane','Thierry Henry','Patrick Vieira','David Trezeguet']},
  {id:'ronaldinho',name:'Ronaldinho',emoji:'🇧🇷',nation:'Brazil',rarity:'gold',type:'player',stats:{goals:282,trophies:14,era:'98-2015'},bio:'The most naturally gifted of his generation. Made football look like art.',
   clues:[{cat:'Birthplace',text:'I was born in Porto Alegre, Brazil in 1980.'},{cat:'Club',text:'My greatest years were at Barcelona, winning back-to-back Liga titles.'},{cat:'Awards',text:'I won the Ballon d\'Or in 2005 and the World Cup in 2002.'},{cat:'Style',text:'I was famous for flicks, elasticos, and no-look passes. Football was my joy.'},{cat:'Standing ovation',text:'Even Real Madrid fans gave me a standing ovation at the Bernabéu in 2005.'}],
   options:['Ronaldinho','Robinho','Rivaldo','Kaká']},
  {id:'henry',name:'Thierry Henry',emoji:'🇫🇷',nation:'France',rarity:'gold',type:'player',stats:{goals:411,trophies:11,era:'94-2012'},bio:"Arsenal's all-time top scorer. Part of the \"Invincibles\". Elegant and lethal.",
   clues:[{cat:'Birthplace',text:'I was born in Les Ulis, France in 1977.'},{cat:'Club',text:'I am the all-time top scorer for Arsenal Football Club.'},{cat:'Achievement',text:'I went an entire Premier League season unbeaten with Arsenal in 2003-04.'},{cat:'Infamous',text:'I handled the ball in the 2010 World Cup play-off against Ireland.'},{cat:'Manager',text:'I managed the Canadian national team after retiring.'}],
   options:['Thierry Henry','Nicolas Anelka','Robert Pirès','Sylvain Wiltord']},
  {id:'mourinho',name:'José Mourinho',emoji:'🇵🇹',nation:'Portugal',rarity:'gold',type:'manager',stats:{goals:2,trophies:26,era:'2000-'},bio:'"The Special One." Won the Champions League with Porto and Inter. Master of mind games.',
   clues:[{cat:'Birthplace',text:'I was born in Setúbal, Portugal in 1963.'},{cat:'Porto',text:'I won the Champions League with FC Porto in 2004 — considered a massive upset.'},{cat:'Title',text:'I named myself "The Special One" at my very first Chelsea press conference.'},{cat:'Clubs',text:'I have managed Porto, Chelsea, Inter, Real Madrid, Man United, Spurs, Roma, Fenerbahçe.'},{cat:'Style',text:'I am renowned for defensive tactics, meticulous preparation, and mind games.'}],
   options:['José Mourinho','Carlo Ancelotti','Claudio Ranieri','Roberto Mancini']},
  {id:'guardiola',name:'Pep Guardiola',emoji:'🇪🇸',nation:'Spain',rarity:'gold',type:'manager',stats:{goals:11,trophies:38,era:'2007-'},bio:'Greatest tactical innovator in modern football. Created tiki-taka at Barcelona.',
   clues:[{cat:'Birthplace',text:'I was born in Santpedor, Catalonia, Spain in 1971.'},{cat:'Player',text:"As a player, I was central midfielder in Cruyff's Barcelona Dream Team."},{cat:'Achievement',text:'I won the historic treble with Barcelona in 2009 and repeated it in 2011.'},{cat:'City',text:'I joined Manchester City in 2016 and won 6 Premier Leagues in 8 seasons.'},{cat:'Invention',text:'I invented the "False 9" position and perfected positional play (juego de posición).'}],
   options:['Pep Guardiola','Mikel Arteta','Ernesto Valverde','Luis Enrique']},
  {id:'haaland',name:'Erling Haaland',emoji:'🇳🇴',nation:'Norway',rarity:'silver',type:'player',stats:{goals:290,trophies:8,era:'2016-'},bio:'Most lethal striker of his generation. Broke Premier League goals record in debut season.',
   clues:[{cat:'Birthplace',text:'I was born in Leeds, England but represent Norway internationally.'},{cat:'Club',text:'I joined Manchester City from Borussia Dortmund in 2022.'},{cat:'Record',text:'I scored 36 Premier League goals in my debut season — breaking the all-time record.'},{cat:'Father',text:'My father Alfie Haaland also played in the Premier League.'},{cat:'Style',text:'I am known for my incredible pace, clinical finishing, and ice-cold composure.'}],
   options:['Erling Haaland','Alexander Sörloth','Martin Ødegaard','Joshua King']},
  {id:'mbappe',name:'Kylian Mbappé',emoji:'🇫🇷',nation:'France',rarity:'silver',type:'player',stats:{goals:340,trophies:15,era:'2015-'},bio:'Fastest player in football. 2018 World Cup winner. Joined Real Madrid in 2024.',
   clues:[{cat:'Birthplace',text:'I was born in Paris in 1998 to a Cameroonian father and Algerian mother.'},{cat:'Clubs',text:'I played for Monaco and PSG before moving to Real Madrid in 2024.'},{cat:'World Cup',text:'I won the 2018 World Cup with France, scoring in the final aged just 19.'},{cat:'Speed',text:'I have been recorded as the fastest player in football at over 38 km/h.'},{cat:'Pelé quote',text:'Pelé once said I was the most exciting young player since himself.'}],
   options:['Kylian Mbappé','Ousmane Dembélé','Antoine Griezmann','Kingsley Coman']},
  {id:'buffon',name:'Gianluigi Buffon',emoji:'🇮🇹',nation:'Italy',rarity:'silver',type:'player',stats:{goals:0,trophies:26,era:'95-2023'},bio:'Greatest goalkeeper of all time. Served Juventus for over two decades.',
   clues:[{cat:'Birthplace',text:'I was born in Carrara, Italy in 1978.'},{cat:'Club',text:'I am synonymous with Juventus, where I played for over two decades.'},{cat:'World Cup',text:'I won the 2006 World Cup with Italy, conceding only 2 goals.'},{cat:'Record',text:'I hold the record for most Champions League appearances by a goalkeeper.'},{cat:'Number',text:'My number 1 shirt was retired by Parma in my honour.'}],
   options:['Gianluigi Buffon','Dino Zoff','Angelo Peruzzi','Sebastiano Rossi']},
  {id:'iniesta',name:'Andrés Iniesta',emoji:'🇪🇸',nation:'Spain',rarity:'silver',type:'player',stats:{goals:93,trophies:35,era:'2002-2023'},bio:"Scored the 2010 World Cup winning goal. Engine of Barcelona's golden era.",
   clues:[{cat:'Birthplace',text:'I was born in Fuentealbilla, Spain in 1984.'},{cat:'Club',text:"I spent my entire Spanish career at FC Barcelona — La Masia's finest product."},{cat:'World Cup',text:'I scored the winning goal in the 2010 FIFA World Cup final in extra time.'},{cat:'Style',text:'I was known for calmness under pressure, vision, and navigating tight spaces.'},{cat:'Japan',text:'I played my final years for Vissel Kobe in Japan before retiring.'}],
   options:['Andrés Iniesta','Xavi Hernández','David Silva','Cesc Fàbregas']},
  {id:'van_basten',name:'Marco van Basten',emoji:'🇳🇱',nation:'Netherlands',rarity:'silver',type:'player',stats:{goals:301,trophies:11,era:'81-95'},bio:'Three-time Ballon d\'Or. Scored one of the greatest goals ever in Euro 1988.',
   clues:[{cat:'Birthplace',text:'I was born in Utrecht, Netherlands in 1964.'},{cat:'Clubs',text:'I played for Ajax and AC Milan during my career.'},{cat:'Awards',text:'I won the Ballon d\'Or three times and the European Championship in 1988.'},{cat:'Famous goal',text:'My volley in the 1988 Euro final against the USSR is considered one of the greatest ever.'},{cat:'Injury',text:'A chronic ankle injury tragically forced me to retire aged just 28.'}],
   options:['Marco van Basten','Ruud Gullit','Frank Rijkaard','Patrick Kluivert']},
  {id:'cantona',name:'Eric Cantona',emoji:'🇫🇷',nation:'France',rarity:'silver',type:'player',stats:{goals:143,trophies:10,era:'83-97'},bio:'The King of Old Trafford. Transformed Manchester United into champions.',
   clues:[{cat:'Birthplace',text:'I was born in Paris, France in 1966 to a Sardinian father.'},{cat:'Club',text:'I joined Manchester United from Leeds and became a legend under Sir Alex Ferguson.'},{cat:'Titles',text:'I won four Premier League titles in five years with Manchester United.'},{cat:'Ban',text:'I was banned for eight months after a kung-fu kick on a Crystal Palace fan in 1995.'},{cat:'Quote',text:'I famously said "The seagulls follow the trawler" at a press conference.'}],
   options:['Eric Cantona','David Ginola','Laurent Blanc','Didier Deschamps']},
  {id:'klopp',name:'Jürgen Klopp',emoji:'🇩🇪',nation:'Germany',rarity:'silver',type:'manager',stats:{goals:7,trophies:12,era:'2001-2024'},bio:'"The Normal One." Brought the Gegenpressing revolution. Won everything at Liverpool.',
   clues:[{cat:'Birthplace',text:'I was born in Stuttgart, Germany in 1967.'},{cat:'Dortmund',text:'I achieved back-to-back Bundesliga titles with Borussia Dortmund.'},{cat:'Liverpool',text:"I won Liverpool's first league title in 30 years in 2020 and the Champions League in 2019."},{cat:'Style',text:'I am famous for "Gegenpressing" — immediate high-intensity pressing after losing the ball.'},{cat:'Retirement',text:'I retired from management in 2024, saying I had run out of energy.'}],
   options:['Jürgen Klopp','Thomas Tuchel','Julian Nagelsmann','Hansi Flick']},
  {id:'ancelotti',name:'Carlo Ancelotti',emoji:'🇮🇹',nation:'Italy',rarity:'silver',type:'manager',stats:{goals:26,trophies:29,era:'1992-'},bio:'Most decorated manager in Champions League history. Won it four times.',
   clues:[{cat:'Birthplace',text:'I was born in Reggiolo, Italy in 1959.'},{cat:'Player',text:'As a player, I was a creative midfielder in the great AC Milan teams of the 1980s.'},{cat:'Record',text:'I have won the Champions League four times — more than any other manager.'},{cat:'Clubs',text:'I have managed Juventus, Milan, Chelsea, PSG, Real Madrid, Bayern, Everton.'},{cat:'Personality',text:'I am famous for my calm demeanour and a raised eyebrow that became a viral meme.'}],
   options:['Carlo Ancelotti','Fabio Capello','Arrigo Sacchi','Giovanni Trapattoni']},
  {id:'gerrard',name:'Steven Gerrard',emoji:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',nation:'England',rarity:'bronze',type:'player',stats:{goals:186,trophies:9,era:'98-2016'},bio:"Liverpool's greatest ever captain. Inspired the 2005 Champions League miracle.",
   clues:[{cat:'Birthplace',text:'I was born in Whiston, Merseyside, England in 1980.'},{cat:'Loyalty',text:'I spent my entire English career at Liverpool, my hometown club.'},{cat:'Istanbul',text:'I captained Liverpool to a miraculous comeback from 3-0 down in the 2005 UCL final.'},{cat:'Infamous',text:'I slipped vs Chelsea in 2014, costing Liverpool the Premier League title.'},{cat:'Manager',text:'I managed Rangers in Scotland before roles in MLS and Saudi Arabia.'}],
   options:['Steven Gerrard','Frank Lampard','Paul Scholes','Patrick Vieira']},
  {id:'weah',name:'George Weah',emoji:'🇱🇷',nation:'Liberia',rarity:'bronze',type:'player',stats:{goals:244,trophies:9,era:'85-2003'},bio:"Africa's greatest footballer. The only African to win FIFA World Player of the Year.",
   clues:[{cat:'Birthplace',text:'I was born in Monrovia, Liberia in 1966.'},{cat:'Clubs',text:'I played for Monaco, PSG, and most famously AC Milan.'},{cat:'Award',text:'I won the 1995 FIFA World Player of the Year and Ballon d\'Or — first African ever.'},{cat:'Goal',text:'My solo goal vs Verona in 1996, starting from my own half, is legendary.'},{cat:'Politics',text:'I became the President of Liberia in 2018.'}],
   options:["George Weah","Samuel Eto'o","Didier Drogba","Michael Essien"]},
  {id:'shearer',name:'Alan Shearer',emoji:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',nation:'England',rarity:'bronze',type:'player',stats:{goals:423,trophies:1,era:'88-2006'},bio:'Premier League\'s all-time top scorer. A Geordie legend who never won the title.',
   clues:[{cat:'Birthplace',text:'I was born in Gosforth, Newcastle in 1970.'},{cat:'Newcastle',text:'I rejected Manchester United to return home to Newcastle for a world record fee in 1996.'},{cat:'Record',text:'I scored 260 Premier League goals — more than any other player, ever.'},{cat:'England',text:'I scored 30 goals for England, captaining my country at Euro 96 on home soil.'},{cat:'Celebration',text:'My trademark celebration was raising one arm straight in the air.'}],
   options:['Alan Shearer','Michael Owen','Andy Cole','Les Ferdinand']},
  {id:'yashin',name:'Lev Yashin',emoji:'🇷🇺',nation:'Soviet Union',rarity:'bronze',type:'player',stats:{goals:0,trophies:13,era:'50-70'},bio:'The Black Spider. The only goalkeeper to win the Ballon d\'Or.',
   clues:[{cat:'Birthplace',text:'I was born in Moscow, Russia (Soviet Union) in 1929.'},{cat:'Club',text:'I played my entire career for Dynamo Moscow — over 300 games.'},{cat:'Award',text:'I am the only goalkeeper in history to win the Ballon d\'Or (1963).'},{cat:'Nickname',text:'I was known as "The Black Spider" — always wore black, seemed to have eight arms.'},{cat:'Trophy',text:"The annual award for the World Cup's best goalkeeper is named after me."}],
   options:['Lev Yashin','Peter Shilton','Gordon Banks','Dino Zoff']},
  {id:'modric',name:'Luka Modrić',emoji:'🇭🇷',nation:'Croatia',rarity:'bronze',type:'player',stats:{goals:117,trophies:24,era:'2002-'},bio:'Broke the Messi/Ronaldo Ballon d\'Or monopoly in 2018. Metronome of Real Madrid.',
   clues:[{cat:'Birthplace',text:'I was born in Zadar, Yugoslavia (now Croatia) in 1985.'},{cat:'Spurs',text:'I joined Real Madrid from Tottenham Hotspur in 2012.'},{cat:'Award',text:'I won the Ballon d\'Or in 2018 — first non-Messi/Ronaldo winner since 2007.'},{cat:'Croatia',text:'I led Croatia to the 2018 World Cup final and 2022 third-place play-off.'},{cat:'Style',text:'I am known for tireless pressing, vision, and composure despite my small frame.'}],
   options:['Luka Modrić','Ivan Rakitić','Davor Šuker','Dejan Lovren']},
  {id:'salah',name:'Mohamed Salah',emoji:'🇪🇬',nation:'Egypt',rarity:'bronze',type:'player',stats:{goals:260,trophies:10,era:'2010-'},bio:"The Egyptian King. Liverpool's greatest ever modern player.",
   clues:[{cat:'Birthplace',text:'I was born in Nagrig, Egypt in 1992.'},{cat:'Liverpool',text:'I have been a sensation at Liverpool since joining in 2017.'},{cat:'Record',text:'I broke the PL scoring record with 32 goals in a 38-game season in 2017-18.'},{cat:'Character',text:'I am known for my charity work in Egypt and dedication to my faith.'},{cat:'Nickname',text:'Liverpool fans call me "The Egyptian King".'}],
   options:['Mohamed Salah','Sadio Mané','Roberto Firmino','Diogo Jota']},
  {id:'clough',name:'Brian Clough',emoji:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',nation:'England',rarity:'bronze',type:'manager',stats:{goals:2,trophies:7,era:'65-93'},bio:'Won back-to-back European Cups with Nottingham Forest. Most charismatic British manager.',
   clues:[{cat:'Birthplace',text:'I was born in Middlesbrough, England in 1935.'},{cat:'Forest',text:'I took Nottingham Forest from Division 2 to back-to-back European Cup wins (1979 & 1980).'},{cat:'Quote',text:'I said: "I wouldn\'t say I was the best manager, but I was in the top one."'},{cat:'Style',text:'I was known for outspoken personality and absolute authority over players.'},{cat:'England',text:'I never managed England, despite being the obvious popular choice.'}],
   options:['Brian Clough','Ron Greenwood','Bobby Robson','Don Revie']},
  {id:'wenger',name:'Arsène Wenger',emoji:'🇫🇷',nation:'France',rarity:'bronze',type:'manager',stats:{goals:10,trophies:17,era:'84-2019'},bio:'Transformed Arsenal and English football. Created the "Invincibles". The Professor.',
   clues:[{cat:'Birthplace',text:'I was born in Strasbourg, France in 1949.'},{cat:'Invincibles',text:'I led Arsenal to an entire Premier League season without losing in 2003-04.'},{cat:'Revolution',text:'I transformed English football with continental training methods and nutrition.'},{cat:'Nickname',text:'The press called me "The Professor" for my intellectual approach.'},{cat:'Phrases',text:'I became famous for saying "I didn\'t see the incident" about controversies.'}],
   options:['Arsène Wenger','George Graham','Terry Neill','Bruce Rioch']},
  {id:'owen',name:'Michael Owen',emoji:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',nation:'England',rarity:'bronze',type:'player',stats:{goals:262,trophies:9,era:'96-2013'},bio:'Ballon d\'Or winner 2001. Scored one of the greatest World Cup goals at just 18.',
   clues:[{cat:'Debut',text:'I burst onto the scene for Liverpool and England as a teenager in 1997-98.'},{cat:'World Cup',text:'I scored a stunning individual goal against Argentina in the 1998 World Cup aged 18.'},{cat:'Award',text:'I won the Ballon d\'Or in 2001 — the last Englishman to win it.'},{cat:'Injury',text:'My career was plagued by hamstring and cruciate ligament injuries.'},{cat:'Clubs',text:'I played for Liverpool, Real Madrid, Newcastle, Man United, and Stoke City.'}],
   options:['Michael Owen','Robbie Fowler','Steve McManaman','Emile Heskey']},
  {id:'bergkamp',name:'Dennis Bergkamp',emoji:'🇳🇱',nation:'Netherlands',rarity:'silver',type:'player',stats:{goals:201,trophies:11,era:'86-2006'},bio:'The Non-Flying Dutchman. One of the most technically gifted strikers of all time.',
   clues:[{cat:'Nickname',text:'I was known as "The Non-Flying Dutchman" because I refused to board aeroplanes.'},{cat:'Club',text:'I spent 11 years at Arsenal, becoming one of the all-time greats.'},{cat:'Goal',text:'My touch and finish against Newcastle in 2002 is widely considered the greatest Premier League goal.'},{cat:'Country',text:'I was a key part of the Netherlands teams of the 1990s and 1998 World Cup.'},{cat:'Name',text:'My parents named me after Dennis Law and Johan Cruyff.'}],
   options:['Dennis Bergkamp','Patrick Kluivert','Marc Overmars','Arjen Robben']},
  {id:'kaka',name:'Kaká',emoji:'🇧🇷',nation:'Brazil',rarity:'gold',type:'player',stats:{goals:205,trophies:14,era:'2001-2017'},bio:'2007 Ballon d\'Or winner. Inspired AC Milan to Champions League glory.',
   clues:[{cat:'Birthplace',text:'I was born in Brasília, Brazil in 1982.'},{cat:'Milan',text:"I was the heartbeat of AC Milan's 2007 Champions League winning team."},{cat:'Award',text:"I won the Ballon d'Or in 2007 — the last Brazilian to win it before Messi's dominance."},{cat:'Record',text:'My 2009 move to Real Madrid was, at the time, the most expensive transfer in history.'},{cat:'Faith',text:'I am a devout Christian and always lifted my shirt to reveal my religious message after scoring.'}],
   options:['Kaká','Robinho','Júlio César','Lúcio']},
  {id:'suarez',name:'Luis Suárez',emoji:'🇺🇾',nation:'Uruguay',rarity:'silver',type:'player',stats:{goals:508,trophies:25,era:'2003-'},bio:'One of the most prolific and controversial strikers of his generation.',
   clues:[{cat:'Nationality',text:'I am from Salto, Uruguay and am one of the greatest strikers in South American history.'},{cat:'PL season',text:'I scored 31 Premier League goals in a single season for Liverpool in 2013-14.'},{cat:'Controversy',text:'I was banned multiple times for biting opponents during matches.'},{cat:'World Cup',text:'I was banned for biting Chiellini at the 2014 World Cup — Uruguay were eliminated.'},{cat:'Barcelona',text:'I formed the deadly "MSN" trio at Barcelona with Messi and Neymar.'}],
   options:['Luis Suárez','Edinson Cavani','Diego Forlán','Álvaro González']},
  {id:'neymar',name:'Neymar Jr.',emoji:'🇧🇷',nation:'Brazil',rarity:'gold',type:'player',stats:{goals:445,trophies:26,era:'2009-'},bio:"Brazil's most expensive export. Most expensive transfer in football history.",
   clues:[{cat:'Birthplace',text:'I was born in Mogi das Cruzes, São Paulo, Brazil in 1992.'},{cat:'Barcelona',text:'I was part of the "MSN" trio at Barcelona alongside Messi and Suárez.'},{cat:'Transfer',text:'My 2017 move to PSG for €222 million is the most expensive transfer ever recorded.'},{cat:'Skill',text:'I am famous for my flair, skill moves, and ability to dribble past defenders at pace.'},{cat:'Injury',text:'My 2014 World Cup ended with a fractured vertebra — Brazil lost 7-1 to Germany without me.'}],
   options:['Neymar Jr.','Gabriel Jesus','Philippe Coutinho','Marquinhos']},
  {id:'pirlo',name:'Andrea Pirlo',emoji:'🇮🇹',nation:'Italy',rarity:'silver',type:'player',stats:{goals:100,trophies:18,era:'95-2017'},bio:'The Architect. The most elegant deep-lying playmaker of his era.',
   clues:[{cat:'Nickname',text:'I was known as "Il Maestro" or "The Architect" for my dictating of play.'},{cat:'Club',text:'I won four Serie A titles with both AC Milan and Juventus.'},{cat:'World Cup',text:'I won the 2006 World Cup with Italy, anchoring the midfield throughout.'},{cat:'Style',text:'I was famous for my passing range, vision, free kicks, and calm under pressure.'},{cat:'MLS',text:'I ended my career at New York City FC in Major League Soccer.'}],
   options:['Andrea Pirlo','Gennaro Gattuso','Daniele De Rossi','Massimo Ambrosini']},
  {id:'drogba',name:'Didier Drogba',emoji:'🇨🇮',nation:'Ivory Coast',rarity:'silver',type:'player',stats:{goals:360,trophies:14,era:'98-2018'},bio:'Chelsea legend. His last-minute equaliser in the 2012 UCL final is iconic.',
   clues:[{cat:'Birthplace',text:'I was born in Abidjan, Ivory Coast in 1978 but grew up partly in France.'},{cat:'Chelsea',text:"I am Chelsea's second all-time top scorer and their greatest cult hero."},{cat:'UCL',text:'I scored in the 88th minute to equalise in the 2012 Champions League final, then scored the winning penalty.'},{cat:'Impact',text:'I helped broker a ceasefire in the Ivory Coast civil war in 2005.'},{cat:'Africa',text:'I was named the African Footballer of the Year four times.'}],
   options:['Didier Drogba',"Samuel Eto'o",'Michael Essien','Yaya Touré']},
  {id:'lampard',name:'Frank Lampard',emoji:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',nation:'England',rarity:'bronze',type:'player',stats:{goals:268,trophies:11,era:'95-2017'},bio:'Chelsea\'s greatest midfielder. Most goals by a midfielder in Premier League history.',
   clues:[{cat:'Club',text:'I am Chelsea\'s greatest ever central midfielder, spending 13 years at the club.'},{cat:'Goals',text:'I hold the record for most Premier League goals by a midfielder — 177.'},{cat:'UCL',text:'I scored in the 2012 Champions League final to help Chelsea to victory.'},{cat:'Award',text:'I was named FWA Footballer of the Year in 2005.'},{cat:'Nickname',text:'I was nicknamed "Super Frank" by Chelsea fans.'}],
   options:['Frank Lampard','John Terry','Michael Ballack','Joe Cole']},
  {id:'terry',name:'John Terry',emoji:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',nation:'England',rarity:'bronze',type:'player',stats:{goals:78,trophies:19,era:'98-2018'},bio:'Chelsea captain, leader, legend. The most decorated English defender of his era.',
   clues:[{cat:'Club',text:'I captained Chelsea for over a decade, never leaving as first-choice centre-back.'},{cat:'Captain',text:'I am the only Chelsea player to lift the Champions League trophy — even though I was suspended for the final.'},{cat:'Honours',text:'I won 5 Premier League titles and 5 FA Cups with Chelsea.'},{cat:'England',text:'I was England captain from 2006 to 2012, playing over 70 times for my country.'},{cat:'Ironman',text:'I was renowned for playing through extraordinary pain and injury.'}],
   options:['John Terry','Rio Ferdinand','Sol Campbell','Jamie Carragher']},
  {id:'scholes',name:'Paul Scholes',emoji:'🏴󠁧󠁢󠁥󠁮󠁧󠁿',nation:'England',rarity:'bronze',type:'player',stats:{goals:155,trophies:25,era:'93-2013'},bio:'One of the greatest midfielders of his generation. One-club man at Manchester United.',
   clues:[{cat:'Club',text:'I spent my entire 20-year career at Manchester United — a true one-club man.'},{cat:'Praise',text:'Xavi Hernández called me "the best midfielder of my generation".'},{cat:'Goals',text:'I was famous for my long-range shooting, including legendary thunderbolts.'},{cat:'Retirement',text:'I retired in 2011 before returning just 8 months later for one final season.'},{cat:'Honours',text:'I won 11 Premier League titles and 2 Champions Leagues with Manchester United.'}],
   options:['Paul Scholes','Ryan Giggs','Roy Keane','Nicky Butt']},
  {id:'vieira',name:'Patrick Vieira',emoji:'🇫🇷',nation:'France',rarity:'bronze',type:'player',stats:{goals:65,trophies:15,era:'93-2011'},bio:'Arsenal\'s greatest captain. The warrior engine of both Arsenal and World Cup-winning France.',
   clues:[{cat:'Birthplace',text:'I was born in Dakar, Senegal, and played for France from 1997.'},{cat:'Arsenal',text:'I captained Arsenal through their most successful period, including the Invincibles season.'},{cat:'France',text:'I was in the France squad that won the 1998 World Cup and Euro 2000.'},{cat:'Style',text:'I was known for my physical power, intensity, and winning mentality in midfield.'},{cat:'Rivalry',text:'My midfield battles with Roy Keane are considered Premier League folklore.'}],
   options:['Patrick Vieira','Emmanuel Petit','Robert Pirès','Sylvain Wiltord']},
  {id:'cafu',name:'Cafu',emoji:'🇧🇷',nation:'Brazil',rarity:'bronze',type:'player',stats:{goals:22,trophies:11,era:'88-2008'},bio:'The greatest right-back of all time. Won two World Cups with Brazil.',
   clues:[{cat:'Birthplace',text:'I was born in Itaquera, São Paulo, Brazil in 1970.'},{cat:'World Cup',text:'I won the World Cup with Brazil in both 1994 and 2002 — captaining the team in 2002.'},{cat:'Club',text:'I played for São Paulo, Roma, Parma, and ended my career at AC Milan.'},{cat:'Style',text:'I was famous for my tireless running, overlapping from right-back, and never stopping.'},{cat:'Honour',text:'I was named in the FIFA World Cup All-Star Team three times.'}],
   options:['Cafu','Roberto Carlos','Gilberto Silva','Ronaldo']},
  {id:'maldini',name:'Paolo Maldini',emoji:'🇮🇹',nation:'Italy',rarity:'legend',type:'player',stats:{goals:33,trophies:29,era:'84-2009'},bio:'The greatest defender ever. Spent his entire 25-year career at AC Milan.',
   clues:[{cat:'Club',text:'I spent my entire 25-year career at AC Milan — 902 appearances.'},{cat:'UCL',text:'I won the Champions League five times with AC Milan.'},{cat:'Position',text:'I was a left-back who became the world\'s greatest defensive player.'},{cat:'Italy',text:'I played 126 times for Italy, captaining the national team.'},{cat:'Legacy',text:'When I was appointed as Technical Director at AC Milan in 2018, I was cheered by fans worldwide.'}],
   options:['Paolo Maldini','Franco Baresi','Alessandro Nesta','Costacurta']},
  {id:'carlos',name:'Roberto Carlos',emoji:'🇧🇷',nation:'Brazil',rarity:'silver',type:'player',stats:{goals:117,trophies:18,era:'90-2011'},bio:'The most explosive left-back ever. His free kick against France defied physics.',
   clues:[{cat:'Club',text:'I played for Real Madrid for 11 years — one of the great one-club eras.'},{cat:'Free kick',text:'My free kick against France in 1997 curved impossibly before entering the net — physicists were baffled.'},{cat:'Pace',text:'I was officially measured running at 35.5 km/h — extraordinary for a defender.'},{cat:'World Cup',text:'I won the 2002 World Cup with Brazil.'},{cat:'Style',text:'I was famous for bomb runs down the left flank and ferocious shot power.'}],
   options:['Roberto Carlos','Cafu','Cafú','Ronaldo Nazário']},
  {id:'tevez',name:'Carlos Tevez',emoji:'🇦🇷',nation:'Argentina',rarity:'bronze',type:'player',stats:{goals:321,trophies:17,era:'2001-2021'},bio:'El Apache. Relentless warrior striker who won trophies everywhere he went.',
   clues:[{cat:'Birthplace',text:'I grew up in poverty in Fuerte Apache, Buenos Aires — hence my nickname "El Apache".'},{cat:'Prem',text:'I played for West Ham, Manchester United, and Manchester City in the Premier League.'},{cat:'Controversy',text:'I caused controversy at Man City by apparently refusing to warm up during a UCL match.'},{cat:'Argentina',text:'I represented Argentina at the 2004 Olympics, winning gold.'},{cat:'Return',text:'I returned to Boca Juniors multiple times throughout my career.'}],
   options:['Carlos Tevez','Sergio Agüero','Gonzalo Higuain','Nicolás Gaitán']},
  {id:'bale',name:'Gareth Bale',emoji:'🏴󠁧󠁢󠁷󠁬󠁳󠁿',nation:'Wales',rarity:'silver',type:'player',stats:{goals:242,trophies:20,era:'2003-2023'},bio:"Wales's greatest player. Scored stunning Champions League final goals for Real Madrid.",
   clues:[{cat:'Nation',text:'I became the most celebrated Welsh footballer in history.'},{cat:'Transfer',text:'I joined Real Madrid from Tottenham in 2013 for what was then a world record fee.'},{cat:'UCL final',text:'I came off the bench in the 2018 Champions League final and scored an outrageous bicycle kick.'},{cat:'Olympics',text:'I helped Wales qualify for Euro 2016 and reach the semi-finals — a historic achievement.'},{cat:'Golf',text:'I was famously photographed with a flag reading "Wales. Golf. Madrid. In that order."'}],
   options:['Gareth Bale','Aaron Ramsey','Joe Allen','Chris Coleman']},
  {id:'eto_o',name:"Samuel Eto'o",emoji:'🇨🇲',nation:'Cameroon',rarity:'silver',type:'player',stats:{goals:468,trophies:24,era:'97-2019'},bio:'Three-time African Footballer of the Year. Treble winner with both Barcelona and Inter.',
   clues:[{cat:'Nation',text:'I am from Cameroon and the most decorated African footballer of my generation.'},{cat:'Africa',text:'I won the African Footballer of the Year award four times.'},{cat:'Barcelona',text:'I won the treble with FC Barcelona in 2009 under Pep Guardiola.'},{cat:'Inter',text:'I won the treble with Inter Milan just a year later under Mourinho — unique achievement.'},{cat:'Goals',text:'I scored 18+ goals in four consecutive Champions League seasons.'}],
   options:["Samuel Eto'o","Didier Drogba","Michael Essien","Yaya Touré"]},
];
// Randomise options + store correct index
FOOTBALLER_CARDS.forEach(card => {
  const correctAnswer = card.name;

  for (let i = card.options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [card.options[i], card.options[j]] = [card.options[j], card.options[i]];
  }

  card.correctIndex = card.options.indexOf(correctAnswer);
});
// ════════════════════════════════════════════
// ════════════════════════════════════════════
// RANKED POOL — DIFFICULTY TIERED BY RANK
// Bronze=easy, Silver=medium, Gold=hard,
// Platinum=very_hard, Diamond=impossible, Legend=legend
// ════════════════════════════════════════════

const RANKED_POOL = [

  // ─── EASY (Bronze rank questions) ────────────────────────────────────────

  {q:"Which country has won the most FIFA World Cup titles?",opts:["Germany","Italy","Brazil","Argentina"],ans:2,diff:'easy',fact:"Brazil have won five World Cups: 1958, 1962, 1970, 1994, 2002."},
  {q:"Who holds the record for most Ballon d'Or wins?",opts:["Cristiano Ronaldo","Zinedine Zidane","Lionel Messi","Ronaldo Nazário"],ans:2,diff:'easy',fact:"Lionel Messi has won the Ballon d'Or a record 8 times."},
  {q:"Which team went an entire Premier League season unbeaten?",opts:["Chelsea","Manchester United","Arsenal","Liverpool"],ans:2,diff:'easy',fact:"Arsenal's 'Invincibles' went 38 games unbeaten in 2003-04."},
  {q:"Who scored a famous 'Hand of God' goal at the 1986 World Cup?",opts:["Ronaldo","Zidane","Maradona","Pelé"],ans:2,diff:'easy',fact:"Maradona punched the ball into England's net in the 1986 quarter-final."},
  {q:"Which country won the 2022 FIFA World Cup?",opts:["France","Brazil","Argentina","Croatia"],ans:2,diff:'easy',fact:"Argentina beat France on penalties after a thrilling 3-3 draw."},
  {q:"Who is the Premier League's all-time top goal scorer?",opts:["Wayne Rooney","Thierry Henry","Alan Shearer","Sergio Agüero"],ans:2,diff:'easy',fact:"Alan Shearer scored 260 Premier League goals, mainly for Blackburn and Newcastle."},
  {q:"Which club has won the most UEFA Champions League titles?",opts:["AC Milan","Liverpool","Real Madrid","Bayern Munich"],ans:2,diff:'easy',fact:"Real Madrid have won the Champions League a record 15 times."},
  {q:"Who is the all-time top scorer in World Cup history?",opts:["Ronaldo Nazário","Miroslav Klose","Gerd Müller","Pelé"],ans:1,diff:'easy',fact:"Miroslav Klose scored 16 World Cup goals across four tournaments."},
  {q:"Which La Liga club has the nickname 'Los Blancos'?",opts:["Atlético Madrid","Sevilla","Valencia","Real Madrid"],ans:3,diff:'easy',fact:"Real Madrid are known as 'Los Blancos' (The Whites) for their iconic all-white kit."},
  {q:"What country does Cristiano Ronaldo play for internationally?",opts:["Spain","Brazil","Portugal","France"],ans:2,diff:'easy',fact:"Ronaldo has represented Portugal internationally since 2003."},
  {q:"In which city is the famous Camp Nou stadium?",opts:["Madrid","Valencia","Seville","Barcelona"],ans:3,diff:'easy',fact:"Camp Nou is Barcelona's iconic home stadium, opened in 1957."},
  {q:"Which club did Lionel Messi spend most of his career at?",opts:["PSG","Inter Miami","Real Madrid","Barcelona"],ans:3,diff:'easy',fact:"Messi spent 17 years at FC Barcelona from age 13 before leaving in 2021."},
  {q:"How often is the FIFA World Cup held?",opts:["Every 2 years","Every 3 years","Every 4 years","Every 5 years"],ans:2,diff:'easy',fact:"The FIFA World Cup is held every four years, with the next edition in 2026."},
  {q:"Which nation won the 2018 FIFA World Cup?",opts:["Croatia","Belgium","England","France"],ans:3,diff:'easy',fact:"France beat Croatia 4-2 in the 2018 World Cup final in Moscow."},
  {q:"Who is known as 'The Special One'?",opts:["Pep Guardiola","Jürgen Klopp","Carlo Ancelotti","José Mourinho"],ans:3,diff:'easy',fact:"Mourinho gave himself the nickname at his first Chelsea press conference in 2004."},
  {q:"Which country does Erling Haaland represent internationally?",opts:["Denmark","Sweden","Norway","Finland"],ans:2,diff:'easy',fact:"Despite being born in Leeds, Haaland chose to represent Norway."},
  {q:"What colour are Barcelona's home shirts?",opts:["All red","Red and blue stripes","Blue and white","Green and white"],ans:1,diff:'easy',fact:"Barcelona's iconic blaugrana (blue and red stripes) kit has remained largely unchanged since 1910."},
  {q:"Which club does Kylian Mbappé currently play for?",opts:["PSG","Bayern Munich","Manchester City","Real Madrid"],ans:3,diff:'easy',fact:"Mbappé joined Real Madrid on a free transfer in the summer of 2024."},
  {q:"How many players are on a football pitch per side?",opts:["9","10","11","12"],ans:2,diff:'easy',fact:"Each team fields 11 players — 10 outfield players plus a goalkeeper."},
  {q:"Who won the 2023-24 Premier League title?",opts:["Arsenal","Liverpool","Chelsea","Manchester City"],ans:3,diff:'easy',fact:"Manchester City won their fourth consecutive Premier League title in 2023-24."},

  // ─── MEDIUM (Silver rank questions) ──────────────────────────────────────

  {q:"Who managed Arsenal's 'Invincibles' in 2003-04?",opts:["Arsène Wenger","Unai Emery","Mikel Arteta","George Graham"],ans:0,diff:'medium',fact:"Wenger led Arsenal to a 38-game unbeaten season — a record that still stands."},
  {q:"Who is the all-time top scorer in Champions League history?",opts:["Lionel Messi","Robert Lewandowski","Cristiano Ronaldo","Karim Benzema"],ans:2,diff:'medium',fact:"Cristiano Ronaldo holds the record with 140 Champions League goals."},
  {q:"Who won the Golden Boot at the 2018 World Cup?",opts:["Cristiano Ronaldo","Harry Kane","Kylian Mbappé","Romelu Lukaku"],ans:1,diff:'medium',fact:"Harry Kane scored 6 goals to win the Golden Boot at Russia 2018."},
  {q:"Which player is known as 'El Niño' in Spanish football?",opts:["Fernando Torres","David Villa","Iker Casillas","Andrés Iniesta"],ans:0,diff:'medium',fact:"Fernando Torres earned the nickname 'The Kid' at Atlético Madrid."},
  {q:"In what year was the Premier League founded?",opts:["1988","1990","1992","1995"],ans:2,diff:'medium',fact:"The Premier League was founded on 20 February 1992."},
  {q:"What year did Germany win their fourth World Cup title?",opts:["2002","2006","2010","2014"],ans:3,diff:'medium',fact:"Germany won the 2014 World Cup in Brazil, defeating the hosts 7–1 in the semi-final."},
  {q:"Who scored the most goals in a single Premier League season?",opts:["Mohamed Salah","Alan Shearer","Erling Haaland","Cristiano Ronaldo"],ans:2,diff:'medium',fact:"Erling Haaland broke the record with 36 Premier League goals in 2022-23."},
  {q:"Who is the only defender to win FIFA World Player of the Year?",opts:["Lionel Messi","Zinedine Zidane","Kaká","Fabio Cannavaro"],ans:3,diff:'medium',fact:"Fabio Cannavaro won the 2006 FIFA World Player of the Year after captaining Italy to glory."},
  {q:"Who scored the winning goal in the 1999 Champions League final?",opts:["Andy Cole","Ole Gunnar Solskjær","Teddy Sheringham","Dwight Yorke"],ans:1,diff:'medium',fact:"Ole Gunnar Solskjær scored the dramatic injury-time winner for Manchester United."},
  {q:"Which club has won the most Premier League titles?",opts:["Liverpool","Chelsea","Arsenal","Manchester United"],ans:3,diff:'medium',fact:"Manchester United have won 20 league titles, 13 under Sir Alex Ferguson."},
  {q:"Which Brazilian club did Neymar come through before joining Barcelona?",opts:["Flamengo","Corinthians","Santos","Grêmio"],ans:2,diff:'medium',fact:"Neymar rose through the Santos academy before his €88m move to Barcelona."},
  {q:"Which country hosted the 2002 FIFA World Cup alongside Japan?",opts:["China","South Korea","Australia","Malaysia"],ans:1,diff:'medium',fact:"South Korea and Japan co-hosted the 2002 World Cup — the first held in Asia."},
  {q:"Who is the all-time top scorer in Bundesliga history?",opts:["Gerd Müller","Karl-Heinz Rummenigge","Robert Lewandowski","Oliver Kahn"],ans:2,diff:'medium',fact:"Robert Lewandowski scored 312 Bundesliga goals, surpassing Gerd Müller's long-standing record."},
  {q:"Which nation won Euro 2020 (played in 2021)?",opts:["England","France","Italy","Spain"],ans:2,diff:'medium',fact:"Italy beat England on penalties at Wembley to win their second European Championship."},
  {q:"Which goalkeeper holds the record for most clean sheets in PL history?",opts:["David De Gea","Petr Čech","Edwin van der Sar","Peter Schmeichel"],ans:1,diff:'medium',fact:"Petr Čech holds the record with 202 clean sheets across his Premier League career."},
  {q:"Who was the first player to win the PL with three different clubs?",opts:["Nicolas Anelka","Ashley Cole","Robert Pires","Marc Overmars"],ans:0,diff:'medium',fact:"Nicolas Anelka won the title with Arsenal (1998), Chelsea (2010) and Man City (2012)."},
  {q:"Which club did Zinedine Zidane win La Liga with as a manager?",opts:["France","Juventus","Real Madrid","Marseille"],ans:2,diff:'medium',fact:"Zidane won La Liga twice as Real Madrid manager (2017 and 2020)."},
  {q:"How many goals did Ronaldo score in his debut Real Madrid season?",opts:["26","30","33","36"],ans:2,diff:'medium',fact:"Cristiano Ronaldo scored 33 goals in all competitions in his debut 2009-10 season at Real Madrid."},
  {q:"Which club did Steven Gerrard spend his entire English career at?",opts:["Everton","Manchester City","Liverpool","Chelsea"],ans:2,diff:'medium',fact:"Gerrard was a one-club man at Liverpool from 1998 to 2015 in English football."},
  {q:"Who holds the record for most goals in a single La Liga season?",opts:["Cristiano Ronaldo","Lionel Messi","Telmo Zarra","Hugo Sánchez"],ans:1,diff:'medium',fact:"Lionel Messi scored 50 La Liga goals in the 2011-12 season — a record that still stands."},

  // ─── HARD (Gold rank questions) ──────────────────────────────────────────

  {q:"Who scored the first ever Premier League goal?",opts:["Teddy Sheringham","Brian Deane","Mark Hughes","Eric Cantona"],ans:1,diff:'hard',fact:"Brian Deane scored for Sheffield United against Manchester United on 15 August 1992."},
  {q:"Which player has appeared in the most World Cup tournaments?",opts:["Diego Maradona","Lothar Matthäus","Paolo Maldini","Cafu"],ans:1,diff:'hard',fact:"Lothar Matthäus appeared in five World Cups between 1982 and 1998."},
  {q:"Who is the only goalkeeper to win the Ballon d'Or?",opts:["Gordon Banks","Gianluigi Buffon","Lev Yashin","Peter Shilton"],ans:2,diff:'hard',fact:"Lev Yashin won the 1963 Ballon d'Or — the only goalkeeper ever to do so."},
  {q:"Who scored the fastest goal in Champions League history?",opts:["Roy Makaay","Paolo Maldini","Clarence Seedorf","Alessandro Del Piero"],ans:0,diff:'hard',fact:"Roy Makaay scored for Bayern vs Real Madrid in just 10.12 seconds in 2007."},
  {q:"Who was the first African player to win the Ballon d'Or?",opts:["George Weah","Samuel Eto'o","Didier Drogba","Yaya Touré"],ans:0,diff:'hard',fact:"George Weah won the Ballon d'Or in 1995 — a historic first for African football."},
  {q:"Who scored the winning penalty in the 2006 World Cup final for Italy?",opts:["Alessandro Del Piero","Fabio Grosso","Francesco Totti","Luca Toni"],ans:1,diff:'hard',fact:"Fabio Grosso scored the decisive fifth penalty to win the World Cup for Italy."},
  {q:"Which nation won the inaugural UEFA European Championship in 1960?",opts:["West Germany","Czechoslovakia","Spain","Soviet Union"],ans:3,diff:'hard',fact:"The Soviet Union won the first UEFA European Championship, defeating Yugoslavia 2–1."},
  {q:"Who is the youngest player to score in a World Cup final?",opts:["Pelé","Kylian Mbappé","Lionel Messi","Neymar"],ans:0,diff:'hard',fact:"Pelé scored in the 1958 World Cup final for Brazil at just 17 years old."},
  {q:"Who holds the record for most goals in a single World Cup tournament?",opts:["Eusébio","Just Fontaine","Gerd Müller","Sandor Kocsis"],ans:1,diff:'hard',fact:"Just Fontaine scored 13 goals for France at the 1958 World Cup."},
  {q:"Which goalkeeper played the most World Cup matches?",opts:["Gianluigi Buffon","Dino Zoff","Sepp Maier","Essam El-Hadary"],ans:0,diff:'hard',fact:"Gianluigi Buffon appeared in 17 World Cup matches across his Italy career."},
  {q:"Who won the all-time Premier League assist record?",opts:["Frank Lampard","Ryan Giggs","Cesc Fàbregas","Kevin De Bruyne"],ans:1,diff:'hard',fact:"Ryan Giggs leads with 162 Premier League assists, all for Manchester United."},
  {q:"Who scored the fastest hat-trick in Premier League history?",opts:["Michael Owen","Robbie Fowler","Sadio Mané","Harry Kane"],ans:2,diff:'hard',fact:"Sadio Mané scored a hat-trick in 4 mins 33 secs for Southampton vs Aston Villa in 2015."},
  {q:"Which Italian club did Cristiano Ronaldo play for 2018–2021?",opts:["AC Milan","Inter Milan","Napoli","Juventus"],ans:3,diff:'hard',fact:"Ronaldo joined Juventus in 2018 for €100m, winning two Serie A titles before leaving."},
  {q:"Who holds the record for most appearances in the Premier League?",opts:["Ryan Giggs","Gareth Barry","David James","Wayne Rooney"],ans:1,diff:'hard',fact:"Gareth Barry made 653 Premier League appearances across his career."},
  {q:"In which year did Pelé score his 1,000th career goal?",opts:["1967","1968","1969","1970"],ans:2,diff:'hard',fact:"Pelé scored his 1,000th career goal from the penalty spot against Vasco da Gama on 19 November 1969."},
  {q:"Which English club did Eric Cantona play for before Manchester United?",opts:["Chelsea","Aston Villa","Sheffield Wednesday","Leeds United"],ans:3,diff:'hard',fact:"Cantona played for Leeds United before his controversial £1.2m move to Man United in 1992."},
  {q:"Who was sent off in the 2006 World Cup final?",opts:["Materazzi","Zidane","Malouda","Cannavaro"],ans:1,diff:'hard',fact:"Zinedine Zidane was sent off for headbutting Marco Materazzi — his last act in professional football."},
  {q:"Which club has never been relegated from La Liga?",opts:["Barcelona","Real Madrid","Athletic Bilbao","Sevilla"],ans:2,diff:'hard',fact:"Athletic Bilbao have played every season in La Liga since its founding in 1929."},
  {q:"Which club completed the first treble in men's football?",opts:["Celtic 1967","Ajax 1972","Barcelona 2009","Manchester United 1999"],ans:0,diff:'hard',fact:"Celtic's 'Lisbon Lions' won every competition they entered in 1966-67."},
  {q:"How many La Liga titles did Ronaldo win with Real Madrid?",opts:["1","2","3","4"],ans:1,diff:'hard',fact:"Ronaldo won La Liga twice with Real Madrid in 2012 and 2017."},

  // ─── VERY HARD (Platinum rank questions) ─────────────────────────────────

  {q:"Who holds the record for most goals in a single World Cup match?",opts:["Gerd Müller","Oleg Salenko","Eusébio","Gary Lineker"],ans:1,diff:'very_hard',fact:"Oleg Salenko scored 5 goals against Cameroon for Russia at the 1994 World Cup."},
  {q:"Which player appeared in the most Champions League finals?",opts:["Francisco Gento","Cristiano Ronaldo","Paolo Maldini","Lionel Messi"],ans:0,diff:'very_hard',fact:"Francisco Gento won 6 European Cups with Real Madrid between 1956 and 1966."},
  {q:"What is the record winning margin in a World Cup match?",opts:["9–0","10–1","13–0","14–0"],ans:1,diff:'very_hard',fact:"Hungary defeated El Salvador 10–1 in the 1982 World Cup group stage."},
  {q:"Who is the youngest goalscorer in Champions League history?",opts:["Ansu Fati","Peter Ofori-Quaye","Bojan Krkić","Youssoufa Moukoko"],ans:1,diff:'very_hard',fact:"Peter Ofori-Quaye scored for Rosenborg in 1996 at just 17 years and 195 days old."},
  {q:"Which player has won the most trophies in football history?",opts:["Lionel Messi","Dani Alves","Cristiano Ronaldo","Sergio Ramos"],ans:1,diff:'very_hard',fact:"Dani Alves won 43 major trophies across his career — the most by any footballer."},
  {q:"Who is the only player to win three World Cup tournaments?",opts:["Cafu","Franz Beckenbauer","Pelé","Ronaldo"],ans:2,diff:'very_hard',fact:"Pelé is the only player to win the World Cup three times (1958, 1962, 1970)."},
  {q:"Which manager has won the most Champions League titles?",opts:["Alex Ferguson","Carlo Ancelotti","Pep Guardiola","Zinedine Zidane"],ans:1,diff:'very_hard',fact:"Carlo Ancelotti has won the Champions League four times: 2003, 2007, 2014, 2022."},
  {q:"Which country has won the Copa América the most times?",opts:["Brazil","Argentina","Uruguay","Chile"],ans:2,diff:'very_hard',fact:"Uruguay have won the Copa América 15 times — more than any other nation."},
  {q:"Who was the first player to score five goals in a single Champions League match?",opts:["Cristiano Ronaldo","Lionel Messi","Luiz Adriano","Marco van Basten"],ans:2,diff:'very_hard',fact:"Luiz Adriano scored five goals for Shakhtar Donetsk against BATE Borisov in 2014."},
  {q:"Which player scored the fastest goal in a Champions League final?",opts:["Roy Makaay","Paolo Maldini","Sergio Ramos","Didier Drogba"],ans:1,diff:'very_hard',fact:"Paolo Maldini scored for AC Milan after just 51 seconds in the 2005 UCL final vs Liverpool."},
  {q:"Which club holds the record for most goals in a single UCL campaign?",opts:["Bayern Munich 2019-20","Real Madrid 2021-22","Barcelona 1999-00","Manchester City 2022-23"],ans:0,diff:'very_hard',fact:"Bayern Munich scored 43 goals during their 2019-20 Champions League winning campaign."},
  {q:"In what year was the UEFA Champions League rebranded from the European Cup?",opts:["1990","1991","1992","1993"],ans:2,diff:'very_hard',fact:"The European Cup was rebranded as the UEFA Champions League in the 1992-93 season."},
  {q:"Which player scored in seven consecutive Champions League matches in one season?",opts:["Cristiano Ronaldo","Karim Benzema","Ruud van Nistelrooy","Lionel Messi"],ans:2,diff:'very_hard',fact:"Ruud van Nistelrooy scored in 7 consecutive UCL matches for Manchester United in 2002-03."},
  {q:"Which World Cup had the highest average goals per game of the modern era?",opts:["1954","1970","1982","1998"],ans:0,diff:'very_hard',fact:"The 1954 World Cup averaged 5.38 goals per game — an all-time record."},
  {q:"Which English club won the Champions League despite finishing 5th in their league?",opts:["Chelsea","Liverpool 2004-05","Manchester United","Nottingham Forest"],ans:1,diff:'very_hard',fact:"Liverpool qualified as defending champions in 2004-05 and won it in Istanbul."},
  {q:"Who is the youngest player to score in El Clásico?",opts:["Lamine Yamal","Raúl","Vinícius Júnior","Bojan Krkić"],ans:0,diff:'very_hard',fact:"Lamine Yamal scored for Barcelona against Real Madrid at just 17 years old."},
  {q:"What was the scoreline of the biggest World Cup semi-final defeat ever?",opts:["5-0","7-1","6-0","4-0"],ans:1,diff:'very_hard',fact:"Germany beat Brazil 7-1 in Belo Horizonte at the 2014 World Cup — the Mineirazo."},
  {q:"Who holds the Bundesliga record for most goals in a single season?",opts:["Gerd Müller","Robert Lewandowski","Pierre-Emerick Aubameyang","Erling Haaland"],ans:1,diff:'very_hard',fact:"Robert Lewandowski scored 41 goals in the 2020-21 Bundesliga season, breaking Müller's 49-year-old record."},
  {q:"Which club held the record for most consecutive league titles before Man City?",opts:["Juventus","Lyon","Celtic","Ajax"],ans:1,diff:'very_hard',fact:"Olympique Lyonnais won 7 consecutive Ligue 1 titles from 2002 to 2008."},
  {q:"Who scored a hat-trick in under 3 minutes in a League Cup match?",opts:["Ian Rush","Robbie Fowler","Jermain Defoe","Emile Heskey"],ans:1,diff:'very_hard',fact:"Robbie Fowler scored three goals in 4 mins 33 secs for Liverpool vs Arsenal in 1994 — the fastest hat-trick in English football at the time."},

  // ─── IMPOSSIBLE (Diamond rank questions) ─────────────────────────────────

  {q:"What shirt number did Johan Cruyff refuse to wear at the 1974 World Cup?",opts:["12","13","14","15"],ans:1,diff:'impossible',fact:"Cruyff refused to wear #13, considered unlucky, and wore #14 instead — which became iconic."},
  {q:"Who holds the Serie A record for most goals in a single season?",opts:["Gabriel Batistuta","Gunnar Nordahl","Antonio Valentin Angelillo","Cristiano Ronaldo"],ans:2,diff:'impossible',fact:"Antonio Valentin Angelillo scored 33 Serie A goals for Inter Milan in 1958-59."},
  {q:"Who is the only player to win the World Cup and Champions League as both a player AND a coach?",opts:["Didier Deschamps","Fabio Capello","Johan Cruyff","Franz Beckenbauer"],ans:0,diff:'impossible',fact:"Deschamps won the World Cup as France captain (1998) and manager (2018)."},
  {q:"What year did football first appear in the Olympic Games?",opts:["1896","1900","1904","1908"],ans:1,diff:'impossible',fact:"Football made its Olympic debut at the 1900 Paris Games."},
  {q:"What is the record for most goals scored by a goalkeeper in a single professional season?",opts:["5","6","9","12"],ans:2,diff:'impossible',fact:"Brazilian goalkeeper Rogério Ceni scored 9 goals in a single season for São Paulo."},
  {q:"Which player scored the winning goal in EVERY knockout match of a single UCL campaign?",opts:["Cristiano Ronaldo 2017","Karim Benzema 2022","Fernando Morientes 2000","Emilio Butragueño 1986"],ans:1,diff:'impossible',fact:"Karim Benzema scored decisive goals in every UCL knockout round for Real Madrid's 2021-22 triumph."},
  {q:"Which nation appeared in a World Cup final having not played a single minute of qualifying?",opts:["Italy","France","West Germany","Spain"],ans:0,diff:'impossible',fact:"Italy were given a bye into the 1934 World Cup final as hosts — they went on to win it."},
  {q:"How many countries have ever won the FIFA World Cup?",opts:["6","7","8","9"],ans:2,diff:'impossible',fact:"Only 8 nations have won: Brazil, Germany, Italy, Argentina, France, Uruguay, England, Spain."},
  {q:"Who was the only non-European or South American player to win the Ballon d'Or before 2023?",opts:["George Weah — Liberia","Eusébio — Portugal","Samuel Eto'o — Cameroon","Didier Drogba — Ivory Coast"],ans:0,diff:'impossible',fact:"George Weah of Liberia won the 1995 Ballon d'Or — still the only African-born winner."},
  {q:"Which club did Pep Guardiola manage before Bayern Munich?",opts:["Spain national team","FC Barcelona B","Barcelona","Girona"],ans:2,diff:'impossible',fact:"Guardiola managed Barcelona's first team from 2008 to 2012 before joining Bayern Munich."},
  {q:"Who was the top scorer in the first-ever Premier League season 1992-93?",opts:["Alan Shearer","Les Ferdinand","Teddy Sheringham","Chris Sutton"],ans:2,diff:'impossible',fact:"Teddy Sheringham scored 22 goals for Tottenham to win the first Premier League Golden Boot."},
  {q:"How many red cards were shown in the entire 1998 FIFA World Cup?",opts:["16","22","17","28"],ans:1,diff:'impossible',fact:"The 1998 World Cup saw a record 22 red cards shown across 64 matches."},
  {q:"Which club did Ronaldo Nazário play for between Barça and Inter Milan?",opts:["Real Madrid","PSV","No club — direct move","Deportivo La Coruña"],ans:1,diff:'impossible',fact:"Ronaldo went from Barcelona (1996) to PSV Eindhoven briefly before joining Inter Milan."},
  {q:"Against which club did Wayne Rooney score his famous overhead kick for Man United?",opts:["Arsenal","Liverpool","Chelsea","Manchester City"],ans:3,diff:'impossible',fact:"Rooney's stunning bicycle kick against Manchester City in February 2011 is widely considered his greatest goal."},
  {q:"Which Italian city had TWO clubs in the same European Cup final?",opts:["Rome","Turin","Milan","Naples"],ans:2,diff:'impossible',fact:"AC Milan beat Inter Milan in the 2003 Champions League final — both clubs are from Milan."},
  {q:"How many World Cup qualifying matches did Brazil fail to win en route to 2022?",opts:["0 — won all 17","2","4","6"],ans:0,diff:'impossible',fact:"Brazil won all 17 of their CONMEBOL qualifying matches for the 2022 World Cup — a perfect record."},
  {q:"Who scored for Manchester United against Bayern in the 1999 UCL final as a substitute?",opts:["Ole Gunnar Solskjær only","Teddy Sheringham only","Both Sheringham and Solskjær","Andy Cole"],ans:2,diff:'impossible',fact:"Teddy Sheringham (90+1) and Ole Gunnar Solskjær (90+3) both scored as substitutes to win the treble."},
  {q:"Which club was famously relegated from the Bundesliga despite having a positive goal difference?",opts:["Hamburger SV","Hertha Berlin","Kaiserslautern","Stuttgart"],ans:0,diff:'impossible',fact:"Hamburger SV were relegated in 2018 after 55 consecutive seasons in the Bundesliga — the last founding member to go down."},
  {q:"Who holds the record for most international goals for a European nation?",opts:["Cristiano Ronaldo","Ali Daei","Miroslav Klose","Ferenc Puskás"],ans:0,diff:'impossible',fact:"Cristiano Ronaldo has scored 130+ international goals for Portugal — the all-time record for any nation."},
  {q:"Which club was stripped of the 1993 Champions League title due to match-fixing?",opts:["Juventus","Marseille","PSG","Lyon"],ans:1,diff:'impossible',fact:"Olympique de Marseille's 1993 UCL title was not stripped, but they were banned from defending due to the VA-OM match-fixing scandal."},

  // ─── LEGEND (Legend rank questions) ─────────────────────────────────────

  {q:"Who is the only player to have played in World Cup finals for two different countries?",opts:["Robert Prosinečki","Josip Weber","Luis Monti","Dejan Savićević"],ans:2,diff:'legend',fact:"Luis Monti played in the 1930 World Cup final for Argentina and the 1934 final for Italy."},
  {q:"What is the highest number of goals scored in a single Champions League group stage match?",opts:["7","8","9","11"],ans:3,diff:'legend',fact:"Feyenoord beat AS Trencin 11-0 in the 1986-87 European Cup — though in modern group stages, Bayer Leverkusen beat Feyenoord 6-0 in 2024 with 11 coming via aggregate."},
  {q:"Which player holds the record for the most UEFA Cup / Europa League goals all-time?",opts:["Henrik Larsson","Radamel Falcao","Jürgen Klinsmann","Aritz Aduriz"],ans:1,diff:'legend',fact:"Radamel Falcao scored 17 Europa League goals in a single campaign (2011-12) — the single-season record."},
  {q:"Which club did legendary Brazilian goalkeeper Rogério Ceni play his entire career at?",opts:["Flamengo","Santos","Vasco da Gama","São Paulo"],ans:3,diff:'legend',fact:"Rogério Ceni played 1,257 matches for São Paulo and scored 131 goals — all from free kicks and penalties."},
  {q:"Who scored the winning goal in the 1966 World Cup final for England?",opts:["Bobby Charlton","Geoff Hurst","Roger Hunt","Martin Peters"],ans:1,diff:'legend',fact:"Geoff Hurst scored a famous hat-trick, including the controversial third goal that bounced off the crossbar."},
  {q:"How many European Cup/UCL titles did Real Madrid win in their first six seasons of the competition?",opts:["3","4","5","6"],ans:2,diff:'legend',fact:"Real Madrid won the European Cup in its first five editions (1956–1960) and again in 1966 — six titles in 11 years."},
  {q:"Which two players shared the 2000 FIFA Player of the Century award?",opts:["Zidane & Ronaldo","Ronaldo & Maldini","Pelé & Maradona","Cruyff & Beckenbauer"],ans:2,diff:'legend',fact:"FIFA named both Pelé and Maradona joint FIFA Players of the Century in 2000 after a fan vote."},
  {q:"Who scored both goals for West Germany in the 1974 World Cup final against the Netherlands?",opts:["Gerd Müller & Breitner","Müller & Overath","Breitner & Hoeness","Müller & Sepp Maier"],ans:0,diff:'legend',fact:"Paul Breitner equalised from the penalty spot before Gerd Müller's winner gave West Germany the trophy."},
  {q:"Which nation has appeared in the most World Cup finals without winning?",opts:["Netherlands","Hungary","Czechoslovakia","Sweden"],ans:0,diff:'legend',fact:"The Netherlands have appeared in three World Cup finals (1974, 1978, 2010) without ever winning."},
  {q:"In which year was the offside rule last significantly changed to create the modern interpretation?",opts:["1990","1995","2003","2005"],ans:0,diff:'legend',fact:"The 1990 rule change gave attackers the benefit of the doubt — a player level with the last defender is onside."},
  {q:"Who managed the Netherlands to the 1974 World Cup final, introducing Total Football globally?",opts:["Rinus Michels","Johan Cruyff","Guus Hiddink","Louis van Gaal"],ans:0,diff:'legend',fact:"Rinus Michels, who also managed at Ajax and Barcelona, is widely credited as the father of Total Football."},
  {q:"Which club did AC Milan beat in the greatest Champions League group stage comeback — 4-0 down after the first leg?",opts:["Ajax","Deportivo La Coruña","Barcelona","Real Madrid"],ans:2,diff:'legend',fact:"AC Milan lost 4-0 to Barcelona in the 2012-13 UCL before winning the return leg 2-0 to go through on away goals."},
  {q:"Who scored a hat-trick in the 1966 World Cup final — the only one ever in a final?",opts:["Bobby Charlton","Roger Hunt","Martin Peters","Geoff Hurst"],ans:3,diff:'legend',fact:"Geoff Hurst scored three goals in England's 4-2 win over West Germany at Wembley on 30 July 1966."},
  {q:"What year did Hungary's 'Golden Team' suffer their shock World Cup final defeat despite being massive favourites?",opts:["1950","1952","1954","1958"],ans:2,diff:'legend',fact:"Hungary, unbeaten in four years, lost the 1954 World Cup final 3-2 to West Germany in the 'Miracle of Bern'."},
  {q:"Which player holds the record for most appearances in the Copa América?",opts:["Lionel Messi","Javier Mascherano","Sergio Livingstone","Ángel Di María"],ans:2,diff:'legend',fact:"Chilean goalkeeper Sergio Livingstone holds the record with 34 Copa América appearances across four tournaments (1941-1955)."},
  {q:"Which goalkeeper famously saved a penalty in a European Cup final without wearing gloves?",opts:["Lev Yashin","Dino Zoff","Pat Jennings","Sepp Maier"],ans:3,diff:'legend',fact:"Sepp Maier, Bayern Munich's legendary goalkeeper, saved a penalty in the 1974 European Cup final vs Atlético barehand."},
  {q:"In what minute did Istanbul's UCL final comeback begin when Liverpool were 3-0 down to AC Milan?",opts:["40th","42nd","54th","60th"],ans:2,diff:'legend',fact:"Steven Gerrard headed home in the 54th minute to spark the miracle comeback, with Liverpool scoring three goals in 6 minutes."},
  {q:"Who is the only manager to win the Champions League with three different clubs?",opts:["Carlo Ancelotti","Pep Guardiola","José Mourinho","No one — record not achieved"],ans:3,diff:'legend',fact:"No manager has won the Champions League with three different clubs. Ancelotti is closest with two (Milan, Real Madrid)."},
  {q:"Which team won the inaugural FIFA Club World Cup in 2000?",opts:["Manchester United","Real Madrid","Corinthians","Bayern Munich"],ans:2,diff:'legend',fact:"Corinthians of Brazil won the inaugural FIFA Club World Cup in 2000, held in Brazil."},
  {q:"Who scored a hat-trick in a World Cup semi-final aged 17 — one of the youngest ever?",opts:["Pelé","Kylian Mbappé","Cesc Fàbregas","Wayne Rooney"],ans:0,diff:'legend',fact:"Pelé scored a hat-trick against France in the 1958 World Cup semi-final at age 17 years and 244 days."},
];

// ════════════════════════════════════════════
// DIFFICULTY → RANK MAPPING
// Controls which questions appear at each rank
// ════════════════════════════════════════════
const DIFF_BY_RANK = {
  'Bronze':   ['easy'],
  'Silver':   ['easy', 'medium'],
  'Gold':     ['medium', 'hard'],
  'Platinum': ['hard', 'very_hard'],
  'Diamond':  ['very_hard', 'impossible'],
  'Legend':   ['impossible', 'legend'],
};

// XP per correct answer by difficulty
const DXPM = {
  easy: 8,
  medium: 12,
  hard: 16,
  very_hard: 20,
  impossible: 26,
  legend: 35,
};

// Display labels
const DLABEL = {
  easy: '⚽ Easy',
  medium: '🎯 Medium',
  hard: '🔥 Hard',
  very_hard: '💀 Very Hard',
  impossible: '☠️ Impossible',
  legend: '👑 LEGEND',
};

// CSS classes for diff badge
const DCLASS = {
  easy: 'diff-easy',
  medium: 'diff-medium',
  hard: 'diff-hard',
  very_hard: 'diff-very-hard',
  impossible: 'diff-impossible',
  legend: 'diff-legend',
};

// ════════════════════════════════════════════
// RANKED QUESTION SELECTOR
// Call this instead of slicing RANKED_POOL directly
// Returns 10 questions appropriate for the player's rank
// ════════════════════════════════════════════
function getRankedQuestions() {
  const rank = getRank(pd.xp);
  const allowedDiffs = DIFF_BY_RANK[rank.name] || ['easy'];
  const pool = RANKED_POOL.filter(q => allowedDiffs.includes(q.diff));
  // Shuffle and take 10 (or fewer if pool is small)
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(10, shuffled.length));
}

// ════════════════════════════════════════════
// CAREER PATH DATA
// ════════════════════════════════════════════
const CAREER_PATHS = {
  'pele': {
    phases:[
      {name:'Early Life',diff:'beginner',questions:[
        {q:"In which Brazilian city was Pelé born in 1940?",opts:["São Paulo","Três Corações","Rio de Janeiro","Salvador"],ans:1,fact:"Pelé was born in Três Corações ('Three Hearts') in the state of Minas Gerais."},
        {q:"What was Pelé's birth name?",opts:["Edson Arantes do Nascimento","Carlos Alberto Santos","João Pelé Silva","Marcos Pelé Costa"],ans:0,fact:"Pelé's real name is Edson Arantes do Nascimento."},
        {q:"At what age did Pelé turn professional?",opts:["14","15","16","17"],ans:1,fact:"Pelé signed his first professional contract with Santos FC at just 15 years old."},
      ]},
      {name:'Youth Career',diff:'youth',questions:[
        {q:"Which club did Pelé spend almost his entire career with?",opts:["Flamengo","Vasco da Gama","Santos FC","Botafogo"],ans:2,fact:"Pelé played for Santos FC from 1956 to 1974."},
        {q:"At what age did Pelé make his World Cup debut?",opts:["15","16","17","18"],ans:2,fact:"Pelé made his World Cup debut for Brazil in 1958 at just 17 years old."},
      ]},
      {name:'Professional',diff:'pro',questions:[
        {q:"How many World Cup goals did Pelé score across all tournaments?",opts:["8","10","12","15"],ans:1,fact:"Pelé scored 12 World Cup goals across the 1958, 1962, 1966, and 1970 tournaments."},
        {q:"Who did Pelé play his final two seasons for in the USA?",opts:["LA Galaxy","New York Cosmos","Chicago Fire","Dallas Tornado"],ans:1,fact:"Pelé played for the New York Cosmos from 1975 to 1977, helping popularise football in the US."},
        {q:"Against which country did Pelé score his 1,000th career goal?",opts:["Argentina","Uruguay","Vasco da Gama (club)","Paraguay"],ans:2,fact:"Pelé scored his 1,000th career goal against Vasco da Gama from the penalty spot in 1969."},
      ]},
      {name:'Peak / Prime',diff:'prime',questions:[
        {q:"Which World Cup is considered Pelé's greatest — when he wore the legendary No.10?",opts:["1958","1962","1966","1970"],ans:3,fact:"The 1970 Brazil team (including Pelé at 29) is widely considered the greatest World Cup team ever."},
        {q:"How many official career goals did Pelé score in total (RSSSF record)?",opts:["643","770","1283","1000"],ans:1,fact:"Pelé officially scored 770 goals in 831 official games — his most widely accepted record."},
      ]},
      {name:'Legacy',diff:'legend',questions:[
        {q:"What honour did FIFA bestow jointly on Pelé and Maradona in 2000?",opts:["World Cup Special Award","Player of the Century","Lifetime Achievement","Golden Ball"],ans:1,fact:"FIFA named both Pelé and Maradona co-winners of the FIFA Player of the Century award in 2000."},
        {q:"What role did Pelé hold for Brazil after retiring?",opts:["President","Minister of Sport","FIFA Ambassador","UEFA Advisor"],ans:1,fact:"Pelé served as Brazil's Extraordinary Minister of Sport from 1995 to 1998."},
        {q:"In which year did Pelé pass away?",opts:["2020","2021","2022","2023"],ans:2,fact:"Pelé passed away on 29 December 2022 at the age of 82 due to complications from colon cancer."},
      ]},
    ]
  },
  'maradona': {
    phases:[
      {name:'Early Life',diff:'beginner',questions:[
        {q:"In which neighbourhood of Buenos Aires was Maradona born?",opts:["Palermo","Recoleta","Villa Fiorito","San Telmo"],ans:2,fact:"Maradona grew up in Villa Fiorito, one of the poorest neighbourhoods in Buenos Aires."},
        {q:"At what age did Maradona make his professional debut for Argentinos Juniors?",opts:["14","15","16","17"],ans:1,fact:"Maradona debuted for Argentinos Juniors aged just 15 years and 11 months."},
        {q:"Which youth team did Maradona famously juggle a ball on television aged 8?",opts:["Boca Juniors","Los Cebollitas","Argentinos Juniors","Racing Club"],ans:1,fact:"Maradona amazed TV audiences juggling a ball at halftime for his youth team Los Cebollitas."},
      ]},
      {name:'Youth Career',diff:'youth',questions:[
        {q:"Which Argentine club did Maradona join from Argentinos Juniors in 1981?",opts:["River Plate","Independiente","San Lorenzo","Boca Juniors"],ans:3,fact:"Maradona joined his beloved Boca Juniors in 1981, winning the Argentine title in his first season."},
        {q:"To which Spanish club did Maradona move in 1982 for a then-world record fee?",opts:["Real Madrid","Atlético Madrid","Barcelona","Valencia"],ans:2,fact:"Barcelona paid $7.6 million for Maradona in 1982 — a world record at the time."},
      ]},
      {name:'Professional',diff:'pro',questions:[
        {q:"Which Italian club did Maradona join in 1984 in another record transfer?",opts:["Juventus","Inter Milan","Napoli","Roma"],ans:2,fact:"Maradona joined Napoli in 1984 for a world record $10.5 million fee."},
        {q:"How many Serie A titles did Maradona win with Napoli?",opts:["1","2","3","4"],ans:1,fact:"Maradona led Napoli to two Serie A titles (1987 and 1990) — the only Scudetti in their history."},
        {q:"Which team did Maradona lead to win the 1990 World Cup semi-final against the host nation?",opts:["Argentina vs Italy","Brazil vs Italy","Argentina vs West Germany","England vs Argentina"],ans:0,fact:"Maradona led Argentina to beat Italy in Naples on penalties in the 1990 semi-final!"},
      ]},
      {name:'Peak / Prime',diff:'prime',questions:[
        {q:"In which city was the famous 1986 'Hand of God' game played?",opts:["Buenos Aires","Mexico City","Guadalajara","Azteca"],ans:2,fact:"The Argentina vs England quarter-final was played at Estadio Azteca in Guadalajara, Mexico."},
        {q:"Maradona's 'Goal of the Century' in 1986 involved beating how many England players?",opts:["4","5","6","7"],ans:2,fact:"Maradona dribbled past 6 England outfield players plus the goalkeeper to score his iconic second goal."},
      ]},
      {name:'Legacy',diff:'legend',questions:[
        {q:"Which club did Maradona manage when he died in 2020?",opts:["Napoli","Boca Juniors","Gimnasia La Plata","Dorados de Sinaloa"],ans:2,fact:"Maradona was manager of Gimnasia La Plata in Argentina when he died in November 2020."},
        {q:"In which year did Maradona captain Argentina to the World Cup?",opts:["1982","1986","1990","1994"],ans:1,fact:"Maradona captained Argentina to their second World Cup title in 1986 in Mexico."},
        {q:"In which country did Maradona manage a national team between 2008 and 2010?",opts:["Italy","Mexico","Argentina","UAE"],ans:2,fact:"Maradona managed the Argentina national team from 2008 to 2010, taking them to the World Cup quarter-finals."},
      ]},
    ]
  },
  'messi': {
    phases:[
      {name:'Early Life',diff:'beginner',questions:[
        {q:"In which city was Lionel Messi born?",opts:["Buenos Aires","Rosario","Córdoba","Mendoza"],ans:1,fact:"Messi was born in Rosario, the third-largest city in Argentina, on 24 June 1987."},
        {q:"What medical condition did Messi have as a child that Barcelona helped treat?",opts:["Asthma","Growth hormone deficiency","Diabetes","Scoliosis"],ans:1,fact:"Messi was diagnosed with a growth hormone deficiency aged 11. Barcelona agreed to pay for his treatment."},
        {q:"At what age did Messi join Barcelona's La Masia academy?",opts:["10","11","12","13"],ans:3,fact:"Messi moved to Spain aged 13 after Barcelona agreed to sign him and fund his hormone treatment."},
      ]},
      {name:'Youth Career',diff:'youth',questions:[
        {q:"In which year did Messi make his official first-team debut for Barcelona?",opts:["2003","2004","2005","2006"],ans:1,fact:"Messi made his official first-team debut in a friendly against José Mourinho's Porto in November 2003."},
        {q:"Who was Messi's iconic strike partner in his early Barcelona years?",opts:["Samuel Eto'o","Thierry Henry","Zlatan Ibrahimović","Ronaldinho"],ans:3,fact:"Ronaldinho famously mentored Messi at Barcelona, with the two forming an irresistible duo."},
      ]},
      {name:'Professional',diff:'pro',questions:[
        {q:"How many consecutive Ballon d'Or awards did Messi win from 2009 to 2012?",opts:["2","3","4","5"],ans:2,fact:"Messi won four consecutive Ballon d'Or awards from 2009 to 2012."},
        {q:"Which season did Messi score a record 50 La Liga goals?",opts:["2010-11","2011-12","2012-13","2014-15"],ans:1,fact:"Messi scored 50 La Liga goals in 2011-12 — a single-season record that still stands."},
        {q:"How many La Liga titles did Messi win with Barcelona?",opts:["8","9","10","11"],ans:2,fact:"Messi won 10 La Liga titles with Barcelona over his 17-season career with the club."},
      ]},
      {name:'Peak / Prime',diff:'prime',questions:[
        {q:"In which year did Messi finally win his first senior international trophy with Argentina?",opts:["2019","2021","2022","2023"],ans:1,fact:"Messi won the Copa América 2021 with Argentina, finally ending his international trophy drought."},
        {q:"Who did Argentina beat in the 2022 World Cup final?",opts:["Brazil","England","France","Portugal"],ans:2,fact:"Argentina beat France on penalties after an extraordinary 3-3 draw in the 2022 Qatar World Cup final."},
      ]},
      {name:'Legacy',diff:'legend',questions:[
        {q:"To which MLS club did Messi move after leaving PSG in 2023?",opts:["LA Galaxy","New York Red Bulls","Atlanta United","Inter Miami"],ans:3,fact:"Messi joined Inter Miami CF in July 2023, becoming the biggest star in MLS history."},
        {q:"How many Champions League titles did Messi win with Barcelona?",opts:["3","4","5","6"],ans:1,fact:"Messi won the Champions League four times with Barcelona (2006, 2009, 2011, 2015)."},
        {q:"What is Messi's total number of Ballon d'Or awards as of 2024?",opts:["6","7","8","9"],ans:2,fact:"Messi has won 8 Ballon d'Or awards — the most in history by any player."},
      ]},
    ]
  },
  'ronaldo_cr7': {
    phases:[
      {name:'Early Life',diff:'beginner',questions:[
        {q:"On which Portuguese island was Cristiano Ronaldo born?",opts:["Azores","Madeira","Terceira","Faial"],ans:1,fact:"Ronaldo was born in Funchal, the capital of Madeira, on 5 February 1985."},
        {q:"Which Portuguese club did Ronaldo start his career at?",opts:["Benfica","Boavista","Sporting CP","Porto"],ans:2,fact:"Ronaldo developed at Sporting CP's academy, debuting for the first team at age 16."},
        {q:"At what age did Ronaldo have surgery for a heart condition?",opts:["10","12","15","17"],ans:2,fact:"Ronaldo underwent surgery to correct a heart condition at age 15, which he recovered from quickly."},
      ]},
      {name:'Youth Career',diff:'youth',questions:[
        {q:"In which year did Ronaldo move from Sporting to Manchester United?",opts:["2002","2003","2004","2005"],ans:1,fact:"Ronaldo joined Manchester United in August 2003 after impressing in a pre-season friendly against Sporting."},
        {q:"Who was the Manchester United manager who signed Ronaldo?",opts:["Ron Atkinson","Brian Clough","Alex Ferguson","Bobby Charlton"],ans:2,fact:"Sir Alex Ferguson signed Ronaldo for £12.24 million after being blown away by his performance."},
      ]},
      {name:'Professional',diff:'pro',questions:[
        {q:"In which year did Ronaldo win his first Champions League with Manchester United?",opts:["2007","2008","2009","2010"],ans:1,fact:"Ronaldo won the Champions League with Man United in Moscow in 2008, beating Chelsea on penalties."},
        {q:"For how many millions did Real Madrid sign Ronaldo in 2009?",opts:["70m","80m","94m","105m"],ans:2,fact:"Ronaldo joined Real Madrid for €94 million in 2009 — a world record at the time."},
        {q:"How many La Liga titles did Ronaldo win with Real Madrid?",opts:["2","3","4","5"],ans:0,fact:"Ronaldo won 2 La Liga titles with Real Madrid (2012 and 2017)."},
      ]},
      {name:'Peak / Prime',diff:'prime',questions:[
        {q:"Against whom did Ronaldo score his famous 'knuckleball' free kick in the 2016 Euros?",opts:["Hungary","Poland","Wales","France"],ans:0,fact:"Ronaldo scored his iconic knuckleball free kick against Hungary in the 2016 European Championship."},
        {q:"With which team did Ronaldo win the inaugural UEFA Nations League in 2019?",opts:["Portugal","Spain","France","Italy"],ans:0,fact:"Ronaldo captained Portugal to win the first UEFA Nations League, defeating the Netherlands 1-0."},
      ]},
      {name:'Legacy',diff:'legend',questions:[
        {q:"Which club did Ronaldo join after leaving Manchester United in 2022?",opts:["Inter Miami","Al Hilal","Al Nassr","Persepolis"],ans:2,fact:"Ronaldo joined Saudi Pro League side Al Nassr in January 2023, in a record-breaking deal."},
        {q:"How many international goals has Ronaldo scored for Portugal as of 2024?",opts:["More than 100","More than 110","More than 120","More than 130"],ans:2,fact:"Ronaldo has scored over 130 international goals for Portugal — the all-time record in world football."},
        {q:"What is the name of Ronaldo's first son, born in 2010?",opts:["Cristiano Jr.","Mateo","Alana","Eva"],ans:0,fact:"Cristiano Ronaldo Jr. was born in June 2010."},
      ]},
    ]
  },
  'ferguson': {
    phases:[
      {name:'Early Life',diff:'beginner',questions:[
        {q:"In which city was Sir Alex Ferguson born?",opts:["Edinburgh","Glasgow","Aberdeen","Dundee"],ans:1,fact:"Ferguson was born in Govan, Glasgow, on 31 December 1941."},
        {q:"What was Ferguson's position as a professional player?",opts:["Midfielder","Defender","Striker","Goalkeeper"],ans:2,fact:"Ferguson was a centre-forward who played for several clubs including Rangers and Falkirk."},
        {q:"Which Scottish club gave Ferguson his first manager role in 1974?",opts:["St Mirren","Aberdeen","East Stirlingshire","Falkirk"],ans:2,fact:"Ferguson became manager of East Stirlingshire in 1974 aged just 32."},
      ]},
      {name:'Youth Career',diff:'youth',questions:[
        {q:"Which major trophy did Ferguson win with Aberdeen in 1983?",opts:["Scottish League","Scottish Cup","European Cup Winners' Cup","Champions League"],ans:2,fact:"Aberdeen beat Real Madrid 2-1 to win the UEFA Cup Winners' Cup in Gothenburg in 1983."},
        {q:"In which year did Ferguson take over as manager of Manchester United?",opts:["1984","1985","1986","1987"],ans:2,fact:"Ferguson replaced Ron Atkinson as Manchester United manager on 6 November 1986."},
      ]},
      {name:'Professional',diff:'pro',questions:[
        {q:"When did Manchester United win their first Premier League title under Ferguson?",opts:["1991-92","1992-93","1993-94","1994-95"],ans:1,fact:"Man United won the first Premier League season in 1992-93 — their first league title in 26 years."},
        {q:"Which player did Ferguson controversially sell to Real Madrid in 2003?",opts:["Paul Scholes","Ryan Giggs","David Beckham","Roy Keane"],ans:2,fact:"Ferguson sold David Beckham to Real Madrid in 2003."},
        {q:"How many Premier League titles did Ferguson win in total?",opts:["10","11","12","13"],ans:3,fact:"Ferguson won 13 Premier League titles — more than any other manager in English football history."},
      ]},
      {name:'Peak / Prime',diff:'prime',questions:[
        {q:"What was unique about Manchester United's treble win in 1999?",opts:["First ever treble","First foreign manager","Won all in one week","Won Champions League from behind"],ans:3,fact:"Man United scored twice in injury time to beat Bayern Munich 2-1 in the 1999 Champions League final."},
        {q:"In what injury time minute did Solskjær score to win the 1999 UCL final?",opts:["90+1","90+3","90+5","90+7"],ans:1,fact:"Ole Gunnar Solskjær scored in the 90+3 minute to complete the stunning comeback against Bayern."},
      ]},
      {name:'Legacy',diff:'legend',questions:[
        {q:"In which year did Ferguson retire as Manchester United manager?",opts:["2011","2012","2013","2014"],ans:2,fact:"Ferguson retired in May 2013 having managed Manchester United for 26 years and 4 months."},
        {q:"What honour was Ferguson knighted for?",opts:["Services to Education","Services to Football","Services to the Crown","Services to Glasgow"],ans:1,fact:"Alex Ferguson was knighted in 1999 for services to football after winning the treble."},
        {q:"Which United manager immediately succeeded Ferguson in 2013?",opts:["David Moyes","Louis van Gaal","Pep Guardiola","José Mourinho"],ans:0,fact:"David Moyes was appointed Manchester United manager in May 2013 but was sacked within a year."},
      ]},
    ]
  },
};

// ════════════════════════════════════════════
// WINNERS DATA
// ════════════════════════════════════════════
const WC_WINNERS = [
  {year:1930,name:'Uruguay'},{year:1934,name:'Italy'},{year:1938,name:'Italy'},
  {year:1950,name:'Uruguay'},{year:1954,name:'West Germany'},{year:1958,name:'Brazil'},
  {year:1962,name:'Brazil'},{year:1966,name:'England'},{year:1970,name:'Brazil'},
  {year:1974,name:'West Germany'},{year:1978,name:'Argentina'},{year:1982,name:'Italy'},
  {year:1986,name:'Argentina'},{year:1990,name:'West Germany'},{year:1994,name:'Brazil'},
  {year:1998,name:'France'},{year:2002,name:'Brazil'},{year:2006,name:'Italy'},
  {year:2010,name:'Spain'},{year:2014,name:'Germany'},{year:2018,name:'France'},
  {year:2022,name:'Argentina'},
];
const UCL_WINNERS = [
  {year:1956,name:'Real Madrid'},{year:1957,name:'Real Madrid'},{year:1958,name:'Real Madrid'},
  {year:1959,name:'Real Madrid'},{year:1960,name:'Real Madrid'},{year:1961,name:'Benfica'},
  {year:1962,name:'Benfica'},{year:1963,name:'AC Milan'},{year:1964,name:'Inter Milan'},
  {year:1965,name:'Inter Milan'},{year:1966,name:'Real Madrid'},{year:1967,name:'Celtic'},
  {year:1968,name:'Manchester United'},{year:1969,name:'AC Milan'},{year:1970,name:'Feyenoord'},
  {year:1971,name:'Ajax'},{year:1972,name:'Ajax'},{year:1973,name:'Ajax'},
  {year:1974,name:'Bayern Munich'},{year:1975,name:'Bayern Munich'},{year:1976,name:'Bayern Munich'},
  {year:1977,name:'Liverpool'},{year:1978,name:'Liverpool'},{year:1979,name:'Nottingham Forest'},
  {year:1980,name:'Nottingham Forest'},{year:1981,name:'Liverpool'},{year:1982,name:'Aston Villa'},
  {year:1983,name:'Hamburg'},{year:1984,name:'Liverpool'},{year:1985,name:'Juventus'},
  {year:1986,name:'Steaua Bucharest'},{year:1987,name:'Porto'},{year:1988,name:'PSV Eindhoven'},
  {year:1989,name:'AC Milan'},{year:1990,name:'AC Milan'},{year:1991,name:'Red Star Belgrade'},
  {year:1992,name:'Barcelona'},{year:1993,name:'Marseille'},{year:1994,name:'AC Milan'},
  {year:1995,name:'Ajax'},{year:1996,name:'Juventus'},{year:1997,name:'Borussia Dortmund'},
  {year:1998,name:'Real Madrid'},{year:1999,name:'Manchester United'},{year:2000,name:'Real Madrid'},
  {year:2001,name:'Bayern Munich'},{year:2002,name:'Real Madrid'},{year:2003,name:'AC Milan'},
  {year:2004,name:'Porto'},{year:2005,name:'Liverpool'},{year:2006,name:'Barcelona'},
  {year:2007,name:'AC Milan'},{year:2008,name:'Manchester United'},{year:2009,name:'Barcelona'},
  {year:2010,name:'Inter Milan'},{year:2011,name:'Barcelona'},{year:2012,name:'Chelsea'},
  {year:2013,name:'Bayern Munich'},{year:2014,name:'Real Madrid'},{year:2015,name:'Barcelona'},
  {year:2016,name:'Real Madrid'},{year:2017,name:'Real Madrid'},{year:2018,name:'Real Madrid'},
  {year:2019,name:'Liverpool'},{year:2020,name:'Bayern Munich'},{year:2021,name:'Chelsea'},
  {year:2022,name:'Real Madrid'},{year:2023,name:'Manchester City'},{year:2024,name:'Real Madrid'},
];

// ════════════════════════════════════════════
// SCREEN MANAGER
// ════════════════════════════════════════════
function showScreen(id){
  document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));
  const el=document.getElementById(id);
  if(el) el.classList.add('active');
  window.scrollTo(0,0);
}

// ════════════════════════════════════════════
// INIT
// ════════════════════════════════════════════
loadPD();
updateHomeRank();

function ensureName(cb){
  if(pd.name){cb();return;}
  document.getElementById('name-modal').classList.add('active');
  const go=()=>{
    const v=document.getElementById('name-input').value.trim();
    if(!v) return;
    pd.name=v;savePD();
    document.getElementById('name-modal').classList.remove('active');
    cb();
  };
  document.getElementById('name-confirm-btn').onclick=go;
  document.getElementById('name-input').onkeydown=e=>{if(e.key==='Enter') go();};
}

// Mode card clicks
document.querySelectorAll('.mode-card').forEach(c=>{
  c.addEventListener('click',()=>{
    const m=c.dataset.mode;
    if(m==='ranked') ensureName(()=>openRankedModal());
    else if(m==='guess') ensureName(()=>startGuessMode());
    else if(m==='career') ensureName(()=>openCareerModal());
    else if(m==='winners') ensureName(()=>openWinnersModal());
  });
});

// Rank pill
document.getElementById('rank-pill-btn').addEventListener('click',()=>{
  document.getElementById('rank-info-xp').textContent=pd.xp;
  renderRankTiers();
  document.getElementById('rank-info-modal').classList.add('active');
});
document.getElementById('rank-info-close').addEventListener('click',()=>{document.getElementById('rank-info-modal').classList.remove('active');});
function renderRankTiers(){
  const el=document.getElementById('rank-tiers-list');
  const cur=getRank(pd.xp);
  el.innerHTML=RANKS.map(r=>{
    const isCur=r.name===cur.name;
    const unlocked=pd.xp>=r.minXP;
    return `<div class="rt-row ${isCur?'cur':''}" style="${unlocked?'':'opacity:.4'}">
      <div class="rt-icon">${r.icon}</div>
      <div><div class="rt-name" style="color:${r.color}">${r.name}</div>
      <div class="rt-xp">${r.maxXP===Infinity?r.minXP+'+ XP':r.minXP+' – '+r.maxXP+' XP'}</div></div>
      ${isCur?'<span class="rt-cur-badge">CURRENT</span>':''}
    </div>`;
  }).join('');
}

// Leaderboard
document.getElementById('lb-open-btn').addEventListener('click',()=>{renderLB();showScreen('leaderboard-screen');});
document.getElementById('lb-back-btn').addEventListener('click',()=>showScreen('home-screen'));
function renderLB(){
  const lb=getLB();const t=document.getElementById('lb-table');
  if(!lb.length){t.innerHTML='<div class="lb-empty">No players yet. Be the first!</div>';return;}
  const medals=['🥇','🥈','🥉'];
  t.innerHTML=lb.map((p,i)=>{
    const r=getRank(p.xp);const isme=p.name===pd.name;
    return`<div class="lb-row ${isme?'is-me':''} ${i<3?'top-'+(i+1):''}">
      <div class="lb-rnum">${i<3?medals[i]:'#'+(i+1)}</div>
      <div class="lb-icon">${r.icon}</div>
      <div class="lb-info"><div class="lb-name">${p.name}${isme?' (You)':''}</div>
      <div class="lb-sub">${r.name} · ${p.gamesPlayed} games · Best: ${p.bestScore}/10</div></div>
      <div class="lb-xp" style="color:${r.color}">${p.xp} XP</div>
    </div>`;
  }).join('');
}

// Collection
document.getElementById('col-open-btn').addEventListener('click',()=>{renderCollection();showScreen('collectables-screen');});
document.getElementById('col-back-btn').addEventListener('click',()=>showScreen('home-screen'));
let colFilter='all';
document.querySelectorAll('.col-filter').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.col-filter').forEach(x=>x.classList.remove('active'));
  b.classList.add('active');colFilter=b.dataset.rarity;renderCollection();
}));
function renderCollection(){
  const grid=document.getElementById('col-grid');grid.innerHTML='';
  const unlocked=pd.unlockedCards||[];
  const total=FOOTBALLER_CARDS.length;
  const cnt=FOOTBALLER_CARDS.filter(f=>unlocked.includes(f.id)).length;
  document.getElementById('col-count-lbl').textContent=cnt+' / '+total+' Collected';
  let filtered=FOOTBALLER_CARDS;
  if(colFilter!=='all') filtered=FOOTBALLER_CARDS.filter(f=>f.rarity===colFilter);
  filtered.forEach(f=>{
    const isU=unlocked.includes(f.id);
    const card=buildCard(f,isU);
    card.addEventListener('click',()=>openCardDetail(f,isU));
    grid.appendChild(card);
  });
}
function buildCard(f,isUnlocked){
  const w=document.createElement('div');
  w.className='fc-card fc-'+f.rarity;
  const rl={bronze:'Bronze',silver:'Silver',gold:'Gold',legend:'Legend'};
  const ti=f.type==='manager'?'🎩':'⚽';
  let sh='';
  Object.keys(f.stats).slice(0,3).forEach(k=>{
    const lbl=k==='goals'?'Goals':k==='trophies'?'Trophies':k;
    sh+=`<div class="fc-stat"><div class="fc-stat-val" style="color:${rarityColor(f.rarity)}">${f.stats[k]}</div><div class="fc-stat-lbl">${lbl}</div></div>`;
  });
  w.innerHTML=`<div class="fc-inner">
    <div class="fc-emoji"><span style="font-size:40px">${f.emoji}</span><span class="fc-rtag">${rl[f.rarity]}</span></div>
    <div class="fc-info">
      <div class="fc-name">${f.name}</div>
      <div class="fc-nation">${ti} ${f.nation}</div>
      <div class="fc-stats">${sh}</div>
    </div>
    ${!isUnlocked?`<div class="fc-locked"><div class="li">🔒</div><div class="ll">Guess Mode</div></div>`:''}
  </div>`;
  return w;
}
function rarityColor(r){const m={bronze:'#cd7f32',silver:'#b8c0cc',gold:'#ffc400',legend:'#ff6b6b'};return m[r]||'#fff';}
function openCardDetail(f,isU){
  const modal=document.getElementById('card-detail-modal');
  const box=document.getElementById('card-detail-box');
  const rc=rarityColor(f.rarity);
  const rl={bronze:'Bronze',silver:'Silver',gold:'Gold',legend:'Legend'};
  if(!isU){
    box.innerHTML=`<button class="cd-close" id="cd-close">✕</button>
      <div class="cd-emoji">🔒</div>
      <div class="cd-name" style="color:${rc}">${rl[f.rarity]} Card</div>
      <p class="cd-locked-msg">Play <strong>Guess The Footballer</strong> to unlock <strong>${f.name}</strong>!</p>
      <button class="btn-primary" id="cd-go-guess" style="margin-top:8px;">Play Guess Mode 🕵️</button>`;
    modal.classList.add('active');
    document.getElementById('cd-close').onclick=()=>modal.classList.remove('active');
    document.getElementById('cd-go-guess').onclick=()=>{modal.classList.remove('active');startGuessMode();};
    return;
  }
  const sh=Object.keys(f.stats).map(k=>{
    const lbl=k==='goals'?'Goals':k==='trophies'?'Trophies':k;
    return`<div class="cds-box"><div class="cds-val" style="color:${rc}">${f.stats[k]}</div><div class="cds-lbl">${lbl}</div></div>`;
  }).join('');
  box.innerHTML=`<button class="cd-close" id="cd-close">✕</button>
    <div class="cd-emoji">${f.emoji}</div>
    <div class="cd-name">${f.name}</div>
    <div class="cd-sub" style="color:${rc}">${rl[f.rarity].toUpperCase()} · ${f.nation} · ${f.type==='manager'?'Manager 🎩':'Player ⚽'}</div>
    <div class="cd-stats">${sh}</div>
    <p class="cd-bio">${f.bio}</p>`;
  modal.classList.add('active');
  document.getElementById('cd-close').onclick=()=>modal.classList.remove('active');
}
document.getElementById('card-detail-modal').addEventListener('click',function(e){if(e.target===this)this.classList.remove('active');});

// XP float
function floatXP(text,el){
  const d=document.createElement('div');d.className='xp-float';d.textContent=text;
  const r=el.getBoundingClientRect();
  d.style.left=(r.left+r.width/2-24)+'px';d.style.top=(r.top-8)+'px';
  document.body.appendChild(d);setTimeout(()=>d.remove(),1300);
}

// Rank display helpers
function showRankResults(xpEarned,oldXP,containerId,rankIconId,rankNameId,rankBarId,rankLblId,rankUpBannerId,rankUpNameId){
  const newRank=getRank(pd.xp);
  const oldRank=getRank(oldXP);
  document.getElementById(rankIconId).textContent=newRank.icon;
  document.getElementById(rankNameId).textContent=newRank.name;
  document.getElementById(rankNameId).style.color=newRank.color;
  const prog=getRankProgress(pd.xp);
  if(rankBarId){
    const bar=document.getElementById(rankBarId);
    if(bar){bar.style.background=newRank.color;bar.style.width='0%';setTimeout(()=>bar.style.width=prog.pct+'%',500);}
  }
  if(rankLblId){
    const lbl=document.getElementById(rankLblId);
    if(lbl) lbl.textContent=newRank.maxXP===Infinity?'MAX RANK':prog.current+' / '+(newRank.maxXP-newRank.minXP+1)+' XP';
  }
  if(newRank.name!==oldRank.name){
    document.getElementById(rankUpNameId).textContent=newRank.name;
    document.getElementById(rankUpBannerId).classList.add('show');
  }else{document.getElementById(rankUpBannerId).classList.remove('show');}
}

// ════════════════════════════════════════════
// MODE 1: RANKED QUIZ
// ════════════════════════════════════════════
let rQ=[],rIdx=0,rScore=0,rCorrect=0,rWrong=0,rStreak=0,rXP=0,rXPb={base:0,streak:0,perfect:0};
let rAnswered=false,rTimedOut=false,rTimeLeft=90,rTimer=null;
const DCLASS={easy:'diff-easy',medium:'diff-medium',hard:'diff-hard',impossible:'diff-impossible'};
const DLABEL={easy:'⚽ Easy',medium:'🎯 Medium',hard:'🔥 Hard',impossible:'💀 Impossible'};
const DXPM={easy:10,medium:12,hard:16,impossible:22};
const LETS=['A','B','C','D'];
function openRankedModal(){document.getElementById('quiz-modal').classList.add('active');}
document.getElementById('qm-cancel-btn').addEventListener('click',()=>document.getElementById('quiz-modal').classList.remove('active'));
document.getElementById('qm-start-btn').addEventListener('click',()=>{document.getElementById('quiz-modal').classList.remove('active');startRanked();});
function startRanked(){
  rQ=[...RANKED_POOL].sort(()=>Math.random()-.5).slice(0,10);
  rIdx=0;rScore=0;rCorrect=0;rWrong=0;rStreak=0;rXP=0;rXPb={base:0,streak:0,perfect:0};
  rAnswered=false;rTimedOut=false;rTimeLeft=90;
  clearInterval(rTimer);
  document.getElementById('score-display').textContent='0';
  document.getElementById('quiz-prog-bar').style.width='0%';
  document.getElementById('timer-fill').style.width='100%';
  document.getElementById('timer-fill').className='timer-fill';
  document.getElementById('timer-num').textContent='90';
  document.getElementById('timer-num').style.color='';
  document.getElementById('timer-num').style.animation='';
  document.getElementById('streak-pill').className='streak-pill';
  showScreen('quiz-screen');
  renderRankedQ();
  startRTimer();
}
function renderRankedQ(animate=false){
  const q=rQ[rIdx];rAnswered=false;
  if(animate){
    const b=document.getElementById('quiz-body');
    b.classList.add('slide-out');
    setTimeout(()=>{b.classList.remove('slide-out');b.classList.add('slide-in');fillRQ(q);setTimeout(()=>b.classList.remove('slide-in'),280);},180);
  }else fillRQ(q);
}
function fillRQ(q){
  document.getElementById('quiz-prog-text').textContent=`Question ${rIdx+1} of 10`;
  document.getElementById('quiz-prog-bar').style.width=(rIdx/10*100)+'%';
  document.getElementById('diff-tag').className='diff-tag '+DCLASS[q.diff];
  document.getElementById('diff-tag').textContent=DLABEL[q.diff];
  document.getElementById('question-text').textContent=q.q;
  const g=document.getElementById('opts-grid');g.innerHTML='';
  q.opts.forEach((o,i)=>{
    const b=document.createElement('button');b.className='opt-btn';
    b.innerHTML=`<span class="opt-letter">${LETS[i]}</span><span>${o}</span>`;
    b.addEventListener('click',()=>selectRankedAns(i,q));
    g.appendChild(b);
  });
  document.getElementById('feedback-box').className='feedback-box';
  document.getElementById('next-wrap').className='next-wrap';
  document.getElementById('next-btn').textContent='Next →';
  document.getElementById('xp-display').innerHTML='';
}
function selectRankedAns(idx,q){
  if(rAnswered) return;rAnswered=true;
  const btns=document.getElementById('opts-grid').querySelectorAll('.opt-btn');
  btns.forEach(b=>b.disabled=true);
  const ok=idx===q.ans;
  btns[idx].classList.add(ok?'correct':'wrong');
  if(!ok) btns[q.ans].classList.add('correct');
  const fb=document.getElementById('feedback-box');
  const fl=document.getElementById('fb-label');
  const xpd=document.getElementById('xp-display');
  if(ok){
    rScore++;rCorrect++;rStreak++;
    document.getElementById('score-display').textContent=rScore;
    const base=DXPM[q.diff]||10;
    const sb=rStreak>=3?Math.min(rStreak*2,18):0;
    const thisXP=base+sb;
    rXP+=thisXP;rXPb.base+=base;rXPb.streak+=sb;
    fb.className='feedback-box show correct';
    fl.textContent='✅ Correct!';
    xpd.innerHTML=`<div class="xp-pill">+${thisXP} XP${sb>0?' (🔥 streak!!)':''}</div>`;
    floatXP('+'+thisXP+' XP',btns[idx]);
    if(rStreak>=2){document.getElementById('streak-pill').className='streak-pill on';document.getElementById('streak-count').textContent=rStreak;}
  }else{
    rWrong++;rStreak=0;
    document.getElementById('streak-pill').className='streak-pill';
    fb.className='feedback-box show wrong';fl.textContent='❌ Wrong!';xpd.innerHTML='';
  }
  document.getElementById('fb-text').textContent=q.fact;
  const nw=document.getElementById('next-wrap');const nb=document.getElementById('next-btn');
  nw.className='next-wrap show';
  if(rIdx>=9) nb.textContent='See Results 🏆';
}
document.getElementById('next-btn').addEventListener('click',()=>{
  rIdx++;if(rIdx>=10) finishRanked(); else renderRankedQ(true);
});
function startRTimer(){
  document.getElementById('timer-fill').style.width='100%';
  document.getElementById('timer-num').textContent=rTimeLeft;
  rTimer=setInterval(()=>{
    rTimeLeft--;
    document.getElementById('timer-num').textContent=rTimeLeft;
    const pct=(rTimeLeft/90)*100;
    document.getElementById('timer-fill').style.width=pct+'%';
    if(rTimeLeft<=20) document.getElementById('timer-fill').classList.add('warn');
    if(rTimeLeft<=10){document.getElementById('timer-fill').classList.remove('warn');document.getElementById('timer-fill').classList.add('danger');document.getElementById('timer-num').style.color='var(--red)';document.getElementById('timer-num').style.animation='pulse 1s infinite';}
    if(rTimeLeft<=0){clearInterval(rTimer);rTimedOut=true;document.getElementById('timeout-overlay').classList.add('active');}
  },1000);
}
document.getElementById('quiz-back-btn').addEventListener('click',()=>{clearInterval(rTimer);document.getElementById('timeout-overlay').classList.remove('active');showScreen('home-screen');});
document.getElementById('timeout-results-btn').addEventListener('click',()=>{document.getElementById('timeout-overlay').classList.remove('active');finishRanked();});
function finishRanked(){
  clearInterval(rTimer);document.getElementById('timeout-overlay').classList.remove('active');
  if(rScore===10){rXP+=30;rXPb.perfect=30;}
  const pct=rCorrect>0?Math.round(rCorrect/10*100):0;
  document.getElementById('res-score-num').textContent=rScore;
  document.getElementById('stat-correct').textContent=rCorrect;
  document.getElementById('stat-wrong').textContent=rWrong;
  document.getElementById('stat-pct').textContent=pct+'%';
  const circ=2*Math.PI*70;
  const offset=circ-(rScore/10)*circ;
  const ring=document.getElementById('ring-fill');
  ring.style.strokeDashoffset=offset;
  let grade,quote,attr,rc='';
  if(rScore>=9){grade='⚡ Legendary';quote='"You know this game better than most coaches."';attr='— Pep Guardiola';rc='';}
  else if(rScore>=7){grade='🔥 World Class';quote='"You did incredible. Like Messi in 2011."';attr='— Pep Guardiola';rc='';}
  else if(rScore>=5){grade='🎯 Solid Display';quote='"Decent. Not special… yet."';attr='— Jose Mourinho';rc='mid';}
  else if(rScore>=3){grade='😬 Room to Grow';quote='"This is not football. This is comedy."';attr='— Jose Mourinho';rc='fail';}
  else{grade='💀 Did You Even Watch?';quote='"I have seen better decisions made by a goalpost."';attr='— Jose Mourinho';rc='fail';}
  ring.className='ring-fill'+(rc?' '+rc:'');
  document.getElementById('results-grade').textContent=grade;
  document.getElementById('results-quote').textContent=quote;
  document.getElementById('results-attr').textContent=attr;
  const oldXP=pd.xp;
  pd.xp+=rXP;pd.gamesPlayed+=1;if(rScore>pd.bestScore)pd.bestScore=rScore;
  savePD();saveLB();updateHomeRank();
  document.getElementById('res-xp-num').textContent='+'+rXP;
  let bp=[];
  if(rXPb.base>0)bp.push(rCorrect+' correct × base');
  if(rXPb.streak>0)bp.push('+'+rXPb.streak+' streak');
  if(rXPb.perfect>0)bp.push('+30 perfect!');
  document.getElementById('res-xp-breakdown').textContent=bp.join(' · ')||'0 correct';
  document.getElementById('stat-total-xp').textContent=pd.xp;
  showRankResults(rXP,oldXP,'','res-rank-icon','res-rank-name','res-rank-bar','res-rank-lbl','rank-up-banner','rank-up-name');
  setTimeout(()=>showScreen('results-screen'),100);
}
document.getElementById('retry-btn').addEventListener('click',startRanked);
document.getElementById('home-btn').addEventListener('click',()=>showScreen('home-screen'));

// ════════════════════════════════════════════
// MODE 2: GUESS THE FOOTBALLER
// ════════════════════════════════════════════
const GUESS_ROUND=8;
let gFootballers=[],gIdx=0,gClueIdx=0,gScore=0,gXP=0,gLives=3,gStreak=0,gNewCards=[];
let ftTimer=null,ftTimeLeft=25;
function startGuessMode(){
  gFootballers=[...FOOTBALLER_CARDS].sort(()=>Math.random()-.5).slice(0,GUESS_ROUND);
  gIdx=0;gScore=0;gXP=0;gLives=3;gStreak=0;gNewCards=[];
  showScreen('guess-screen');
  renderLives('lives-row',3);
  renderGuessQ();
}
function renderLives(id,total){
  const el=document.getElementById(id);if(!el)return;
  el.innerHTML='';
  for(let i=0;i<total;i++){
    const sp=document.createElement('span');sp.className='life-dot';sp.id=id+'-life-'+i;sp.textContent='❤️';el.appendChild(sp);
  }
}
function updateLives(id,lives,total){
  for(let i=0;i<total;i++){
    const sp=document.getElementById(id+'-life-'+i);
    if(sp) sp.className='life-dot'+(i<lives?'':' lost');
  }
}
function renderGuessQ(){
  const f=gFootballers[gIdx];gClueIdx=0;
  clearInterval(ftTimer);
  document.getElementById('guess-prog-text').textContent=`Footballer ${gIdx+1} of ${GUESS_ROUND}`;
  document.getElementById('guess-score-display').textContent=gScore;
  renderClueCards(f,0);
  updatePtsBadge(f.clues.length);
  const opts=document.getElementById('guess-opts');opts.innerHTML='';
  f.options.forEach(o=>{
    const b=document.createElement('button');b.className='g-opt-btn';b.textContent=o;
    b.addEventListener('click',()=>handleGuessAns(o,f));
    opts.appendChild(b);
  });
  document.getElementById('guess-feedback').style.display='none';
  document.getElementById('guess-next-wrap').className='next-wrap';
  document.getElementById('reveal-btn').disabled=false;
  document.getElementById('reveal-btn').textContent=`👁 Reveal Clue 2 (-1 pt)`;
  document.getElementById('clue-counter').textContent=`Clue 1 of ${f.clues.length}`;
  setFtDiff(f);
  startFtTimer(f);
}
function setFtDiff(f){
  const r=f.rarity;
  const el=document.getElementById('ft-diff-badge');
  if(r==='bronze'||r==='silver'){el.className='ft-diff-badge easy';el.textContent='Easy';}
  else if(r==='gold'){el.className='ft-diff-badge hard';el.textContent='Hard';}
  else{el.className='ft-diff-badge legendary';el.textContent='Legendary';}
}
function startFtTimer(f){
  ftTimeLeft=f.rarity==='legend'?18:f.rarity==='gold'?22:25;
  updateFtTimer(ftTimeLeft,ftTimeLeft);
  ftTimer=setInterval(()=>{
    ftTimeLeft--;
    updateFtTimer(ftTimeLeft,f.rarity==='legend'?18:f.rarity==='gold'?22:25);
    if(ftTimeLeft<=0){clearInterval(ftTimer);autoWrongGuess(f);}
  },1000);
}
function autoWrongGuess(f){handleGuessAns('__timeout__',f);}
function updateFtTimer(left,total){
  document.getElementById('ft-timer-num').textContent=left;
  const circ=113.1;const offset=circ-(left/total)*circ;
  const ring=document.getElementById('ft-ring-fill');
  ring.style.strokeDashoffset=offset;
  if(left<=8) ring.style.stroke='var(--red)';
  else if(left<=12) ring.style.stroke='var(--gold)';
  else ring.style.stroke='var(--purple)';
}
function renderClueCards(f,upTo){
  const w=document.getElementById('clue-cards-wrap');w.innerHTML='';
  for(let i=0;i<=upTo;i++){
    const c=f.clues[i];const card=document.createElement('div');card.className='clue-card';
    card.innerHTML=`<div class="clue-num">${i+1}</div><div><div class="clue-cat">${c.cat}</div><div class="clue-text">${c.text}</div></div>`;
    w.appendChild(card);
  }
}
document.getElementById('reveal-btn').addEventListener('click',()=>{
  const f=gFootballers[gIdx];
  if(gClueIdx>=f.clues.length-1) return;
  gClueIdx++;
  renderClueCards(f,gClueIdx);
  document.getElementById('clue-counter').textContent=`Clue ${gClueIdx+1} of ${f.clues.length}`;
  updatePtsBadge(Math.max(1,f.clues.length-gClueIdx));
  const btn=document.getElementById('reveal-btn');
  if(gClueIdx>=f.clues.length-1){btn.disabled=true;btn.textContent='👁 All Clues Revealed';}
  else btn.textContent=`👁 Reveal Clue ${gClueIdx+2} (-1 pt)`;
});
function updatePtsBadge(pts){document.getElementById('clue-pts-badge').textContent=`🌟 ${pts} Point${pts!==1?'s':''} Available`;}
function handleGuessAns(chosen,f){
  clearInterval(ftTimer);
  document.querySelectorAll('.g-opt-btn').forEach(b=>{
    b.disabled=true;
    if(b.textContent===f.name) b.classList.add('correct');
    else if(b.textContent===chosen&&chosen!==f.name) b.classList.add('wrong');
  });
  const isOk=chosen===f.name;
  const pts=isOk?Math.max(1,f.clues.length-gClueIdx):0;
  const xpe=isOk?pts*10:0;
  if(isOk){
    gScore+=pts;gXP+=xpe;gStreak++;
    if(!pd.unlockedCards.includes(f.id)){pd.unlockedCards.push(f.id);gNewCards.push(f.id);}
    if(gStreak>=3){
      document.getElementById('guess-streak-bar').className='guess-streak-bar on';
      document.getElementById('guess-streak-text').textContent=`🔥 ${gStreak}× Streak — Bonus XP!`;
    }
  }else{
    gLives--;gStreak=0;
    document.getElementById('guess-streak-bar').className='guess-streak-bar';
    updateLives('lives-row',gLives,3);
    if(gLives<=0){
      document.getElementById('guess-gameover').style.display='flex';return;
    }
  }
  document.getElementById('guess-score-display').textContent=gScore;
  const fb=document.getElementById('guess-feedback');fb.style.display='block';
  document.getElementById('gf-icon').textContent=isOk?'✅':'❌';
  document.getElementById('gf-name').textContent=isOk?`${f.name}!`:`It was ${f.name}`;
  document.getElementById('gf-detail').textContent=isOk?`+${pts} points · +${xpe} XP${gNewCards.includes(f.id)?'  · 🃏 Card Unlocked!':''}`:f.bio;
  const cr=document.getElementById('gf-card-reveal');cr.innerHTML='';
  cr.appendChild(buildCard(f,true));
  document.getElementById('reveal-btn').disabled=true;
  const nw=document.getElementById('guess-next-wrap');nw.className='next-wrap show';
  document.getElementById('guess-next-btn').textContent=gIdx>=GUESS_ROUND-1?'See Results 🏆':'Next Footballer →';
}
document.getElementById('guess-next-btn').addEventListener('click',()=>{
  gIdx++;if(gIdx>=GUESS_ROUND) finishGuess(); else{renderGuessQ();updateLives('lives-row',gLives,3);}
});
document.getElementById('guess-back-btn').addEventListener('click',()=>{clearInterval(ftTimer);showScreen('home-screen');});
document.getElementById('guess-gameover-results-btn').addEventListener('click',()=>{document.getElementById('guess-gameover').style.display='none';finishGuess();});
function finishGuess(){
  clearInterval(ftTimer);
  const maxScore=GUESS_ROUND*5;const pct=gScore/maxScore;
  let grade;
  if(pct>=.9)grade='World-Class Detective 🕵️';
  else if(pct>=.7)grade='Senior Scout 🔍';
  else if(pct>=.5)grade='Football Analyst 📋';
  else if(pct>=.3)grade='Football Casual 🤔';
  else grade='Start Watching More Football 😅';
  document.getElementById('gr-big').textContent=gScore;
  document.getElementById('gr-max').textContent='/ '+maxScore+' pts';
  document.getElementById('gr-grade').textContent=grade;
  document.getElementById('gr-xp').textContent='+'+gXP;
  const oldXP=pd.xp;
  pd.xp+=gXP;pd.gamesPlayed+=1;savePD();saveLB();updateHomeRank();
  const ug=document.getElementById('unlocked-grid');ug.innerHTML='';
  if(gNewCards.length===0){ug.innerHTML='<p style="color:var(--grey);font-size:12px;">No new cards this round</p>';}
  else{gNewCards.forEach(id=>{const f=FOOTBALLER_CARDS.find(x=>x.id===id);if(f)ug.appendChild(buildCard(f,true));});}
  showRankResults(gXP,oldXP,'','gr-rank-icon','gr-rank-name',null,null,'guess-rank-up-banner','guess-rank-up-name');
  showScreen('guess-results-screen');
}
document.getElementById('gr-retry-btn').addEventListener('click',startGuessMode);
document.getElementById('gr-home-btn').addEventListener('click',()=>showScreen('home-screen'));
document.getElementById('gr-col-btn').addEventListener('click',()=>{renderCollection();showScreen('collectables-screen');});

// ════════════════════════════════════════════
// MODE 3: CAREER PATH
// ════════════════════════════════════════════
let cPaths=null,cPhaseIdx=0,cQIdx=0,cScore=0,cXP=0,cLives=3,cAnswered=false,cCurrentF=null;
const PHASE_DXPM={beginner:8,youth:12,pro:16,prime:22,legend:30};
function openCareerModal(){
  const sel=document.getElementById('career-footballer-select');sel.innerHTML='';
  Object.keys(CAREER_PATHS).forEach(key=>{
    const path=CAREER_PATHS[key];const f=FOOTBALLER_CARDS.find(x=>x.id===key);
    if(!f) return;
    const btn=document.createElement('button');
    btn.style.cssText='background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:14px 16px;display:flex;align-items:center;gap:12px;cursor:pointer;transition:all .2s;text-align:left;color:var(--white);width:100%;';
    btn.innerHTML=`<span style="font-size:24px">${f.emoji}</span><div><div style="font-family:Black Han Sans;font-size:15px;color:var(--teal)">${f.name}</div><div style="font-size:11px;color:var(--grey);margin-top:2px">${path.phases.length} phases · ${path.phases.reduce((a,p)=>a+p.questions.length,0)} questions</div></div><span style="margin-left:auto;color:var(--teal);font-size:12px;">→</span>`;
    btn.addEventListener('mouseover',()=>btn.style.background='rgba(0,229,255,.07)');
    btn.addEventListener('mouseout',()=>btn.style.background='rgba(255,255,255,.04)');
    btn.addEventListener('click',()=>{document.getElementById('career-modal').classList.remove('active');startCareer(key);});
    sel.appendChild(btn);
  });
  document.getElementById('career-modal').classList.add('active');
}
document.getElementById('career-cancel-btn').addEventListener('click',()=>document.getElementById('career-modal').classList.remove('active'));
function startCareer(key){
  cCurrentF=FOOTBALLER_CARDS.find(x=>x.id===key);
  cPaths=CAREER_PATHS[key];
  cPhaseIdx=0;cQIdx=0;cScore=0;cXP=0;cLives=3;cAnswered=false;
  document.getElementById('career-fc-emoji').textContent=cCurrentF.emoji;
  document.getElementById('career-fc-name').textContent=cCurrentF.name;
  const totalQ=cPaths.phases.reduce((a,p)=>a+p.questions.length,0);
  document.getElementById('career-fc-sub').textContent=cPaths.phases.length+' phases · '+totalQ+' questions';
  renderLives('career-lives-row',3);
  showScreen('career-screen');
  renderCareerQ();
}
function getCareerQ(){
  const phase=cPaths.phases[cPhaseIdx];
  return{phase,q:phase.questions[cQIdx]};
}
function renderCareerQ(){
  const {phase,q}=getCareerQ();
  cAnswered=false;
  const totalQ=cPaths.phases.reduce((a,p)=>a+p.questions.length,0);
  let answeredSoFar=0;for(let p=0;p<cPhaseIdx;p++) answeredSoFar+=cPaths.phases[p].questions.length;
  answeredSoFar+=cQIdx;
  document.getElementById('career-prog-text').textContent=`Phase ${cPhaseIdx+1}: ${phase.name}`;
  document.getElementById('career-prog-bar').style.width=(answeredSoFar/totalQ*100)+'%';
  document.getElementById('ch-prog-fill').style.width=(answeredSoFar/totalQ*100)+'%';
  document.getElementById('ch-prog-lbl').textContent=answeredSoFar+' / '+totalQ;
  document.getElementById('career-phase-badge').textContent=`Phase ${cPhaseIdx+1}/${cPaths.phases.length}`;
  const diffEl=document.getElementById('cq-diff');
  diffEl.className='cq-diff '+phase.diff;
  diffEl.textContent=phase.diff.charAt(0).toUpperCase()+phase.diff.slice(1);
  document.getElementById('career-q-text').textContent=q.q;
  const optEl=document.getElementById('career-opts');optEl.innerHTML='';
  q.opts.forEach((o,i)=>{
    const b=document.createElement('button');b.className='career-opt';
    b.innerHTML=`<span class="opt-letter">${LETS[i]}</span><span>${o}</span>`;
    b.addEventListener('click',()=>selectCareerAns(i,q,phase));
    optEl.appendChild(b);
  });
  document.getElementById('career-fb').className='career-fb';
  document.getElementById('career-next-wrap').className='next-wrap';
  document.getElementById('career-next-btn').textContent='Next →';
  document.getElementById('career-xp-display').innerHTML='';
}
function selectCareerAns(idx,q,phase){
  if(cAnswered) return;cAnswered=true;
  const btns=document.getElementById('career-opts').querySelectorAll('.career-opt');
  btns.forEach(b=>b.disabled=true);
  const ok=idx===q.ans;
  btns[idx].classList.add(ok?'correct':'wrong');
  if(!ok) btns[q.ans].classList.add('correct');
  const fb=document.getElementById('career-fb');
  const fl=document.getElementById('career-fb-lbl');
  const xpd=document.getElementById('career-xp-display');
  if(ok){
    cScore++;
    const xpe=PHASE_DXPM[phase.diff]||10;cXP+=xpe;
    fb.className='career-fb show correct';fl.textContent='✅ Correct!';
    xpd.innerHTML=`<div class="xp-pill">+${xpe} XP</div>`;
    floatXP('+'+xpe+' XP',btns[idx]);
    document.getElementById('career-score-display').textContent=cScore;
  }else{
    cLives--;updateLives('career-lives-row',cLives,3);
    fb.className='career-fb show wrong';fl.textContent='❌ Wrong!';xpd.innerHTML='';
  }
  document.getElementById('career-fb-text').textContent=q.fact;
  const nw=document.getElementById('career-next-wrap');nw.className='next-wrap show';
  const nb=document.getElementById('career-next-btn');
  if(cLives<=0){nb.textContent='Game Over…';}
  else{
    const ph=cPaths.phases[cPhaseIdx];
    const isLastQ=cQIdx>=ph.questions.length-1;
    const isLastPh=cPhaseIdx>=cPaths.phases.length-1;
    if(isLastQ&&isLastPh) nb.textContent='See Results 🏆';
    else if(isLastQ) nb.textContent='Next Phase →';
    else nb.textContent='Next Question →';
  }
}
document.getElementById('career-next-btn').addEventListener('click',()=>{
  if(cLives<=0){document.getElementById('career-gameover').classList.add('active');document.getElementById('career-over-name').textContent=cCurrentF.name;return;}
  const ph=cPaths.phases[cPhaseIdx];
  cQIdx++;
  if(cQIdx>=ph.questions.length){
    cPhaseIdx++;cQIdx=0;
    if(cPhaseIdx>=cPaths.phases.length){finishCareer(true);return;}
  }
  renderCareerQ();
});
document.getElementById('career-back-btn').addEventListener('click',()=>showScreen('home-screen'));
document.getElementById('career-gameover-results-btn').addEventListener('click',()=>{document.getElementById('career-gameover').classList.remove('active');finishCareer(false);});
function finishCareer(completed){
  const totalQ=cPaths.phases.reduce((a,p)=>a+p.questions.length,0);
  const pct=cScore/totalQ;
  let grade;
  if(!completed) grade='Career Cut Short 💔';
  else if(pct>=.9) grade='Career Legend 🏆';
  else if(pct>=.7) grade='Elite Performer 🌟';
  else if(pct>=.5) grade='Solid Professional ⚽';
  else grade='Career Journeyman 🎒';
  document.getElementById('cr-score-big').textContent=cScore;
  document.getElementById('cr-grade').textContent=grade;
  document.getElementById('cr-xp').textContent='+'+cXP;
  const oldXP=pd.xp;
  pd.xp+=cXP;pd.gamesPlayed+=1;savePD();saveLB();updateHomeRank();
  showRankResults(cXP,oldXP,'','cr-rank-icon','cr-rank-name',null,null,'career-rank-up-banner','career-rank-up-name');
  showScreen('career-results-screen');
}
document.getElementById('cr-retry-btn').addEventListener('click',()=>openCareerModal());
document.getElementById('cr-home-btn').addEventListener('click',()=>showScreen('home-screen'));

// ════════════════════════════════════════════
// MODE 4: NAME ALL THE WINNERS
// ════════════════════════════════════════════
let wData=[],wFound=new Set(),wTimer=null,wTimeLeft=180,wMode='wc';
function openWinnersModal(){document.getElementById('winners-modal').classList.add('active');}
document.getElementById('winners-cancel-btn').addEventListener('click',()=>document.getElementById('winners-modal').classList.remove('active'));
document.getElementById('wm-wc-btn').addEventListener('click',()=>{document.getElementById('winners-modal').classList.remove('active');startWinners('wc');});
document.getElementById('wm-ucl-btn').addEventListener('click',()=>{document.getElementById('winners-modal').classList.remove('active');startWinners('ucl');});
function startWinners(mode){
  wMode=mode;
  wData=mode==='wc'?WC_WINNERS:UCL_WINNERS;
  wFound=new Set();wTimeLeft=180;clearInterval(wTimer);
  document.getElementById('wh-title').textContent=mode==='wc'?'🌍 FIFA World Cup Winners':'⭐ UCL / European Cup Winners';
  document.getElementById('winners-prog-text').textContent='0 / '+wData.length+' found';
  document.getElementById('winners-score').textContent='0';
  document.getElementById('winners-found-count').textContent='0';
  document.getElementById('winners-total-count').textContent=wData.length;
  document.getElementById('winners-input').value='';
  document.getElementById('hint-feed').textContent='';
  renderWinnersGrid();
  showScreen('winners-screen');
  startWTimer();
  setTimeout(()=>document.getElementById('winners-input').focus(),300);
}
function renderWinnersGrid(){
  const g=document.getElementById('winners-grid');g.innerHTML='';
  wData.forEach(w=>{
    const found=wFound.has(w.year+'_'+w.name);
    const slot=document.createElement('div');slot.className='winner-slot'+(found?' found':'');
    const safeId='slot-'+w.year+'-'+w.name.replace(/[\s\/\\'"]+/g,'-');
    slot.id=safeId;
    slot.innerHTML=`<div class="ws-year">${w.year}</div><div class="ws-name">${found?w.name:'???'}</div><div class="ws-check">${found?'✅':''}</div>`;
    g.appendChild(slot);
  });
}
function getSlotId(w){return 'slot-'+w.year+'-'+w.name.replace(/[\s\/\\'"]+/g,'-');}
function startWTimer(){
  updateWTimer(wTimeLeft);
  wTimer=setInterval(()=>{
    wTimeLeft--;updateWTimer(wTimeLeft);
    if(wTimeLeft<=0){clearInterval(wTimer);endWinners();}
  },1000);
}
function updateWTimer(left){
  const m=Math.floor(left/60);const s=left%60;
  document.getElementById('wh-timer-num').textContent=m+':'+(s<10?'0':'')+s;
  const circ=163.4;const offset=circ-(left/180)*circ;
  const ring=document.getElementById('wh-ring-fill');ring.style.strokeDashoffset=offset;
  if(left<=30) ring.style.stroke='var(--red)';
  else if(left<=60) ring.style.stroke='var(--gold)';
  else ring.style.stroke='var(--orange)';
}
function checkWinnersInput(){
  const inp=document.getElementById('winners-input');
  const val=inp.value.trim().toLowerCase();
  if(!val) return;
  let matched=false;
  wData.forEach(w=>{
    const key=w.year+'_'+w.name;
    if(wFound.has(key)) return;
    const nameL=w.name.toLowerCase();
    const aliases={'west germany':'west germany','w germany':'west germany','germany':'germany','england':'england','brasil':'brazil','man utd':'manchester united','man united':'manchester united','man city':'manchester city','real':'real madrid','barca':'barcelona','ac milan':'ac milan','milan':'ac milan','inter':'inter milan','dortmund':'borussia dortmund','steaua':'steaua bucharest','red star':'red star belgrade','forest':'nottingham forest','nottm forest':'nottingham forest','psv':'psv eindhoven'};
    const check=aliases[val]||val;
    if(nameL.includes(check)||check.includes(nameL.split(' ')[0])||nameL===check){
      wFound.add(key);matched=true;
      const slot=document.getElementById(getSlotId(w));
      if(slot){slot.className='winner-slot found';slot.querySelector('.ws-name').textContent=w.name;slot.querySelector('.ws-check').textContent='✅';}
    }
  });
  if(matched){
    inp.value='';
    const found=wFound.size;
    document.getElementById('winners-found-count').textContent=found;
    document.getElementById('winners-score').textContent=found;
    document.getElementById('winners-prog-text').textContent=found+' / '+wData.length+' found';
    document.getElementById('hint-feed').textContent='✅ Got one!';
    document.getElementById('hint-feed').style.color='var(--green)';
    setTimeout(()=>{document.getElementById('hint-feed').textContent='';},1000);
    if(found===wData.length){clearInterval(wTimer);setTimeout(()=>endWinners(),500);}
  }else{
    document.getElementById('winners-input').classList.add('wrong-flash');
    document.getElementById('hint-feed').textContent='❌ Not found or already entered';
    document.getElementById('hint-feed').style.color='var(--red)';
    setTimeout(()=>{document.getElementById('winners-input').classList.remove('wrong-flash');document.getElementById('hint-feed').textContent='';},1200);
  }
}
document.getElementById('winners-input').addEventListener('keydown',e=>{if(e.key==='Enter')checkWinnersInput();});
document.getElementById('winners-submit-btn').addEventListener('click',checkWinnersInput);
document.getElementById('winners-back-btn').addEventListener('click',()=>{clearInterval(wTimer);showScreen('home-screen');});
function endWinners(){
  clearInterval(wTimer);
  const found=wFound.size;const total=wData.length;
  wData.forEach(w=>{
    const key=w.year+'_'+w.name;
    if(!wFound.has(key)){
      const slot=document.getElementById(getSlotId(w));
      if(slot){slot.className='winner-slot missed';slot.querySelector('.ws-name').textContent=w.name;slot.querySelector('.ws-check').textContent='❌';}
    }
  });
  const missed=wData.filter(w=>!wFound.has(w.year+'_'+w.name)).map(w=>w.name);
  const uniqueMissed=[...new Set(missed)];
  const xpe=found*5+(found===total?50:0);
  document.getElementById('wo-found').textContent=found;
  document.getElementById('wo-total').textContent=total;
  document.getElementById('wo-missed').textContent=uniqueMissed.length?uniqueMissed.slice(0,5).join(', ')+(uniqueMissed.length>5?' +more':''):'None — perfect!';
  document.getElementById('wo-xp').textContent='+'+xpe;
  const oldXP=pd.xp;
  pd.xp+=xpe;pd.gamesPlayed+=1;savePD();saveLB();updateHomeRank();
  showRankResults(xpe,oldXP,'','wo-rank-icon','wo-rank-name',null,null,'winners-rank-up-banner','winners-rank-up-name');
  document.getElementById('winners-gameover').classList.add('active');
}
document.getElementById('wo-retry-btn').addEventListener('click',()=>{document.getElementById('winners-gameover').classList.remove('active');startWinners(wMode);});
document.getElementById('wo-home-btn').addEventListener('click',()=>{document.getElementById('winners-gameover').classList.remove('active');showScreen('home-screen');});
