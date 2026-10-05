window.BHDSFDice = (() => {
  const faces = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

  function rollMovement() {
    return Math.floor(Math.random() * 6) + 1;
  }

  function rollAttempts() {
    return Math.floor(Math.random() * 4) + 1;
  }

  function faceFor(value) {
    return faces[value - 1] || '?';
  }

  return Object.freeze({ rollMovement, rollAttempts, faceFor });
})();