export const getBaseUrl = () => {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }

  // For server-side rendering, construct the full URL
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const host = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_SITE_URL || 'localhost:3000';

  return `${protocol}://${host}`;
};

export const BASEURL = getBaseUrl();