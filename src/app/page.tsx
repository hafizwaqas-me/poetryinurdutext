import { getAllCategories, getPostsByCategory, getFeaturedPosts } from '@/lib/content';
import { CategoryCard, AdSlot } from '@/components';
import { ADS_CONFIG } from '@/config/ads';
import Link from 'next/link';

export default function HomePage() {
  const categories = getAllCategories();
  const featuredPosts = getFeaturedPosts(6);

  // Get preview posts for each category
  const categoriesWithPreviews = categories.map(category => ({
    category,
    previewPosts: getPostsByCategory(category.slug).slice(0, 3)
  }));

  return (
    <>
      {/* Hero Section */}
      <section className="hero">
        <div className="container hero-content">
          <h1 className="hero-urdu">اردو شاعری کی دنیا میں خوش آمدید</h1>
          <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 800 }}>Poetry in Urdu Text: Urdu Text Poetry</h1>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '800px', margin: '0 auto', lineHeight: 1.6 }}>
            Discover the beauty and depth of <strong>poetry in Urdu</strong> on our platform! Explore <strong>Poetry in Urdu Text</strong> a rich collection of classical and contemporary Urdu poems, ghazals, and couplets from legendary poets like <Link href="/poets/allama-iqbal" style={{ color: 'inherit', textDecoration: 'underline' }}>Allama Iqbal</Link>, <Link href="/poets/mirza-ghalib" style={{ color: 'inherit', textDecoration: 'underline' }}>Mirza Ghalib</Link>, and <Link href="/poets/faiz-ahmed-faiz" style={{ color: 'inherit', textDecoration: 'underline' }}>Faiz Ahmed Faiz</Link>. Whether you&apos;re seeking inspiration, love verses, or spiritual reflections, our site offers carefully curated content for poetry lovers.
          </p>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="section" style={{ background: 'var(--background-secondary)' }}>
        <div className="container">
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Key features include in Poetry in Urdu Text:
          </h2>
          <ul style={{
            maxWidth: '600px',
            margin: '0 auto',
            listStyle: 'none',
            padding: 0,
            display: 'grid',
            gap: '1rem'
          }}>
            <li style={{ background: 'var(--card-bg)', padding: '1rem', borderRadius: '8px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)' }}>
              <strong>Daily Updates:</strong> New poetry added regularly.
            </li>
            <li style={{ background: 'var(--card-bg)', padding: '1rem', borderRadius: '8px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)' }}>
              <strong>Easy Navigation:</strong> Mobile-friendly design for seamless browsing.
            </li>
            <li style={{ background: 'var(--card-bg)', padding: '1rem', borderRadius: '8px', boxShadow: 'var(--card-shadow)', border: '1px solid var(--border)' }}>
              <strong>Search & Share:</strong> Find your favorite verses and share them on social media.
            </li>
          </ul>
        </div>
      </section>

      {/* Home Page Ad */}
      <div className="container" style={{ margin: '1.5rem auto 0', textAlign: 'center' }}>
        <AdSlot type="banner" slotId={ADS_CONFIG.slots.homeBanner} />
      </div>

      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            Explore Categories
          </h2>

          <div className="categories-grid">
            {categoriesWithPreviews.map(({ category, previewPosts }) => (
              <CategoryCard
                key={category.slug}
                category={category}
                previewPosts={previewPosts}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles Section - for ranked articles */}
      {featuredPosts.length > 0 && (
        <section className="section" style={{ background: 'var(--background-secondary)' }}>
          <div className="container">
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              📚 Featured Articles
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem'
            }}>
              {featuredPosts.slice(0, 6).map(post => (
                <Link
                  key={`${post.category}-${post.slug}`}
                  href={`/${post.slug}/`}
                  style={{
                    textDecoration: 'none',
                    display: 'block',
                    background: 'var(--card-bg)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '1px solid var(--border)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease'
                  }}
                >
                  <div style={{ padding: '1.5rem' }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--foreground)',
                      marginBottom: '0.5rem'
                    }}>
                      {post.title}
                    </h3>
                    {post.titleUrdu && (
                      <p style={{
                        fontFamily: "'Jameel Noori Nastaleeq', 'Noto Nastaliq Urdu', serif",
                        fontSize: '1.25rem',
                        direction: 'rtl',
                        color: 'var(--foreground)',
                        marginBottom: '0.75rem'
                      }}>
                        {post.titleUrdu}
                      </p>
                    )}
                    {post.description && (
                      <p style={{
                        fontSize: '0.9rem',
                        color: 'var(--foreground-muted)',
                        lineHeight: 1.5,
                        marginBottom: '0.75rem'
                      }}>
                        {post.description.slice(0, 100)}...
                      </p>
                    )}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: '1rem',
                      paddingTop: '0.75rem',
                      borderTop: '1px solid var(--border)'
                    }}>
                      <span style={{
                        fontSize: '0.85rem',
                        color: 'var(--foreground-muted)'
                      }}>
                        {post.poetry.length} poetry lines
                      </span>
                      <span style={{
                        fontSize: '0.9rem',
                        color: 'var(--primary)',
                        fontWeight: 500
                      }}>
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section for SEO */}
      <section className="section">
        <div className="container">
          <div className="article-content" style={{ textAlign: 'center' }}>
            <h2>About Poetry in Urdu Text</h2>
            <p style={{ marginTop: '1rem' }}>
              Poetry in Urdu Text is your destination for the finest collection of Urdu poetry.
              We bring you carefully curated content from legendary poets as well as contemporary voices.
              Whether you&apos;re looking for heart-touching sad poetry, romantic verses, or inspiring quotes,
              our collection has something for everyone.
            </p>
            <p style={{ marginTop: '1rem' }}>
              Our mission is to preserve and share the rich literary heritage of Urdu language
              and make it accessible to poetry lovers around the world. Browse through our categories,
              save your favorite poetry, and share them with your loved ones.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
