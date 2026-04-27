const VinylAudio = (() => {
  let ctx: AudioContext | null = null;
  let gainNode: GainNode | null = null;
  let src: AudioBufferSourceNode | null = null;
  let running = false;

  function buildBuf(c: AudioContext, secs = 4) {
    const rate = c.sampleRate;
    const len = Math.floor(rate * secs);
    const buf = c.createBuffer(1, len, rate);
    const d = buf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + w * 0.0555179;
      b1 = 0.99332 * b1 + w * 0.0750759;
      b2 = 0.969 * b2 + w * 0.153852;
      b3 = 0.8665 * b3 + w * 0.3104856;
      b4 = 0.55 * b4 + w * 0.5329522;
      b5 = -0.7616 * b5 - w * 0.016898;
      d[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + w * 0.5362) * 0.05 * 0.35;
      b6 = w * 0.115926;
    }
    for (let p = 0; p < secs * 6; p++) {
      const at = Math.floor(Math.random() * len);
      const w = 80 + Math.floor(Math.random() * 220);
      const amp = (0.4 + Math.random() * 0.5) * (Math.random() < 0.5 ? -1 : 1);
      for (let j = 0; j < w && at + j < len; j++)
        d[at + j] += amp * Math.exp(-j / (w * 0.25)) * (Math.random() * 0.5 + 0.5);
    }
    return buf;
  }

  return {
    async start(vol = 0.4) {
      if (running) return;
      try {
        if (!ctx)
          ctx = new (
            window.AudioContext ||
            (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
          )();
        if (ctx.state === "suspended") await ctx.resume();
        src = ctx.createBufferSource();
        src.buffer = buildBuf(ctx);
        src.loop = true;
        gainNode = ctx.createGain();
        gainNode.gain.value = 0;
        src.connect(gainNode).connect(ctx.destination);
        src.start();
        running = true;
        gainNode.gain.linearRampToValueAtTime(vol, ctx.currentTime + 0.25);
      } catch {}
    },
    stop() {
      if (!running || !ctx || !gainNode || !src) return;
      const now = ctx.currentTime;
      gainNode.gain.cancelScheduledValues(now);
      gainNode.gain.setValueAtTime(gainNode.gain.value, now);
      gainNode.gain.linearRampToValueAtTime(0, now + 0.2);
      const s = src;
      setTimeout(() => {
        try { s.stop(); } catch {}
      }, 260);
      running = false;
    },
  };
})();

export default VinylAudio;
