'use client'

import { Montserrat, Poppins } from 'next/font/google'

// example
export const montserratExtrabold = Montserrat({
  subsets: ['latin'],
  weight: ['800'], // Extrabold
  variable: '--font-montserrat-extrabold',
})

export function LoadFonts() {
  return (
    <style jsx global>
      {`
        :root {
          --font-montserrat-extrabold: ${montserratExtrabold.style.fontFamily};
        }
      `}
    </style>
  )
}
