import { magaluFont } from '../fonts/magaluFont'
import "./globals.css";

export const metadata = {
  title: "Minha Lista de Tarefas Interativas",
  description: "Prova técnica Frontend - Consórcio Magalu",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt">
      <body
        className={`${magaluFont.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
