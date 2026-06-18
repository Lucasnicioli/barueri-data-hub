interface HeaderProps {
  title: string;
  subtitle?: string;
  color?: string;
}

export function Header({ title, subtitle, color = "var(--color-primary)" }: HeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex items-center gap-3">
        <div className="w-1 h-8 rounded-full" style={{ backgroundColor: color }} />
        <div>
          <h1 className="text-2xl font-bold text-[var(--color-text)]">{title}</h1>
          {subtitle && <p className="text-sm text-[var(--color-muted)]">{subtitle}</p>}
        </div>
      </div>
    </header>
  );
}
