import { Inter } from "next/font/google";
import "../globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

import Header from "@/components/shared/Header";
import BottomBar from "@/components/shared/BottomBar";
import SideBar from "@/components/shared/SideBar";
import RightSidebar from "@/components/shared/RightSidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Chirp",
  description: "A nextJs social media application",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-black max-w-[1440px] mx-auto `}>
          <Header />

          <main className="flex flex-row  ">
            <SideBar />

            <section className="flex-1">
              <div className="bg-dark-blue px-4 mx-auto pt-8 h-full">
                {children}
              </div>
            </section>

            <RightSidebar />
          </main>

          <BottomBar />
        </body>
      </html>
    </ClerkProvider>
  );
}
