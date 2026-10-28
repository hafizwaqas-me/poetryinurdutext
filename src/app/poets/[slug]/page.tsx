import { Fragment } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAllPoets, getPoetBySlug, getAllPosts } from '@/lib/content';
import { Breadcrumbs, PoetryCard, AdSlot } from '@/components';
import { ADS_CONFIG } from '@/config/ads';

interface PoetPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const poets = getAllPoets();
    return poets.map((poet) => ({
        slug: poet.slug,
    }));
}

export async function generateMetadata({ params }: PoetPageProps): Promise<Metadata> {
    const { slug } = await params;
    const poet = getPoetBySlug(slug);

    if (!poet) {
        return { title: 'Not Found' };
    }

    return {
        title: `${poet.name} - ${poet.nameUrdu} | Biography & Poetry`,
        description: `Explore the life and poetry of ${poet.name} (${poet.nameUrdu}). ${poet.bio.substring(0, 150)}...`,
        keywords: [poet.name, poet.nameUrdu, 'urdu poet', 'urdu poetry', 'biography'],
        openGraph: {
            title: `${poet.name} - ${poet.nameUrdu}`,
            description: poet.bio.substring(0, 200),
            type: 'profile',
        },
    };
}

export default async function PoetPage({ params }: PoetPageProps) {
    const { slug } = await params;
    const poet = getPoetBySlug(slug);

    if (!poet) {
        notFound();
    }

    // Get all posts by this poet or from poet's category
    const allPosts = getAllPosts();
    const poetryByPoet = allPosts
        .filter(post =>
            post.poet?.toLowerCase().includes(poet.name.toLowerCase()) ||
            post.category === slug
        )
        .flatMap(post => post.poetry.map(p => ({
            ...p,
            poet: p.poet || post.poet || poet.name
        })));

    return (
        <div className="container">
            <Breadcrumbs items={[
                { label: 'Poets', href: '/poets/' },
                { label: poet.name }
            ]} />

            {/* Poet Header */}
            <header style={{ textAlign: 'center', padding: '2rem 0' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>📝</div>
                <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
                    {poet.name}
                </h1>
                <p style={{
                    fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
                    fontSize: '1.75rem',
                    direction: 'rtl',
                    marginTop: '0.5rem'
                }}>
                    {poet.nameUrdu}
                </p>
                {poet.birthYear && poet.deathYear && (
                    <p style={{ color: 'var(--foreground-muted)', marginTop: '0.5rem' }}>
                        {poet.birthYear} - {poet.deathYear}
                    </p>
                )}
            </header>

            {/* Ad Banner */}
            <AdSlot type="banner" />

            {/* Biography */}
            <section className="article-content" style={{ marginTop: '2rem' }}>
                <h2>Biography</h2>
                <div style={{ marginTop: '1rem', lineHeight: 1.8 }}>
                    {poet.bio.split('\n').map((paragraph, index) => (
                        <p key={index} style={{ marginBottom: '1rem' }}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </section>

            {/* Poetry Collection */}
            {poetryByPoet.length > 0 && (
                <section style={{ marginTop: '3rem' }}>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem' }}>
                        Poetry by {poet.name}
                    </h2>
                    <div className="poetry-grid">
                        {poetryByPoet.slice(0, 12).map((poetry, index) => (
                            <Fragment key={poetry.id}>
                                <PoetryCard key={poetry.id} poetry={poetry} />
                                {(index + 1) % 6 === 0 && index < poetryByPoet.length - 1 && (
                                    <AdSlot key={`ad-${index}`} type="card" slotId={ADS_CONFIG.slots.poetInline} />
                                )}
                            </Fragment>
                        ))}
                    </div>
                </section>
            )}

            {/* If no poetry, show placeholder */}
            {poetryByPoet.length === 0 && (
                <section style={{
                    textAlign: 'center',
                    padding: '3rem',
                    marginTop: '2rem',
                    background: 'var(--background-secondary)',
                    borderRadius: '12px'
                }}>
                    <p style={{ color: 'var(--foreground-muted)' }}>
                        Poetry collection for {poet.name} is coming soon.
                    </p>
                </section>
            )}
        </div>
    );
}
