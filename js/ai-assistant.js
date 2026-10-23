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
    return card ? card.hint : 'توقفوا لحظة، وتحققوا من المصدر قبل مشاركة أي بيانات.';
  }

  function getFeedback(card, isCorrect) {
    if (!card) return 'كل خطوة صغيرة نحو الوعي تستحق الاحتفاء.';
    return isCorrect
      ? `أحسنتم! ${card.lesson}`
      : `لا بأس، هذه فرصة للتعلّم. ${card.lesson}`;
  }

  function getFamilyTip() {
    return familyTips[Math.floor(Math.random() * familyTips.length)];
  }

  function getEncouragement() {
    return encouragements[Math.floor(Math.random() * encouragements.length)];
  }

  function getWelcome() {
    return 'أهلاً بكم! أنا هنا لأساعدكم على التفكير بهدوء. لا توجد إجابة محرجة، والتعلّم معاً هو الأهم.';
  }

  return Object.freeze({ getHint, getFeedback, getFamilyTip, getEncouragement, getWelcome });
})();