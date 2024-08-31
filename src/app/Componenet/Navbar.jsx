import React from "react";
import Link from "next/link";
import Image from "next/image";

function Navbar() {
  return (
    <nav className=" flexBetween max-container padding-container relative z-30 ">
      <div className="flex items-center justify-between px-5">
        <Link href="/" className="flex items-center">
          <Image
            src="/w-hotel-logo.png"
            alt="logo"
            width={70}
            height={40}
            className="mr-6"
          />
        </Link>

        <ul className="flex h-full gap-12 px-5">
          <li>
            <Link href="/" className="hover:text-gray-200">
              Home
            </Link>
          </li>
          <li>
            <Link href="/Aboutus" className="hover:text-gray-200">
              About us
            </Link>
          </li>
          <li>
            <Link href="/Contactus" className="hover:text-gray-200">
              Contact Us
            </Link>
          </li>
          <li>
            <Link href="/Services" className="hover:text-gray-200">
              Services
            </Link>
          </li>

          <li>
            <Link href="/Signup">
              <button className="bg-white text-black hover:bg-slate-200 px-4 py-1 rounded hover:text-stone-700">
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
