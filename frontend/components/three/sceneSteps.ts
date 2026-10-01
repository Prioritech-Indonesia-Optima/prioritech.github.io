export function measureSceneStepStarts(): number[] {
  const steps = Array.from(document.querySelectorAll<HTMLElement>("[data-scene-step]"))
  if (steps.length === 0) return []
  const total = document.documentElement.scrollHeight - window.innerHeight
  if (total <= 0) return []
  const scrollY = window.scrollY
  const raw = steps.map((el) => (el.getBoundingClientRect().top + scrollY) / total)
  const starts = raw.map((v) => Math.max(0, Math.min(1, v)))
  for (let i = 1; i < starts.length; i++) {
    if (starts[i] <= starts[i - 1]) starts[i] = Math.min(1, starts[i - 1] + 0.001)
  }
  return starts
}
