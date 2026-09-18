(function () {
  let audio = null;
  function getAudio() {
    if (!audio) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audio = new AudioCtx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function tone(context, frequency, endFrequency, duration, type, gainAmount) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const now = context.currentTime;
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, now);
    oscillator.frequency.exponentialRampToValueAtTime(endFrequency, now + duration);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(gainAmount, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + duration + 0.02);
  }

  window.SOUNDS = {
    flap: function () {
      try {
        const context = getAudio();
        if (!context) return;
        tone(context, 175, 95, 0.16, 'triangle', 0.14);
        window.setTimeout(function () {
          try { tone(context, 125, 75, 0.12, 'triangle', 0.1); } catch (error) {}
        }, 65);
      } catch (error) {}
    },
    score: function () {
      try {
        const context = getAudio();
        if (!context) return;
        tone(context, 880, 1320, 0.24, 'sine', 0.16);
      } catch (error) {}
    },
    crash: function () {
      try {
        const context = getAudio();
        if (!context) return;
        tone(context, 240, 58, 0.32, 'sawtooth', 0.18);
      } catch (error) {}
    }
  };
})();
