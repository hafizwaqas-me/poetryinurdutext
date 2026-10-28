/**
 * Google AdSense Configuration
 * 
 * Instructions:
 * 1. Replace 'ca-pub-XXXXXXXXXXXXXXXX' with your Google AdSense Publisher Client ID
 *    (found in your AdSense account -> Account -> Settings -> Account information)
 * 2. Replace each 'XXXXXXXXXX' with the Ad Unit Slot ID you create in AdSense:
 *    (AdSense -> Ads -> By ad unit -> Display ads)
 * 
 * Alternatively, you can define these in a `.env.local` file without modifying this file:
 * NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-1234567890123456
 * NEXT_PUBLIC_AD_SLOT_HOME=1234567890
 * NEXT_PUBLIC_AD_SLOT_POST_BANNER=2345678901
 * NEXT_PUBLIC_AD_SLOT_POST_INLINE=3456789012
 * NEXT_PUBLIC_AD_SLOT_CATEGORY_INLINE=4567890123
 * NEXT_PUBLIC_AD_SLOT_POET_INLINE=5678901234
 */

export const ADS_CONFIG = {
  // Your Google AdSense Publisher ID (e.g., 'ca-pub-1234567890123456')
  client: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-XXXXXXXXXXXXXXXX',

  slots: {
    // Ad on Home Page (Banner between Hero/Features and Categories)
    homeBanner: process.env.NEXT_PUBLIC_AD_SLOT_HOME || 'XXXXXXXXXX',

    // Top banner ad inside post / poetry detail pages
    postBanner: process.env.NEXT_PUBLIC_AD_SLOT_POST_BANNER || 'XXXXXXXXXX',

    // Inline ad between poetry cards inside post pages
    postInline: process.env.NEXT_PUBLIC_AD_SLOT_POST_INLINE || 'XXXXXXXXXX',

    // Inline ad between poetry cards on category listing pages
    categoryInline: process.env.NEXT_PUBLIC_AD_SLOT_CATEGORY_INLINE || 'XXXXXXXXXX',

    // Inline ad between poetry cards on poet profile pages
    poetInline: process.env.NEXT_PUBLIC_AD_SLOT_POET_INLINE || 'XXXXXXXXXX',
  },
};
