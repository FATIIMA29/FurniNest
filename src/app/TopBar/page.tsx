'use client';
import Link from "next/link";

import { FaEnvelope, FaPhoneAlt, FaShoppingCart } from 'react-icons/fa'; // Import necessary icons
import { useState } from 'react'; // To manage dropdown state
import { ClerkLoaded,
  SignedIn,
  SignInButton,
  UserButton,
  useUser,
 } from "@clerk/nextjs";

 
const TopBar = () => {
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const [currencyDropdown, setCurrencyDropdown] = useState(false);

const {user} = useUser();
  return (
    <div className="bg-violet-700 text-white py-2 text-sm">
      {/* TopBar Container */}
      <div className="max-w-[1200px] mx-auto flex flex-wrap items-center justify-between px-4">
        {/* Left Section */}
        <div className="flex flex-wrap items-center justify-around sm:justify-center gap-4 sm:gap-6 w-full sm:w-auto">
          {/* Email */}
          <Link
            href="hFurniNestekto@example.com"
            className="flex items-center gap-2  hover:text-gray-200 text-xs sm:text-sm"
          >
            <FaEnvelope />
            <span>FurniNest@example.com</span>
          </Link>
          {/* Phone */}
          <Link
            href="tel:1234567890"
            className=" hidden sm:flex items-center gap-2 hover:text-gray-200 text-xs sm:text-sm"
          >
            <FaPhoneAlt />
            <span>(12345)67890</span>
          </Link>


          <ClerkLoaded >

  <SignedIn >
  </SignedIn>
  {user ? (
 <div className="flex items-center space-x-2">
  <UserButton />
  <div className="flex flex-col text-left text-xs">
    <p className="text-gray-400">Welcome Back</p>
    <p className="font-bold">{user.fullName}</p>
  </div>
</div>
) :(

  <SignInButton mode="modal" />)}
 


  
</ClerkLoaded>

<Link href="/cart" className="flex sm:hidden items-center gap-2 cursor-pointer hover:text-gray-200 text-xs sm:text-sm transition-colors duration-300" legacyBehavior>
          
          <FaShoppingCart className="text-base flex sm:hidden sm:text-lg" />
          {/* <span>ShoppingCart</span> */}
   
      </Link>
        </div>

        {/* Right Section */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full sm:w-auto mt-2 sm:mt-0">
          {/* Language Selector */}
          <div
            className="relative cursor-pointer  hidden sm:flex items-center gap-1 text-xs sm:text-sm"
            onMouseEnter={() => setLanguageDropdown(true)}
            onMouseLeave={() => setLanguageDropdown(false)}
          >
            <span>English</span>
            <span className="text-[10px] sm:text-xs">▼</span>
            {languageDropdown && (
              <div className="absolute top-8 bg-white text-black rounded shadow-md p-2 text-xs sm:text-sm">
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">English</div>
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">Spanish</div>
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">French</div>
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">German</div>
              </div>
            )}
          </div>

          {/* Currency Selector */}
          <div
            className="relative cursor-pointer  hidden sm:flex items-center gap-1 text-xs sm:text-sm"
            onMouseEnter={() => setCurrencyDropdown(true)}
            onMouseLeave={() => setCurrencyDropdown(false)}
          >
            <span>USD</span>
            <span className="text-[10px] sm:text-xs">▼</span>
            {currencyDropdown && (
              <div className="absolute top-8 bg-white text-black rounded shadow-md p-2 text-xs sm:text-sm">
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">USD</div>
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">EUR</div>
                <div className="hover:bg-gray-200 px-4 py-1 cursor-pointer">GBP</div>
              </div>
            )}
          </div>













          

          {/* Cart */}
          <Link href="/cart" className="hidden sm:block items-center gap-2 cursor-pointer hover:text-gray-200 text-xs sm:text-sm transition-colors duration-300" legacyBehavior>
          
              <FaShoppingCart className="text-base sm:flex hidden sm:text-lg" />
              {/* <span>ShoppingCart</span> */}
       
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
