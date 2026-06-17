import type { OutputComparison } from '../types/protocol'

export function normalizeCode(code: string): string {
  return code
    .replace(/\r\n/g, '\n')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .join('\n')
}

export function compareOutput(
  actual: string,
  expected: string,
  comparison: OutputComparison = 'trimmed',
): boolean {
  switch (comparison) {
    case 'exact':
      return actual === expected
    case 'trimmed':
      return actual.trim() === expected.trim()
    case 'contains':
      return actual.includes(expected)
    case 'regex': {
      try { return new RegExp(expected).test(actual) }
      catch { return false }
    }
    case 'none':
    default:
      return true
  }
}
