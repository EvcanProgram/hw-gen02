import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav";
import styles from "./page.module.css"

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative`}>
        <Navbar />
        
        <div className="absolute inset-0 z-[-1] flex justify-between">
          <div className={`${styles.gradientRed} mt-16`}></div>
          <div className={`${styles.gradientOrange} mt-16`}></div>
          <div className={`${styles.gradientBlue} mt-16`}></div>
        </div>

        <div className="relative z-10">
          {children}
        </div>
      </body>
    </html>
  );
}
