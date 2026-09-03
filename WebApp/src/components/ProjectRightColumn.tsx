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
    </div>
  );
}
