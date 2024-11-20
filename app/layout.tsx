import './globals.css';
import { DarkModeProvider } from './utils/DarkModeContext';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DarkModeProvider>
      <html lang='en'>
        <body>{children}</body>
      </html>
    </DarkModeProvider>
  );
}
