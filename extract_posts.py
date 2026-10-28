import xml.etree.ElementTree as ET
import json
import re

def parse_wordpress_xml(file_path):
    # Register namespaces
    namespaces = {
        'wp': 'http://wordpress.org/export/1.2/',
        'content': 'http://purl.org/rss/1.0/modules/content/',
        'dc': 'http://purl.org/dc/elements/1.1/'
    }
    
    try:
        tree = ET.parse(file_path)
        root = tree.getroot()
        channel = root.find('channel')
        
        posts = []
        type_counts = {}
        
        for item in channel.findall('item'):
            # Check post type
            post_type_elem = item.find('wp:post_type', namespaces)
            p_type = post_type_elem.text if post_type_elem is not None else 'unknown'
            
            if p_type not in type_counts:
                type_counts[p_type] = 0
            type_counts[p_type] += 1
            
            if post_type_elem is None or post_type_elem.text not in ['post', 'page']:
                continue
                
            # Check status
            status_elem = item.find('wp:status', namespaces)
            if status_elem is None or status_elem.text != 'publish':
                continue
                
            title = item.find('title').text
            link = item.find('link').text
            
            # Extract categories
            categories = []
            for cat in item.findall('category'):
                if cat.get('domain') == 'category':
                    categories.append(cat.text)
            
            post_name = item.find('wp:post_name', namespaces)
            slug = post_name.text if post_name is not None else ""
            
            posts.append({
                'title': title,
                'link': link,
                'categories': categories,
                'slug': slug
            })
            
        print(json.dumps({'posts': posts, 'types': type_counts}, indent=2))
        
    except Exception as e:
        print(f"Error parsing XML: {e}")

parse_wordpress_xml('c:\\Users\\hafiz\\Desktop\\urdu poetry site project\\urdu-poetry-site\\poetryinurdutextcom.WordPress.2026-01-18.xml')
