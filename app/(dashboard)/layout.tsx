"use client"
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import Navbar from '@/components/sharedComponents/Navbar'
import LeftSidebar from '@/components/sharedComponents/LeftSideBar'
import { MyProvider } from '@/context/MyContext'

const inter = Inter({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <main className="flex flex-row  font-roboto ">
      <section className="grow">
      <LeftSidebar/>
      </section>
      <section className="navbarOverviewContainer grow flex flex-col">
        
        <div className="">
        <MyProvider>
          {/* <Overview/> */}{children}
        </MyProvider>
        </div>
      </section>
    </main>
        {/* {children} */}
        
      </body>
    </html>
  )
}
