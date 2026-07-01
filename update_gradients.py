import os
import re

directories = ['src/pages', 'src/components']
files_to_process = ['src/App.tsx']

for d in directories:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx'):
                files_to_process.append(os.path.join(root, file))

text_tags = {'span', 'div', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'Link', 'QuoteButton', 'button', 'strong', 'li', 'ul'}

def process_match(match, target_color):
    tag = match.group(1)
    before_class = match.group(2)
    classes = match.group(3)
    
    gradient_type = "text" if (tag in text_tags or tag[0].islower()) else "icon"
    
    if target_color == "text-bright-red":
        new_class = classes.replace("text-bright-red", f"{gradient_type}-gradient-primary")
    elif target_color == "text-deep-blue":
        new_class = classes.replace("text-deep-blue", f"{gradient_type}-gradient-secondary")
    else:
        new_class = classes

    return f"<{tag}{before_class}className=\"{new_class}\""

for filepath in files_to_process:
    with open(filepath, 'r') as f:
        content = f.read()

    # Match <Tag ... className="... text-bright-red ..."
    # This might take multiple passes if multiple tags on one line? Regex substitute searches globally.
    content = re.sub(r'<([A-Za-z0-9_]+)([^>]*?)className="([^"]*?text-bright-red[^"]*?)"', 
                     lambda m: process_match(m, "text-bright-red"), content)
    
    content = re.sub(r'<([A-Za-z0-9_]+)([^>]*?)className="([^"]*?text-deep-blue[^"]*?)"', 
                     lambda m: process_match(m, "text-deep-blue"), content)

    # Some classes might be dynamically generated using string interpolation: className={`... text-bright-red ...`}
    # We will also catch template literals
    content = re.sub(r'<([A-Za-z0-9_]+)([^>]*?)className=\{`([^`]*?text-bright-red[^`]*?)`\}', 
                     lambda m: f"<{m.group(1)}{m.group(2)}className={{`{m.group(3).replace('text-bright-red', f'text-gradient-primary' if (m.group(1) in text_tags or m.group(1)[0].islower()) else 'icon-gradient-primary')}`}}", content)

    content = re.sub(r'<([A-Za-z0-9_]+)([^>]*?)className=\{`([^`]*?text-deep-blue[^`]*?)`\}', 
                     lambda m: f"<{m.group(1)}{m.group(2)}className={{`{m.group(3).replace('text-deep-blue', f'text-gradient-secondary' if (m.group(1) in text_tags or m.group(1)[0].islower()) else 'icon-gradient-secondary')}`}}", content)

    with open(filepath, 'w') as f:
        f.write(content)

print("Updated gradients successfully!")
