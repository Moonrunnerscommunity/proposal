'use client';

import { useEffect, useState } from 'react';
import { getDiscordLink } from '../config/socialData';

// Vote configuration
const VOTE_START_DATE = new Date('2025-06-01T09:08:00'); // Sunday, June 1st
const VOTE_DURATION_DAYS = 30;
const VOTE_END_DATE = new Date(VOTE_START_DATE.getTime() + (VOTE_DURATION_DAYS * 24 * 60 * 60 * 1000)); // 30 days from start

// Manual switch to control when voting actually begins
// Set this to true when you want the countdown to start
const VOTE_HAS_STARTED = true;

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownRibbon() {
  const [timeRemaining, setTimeRemaining] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = VOTE_END_DATE.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining({ days, hours, minutes, seconds });
      } else {
        setTimeRemaining({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeRemaining();
    
    // Update every second
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!isClient) {
    return null; // Prevent hydration mismatch
  }

  const now = new Date();
  const isAfterStartDate = now >= VOTE_START_DATE;

  // Determine what to show based on the current state
  const getContent = () => {
    if (!VOTE_HAS_STARTED && !isAfterStartDate) {
      // Before Sunday - show "Vote starting on Sunday"
      return (
        <div className="flex items-center space-x-1 text-xs font-medium text-white">
          <span className="text-green-400">📅</span>
          <span>Vote Starting on Sunday, June 1st</span>
        </div>
      );
    } else if (!VOTE_HAS_STARTED && isAfterStartDate) {
      // On/after Sunday but vote hasn't been manually started - show "Soon"
      return (
        <div className="flex items-center space-x-1 text-xs font-medium text-white">
          <span className="text-green-400">⏰</span>
          <span>Voting Begins </span>
          <span className="font-bold text-green-300">Soon</span>
        </div>
      );
    } else {
      // Vote has started - show countdown
      return (
        <div className="flex items-center space-x-1 text-xs font-medium text-white">
          <span className="text-green-400">⏰</span>
          <span>Vote Ends In </span>
          <span className="font-bold text-green-300">
            {timeRemaining.days} days {timeRemaining.hours.toString().padStart(2, '0')} hours {timeRemaining.minutes.toString().padStart(2, '0')} minutes and {timeRemaining.seconds.toString().padStart(2, '0')} seconds
          </span>
          <span className="mx-1">•</span>
          <a
            href={getDiscordLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-green-300 hover:text-green-200 transition-colors cursor-pointer underline"
          >
            Vote Now!
          </a>
        </div>
      );
    }
  };

  return (
    <div className="w-full h-6 bg-gradient-to-r from-green-900 via-green-700 to-green-900 border-b border-green-400/30" style={{ zIndex: 9999, position: 'relative' }}>
      <div className="flex items-center justify-center h-full px-2">
        {getContent()}
      </div>
    </div>
  );
} 