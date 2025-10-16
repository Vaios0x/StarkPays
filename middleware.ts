import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // A list of all locales that are supported
  locales: ['en', 'es-MX'],

  // Used when no locale matches
  defaultLocale: 'es-MX',

  // Always use the default locale for the root path
  localePrefix: 'as-needed'
});

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(es-MX|en)/:path*', '/dashboard/:path*', '/send/:path*', '/family-vault/:path*']
};