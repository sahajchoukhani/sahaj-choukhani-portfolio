import React, { useState, useRef, useEffect } from 'react';
import { skillsData } from '../data/skills';
import { Terminal, Cpu, Check, CornerDownLeft, Activity, Radio, HardDrive } from 'lucide-react';
import { sound } from '../services/soundEngine';

export const TerminalMatrix: React.FC = () => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<Array<{ cmd: string; output: string[] }>>([
    {
      cmd: 'whoami',
      output: [
        'Sahaj — Multidisciplinary Technologist, Entrepreneur & Performer',
        'Founder: Drusavi (10–15 Core Team) | Co-Founder: Nyay Link (8–9 Core Team)',
        'Core Member: Fasal Niti (Built Website Solo) & Less Go (Travel Itinerary)',
        'Podium Finisher: IEEE Synapse, OP Jindal (1st Place Team & Runner Up), IIM Bhubaneswar (3rd)',
        'Finalist Selections: IIT Delhi (Stratazenith) & CodeHack',
        'Results Pending: SIH (Univ Round Cleared), SEVA (Fasal Niti), Construct (Nyay Link)',
        'Arts: Winner in Simultaneous Piano & Singing | 3rd Place National Theatre',
        'Confirmed Stack: JavaScript, Python, SQL, MySQL, HTML, Bash',
        'Type "help" to explore verified commands.',
      ],
    },
  ]);

  const terminalBodyRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Only scroll internal terminal box when user actually executes commands beyond initial welcome
    if (history.length > 1) {
      scrollToBottom();
    }
  }, [history]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim().toLowerCase();
    sound.playTactileClick();

    let output: string[] = [];

    switch (trimmed) {
      case 'help':
        output = [
          'AVAILABLE SYSTEM COMMANDS:',
          '  startups     - List Drusavi, Nyay Link, Fasal Niti & Less Go with roles & live URLs',
          '  solo         - Details of the Fasal Niti website (100% solo built by Sahaj)',
          '  hackathons   - Display 4 subdivisions: Podiums, Finalists, Completed & Pending',
          '  skills       - View verified technical stack (JS, Python, SQL, MySQL, HTML, Bash)',
          '  arts         - Simultaneous Piano & Vocals 1st Place + 3rd Place National Theatre',
          '  whoami       - Display creator identity & credentials',
          '  clear        - Reset terminal window',
        ];
        break;

      case 'skills':
        output = [
          'VERIFIED TECHNICAL STACK & CORE COMPETENCIES (6 CONFIRMED TECHNOLOGIES):',
          '  [Languages]   Python, JavaScript, Bash / Shell Scripting',
          '  [Databases]   SQL, MySQL (Relational Schema Design & Data Management)',
          '  [Web & Markup] HTML (Semantic Structure, Architecture)',
          '  Strict Accuracy: Only confirmed technologies are listed.',
        ];
        break;

      case 'startups':
        output = [
          'ACTIVE VENTURE PORTFOLIO (EXACTLY 4 VENTURES):',
          '  1. Drusavi    - Founder (Core team: ~10–15 people | Enterprise architecture)',
          '  2. Nyay Link   - Co-founder (Core team: ~8–9 people | URL: https://www.nyay.link/)',
          '  3. Fasal Niti  - Core Member (Team: ~8 people | URL: https://prototype-fasalniti.vercel.app/)',
          '  4. Less Go     - Core Member (Travel itinerary | URL: https://less-gooo.appwrite.network/)',
        ];
        break;

      case 'solo':
        output = [
          'SOLO ENGINEERING VAULT (100% INDIVIDUALLY CODED):',
          '  Project: Fasal Niti Website',
          '  Role: Core Member (Solo Website Creator)',
          '  Live URL: https://prototype-fasalniti.vercel.app/',
          '  Author: 100% Individually Built & Deployed by Sahaj',
          '  Attribution: Complete solo engineering ownership for the web platform.',
        ];
        break;

      case 'hackathons':
        output = [
          'HACKATHONS & COMPETITIONS ARCHIVE (4 SUBDIVISIONS):',
          '  🏆 Podium Finishes: MITS Gwalior (IEEE Synapse Winner), O.P. Jindal Global University (1st Place Team & Runner Up), IIM Bhubaneswar (3rd Place)',
          '  🎯 Finalist Selections: IIT Delhi Stratazenith (Team Finalist), CodeHack (National Finalist)',
          '  🏁 Completed Events: Hacktoberfest (Top 15)',
          '  ⏳ Results Pending: SIH (University Round Cleared), SEVA (Fasal Niti), Construct (Nyay Link)',
          '  🏛 Host Institutions: IIT Delhi, IIM Bhubaneswar, MITS Gwalior, O.P. Jindal Global University.',
          '  Strict Rule: All competitions were team collaborations; solo works strictly isolated to Fasal Niti website.',
        ];
        break;

      case 'arts':
        output = [
          'CREATIVE & CULTURAL ARTS ACCREDITATIONS:',
          '  🥇 1st Place Winner — Simultaneous Classical Piano & Vocal Performance (Combined Win)',
          '  🥉 3rd Place        — National-level Theatre Competition (Spelling confirmation pending)',
          '  🎭 Collegiate Stage — 2 University Theatre Competitions with Club Swaarang',
          '  🎙 Public Mimicry   — Live Mimicry during IIM Bhubaneswar Presentation & Informal Practice',
          '  🖋 Poetry & Writing — Author of "THE SHAPE OF THE UNSAID" & "A Restless Shelf"',
        ];
        break;

      case 'whoami':
        output = [
          'Sahaj — Multidisciplinary Technologist, Entrepreneur & Performer',
          'Founder: Drusavi (10–15 Core Team) | Co-Founder: Nyay Link (8–9 Core Team)',
          'Core Member: Fasal Niti (Built Website Solo) & Less Go (Travel Itinerary)',
          'Podium Finisher: IEEE Synapse, OP Jindal (1st Place Team & Runner Up), IIM Bhubaneswar (3rd)',
          'Finalist Selections: IIT Delhi (Stratazenith) & CodeHack',
          'Results Pending: SIH (Univ Round Cleared), SEVA (Fasal Niti), Construct (Nyay Link)',
          'Arts: Winner in Simultaneous Piano & Singing | 3rd Place National Theatre',
          'Confirmed Stack: JavaScript, Python, SQL, MySQL, HTML, Bash',
        ];
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case '':
        output = [];
        break;

      default:
        output = [
          `Command not recognized: "${trimmed}". Type "help" for a list of valid commands.`,
        ];
        break;
    }

    setHistory((prev) => [...prev, { cmd: inputVal, output }]);
    setInputVal('');
  };

  return (
    <section id="terminal" className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-24">
      {/* Sunken Floor Command Bay */}
      <div className="relative rounded-[36px] bg-gradient-to-b from-[#060c15] via-[#04080e] to-[#020408] border border-cyan-500/25 p-6 sm:p-10 lg:p-12 shadow-[inset_0_4px_45px_rgba(0,0,0,0.95),0_25px_60px_rgba(0,0,0,0.9)] overflow-hidden">
        {/* Recessed Floor Grid Lines */}
        <div 
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(0, 240, 255, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(0, 240, 255, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: '36px 36px',
          }}
        />

        {/* Ambient Console Lighting */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6 relative z-10 pb-8 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/40 text-xs font-mono text-cyan-300 mb-4 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="tracking-wider uppercase">SUNKEN COMMAND CONSOLE // SYSTEM STACK</span>
            </div>
            <h2 className="font-display font-black text-3xl sm:text-5xl text-white tracking-tight uppercase">
              Engineering &amp; Systems Deck.
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>SUBSYSTEMS: ONLINE</span>
            </div>
            <span className="hidden sm:inline text-neutral-600">|</span>
            <span className="hidden sm:inline">TTY v2.4</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
          {/* Left: Categorized Hardware/Software Racks */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-[11px] font-mono text-neutral-400 uppercase tracking-widest px-1 flex items-center justify-between">
              <span>ACTIVE HARDWARE MODULES</span>
              <span className="text-cyan-400 font-semibold">6 VERIFIED TOOLS</span>
            </div>

            {skillsData.map((category, cIdx) => (
              <div
                key={category.category}
                className="glass-panel rounded-2xl p-5 border border-white/5 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-mono text-xs text-neutral-400 uppercase tracking-wider flex items-center gap-2">
                    <HardDrive className="w-3.5 h-3.5 text-cyan-400" />
                    <span>RACK 0{cIdx + 1} &bull; {category.category}</span>
                  </h4>
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono flex items-center gap-1.5 transition-all ${
                        skill.highlight
                          ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-200 shadow-[0_0_10px_rgba(0,240,255,0.15)]'
                          : 'bg-white/5 border border-white/5 text-neutral-300'
                      }`}
                    >
                      <Check className="w-3 h-3 text-cyan-400" />
                      <span>{skill.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Interactive Sunken Terminal */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-cyan-500/30 shadow-2xl overflow-hidden font-mono text-xs sm:text-sm bg-neutral-950/90">
              {/* Terminal Top Bar */}
              <div className="bg-neutral-900/90 px-5 py-3 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs text-neutral-400">sahaj@deck:~ (bash)</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                  <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                  <span className="text-cyan-400">TELEMETRY SYNCED</span>
                </div>
              </div>

              {/* Terminal Body with Cathode Scanline Styling */}
              <div 
                ref={terminalBodyRef} 
                className="p-5 min-h-[320px] max-h-[420px] overflow-y-auto space-y-4 bg-black/80 scanline text-neutral-200"
              >
                <div className="text-neutral-500 text-xs pb-2 border-b border-white/5">
                  Type verified commands or click suggested routines:
                  <div className="flex flex-wrap gap-2 mt-2">
                    {['startups', 'solo', 'hackathons', 'skills', 'arts'].map((cmd) => (
                      <button
                        key={cmd}
                        onClick={() => {
                          setInputVal(cmd);
                          sound.playKeyClick();
                        }}
                        className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-cyan-500/20 text-cyan-300 text-[11px] border border-white/10 hover:border-cyan-500/30 transition-colors"
                      >
                        {cmd}
                      </button>
                    ))}
                  </div>
                </div>

                {history.map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <span className="text-neutral-500">sahaj@deck:~$</span>
                      <span className="text-white font-semibold">{item.cmd}</span>
                    </div>
                    {item.output.map((line, lIdx) => (
                      <div key={lIdx} className="text-neutral-300 pl-4 text-xs sm:text-sm leading-relaxed">
                        {line}
                      </div>
                    ))}
                  </div>
                ))}
              </div>

              {/* Command Input Form */}
              <form onSubmit={handleCommand} className="p-3.5 bg-neutral-900/90 border-t border-white/10 flex items-center gap-2">
                <span className="text-cyan-400 font-mono pl-2 select-none">&gt;</span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => {
                    setInputVal(e.target.value);
                    sound.playKeyClick();
                  }}
                  placeholder="Type 'help' and press Enter..."
                  className="w-full bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-neutral-600"
                />
                <button
                  type="submit"
                  className="p-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-neutral-950 transition-colors shadow-md"
                  aria-label="Submit command"
                >
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
