export function getDomain() {
  const fullDomain = window?.location?.hostname

  return fullDomain.substring(
    fullDomain.lastIndexOf('.', fullDomain.lastIndexOf('.') - 1) + 1,
  )
}
