import Link from 'next/link';
import Image from 'next/image';
import { loreSeasons } from '@/config/lore';

// Preview images for each season
const seasonPreviews: Record<string, { image: string; teaser: string }> = {
  'season-1': {
    image: '/lore/season1/tribes-overview.png',
    teaser: 'Long before the first cities of Primordia, wolves and men shared the land in harmony. That peace would shatter in blood and fire...',
  },
  'season-2': {
    image: '/lore/season2/dragon-awakens.png',
    teaser: 'Dragon eggs discovered among the fallen. A mother awakens. Primordia burns as Kalanant seeks her stolen children...',
  },
  'season-3': {
    image: '/lore/season3/nogard-council.png',
    teaser: 'Reborn from dragon blood, Nogard must prove herself worthy to lead. The Challenges await, and destiny calls...',
  },
  'season-4': {
    image: '/lore/season4/day1.png',
    teaser: 'A crashed ship brings visitors from beyond the stars. On Carouza, ancient horrors hunt in the shadows. War comes home...',
  },
};

export default function LoreOverviewPage() {
  return (
    <div className="min-h-screen bg-[#0a0908]">
      {/* Hero Header */}
      <header className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center top, #1a1510 0%, #0a0908 70%)',
          }}
        />

        {/* Decorative lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
          <div className="absolute top-3/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6">
          {/* Small label */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="h-px w-12 bg-amber-600/50" />
            <span className="text-amber-500/80 text-xs tracking-[0.3em] uppercase font-medium">
              The Chronicles of
            </span>
            <div className="h-px w-12 bg-amber-600/50" />
          </div>

          {/* Main title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-4 tracking-tight">
            Primordia
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-stone-400 max-w-xl mx-auto leading-relaxed">
            Four seasons of war, sacrifice, and destiny. The saga of the Moonrunners unfolds.
          </p>

          {/* Scroll indicator */}
          <div className="mt-12 animate-bounce">
            <div className="w-6 h-10 mx-auto border-2 border-amber-600/30 rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-2 bg-amber-500/60 rounded-full" />
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0908] to-transparent" />
      </header>

      {/* Seasons */}
      <main className="relative">
        {loreSeasons.map((season, index) => {
          const preview = seasonPreviews[season.id];
          const isEven = index % 2 === 0;

          return (
            <section
              key={season.id}
              className="relative"
            >
              {/* Season connector line */}
              {index > 0 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-amber-600/0 via-amber-600/30 to-amber-600/0" />
              )}

              <Link
                href={`/lore/${season.id}`}
                className="group block"
              >
                <div className={`
                  max-w-6xl mx-auto px-6 py-16 sm:py-24
                  flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                  items-center gap-8 lg:gap-16
                `}>
                  {/* Image */}
                  <div className="relative w-full lg:w-1/2 aspect-[16/10] overflow-hidden rounded-lg">
                    {/* Image container with hover effect */}
                    <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-105">
                      <Image
                        src={preview?.image || season.headerImage?.src || '/lore/season1/moon-tiles.png'}
                        alt={season.title}
                        fill
                        className="object-cover"
                        style={{ imageRendering: 'auto' }}
                        unoptimized
                      />
                    </div>

                    {/* Overlay gradient */}
                    <div className={`
                      absolute inset-0
                      bg-gradient-to-${isEven ? 'r' : 'l'} from-[#0a0908]/80 via-transparent to-transparent
                      opacity-60 group-hover:opacity-40 transition-opacity duration-500
                    `} />

                    {/* Season number badge */}
                    <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-amber-600/90 flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{index + 1}</span>
                    </div>

                    {/* Read prompt */}
                    <div className="absolute bottom-4 right-4 px-4 py-2 bg-black/60 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                      <span className="text-amber-400 text-sm font-medium flex items-center gap-2">
                        Read Chapter
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`w-full lg:w-1/2 ${isEven ? 'lg:text-left' : 'lg:text-right'} text-center`}>
                    {/* Season label */}
                    <div className={`flex items-center gap-3 mb-3 justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}>
                      <span className="text-amber-600 text-xs tracking-[0.2em] uppercase font-semibold">
                        {season.title}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 group-hover:text-amber-100 transition-colors duration-300">
                      {season.subtitle}
                    </h2>

                    {/* Teaser */}
                    <p className="text-stone-400 text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                      {preview?.teaser}
                    </p>

                    {/* Decorative element */}
                    <div className={`mt-6 flex items-center gap-2 justify-center ${isEven ? 'lg:justify-start' : 'lg:justify-end'}`}>
                      <div className="h-px w-8 bg-amber-600/50 group-hover:w-16 transition-all duration-300" />
                      <div className="w-2 h-2 rounded-full bg-amber-600/50" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* Decorative divider */}
              {index < loreSeasons.length - 1 && (
                <div className="max-w-4xl mx-auto px-6">
                  <div className="h-px bg-gradient-to-r from-transparent via-stone-800 to-transparent" />
                </div>
              )}
            </section>
          );
        })}
      </main>

      {/* Footer */}
      <footer className="py-16 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-amber-600/30" />
            <span className="text-2xl">🐺</span>
            <div className="h-px w-8 bg-amber-600/30" />
          </div>
          <p className="text-stone-500 text-sm">
            The Moonrunners saga continues. New chapters await.
          </p>
          <Link
            href="/"
            className="inline-block mt-6 text-amber-600 hover:text-amber-500 text-sm transition-colors"
          >
            ← Return to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
