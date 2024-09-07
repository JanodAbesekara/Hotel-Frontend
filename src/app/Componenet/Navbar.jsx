import React from "react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <nav className=" flexBetween max-container padding-container relative z-30 bg-cyan-500 py-5">
      <div className="flex items-center justify-between px-5">
        <Link href="/" className="flex items-center">
          <Image
            className="mr-6"
            src="/w-hotel-logo.png"
            alt="logo"
            width={70}
            height={40}
          />
        </Link>

        <ul className="flex h-full gap-12 px-5 list-none no-underline">
          <li>
            <Link href="/" className="hover:text-gray-200 no-underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/Aboutus" className="hover:text-gray-200 no-underline">
              About us
            </Link>
          </li>
          <li>
            <Link
              href="/Contactus"
              className="hover:text-gray-200 no-underline"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/Services" className="hover:text-gray-200 no-underline">
              Services
            </Link>
          </li>

          <li>
            <Link href="/Signup">
              <button className="bg-black text-white hover:bg-slate-200 px-4 py-1 rounded hover:text-stone-700 cursor-pointer">
                SignUp
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
