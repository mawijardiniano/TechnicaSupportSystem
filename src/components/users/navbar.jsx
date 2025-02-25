"use client"
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/Logo.png";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="px-8 w-full flex justify-between items-center">
        <Link href="https://region4b.dost.gov.ph/" target="_blank">
          <Image src={logo} alt="DOST Logo" width={50} height={50} />
        </Link>
        <h1 className="text-xl font-bold">DOST-PSTO</h1>
      </div>
    </nav>
  );
};

export default Navbar;
