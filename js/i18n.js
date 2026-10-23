window.BHDSFI18n = (() => {
  const strings = {
    ar: {
      brand: 'أبحر بأمان', framework: 'إطار BHDSF للسلامة الرقمية', sideLabel: 'معلومات اللاعبين والمساعدة', homeLink: 'أبحر بأمان، الصفحة الرئيسية', gameBoard: 'لوحة اللعبة', boardStages: 'مراحل اللعبة', progressAria: 'التقدم في اللعبة', dice: 'النرد', playerMode: 'عدد اللاعبين', onePlayer: 'لاعب واحد', twoPlayers: 'لاعبان',
      familySpace: 'مساحة عائلية آمنة', journey: 'رحلة من ٤٠ محطة', headlineA: 'كل قرار ذكي،', headlineB: 'يقربك من الأمان.', welcome: 'تعلّموا معاً كيف تبحرون بثقة في العالم الرقمي.',
      progress: 'تقدم الرحلة', progressCount: '{completed} / {total}', stationCounter: 'المحطة {level} من {total}', stationLabel: 'المحطة {level}، {status}', mapEyebrow: 'خريطة الاستكشاف', mapTitle: 'مسار الأمان الرقمي', ocean: 'رحلة المعرفة تبدأ بخطوة', legend: 'دليل ألوان المراحل', unlocked: 'مفتوحة', completed: 'مكتملة', locked: 'مقفلة',
      challenge: 'بطاقة التحدي', ready: 'استعدوا للانطلاق', intro: 'ارمِ نرد الحركة لتصل إلى محطتك التالية، ثم تعاونوا للإجابة عن التحدي.', choices: 'خيارات الإجابة', dice: 'النرد', moveDie: 'نرد الحركة', moveHelp: 'خطواتك نحو المحطة التالية', rollMove: 'ارمِ نرد الحركة', attemptsDie: 'نرد المحاولات', attemptsHelp: 'يحدد فرص الإجابة المتاحة', rollAttempts: 'اكشف المحاولات',
      crew: 'طاقم الرحلة', crewEyebrow: 'معاً نبحر', addPlayer: '＋ لاعب', guide: 'المرشد السيبراني', guideEyebrow: 'رفيق الرحلة', guideReady: 'جاهز للمساعدة', hint: 'أعطني تلميحاً', familyTip: 'نصيحة عائلية', scores: 'لوحة النقاط', scoreEyebrow: 'حصاد الرحلة', scoreNote: 'كل إجابة صحيحة تفتح معرفة جديدة.', footer: 'التعلّم والحوار هما أفضل أدوات الحماية.',
      reset: 'إعادة ضبط التقدم', switchLanguage: 'التبديل إلى الإنجليزية', station: 'المحطة', of: 'من', player: 'اللاعب', playerOne: 'اللاعب الأول', playerTwo: 'اللاعب الثاني', turn: 'حان دور {name}.', turnCurrent: 'الدور الحالي: {name}', playerAt: 'المحطة {level}', points: 'نقطة', shortPoints: 'ن', advanced: 'تحدٍ متقدم', howAct: 'كيف ستتصرف؟', allCorrect: 'أحسنتم، أتممتم التحدي!', done: 'اكتمل التحدي', attemptsRemaining: 'المحاولات المتبقية: {count}', attemptsDash: 'المحاولات: —',
      discuss: 'تحدثوا معاً قبل اختيار الإجابة.', reveal: 'اكشفوا عدد المحاولات، ثم اختاروا إجابتكم.', nextPlayer: 'رائع! انتقل الدور إلى اللاعب التالي.',
      moved: 'تحرك {name} {count} خطوات، ووصل إلى المحطة {level}.', attemptToast: 'لديكم {count} محاولات. فكروا معاً!', correct: 'إجابة صحيحة! أضيفت {points} نقطة إلى رصيد {name}.', correctToast: 'إجابة صحيحة، وربحتم {count} نقطة!', allDone: 'أكملتم المحطات الأربعين! رحلة رائعة.',
      wrong: 'ليست هذه الإجابة؛ بقيت {count} محاولة. جرّبوا مجدداً.', wrongToast: 'بقيت {count} محاولة.', outOfAttempts: 'انتهت المحاولات. تذكّروا الفكرة، والمحطة التالية بانتظاركم.',
      maxPlayers: 'يمكن أن يشارك حتى أربعة لاعبين.', addPrompt: 'ما اسم اللاعب الجديد؟', enterName: 'اكتبوا اسماً قصيراً للاعب.', busy: 'أكملوا الدور الحالي قبل اختيار محطة أخرى.', hintToast: 'أرسل المرشد تلميحاً للتفكير.',
      confirmReset: 'هل تريدون بدء رحلة جديدة؟ سيتم حذف النقاط والتقدم المحفوظ.', newJourney: 'بدأت رحلة جديدة.', saveError: 'تعذر حفظ التقدم على هذا الجهاز.', welcomeGuide: 'أهلاً بكم! أنا هنا لأساعدكم على التفكير بهدوء. لا توجد إجابة محرجة، والتعلّم معاً هو الأهم.',
      hintDefault: 'توقفوا لحظة، وتحققوا من المصدر قبل مشاركة أي بيانات.', feedbackFallback: 'كل خطوة صغيرة نحو الوعي تستحق الاحتفاء.', feedbackCorrect: 'أحسنتم! {lesson}', feedbackWrong: 'لا بأس، هذه فرصة للتعلّم. {lesson}', mastered: ' أتقنت هذا المستوى؛ سيصبح التحدي القادم أعمق.',
      motivation: ['تفكيركم الهادئ هو أقوى خطوة نحو الأمان.', 'أحسنتم التعاون؛ المعرفة تكبر حين نتشاركها.', 'كل سؤال جديد فرصة لتصبحوا أكثر استعداداً.', 'تقدم رائع، واصلوا التعلّم من دون لوم أو استعجال.', 'قرار آمن اليوم يصنع عادة رقمية أفضل غداً.'],
      credit: 'تصميم: فرج الهدار — مبادرة السلامة الرقمية، إطار BHDSF',
      familyTips: ['اتفقوا على شخص بالغ يلجأ إليه الجميع عند رؤية شيء مقلق على الإنترنت.', 'اسألوا بعضكم: ما المعلومة التي لا نحتاج إلى مشاركتها كي نستمتع بهذه اللعبة؟', 'خصصوا وقتاً للحوار بلا لوم؛ السؤال المبكر يجعل حل المشكلات أسهل.', 'راجعوا إعدادات الخصوصية معاً من وقت لآخر، فالتطبيقات تتغير.', 'ذكّروا الصغار أن بإمكانهم التوقف عن المحادثة وطلب المساعدة في أي وقت.']
    },
    en: {
      brand: 'Sail Safely', framework: 'BHDSF Digital Safety Framework', sideLabel: 'Players and help', homeLink: 'Sail Safely home', gameBoard: 'Game board', boardStages: 'Game stations', progressAria: 'Game progress', dice: 'Dice', playerMode: 'Number of players', onePlayer: '1 Player', twoPlayers: '2 Players',
      familySpace: 'A safe space for families', journey: 'A 40-station voyage', headlineA: 'Every wise choice', headlineB: 'brings you closer to safety.', welcome: 'Learn together to navigate the digital world with confidence.',
      progress: 'Voyage progress', progressCount: '{completed} / {total}', stationCounter: 'Station {level} of {total}', stationLabel: 'Station {level}, {status}', mapEyebrow: 'EXPLORE THE MAP', mapTitle: 'Digital Safety Route', ocean: 'Every journey of learning starts with one step', legend: 'Station status', unlocked: 'Open', completed: 'Complete', locked: 'Locked',
      challenge: 'CHALLENGE CARD', ready: 'Ready to set sail', intro: 'Roll the movement die to reach your next station, then work together on the challenge.', choices: 'Answer choices', dice: 'Dice', moveDie: 'Movement die', moveHelp: 'Steps toward your next station', rollMove: 'Roll to move', attemptsDie: 'Attempt die', attemptsHelp: 'Sets your available attempts', rollAttempts: 'Reveal attempts',
      crew: 'Crew', crewEyebrow: 'SAIL TOGETHER', addPlayer: '+ Player', guide: 'Cyber Guide', guideEyebrow: 'YOUR VOYAGE COMPANION', guideReady: 'Ready to help', hint: 'Give me a hint', familyTip: 'Family tip', scores: 'Scoreboard', scoreEyebrow: 'VOYAGE RESULTS', scoreNote: 'Every correct answer unlocks new knowledge.', footer: 'Learning and conversation are your best tools for safety.',
      reset: 'Reset progress', switchLanguage: 'Switch to Arabic', station: 'Station', of: 'of', player: 'Player', playerOne: 'Player 1', playerTwo: 'Player 2', turn: "It's {name}'s turn.", turnCurrent: "{name}'s turn", playerAt: 'Station {level}', points: 'points', shortPoints: 'pts', advanced: 'ADVANCED CHALLENGE', howAct: 'What would you do?', allCorrect: 'Challenge complete!', done: 'Challenge complete', attemptsRemaining: 'Attempts remaining: {count}', attemptsDash: 'Attempts: —',
      discuss: 'Talk it through together before choosing.', reveal: 'Reveal your attempts, then choose an answer together.', nextPlayer: 'Great work! The next player is up.',
      moved: '{name} moved {count} spaces and reached station {level}.', attemptToast: 'You have {count} attempts. Think it through together!', correct: 'Correct! {points} points added to {name}’s score.', correctToast: 'Correct answer! You earned {count} points!', allDone: 'You completed all 40 stations. What a voyage!',
      wrong: 'Not quite. {count} attempts remain. Try again.', wrongToast: '{count} attempts remain.', outOfAttempts: 'No attempts left. Keep the lesson in mind; the next station awaits.',
      maxPlayers: 'Up to four players can join.', addPrompt: 'What is the new player’s name?', enterName: 'Enter a short player name.', busy: 'Finish the current turn before choosing another station.', hintToast: 'The guide has shared a hint.',
      confirmReset: 'Start a new voyage? Saved points and progress will be deleted.', newJourney: 'A new voyage has begun.', saveError: 'Progress could not be saved on this device.', welcomeGuide: 'Welcome aboard! I’m here to help you think things through. There are no embarrassing questions; learning together matters most.',
      hintDefault: 'Pause and verify the source before sharing any information.', feedbackFallback: 'Every small step toward awareness is worth celebrating.', feedbackCorrect: 'Well done! {lesson}', feedbackWrong: 'That’s okay; it’s a chance to learn. {lesson}', mastered: ' You have mastered this level. The next challenge will be deeper.',
      motivation: ['Your calm thinking is a strong step toward safety.', 'Great teamwork; knowledge grows when we share it.', 'Every new question helps you become more prepared.', 'Wonderful progress. Keep learning without blame or rush.', 'A safe choice today builds a better digital habit tomorrow.'],
      credit: 'Designed by Faraj Al-Haddar — Digital Safety Initiative, BHDSF Framework',
      familyTips: ['Agree on a trusted adult everyone can talk to when something online feels wrong.', 'Ask each other: what information do we not need to share to enjoy this game?', 'Make time for blame-free conversations; asking early makes problems easier to solve.', 'Review privacy settings together from time to time; apps change.', 'Remind young people they can leave a conversation and ask for help at any time.']
    }
  };

  function readLanguage() {
    try {
      return localStorage.getItem('bhdsf-language') === 'en' ? 'en' : 'ar';
    } catch {
      return 'ar';
    }
  }

  let language = readLanguage();

  function t(key, values = {}) {
    let value = strings[language][key] ?? strings.ar[key] ?? key;
    if (Array.isArray(value)) value = value[Math.floor(Math.random() * value.length)];
    return String(value).replace(/\{(\w+)\}/g, (_, name) => values[name] ?? '');
  }

  function number(value) {
    return language === 'ar' ? String(value).replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)]) : String(value);
  }

  function localizeCard(card, level, advanced, questionOffset = 0) {
    if (language !== 'en') {
      const toArabicDigits = (value) => String(value).replace(/[0-9]/g, (digit) => '٠١٢٣٤٥٦٧٨٩'[Number(digit)]);
      return {
        ...card,
        question: toArabicDigits(card.question),
        choices: card.choices.map(toArabicDigits),
        lesson: toArabicDigits(card.lesson),
        hint: toArabicDigits(card.hint)
      };
    }
    if (!window.BHDSFEnglishCards) return card;
    const domain = Math.floor((level - 1) / 10);
    const item = advanced
      ? window.BHDSFEnglishCards.advanced[domain][(((level - 1) % 10) + questionOffset) % window.BHDSFEnglishCards.advanced[domain].length]
      : window.BHDSFEnglishCards.standard[domain * 10 + (((level - 1) % 10) + questionOffset) % 10];
    if (!item) return card;
    return { ...card, category: window.BHDSFEnglishCards.categories[domain], question: item[0], choices: item[1], answer: item[2], lesson: item[3], hint: `Think through the whole situation and verify before sharing. ${item[3]}` };
  }

  function apply() {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.body.dataset.language = language;
    document.querySelectorAll('[data-i18n]').forEach((element) => { element.textContent = t(element.dataset.i18n); });
    document.querySelectorAll('[data-i18n-title]').forEach((element) => { element.title = t(element.dataset.i18nTitle); });
    document.querySelectorAll('[data-i18n-aria]').forEach((element) => { element.setAttribute('aria-label', t(element.dataset.i18nAria)); });
    document.querySelectorAll('#language-toggle, #challenge-language-toggle').forEach((toggle) => {
      toggle.textContent = language === 'ar' ? 'EN' : 'عربي';
      toggle.setAttribute('aria-label', t('switchLanguage'));
    });
    document.title = language === 'ar' ? 'أبحر بأمان | إطار BHDSF للسلامة الرقمية' : 'Sail Safely | BHDSF Digital Safety Framework';
  }

  function setLanguage(next) {
    language = next === 'en' ? 'en' : 'ar';
    try {
      localStorage.setItem('bhdsf-language', language);
    } catch {
      // Language switching still works for this page session when storage is unavailable.
    }
    apply();
  }

  return Object.freeze({ t, number, apply, setLanguage, localizeCard, getLanguage: () => language });
})();
