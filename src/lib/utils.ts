import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateUUID() {
  return crypto.randomUUID()
}

/**
 * Sanitize URL
 * @param url
 */
export function sanitizeUrl(url: string): string {
  return url.replace(/\s+/g, '%20')
}
