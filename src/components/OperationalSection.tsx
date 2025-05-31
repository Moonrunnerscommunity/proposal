'use client';

import React from 'react';
import MultisigSection from './operational/MultisigSection';
import EmailSection from './operational/EmailSection';
import DomainsSection from './operational/DomainsSection';
import ContractsSection from './operational/ContractsSection';
import SocialAccountsSection from './operational/SocialAccountsSection';

const OperationalSection = () => {
  return (
    <section className="section relative">
      <div className="fixed-width">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-16 lg:mb-12 transition-all duration-1000">
          <h2 className="text-responsive-3xl font-bold text-white mb-6">
            ⚙️ Operational Details 📋
          </h2>
          <div className="glass p-6 sm:p-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-200 leading-relaxed mb-4">
              This <span className="text-gradient font-semibold">Comprehensive Checklist</span>, tracks all critical asset transfers and provides a transparent view of the handover process, ensuring leadership accountability and community confidence.
            </p>
          </div>
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