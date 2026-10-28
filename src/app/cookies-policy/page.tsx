import { Metadata } from 'next';
import { Breadcrumbs } from '@/components';

export const metadata: Metadata = {
    title: 'Cookies Policy',
    description: 'Cookies Policy for Poetry in Urdu Text - Learn how we use cookies on our website.',
};

export default function CookiesPolicyPage() {
    return (
        <div className="container">
            <Breadcrumbs items={[{ label: 'Cookies Policy' }]} />

            <article className="article-content" style={{ padding: '2rem 0' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>
                    Cookies Policy
                </h1>

                <p style={{ textAlign: 'center', color: 'var(--foreground-muted)', marginBottom: '2rem' }}>
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section>
                    <h2>What Are Cookies?</h2>
                    <p style={{ marginTop: '1rem' }}>
                        Cookies are small text files that are stored on your device when you visit a website.
                        They help websites remember your preferences and improve your browsing experience.
                    </p>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>How We Use Cookies</h2>
                    <p style={{ marginTop: '1rem' }}>
                        Poetry in Urdu Text uses cookies for the following purposes:
                    </p>
                    <ul style={{ marginTop: '1rem', marginLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Theme Preferences:</strong> To remember your dark/light mode preference</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Analytics:</strong> To understand how visitors use our website</li>
                        <li style={{ marginBottom: '0.5rem' }}><strong>Advertising:</strong> Google AdSense uses cookies to display relevant advertisements</li>
                    </ul>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>Types of Cookies We Use</h2>

                    <h3 style={{ marginTop: '1.5rem' }}>Essential Cookies</h3>
                    <p style={{ marginTop: '0.5rem' }}>
                        These cookies are necessary for the website to function properly. They enable basic
                        functions like theme preferences and cannot be disabled.
                    </p>

                    <h3 style={{ marginTop: '1.5rem' }}>Analytics Cookies</h3>
                    <p style={{ marginTop: '0.5rem' }}>
                        We use Google Analytics to understand how visitors interact with our website.
                        These cookies collect information anonymously.
                    </p>

                    <h3 style={{ marginTop: '1.5rem' }}>Advertising Cookies</h3>
                    <p style={{ marginTop: '0.5rem' }}>
                        Google AdSense uses cookies to personalize the advertisements shown on our website.
                        You can opt out of personalized advertising at{' '}
                        <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
                            Google Ads Settings
                        </a>.
                    </p>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>Managing Cookies</h2>
                    <p style={{ marginTop: '1rem' }}>
                        You can control and manage cookies through your browser settings. Please note that
                        disabling cookies may affect the functionality of our website.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        Most browsers allow you to:
                    </p>
                    <ul style={{ marginTop: '1rem', marginLeft: '1.5rem' }}>
                        <li style={{ marginBottom: '0.5rem' }}>View and delete cookies</li>
                        <li style={{ marginBottom: '0.5rem' }}>Block cookies from specific sites</li>
                        <li style={{ marginBottom: '0.5rem' }}>Block all third-party cookies</li>
                        <li style={{ marginBottom: '0.5rem' }}>Clear all cookies when you close your browser</li>
                    </ul>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>Contact Us</h2>
                    <p style={{ marginTop: '1rem' }}>
                        If you have any questions about our cookies policy, please contact us through
                        our <a href="/contact-us/" style={{ color: 'var(--primary)' }}>Contact page</a>.
                    </p>
                </section>
            </article>
        </div>
    );
}
