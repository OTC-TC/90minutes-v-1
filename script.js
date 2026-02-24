// ════════════════════════════════════════════
// QUIZ DATA
// ════════════════════════════════════════════
const QUIZZES = {
  prem: {
    name: 'PREMIER LEAGUE',
    icon: '🦁',
    questions: [
      { q: "Who is the Premier League's all-time top goal scorer?", opts: ["Wayne Rooney","Thierry Henry","Alan Shearer","Sergio Agüero"], ans: 2, diff: 'easy', fact: "Alan Shearer scored 260 goals, mainly for Blackburn Rovers and Newcastle United." },
      { q: "Which player wore the No. 11 shirt for Manchester City in 2025?", opts: ["Kevin De Bruyne","Jack Grealish","Phil Foden","Erling Haaland"], ans: 1, diff: 'easy', fact: "Jack Grealish, famous for his dribbling style and signature shin-pad placement." },
      { q: "Which team is nicknamed \"The Gunners\"?", opts: ["Liverpool","Manchester City","Arsenal","Tottenham Hotspur"], ans: 2, diff: 'medium', fact: "Arsenal were named after the Royal Arsenal armament factory in Woolwich." },
      { q: "Who managed Arsenal's 'Invincibles' in the 2003–04 season?", opts: ["Arsène Wenger","Unai Emery","Mikel Arteta","George Graham"], ans: 0, diff: 'medium', fact: "Arsène Wenger led Arsenal to a 38-game unbeaten league season — a record that still stands." },
      { q: "Which current Premier League club is nicknamed \"The Seagulls\"?", opts: ["West Ham","Crystal Palace","Brighton","Bournemouth"], ans: 2, diff: 'medium', fact: "Brighton & Hove Albion's nickname refers to their seaside location on the south coast." },
      { q: "Which goalkeeper has the most clean sheets in Premier League history?", opts: ["David De Gea","Petr Čech","Edwin van der Sar","Peter Schmeichel"], ans: 1, diff: 'hard', fact: "Petr Čech holds the record with 202 clean sheets across his Premier League career." },
      { q: "Which player scored a Premier League goal for seven different clubs?", opts: ["Darren Bent","Nicolas Anelka","Andy Cole","Craig Bellamy"], ans: 3, diff: 'hard', fact: "Craig Bellamy scored for Coventry, Newcastle, Blackburn, Liverpool, West Ham, Man City, and Cardiff." },
      { q: "Who is the all-time Premier League assist leader?", opts: ["Frank Lampard","Ryan Giggs","Cesc Fàbregas","Kevin De Bruyne"], ans: 1, diff: 'hard', fact: "Ryan Giggs leads with 162 Premier League assists, all for Manchester United." },
      { q: "Which player scored the first-ever perfect hat-trick (left, right, header) in PL history?", opts: ["Ian Wright","Jimmy Floyd Hasselbaink","Matt Le Tissier","Mark Robins"], ans: 2, diff: 'impossible', fact: "Matt Le Tissier achieved the feat early in the Premier League era during his time at Southampton." },
      { q: "Who is the only player to score, assist, and receive a red card in the same Premier League match?", opts: ["Aleksandar Mitrović","Steven Gerrard","Gareth Bale","Luis Suárez"], ans: 0, diff: 'impossible', fact: "Mitrović achieved the rare trifecta while playing for Fulham — goal, assist, then red card." }
    ]
  },
  liga: {
    name: 'LA LIGA',
    icon: '🌞',
    questions: [
      { q: "Who is La Liga's all-time top goal scorer?", opts: ["Cristiano Ronaldo","El Stiffano","Lionel Messi","Luis Suárez"], ans: 2, diff: 'easy', fact: "Lionel Messi scored 474 La Liga goals across his career at Barcelona." },
      { q: "Which club has won the most La Liga titles?", opts: ["Barcelona","Atlético Madrid","Real Madrid","Valencia"], ans: 2, diff: 'medium', fact: "Real Madrid have won La Liga a record 35 times." },
      { q: "Who is known as 'El Niño' in La Liga?", opts: ["Fernando Torres","David Villa","Iker Casillas","Andrés Iniesta"], ans: 0, diff: 'medium', fact: "Fernando Torres earned the nickname 'The Kid' due to his youth and explosive emergence at Atlético Madrid." },
      { q: "Which team went unbeaten throughout the 1929–30 La Liga season?", opts: ["Athletic Bilbao","Real Sociedad","Real Madrid","Espanyol"], ans: 0, diff: 'hard', fact: "Athletic Bilbao went the entire inaugural La Liga season without losing a match." },
      { q: "Who scored the fastest hat-trick in La Liga history?", opts: ["David Villa","Cristiano Ronaldo","Kevin Gameiro","Luis Suárez"], ans: 2, diff: 'hard', fact: "Kevin Gameiro scored his hat-trick in just 3 minutes 30 seconds for Sevilla in 2015." },
      { q: "Which goalkeeper has the most clean sheets in La Liga?", opts: ["Iker Casillas","Jan Oblak","Victor Valdés","Thibaut Courtois"], ans: 0, diff: 'hard', fact: "Iker Casillas kept 177 La Liga clean sheets, all for Real Madrid." },
      { q: "Who was the first non-Spanish player to win the Pichichi Trophy?", opts: ["Ferenc Puskás","Hugo Sánchez","Samuel Eto'o","Ronaldo Nazário"], ans: 1, diff: 'impossible', fact: "Mexican striker Hugo Sánchez won the Pichichi five times with Real Madrid in the 1980s." },
      { q: "Which club has never been relegated from La Liga?", opts: ["Barcelona","Real Madrid","Athletic Bilbao","Sevilla"], ans: 2, diff: 'impossible', fact: "Athletic Bilbao have played every season in La Liga since its founding in 1929 — a remarkable record." },
      { q: "Who scored against every single La Liga team?", opts: ["Telmo Zarra","Cristiano Ronaldo","Lionel Messi","Luis Suárez"], ans: 2, diff: 'impossible', fact: "Lionel Messi is the only player in history to score against all 38 different La Liga clubs he faced." },
      { q: "Who is the youngest player to score in El Clásico?", opts: ["Lamine Yamal","Raúl","Vinícius Júnior","Bojan Krkić"], ans: 0, diff: 'impossible', fact: "Lamine Yamal scored for Barcelona against Real Madrid at just 17 years old." }
    ]
  },
  ucl: {
    name: 'CHAMPIONS LEAGUE',
    icon: '⭐',
    questions: [
      { q: "Which club has won the most UEFA Champions League/European Cup titles?", opts: ["AC Milan","Liverpool","Real Madrid","Bayern Munich"], ans: 2, diff: 'easy', fact: "Real Madrid have won the Champions League/European Cup a record 15 times." },
      { q: "Who is the all-time top scorer in Champions League history?", opts: ["Lionel Messi","Robert Lewandowski","Cristiano Ronaldo","Karim Benzema"], ans: 2, diff: 'easy', fact: "Cristiano Ronaldo holds the record with 140 Champions League goals." },
      { q: "Which team completed the first treble (League, Cup, Champions League) in men's football?", opts: ["Celtic","Ajax","Barcelona","Manchester United"], ans: 0, diff: 'medium', fact: "Celtic's 1966–67 'Lisbon Lions' won every competition they entered — the first ever treble in European football." },
      { q: "Which player has the most Champions League assists in history?", opts: ["Cristiano Ronaldo","Lionel Messi","Angel Di Maria","Kevin De Bruyne"], ans: 1, diff: 'medium', fact: "Lionel Messi leads with 42 Champions League assists." },
      { q: "Which goalkeeper holds the record for most clean sheets in UCL history?", opts: ["Iker Casillas","Gianluigi Buffon","Petr Čech","Manuel Neuer"], ans: 0, diff: 'medium', fact: "Iker Casillas kept 57 clean sheets in the Champions League." },
      { q: "Which team has the longest unbeaten home record in UCL history?", opts: ["Bayern Munich","Barcelona","Real Madrid","Manchester United"], ans: 0, diff: 'hard', fact: "Bayern Munich went 43 consecutive home games unbeaten in the Champions League." },
      { q: "Who scored the fastest goal in Champions League history?", opts: ["Roy Makaay","Paolo Maldini","Clarence Seedorf","Alessandro Del Piero"], ans: 0, diff: 'hard', fact: "Roy Makaay scored for Bayern Munich against Real Madrid in just 10.12 seconds in 2007 — the fastest ever UCL goal." },
      { q: "Which player has won the most Champions League titles?", opts: ["Francisco Gento","Cristiano Ronaldo","Paolo Maldini","Lionel Messi"], ans: 0, diff: 'hard', fact: "Francisco Gento won 6 European Cups with Real Madrid between 1956 and 1966." },
      { q: "Which team achieved the biggest aggregate win in UCL history?", opts: ["Liverpool","Real Madrid","Bayern Munich","Barcelona"], ans: 2, diff: 'impossible', fact: "Bayern Munich beat Sporting CP 12–1 on aggregate in the 2008–09 round of 16." },
      { q: "Who is the youngest goalscorer in Champions League history?", opts: ["Ansu Fati","Peter Ofori-Quaye","Bojan Krkić","Youssoufa Moukoko"], ans: 1, diff: 'impossible', fact: "Peter Ofori-Quaye scored for Rosenborg in 1996 at just 17 years and 195 days old." }
    ]
  },
  wc: {
    name: 'WORLD CUP',
    icon: '🌍',
    questions: [
      { q: "Which country has won the most FIFA World Cup titles?", opts: ["Germany","Italy","Brazil","Argentina"], ans: 2, diff: 'easy', fact: "Brazil have won the World Cup five times: 1958, 1962, 1970, 1994, and 2002." },
      { q: "Who is the all-time top scorer in World Cup history?", opts: ["Ronaldo Nazário","Miroslav Klose","Gerd Müller","Pelé"], ans: 1, diff: 'easy', fact: "Miroslav Klose scored 16 World Cup goals across four tournaments for Germany." },
      { q: "Which country hosted and won the very first FIFA World Cup?", opts: ["Brazil","Uruguay","Argentina","Italy"], ans: 1, diff: 'medium', fact: "Uruguay hosted and won the inaugural 1930 World Cup, defeating Argentina 4–2 in the final." },
      { q: "Who holds the record for most goals in a single World Cup tournament?", opts: ["Eusébio","Just Fontaine","Gerd Müller","Sandor Kocsis"], ans: 1, diff: 'medium', fact: "Just Fontaine scored 13 goals for France at the 1958 World Cup — a record that has stood for over 60 years." },
      { q: "Which player has appeared in the most World Cup tournaments?", opts: ["Diego Maradona","Lothar Matthäus","Paolo Maldini","Cafu"], ans: 1, diff: 'medium', fact: "Lothar Matthäus appeared in five World Cups between 1982 and 1998." },
      { q: "Which team scored the most goals in a single World Cup tournament?", opts: ["Brazil 1970","Hungary 1954","Germany 2014","France 1958"], ans: 1, diff: 'hard', fact: "Hungary scored 27 goals at the 1954 World Cup in Switzerland, despite losing the final." },
      { q: "Who holds the record for most goals in a single World Cup match?", opts: ["Gerd Müller","Oleg Salenko","Eusébio","Gary Lineker"], ans: 1, diff: 'hard', fact: "Oleg Salenko scored 5 goals against Cameroon for Russia at the 1994 World Cup." },
      { q: "Who is the youngest player to ever play in a World Cup?", opts: ["Pelé","Norman Whiteside","Michael Owen","Samuel Eto'o"], ans: 1, diff: 'hard', fact: "Norman Whiteside represented Northern Ireland at just 17 years and 41 days in 1982." },
      { q: "Who is the oldest goalscorer in World Cup history?", opts: ["Dino Zoff","Roger Milla","Pat Jennings","Peter Shilton"], ans: 1, diff: 'impossible', fact: "Roger Milla scored for Cameroon at the 1994 World Cup at 42 years and 39 days old." },
      { q: "Who is the only player to win three World Cup tournaments?", opts: ["Cafu","Franz Beckenbauer","Pelé","Ronaldo"], ans: 2, diff: 'impossible', fact: "Pelé is the only player to win the World Cup three times: 1958, 1962, and 1970 with Brazil." }
    ]
  },
  weekly: {
    name: 'WEEKLY EVENT',
    icon: '🏆',
    questions: [
      { q: "Which player scored the most goals in a single Premier League season?", opts: ["Mohamed Salah","Alan Shearer","Erling Haaland","Cristiano Ronaldo"], ans: 2, diff: 'easy', fact: "Erling Haaland broke the record with 36 Premier League goals in the 2022–23 season." },
      { q: "Who was the first player to score 100 Champions League goals?", opts: ["Lionel Messi","Raul","Cristiano Ronaldo","Karim Benzema"], ans: 1, diff: 'easy', fact: "Raúl González was the first to reach 100 UCL goals, a record later shattered by Ronaldo and Messi." },
      { q: "Which country won the first ever World Cup?", opts: ["Brazil","Argentina","Uruguay","Italy"], ans: 2, diff: 'medium', fact: "Uruguay defeated Argentina 4–2 in the 1930 final on home soil in Montevideo." },
      { q: "Who is the only defender ever to win the FIFA World Player of the Year award?", opts: ["Lionel Messi","Zinedine Zidane","Kaká","Fabio Cannavaro"], ans: 3, diff: 'medium', fact: "Fabio Cannavaro won the 2006 FIFA World Player of the Year award after captaining Italy to World Cup glory — the only outfield defender to ever win it." },
      { q: "Which team has completed the continental treble the most times?", opts: ["Barcelona","Bayern Munich","Manchester United","Inter Milan"], ans: 0, diff: 'medium', fact: "Barcelona won the treble in 2008–09 and 2014–15 under Pep Guardiola and Luis Enrique." },
      { q: "Who was the first African player to win the Ballon d'Or?", opts: ["George Weah","Samuel Eto'o","Didier Drogba","Yaya Touré"], ans: 0, diff: 'hard', fact: "George Weah won the Ballon d'Or in 1995 with AC Milan — a historic first for African football." },
      { q: "Which player has scored the most goals in El Clásico history?", opts: ["Cristiano Ronaldo","Alfredo Di Stéfano","Lionel Messi","Raúl"], ans: 2, diff: 'hard', fact: "Lionel Messi scored 26 El Clásico goals across his Barcelona career." },
      { q: "Who is the youngest player to ever play in a World Cup final?", opts: ["Pelé","Kylian Mbappé","Lionel Messi","Neymar"], ans: 0, diff: 'hard', fact: "Pelé played in the 1958 World Cup final for Brazil at just 17 years old." },
      { q: "Which manager has won the most Champions League titles?", opts: ["Alex Ferguson","Carlo Ancelotti","Pep Guardiola","Zinedine Zidane"], ans: 1, diff: 'impossible', fact: "Carlo Ancelotti has won the Champions League four times: 2003, 2007 (Milan), 2014, 2022 (Real Madrid)." },
      { q: "Which player has won the most trophies in football history?", opts: ["Lionel Messi","Dani Alves","Cristiano Ronaldo","Sergio Ramos"], ans: 1, diff: 'impossible', fact: "Dani Alves won 43 major trophies across his career, the most by any footballer in history." }
    ]
  }
};

const DIFF_CLASSES = { easy: 'diff-easy', medium: 'diff-medium', hard: 'diff-hard', impossible: 'diff-impossible' };
const DIFF_LABELS = { easy: '⚽ Easy', medium: '🎯 Medium', hard: '🔥 Hard', impossible: '💀 Impossible' };
const LETTERS = ['A', 'B', 'C', 'D'];
const TOTAL_TIME = 90;

// State
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

// DOM refs
const screens = { home: 'home-screen', quiz: 'quiz-screen', results: 'results-screen' };
const modal = document.getElementById('modal');
const modalIcon = document.getElementById('modal-icon');
const modalCatName = document.getElementById('modal-cat-name');
const quizCatLabel = document.getElementById('quiz-cat-label');
const quizProgressText = document.getElementById('quiz-progress-text');
const scoreDisplay = document.getElementById('score-display');
const progressBar = document.getElementById('progress-bar');
const timerBar = document.getElementById('timer-bar');
const timerCount = document.getElementById('timer-count');
const diffTag = document.getElementById('diff-tag');
const questionText = document.getElementById('question-text');
const optionsGrid = document.getElementById('options-grid');
const feedbackBox = document.getElementById('feedback-box');
const feedbackLabel = document.getElementById('feedback-label');
const feedbackText = document.getElementById('feedback-text');
const nextWrap = document.getElementById('next-wrap');
const nextBtn = document.getElementById('next-btn');
const quizBody = document.getElementById('quiz-body');
const timeoutOverlay = document.getElementById('timeout-overlay');

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screens[id] || id).classList.add('active');
}

// ── Shuffle ──
function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

// ── Category click ──
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    currentQuizKey = card.dataset.quiz;
    const quiz = QUIZZES[currentQuizKey];
    modalIcon.textContent = quiz.icon;
    modalCatName.textContent = quiz.name;
    modal.classList.add('active');
  });
});

document.getElementById('modal-cancel-btn').addEventListener('click', () => {
  modal.classList.remove('active');
});

document.getElementById('modal-start-btn').addEventListener('click', () => {
  modal.classList.remove('active');
  currentQuiz = QUIZZES[currentQuizKey];
  startQuiz();
});

// ── Quiz Back ──
document.getElementById('quiz-back-btn').addEventListener('click', () => {
  clearInterval(timerInterval);
  timeoutOverlay.classList.remove('active');
  showScreen('home');
  reset();
});

// ── Start Quiz ──
function startQuiz() {
  reset();
  // Shuffle a copy so the original data is never mutated
  currentQuiz = { ...currentQuiz, questions: shuffle(currentQuiz.questions) };
  quizCatLabel.textContent = currentQuiz.name;
  showScreen('quiz');
  renderQuestion();
  startTimer();
}

function reset() {
  currentQ = 0;
  score = 0;
  correct = 0;
  wrong = 0;
  answered = false;
  timedOut = false;
  timeLeft = TOTAL_TIME;
  clearInterval(timerInterval);
  scoreDisplay.textContent = '0';
  progressBar.style.width = '0%';
  timerBar.style.width = '100%';
  timerBar.className = 'timer-bar-fill';
  timerCount.textContent = TOTAL_TIME;
  feedbackBox.className = 'feedback-box';
  nextWrap.className = 'next-btn-wrap';
  nextBtn.textContent = 'Next →';
}

function renderQuestion(animate = false) {
  const q = currentQuiz.questions[currentQ];
  answered = false;

  if (animate) {
    quizBody.classList.add('slide-out');
    setTimeout(() => {
      quizBody.classList.remove('slide-out');
      quizBody.classList.add('slide-in');
      _fillQuestion(q);
      setTimeout(() => quizBody.classList.remove('slide-in'), 300);
    }, 200);
  } else {
    _fillQuestion(q);
  }
}

function _fillQuestion(q) {
  // Header
  quizProgressText.textContent = `Question ${currentQ + 1} of ${currentQuiz.questions.length}`;
  progressBar.style.width = `${(currentQ / currentQuiz.questions.length) * 100}%`;

  // Difficulty
  diffTag.className = 'difficulty-tag ' + DIFF_CLASSES[q.diff];
  diffTag.textContent = DIFF_LABELS[q.diff];

  // Question
  questionText.textContent = q.q;

  // Options
  optionsGrid.innerHTML = '';
  q.opts.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `<span class="option-letter">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.addEventListener('click', () => selectAnswer(i, q));
    optionsGrid.appendChild(btn);
  });

  // Reset feedback
  feedbackBox.className = 'feedback-box';
  nextWrap.className = 'next-btn-wrap';
  nextBtn.textContent = 'Next →';
}

function selectAnswer(idx, q) {
  if (answered) return;
  answered = true;

  const btns = optionsGrid.querySelectorAll('.option-btn');
  btns.forEach(b => b.disabled = true);

  const isCorrect = idx === q.ans;
  btns[idx].classList.add(isCorrect ? 'correct' : 'wrong');
  if (!isCorrect) btns[q.ans].classList.add('correct');

  if (isCorrect) {
    score++;
    correct++;
    scoreDisplay.textContent = score;
    feedbackBox.className = 'feedback-box show feedback-correct';
    feedbackLabel.textContent = '✅ Correct!';
  } else {
    wrong++;
    feedbackBox.className = 'feedback-box show feedback-wrong';
    feedbackLabel.textContent = '❌ Wrong!';
  }
  feedbackText.textContent = q.fact;

  if (currentQ < currentQuiz.questions.length - 1) {
    nextWrap.className = 'next-btn-wrap show';
  } else {
    nextBtn.textContent = 'See Results 🏆';
    nextWrap.className = 'next-btn-wrap show';
  }
}

nextBtn.addEventListener('click', () => {
  currentQ++;
  if (currentQ >= currentQuiz.questions.length) {
    finishQuiz();
  } else {
    renderQuestion(true);
  }
});

// ── Timer ──
function startTimer() {
  timerBar.style.width = '100%';
  timerCount.textContent = timeLeft;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerCount.textContent = timeLeft;
    const pct = (timeLeft / TOTAL_TIME) * 100;
    timerBar.style.width = pct + '%';

    if (timeLeft <= 20) {
      timerBar.classList.add('warn');
    }
    if (timeLeft <= 10) {
      timerBar.classList.remove('warn');
      timerBar.classList.add('danger');
      timerCount.style.color = '#e53935';
      timerCount.style.animation = 'pulse 1s infinite';
    }
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      onTimeout();
    }
  }, 1000);
}

function onTimeout() {
  timedOut = true;
  timeoutOverlay.classList.add('active');
}

document.getElementById('timeout-results-btn').addEventListener('click', () => {
  timeoutOverlay.classList.remove('active');
  finishQuiz();
});

// ── Results ──
function finishQuiz() {
  clearInterval(timerInterval);
  timeoutOverlay.classList.remove('active');

  const totalAnswered = correct + wrong;
  const pct = totalAnswered > 0 ? Math.round((correct / currentQuiz.questions.length) * 100) : 0;

  document.getElementById('results-score-num').textContent = score;
  document.getElementById('stat-correct').textContent = correct;
  document.getElementById('stat-wrong').textContent = wrong;
  document.getElementById('stat-pct').textContent = pct + '%';

  // Ring animation
  const circumference = 2 * Math.PI * 70; // 439.82
  const offset = circumference - (score / 10) * circumference;
  const ring = document.getElementById('ring-fill');
  ring.style.strokeDashoffset = offset;

  let grade, quote, attr, ringClass;
  if (score >= 9) {
    grade = '⚡ Legendary';
    quote = '"You know this game better than most coaches. I would sign you tomorrow."';
    attr = '— Pep Guardiola';
    ringClass = '';
  } else if (score >= 7) {
    grade = '🔥 World Class';
    quote = '"You did incredible. The way you understand the game, it\'s beautiful. Like Messi in 2011."';
    attr = '— Pep Guardiola';
    ringClass = '';
  } else if (score >= 5) {
    grade = '🎯 Solid Display';
    quote = '"Decent. Not special… yet."';
    attr = '— Jose Mourinho';
    ringClass = 'mid';
  } else if (score >= 3) {
    grade = '😬 Room to Grow';
    quote = '"This is not football. This is comedy."';
    attr = '— Jose Mourinho';
    ringClass = 'fail';
  } else {
    grade = '💀 Did You Even Watch?';
    quote = '"I have seen better decisions made by a goalpost. Start over."';
    attr = '— Jose Mourinho';
    ringClass = 'fail';
  }

  ring.className = 'ring-fill' + (ringClass ? ' ' + ringClass : '');
  document.getElementById('results-grade').textContent = grade;
  document.getElementById('results-quote').textContent = quote;
  document.getElementById('results-attr').textContent = attr;

  setTimeout(() => showScreen('results'), 100);
}

document.getElementById('retry-btn').addEventListener('click', () => {
  currentQuiz = QUIZZES[currentQuizKey]; // reset to original before reshuffling
  startQuiz();
});

document.getElementById('home-btn').addEventListener('click', () => {
  showScreen('home');
  reset();
});
