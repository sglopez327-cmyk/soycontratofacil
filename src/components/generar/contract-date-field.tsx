"use client";

import { useEffect, useRef, useState } from "react";
import { es } from "date-fns/locale";
import { CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";

import { contractInputClassName } from "./contract-field";

type ContractDateFieldProps = {
  id: string;
  value: string;
  placeholder?: string;
  hasError?: boolean;
  describedBy?: string;
  onChange: (value: string) => void;
};

function parseStoredDate(value: string): Date | undefined {
  if (!value.trim()) return undefined;
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value.trim());
  if (!match) return undefined;
  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const date = new Date(year, month - 1, day);
  if (
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return undefined;
  }
  return date;
}

function formatStoredDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatDisplayDate(date: Date): string {
  return new Intl.DateTimeFormat("es-ES", { dateStyle: "long" }).format(date);
}

export function ContractDateField({
  id,
  value,
  placeholder = "Selecciona una fecha",
  hasError,
  describedBy,
  onChange,
}: ContractDateFieldProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedDate = parseStoredDate(value);

  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <button
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={hasError}
        aria-describedby={describedBy}
        className={cn(
          contractInputClassName,
          "flex w-full items-center justify-between gap-3 text-left",
          !selectedDate && "text-slate-500"
        )}
        onClick={() => setOpen((previous) => !previous)}
      >
        <span className="truncate">
          {selectedDate ? formatDisplayDate(selectedDate) : placeholder}
        </span>
        <CalendarIcon className="size-4 shrink-0 text-brand-blue" aria-hidden />
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label="Seleccionar fecha"
          className="absolute left-0 z-50 mt-2 w-[min(100%,20rem)] rounded-xl border border-slate-700 bg-slate-900 p-3 shadow-2xl shadow-black/40"
        >
          <DayPicker
            mode="single"
            locale={es}
            selected={selectedDate}
            onSelect={(date) => {
              if (!date) return;
              onChange(formatStoredDate(date));
              setOpen(false);
            }}
            showOutsideDays
            classNames={{
              root: "w-full",
              months: "flex flex-col",
              month: "space-y-3",
              month_caption: "flex items-center justify-between px-1",
              caption_label: "text-sm font-semibold text-slate-100",
              nav: "flex items-center gap-1",
              button_previous:
                "inline-flex size-8 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition-colors hover:border-brand-blue/40 hover:bg-brand-blue/10 hover:text-brand-blue",
              button_next:
                "inline-flex size-8 items-center justify-center rounded-lg border border-slate-700 text-slate-300 transition-colors hover:border-brand-blue/40 hover:bg-brand-blue/10 hover:text-brand-blue",
              month_grid: "w-full border-collapse",
              weekdays: "mb-1",
              weekday:
                "w-9 pb-1 text-center text-[0.7rem] font-medium uppercase tracking-wide text-slate-500",
              week: "mt-1",
              day: "p-0 text-center",
              day_button:
                "inline-flex size-9 items-center justify-center rounded-lg text-sm text-slate-200 transition-colors hover:bg-slate-800 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue/40",
              selected:
                "bg-brand-blue text-white hover:bg-brand-blue hover:text-white focus-visible:bg-brand-blue",
              today: "border border-brand-blue/40 text-brand-blue",
              outside: "text-slate-600 opacity-60",
              disabled: "text-slate-600 opacity-40",
              hidden: "invisible",
            }}
            components={{
              Chevron: ({ orientation }) =>
                orientation === "left" ? (
                  <ChevronLeft className="size-4" aria-hidden />
                ) : (
                  <ChevronRight className="size-4" aria-hidden />
                ),
            }}
          />
          {selectedDate ? (
            <button
              type="button"
              className="mt-2 w-full rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-400 transition-colors hover:border-slate-600 hover:text-slate-200"
              onClick={() => {
                onChange("");
                setOpen(false);
              }}
            >
              Borrar fecha
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
