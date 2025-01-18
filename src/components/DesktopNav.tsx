'use client';
import Link from "next/link";
import logo from "../app/insta.png";
import Image from "next/image";
import { CameraIcon, HomeIcon, LayoutGridIcon, SearchIcon, UserIcon } from "lucide-react";
import { usePathname } from "next/navigation";
export default function DesctopNav(){
  const path = usePathname()
  const isSearchPage = path.includes('/search');
  const isCreatePage = path.includes('/create');
  const isBrowsePage = path.includes('/browse');
  const isProfilePage = path.includes('/profile');
  const isMainPage = !isSearchPage && !isCreatePage && !isBrowsePage && !isProfilePage
  return(
  <div className="hidden lg:block shadow-md shadow-gray-700 px-4  w-48 ">
              <div className="top-0 sticky">
                <Image className="w-[120px] mx-auto dark:invert pt-4" src={logo} alt="image"/>
                <div className="ml-1 inline-flex flex-col gap-6 mt-8 *:flex *:items-center *:gap-2">
                  <Link href={'/'} className={` ${isMainPage ? 'text-ig-red dark:text-ig-orange' : ''}`}>
                    <HomeIcon />
                    Home
                  </Link>
                  <Link href={'/search'} className={` ${isSearchPage ? 'text-ig-red dark:text-ig-orange' : ''}`}>
                    <SearchIcon />
                    Search
                  </Link>
                  <Link href={'/browse'} className={` ${isBrowsePage ? 'text-ig-red dark:text-ig-orange' : ''}`}>
                    <LayoutGridIcon />
                    Browse
                  </Link>
                <Link href={'/profile'} className={` ${isProfilePage ? 'text-ig-red dark:text-ig-orange' : ''}`}>
                  <UserIcon />
                  Profile
                </Link>
                  <Link href={'/create'} className={` ${isCreatePage ? 'text-ig-red dark:text-ig-orange' : ''}`}>
                    <CameraIcon />
                    Create
                  </Link>
                </div>
              </div>
            </div>

  )
}
