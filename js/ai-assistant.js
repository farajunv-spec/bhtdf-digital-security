window.BHDSFAssistant = (() => {
  const familyTips = [
    'اتفقوا على شخص بالغ يلجأ إليه الجميع عند رؤية شيء مقلق على الإنترنت.',
    'اسألوا بعضكم: ما المعلومة التي لا نحتاج إلى مشاركتها كي نستمتع بهذه اللعبة؟',
    'خصصوا وقتاً للحوار بلا لوم؛ السؤال المبكر يجعل حل المشكلات أسهل.',
    'راجعوا إعدادات الخصوصية معاً من وقت لآخر، فالتطبيقات تتغير.',
    'ذكّروا الصغار أن بإمكانهم التوقف عن المحادثة وطلب المساعدة في أي وقت.'
  ];
  const encouragements = [
    'تفكيركم الهادئ هو أقوى خطوة نحو الأمان.',
    'أحسنتم التعاون؛ المعرفة تكبر حين نتشاركها.',
    'كل سؤال جديد فرصة لتصبحوا أكثر استعداداً.',
    'تقدم رائع، واصلوا التعلّم من دون لوم أو استعجال.',
    'قرار آمن اليوم يصنع عادة رقمية أفضل غداً.'
  ];

  function getHint(card) {
    return card ? card.hint : window.BHDSFI18n.t('hintDefault');
  }

  function getFeedback(card, isCorrect) {
    if (!card) return window.BHDSFI18n.t('feedbackFallback');
    return window.BHDSFI18n.t(isCorrect ? 'feedbackCorrect' : 'feedbackWrong', { lesson: card.lesson });
  }

  function getFamilyTip() {
    return window.BHDSFI18n.t('familyTips');
  }

  function getEncouragement() {
    return window.BHDSFI18n.t('motivation');
  }

  function getWelcome() {
    return window.BHDSFI18n.t('welcomeGuide');
  }

  return Object.freeze({ getHint, getFeedback, getFamilyTip, getEncouragement, getWelcome });
})();