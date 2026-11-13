// Web Audio 오르골 — 파헬벨 캐논 진행. 음원 파일 없이 단일 HTML 안에서 재생된다.
const CHORDS = [
  { bass: 50, arp: [62, 66, 69, 74] }, // D
  { bass: 45, arp: [61, 64, 69, 73] }, // A
  { bass: 47, arp: [62, 66, 71, 74] }, // Bm
  { bass: 42, arp: [61, 66, 69, 73] }, // F#m
  { bass: 43, arp: [62, 67, 71, 74] }, // G
  { bass: 50, arp: [62, 66, 69, 74] }, // D
  { bass: 43, arp: [62, 67, 71, 74] }, // G
  { bass: 45, arp: [61, 64, 69, 73] }, // A
];
const MELODY = [78, 76, 74, 73, 71, 69, 71, 73];
const COUNTER = [81, 76, 78, 73, 74, 78, 79, 76];
const PATTERN = [0, 1, 2, 3, 2, 1, 2, 3];
const STEP = 0.3;
const STEPS_PER_LOOP = CHORDS.length * PATTERN.length;

const mtof = (n) => 440 * Math.pow(2, (n - 69) / 12);

function impulse(ctx, seconds = 3, decay = 2.6) {
  const len = Math.floor(ctx.sampleRate * seconds);
  const buf = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let ch = 0; ch < 2; ch++) {
    const data = buf.getChannelData(ch);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, decay);
  }
  return buf;
}

export function createMusicBox() {
  let ctx = null;
  let master = null;
  let bus = null;
  let timer = null;
  let step = 0;
  let nextTime = 0;
  let playing = false;

  function setup() {
    const AC = window.AudioContext || window.webkitAudioContext;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0;
    const comp = ctx.createDynamicsCompressor();
    master.connect(comp).connect(ctx.destination);

    bus = ctx.createGain();
    const dry = ctx.createGain();
    dry.gain.value = 0.75;
    const wet = ctx.createGain();
    wet.gain.value = 0.45;
    const verb = ctx.createConvolver();
    verb.buffer = impulse(ctx);
    bus.connect(dry).connect(master);
    bus.connect(verb).connect(wet).connect(master);

    document.addEventListener('visibilitychange', () => {
      if (!playing) return;
      if (document.hidden) ctx.suspend();
      else ctx.resume();
    });
  }

  function bell(note, t, vel, dur, partials = [1, 0.3, 0.09]) {
    const env = ctx.createGain();
    env.gain.setValueAtTime(0.0001, t);
    env.gain.exponentialRampToValueAtTime(vel, t + 0.012);
    env.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    env.connect(bus);
    const f = mtof(note);
    partials.forEach((amp, i) => {
      if (!amp) return;
      const o = ctx.createOscillator();
      o.type = 'sine';
      o.frequency.value = f * [1, 2, 3.01][i];
      const g = ctx.createGain();
      g.gain.value = amp;
      o.connect(g).connect(env);
      o.start(t);
      o.stop(t + dur + 0.05);
    });
  }

  function playStep(s, t) {
    const loop = Math.floor(s / STEPS_PER_LOOP);
    const inLoop = s % STEPS_PER_LOOP;
    const ci = Math.floor(inLoop / PATTERN.length);
    const pos = inLoop % PATTERN.length;
    const chord = CHORDS[ci];

    bell(chord.arp[PATTERN[pos]], t, 0.05, 1.5);
    if (pos === 0) {
      bell(chord.bass, t, 0.11, 3.4, [1, 0.15, 0]);
      bell(MELODY[ci] + 12, t, 0.075, 2.8);
    }
    if (pos === 4 && loop % 2 === 1) bell(COUNTER[ci] + 12, t, 0.05, 2.2);
  }

  function schedule() {
    while (nextTime < ctx.currentTime + 0.3) {
      playStep(step, nextTime);
      step++;
      nextTime += STEP;
    }
  }

  return {
    get playing() {
      return playing;
    },
    async start() {
      if (!ctx) setup();
      await ctx.resume();
      playing = true;
      nextTime = ctx.currentTime + 0.08;
      master.gain.cancelScheduledValues(ctx.currentTime);
      master.gain.setValueAtTime(master.gain.value, ctx.currentTime);
      master.gain.linearRampToValueAtTime(0.9, ctx.currentTime + 2);
      clearInterval(timer);
      timer = setInterval(schedule, 60);
      schedule();
    },
    stop() {
      if (!ctx) return;
      playing = false;
      const now = ctx.currentTime;
      master.gain.cancelScheduledValues(now);
      master.gain.setValueAtTime(master.gain.value, now);
      master.gain.linearRampToValueAtTime(0, now + 0.6);
      clearInterval(timer);
      setTimeout(() => !playing && ctx.suspend(), 700);
    },
  };
}
