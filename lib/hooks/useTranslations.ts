import { useTranslations as useNextIntlTranslations } from 'next-intl';

export function useTranslations() {
  const t = useNextIntlTranslations();
  
  return {
    t,
    // Helper functions for common patterns
    formatCurrency: (amount: number, currency: string = 'USD') => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
      }).format(amount);
    },
    formatDate: (date: Date) => {
      return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(date);
    },
    formatTime: (date: Date) => {
      return new Intl.DateTimeFormat('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    },
  };
}
