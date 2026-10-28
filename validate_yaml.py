import os
import yaml

def check_md_files(root_dir):
    for root, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.md'):
                path = os.path.join(root, file)
                try:
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if content.startswith('---'):
                            parts = content.split('---', 2)
                            if len(parts) >= 3:
                                yaml.safe_load(parts[1])
                                # print(f"OK: {path}")
                except Exception as e:
                    print(f"ERROR in {path}: {e}")

check_md_files('c:\\Users\\hafiz\\Desktop\\urdu poetry site project\\urdu-poetry-site\\content')
