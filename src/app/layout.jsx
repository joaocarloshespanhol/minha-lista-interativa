import { magaluFont } from '../fonts/magaluFont'
import "./globals.css";

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
        <meta name="theme-color" content="#FFFFF" />
      </head>
      <body
        className={`${magaluFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
