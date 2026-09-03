import { CodeIcon } from "@/components/atoms/icons/CodeIcon";

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2">
      <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent text-ink-950">
        <CodeIcon className="h-4 w-4" />
      </span>
      <span className="font-semibold text-white">devhub</span>
    </span>
  );
}
