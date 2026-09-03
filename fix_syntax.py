with open('WebApp/src/components/ProjectPage.tsx', 'r') as f:
    content = f.read()

# Fix Soluzione 1, 2, 3 containers
content = content.replace(
    'className="p-4 bg-[#131514] rounded-xl border transition-all flex gap-4 shadow-sm ${isAetheris ? "border-[#068B35]/20 hover:border-[#068B35]/40" : isChronos ? "border-[#B40E3C]/20 hover:border-[#B40E3C]/40" : "border-[#E8302A]/20 hover:border-[#E8302A]/40"}"',
    'className={`p-4 bg-[#131514] rounded-xl border transition-all flex gap-4 shadow-sm ${isAetheris ? "border-[#068B35]/20 hover:border-[#068B35]/40" : isChronos ? "border-[#B40E3C]/20 hover:border-[#B40E3C]/40" : "border-[#E8302A]/20 hover:border-[#E8302A]/40"}`}'
)

# Fix Soluzione 1, 2, 3 numbers
content = content.replace(
    'className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm font-raleway mt-0.5 border ${isAetheris ? "bg-[#068B35]/20 text-emerald-300 border-[#068B35]/30" : isChronos ? "bg-[#B40E3C]/20 text-rose-300 border-[#B40E3C]/30" : "bg-[#E8302A]/20 text-rose-300 border-[#E8302A]/30"}"',
    'className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-sm font-raleway mt-0.5 border ${isAetheris ? "bg-[#068B35]/20 text-emerald-300 border-[#068B35]/30" : isChronos ? "bg-[#B40E3C]/20 text-rose-300 border-[#B40E3C]/30" : "bg-[#E8302A]/20 text-rose-300 border-[#E8302A]/30"}`}'
)

with open('WebApp/src/components/ProjectPage.tsx', 'w') as f:
    f.write(content)
