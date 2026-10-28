import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPosts, getPostBySlugOnly, getCategoryBySlug } from '@/lib/content';
import { Breadcrumbs, PoetryCard, AdSlot, FAQSection, Sidebar } from '@/components';
import { FAQSchema, CreativeWorkSchema, BreadcrumbSchema } from '@/components/schemas';
import { ADS_CONFIG } from '@/config/ads';
import Link from 'next/link';
import { remark } from 'remark';
import html from 'remark-html';

interface PostPageProps {
    params: Promise<{ category: string }>;
}

// Generate static paths for all posts at root level
export async function generateStaticParams() {
    const posts = getAllPosts();
    return posts.map((post) => ({
        category: post.slug,  // Using 'category' param for post slugs at root level
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const { category: slug } = await params;  // Rename to slug for clarity
    const post = getPostBySlugOnly(slug);

    if (!post) {
        return { title: 'Not Found' };
    }

    const category = getCategoryBySlug(post.category);
    const firstPoetryLine = post.poetry[0]?.text.split('\n')[0] || '';

    return {
        title: `${post.title} - ${post.titleUrdu || ''}`,
        description: post.description || `${firstPoetryLine}... Read beautiful ${category?.name.toLowerCase() || 'urdu poetry'} and share with your loved ones.`,
        keywords: [post.title, category?.name.toLowerCase() || '', 'urdu poetry', post.poet || ''].filter(Boolean),
        openGraph: {
            title: post.titleUrdu || post.title,
            description: firstPoetryLine,
            type: 'article',
        },
    };
}

export default async function PostPage({ params }: PostPageProps) {
    const { category: slug } = await params;
    const post = getPostBySlugOnly(slug);

    if (!post) {
        notFound();
    }

    const category = getCategoryBySlug(post.category);
    const baseUrl = 'https://poetryinurdutext.com';

    // Process markdown content
    let contentHtml = '';
    if (post.content) {
        const processedContent = await remark().use(html).process(post.content);
        contentHtml = processedContent.toString();
    }

    // Get related posts from same category
    const allPosts = getAllPosts();
    const relatedPosts = allPosts
        .filter(p => p.category === post.category && p.slug !== slug)
        .slice(0, 4);

    return (
        <div className="container">
            {/* Schema Markup */}
            <CreativeWorkSchema
                name={post.title}
                description={post.description || post.poetry[0]?.text.split('\n')[0] || ''}
                url={`${baseUrl}/${slug}/`}
                author={post.poet}
                inLanguage="ur"
            />
            {/* ... breadcrumbs ... */}

            <div className="content-wrapper">
                <main>
                    {/* Post Header */}
                    <header style={{ textAlign: 'center', padding: '2rem 0' }}>
                        {/* ... existing header code ... */}
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 700 }}>
                            {post.title}
                        </h1>
                        {/* ... */}
                    </header>

                    {/* Description (Intro) */}
                    {post.description && (
                        <p style={{
                            textAlign: 'center',
                            maxWidth: '600px',
                            margin: '0 auto 2rem',
                            color: 'var(--foreground-muted)'
                        }}>
                            {post.description}
                        </p>
                    )}

                    {/* Markdown Content */}
                    {contentHtml && (
                        <div
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: contentHtml }}
                            style={{ marginBottom: '2rem' }}
                        />
                    )}

                    {/* Ad Banner */}
                    <AdSlot type="banner" slotId={ADS_CONFIG.slots.postBanner} />


                    {/* Poetry Cards */}
                    <section style={{ marginTop: '2rem' }}>
                        <div className="poetry-grid">
                            {post.poetry.map((poetry, index) => (
                                <React.Fragment key={poetry.id}>
                                    <PoetryCard
                                        poetry={{
                                            ...poetry,
                                            poet: poetry.poet || post.poet
                                        }}
                                    />
                                    {/* Show ad after every 6 cards */}
                                    {(index + 1) % 6 === 0 && index < post.poetry.length - 1 && (
                                        <AdSlot type="card" slotId={ADS_CONFIG.slots.postInline} />
                                    )}
                                </React.Fragment>
                            ))}
                        </div>
                    </section>

                    {/* FAQs Section */}
                    {post.faqs && post.faqs.length > 0 && (
                        <FAQSection faqs={post.faqs} />
                    )}
                </main>

                {/* Right Column (Sidebar) */}
                <Sidebar />
            </div>

            {/* Related Posts (Full Width) */}
            {relatedPosts.length > 0 && (
                <section style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                        📚 More {category?.name || 'Poetry'}
                    </h3>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                        gap: '1rem'
                    }}>
                        {relatedPosts.map(relatedPost => (
                            <Link
                                key={relatedPost.slug}
                                href={`/${relatedPost.slug}/`}
                                style={{
                                    padding: '1rem',
                                    background: 'var(--card-bg)',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    color: 'var(--foreground)',
                                    border: '1px solid var(--border)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <h4 style={{ fontWeight: 600 }}>{relatedPost.title}</h4>
                                {relatedPost.titleUrdu && (
                                    <p style={{
                                        fontFamily: "'Jameel Noori Nastaleeq', serif",
                                        direction: 'rtl',
                                        marginTop: '0.25rem'
                                    }}>
                                        {relatedPost.titleUrdu}
                                    </p>
                                )}
                                <p style={{
                                    fontSize: '0.85rem',
                                    color: 'var(--foreground-muted)',
                                    marginTop: '0.5rem'
                                }}>
                                    {relatedPost.poetry.length} poetry lines
                                </p>
                            </Link>
                        ))}
                    </div>
                </section>
            )}

            {/* Back to Category */}
            {category && (
                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <Link
                        href={`/category/${category.slug}/`}
                        style={{
                            display: 'inline-block',
                            padding: '0.75rem 1.5rem',
                            background: 'var(--primary)',
                            color: 'white',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            fontWeight: 500
                        }}
                    >
                        ← Back to {category.name}
                    </Link>
                </div>
            )}
        </div>
    );
}
