import DOMPurify from 'dompurify'

export function sanitizeHtml(unsafeHtml: string): string {
  return DOMPurify.sanitize(unsafeHtml)
}
