'use client';

import React from 'react';
import MultisigSection from './operational/MultisigSection';
import EmailSection from './operational/EmailSection';
import DomainsSection from './operational/DomainsSection';
import ContractsSection from './operational/ContractsSection';
import SocialAccountsSection from './operational/SocialAccountsSection';

const OperationalSection = () => {
  return (
    <section className="relative py-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 transition-all duration-1000">
          <h2 className="text-responsive-3xl font-bold text-white">
            ⚙️ Operational Details 📋
          </h2>
        </div>

        <div className="space-y-8">
          {/* Multisig Wallet Section */}
          <MultisigSection />

          {/* Email Section */}
          <EmailSection />

          {/* Domains Section */}
          <DomainsSection />

          {/* Contracts Section */}
          <ContractsSection />

          {/* Social Accounts Section */}
          <SocialAccountsSection />
        </div>
      </div>
    </section>
  );
};

export default OperationalSection;