import { Metadata } from 'next';
import { getPageContent } from '@/lib/content';
import { Breadcrumbs } from '@/components';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about Poetry in Urdu Text - your destination for the finest collection of Urdu poetry from legendary and contemporary poets.',
};

export default async function AboutPage() {
    const page = await getPageContent('about');

    return (
        <div className="container">
            <Breadcrumbs items={[{ label: 'About Us' }]} />

            <article className="article-content" style={{ padding: '2rem 0' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>
                    {page.title}
                </h1>

                <div dangerouslySetInnerHTML={{ __html: page.content }} />

                {/* Additional Content */}
                <section style={{ marginTop: '2rem' }}>
                    <h2>Our Vision</h2>
                    <p style={{ marginTop: '1rem' }}>
                        At Poetry in Urdu Text, we believe that poetry is the language of the soul.
                        Our vision is to create the most comprehensive and accessible platform for
                        Urdu poetry lovers around the world. We aim to preserve the rich literary
                        heritage of Urdu language while embracing modern technology to share it
                        with new generations.
                    </p>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>What We Offer</h2>
                    <ul style={{ marginTop: '1rem', marginLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>Carefully curated collection of classical and contemporary Urdu poetry</li>
                        <li style={{ marginBottom: '0.5rem' }}>Poetry from legendary poets like Allama Iqbal, Mirza Ghalib, and Faiz Ahmed Faiz</li>
                        <li style={{ marginBottom: '0.5rem' }}>Easy sharing options for WhatsApp, Facebook, and Twitter</li>
                        <li style={{ marginBottom: '0.5rem' }}>Download poetry as beautiful images</li>
                        <li style={{ marginBottom: '0.5rem' }}>Dark and light mode for comfortable reading</li>
                        <li style={{ marginBottom: '0.5rem' }}>Mobile-friendly design for reading on the go</li>
                    </ul>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>Join Our Community</h2>
                    <p style={{ marginTop: '1rem' }}>
                        Follow us on social media to stay updated with new poetry additions and
                        connect with other poetry lovers. We regularly share beautiful poetry on
                        our social channels.
                    </p>
                </section>
            </article>
        </div>
    );
}
