'use client';
import Link from "next/link";
import {HomeIcon, SearchIcon, CameraIcon, LayoutGridIcon, UserIcon, UploadIcon} from "lucide-react";
import { usePathname } from "next/navigation";
export default function MobileNav(){
  const path = usePathname()
  const isSearchPage = path.includes('/search');
  const isCreatePage = path.includes('/create');
  const isBrowsePage = path.includes('/browse');
  const isProfilePage = path.includes('/profile');
  const isMainPage = !isSearchPage && !isCreatePage && !isBrowsePage && !isProfilePage
    return(
    <div className="block md:hidden fixed bottom-0 left-0 right-0">
      <div className="flex *:flex *:items-center text-gray-600 dark:text-gray-300">
        <div
          className="pl-2 bg-white dark:bg-black rounded-t-xl w-full relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
          <Link href="/"  className={` ${isMainPage ? 'text-ig-red dark:text-ig-orange' : ''} `}>
            <HomeIcon/>
          </Link>
          <Link href="/search"  className={` ${isSearchPage ? 'text-ig-red dark:text-ig-orange' : ''}`}>
            <SearchIcon/>
          </Link>
        </div>
        <div className="size-14 relative -top-4 justify-center w-[140px]">
          <div
            className="absolute bg-blue-500 bg-clip-text border-white dark:border-black border-t-transparent dark:border-t-transparent border-l-transparent dark:border-l-transparent border-[50px]  rounded-full rotate-45">
            <div className="border-4 size-15 border-transparent">
              <Link
                href="/create"
                className="-rotate-45 bg-gradient-to-tr from-ig-orange to-ig-red to-70% size-12 flex items-center justify-center text-white rounded-full">
                {isCreatePage ? (
                   <UploadIcon />
                ):(
                  <CameraIcon/>
                )}
               
              </Link>
            </div>
          </div>
        </div>
        <div
          className="pr-2 w-full bg-white dark:bg-black rounded-t-xl relative z-10 *:size-12 *:flex *:items-center *:justify-center justify-around">
          <Link href="/browse" className={` ${isBrowsePage ? 'text-ig-red dark:text-ig-orange' : ''}`}>
            <LayoutGridIcon/>
          </Link>
          <Link href="/profile"  className={` ${isProfilePage ? 'text-ig-red dark:text-ig-orange' : ''}`}>
            <UserIcon/>
          </Link>
        </div>
      </div>
    </div>    

    )
}
