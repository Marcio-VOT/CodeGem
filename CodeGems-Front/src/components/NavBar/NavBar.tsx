import Link from 'next/link'
import { UserInterface } from './UserInterface/UserInterface'
export function NavBar() {
  const logo = '</>CodeGem'
  return (
    <>
      <div className="flex h-14 items-center justify-between bg-search-800 px-4 shadow-md">
        {/* logo */}
        <div className="hover:fill-white hover:text-white flex min-w-[200px] cursor-pointer fill-gray-200 font-title text-3xl">
          <Link href={'/'}>{logo}</Link>
        </div>
        {/* inside search bar */}
        <input
          className="hover:placeholder-white focus:placeholder-white hidden h-8 w-2/4 min-w-[300px] rounded-full border-2 border-white-100 border-opacity-10 bg-transparent px-2 font-sans text-sm text-gray-500 placeholder-gray-200 outline-0 backdrop-blur-sm sm:flex"
          placeholder="Search"
          type="text"
        ></input>
        {/* User image // login/logout dropdown */}
        <UserInterface />
        {/* <div className="h-12 w-12 animate-pulse cursor-pointer rounded-full bg-mineral-gray-light"></div> */}
      </div>
      {/* outside search bar */}
      <div className="mt-2 flex w-full  items-center justify-center sm:hidden">
        <input
          type="text"
          placeholder="Search"
          className="hover:placeholder-white focus:placeholder-white h-8 w-11/12  min-w-[300px] rounded-full border-2 border-white-100 border-opacity-10 bg-transparent px-2 font-sans text-sm text-gray-500 placeholder-gray-200 outline-0 sm:hidden"
        />
      </div>
    </>
  )
}
