import Link from 'next/link';
import { Category, Post } from '@/lib/types';

interface CategoryCardProps {
    category: Category;
    previewPosts?: Post[];
}

export function CategoryCard({ category, previewPosts = [] }: CategoryCardProps) {
    // Get preview poetry lines (first line from first 3 posts)
    const previewLines = previewPosts
        .slice(0, 3)
        .map(post => post.poetry[0]?.text.split('\n')[0])
        .filter(Boolean);

    return (
        <Link href={`/category/${category.slug}/`} className="category-card">
            <div className="category-header">
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-title">{category.name}</h3>
                <p className="category-count">
                    {category.postCount || 0} posts • {category.nameUrdu}
                </p>
            </div>

            {previewLines.length > 0 && (
                <div className="category-preview">
                    {previewLines.map((line, index) => (
                        <div key={index} className="category-preview-item">
                            {line}...
                        </div>
                    ))}
                </div>
            )}

            <div className="category-footer">
                View All Poetry →
            </div>
        </Link>
    );
}
