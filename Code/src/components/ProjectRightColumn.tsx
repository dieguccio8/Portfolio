import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  MapPin, 
  QrCode, 
  Check, 
  RefreshCw 
} from 'lucide-react';
import { Project } from '../types';

interface ProjectRightColumnProps {
  project: Project;
}

export default function ProjectRightColumn({ project }: ProjectRightColumnProps) {
  // copiedColor local state for Right Column
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  // 2. Urban StreetArt Sicily State
  const [selectedSpot, setSelectedSpot] = useState<'silos' | 'kalsa' | 'messina'>('silos');
  const [isRouting, setIsRouting] = useState(false);
  const [routeInfo, setRouteInfo] = useState<string | null>(null);

  // 3. Italo Treni State
  const [ticketForm, setTicketForm] = useState({
    from: 'Catania Centrale',
    to: 'Roma Termini',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0], // Tomorrow
    passengerName: 'Diego Cavallaro'
  });
  const [generatedTicket, setGeneratedTicket] = useState<any | null>(null);
  const [isGeneratingTicket, setIsGeneratingTicket] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleCopyHex = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  // Route calculator
  const handleCalculateRoute = () => {
    setIsRouting(true);
    setRouteInfo(null);
    setTimeout(() => {
      const times = {
        silos: "15 minuti in auto / 45 minuti a piedi dal centro di Catania",
        kalsa: "2 ore e 40 minuti via Autostrada A19 da Catania Centrale",
        messina: "1 ora e 15 minuti tramite Autostrada A18 Messina-Catania"
      };
      setRouteInfo(times[selectedSpot]);
      setIsRouting(false);
    }, 1200);
  };

  // Ticket Generator
  const handleGenerateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGeneratingTicket(true);
    setDownloadSuccess(false);
    setTimeout(() => {
      const randomPNR = Math.random().toString(36).substring(2, 8).toUpperCase();
      const randomSeat = Math.floor(Math.random() * 19) + 1 + ['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)];
      setGeneratedTicket({
        ...ticketForm,
        pnr: randomPNR,
        coach: Math.floor(Math.random() * 5) + 1,
        seat: randomSeat,
        trainNum: "ITALO " + (9900 + Math.floor(Math.random() * 99)),
        price: (29.90 + Math.random() * 50).toFixed(2)
      });
      setIsGeneratingTicket(false);
    }, 1500);
  };

  const isAetheris = project.id === 'aetheris';

  return (
    <div className="flex flex-col gap-8 w-full">
      {/* DYNAMIC INTERACTIVE SHOWCASE ACCORDING TO CURRENT PROJECT */}
      {project.id !== 'aetheris' && project.id !== 'kinetics' && (
        <div className="border border-white/10 p-6 bg-neutral-950/60 rounded-[1.5rem] shadow-2xl flex flex-col gap-5">
          
          {/* Italo Treni Dynamic Widget */}
          {project.id === 'chronos' && (
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <h4 className="text-xs uppercase font-mono tracking-widest text-[#9E1C1F] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping" />
                  <span>Live Ticket Generator</span>
                </h4>
                <span className="text-[9px] font-mono text-white/30">ITALO-PASS-GEN</span>
              </div>

              <p className="text-[11px] leading-relaxed text-white/60">
                Genera in tempo reale un prototipo interattivo di biglietto digitale Italo per la tratta Catania-Palermo o Catania-Messina.
              </p>

              <form onSubmit={handleGenerateTicket} className="flex flex-col gap-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-mono text-white/40 uppercase">Passeggero</label>
                    <input
                      type="text"
                      required
                      value={ticketForm.passengerName}
                      onChange={(e) => setTicketForm({ ...ticketForm, passengerName: e.target.value })}
                      placeholder="Mario Rossi"
                      className="px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white focus:border-[#9E1C1F] outline-none font-mono"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[9px] font-mono text-white/40 uppercase">Tratta</label>
                    <select
                      value={`${ticketForm.from}-${ticketForm.to}`}
                      onChange={(e) => {
                        const [from, to] = e.target.value.split('-');
                        setTicketForm({ ...ticketForm, from, to });
                      }}
                      className="px-3 py-1.5 bg-black border border-white/10 rounded-lg text-xs text-white focus:border-[#9E1C1F] outline-none font-mono"
                    >
                      <option value="Catania Centrale-Palermo Centrale">Catania ➔ Palermo</option>
                      <option value="Catania Centrale-Messina Centrale">Catania ➔ Messina</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isGeneratingTicket}
                  className="w-full py-2.5 bg-[#9E1C1F] hover:bg-[#b02225] disabled:opacity-40 text-white font-bold rounded-xl text-xs uppercase font-mono tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-2"
                >
                  {isGeneratingTicket ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Emissione Ticket...</span>
                    </>
                  ) : (
                    <span>Genera Biglietto</span>
                  )}
                </button>
              </form>

              <AnimatePresence>
                {generatedTicket && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white text-black p-4 rounded-xl border border-white/10 flex flex-col gap-3 relative overflow-hidden"
                  >
                    {/* Top ticket strip */}
                    <div className="flex justify-between items-start border-b border-black/10 pb-2">
                      <div>
                        <span className="text-[9px] font-bold text-[#9E1C1F] font-mono block">italotreno.it</span>
                        <span className="text-[11px] font-black tracking-tight">{generatedTicket.trainNum}</span>
                      </div>
                      <QrCode className="w-8 h-8 text-black" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                      <div>
                        <span className="text-black/40 block">DA:</span>
                        <span className="font-bold">{generatedTicket.from}</span>
                      </div>
                      <div>
                        <span className="text-black/40 block">A:</span>
                        <span className="font-bold">{generatedTicket.to}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-[9px] font-mono border-t border-black/5 pt-2">
                      <div>
                        <span className="text-black/40 block">CARROZZA</span>
                        <span className="font-bold font-mono">{generatedTicket.coach}</span>
                      </div>
                      <div>
                        <span className="text-black/40 block">POSTO</span>
                        <span className="font-bold font-mono">{generatedTicket.seat}</span>
                      </div>
                      <div>
                        <span className="text-black/40 block">PNR</span>
                        <span className="font-bold text-[#9E1C1F]">{generatedTicket.pnr}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center border-t border-black/5 pt-2">
                      <div>
                        <span className="text-[8px] font-mono text-black/40 block">PASSEGGERO</span>
                        <span className="text-[10px] font-bold uppercase truncate max-w-[120px] block">{generatedTicket.passengerName}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[8px] font-mono text-black/40 block">TARIFFA PRENOTATA</span>
                        <span className="text-xs font-black text-black">€{generatedTicket.price}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setDownloadSuccess(true);
                        setTimeout(() => setDownloadSuccess(false), 2000);
                      }}
                      className="w-full mt-1 py-1.5 bg-black hover:bg-neutral-800 text-white font-bold rounded-lg text-[9px] uppercase font-mono tracking-widest transition-colors cursor-pointer flex items-center justify-center gap-1"
                    >
                      {downloadSuccess ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-400" />
                          <span>Ticket Salvato!</span>
                        </>
                      ) : (
                        <span>Scarica Wallet Pass</span>
                      )}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

        </div>
      )}


    </div>
  );
}
