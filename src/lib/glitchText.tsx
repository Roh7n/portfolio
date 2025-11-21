const runningSet = new WeakSet<HTMLElement>();

export function glitchEffect(element: HTMLElement, duration = 250) {
  // if this element is already running a glitch, do nothing
  if (runningSet.has(element)) return;

  runningSet.add(element);

  const original = element.textContent ?? "";
  const chars = original.split("");
  const randomChar = () => chars[Math.floor(Math.random() * chars.length)];

  const interval = setInterval(() => {
    element.textContent = chars.map(() => randomChar()).join("");
  }, 60);

  setTimeout(() => {
    clearInterval(interval);

    // ensure original text is restored after the last interval tick
    requestAnimationFrame(() => {
      element.textContent = original;
      runningSet.delete(element); // unlock so hover can run again
    });
  }, duration);
}
