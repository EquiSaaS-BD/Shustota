import os
import glob
import re

files = glob.glob('src/**/*.tsx', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Strip ALL inline style attributes completely to avoid JSX parsing errors
    # style={{...}}
    content = re.sub(r'style=\{\{.*?\}\}', '', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Stripped all JSX styles.")
