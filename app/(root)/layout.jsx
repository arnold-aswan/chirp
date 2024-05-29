import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import Header from "@/components/Header";
import BottomBar from "@/components/shared/BottomBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chirp",
  description: "A nextJs social media application",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}>
      <html lang="en">
        <body
          className={`${inter.className} max-w-screen-2xl container mx-auto p-2`}>
          <Header />
          {children}
          <footer className="flex items-center justify-between border w-full fixed bottom-0 right-0 left-0 lg:hidden">
            <BottomBar />
          </footer>
        </body>
      </html>
    </ClerkProvider>
  );
}
