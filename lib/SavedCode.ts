export function detectLanguage(code: string): Language {
  if (
    code.includes('def ') ||
    code.includes('import ') ||
    code.match(/print\(.+\)/)
  ) {
    return 'python'
  } else if (
    code.includes('function ') ||
    code.includes('const ') ||
    code.includes('let ') ||
    code.match(/console\.log\(.+\)/)
  ) {
    return 'javascript'
  }
  return 'unknown'
}

export function organizeJavaScriptRequires(code: string): string {
  const requireLines = new Set<string>()
  const otherLines: string[] = []

  code.split('\n').forEach((line) => {
    if (
      line.trim().startsWith('const ') ||
      line.trim().startsWith('var ') ||
      line.trim().startsWith('let ')
    ) {
      if (line.includes('= require(')) {
        requireLines.add(line)
      } else {
        otherLines.push(line)
      }
    } else {
      otherLines.push(line)
    }
  })

  return Array.from(requireLines).join('\n') + '\n' + otherLines.join('\n')
}

export function organizePythonImports(code: string): string {
  const importLines = new Set<string>()
  const otherLines: string[] = []

  code.split('\n').forEach((line) => {
    if (line.trim().startsWith('import ') || line.trim().startsWith('from ')) {
      importLines.add(line)
    } else {
      otherLines.push(line)
    }
  })

  return Array.from(importLines).join('\n') + '\n' + otherLines.join('\n')
}

export function organizeImports(code: string): string {
  const language = detectLanguage(code)

  switch (language) {
    case 'javascript':
      return organizeJavaScriptRequires(code)
    case 'python':
      return organizePythonImports(code)
    default:
      throw new Error('Unsupported language detected.')
  }
}
