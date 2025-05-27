'use client'

import { Montserrat, Roboto } from 'next/font/google'

export const montserratExtrabold = Montserrat({
  subsets: ['latin'],
  weight: ['800'], // Extrabold
  variable: '--font-montserrat-extrabold',
})

export const montserratBold = Montserrat({
  subsets: ['latin'],
  weight: ['700'], // Bold
  variable: '--font-montserrat-bold',
})

export const montserratSemibold = Montserrat({
  subsets: ['latin'],
  weight: ['600'], // Semibold
  variable: '--font-montserrat-semibold',
})

export const montserratMedium = Montserrat({
  subsets: ['latin'],
  weight: ['500'], // Medium
  variable: '--font-montserrat-medium',
})

export const montserratRegular = Montserrat({
  subsets: ['latin'],
  weight: ['400'], // Regular
  variable: '--font-montserrat-regular',
})

export const robotoRegular = Roboto({
  subsets: ['latin'],
  weight: ['400'], // Regular
  variable: '--font-roboto-regular',
})

export const robotoBold = Roboto({
  subsets: ['latin'],
  weight: ['700'], // Bold
  variable: '--font-roboto-bold',
})

export function LoadFonts() {
  return (
    <style jsx global>
      {`
        :root {
          --font-montserrat-extrabold: ${montserratExtrabold.style.fontFamily};
          --font-montserrat-semibold: ${montserratSemibold.style.fontFamily};
          --font-montserrat-medium: ${montserratMedium.style.fontFamily};
          --font-montserrat-bold: ${montserratBold.style.fontFamily};
          --font-montserrat-regular: ${montserratRegular.style.fontFamily};
          --font-roboto-regular: ${robotoRegular.style.fontFamily};
          --font-roboto-bold: ${robotoBold.style.fontFamily};
        }
      `}
    </style>
  )
}
