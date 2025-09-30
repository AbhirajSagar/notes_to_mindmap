import { Fredoka } from "next/font/google";
import {Header,Footer} from "../../components/HeaderFooter";
import "./globals.css"

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["300","400","500","600","700"],
  display: "swap",
})

export const metadata = 
{
  title: "Notes To Mindmaps",
  description: "Convert notes to mindmaps",
  icons: {
    icon: "/favicon.svg"
  }
}

export default function RootLayout({ children }) 
{
  return (
    <html lang="en">
      <body className={`${fredoka.className} antialiased bg-gray-950`}>
          <Header />
          {children}
          <Footer />
      </body>
    </html>
  )
}
