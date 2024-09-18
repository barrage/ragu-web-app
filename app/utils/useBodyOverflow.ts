export function toggleBodyOverflow(enable: boolean) {
  if (enable) {
    document.body.style.overflow = 'hidden'
  }
  else {
    document.body.style.overflow = ''
  }
}
