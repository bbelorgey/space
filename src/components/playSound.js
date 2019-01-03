
function playSound(frequency) {
  let context = new AudioContext();
  let o = context.createOscillator();
  let g = context.createGain();
  o.frequency.value = frequency;
  o.connect(g);
  g.connect(context.destination);
  o.start(0);
  g.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + 0.5);
  // context.close();
}

export default playSound;
