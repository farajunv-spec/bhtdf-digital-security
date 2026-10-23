window.BHDSFEffects = (() => {
  let audioContext;

  function getAudioContext() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return null;
    audioContext ||= new AudioContextClass();
    if (audioContext.state === 'suspended') audioContext.resume();
    return audioContext;
  }

  function tone(context, frequency, start, duration, type = 'sine', volume = 0.07) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(volume, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.03);
  }

  function play(name) {
    const context = getAudioContext();
    if (!context) return;
    const now = context.currentTime;
    const patterns = {
      roll: [[440, 0, 0.1, 'triangle'], [660, 0.08, 0.12, 'triangle']],
      correct: [[523, 0, 0.16], [659, 0.12, 0.18], [784, 0.24, 0.28]],
      wrong: [[220, 0, 0.18, 'triangle'], [174, 0.15, 0.25, 'triangle']],
      win: [[523, 0, 0.22], [659, 0.13, 0.22], [784, 0.26, 0.22], [1047, 0.39, 0.48]]
    };
    (patterns[name] || []).forEach(([frequency, offset, duration, type]) => {
      tone(context, frequency, now + offset, duration, type || 'sine', name === 'wrong' ? 0.045 : 0.055);
    });
  }

  function celebrate(container) {
    container.classList.remove('is-celebrating');
    void container.offsetWidth;
    container.classList.add('is-celebrating');
    for (let index = 0; index < 18; index += 1) {
      const spark = document.createElement('span');
      spark.className = `celebration-spark spark-${index % 6}`;
      spark.setAttribute('aria-hidden', 'true');
      container.append(spark);
      window.setTimeout(() => spark.remove(), 1100);
    }
    window.setTimeout(() => container.classList.remove('is-celebrating'), 1100);
  }

  return Object.freeze({ play, celebrate });
})();
