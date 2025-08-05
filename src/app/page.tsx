'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 space-y-8 bg-gradient-to-br from-white via-gray-200 to-[#d6bfa9]">
      <h1 className="flex text-7xl text-stone-950">Welcome!</h1>
      <p className="text-stone-900 text-xl">What do you want to do:</p>
      <div>
        <Link href="/books">
          <Button variant="default" size="lg" className="w-sm h-12 bg-stone-800 mr-5">
            <span className="text-xl">Books</span>
          </Button>
        </Link>
        <Link href="/users">
          <Button variant="default" size="lg" className="w-sm h-12 bg-stone-800">
            <span className="text-xl">Users</span>
          </Button>
        </Link>
      </div>
    </main>
  )
}