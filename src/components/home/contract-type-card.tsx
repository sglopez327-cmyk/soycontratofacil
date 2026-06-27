import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

type ContractTypeCardProps = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
};

export function ContractTypeCard({
  title,
  description,
  href,
  icon: Icon,
}: ContractTypeCardProps) {
  return (
    <Link href={href} className="group block h-full">
      <Card className="h-full border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
        <CardContent className="flex h-full flex-col gap-4 pt-1">
          <div className="flex items-start justify-between gap-3">
            <span className="flex size-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 ring-1 ring-zinc-200 transition-colors group-hover:bg-zinc-900 group-hover:text-zinc-50 group-hover:ring-zinc-800">
              <Icon className="size-5" aria-hidden />
            </span>
            <ArrowRight
              className="size-4 shrink-0 text-zinc-300 transition-all group-hover:translate-x-0.5 group-hover:text-zinc-600"
              aria-hidden
            />
          </div>

          <div className="flex flex-1 flex-col gap-1.5">
            <h3 className="font-semibold text-zinc-900 group-hover:text-zinc-950">
              {title}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-500">{description}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
