import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllBlogPosts, getBlogPostBySlug } from '@/lib/content';
import { Breadcrumbs, AdSlot } from '@/components';
import { ShareButton } from '@/components/ShareButton';
import Link from 'next/link';

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const posts = await getAllBlogPosts();
    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        return { title: 'Not Found' };
    }

    return {
        title: post.title,
        description: post.description,
        keywords: [post.title, post.category || '', 'urdu poetry', 'blog'],
        openGraph: {
            title: post.title,
            description: post.description,
            type: 'article',
            publishedTime: post.date,
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = await getBlogPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const allPosts = await getAllBlogPosts();
    const relatedPosts = allPosts
        .filter(p => p.slug !== slug)
        .slice(0, 3);

    return (
        <div className="container">
            <Breadcrumbs items={[
                { label: 'Blog', href: '/blog/' },
                { label: post.title }
            ]} />

            <article style={{ maxWidth: '800px', margin: '0 auto' }}>
                {/* Article Header */}
                <header style={{ textAlign: 'center', padding: '2rem 0' }}>
                    {post.category && (
                        <span style={{
                            display: 'inline-block',
                            padding: '0.25rem 0.75rem',
                            background: 'var(--primary)',
                            color: 'white',
                            borderRadius: '20px',
                            fontSize: '0.8rem',
                            marginBottom: '1rem'
                        }}>
                            {post.category}
                        </span>
                    )}
                    <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
                        {post.title}
                    </h1>
                    <p style={{
                        color: 'var(--foreground-muted)',
                        marginTop: '0.5rem',
                        fontSize: '0.9rem'
                    }}>
                        {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                        })}
                    </p>
                </header>

                {/* Ad Banner */}
                <AdSlot type="banner" />

                {/* Article Content */}
                <div
                    className="article-content"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                    style={{ marginTop: '2rem' }}
                />

                {/* Share & Actions */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1rem',
                    marginTop: '2rem',
                    paddingTop: '2rem',
                    borderTop: '1px solid var(--border)'
                }}>
                    <ShareButton title={post.title} description={post.description} />
                </div>
            </article>

            {/* Related Posts */}
            {relatedPosts.length > 0 && (
                <section style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem', textAlign: 'center' }}>
                        More Articles
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                        gap: '1rem'
                    }}>
                        {relatedPosts.map(relatedPost => (
                            <Link
                                key={relatedPost.slug}
                                href={`/blog/${relatedPost.slug}/`}
                                style={{
                                    padding: '1rem',
                                    background: 'var(--card-bg)',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    color: 'var(--foreground)',
                                    border: '1px solid var(--border)'
                                }}
                            >
                                <h4 style={{ fontWeight: 600 }}>{relatedPost.title}</h4>
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--foreground-muted)',
                                    marginTop: '0.5rem'
                                }}>
                                    {relatedPost.description.substring(0, 100)}...
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
