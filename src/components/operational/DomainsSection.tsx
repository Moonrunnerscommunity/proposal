'use client';

import React from 'react';
import { CheckIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface Domain {
  name: string;
  transferred: boolean;
  label?: string;
  accounts: string[];
}

const DomainsSection = () => {
  const domains: Domain[] = [
    { 
      name: 'moonrunners.ai', 
      transferred: true, 
      label: 'This Site',
      accounts: ['GoDaddy', 'Vercel']
    },
    { 
      name: 'moonrunners.io', 
      transferred: false,
      accounts: ['GoDaddy', 'Heroku', 'Others (TBD)']
    },
  ];

  return (
    <div className="glass-dark p-6 rounded-lg">
      <h4 className="text-lg font-semibold mb-4 flex items-center gap-2" style={{ color: 'var(--color-starlight)' }}>
        <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
        Domains
      </h4>
      
      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'rgba(138, 111, 183, 0.1)', border: '1px solid rgba(138, 111, 183, 0.2)' }}>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--foreground)' }}>
          Domain ownership controls the primary digital identity and web presence of the Moonrunners brand. These domains host critical infrastructure including websites, APIs, and email services. Successful transfer ensures community control over all public-facing digital assets and prevents potential disruption to user access and brand continuity.
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: 'rgba(138, 111, 183, 0.3)' }}>
              <th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Domain</th>
              <th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Status</th>
              <th className="text-left p-3 font-medium" style={{ color: 'var(--color-starlight)' }}>Accounts</th>
            </tr>
          </thead>
          <tbody className="divide-y" style={{ borderColor: 'rgba(138, 111, 183, 0.2)' }}>
            {domains.map((domain, index) => (
              <tr 
                key={index} 
                className="transition-colors"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(28, 13, 54, 0.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium" style={{ color: 'var(--color-light-green)' }}>
                      {domain.name}
                    </span>
                    {domain.label && (
                      <span className="text-xs px-2 py-1 rounded bg-green-900/30 text-green-400 border border-green-500/30">
                        {domain.label}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex items-center gap-2">
                    {domain.transferred ? (
                      <>
                        <CheckIcon className="w-5 h-5 text-green-500" />
                        <span className="text-green-400 text-sm">Live</span>
                      </>
                    ) : (
                      <>
                        <XMarkIcon className="w-5 h-5 text-red-500" />
                        <span className="text-red-400 text-sm">Pending</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-wrap gap-1">
                    {domain.accounts.map((account, accountIndex) => (
                      <span 
                        key={accountIndex}
                        className="text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: domain.transferred ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: domain.transferred ? 'var(--color-light-green)' : '#fca5a5',
                          border: domain.transferred ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)'
                        }}
                      >
                        {account}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DomainsSection; 