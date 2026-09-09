import './globals.css';

export const metadata = {
  title: 'Agro-Vission | Admin Portal',
  description: 'Agro-Vission administration portal'
};

export default function RootLayout({ children }) {
  return <html lang="en"><body>{children}</body></html>;
}
