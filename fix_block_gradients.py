import os
import re

directories = ['src/pages', 'src/components', 'src']
files_to_process = []

for d in directories:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx'):
                files_to_process.append(os.path.join(root, file))

# We want to find elements that have text-gradient-primary or text-gradient-secondary, BUT they also have w- and h- (like w-10 h-10 or w-12 h-12) OR bg- properties which indicate they are a background box. 
# Better yet, let's just use grep to see them and process carefully, or just revert ALL div/span that have w- and h- and bg-.
# Wait, let's just write a script that does it safely if there's w-\d+ h-\d+.

def revert_if_box(match):
    full_str = match.group(0)
    
    # If the class contains w- and h-, it's likely a box containing an icon, NOT text.
    # E.g. className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gradient-primary"
    
    # Or, if it contains "bg-", it might be a box.
    # But wait, what if the user JUST wanted text-bright-red? 
    # Let's revert text-gradient-primary to text-bright-red AND text-gradient-secondary to text-deep-blue
    # IF the class string contains "w-" or "flex-shrink-0"
    
    is_box = re.search(r'\bw-\d+\b', full_str) or 'flex-shrink-0' in full_str or 'bg-' in full_str

    if is_box:
        full_str = full_str.replace("text-gradient-primary", "text-bright-red")
        full_str = full_str.replace("text-gradient-secondary", "text-deep-blue")
        
    return full_str

for filepath in files_to_process:
    with open(filepath, 'r') as f:
        content = f.read()

    # Revert in classNames
    content = re.sub(r'className="[^"]*text-gradient-(primary|secondary)[^"]*"', revert_if_box, content)
    content = re.sub(r'className=\{`[^`]*text-gradient-(primary|secondary)[^`]*`\}', revert_if_box, content)

    with open(filepath, 'w') as f:
        f.write(content)

print("Reverted gradients for box elements!")
