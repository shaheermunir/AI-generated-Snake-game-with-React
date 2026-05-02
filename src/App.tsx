/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import MusicPlayer from "./components/MusicPlayer";
import SnakeGame from "./components/SnakeGame";

export default function App() {
  return (
    <div className="flex flex-col h-screen bg-cyber-black text-white overflow-hidden p-6 relative font-digital uppercase selection:bg-cyber-magenta selection:text-black">
      <div className="static-overlay mix-blend-screen" />
      
      {/* Header */}
      <header className="flex justify-between items-end border-b-4 border-cyber-cyan pb-2 mb-6 screen-tear relative z-10 w-full max-w-[1200px] mx-auto">
        <div>
          <h1 className="text-5xl md:text-6xl font-bold glitch-text-wrapper m-0 leading-none tracking-tight" data-text="NEURAL_LINK::ESTABLISHED">
            NEURAL_LINK::ESTABLISHED
          </h1>
          <div className="text-cyber-magenta text-2xl tracking-[0.2em] mt-2 animate-pulse font-bold">
            &gt; SYSTEM_OVERRIDE_ACTIVE
          </div>
        </div>
        <div className="hidden md:flex text-right text-cyber-cyan text-2xl flex-col items-end gap-1">
          <span className="bg-cyber-cyan text-black px-2 py-0.5 font-bold">V 9.9.9_FATAL</span>
          <span className="bg-cyber-magenta text-black px-2 py-0.5 font-bold">LATENCY: ERR_NaN</span>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 flex flex-col xl:flex-row gap-12 w-full max-w-[1200px] mx-auto z-10 relative items-start justify-center overflow-auto pb-10">
        {/* Game Panel */}
        <div className="flex-shrink-0 glitch-border bg-black/80 p-6 relative screen-tear backdrop-blur-sm self-center xl:self-start">
          <div className="absolute top-0 right-0 bg-cyber-cyan text-black px-3 py-1 text-xl font-bold -translate-y-full border-2 border-cyber-cyan">
            PROCESS::0x0A [SERPENT.EXE]
          </div>
          <SnakeGame />
        </div>

        {/* Audio & Console Panel */}
        <div className="flex flex-col gap-10 w-full xl:max-w-md">
          <div className="glitch-border bg-black/80 p-6 relative backdrop-blur-sm">
            <div className="absolute top-0 left-0 bg-cyber-magenta text-black px-3 py-1 text-xl font-bold -translate-y-full border-2 border-cyber-magenta">
              PROCESS::0x0B [AUDIO_DECODER]
            </div>
            <MusicPlayer />
          </div>
          
          {/* Console Output */}
          <div className="glitch-border bg-black p-6 relative overflow-hidden h-48 screen-tear flex flex-col justify-end">
             <div className="absolute top-0 right-0 bg-white text-black px-3 py-1 text-xl font-bold -translate-y-full border-2 border-white glitch-text-wrapper" data-text="DIAGNOSTICS_LOG">
               DIAGNOSTICS_LOG
             </div>
             <div className="text-cyber-cyan text-2xl flex flex-col gap-1 opacity-90 z-10 font-bold" style={{ textShadow: "2px 2px 0 var(--color-cyber-magenta)" }}>
               <span>&gt; AWAITING USER INPUT...</span>
               <span className="text-cyber-magenta">&gt; MEMORY LEAK DETECTED</span>
               <span className="text-white bg-cyber-cyan w-max">&gt; KERNEL PANIC IMMINENT</span>
               <span className="animate-pulse">&gt; _</span>
             </div>
             {/* Scanline sweep */}
             <div className="absolute top-0 left-0 bg-gradient-to-b from-transparent via-cyber-cyan/20 to-transparent h-12 w-full animate-[scan_3s_linear_infinite]" />
          </div>
        </div>
      </main>
    </div>
  );
}

