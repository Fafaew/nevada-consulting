export function trackEvent(event, params = {}) {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...params });
}

// Fires scroll_depth (25/50/75/100) and engaged_view (15s) so GA4 has
// engagement signals beyond the default 10s timer. Returns a cleanup fn.
export function initEngagementTracking(page) {
  if (typeof window === 'undefined') return () => {};

  const thresholds = [25, 50, 75, 100];
  const fired = new Set();

  const onScroll = () => {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - window.innerHeight;
    if (scrollable <= 0) return;
    const pct = Math.min(100, (window.scrollY / scrollable) * 100);
    for (const t of thresholds) {
      if (pct >= t && !fired.has(t)) {
        fired.add(t);
        trackEvent('scroll_depth', { page, percent: t });
      }
    }
  };

  const engagedTimer = window.setTimeout(() => {
    trackEvent('engaged_view', { page });
  }, 15000);

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  return () => {
    window.removeEventListener('scroll', onScroll);
    window.clearTimeout(engagedTimer);
  };
}
