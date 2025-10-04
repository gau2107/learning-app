export const BASEURL = typeof window !== 'undefined'
  ? `${window.location.protocol}//${window.location.hostname}:3000`
  : process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";