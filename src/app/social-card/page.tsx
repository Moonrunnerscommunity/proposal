export default function SocialCardPage() {
  return (
    <div className="min-h-screen bg-[#1C0D36] flex items-center justify-center p-4">
      {/* Card container - exactly 1200x630 for OG image */}
      <div
        className="relative overflow-hidden"
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #1C0D36 0%, #2e1a47 50%, #1C0D36 100%)',
        }}
      >
        {/* Background pattern - subtle grid */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(138, 111, 183, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(138, 111, 183, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Gradient orbs */}
        <div
          className="absolute -top-20 -right-20 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #8a6fb7 0%, transparent 70%)',
          }}
        />
        <div
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, #4a2b7b 0%, transparent 70%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center px-16">
          {/* Wolf emoji */}
          <div className="text-8xl mb-6">🐺</div>

          {/* Title */}
          <h1 className="text-6xl font-bold text-white mb-4 tracking-tight text-center">
            Moonrunners <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8a6fb7] to-[#ffd700]">2.0</span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl text-purple-200/80 mb-8 text-center">
            Wolves of Many Talents
          </p>

          {/* Tagline */}
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-400/50" />
            <p className="text-xl text-gray-300 italic">
              The pack is back. Community-owned.
            </p>
            <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-400/50" />
          </div>

          {/* Bottom accent */}
          <div className="absolute bottom-8 flex items-center gap-3">
            <span className="text-amber-400 font-semibold text-lg">Protect the Pack</span>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-6 left-6 w-12 h-12 border-l-2 border-t-2 border-amber-400/40 rounded-tl-lg" />
        <div className="absolute top-6 right-6 w-12 h-12 border-r-2 border-t-2 border-amber-400/40 rounded-tr-lg" />
        <div className="absolute bottom-6 left-6 w-12 h-12 border-l-2 border-b-2 border-amber-400/40 rounded-bl-lg" />
        <div className="absolute bottom-6 right-6 w-12 h-12 border-r-2 border-b-2 border-amber-400/40 rounded-br-lg" />

        {/* URL */}
        <div className="absolute bottom-8 right-8 text-purple-300/60 text-sm">
          moonrunners.ai
        </div>
      </div>

      {/* Instructions below the card */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 text-gray-400 text-sm bg-black/50 px-4 py-2 rounded">
        Screenshot the card above at 1200x630 pixels
      </div>
    </div>
  );
}
