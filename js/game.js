(() => {
  const STORAGE_KEY = 'bhdsf-ocean-game-v1';
  const COLORS = ['mint', 'coral', 'sun', 'sky'];
  const DEFAULT_STATE = {
    players: [
      { name: 'اللاعب الأول', score: 0, position: 0 },
      { name: 'اللاعب الثاني', score: 0, position: 0 }
    ],
    currentPlayer: 0,
    unlockedLevel: 1,
    completedLevels: [],
    activeLevel: 1,
    phase: 'movement',
    attemptsRemaining: 0,
    attemptsRolled: 0,
    answered: false
  };
  const state = loadState();
  let toastTimeout;

  const ui = {
    board: document.getElementById('board-route'),
    playerList: document.getElementById('player-list'),
    scoreList: document.getElementById('score-list'),
    progressCount: document.getElementById('progress-count'),
    progressBar: document.getElementById('progress-bar'),
    levelCounter: document.getElementById('level-counter'),
    challengeCategory: document.getElementById('challenge-category'),
    challengeLevel: document.getElementById('challenge-level'),
    challengeTitle: document.getElementById('challenge-title'),
    prompt: document.getElementById('challenge-prompt'),
    answers: document.getElementById('answer-grid'),
    feedback: document.getElementById('game-feedback'),
    turnName: document.getElementById('turn-player-name'),
    attemptsLeft: document.getElementById('attempts-left'),
    movementDie: document.getElementById('movement-die'),
    attemptsDie: document.getElementById('attempts-die'),
    rollMovement: document.getElementById('roll-movement'),
    rollAttempts: document.getElementById('roll-attempts'),
    hint: document.getElementById('hint-button'),
    assistant: document.getElementById('assistant-message'),
    turnIndicator: document.getElementById('turn-indicator-text'),
    toast: document.getElementById('toast')
  };

  function loadState() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      if (!saved || !Array.isArray(saved.players) || !saved.players.length) return structuredClone(DEFAULT_STATE);
      const validCompleted = Array.isArray(saved.completedLevels)
        ? saved.completedLevels.filter((level) => Number.isInteger(level) && level >= 1 && level <= 40)
        : [];
      return {
        ...structuredClone(DEFAULT_STATE),
        ...saved,
        players: saved.players.slice(0, 4).map((player, index) => ({
          name: typeof player.name === 'string' ? player.name.slice(0, 18) : `اللاعب ${index + 1}`,
          score: Number.isFinite(player.score) ? Math.max(0, player.score) : 0,
          position: Number.isInteger(player.position) ? Math.min(40, Math.max(0, player.position)) : 0
        })),
        currentPlayer: Number.isInteger(saved.currentPlayer) ? saved.currentPlayer : 0,
        unlockedLevel: Number.isInteger(saved.unlockedLevel) ? Math.min(40, Math.max(1, saved.unlockedLevel)) : 1,
        completedLevels: validCompleted,
        activeLevel: Number.isInteger(saved.activeLevel) ? Math.min(40, Math.max(1, saved.activeLevel)) : 1,
        phase: ['movement', 'attempts', 'answer', 'complete'].includes(saved.phase) ? saved.phase : 'movement',
        attemptsRemaining: Number.isInteger(saved.attemptsRemaining) ? Math.max(0, saved.attemptsRemaining) : 0,
        attemptsRolled: Number.isInteger(saved.attemptsRolled) ? Math.max(0, saved.attemptsRolled) : 0,
        answered: Boolean(saved.answered)
      };
    } catch {
      return structuredClone(DEFAULT_STATE);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      showToast('تعذر حفظ التقدم على هذا الجهاز.');
    }
  }

  function activePlayer() {
    return state.players[state.currentPlayer % state.players.length];
  }

  function currentCard() {
    return window.BHDSFCards[state.activeLevel - 1];
  }

  function render() {
    renderBoard();
    renderPlayers();
    renderScores();
    renderChallenge();
    const completed = state.completedLevels.length;
    ui.progressCount.textContent = `${toArabic(completed)} / ٤٠`;
    ui.progressBar.style.width = `${Math.max(2.5, completed / 40 * 100)}%`;
    ui.levelCounter.textContent = `المحطة ${toArabic(state.unlockedLevel)} من ٤٠`;
    ui.turnName.textContent = activePlayer().name;
    ui.turnIndicator.textContent = `الدور الحالي: ${activePlayer().name}`;
    ui.rollMovement.disabled = state.phase !== 'movement' || state.unlockedLevel === 40 && state.completedLevels.length === 40;
    ui.rollAttempts.disabled = state.phase !== 'attempts';
    ui.hint.disabled = !['answer', 'attempts'].includes(state.phase);
    ui.movementDie.textContent = state.lastMovement ? window.BHDSFDice.faceFor(state.lastMovement) : '⚄';
    ui.attemptsDie.textContent = state.attemptsRolled || '?';
  }

  function renderBoard() {
    ui.board.replaceChildren();
    for (let level = 1; level <= 40; level += 1) {
      const complete = state.completedLevels.includes(level);
      const open = level <= state.unlockedLevel;
      const tile = document.createElement('button');
      tile.type = 'button';
      tile.className = `level-tile${open ? ' unlocked' : ''}${complete ? ' completed' : ''}${level === state.activeLevel ? ' current' : ''}`;
      tile.textContent = toArabic(level);
      tile.disabled = true;
      tile.setAttribute('aria-label', `المحطة ${toArabic(level)}، ${complete ? 'مكتملة' : open ? 'مفتوحة' : 'مقفلة'}`);
      tile.title = `المحطة ${toArabic(level)}${complete ? ' · مكتملة' : open ? ' · مفتوحة' : ' · مقفلة'}`;
      const playersHere = state.players.filter((player) => player.position === level);
      if (playersHere.length) {
        const markers = document.createElement('span');
        markers.className = 'player-markers';
        markers.setAttribute('aria-hidden', 'true');
        playersHere.forEach((player) => {
          const marker = document.createElement('i');
          marker.className = `player-marker ${COLORS[state.players.indexOf(player)]}`;
          markers.append(marker);
        });
        tile.append(markers);
      }
      ui.board.append(tile);
    }
  }

  function renderPlayers() {
    ui.playerList.replaceChildren();
    state.players.forEach((player, index) => {
      const row = document.createElement('div');
      row.className = `player-row${index === state.currentPlayer ? ' active' : ''}`;
      const avatar = document.createElement('span');
      avatar.className = `player-avatar ${COLORS[index]}`;
      avatar.textContent = player.name.trim().charAt(0) || toArabic(index + 1);
      const info = document.createElement('span');
      info.className = 'player-info';
      const name = document.createElement('strong');
      name.textContent = player.name;
      const position = document.createElement('small');
      position.textContent = `المحطة ${toArabic(Math.max(1, player.position))}`;
      const score = document.createElement('span');
      score.className = 'player-points';
      score.textContent = `${toArabic(player.score)} ن`;
      info.append(name, position);
      row.append(avatar, info, score);
      ui.playerList.append(row);
    });
  }

  function renderScores() {
    ui.scoreList.replaceChildren();
    [...state.players].sort((a, b) => b.score - a.score).forEach((player) => {
      const originalIndex = state.players.indexOf(player);
      const row = document.createElement('div');
      row.className = 'score-row';
      const avatar = document.createElement('span');
      avatar.className = `player-avatar ${COLORS[originalIndex]}`;
      avatar.textContent = player.name.trim().charAt(0) || toArabic(originalIndex + 1);
      const name = document.createElement('span');
      name.className = 'score-name';
      name.textContent = player.name;
      const score = document.createElement('span');
      score.className = 'score-value';
      score.textContent = `${toArabic(player.score)} نقطة`;
      row.append(avatar, name, score);
      ui.scoreList.append(row);
    });
  }

  function renderChallenge() {
    const card = currentCard();
    ui.challengeCategory.textContent = state.phase === 'movement' ? 'بطاقة التحدي' : card.category;
    ui.challengeLevel.textContent = `المحطة ${toArabic(state.activeLevel)}`;
    ui.challengeTitle.textContent = state.phase === 'movement'
      ? 'استعدوا للانطلاق'
      : state.phase === 'complete' ? 'أحسنتم، أتممتم التحدي!' : 'كيف ستتصرف؟';
    ui.prompt.textContent = state.phase === 'movement'
      ? 'ارمِ نرد الحركة لتصل إلى محطتك التالية، ثم تعاونوا للإجابة عن التحدي.'
      : card.question;
    ui.answers.replaceChildren();
    if (state.phase !== 'movement') {
      card.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'answer-option';
        button.textContent = `${toArabic(index + 1)}. ${choice}`;
        button.disabled = state.phase !== 'answer';
        if (state.phase === 'complete' && index === card.answer) button.classList.add('correct');
        if (state.phase === 'answer') button.addEventListener('click', () => submitAnswer(index, button));
        ui.answers.append(button);
      });
    }
    ui.attemptsLeft.textContent = state.phase === 'answer'
      ? `المحاولات المتبقية: ${toArabic(state.attemptsRemaining)}`
      : state.phase === 'complete' ? 'اكتمل التحدي' : 'المحاولات: —';
    if (state.phase === 'movement') {
      ui.feedback.innerHTML = 'حان دور <strong id="turn-player-name"></strong>.';
      document.getElementById('turn-player-name').textContent = activePlayer().name;
    } else if (state.phase === 'attempts') {
      ui.feedback.textContent = 'اكشف عدد المحاولات، ثم اختاروا إجابتكم.';
    } else if (state.phase === 'complete') {
      ui.feedback.textContent = 'رائع! انتقلت الرحلة إلى اللاعب التالي.';
    } else {
      ui.feedback.textContent = 'تحدثوا معاً قبل اختيار الإجابة.';
    }
  }

  function selectLevel(level) {
    if (state.phase !== 'movement') {
      showToast('أكملوا الدور الحالي قبل اختيار محطة أخرى.');
      return;
    }
    state.activeLevel = level;
    state.phase = 'attempts';
    state.lastMovement = 0;
    state.attemptsRolled = 0;
    state.attemptsRemaining = 0;
    state.answered = false;
    saveState();
    render();
  }

  function rollMovement() {
    if (state.phase !== 'movement') return;
    const movement = window.BHDSFDice.rollMovement();
    const player = activePlayer();
    const target = Math.min(state.unlockedLevel, Math.max(1, player.position + movement));
    player.position = target;
    state.activeLevel = target;
    state.lastMovement = movement;
    state.attemptsRolled = 0;
    state.attemptsRemaining = 0;
    state.answered = false;
    state.phase = 'attempts';
    animateDie(ui.movementDie);
    saveState();
    render();
    showToast(`تحرك ${player.name} ${toArabic(movement)} خطوات، ووصل إلى المحطة ${toArabic(target)}.`);
  }

  function rollAttempts() {
    if (state.phase !== 'attempts') return;
    state.attemptsRolled = window.BHDSFDice.rollAttempts();
    state.attemptsRemaining = state.attemptsRolled;
    state.phase = 'answer';
    animateDie(ui.attemptsDie);
    saveState();
    render();
    showToast(`لديكم ${toArabic(state.attemptsRolled)} محاولات. فكروا معاً!`);
  }

  function submitAnswer(index, button) {
    if (state.phase !== 'answer') return;
    const card = currentCard();
    if (index === card.answer) {
      button.classList.add('correct');
      const points = 100 + Math.max(0, state.attemptsRemaining - 1) * 25;
      activePlayer().score += points;
      if (!state.completedLevels.includes(state.activeLevel)) state.completedLevels.push(state.activeLevel);
      state.completedLevels.sort((a, b) => a - b);
      while (state.completedLevels.includes(state.unlockedLevel) && state.unlockedLevel < 40) state.unlockedLevel += 1;
      state.phase = 'complete';
      ui.assistant.textContent = window.BHDSFAssistant.getFeedback(card, true);
      ui.hint.disabled = true;
      ui.feedback.textContent = `إجابة صحيحة! أضيفت ${toArabic(points)} نقطة إلى رصيد ${activePlayer().name}.`;
      state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
      if (state.completedLevels.length === 40) showToast('أكملتم المحطات الأربعين! رحلة رائعة.');
      else showToast(`إجابة صحيحة، وربحتم ${toArabic(points)} نقطة!`);
      window.setTimeout(() => {
        state.phase = 'movement';
        state.attemptsRemaining = 0;
        state.attemptsRolled = 0;
        saveState();
        render();
      }, 1300);
    } else {
      button.classList.add('incorrect');
      state.attemptsRemaining -= 1;
      state.answered = true;
      ui.assistant.textContent = window.BHDSFAssistant.getFeedback(card, false);
      if (state.attemptsRemaining <= 0) {
        state.phase = 'complete';
        state.currentPlayer = (state.currentPlayer + 1) % state.players.length;
        showToast('انتهت المحاولات. تذكّروا الفكرة، والمحطة التالية بانتظاركم.');
        window.setTimeout(() => {
          state.phase = 'movement';
          state.attemptsRolled = 0;
          saveState();
          render();
        }, 1600);
      } else {
        ui.feedback.textContent = `ليست هذه الإجابة؛ بقيت ${toArabic(state.attemptsRemaining)} محاولة. جرّبوا مجدداً.`;
        showToast(`بقيت ${toArabic(state.attemptsRemaining)} محاولة.`);
      }
    }
    saveState();
    render();
    if (index !== card.answer && state.phase === 'answer') {
      const selected = ui.answers.children[index];
      if (selected) selected.classList.add('incorrect');
    }
  }

  function addPlayer() {
    if (state.players.length >= 4) {
      showToast('يمكن أن يشارك حتى أربعة لاعبين.');
      return;
    }
    const defaultName = `اللاعب ${toArabic(state.players.length + 1)}`;
    const enteredName = window.prompt('ما اسم اللاعب الجديد؟', defaultName);
    if (enteredName === null) return;
    const name = enteredName.trim().slice(0, 18);
    if (!name) {
      showToast('اكتبوا اسماً قصيراً للاعب.');
      return;
    }
    state.players.push({ name, score: 0, position: 0 });
    saveState();
    render();
  }

  function showHint() {
    ui.assistant.textContent = window.BHDSFAssistant.getHint(currentCard());
    ui.hint.disabled = true;
    showToast('أرسل المرشد تلميحاً للتفكير.');
  }

  function resetGame() {
    if (!window.confirm('هل تريدون بدء رحلة جديدة؟ سيتم حذف النقاط والتقدم المحفوظ.')) return;
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, structuredClone(DEFAULT_STATE));
    state.lastMovement = 0;
    ui.assistant.textContent = window.BHDSFAssistant.getWelcome();
    saveState();
    render();
    showToast('بدأت رحلة جديدة.');
  }

  function animateDie(element) {
    element.classList.remove('rolling');
    void element.offsetWidth;
    element.classList.add('rolling');
    window.setTimeout(() => element.classList.remove('rolling'), 500);
  }

  function showToast(message) {
    ui.toast.textContent = message;
    ui.toast.classList.add('visible');
    window.clearTimeout(toastTimeout);
    toastTimeout = window.setTimeout(() => ui.toast.classList.remove('visible'), 2400);
  }

  function toArabic(value) {
    return String(value).replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)]);
  }

  document.getElementById('roll-movement').addEventListener('click', rollMovement);
  document.getElementById('roll-attempts').addEventListener('click', rollAttempts);
  document.getElementById('add-player').addEventListener('click', addPlayer);
  document.getElementById('hint-button').addEventListener('click', showHint);
  document.getElementById('encourage-button').addEventListener('click', () => {
    ui.assistant.textContent = window.BHDSFAssistant.getFamilyTip();
  });
  document.getElementById('reset-button').addEventListener('click', resetGame);

  if (!state.players.length) state.players = structuredClone(DEFAULT_STATE.players);
  state.currentPlayer %= state.players.length;
  if (!state.lastMovement) state.lastMovement = 0;
  if (state.phase === 'answer' && state.attemptsRemaining < 1) state.phase = 'attempts';
  if (state.phase === 'complete') state.phase = 'movement';
  ui.assistant.textContent = window.BHDSFAssistant.getWelcome();
  render();
})();