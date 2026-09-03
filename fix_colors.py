import re

with open('WebApp/src/components/ProjectPage.tsx', 'r') as f:
    content = f.read()

# Replace text color
content = content.replace(
    "isAetheris ? 'text-[#068B35]' : 'text-[#E8302A]'",
    "isAetheris ? 'text-[#068B35]' : isChronos ? 'text-[#B40E3C]' : 'text-[#E8302A]'"
)

# Replace bg color
content = content.replace(
    "isAetheris ? 'bg-[#068B35]' : 'bg-[#E8302A]'",
    "isAetheris ? 'bg-[#068B35]' : isChronos ? 'bg-[#B40E3C]' : 'bg-[#E8302A]'"
)

# Replace border color
content = content.replace(
    "isAetheris ? 'border-[#068B35]' : 'border-[#E8302A]'",
    "isAetheris ? 'border-[#068B35]' : isChronos ? 'border-[#B40E3C]' : 'border-[#E8302A]'"
)

# Replace opacities for bg
for op in ['10', '15', '20', '30']:
    content = content.replace(
        f"isAetheris ? 'bg-[#068B35]/{op}' : 'bg-[#E8302A]/{op}'",
        f"isAetheris ? 'bg-[#068B35]/{op}' : isChronos ? 'bg-[#B40E3C]/{op}' : 'bg-[#E8302A]/{op}'"
    )
    
# Replace opacities for border
for op in ['15', '20', '30', '50']:
    content = content.replace(
        f"isAetheris ? 'border-[#068B35]/{op}' : 'border-[#E8302A]/{op}'",
        f"isAetheris ? 'border-[#068B35]/{op}' : isChronos ? 'border-[#B40E3C]/{op}' : 'border-[#E8302A]/{op}'"
    )

with open('WebApp/src/components/ProjectPage.tsx', 'w') as f:
    f.write(content)
