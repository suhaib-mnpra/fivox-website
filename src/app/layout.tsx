import type { Metadata } from 'next';
import { Space_Grotesk, Fira_Code } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const firaCode = Fira_Code({ subsets: ['latin'], variable: '--font-fira' });

export const metadata: Metadata = {
  title: 'Fivox | Command Center',
  description: 'We Engineer Velocity. Cyber-Premium Tech Squad.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${firaCode.variable}`}>
      <body className="font-sans antialiased selection:bg-cyber-magenta selection:text-white">
        {children}
      </body>
    </html>
  );
}
