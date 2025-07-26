import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='bg-gray-200 flex justify-between items-center p-4'>
        <div className='Logo flex items-center gap-2'>
            <div>
                <Image src="/Finance_Uchiha_icon.png" alt="Logo" width={30} height={30} />
            </div>
            <div className='text-lg text-zinc-900 font-semibold'>
            <Link href={"/"}>
                <p>Finance Uchiha</p>
            </Link>
            </div>
        </div>
        <div className="options flex items-center gap-2">
            <Button asChild>
                <Link href={"/sign-in"}>Login</Link> 
                </Button>
            <Button asChild>
                <Link href={"/sign-up"}>Sign Up</Link>
            </Button>
        </div>
    </nav>
  )
}

export default Navbar