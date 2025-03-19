import '@/styles/globals.scss';
import { Work_Sans } from 'next/font/google';
import { Metadata } from 'next';

const font = Work_Sans({
  weight: "300",
  style: 'normal',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'OA Robotics',
  description: 'Oxford Academy Robotics Testing Platform',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}