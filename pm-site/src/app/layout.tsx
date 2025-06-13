import Header from "@/components/Header";
import "./globals.css";
import Sidebar from "@/components/SideBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Header />
      <Sidebar />
      <body>{children}</body>
    </html>
  );
}
