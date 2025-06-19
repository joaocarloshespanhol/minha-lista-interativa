import { magaluFont } from '../fonts/magaluFont'
import "./globals.css";
import Script from 'next/script';

export const metadata = {
  title: "Minha Lista de Tarefas Interativas",
  description: "Prova técnica Frontend - Consórcio Magalu",
    icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/images/consorcio-magalu-small.png" />
        <meta name="theme-color" content="#0086FF" />
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-67SLLC5LZJ"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-67SLLC5LZJ');
            `,
          }}
        />
      </head>
      <body
        className={`${magaluFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
