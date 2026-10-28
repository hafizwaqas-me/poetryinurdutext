import { Metadata } from 'next';
import Link from 'next/link';
import { getAllPoets } from '@/lib/content';
import { Breadcrumbs } from '@/components';

export const metadata: Metadata = {
    title: 'Famous Urdu Poets - Biographies & Poetry',
    description: 'Explore the lives and works of legendary Urdu poets including Allama Iqbal, Mirza Ghalib, Faiz Ahmed Faiz, and many more.',
    keywords: ['urdu poets', 'allama iqbal', 'mirza ghalib', 'faiz ahmed faiz', 'famous poets'],
};

export default function PoetsPage() {
    const poets = getAllPoets();

    return (
        <div className="container">
            <Breadcrumbs items={[{ label: 'Poets' }]} />

            <header style={{ textAlign: 'center', padding: '2rem 0' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700 }}>
                    Famous Urdu Poets
                </h1>
                <p style={{
                    fontFamily: "'Jameel Noori Nastaleeq', serif",
                    fontSize: '1.5rem',
                    direction: 'rtl',
                    marginTop: '0.5rem'
                }}>
                    مشہور اردو شعراء
                </p>
                <p style={{ color: 'var(--foreground-muted)', marginTop: '1rem', maxWidth: '600px', margin: '1rem auto' }}>
                    Discover the legendary poets who shaped Urdu literature. Read their biographies and explore their timeless poetry.
                </p>
            </header>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '1.5rem',
                marginTop: '2rem'
            }}>
                {poets.map(poet => (
                    <Link
                        key={poet.slug}
                        href={`/poets/${poet.slug}/`}
                        className="category-card"
                        style={{ textDecoration: 'none' }}
                    >
                        <div className="category-header">
                            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📝</div>
                            <h2 className="category-title">{poet.name}</h2>
                            <p style={{
                                fontFamily: "'Jameel Noori Nastaleeq', serif",
                                direction: 'rtl',
                                fontSize: '1.25rem'
                            }}>
                                {poet.nameUrdu}
                            </p>
                            {poet.birthYear && poet.deathYear && (
                                <p className="category-count">
                                    {poet.birthYear} - {poet.deathYear}
                                </p>
                            )}
                        </div>
                        <div className="category-preview" style={{ padding: '1rem 1.5rem' }}>
                            <p style={{
                                color: 'var(--foreground-muted)',
                                fontSize: '0.9rem',
                                lineHeight: 1.6
                            }}>
                                {poet.bio.substring(0, 150)}...
                            </p>
                        </div>
                        <div className="category-footer">
                            View Poetry & Biography →
                        </div>
                    </Link>
                ))}
            </div>

            {/* SEO Content */}
            <section className="article-content" style={{ marginTop: '3rem' }}>
                <h2>About Urdu Poetry and Poets</h2>
                <p style={{ marginTop: '1rem' }}>
                    Urdu poetry has a rich history spanning several centuries. From the classical masters
                    like Mirza Ghalib and Allama Iqbal to contemporary voices, Urdu poets have created
                    timeless works that continue to inspire millions. The ghazal, nazm, and rubai are
                    popular forms of Urdu poetry that express love, philosophy, and the human condition.
                </p>
                <p style={{ marginTop: '1rem' }}>
                    Our collection features the works of renowned poets who have contributed to the
                    rich literary heritage of Urdu language. Explore their biographies and immerse
                    yourself in their beautiful poetry.
                </p>
            </section>
        </div>
    );
}
