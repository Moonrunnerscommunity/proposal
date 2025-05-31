'use client';

import React, { useState } from 'react';
import { CheckIcon, EnvelopeIcon, ClipboardIcon } from '@heroicons/react/24/outline';

const EmailSection = () => {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const email = 'communitymoonrunners@gmail.com';

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-lg font-semibold mb-6 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
        <CheckIcon className="w-5 h-5 text-green-500" />
        Email Address
      </h4>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Left Column - Email Details (Green Theme) */}
        <div className="bg-green-900/30 border-2 border-green-500/50 rounded-lg p-4 sm:p-6 backdrop-blur-sm space-y-4">
          <div className="flex items-center gap-2">
            <div className="font-mono text-sm text-green-200 bg-green-950/50 p-3 rounded border flex-1">
              {email}
            </div>
            <button
              onClick={handleCopyEmail}
              className="flex items-center justify-center w-10 h-10 bg-green-800/50 hover:bg-green-700/50 border border-green-500/30 rounded transition-colors"
              title="Copy email"
            >
              {copiedEmail ? (
                <CheckIcon className="w-4 h-4 text-green-300" />
              ) : (
                <ClipboardIcon className="w-4 h-4 text-green-400" />
              )}
            </button>
          </div>
          {copiedEmail && (
            <div className="text-green-300 text-xs">
              Email copied to clipboard!
            </div>
          )}
          <a 
            href={`mailto:${email}`}
            className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
          >
            <EnvelopeIcon className="w-4 h-4" />
            Contact Us
          </a>
        </div>

        {/* Right Column - Explanation (Standard Theme) */}
        <div className="glass-dark p-6 rounded-lg space-y-4">
          <div>
            <h5 className="font-medium mb-3" style={{ color: 'var(--color-starlight)' }}>Our Implementation</h5>
            <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
              This email address serves as the primary communication channel for all platform administration, community governance, and operational matters. It ensures transparent and accessible communication between the community leadership and all stakeholders throughout the transition process and beyond.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmailSection; 