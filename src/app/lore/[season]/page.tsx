'use client';

import { notFound } from 'next/navigation';
import Image from 'next/image';
import { loreSeasons } from '@/config/lore';
import { use } from 'react';

interface PageProps {
  params: Promise<{ season: string }>;
}

function SwirlDivider() {
  return (
    <div className="flex justify-center py-4 opacity-50">
      <svg width="120" height="30" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M10 15C10 15 20 5 35 15C50 25 60 5 60 15C60 25 70 5 85 15C100 25 110 15 110 15"
          stroke="rgba(100,90,140,0.8)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        <circle cx="60" cy="15" r="3" fill="rgba(100,90,140,0.8)" />
        <circle cx="10" cy="15" r="2" fill="rgba(100,90,140,0.6)" />
        <circle cx="110" cy="15" r="2" fill="rgba(100,90,140,0.6)" />
      </svg>
    </div>
  );
}

function TweetCard({ content, isLast }: { content: string; isLast: boolean }) {
  if (content === '') return null;

  return (
    <div className="relative flex flex-col items-center">
      {/* The tweet card */}
      <div className="w-full max-w-md bg-[rgba(35,30,60,0.75)] backdrop-blur-sm rounded-xl p-5">
        <p className="text-gray-100 text-2xl leading-snug text-left font-lore">{content}</p>
      </div>

      {/* Connecting line to next tweet */}
      {!isLast && (
        <div className="w-0.5 h-6 bg-[rgba(70,60,100,0.6)]" />
      )}
    </div>
  );
}

export default function SeasonPage({ params }: PageProps) {
  const { season: seasonId } = use(params);
  const season = loreSeasons.find((s) => s.id === seasonId);

  if (!season) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2 font-lore">
          Lore {season.title}: {season.subtitle}
        </h1>
        {season.headerImage && (
          <div className="mt-6 flex justify-center">
            <Image
              src={season.headerImage.src}
              alt={season.headerImage.alt}
              width={600}
              height={300}
              className="rounded-xl max-w-full h-auto border border-purple-500/30"
              unoptimized
            />
          </div>
        )}
      </div>

      {/* Lore Content - Timeline Style */}
      <div className="space-y-8">
        {season.sections.map((section, sectionIndex) => {
          const nonEmptyContent = section.content.filter(c => c !== '');
          const isLastSection = sectionIndex === season.sections.length - 1;

          return (
            <div key={sectionIndex} className="relative">
              {sectionIndex > 0 && <SwirlDivider />}
              {/* Section title if present */}
              {section.title && (
                <div className="flex justify-center mb-6">
                  <div className="bg-gradient-to-r from-purple-600/80 to-blue-600/80 px-6 py-2 rounded-full border border-purple-400/50">
                    <h2 className="text-xl font-bold text-white font-lore">
                      {section.title}
                    </h2>
                  </div>
                </div>
              )}

              {/* Tweet thread */}
              <div className="flex flex-col items-center">
                {nonEmptyContent.map((paragraph, pIndex) => (
                  <TweetCard
                    key={pIndex}
                    content={paragraph}
                    isLast={pIndex === nonEmptyContent.length - 1 && !section.image}
                  />
                ))}

                {/* Image at end of thread */}
                {section.image && (
                  <div className="relative flex flex-col items-center w-full">
                    {nonEmptyContent.length > 0 && (
                      <div className="w-0.5 h-6 bg-[rgba(70,60,100,0.6)]" />
                    )}
                    <div className="w-full max-w-md overflow-hidden">
                      <Image
                        src={section.image.src}
                        alt={section.image.alt}
                        width={500}
                        height={400}
                        className="w-full h-auto max-h-[400px] rounded-lg object-contain"
                        unoptimized
                      />
                      {section.image.caption && (
                        <p className="text-center text-xs text-gray-400 mt-2 italic">
                          {section.image.caption}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation between seasons */}
      <div className="mt-16 flex justify-center gap-4">
        {seasonId !== 'season-1' && (
          <a
            href={`/lore/season-${parseInt(seasonId.split('-')[1]) - 1}`}
            className="px-6 py-3 bg-purple-600/50 hover:bg-purple-600/70 rounded-full text-white font-medium transition-colors border border-purple-400/30"
          >
            &#8592; Previous Season
          </a>
        )}
        {seasonId !== 'season-4' && (
          <a
            href={`/lore/season-${parseInt(seasonId.split('-')[1]) + 1}`}
            className="px-6 py-3 bg-purple-600/50 hover:bg-purple-600/70 rounded-full text-white font-medium transition-colors border border-purple-400/30"
          >
            Next Season &#8594;
          </a>
        )}
      </div>
    </div>
  );
}
