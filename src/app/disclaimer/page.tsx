import { Metadata } from 'next';
import { Breadcrumbs } from '@/components';

export const metadata: Metadata = {
    title: 'Disclaimer',
    description: 'Disclaimer for Poetry in Urdu Text - Read about our content policies and limitations.',
};

export default function DisclaimerPage() {
    return (
        <div className="container">
            <Breadcrumbs items={[{ label: 'Disclaimer' }]} />

            <article className="article-content" style={{ padding: '2rem 0' }}>
                <h1 style={{ fontSize: '2rem', fontWeight: 700, textAlign: 'center', marginBottom: '2rem' }}>
                    Disclaimer
                </h1>

                <p style={{ textAlign: 'center', color: 'var(--foreground-muted)', marginBottom: '2rem' }}>
                    Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>

                <section>
                    <h2>General Information</h2>
                    <p style={{ marginTop: '1rem' }}>
                        The information provided by <strong>Poetry in Urdu Text</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;)
                        on <strong>poetryinurdutext.com</strong> (the &quot;Site&quot;) is for general informational and entertainment purposes only.
                        All information on the Site is provided in good faith, however we make no representation or warranty of any kind,
                        express or implied, regarding the accuracy, adequacy, validity, reliability, availability, or completeness of any
                        information on the Site.
                    </p>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>External Links Disclaimer</h2>
                    <p style={{ marginTop: '1rem' }}>
                        The Site may contain (or you may be sent through the Site) links to other websites or content belonging to or
                        originating from third parties or links to websites and features in banners or other advertising. Such external
                        links are not investigated, monitored, or checked for accuracy, adequacy, validity, reliability, availability,
                        or completeness by us.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        We do not warrant, endorse, guarantee, or assume responsibility for the accuracy or reliability of any information
                        offered by third-party websites linked through the Site or any website or feature linked in any banner or other
                        advertising. We will not be a party to or in any way be responsible for monitoring any transaction between you
                        and third-party providers of products or services.
                    </p>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>Fair Use Disclaimer</h2>
                    <p style={{ marginTop: '1rem' }}>
                        The poetry, images, and content posted on this website may contain copyrighted material the use of which has not
                        always been specifically authorized by the copyright owner. We are making such material available for the purpose
                        of criticism, comment, news reporting, teaching, scholarship, or research.
                    </p>
                    <p style={{ marginTop: '1rem' }}>
                        We believe this constitutes a &quot;fair use&quot; of any such copyrighted material as provided for in section 107 of
                        the Copyright Act.
                    </p>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>Content Disclaimer</h2>
                    <p style={{ marginTop: '1rem' }}>
                        The views and opinions expressed in the poetry and articles on this Site are those of the authors/poets and do not
                        necessarily reflect the official policy or position of <strong>Poetry in Urdu Text</strong>. Any content provided by our
                        bloggers or authors are of their opinion and are not intended to malign any religion, ethnic group, club, organization,
                        company, individual or anyone or anything.
                    </p>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>Consent</h2>
                    <p style={{ marginTop: '1rem' }}>
                        By using our website, you hereby consent to our disclaimer and agree to its terms.
                    </p>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>Update</h2>
                    <p style={{ marginTop: '1rem' }}>
                        Should we update, amend or make any changes to this document, those changes will be prominently posted here.
                    </p>
                </section>

                <section style={{ marginTop: '2rem' }}>
                    <h2>Contact Us</h2>
                    <p style={{ marginTop: '1rem' }}>
                        If you require any more information or have any questions about our site&#39;s disclaimer, please feel free
                        to contact us by visiting our Contact page.
                    </p>
                </section>
            </article>
        </div>
    );
}
