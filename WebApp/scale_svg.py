import re

svg_file = '/Users/ericadibella/Desktop/DIEGO/Portfolio/WebApp/public/train_divider.svg'
with open(svg_file, 'r') as f:
    content = f.read()

# The text path is the only one with fill="white" that is huge (the INTRODUZIONE text)
# Actually, let's just find the path that starts with M1302
path_pattern = re.compile(r'(<path d="M1302[^>]+fill="white"/>)')

match = path_pattern.search(content)
if match:
    path_tag = match.group(1)
    
    # Scale factor (1.4 should make it almost as tall as the train)
    scale = 1.35
    cx = 1726
    cy = 68.28
    
    # SVG transform
    transform = f'transform="translate({cx}, {cy}) scale({scale}) translate(-{cx}, -{cy})"'
    
    new_path = path_tag.replace('fill="white"', f'fill="white" {transform}')
    new_content = content.replace(path_tag, new_path)
    
    with open(svg_file, 'w') as f:
        f.write(new_content)
    print("Successfully scaled text in SVG")
else:
    print("Could not find text path")
