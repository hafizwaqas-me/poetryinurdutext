'use client';

import Link from 'next/link';
import { useState } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Category } from '@/lib/types';

interface HeaderProps {
    categories?: Category[];
}

export function Header({ categories = [] }: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const openSearch = () => {
        setIsSearchOpen(true);
        // Dispatch custom event to open search modal
        window.dispatchEvent(new CustomEvent('openSearch'));
    };

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    {/* Logo */}
                    <Link href="/" className="logo">
                        <span className="logo-icon">📜</span>
                        <span>Poetry in Urdu</span>
                    </Link>

                    {/* Navigation */}
                    <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
                        <Link href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Home
                        </Link>

                        {/* Categories Dropdown - simplified for static */}
                        {categories.slice(0, 4).map(cat => (
                            <Link
                                key={cat.slug}
                                href={`/category/${cat.slug}/`}
                                className="nav-link"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {cat.name}
                            </Link>
                        ))}

                        <Link href="/poets/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Poets
                        </Link>

                        <Link href="/blog/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
                            Blog
                        </Link>
                    </nav>

                    {/* Ad Slot in Header */}
                    <div className="ad-slot" style={{
                        padding: '0.5rem 1rem',
                        fontSize: '0.7rem',
                        borderRadius: '6px',
                        display: 'none' // Hidden by default, show when AdSense is configured
                    }}>
                        Ad Space
                    </div>

                    {/* Header Actions */}
                    <div className="header-actions">
                        <button
                            className="icon-btn"
                            onClick={openSearch}
                            aria-label="Search"
                            title="Search poetry"
                        >
                            🔍
                        </button>

                        <ThemeToggle />

                        <button
                            className="icon-btn mobile-menu-btn"
                            onClick={toggleMenu}
                            aria-label="Menu"
                            title="Toggle menu"
                        >
                            {isMenuOpen ? '✕' : '☰'}
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
}
