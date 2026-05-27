export function MarqueeStrip() {
  const words = [
    "ARRANCADA",
    "DOS TIEMPOS",
    "PESO MUERTO",
    "THRUSTER",
    "MUSCLE-UP",
    "SALTO AL CAJÓN",
    "WALL BALL",
    "BURPEE",
    "DOBLE SALTO",
    "CAMINAR DE MANOS",
  ]

  return (
    <div className="bg-accent overflow-hidden py-2.5 md:py-3 relative" role="marquee" aria-label="Movimientos de CrossFit">
      <div className="flex animate-marquee whitespace-nowrap">
        {[...words, ...words].map((word, i) => (
          <span
            key={`${word}-${i}`}
            className="font-sans text-lg md:text-3xl text-accent-foreground mx-3 md:mx-10 tracking-wider"
          >
            {word}
            <span className="text-accent-foreground/40 mx-3 md:mx-10">/</span>
          </span>
        ))}
      </div>
    </div>
  )
}
