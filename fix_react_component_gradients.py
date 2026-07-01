import os
import re

directories = ['src/pages', 'src/components', 'src']
files_to_process = []

for d in directories:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx'):
                files_to_process.append(os.path.join(root, file))

def revert_icon_gradients(match):
    full_str = match.group(0)
    
    # full_str looks like: <Shield size={24} className="text-gradient-primary" />
    # We want to replace text-gradient-primary with text-bright-red
    # and text-gradient-secondary with text-deep-blue
    
    # BUT we only want to do this if the tag name starts with a capital letter (indicating a React component, usually an icon)
    # OR if the tag name is "svg", "circle", "path"
    tag_name_match = re.match(r'<\s*([a-zA-Z0-9_\.]+)', full_str)
    if tag_name_match:
        tag_name = tag_name_match.group(1)
        # Check if it starts with capital (e.g. Shield) or if it's type.icon or similar
        is_capitalized = tag_name[0].isupper()
        is_property = '.' in tag_name # e.g. <type.icon> or <step.icon> or <item.icon>
        is_svg = tag_name.lower() in ('svg', 'path', 'circle', 'g', 'rect')
        
        if is_capitalized or is_property or is_svg:
            full_str = full_str.replace("text-gradient-primary", "text-bright-red")
            full_str = full_str.replace("text-gradient-secondary", "text-deep-blue")
            
    return full_str

for filepath in files_to_process:
    with open(filepath, 'r') as f:
        content = f.read()

    # Match an opening tag <Something ... > that contains text-gradient-
    # We'll use a regex that finds < followed by non-angle-brackets containing text-gradient, closed by >
    # This is slightly tricky, so we'll do:
    # <[^>]*text-gradient(?:-primary|-secondary)[^>]*>
    content = re.sub(r'<[^>]*text-gradient-(?:primary|secondary)[^>]*>', revert_icon_gradients, content)

    with open(filepath, 'w') as f:
        f.write(content)

print("Reverted gradients on React components and icons successfully!")
