"use client"

import { UserButton } from '@clerk/nextjs'
import { LayoutDashboard } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const UserDropdown = () => {

  const router = useRouter()

  return (
    <UserButton showName appearance={{
      elements: {
        userButtonOuterIdentifier: {
          color: 'black',
        }
      }
    }} >
      <UserButton.MenuItems>
        <UserButton.Action label='Dashboard' labelIcon={<LayoutDashboard size={16} />}
        onClick={() => {
          router.push('/dashboard')
        }} />
      </UserButton.MenuItems>
    </UserButton>
  )
}

export default UserDropdown