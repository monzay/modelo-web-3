"use client";

import { useState, useEffect, useRef } from "react";

const days = ["LUN", "MAR", "MIÉ", "JUE", "VIE", "SÁB"];

const schedule: Record<
  string,
  Array<{
    time: string;
    name: string;
    coach: string;
    type: string;
    spots: number;
  }>
> = {
  LUN: [
    { time: "05:30", name: "WOD", coach: "COACH REYES", type: "METCON", spots: 4 },
    { time: "07:00", name: "FUERZA", coach: "COACH PARK", type: "BARRA", spots: 8 },
    { time: "12:00", name: "WOD", coach: "COACH VASQUEZ", type: "METCON", spots: 11 },
    { time: "17:30", name: "MOTOR", coach: "COACH REYES", type: "ACONDICIONAMIENTO", spots: 6 },
    { time: "19:00", name: "WOD", coach: "COACH PARK", type: "METCON", spots: 2 },
  ],
  MAR: [
    { time: "05:30", name: "WOD", coach: "COACH PARK", type: "GIMNASIA", spots: 7 },
    { time: "07:00", name: "MOTOR", coach: "COACH REYES", type: "ACONDICIONAMIENTO", spots: 10 },
    { time: "12:00", name: "FUERZA", coach: "COACH VASQUEZ", type: "BARRA", spots: 12 },
    { time: "17:30", name: "WOD", coach: "COACH PARK", type: "GIMNASIA", spots: 3 },
    { time: "19:00", name: "COMPETIR", coach: "COACH REYES", type: "COMPETENCIA", spots: 1 },
  ],
  MIÉ: [
    { time: "05:30", name: "FUERZA", coach: "COACH VASQUEZ", type: "BARRA", spots: 9 },
    { time: "07:00", name: "WOD", coach: "COACH REYES", type: "METCON", spots: 5 },
    { time: "12:00", name: "MOTOR", coach: "COACH PARK", type: "ACONDICIONAMIENTO", spots: 14 },
    { time: "17:30", name: "WOD", coach: "COACH VASQUEZ", type: "METCON", spots: 6 },
    { time: "19:00", name: "FUERZA", coach: "COACH PARK", type: "BARRA", spots: 8 },
  ],
  JUE: [
    { time: "05:30", name: "WOD", coach: "COACH REYES", type: "METCON", spots: 3 },
    { time: "07:00", name: "FUERZA", coach: "COACH VASQUEZ", type: "BARRA", spots: 11 },
    { time: "12:00", name: "WOD", coach: "COACH PARK", type: "METCON", spots: 7 },
    { time: "17:30", name: "MOTOR", coach: "COACH REYES", type: "ACONDICIONAMIENTO", spots: 9 },
    { time: "19:00", name: "COMPETIR", coach: "COACH VASQUEZ", type: "COMPETENCIA", spots: 0 },
  ],
  VIE: [
    { time: "05:30", name: "MOTOR", coach: "COACH PARK", type: "ACONDICIONAMIENTO", spots: 10 },
    { time: "07:00", name: "WOD", coach: "COACH REYES", type: "METCON", spots: 4 },
    { time: "12:00", name: "FUERZA", coach: "COACH VASQUEZ", type: "BARRA", spots: 13 },
    { time: "17:30", name: "WOD", coach: "COACH PARK", type: "METCON", spots: 5 },
    { time: "19:00", name: "WOD", coach: "COACH REYES", type: "METCON", spots: 2 },
  ],
  SÁB: [
    { time: "08:00", name: "COMPETIR", coach: "COACH REYES", type: "COMPETENCIA", spots: 6 },
    { time: "09:30", name: "WOD EN EQUIPO", coach: "COACH PARK", type: "EQUIPO", spots: 4 },
    { time: "11:00", name: "MOTOR", coach: "COACH VASQUEZ", type: "ACONDICIONAMIENTO", spots: 12 },
  ],
};

function SpotsIndicator({ spots }: { spots: number }) {
  const isFull = spots === 0;
  return (
    <span
      className={`font-mono text-[8px] md:text-[10px] tracking-[0.1em] md:tracking-[0.15em] ${isFull ? "text-accent" : spots <= 3 ? "text-accent/70" : "text-foreground/40"}`}
    >
      {isFull ? "LLENO" : `${spots} DISPONIBLES`}
    </span>
  );
}

export function ScheduleBlock() {
  const [activeDay, setActiveDay] = useState("LUN");
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentSchedule = schedule[activeDay] || [];
  const totalClasses = currentSchedule.length;
  const totalSpots = currentSchedule.reduce((sum, s) => sum + s.spots, 0);

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="relative px-4 md:px-8 lg:px-12 py-5 md:py-20 bg-card overflow-hidden"
    >
      <div
        className="absolute top-6 md:top-8 right-2 md:right-12 font-sans text-[25vw] md:text-[18vw] leading-none text-foreground/[0.02] tracking-tighter select-none pointer-events-none"
        aria-hidden="true"
      >
        {String(totalClasses).padStart(2, "0")}
      </div>

      <div className="max-w-[1400px] mx-auto relative">
        <div
          className={`mb-3 md:mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 md:gap-4">
            <div>
              <span className="font-mono text-[8px] md:text-[10px] text-accent tracking-[0.2em] md:tracking-[0.3em] uppercase block mb-1 md:mb-2">
                [Horario]
              </span>
              <h2 className="font-sans text-[11vw] sm:text-5xl md:text-7xl lg:text-8xl tracking-tighter text-foreground leading-none uppercase whitespace-nowrap">
                Grilla Semanal<span className="text-accent">.</span>
              </h2>
            </div>
            <div className="flex flex-col items-start md:items-end gap-1 md:gap-2">
              <p className="font-mono text-[9px] md:text-xs text-foreground/50 max-w-xs leading-relaxed text-left md:text-right">
                Cada clase tiene un límite de 16 atletas. Cada sesión es dirigida. Cada repetición cuenta.
              </p>
              <div className="flex items-center gap-2 md:gap-4">
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-accent" />
                  <span className="font-mono text-[7px] md:text-[10px] text-foreground/60 tracking-[0.1em]">
                    {totalClasses} CLASES
                  </span>
                </div>
                <div className="w-[1px] h-2 md:h-3 bg-foreground/15" />
                <div className="flex items-center gap-1 md:gap-2">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-foreground/30" />
                  <span className="font-mono text-[7px] md:text-[10px] text-foreground/60 tracking-[0.1em]">
                    {totalSpots} LUGARES
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`h-[1px] bg-foreground/10 transition-all duration-1000 origin-left ${visible ? "scale-x-100" : "scale-x-0"}`}
        />

        <div
          className={`transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
        >
          <div className="flex border-b border-border">
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`flex-1 py-2 md:py-4 font-mono text-[8px] md:text-xs tracking-[0.08em] md:tracking-[0.2em] text-center transition-all relative min-h-[40px] ${
                  activeDay === day
                    ? "text-accent"
                    : "text-foreground/30 hover:text-foreground/70 active:text-foreground"
                }`}
              >
                {day}
                {activeDay === day && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="border-b border-border">
          {currentSchedule.map((slot, i) => (
            <div
              key={`${activeDay}-${slot.time}-${i}`}
              className={`flex items-center justify-between py-2.5 md:py-5 border-t border-foreground/5 group hover:bg-foreground/[0.02] transition-all px-0 md:px-4 ${
                visible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-3"
              }`}
              style={{
                transitionDuration: "500ms",
                transitionDelay: visible ? `${300 + i * 80}ms` : "0ms",
              }}
            >
              <div className="flex items-center gap-2 md:gap-8 min-w-0">
                <span className="font-mono text-[9px] md:text-base text-foreground/50 w-9 md:w-16 tabular-nums shrink-0">
                  {slot.time}
                </span>
                <div className="flex items-center gap-1 md:gap-3">
                  <span
                    className={`w-0.5 md:w-1 h-4 md:h-8 transition-colors ${slot.spots === 0 ? "bg-accent/50" : "bg-foreground/15"} group-hover:bg-accent`}
                  />
                  <span className="font-sans text-base sm:text-lg md:text-3xl lg:text-4xl text-foreground tracking-tighter uppercase group-hover:text-accent transition-colors truncate">
                    {slot.name}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-8 shrink-0">
                <span className="font-mono text-[7px] md:text-[9px] text-foreground/30 tracking-[0.1em] hidden md:block">
                  {slot.type}
                </span>
                <span className="font-mono text-[7px] md:text-[9px] text-foreground/30 tracking-[0.1em] hidden lg:block">
                  {slot.coach}
                </span>
                <SpotsIndicator spots={slot.spots} />
              </div>
            </div>
          ))}
        </div>

        <div
          className={`flex items-center justify-between pt-1.5 md:pt-4 transition-all duration-700 ${visible ? "opacity-100 delay-700" : "opacity-0"}`}
        >
          <span className="font-mono text-[6px] md:text-[10px] text-foreground/25 tracking-[0.08em] md:tracking-[0.2em]">
            MÁXIMO 16 ATLETAS POR CLASE
          </span>
          <span className="font-mono text-[6px] md:text-[10px] text-foreground/25 tracking-[0.08em] md:tracking-[0.2em] hidden md:block">
            SOLO SESIONES CON ENTRENADOR
          </span>
        </div>
      </div>
    </section>
  );
}
