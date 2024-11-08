export function scrollToEnd(
  container: HTMLElement | null,
  requestedDuration?: number, // Send duration in miliseconds - default value is 2000
) {
  if (container) {
    const duration = requestedDuration || 2000 // default 2 seconds duration
    const scrollHeight = container.scrollHeight
    const currentScroll = container.scrollTop
    const scrollDistance = scrollHeight - currentScroll

    const startTime = performance.now()

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime
      const progress = Math.min(elapsedTime / duration, 1)

      if (container) { container.scrollTop = currentScroll + scrollDistance * progress }
      // Continue animation until progress is 100%
      if (progress < 1) { requestAnimationFrame(animateScroll) }
    }

    requestAnimationFrame(animateScroll)
  }
}
