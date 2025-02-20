import React from 'react'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'
import { checkUser } from '@/lib/checkUser'

const Header = async() => {

  await checkUser();
  return (
    <div className="top-0 fixed w-full bg-white/800 backdrop-blur-md z-50 border-b">
      <nav className='flex border-2 items-center px-6 justify-between'>
        <Link href="/">
          <Image
            alt='logo'
            src={"/logo.png"}
            width={200}
            height={100}
            className='object-scale-down '
          />

        </Link>
        <div className='flex items-center space-x-4 '>
          <SignedIn>
            <Link
              className='text-gray-600 flex items-center gap-2'
              href={"/dashboard"}>
              <Button variant="outline" >
                <LayoutDashboard size={18} />
                <span className='hidden md:inline'>Dashboard</span>
              </Button>
            </Link>
            <Link href={"/transaction/create"}>
              <Button>
                <PenBox size={18} />
                <span className='hidden md:inline'>Add Transaction</span>
              </Button>
            </Link>
          </SignedIn>
          <SignedOut>
            <Button variant="outline" >
              <SignInButton forceRedirectUrl='/dashboard' />
            </Button>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{
              elements: {
                avatarBox: "w-10 h-10"
              }
            }} />
          </SignedIn>
        </div>
      </nav>

    </div>
  )
}

export default Header
