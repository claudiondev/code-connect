import { TerminalLine } from "@/components/molecules/TerminalLine";

const LINES = [
  "git commit -m 'feat: add auth flow'",
  "const [user, setUser] = useState(null)",
  "npm run dev -- --port 3000",
  "docker build -t devhub/app .",
  "SELECT * FROM users WHERE active = true",
];

export function Terminal() {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-ink-900">
      <div className="flex items-center gap-2 border-b border-line bg-ink-800 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" aria-hidden="true" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" aria-hidden="true" />
        <span className="ml-2 font-mono text-xs text-muted">terminal — devhub</span>
      </div>
      <div className="space-y-2 p-4 font-mono text-xs">
        {LINES.map((line) => (
          <TerminalLine key={line}>{line}</TerminalLine>
        ))}
        <TerminalLine active>{""}</TerminalLine>
      </div>
    </div>
  );
}
