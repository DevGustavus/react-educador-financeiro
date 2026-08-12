export function runMigrations(): void {
  const versionKey = 'educador_financeiro:schema_version'
  const current = 1

  const stored = localStorage.getItem(versionKey)
  const version = stored ? Number.parseInt(stored, 10) : 0

  if (version >= current) return

  if (version < 1) {
    // schema v1: inicial, sem migração necessária
  }

  localStorage.setItem(versionKey, String(current))
}
