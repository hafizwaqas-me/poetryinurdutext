import { Metadata } from 'next';
import Link from 'next/link';
import { getAllBlogPosts } from '@/lib/content';
import { Breadcrumbs, AdSlot } from '@/components';

export const metadata: Metadata = {
    title: 'Blog - Articles About Urdu Poetry & Literature',
    description: 'Read articles about Urdu poetry, literature, famous poets, and the history of Urdu literary tradition.',
    keywords: ['urdu poetry blog', 'urdu literature', 'poetry articles', 'ghazal history'],
};

export default async function BlogPage() {
    const posts = await getAllBlogPosts();

    return (
        <div className="container">
            <Breadcrumbs items={[{ label: 'Blog' }]} />

            <header style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
                    Blog & Articles
                </h1>
                <p style={{ color: 'var(--foreground-muted)', marginTop: '0.5rem', maxWidth: '600px', margin: '0.5rem auto' }}>
                    Explore articles about Urdu poetry, literature, famous poets, and the rich history of Urdu literary tradition.
                </p>
            </header>

            <AdSlot type="banner" />

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
            }}>
                {posts.map(post => (
                    <Link
                        key={post.slug}
                        href={`/blog/${post.slug}/`}
                        className="category-card"
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="category-header" style={{ padding: '1.5rem' }}>
                            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>📖</div>
                            <h2 style={{ fontSize: '1.1rem', fontWeight: 600 }}>{post.title}</h2>
                            {post.category && (
                                <span style={{
                                    display: 'inline-block',
                                    padding: '0.25rem 0.75rem',
                                    background: 'rgba(255,255,255,0.2)',
                                    borderRadius: '20px',
                                    fontSize: '0.75rem',
                                    marginTop: '0.5rem'
                                }}>
                                    {post.category}
                                </span>
                            )}
                        </div>
                        <div className="category-preview" style={{ padding: '1rem 1.5rem' }}>
                            <p style={{
                                color: 'var(--foreground-muted)',
                                fontSize: '0.9rem',
                                lineHeight: 1.6
                            }}>
                                {post.description}
                            </p>
                            <p style={{
                                fontSize: '0.8rem',
                                color: 'var(--foreground-muted)',
                                marginTop: '0.5rem'
                            }}>
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                        </div>
                        <div className="category-footer">
                            Read Article →
                        </div>
                    </Link>
                ))}
            </div>

            {posts.length === 0 && (
                <div style={{
                    textAlign: 'center',
                    padding: '3rem',
                    color: 'var(--foreground-muted)'
                }}>
                    <p>Blog posts coming soon!</p>
                </div>
            )}
        </div>
    );
}
