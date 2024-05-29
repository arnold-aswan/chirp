import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";
import "../globals.css";
import { dark } from "@clerk/themes";

export const metadata = {
  title: "Chirp",
  description: "A nextJs social media application",
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}>
      <html lang="en">
        <body
          className={`${inter.className} flex items-center justify-center min-h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
