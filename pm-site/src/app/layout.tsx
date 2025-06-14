import "./globals.css";
import StoreProvider from "./storeProvider";
import DashboardWrapper from "./dashboardWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <StoreProvider>
          <DashboardWrapper>{children}</DashboardWrapper>
        </StoreProvider>
      </body>
    </html>
  );
}
