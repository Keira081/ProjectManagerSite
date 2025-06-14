import Header from "@/components/Header";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import StoreProvider from "./redux";
import DashboardWrapper from "./dashboardWrapper";
//import { useAppSelector } from "@/states/hooks";

//const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StoreProvider>
      <html lang="en">
        <body>
          <DashboardWrapper>{children}</DashboardWrapper>
        </body>
      </html>
    </StoreProvider>
  );
}
