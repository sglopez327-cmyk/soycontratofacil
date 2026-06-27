import Link from "next/link";
import { FileText, Menu } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/contracts";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/80 bg-zinc-950/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-zinc-800 ring-1 ring-zinc-700 transition-colors group-hover:bg-zinc-700">
            <FileText className="size-4 text-zinc-100" aria-hidden />
          </span>
          <span className="text-lg font-semibold tracking-tight text-zinc-50">
            ContratoFacil<span className="text-zinc-400">.es</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Principal">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-4 py-2 text-sm font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-50"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/mis-contratos"
            className={cn(
              buttonVariants({ size: "sm" }),
              "hidden bg-zinc-100 text-zinc-900 hover:bg-white sm:inline-flex"
            )}
          >
            Acceder
          </Link>

          <Button
            variant="ghost"
            size="icon"
            className="text-zinc-300 hover:bg-zinc-800 hover:text-zinc-50 md:hidden"
            aria-label="Abrir menú"
          >
            <Menu className="size-5" />
          </Button>
        </div>
      </div>

      <nav
        className="flex gap-1 overflow-x-auto border-t border-zinc-800/60 px-4 py-2 md:hidden"
        aria-label="Principal móvil"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="shrink-0 rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-50"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
