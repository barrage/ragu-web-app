export const scrollToTop = (selector = '.main', options: ScrollToOptions = { top: 0, behavior: 'smooth' }) => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollTo(options)
  }
}
