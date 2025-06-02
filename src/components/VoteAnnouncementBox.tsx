import React from "react";

interface VoteAnnouncementBoxProps {
  isSticky: boolean;
  buttonRef: React.RefObject<HTMLDivElement | null>;
  VoteButton: React.ComponentType;
  FeedbackButton: React.ComponentType;
}

const VoteAnnouncementBox: React.FC<VoteAnnouncementBoxProps> = ({ isSticky, buttonRef, VoteButton, FeedbackButton }) => {
  const [open, setOpen] = React.useState(false);
  // Inline style for the clickable header
  const headerStyle: React.CSSProperties = {
    cursor: 'pointer',
    userSelect: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5em',
    fontWeight: 700,
    color: '#FFD700',
    background: 'rgba(40,40,40,0.7)',
    borderRadius: '0.5em',
    padding: '0.75em 1em',
    margin: '1em 0',
    fontSize: '1.1em',
    transition: 'background 0.2s',
  };
  return (
    <div className="mb-6 lg:mb-8 w-full flex justify-center transition-all duration-1000 delay-700">
      <div className="relative w-full max-w-4xl">
        {/* Animated border */}
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-xl animate-pulse opacity-75"></div>
        <div className="relative bg-gray-900/95 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-yellow-400/30 m-1">
          {/* Vote is Live Header */}
          <div className="flex flex-col items-center mb-6">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-green-400 text-center mb-2 flex items-center gap-2">
              <span className="animate-pulse">🟢</span> The Vote is LIVE! <span className="animate-pulse">🟢</span>
            </h2>
            <p className="text-base sm:text-lg text-white text-center max-w-2xl">
              <span className="font-semibold text-yellow-300">Head over to Discord to cast your vote!</span>
            </p>
            {/* Call to action buttons - side by side */}
            <div
              ref={buttonRef}
              className="mt-6 mb-6 lg:mb-6 w-full flex justify-center transition-all duration-1000 delay-900"
            >
              <div className={`flex flex-row gap-4 transition-opacity duration-300 ${isSticky ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}> 
                <VoteButton />
                <FeedbackButton />
              </div>
            </div>
            <p className="sm:text-lg font-bold !text-purple-300 text-center max-w-2xl">
              The following message was posted by <span className="text-purple-400">Antix</span> in <span className="text-purple-400">#announcements</span> on Discord:<br />
            </p>
            {/* Collapsible Announcement Start */}
            <div>
              <div
                style={headerStyle}
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setOpen(v => !v); }}
                role="button"
              >
                <span>{open ? '⬆️' : '⬇️'}</span>
                Click to read the full announcement
              </div>
              {open && (
                <div style={{ marginTop: '0.5em', animation: 'fadeIn 0.3s' }}>
                  {/* Discord Message Content */}
                  <div className="bg-[#23272A] rounded-lg p-4 border border-[#5865F2]/40 text-left text-sm sm:text-base text-white shadow-inner space-y-4">
                    {/* Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[#5865F2] text-xl">📣</span>
                      <span className="font-bold text-lg">Moonrunners Community Handover Vote: Leadership Proposal &amp; Next Steps</span>
                    </div>
                    <div className="text-gray-300">
                      Hey <span className="text-[#00AFF4] font-bold">@everyone</span>,<br />
                      We&apos;re now entering the final stage of the proposed Moonrunners handover, where the community will officially vote on transferring the Moonrunners project assets to a new leadership group.
                    </div>
                    {/* What&apos;s Happening */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-green-400">✅</span>
                        <span className="font-bold text-green-300">What&apos;s Happening</span>
                      </div>
                      <div className="text-gray-200 ml-6">
                        Earlier this month, we opened a 15-day consultation period to invite proposals from community members interested in leading Moonrunners forward and receive feedback.<br />
                        We received one formal leadership proposal, submitted by Cartel and Kshove and a team of community members that want to help them.<br />
                        Their proposal can be found on their website here: <a href="https://moonrunners.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">https://moonrunners.ai/</a><br />
                        As no other proposals were received, this group will be the only leadership group on the ballot for the upcoming vote.<br />
                        We&apos;ve created a simple document that defines what is — and isn&apos;t — being transferred. You can find it attached to this message.<br />
                        This vote is your opportunity to officially approve the leadership group and pass control of the Moonrunners project to this group as part of a community handover.
                      </div>
                    </div>
                    {/* What You Can Review Before Voting */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-blue-400">📄</span>
                        <span className="font-bold text-blue-200">What You Can Review Before Voting</span>
                      </div>
                      <div className="text-gray-200 ml-6">
                        Please read the following documents in full before casting your vote:<br />
                        <ul className="list-disc ml-6 mt-2 text-sm">
                          <li>
                            <span className="font-semibold">📝 Leadership Group Proposal</span> – submitted by Cartel and Kshove here <a href="https://moonrunners.ai/" target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">https://moonrunners.ai/</a>
                          </li>
                          <li>
                            <span className="font-semibold">📑 Transfer Summary</span> – outlining the key terms of the asset transfer from us to them if the vote passes.
                          </li>
                        </ul>

                        {/* Pdf Download */}
                        <a href="/Moonrunners%20Community%20Handover%20Terms.pdf" download className="bg-gray-600/50 rounded-lg mt-4 p-6 border border-gray-700/50 inline-block">
                          <div className="flex items-center gap-2">
                              <span className="text-indigo-300">📎</span>
                              <a href="/Moonrunners%20Community%20Handover%20Terms.pdf" download className="text-indigo-200 underline font-semibold">Moonrunners Community Handover Terms.pdf</a>
                          </div>
                        </a>
                      </div>
                    </div>
                    {/* How Voting Works */}
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-yellow-400">🗳️</span>
                        <span className="font-bold text-yellow-200">How Voting Works</span>
                      </div>
                      <div className="text-gray-200 ml-6 space-y-2">
                        <div>
                          Voting will take place here in Discord using emoji reactions due to limitations from polls being confined to only 2 weeks max.
                        </div>
                        <div>
                          <span className="font-bold">To cast your vote:</span>
                          <ul className="list-disc ml-6 mt-1">
                            <li>
                              <span className="font-bold text-green-400">✅ Click the YES (tick) emoji</span> to vote in favour of transferring leadership to Cartel and Kshove&apos;s leadership group
                            </li>
                            <li>
                              <span className="font-bold text-red-400">❌ Click the NO (cross) emoji</span> if you do not support the transfer to this leadership group
                            </li>
                          </ul>
                        </div>
                        <div>
                          By reacting with an emoji, you are confirming your vote as a Moonrunners NFT holder. This announcement channel is locked to NFT holders only.<br />
                          Voting is open for 30 days from this announcement to give all holders — active and dormant — enough time to see this announcement, review and participate.<br />
                          <span className="font-bold">🔒 Limited to one vote per person</span><br />
                          <span className="font-bold">🔒 At least 66.66% YES majority is required for the proposal to pass.</span><br />
                          We&apos;ll also post on X (Twitter) to increase visibility and make sure every holder has a chance to vote.
                        </div>
                      </div>
                    </div>
                    {/* What Happens Next */}
                    <div>
                      <div className="text-gray-200 ml-6 mt-2">
                        Once voting closes, we&apos;ll take a snapshot of the results, record the outcome, then move to the next steps.<br />
                        If the vote passes, the final step will involve direct communication with the leadership group in a group Discord chat and execution of the formal agreement. Once it&apos;s signed by Cartelbelt and Kshove then countersigned by us, the transfer process will begin.<br />
                        All agreed assets will be transferred within 7 days of signing, and at that point, Antix (Anthony) will fully step away from the project, with no ongoing management or involvement and this new group will take over.<br />
                        <span className="font-bold text-yellow-300">The vote starts now and ends in 30 days. Thanks,</span>
                      </div>
                    </div>
                    {/* Discord Reactions Example */}
                    <h4 className="font-bold text-white">Current Status</h4>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-1 bg-[#2C2F33] px-3 py-1 rounded-full text-green-400 font-bold text-lg">
                        ✅ <span className="text-white font-medium">93</span>
                      </div>
                      <div className="flex items-center gap-1 bg-[#2C2F33] px-3 py-1 rounded-full text-red-400 font-bold text-lg">
                        ❌ <span className="text-white font-medium">0</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Collapsible Announcement End */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoteAnnouncementBox; 