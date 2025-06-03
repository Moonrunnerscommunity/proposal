'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/unstake/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/unstake/ui/dialog";
import { getDiscordLink } from "@/config/socialData";

// --- New Components ---
import VoteAnnouncementBox from "@/components/VoteAnnouncementBox";
import VisionBox from "@/components/VisionBox";
import MissionBox from "@/components/MissionBox";
import UnstakingPortal from "@/components/UnstakingPortal";

function FeedbackModal({ open, setOpen }: { open: boolean; setOpen: (v: boolean) => void }) {
  // Your Google Form configuration
  const GOOGLE_FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSdCrTogtOn_FSdWQ6amxvj_gwQ8pV46SaSM-K_z_Aj5NKA7UQ/formResponse";
  const FEEDBACK_ENTRY_ID = "entry.1580117537"; // Correct entry ID for your feedback field
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const formData = new FormData();
      formData.append(FEEDBACK_ENTRY_ID, feedback);
      
      console.log("Submitting feedback:", feedback);
      
      await fetch(GOOGLE_FORM_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });
      
      setSubmitted(true);
      setFeedback("");
    } catch {
      // Google Forms always returns opaque response in no-cors mode, so we assume success
      console.log("Form submitted (no-cors mode)");
      setSubmitted(true);
      setFeedback("");
    } finally {
      setSubmitting(false);
    }
  };

  const handleSuggestionClick = (suggestionText: string) => {
    if (textareaRef.current) {
      const currentValue = textareaRef.current.value;
      const newValue = currentValue ? currentValue + '\n' + suggestionText : suggestionText;
      textareaRef.current.value = newValue;
      setFeedback(newValue);
      textareaRef.current.focus();
    }
  };

  const suggestions = [
    "🔗 Broken links",
    "📦 Missing transfer items", 
    "🗺️ Roadmap suggestions",
    "💡 Community ideas",
    "🙋 Volunteer opportunities",
    "🎨 Design feedback",
    "🐛 Bug reports",
    "✨ Feature requests"
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="!bg-white !border-gray-200 shadow-2xl max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center font-bold !text-black">
            Share Your Feedback
          </DialogTitle>
          <DialogDescription className="text-center !text-gray-800">
            We value your thoughts! This form is <b>anonymous</b> and helps us improve Moonrunners for everyone.
          </DialogDescription>
        </DialogHeader>
        
        {submitted ? (
          <div className="py-8 text-center">
            <div className="text-green-600 text-lg font-semibold mb-2">
              Thank you for your feedback! 🌙
            </div>
            <div className="text-gray-500 text-sm mb-4">
              Your input helps make Moonrunners better for everyone.
            </div>
            <Button
              onClick={() => {
                setSubmitted(false);
                setFeedback("");
                setSubmitting(false);
              }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105"
            >
              Submit More Feedback
            </Button>
          </div>
        ) : (
          <>
            {/* Suggestions Section */}
            <div className="bg-gray-50/80 rounded-lg p-4 border border-gray-200">
              <h4 className="text-sm font-bold  mb-2" style={{ color: 'var(--color-grey-9800)' }}>💭 Need inspiration? Try these topics:</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {suggestions.map((suggestion, index) => {
                  const text = suggestion.substring(2).trim(); // Remove emoji and space
                  return (
                    <button
                      key={index}
                      type="button"
                      className="text-left p-2 rounded bg-white border border-gray-200 text-gray-700 hover:text-purple-600 hover:bg-purple-50 hover:border-purple-300 cursor-pointer transition-all duration-200 text-xs font-medium"
                      onClick={() => handleSuggestionClick(text)}
                    >
                      {suggestion}
                    </button>
                  );
                })}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <textarea
                ref={textareaRef}
                className="w-full min-h-[120px] rounded-lg p-4 bg-white border-2 border-gray-200 text-gray-800 focus:ring-2 focus:ring-purple-400 focus:border-purple-400 focus:outline-none resize-vertical placeholder-gray-400"
                placeholder="What's on your mind? Suggestions, bugs, ideas, anything!"
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
                required
                disabled={submitting}
                maxLength={1000}
              />
              <DialogFooter>
                <Button 
                  type="submit" 
                  disabled={submitting || !feedback.trim()} 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-base font-bold rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {submitting ? "Sending..." : "Submit Feedback"}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
        <DialogClose asChild>
          <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600 text-xl" aria-label="Close">×</button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}

export default function HeroSection() {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        // If the button's original position has scrolled past the top of the viewport
        setIsSticky(buttonRect.top <= 16); // 16px = top-4 in Tailwind
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const discordUrl = getDiscordLink();

  const VoteButton = () => (
    <a
      href={discordUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="shadow-lg bg-gradient-to-r from-green-500 via-blue-500 via-purple-500 to-cyan-500 text-white px-8 text-base font-bold rounded-full transition-all duration-300 border-2 border-white/20 hover:scale-105 hover:shadow-xl flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-green-400"
      style={{ minWidth: 0 }}
    >
      <span className="text-2xl">✅</span> Go Vote In Discord
    </a>
  );

  const FeedbackButton = () => (
    <Button
      variant="outline"
      size="lg"
      className="px-8 text-base font-bold rounded-full border-2 border-gray-300 text-gray-700 bg-white hover:bg-gray-100 hover:text-purple-600 transition-all duration-300 flex items-center gap-2"
      onClick={() => setFeedbackOpen(true)}
    >
      📝 Share Your Feedback
    </Button>
  );

  return (
    <>
      {/* Sticky Buttons at Top */}
      {isSticky && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-[11000] transition-all duration-300">
          <div className="flex flex-row gap-4">
            <VoteButton />
            <FeedbackButton />
          </div>
        </div>
      )}

      <section className="hero-section relative min-h-screen flex items-center justify-center z-50 w-full">
        {/* Background overlay for readability */}
        <div className="absolute inset-0 "></div>
        
        {/* Content container with explicit centering */}
        <div className="relative z-10 w-full flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-6xl mx-auto">
            <div className="text-center flex flex-col items-center">
              
              {/* Logo - responsive sizing */}
              <div className="mb-0 w-full flex justify-center transition-all duration-1000">
                <Image
                  src="/moonrunners.svg"
                  alt="Moonrunners Logo"
                  width={512}
                  height={256}
                  className="pixelated-image w-full h-auto max-h-32 sm:max-h-48 md:max-h-56 lg:max-h-64 max-w-2xl"
                  priority
                />
              </div>

              {/* Title - responsive typography */}
              <div className="mb-6 sm:mb-8 lg:mb-12 w-full flex justify-center transition-all duration-1000 delay-300">
                <h1 className="text-responsive-3xl font-bold text-white leading-tight text-center">
                  🐺 Community Takeover Proposal 🌙
                </h1>
              </div>

              {/* Vote Announcement Box */}
              <VoteAnnouncementBox
                isSticky={isSticky}
                buttonRef={buttonRef}
                VoteButton={VoteButton}
                FeedbackButton={FeedbackButton}
              />

              {/* Vision Box */}
              <VisionBox />

              {/* Mission Box (placeholder) */}
              <MissionBox />
              
              {/* Unstaking Portal */}
              <UnstakingPortal />
            </div>
          </div>
        </div>

        {/* Decorative corner elements */}
        <div className="absolute top-4 left-4 sm:top-8 sm:left-8 opacity-30">
          <div className="w-8 h-8 sm:w-12 sm:h-12 border-l-2 border-t-2 border-purple-400"></div>
        </div>
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8 opacity-30">
          <div className="w-8 h-8 sm:w-12 sm:h-12 border-r-2 border-t-2 border-purple-400"></div>
        </div>
        <div className="absolute bottom-16 left-4 sm:bottom-20 sm:left-8 opacity-30">
          <div className="w-8 h-8 sm:w-12 sm:h-12 border-l-2 border-b-2 border-purple-400"></div>
        </div>
        <div className="absolute bottom-16 right-4 sm:bottom-20 sm:right-8 opacity-30">
          <div className="w-8 h-8 sm:w-12 sm:h-12 border-r-2 border-b-2 border-purple-400"></div>
        </div>
      </section>

      {/* Feedback Modal */}
      <FeedbackModal open={feedbackOpen} setOpen={setFeedbackOpen} />
    </>
  );
} 