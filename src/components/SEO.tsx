import { useEffect } from 'react';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterImage?: string;
  canonical?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Go Online Now - Create Your Website Today',
  description = 'Build professional websites instantly with Go Online Now. Create stunning web presences with our easy-to-use website builder. Get online today!',
  keywords = 'website builder, web design, create website, online presence, professional websites',
  ogImage = '/og-image.jpg',
  ogUrl = 'https://yourpageonline.netlify.app',
  twitterImage = '/og-image.jpg',
  canonical = 'https://yourpageonline.netlify.app',
}) => {
  useEffect(() => {
    document.title = title;

    const updateMeta = (name: string, content: string, property?: boolean) => {
      const selector = property
        ? `meta[property="${name}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', name);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    updateMeta('description', description);
    updateMeta('keywords', keywords);

    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:url', ogUrl, true);

    updateMeta('twitter:title', title, true);
    updateMeta('twitter:description', description, true);
    updateMeta('twitter:image', twitterImage, true);

    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);
  }, [title, description, keywords, ogImage, ogUrl, twitterImage, canonical]);

  return null;
};

export default SEO;
