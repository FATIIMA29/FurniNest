"use client";


import Link from "next/link";
import { useState } from 'react';
import  Form  from 'next/form';

function Header() {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };

  return (
    <header className="border-b-2 bg-neutral-100">
      {/* Header Container */}
      <div className="w-full flex items-center justify-center bg-white h-[70px]">
        <div className="w-full max-w-[1200px] flex items-center justify-between px-4 md:px-8 h-[50px]">
          {/* Logo */}
          <div>
          <Link href="/"> <h2 className="title-font font-extrabold text-blue-950 tracking-widest text-xl md:text-2xl">
          FurniNest
            </h2></Link>
          </div>

          {/* Navigation Links */}
          <div
            className={`${
              open ? "translate-x-0" : "-translate-x-full"
            } md:flex md:translate-x-0 md:static w-[70%] md:w-auto bg-purple-100 md:bg-transparent absolute top-0 left-0 h-screen md:h-auto z-40 transition-transform duration-500 ease-in-out`}
          >
            <ul className="flex flex-col md:flex-row md:gap-x-4 lg:gap-x-6 xl:gap-x-8 items-center text-black">
              <li className="p-4 hover:text-pink-600">
                <Link href="/">Home</Link>
              </li>
              <li className="p-4 hover:text-pink-600">
                <Link href="/AboutUs">About</Link>
              </li>
              <li className="p-4 hover:text-pink-600">
                <Link href="/Shop">Products</Link>
              </li>
              <li className="p-4 hover:text-pink-600">
                <Link href="/Blogs">Blog</Link>
              </li>
              <li className="p-4 hover:text-pink-600">
                <Link href="/ShopList">Shop</Link>
              </li>
              <li className="p-4 hover:text-pink-600">
                <Link href="/Contact">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="flex gap-x-4 items-center">
          
          

          <Form action="/search" className="w-full hidden sm:w-auto sm:flex-1 sm:mx-4 mt-2 sm:mt-0">
  <input
    type="text"
    name="query"
    placeholder="Search for products"
    className="
      bg-gray-100 
      text-gray-800 
      px-4 
      py-2 
      rounded 
      outline-none 
      focus:ring-2 
      focus:ring-blue-500 
      focus:ring-opacity-50 
      border 
      w-full 
      max-w-4xl 
    "
  />
</Form>






            <button
              className="text-black block md:hidden text-3xl z-50"
              onClick={toggle}
            >
              ☰
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
