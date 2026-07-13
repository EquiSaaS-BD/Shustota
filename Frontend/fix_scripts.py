import os
import glob
import re

files = glob.glob('src/**/*.tsx', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Strip ALL script tags to avoid JSX parsing errors
    content = re.sub(r'<script.*?>.*?</script>', '', content, flags=re.DOTALL)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Stripped all script tags.")
