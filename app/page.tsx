import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to default locale
  redirect('/es-MX');
}

export const metadata = {
  title: 'StarkPays - Redirecting...',
  description: 'Redirecting to StarkPays',
};
