(() => {
  const STORAGE_KEY = 'bhdsf-ocean-game-v1';
  const COLORS = ['mint', 'coral', 'sun', 'sky'];
  const DEFAULT_STATE = {
    players: [
      { name: 'اللاعب الأول', score: 0, position: 0, correctStreak: 0 },
      { name: 'اللاعب الثاني', score: 0, position: 0, correctStreak: 0 }
    ],
    playerCount: 2,
    currentPlayer: 0,
    unlockedLevel: 1,
    completedLevels: [],
    activeLevel: 1,
    phase: 'movement',
    attemptsRemaining: 0,
    attemptsRolled: 0,
    activeDifficulty: 'standard',
    activeQuestionOffset: 0,
    answered: false
  };
  const state = loadState();
  let toastTimeout;

  const ui = {
    board: document.getElementById('board-route'),
    dialog: document.getElementById('challenge-dialog'),
    cardArt: document.getElementById('challenge-art'),
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
      const players = saved.players
        .filter((player) => player && typeof player === 'object' && !Array.isArray(player))
        .slice(0, 4)
        .map((player, index) => ({
          name: typeof player.name === 'string' ? player.name.slice(0, 18) : `اللاعب ${index + 1}`,
          score: Number.isFinite(player.score) ? Math.min(Number.MAX_SAFE_INTEGER, Math.max(0, player.score)) : 0,
          position: Number.isInteger(player.position) ? Math.min(40, Math.max(0, player.position)) : 0,
          correctStreak: Number.isInteger(player.correctStreak) ? Math.min(3, Math.max(0, player.correctStreak)) : 0
        }));
      if (!players.length) return structuredClone(DEFAULT_STATE);
      const playerCount = saved.playerCount === 1 ? 1 : saved.playerCount === 2 ? 2 : Math.min(2, players.length);
      while (players.length < playerCount) players.push({ ...DEFAULT_STATE.players[players.length] });
      const validCompleted = Array.isArray(saved.completedLevels)
        ? [...new Set(saved.completedLevels.filter((level) => Number.isInteger(level) && level >= 1 && level <= 40))]
        : [];
      const unlockedLevel = Number.isInteger(saved.unlockedLevel) ? Math.min(40, Math.max(1, saved.unlockedLevel)) : 1;
      const currentPlayer = Number.isInteger(saved.currentPlayer) ? saved.currentPlayer : 0;
      return {
        ...structuredClone(DEFAULT_STATE),
        ...saved,
        players,
        playerCount,
        currentPlayer: ((currentPlayer % playerCount) + playerCount) % playerCount,
        unlockedLevel,
        completedLevels: validCompleted,
        activeLevel: Number.isInteger(saved.activeLevel) ? Math.min(unlockedLevel, Math.max(1, saved.activeLevel)) : 1,
        phase: ['movement', 'attempts', 'answer', 'complete'].includes(saved.phase) ? saved.phase : 'movement',
        attemptsRemaining: Number.isInteger(saved.attemptsRemaining) ? Math.min(3, Math.max(0, saved.attemptsRemaining)) : 0,
        attemptsRolled: Number.isInteger(saved.attemptsRolled) ? Math.min(3, Math.max(0, saved.attemptsRolled)) : 0,
        lastMovement: Number.isInteger(saved.lastMovement) ? Math.min(6, Math.max(0, saved.lastMovement)) : 0,
        activeDifficulty: saved.activeDifficulty === 'advanced' ? 'advanced' : 'standard',
        activeQuestionOffset: Number.isInteger(saved.activeQuestionOffset)
          ? Math.min(1, Math.max(0, saved.activeQuestionOffset))
          : currentPlayer % playerCount,
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
      showToast(window.BHDSFI18n.t('saveError'));
    }
  }

  function activePlayer() {
    return state.players[state.currentPlayer % state.playerCount];
  }

  function playerName(player, index) {
    const isDefaultName = /^(?:اللاعب\s+(?:الأول|الثاني|الثالث|الرابع|[٠-٩0-9]+)|player\s+[1-4])$/i.test(player.name.trim());
    return isDefaultName
      ? `${window.BHDSFI18n.t('player')} ${window.BHDSFI18n.number(index + 1)}`
      : player.name;
  }

  function currentCard() {
    const levelIndex = state.activeLevel - 1;
    const domainIndex = Math.floor(levelIndex / 10);
    const questionIndex = levelIndex % 10;
    let card;
    if (state.activeDifficulty !== 'advanced') {
      card = window.BHDSFCards[domainIndex * 10 + (questionIndex + state.activeQuestionOffset) % 10];
    } else {
      const advancedCards = window.BHDSFAdvancedCards[domainIndex];
      card = advancedCards[(questionIndex + state.activeQuestionOffset) % advancedCards.length];
    }
    return window.BHDSFI18n.localizeCard(
      card,
      state.activeLevel,
      state.activeDifficulty === 'advanced',
      state.activeQuestionOffset
    );
  }

  function render() {
    window.BHDSFI18n.apply();
    renderBoard();
    renderPlayers();
    renderScores();
    renderChallenge();
    const completed = state.completedLevels.length;
    ui.progressCount.textContent = window.BHDSFI18n.t('progressCount', {
      completed: window.BHDSFI18n.number(completed),
      total: window.BHDSFI18n.number(40)
    });
    ui.progressBar.value = completed;
    ui.levelCounter.textContent = window.BHDSFI18n.t('stationCounter', {
      level: window.BHDSFI18n.number(state.unlockedLevel),
      total: window.BHDSFI18n.number(40)
    });
    ui.turnIndicator.textContent = window.BHDSFI18n.t('turnCurrent', {
      name: playerName(activePlayer(), state.currentPlayer)
    });
    document.getElementById('one-player').setAttribute('aria-pressed', String(state.playerCount === 1));
    document.getElementById('two-players').setAttribute('aria-pressed', String(state.playerCount === 2));
    ui.rollMovement.disabled = state.phase !== 'movement' || state.unlockedLevel === 40 && state.completedLevels.length === 40;
    ui.rollAttempts.disabled = state.phase !== 'attempts';
    ui.hint.disabled = !['answer', 'attempts'].includes(state.phase);
    ui.movementDie.textContent = state.lastMovement ? window.BHDSFDice.faceFor(state.lastMovement) : '⚄';
    ui.attemptsDie.textContent = state.attemptsRolled
      ? window.BHDSFI18n.number(state.attemptsRolled)
      : '?';
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
      const status = complete ? window.BHDSFI18n.t('completed') : open
        ? window.BHDSFI18n.t('unlocked')
        : window.BHDSFI18n.t('locked');
      const label = window.BHDSFI18n.t('stationLabel', {
        level: window.BHDSFI18n.number(level),
        status
      });
      tile.setAttribute('aria-label', label);
      tile.title = label;
      const playersHere = state.players.slice(0, state.playerCount).filter((player) => player.position === level);
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
    state.players.slice(0, state.playerCount).forEach((player, index) => {
      const row = document.createElement('div');
      row.className = `player-row${index === state.currentPlayer ? ' active' : ''}`;
      const avatar = document.createElement('span');
      avatar.className = `player-avatar ${COLORS[index]}`;
      const nameText = playerName(player, index);
      avatar.textContent = nameText.trim().charAt(0) || window.BHDSFI18n.number(index + 1);
      const info = document.createElement('span');
      info.className = 'player-info';
      const name = document.createElement('strong');
      name.textContent = nameText;
      const position = document.createElement('small');
      position.textContent = window.BHDSFI18n.t('playerAt', {
        level: window.BHDSFI18n.number(Math.max(1, player.position))
      });
      const score = document.createElement('span');
      score.className = 'player-points';
      score.textContent = `${window.BHDSFI18n.number(player.score)} ${window.BHDSFI18n.t('shortPoints')}`;
      info.append(name, position);
      row.append(avatar, info, score);
      ui.playerList.append(row);
    });
  }

  function renderScores() {
    ui.scoreList.replaceChildren();
    state.players.slice(0, state.playerCount).sort((a, b) => b.score - a.score).forEach((player) => {
      const originalIndex = state.players.indexOf(player);
      const row = document.createElement('div');
      row.className = 'score-row';
      const avatar = document.createElement('span');
      avatar.className = `player-avatar ${COLORS[originalIndex]}`;
      const nameText = playerName(player, originalIndex);
      avatar.textContent = nameText.trim().charAt(0) || window.BHDSFI18n.number(originalIndex + 1);
      const name = document.createElement('span');
      name.className = 'score-name';
      name.textContent = nameText;
      const score = document.createElement('span');
      score.className = 'score-value';
      score.textContent = `${window.BHDSFI18n.number(player.score)} ${window.BHDSFI18n.t('points')}`;
      row.append(avatar, name, score);
      ui.scoreList.append(row);
    });
  }

  function renderChallenge() {
    const card = currentCard();
    window.BHDSFCardArt.render(ui.cardArt, state.activeLevel, state.activeDifficulty === 'advanced');
    ui.challengeCategory.textContent = state.phase === 'movement'
      ? window.BHDSFI18n.t('challenge')
      : `${card.category}${card.difficulty === 'advanced' ? ` · ${window.BHDSFI18n.t('advanced')}` : ''}`;
    ui.challengeLevel.textContent = window.BHDSFI18n.t('playerAt', {
      level: window.BHDSFI18n.number(state.activeLevel)
    });
    ui.challengeTitle.textContent = state.phase === 'movement'
      ? window.BHDSFI18n.t('ready')
      : state.phase === 'complete' ? window.BHDSFI18n.t('allCorrect') : window.BHDSFI18n.t('howAct');
    ui.prompt.textContent = state.phase === 'movement'
      ? window.BHDSFI18n.t('intro')
      : card.question;
    ui.answers.replaceChildren();
    if (state.phase !== 'movement') {
      card.choices.forEach((choice, index) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'answer-option';
        button.textContent = `${window.BHDSFI18n.number(index + 1)}. ${choice}`;
        button.disabled = state.phase !== 'answer';
        if (state.phase === 'complete' && index === card.answer) button.classList.add('correct');
        if (state.phase === 'answer') button.addEventListener('click', () => submitAnswer(index, button));
        ui.answers.append(button);
      });
    }
    ui.attemptsLeft.textContent = state.phase === 'answer'
      ? window.BHDSFI18n.t('attemptsRemaining', { count: window.BHDSFI18n.number(state.attemptsRemaining) })
      : state.phase === 'complete' ? window.BHDSFI18n.t('done') : window.BHDSFI18n.t('attemptsDash');
    if (state.phase === 'movement') {
      ui.feedback.textContent = window.BHDSFI18n.t('turn', {
        name: playerName(activePlayer(), state.currentPlayer)
      });
    } else if (state.phase === 'attempts') {
      ui.feedback.textContent = window.BHDSFI18n.t('reveal');
    } else if (state.phase === 'complete') {
      ui.feedback.textContent = window.BHDSFI18n.t('nextPlayer');
    } else {
      ui.feedback.textContent = window.BHDSFI18n.t('discuss');
    }
    if (state.phase === 'movement') {
      if (ui.dialog.open) ui.dialog.close();
    } else if (!ui.dialog.open) {
      ui.dialog.showModal();
    }
  }

  function selectLevel(level) {
    if (state.phase !== 'movement') {
      showToast(window.BHDSFI18n.t('busy'));
      return;
    }
    state.activeLevel = level;
    state.activeQuestionOffset = state.currentPlayer;
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
    state.activeQuestionOffset = state.currentPlayer;
    state.activeDifficulty = player.correctStreak >= 3 ? 'advanced' : 'standard';
    state.lastMovement = movement;
    state.attemptsRolled = 0;
    state.attemptsRemaining = 0;
    state.answered = false;
    state.phase = 'attempts';
    window.BHDSFEffects.play('roll');
    animateDie(ui.movementDie);
    saveState();
    render();
    showToast(window.BHDSFI18n.t('moved', {
      name: playerName(player, state.currentPlayer),
      count: window.BHDSFI18n.number(movement),
      level: window.BHDSFI18n.number(target)
    }));
    window.setTimeout(rollAttempts, 450);
  }

  function rollAttempts() {
    if (state.phase !== 'attempts') return;
    state.attemptsRolled = window.BHDSFDice.rollAttempts();
    state.attemptsRemaining = state.attemptsRolled;
    state.phase = 'answer';
    window.BHDSFEffects.play('roll');
    animateDie(ui.attemptsDie);
    saveState();
    render();
    showToast(window.BHDSFI18n.t('attemptToast', {
      count: window.BHDSFI18n.number(state.attemptsRolled)
    }));
  }

  function submitAnswer(index, button) {
    if (state.phase !== 'answer') return;
    const card = currentCard();
    if (index === card.answer) {
      button.classList.add('correct');
      window.BHDSFEffects.play('correct');
      window.BHDSFEffects.celebrate(ui.dialog);
      const player = activePlayer();
      player.correctStreak += 1;
      const reachedAdvancedMode = player.correctStreak === 3;
      const points = 100 + Math.max(0, state.attemptsRemaining - 1) * 25;
      player.score += points;
      if (!state.completedLevels.includes(state.activeLevel)) state.completedLevels.push(state.activeLevel);
      state.completedLevels.sort((a, b) => a - b);
      while (state.completedLevels.includes(state.unlockedLevel) && state.unlockedLevel < 40) state.unlockedLevel += 1;
      state.phase = 'complete';
      ui.assistant.textContent = window.BHDSFAssistant.getFeedback(card, true)
        + ` ${window.BHDSFAssistant.getEncouragement()}`
        + (reachedAdvancedMode ? window.BHDSFI18n.t('mastered') : '');
      ui.hint.disabled = true;
      ui.feedback.textContent = window.BHDSFI18n.t('correct', {
        points: window.BHDSFI18n.number(points),
        name: playerName(activePlayer(), state.currentPlayer)
      });
      state.currentPlayer = (state.currentPlayer + 1) % state.playerCount;
      if (state.completedLevels.length === 40) {
        window.BHDSFEffects.play('win');
        showToast(window.BHDSFI18n.t('allDone'));
      }
      else showToast(window.BHDSFI18n.t('correctToast', {
        count: window.BHDSFI18n.number(points)
      }));
      window.setTimeout(() => {
        state.phase = 'movement';
        state.attemptsRemaining = 0;
        state.attemptsRolled = 0;
        saveState();
        render();
      }, 1300);
    } else {
      button.classList.add('incorrect');
      window.BHDSFEffects.play('wrong');
      activePlayer().correctStreak = 0;
      state.attemptsRemaining -= 1;
      state.answered = true;
      ui.assistant.textContent = window.BHDSFAssistant.getFeedback(card, false);
      if (state.attemptsRemaining <= 0) {
        state.phase = 'complete';
        state.currentPlayer = (state.currentPlayer + 1) % state.playerCount;
        showToast(window.BHDSFI18n.t('outOfAttempts'));
        window.setTimeout(() => {
          state.phase = 'movement';
          state.attemptsRolled = 0;
          saveState();
          render();
        }, 1600);
      } else {
        ui.feedback.textContent = window.BHDSFI18n.t('wrong', {
          count: window.BHDSFI18n.number(state.attemptsRemaining)
        });
        showToast(window.BHDSFI18n.t('wrongToast', {
          count: window.BHDSFI18n.number(state.attemptsRemaining)
        }));
      }
    }
    saveState();
    render();
    if (index !== card.answer && state.phase === 'answer') {
      const selected = ui.answers.children[index];
      if (selected) selected.classList.add('incorrect');
    }
  }

  function setPlayerCount(count) {
    if (state.phase !== 'movement') {
      showToast(window.BHDSFI18n.t('busy'));
      return;
    }
    state.playerCount = count === 1 ? 1 : 2;
    while (state.players.length < state.playerCount) {
      state.players.push({ ...DEFAULT_STATE.players[state.players.length] });
    }
    state.currentPlayer %= state.playerCount;
    saveState();
    render();
  }

  function showHint() {
    ui.assistant.textContent = window.BHDSFAssistant.getHint(currentCard());
    ui.hint.disabled = true;
    showToast(window.BHDSFI18n.t('hintToast'));
  }

  function resetGame() {
    if (!window.confirm(window.BHDSFI18n.t('confirmReset'))) return;
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, structuredClone(DEFAULT_STATE));
    state.lastMovement = 0;
    ui.assistant.textContent = window.BHDSFAssistant.getWelcome();
    saveState();
    render();
    showToast(window.BHDSFI18n.t('newJourney'));
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
    return window.BHDSFI18n.number(value);
  }

  document.getElementById('roll-movement').addEventListener('click', rollMovement);
  document.getElementById('roll-attempts').addEventListener('click', rollAttempts);
  document.getElementById('one-player').addEventListener('click', () => setPlayerCount(1));
  document.getElementById('two-players').addEventListener('click', () => setPlayerCount(2));
  document.getElementById('hint-button').addEventListener('click', showHint);
  document.getElementById('encourage-button').addEventListener('click', () => {
    ui.assistant.textContent = window.BHDSFAssistant.getFamilyTip();
  });
  document.getElementById('reset-button').addEventListener('click', resetGame);
  function toggleLanguage() {
    const nextLanguage = window.BHDSFI18n.getLanguage() === 'ar' ? 'en' : 'ar';
    window.BHDSFI18n.setLanguage(nextLanguage);
    render();
  }

  document.getElementById('language-toggle').addEventListener('click', toggleLanguage);
  document.getElementById('challenge-language-toggle').addEventListener('click', toggleLanguage);

  if (!state.players.length) state.players = structuredClone(DEFAULT_STATE.players);
  state.playerCount = state.playerCount === 1 ? 1 : 2;
  while (state.players.length < state.playerCount) {
    state.players.push({ ...DEFAULT_STATE.players[state.players.length] });
  }
  state.currentPlayer %= state.playerCount;
  if (!state.lastMovement) state.lastMovement = 0;
  if (state.phase === 'answer' && state.attemptsRemaining < 1) state.phase = 'attempts';
  if (state.phase === 'complete') state.phase = 'movement';
  ui.assistant.textContent = window.BHDSFAssistant.getWelcome();
  render();
})();