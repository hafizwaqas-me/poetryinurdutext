'use client';

import { useState, useRef } from 'react';
import { Poetry, CardBackground, CARD_BACKGROUNDS } from '@/lib/types';

interface PoetryCardProps {
    poetry: Poetry;
    showPoet?: boolean;
}

export function PoetryCard({ poetry, showPoet = true }: PoetryCardProps) {
    const [background, setBackground] = useState<CardBackground>('cream');
    const [isShareOpen, setIsShareOpen] = useState(false);
    const [toast, setToast] = useState<string | null>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    const showToast = (message: string) => {
        setToast(message);
        setTimeout(() => setToast(null), 2000);
    };

    const handleCopy = async () => {
        try {
            const text = `${poetry.text}${poetry.poet ? `\n- ${poetry.poet}` : ''}\n\n📜 poetryinurdutext.com`;
            await navigator.clipboard.writeText(text);
            showToast('Copied to clipboard! ✓');
        } catch (err) {
            showToast('Failed to copy');
        }
    };

    const handleDownload = async () => {
        if (!contentRef.current) return;

        try {
            // Dynamic import of html2canvas
            const html2canvas = (await import('html2canvas')).default;

            // Temporarily add watermark
            const watermark = document.createElement('div');
            watermark.style.cssText = `
        text-align: center;
        padding: 12px;
        font-size: 14px;
        opacity: 0.7;
        border-top: 1px solid rgba(0,0,0,0.1);
        margin-top: 12px;
      `;
            watermark.textContent = '📜 poetryinurdutext.com';
            contentRef.current.appendChild(watermark);

            const canvas = await html2canvas(contentRef.current, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
            });

            // Remove watermark after capture
            contentRef.current.removeChild(watermark);

            // Download
            const link = document.createElement('a');
            link.download = `poetry-${poetry.id}.png`;
            link.href = canvas.toDataURL('image/png');
            link.click();

            showToast('Downloaded! ✓');
        } catch (err) {
            console.error('Download error:', err);
            showToast('Download failed');
        }
    };

    const handleShare = (platform: string) => {
        const text = `${poetry.text}${poetry.poet ? `\n- ${poetry.poet}` : ''}`;
        const url = window.location.href;
        const encodedText = encodeURIComponent(text);
        const encodedUrl = encodeURIComponent(url);

        let shareUrl = '';
        switch (platform) {
            case 'whatsapp':
                shareUrl = `https://wa.me/?text=${encodedText}%0A%0A${encodedUrl}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?quote=${encodedText}&u=${encodedUrl}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
                break;
            case 'copy':
                navigator.clipboard.writeText(`${text}\n\n${url}`);
                showToast('Link copied! ✓');
                setIsShareOpen(false);
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
        setIsShareOpen(false);
    };

    return (
        <div className="poetry-card" ref={cardRef}>
            <div
                ref={contentRef}
                className={`poetry-content poetry-bg-${background}`}
            >
                <p className="poetry-text">{poetry.text}</p>
                {showPoet && poetry.poet && (
                    <p className="poetry-poet">— {poetry.poet}</p>
                )}
            </div>

            <div className="poetry-actions">
                {/* Color Options */}
                <div className="color-options">
                    {CARD_BACKGROUNDS.map((bg) => (
                        <button
                            key={bg}
                            className={`color-btn ${bg} ${background === bg ? 'active' : ''}`}
                            onClick={() => setBackground(bg)}
                            aria-label={`Set ${bg} background`}
                            title={bg.charAt(0).toUpperCase() + bg.slice(1)}
                        />
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="action-buttons">
                    <button className="action-btn" onClick={handleCopy} title="Copy">
                        📋 Copy
                    </button>

                    <button className="action-btn" onClick={handleDownload} title="Download as image">
                        ⬇️ Save
                    </button>

                    <div className="share-dropdown">
                        <button
                            className="action-btn"
                            onClick={() => setIsShareOpen(!isShareOpen)}
                            title="Share"
                        >
                            📤 Share
                        </button>

                        <div className={`share-menu ${isShareOpen ? 'open' : ''}`}>
                            <button
                                className="share-menu-item whatsapp"
                                onClick={() => handleShare('whatsapp')}
                            >
                                💬 WhatsApp
                            </button>
                            <button
                                className="share-menu-item facebook"
                                onClick={() => handleShare('facebook')}
                            >
                                📘 Facebook
                            </button>
                            <button
                                className="share-menu-item twitter"
                                onClick={() => handleShare('twitter')}
                            >
                                🐦 Twitter
                            </button>
                            <button
                                className="share-menu-item"
                                onClick={() => handleShare('copy')}
                            >
                                🔗 Copy Link
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Toast Notification */}
            {toast && <div className={`toast show`}>{toast}</div>}
        </div>
    );
}
