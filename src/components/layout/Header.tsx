'use client'

import Image from 'next/image'
import { Button } from '../ui/Button'

export function Header() {
  return (
    <header className="flex items-center justify-between border-b border-mauve-dark-alpha-6 bg-mauve-dark-1/50 px-4 py-3 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[1366px] items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.svg"
            alt="Cubos Movies"
            width={160}
            height={36}
            className="h-auto w-auto"
            priority
          />
          <span className="text-xl font-bold text-mauve-dark-12">Movies</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="secondary">
            <Image
              src="/sun.svg"
              alt="Toggle theme"
              width={24}
              height={24}
              className="text-mauve-dark-12"
            />
          </Button>

          <Button>Logout</Button>
        </div>
      </div>
    </header>
  )
}
