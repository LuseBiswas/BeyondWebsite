// Google Analytics utility functions

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID;

// Check if GA is enabled
export const isGAEnabled = () => {
  return typeof window !== 'undefined' && GA_TRACKING_ID && window.gtag;
};

// Track pageviews
export const pageview = (url) => {
  if (isGAEnabled()) {
    window.gtag('config', GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Track custom events
export const event = ({ action, category, label, value }) => {
  if (isGAEnabled()) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Predefined event tracking functions
export const trackBookCall = (location) => {
  event({
    action: 'book_call_click',
    category: 'engagement',
    label: location,
  });
};

export const trackSeePricing = (location) => {
  event({
    action: 'see_pricing_click',
    category: 'engagement',
    label: location,
  });
};

export const trackFAQExpand = (question) => {
  event({
    action: 'faq_expand',
    category: 'engagement',
    label: question,
  });
};

