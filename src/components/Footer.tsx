import Link from 'next/link';
import { Category } from '@/lib/types';
import {
    FacebookIcon,
    InstagramIcon,
    YouTubeIcon,
    PinterestIcon,
    LinkedInIcon,
    WhatsAppIcon,
    TelegramIcon,
    TikTokIcon
} from './SocialIcons';

interface FooterProps {
    categories?: Category[];
}

export function Footer({ categories = [] }: FooterProps) {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { name: 'Facebook', component: <FacebookIcon className="w-5 h-5" />, url: 'https://www.facebook.com/people/Urdu-Shero-Shayari' },
        { name: 'Instagram', component: <InstagramIcon className="w-5 h-5" />, url: 'https://www.instagram.com/urdusheroshayari/' },
        { name: 'YouTube', component: <YouTubeIcon className="w-5 h-5" />, url: 'https://youtube.com/@PoetryinUrduText' },
        { name: 'Pinterest', component: <PinterestIcon className="w-5 h-5" />, url: 'https://www.pinterest.com/poetryinurdutext/' },
        { name: 'LinkedIn', component: <LinkedInIcon className="w-5 h-5" />, url: 'https://www.linkedin.com/company/urdu-shayari/' },
        { name: 'WhatsApp', component: <WhatsAppIcon className="w-5 h-5" />, url: 'https://chat.whatsapp.com/D619Nl313TM2xD4T0lMtTy' },
        { name: 'Telegram', component: <TelegramIcon className="w-5 h-5" />, url: 'https://t.me/+CfEubc0Z4mZlM2E0' },
        { name: 'TikTok', component: <TikTokIcon className="w-5 h-5" />, url: 'https://www.tiktok.com/@urdu.shero.shayari' },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    {/* About Section */}
                    <div className="footer-section">
                        <h4>Poetry in Urdu Text</h4>
                        <p style={{ color: 'var(--foreground-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
                            Discover the beauty of Urdu poetry. Explore classical and contemporary poems,
                            ghazals, and couplets from legendary poets.
                        </p>
                    </div>

                    {/* Categories */}
                    <div className="footer-section">
                        <h4>Categories</h4>
                        <ul className="footer-links">
                            {categories.map(cat => (
                                <li key={cat.slug}>
                                    <Link href={`/category/${cat.slug}/`}>{cat.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div className="footer-section">
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            <li><Link href="/poets/">Poets</Link></li>
                            <li><Link href="/blog/">Blog</Link></li>
                            <li><Link href="/about-us/">About Us</Link></li>
                            <li><Link href="/contact-us/">Contact</Link></li>
                            <li><Link href="/privacy-policy/">Privacy Policy</Link></li>
                            <li><Link href="/terms-conditions/">Terms of Service</Link></li>
                            <li><Link href="/cookies-policy/">Cookies Policy</Link></li>
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div className="footer-section">
                        <h4>Connect With Us</h4>
                        <div className="social-links">
                            {socialLinks.map(social => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    className="social-link"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title={social.name}
                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    {social.component}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <p>© {currentYear} poetryinurdutext.com - All rights reserved</p>
                </div>
            </div>
        </footer>
    );
}
