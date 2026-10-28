import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import { getAllCategories, getCategoryBySlug, getPostsByCategory } from '@/lib/content';
import { Breadcrumbs, InfinitePoetryGrid, AdSlot, FAQSection, Sidebar } from '@/components';
import { FAQSchema, CollectionSchema, BreadcrumbSchema } from '@/components/schemas';
import { ADS_CONFIG } from '@/config/ads';
import Link from 'next/link';

interface CategoryPageProps {
    params: Promise<{ slug: string }>;
}

// Generate static paths for all categories
export async function generateStaticParams() {
    const categories = getAllCategories();
    return categories.map((category) => ({
        slug: category.slug,
    }));
}

// Generate metadata for SEO
export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) {
        return { title: 'Not Found' };
    }

    return {
        title: `${category.name} - ${category.nameUrdu} | Best Collection`,
        description: category.description,
        keywords: [category.name, category.nameUrdu, 'urdu poetry', 'urdu shayari', slug],
        openGraph: {
            title: `${category.name} - ${category.nameUrdu}`,
            description: category.description,
            type: 'website',
        },
    };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { slug } = await params;
    const category = getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const posts = getPostsByCategory(slug);

    // Collect all poetry from posts for infinite scroll
    const allPoetry = posts.flatMap(post =>
        post.poetry.map(p => ({
            ...p,
            poet: p.poet || post.poet
        }))
    );

    const baseUrl = 'https://poetryinurdutext.com';

    return (
        <div className="container">
            {/* Schema Markup */}
            <CollectionSchema
                name={category.name}
                description={category.description}
                url={`${baseUrl}/category/${slug}/`}
                numberOfItems={allPoetry.length}
            />
            <BreadcrumbSchema
                items={[
                    { name: 'Home', url: baseUrl },
                    { name: category.name, url: `${baseUrl}/category/${slug}/` }
                ]}
            />
            {category.faqs && <FAQSchema faqs={category.faqs} />}

            <Breadcrumbs items={[
                { label: category.name }
            ]} />

            {/* Main Content Layout */}
            <div className="content-wrapper">
                {/* Left Column (Content) */}
                <main>
                    {/* Category Header */}
                    <header style={{ textAlign: 'center', padding: '2rem 0' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{category.icon}</div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
                            {category.name} - {category.nameUrdu}
                        </h1>
                        <p style={{
                            color: 'var(--foreground-muted)',
                            marginTop: '0.5rem',
                            maxWidth: '600px',
                            margin: '0.5rem auto'
                        }}>
                            {category.description}
                        </p>
                        <p style={{ color: 'var(--foreground-muted)', marginTop: '0.5rem' }}>
                            {allPoetry.length} poetry lines in this collection
                        </p>
                    </header>

                    {/* Ad Banner */}
                    <AdSlot type="banner" slotId={ADS_CONFIG.slots.postBanner} />

                    {/* Intro Article for SEO */}
                    {category.introArticle && (
                        <section
                            className="article-content"
                            dangerouslySetInnerHTML={{ __html: category.introArticle }}
                            style={{ marginTop: '2rem', marginBottom: '2rem' }}
                        />
                    )}

                    {/* Posts List */}
                    {posts.length > 0 && (
                        <section style={{ marginTop: '2rem' }}>
                            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                                📚 Collections in {category.name}
                            </h2>
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                                gap: '1rem'
                            }}>
                                {posts.map(post => (
                                    <Link
                                        key={post.slug}
                                        href={`/${post.slug}/`}
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
                                        <h3 style={{ fontWeight: 600 }}>{post.title}</h3>
                                        {post.titleUrdu && (
                                            <p style={{
                                                fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
                                                direction: 'rtl',
                                                marginTop: '0.25rem',
                                                fontSize: '1.1rem'
                                            }}>
                                                {post.titleUrdu}
                                            </p>
                                        )}
                                        <p style={{ fontSize: '0.85rem', color: 'var(--foreground-muted)', marginTop: '0.5rem' }}>
                                            {post.poetry.length} poetry lines
                                        </p>
                                    </Link>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Poetry Grid with Infinite Scroll */}
                    <section style={{ marginTop: '3rem' }}>
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '1rem' }}>
                            ✨ All {category.name}
                        </h2>

                        {allPoetry.length > 0 ? (
                            <InfinitePoetryGrid
                                initialPosts={posts}
                                allPoetry={allPoetry}
                                itemsPerPage={12}
                            />
                        ) : (
                            <p style={{ textAlign: 'center', color: 'var(--foreground-muted)', padding: '2rem' }}>
                                Poetry coming soon...
                            </p>
                        )}
                    </section>

                    {/* FAQs Section */}
                    {category.faqs && category.faqs.length > 0 && (
                        <FAQSection faqs={category.faqs} />
                    )}
                </main>

                {/* Right Column (Sidebar) */}
                <Sidebar />
            </div>
        </div>
    );
}
