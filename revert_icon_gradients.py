import os
import re

directories = ['src/pages', 'src/components']
files_to_process = ['src/App.tsx']

for d in directories:
    for root, _, files in os.walk(d):
        for file in files:
            if file.endswith('.tsx') or file.endswith('.jsx'):
                files_to_process.append(os.path.join(root, file))

for filepath in files_to_process:
    with open(filepath, 'r') as f:
        content = f.read()

    # Revert icon-gradient-primary to text-bright-red
    content = content.replace("icon-gradient-primary", "text-bright-red")
    
    # Revert icon-gradient-secondary to text-deep-blue
    content = content.replace("icon-gradient-secondary", "text-deep-blue")

    with open(filepath, 'w') as f:
        f.write(content)

print("Reverted icon gradients successfully!")
