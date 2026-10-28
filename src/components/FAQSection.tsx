'use client';

import { useState } from 'react';

interface FAQ {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQ[];
    title?: string;
}

export function FAQSection({ faqs, title = "Frequently Asked Questions" }: FAQSectionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    if (!faqs || faqs.length === 0) return null;

    return (
        <section className="faq-section" style={{ marginTop: '3rem' }}>
            <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                marginBottom: '1.5rem',
                textAlign: 'center'
            }}>
                {title}
            </h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        style={{
                            marginBottom: '0.75rem',
                            border: '1px solid var(--border)',
                            borderRadius: '10px',
                            overflow: 'hidden',
                            background: 'var(--card-bg)'
                        }}
                    >
                        <button
                            onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            style={{
                                width: '100%',
                                padding: '1rem 1.25rem',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                background: 'transparent',
                                border: 'none',
                                cursor: 'pointer',
                                textAlign: 'left',
                                color: 'var(--foreground)',
                                fontWeight: 600,
                                fontSize: '1rem'
                            }}
                        >
                            <span>{faq.question}</span>
                            <span style={{
                                transform: openIndex === index ? 'rotate(180deg)' : 'rotate(0deg)',
                                transition: 'transform 0.2s ease'
                            }}>
                                ▼
                            </span>
                        </button>
                        {openIndex === index && (
                            <div style={{
                                padding: '0 1.25rem 1rem',
                                color: 'var(--foreground-muted)',
                                lineHeight: 1.7,
                                borderTop: '1px solid var(--border)'
                            }}>
                                <p style={{ marginTop: '1rem' }}>{faq.answer}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
