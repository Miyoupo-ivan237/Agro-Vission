import './globals.css';

export const metadata = {
  title: 'Agro-Vission | Admin & AI Operations Portal',
  description: 'AI-Driven Agronomy, Diagnostics, and Farmer Management Platform',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
