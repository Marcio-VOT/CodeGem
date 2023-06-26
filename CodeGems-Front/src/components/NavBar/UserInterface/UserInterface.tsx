'use client'
import Dropdown from './Dropdown'
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'
import { UserContext } from '@/contexts/userContext'
import { MdKeyboardDoubleArrowDown } from 'react-icons/md'

export function UserInterface() {
  const { session, loginStatus } = useContext(UserContext)
  const userIcon = session?.user?.image as string
  const userName = session?.user?.name as string
  const userEmail = session?.user?.email as string
  const [isOpen, setIsOpen] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
    /* eslint-disable-next-line */
  }, [])

  return (
    <div
      className="relative z-10 h-10 w-10 rounded-full bg-gray-800 text-gray-200"
      ref={dropdownRef}
    >
      {loginStatus ? (
        <Image
          src={userIcon}
          width={40}
          height={40}
          alt="User Icon"
          className="h-10 w-10 cursor-pointer rounded-full"
          priority
          onClick={() => setIsOpen(!isOpen)}
        />
      ) : (
        <div
          className="flex h-full w-full cursor-pointer justify-center pt-1 align-middle text-2xl font-bold"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <MdKeyboardDoubleArrowDown size={38} /> : `</>`}
        </div>
      )}
      {isOpen && (
        <Dropdown
          userIcon={userIcon}
          userName={userName}
          userEmail={userEmail}
          loginStatus={loginStatus}
        />
      )}
    </div>
  )
}
