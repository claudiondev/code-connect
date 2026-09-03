import Link from "next/link";
import { Logo } from "@/components/atoms/Logo";
import { PresenceBadge } from "@/components/molecules/PresenceBadge";
import { Terminal } from "@/components/organisms/Terminal";
import { StatsRow } from "@/components/organisms/StatsRow";

export function AuthHero() {
  return (
    <div className="flex flex-col gap-8">
      <Link href="/" className="w-fit">
        <Logo />
      </Link>

      <div className="flex flex-col gap-6">
        <PresenceBadge count={4812} />

        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl">
          O espaço onde <span className="text-accent">código</span> encontra
          comunidade.
        </h1>

        <p className="max-w-md text-muted">
          Compartilhe projetos, encontre colaboradores, discuta tecnologia.
          Uma rede feita por devs, para devs.
        </p>
      </div>

      <Terminal />

      <StatsRow />
    </div>
  );
}
