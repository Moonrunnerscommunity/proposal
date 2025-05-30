'use client';

import { useEffect, useState } from 'react';

// Proposal deadline - update this single constant to change the countdown target
const PROPOSAL_DEADLINE = new Date('2025-06-30T23:59:59');
const DEADLINE_DISPLAY = 'June 30th'; // Display format for the deadline

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
      const difference = PROPOSAL_DEADLINE.getTime() - now.getTime();

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

  return (
    <div className="fixed top-0 left-0 right-0 z-[9999] h-6 bg-gradient-to-r from-purple-900 via-purple-700 to-purple-900 border-b border-yellow-400/30">
      <div className="flex items-center justify-center h-full px-2">
        <div className="flex items-center space-x-1 text-xs font-medium text-white">
          <span className="text-yellow-400">⏰</span>
          <span>Vote Ends In </span>
          <span className="font-bold text-yellow-300">
            {timeRemaining.days} days {timeRemaining.hours.toString().padStart(2, '0')} hours {timeRemaining.minutes.toString().padStart(2, '0')} minutes and {timeRemaining.seconds.toString().padStart(2, '0')} seconds
          </span>
          <span className="">on {DEADLINE_DISPLAY}</span>
          <span className="mx-1">•</span>
          <a className="font-bold text-yellow-300 hover:text-yellow-200 transition-colors cursor-pointer underline">
            Vote Now!
          </a>
        </div>
      </div>
    </div>
  );
} 