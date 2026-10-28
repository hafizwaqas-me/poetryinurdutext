import { Metadata } from 'next';
import { getPageContent } from '@/lib/content';
import { Breadcrumbs } from '@/components';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with Poetry in Urdu Text. We would love to hear from you!',
};

export default async function ContactPage() {
    const page = await getPageContent('contact');

    const socialLinks = [
        { name: 'Facebook', icon: '📘', url: 'https://www.facebook.com/profile.php?id=100079937715234' },
        { name: 'Instagram', icon: '📸', url: 'https://instagram.com/urdusheroshayari' },
        { name: 'YouTube', icon: '▶️', url: 'https://youtube.com/@PoetryinUrduText' },
        { name: 'WhatsApp', icon: '💬', url: 'https://chat.whatsapp.com/D619Nl313TM2xD4T0lMtTy' },
        { name: 'Telegram', icon: '✈️', url: 'https://t.me/+CfEubc0Z4mZlM2E0' },
    ];

    return (
        <div className="container">
            <Breadcrumbs items={[{ label: 'Contact' }]} />

            <article className="article-content" style={{ padding: '2rem 0' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>
                    {page.title}
                </h1>

                <div dangerouslySetInnerHTML={{ __html: page.content }} />

                {/* Contact Options */}
                <section style={{ marginTop: '2rem' }}>
                    <h2>Ways to Reach Us</h2>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                        gap: '1rem',
                        marginTop: '1.5rem'
                    }}>
                        {socialLinks.map(social => (
                            <a
                                key={social.name}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.75rem',
                                    padding: '1rem',
                                    background: 'var(--card-bg)',
                                    borderRadius: '10px',
                                    textDecoration: 'none',
                                    color: 'var(--foreground)',
                                    border: '1px solid var(--border)',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                <span style={{ fontSize: '1.5rem' }}>{social.icon}</span>
                                <span style={{ fontWeight: 500 }}>{social.name}</span>
                            </a>
                        ))}
                    </div>
                </section>

                {/* Contribute */}
                <section style={{ marginTop: '2rem' }}>
                    <h2>Want to Contribute?</h2>
                    <p style={{ marginTop: '1rem' }}>
                        If you have poetry to share or want to contribute to our collection,
                        we would love to hear from you. Reach out to us through any of our
                        social media channels above.
                    </p>
                </section>

                {/* FAQ */}
                <section style={{ marginTop: '2rem' }}>
                    <h2>Frequently Asked Questions</h2>

                    <div style={{ marginTop: '1rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Can I use the poetry on my social media?</h3>
                        <p style={{ marginTop: '0.5rem', color: 'var(--foreground-muted)' }}>
                            Yes! You can share any poetry from our website. We encourage you to use the
                            share buttons or download the poetry as images to share on your social media.
                        </p>
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>How can I submit my own poetry?</h3>
                        <p style={{ marginTop: '0.5rem', color: 'var(--foreground-muted)' }}>
                            Contact us through our WhatsApp group or send us a message on any of our
                            social media channels with your poetry. Our team will review and add
                            quality submissions to our collection.
                        </p>
                    </div>
                </section>
            </article>
        </div>
    );
}
