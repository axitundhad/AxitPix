"use client";

import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import Image from "next/image";
import { ImageIcon, Pointer } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <>
      <div className="flex items-center justify-center">
        <div className="min-h-screen max-w-4xl  bg-blue-100 rounded-2xl shadow-2xl text-indigo-800 pt-8 pb-1 px-6 flex flex-col items-center">
          <h1 className="text-3xl text-indigo-800 font-extrabold text-center mb-10 tracking-tight">
            About us
          </h1>
          {/* Admin Photo */}
          <div className="relative w-40 h-40 rounded-full overflow-hidden shadow-2xl border-4  border-indigo-900">
            <Image src="/admin.png" alt="Admin" fill className="object-cover" />
          </div>

          {/* Project Info */}
          <h1 className="text-xl font-bold mt-5 mb-1 text-center">
            Axit Undhad
          </h1>
          <h1 className="text-xl font-bold  mb-4 text-center">
            Developer & Admin - AxitPix
          </h1>
          <ul className="max-w-3xl px-10  text-justify text-lg text-indigo-800 leading-relaxed">
            <li className="flex items-start gap-2">
              <Pointer className="rotate-90 size-5 mt-1 flex-shrink-0 " />
              <p className="text-justify">
                I developed AxitPix not only as a learning project, but also as
                a real-world example of how even individuals and small business
                owners can bring their products online through a sleek, modern
                digital platform. This site features full integration with
                Razorpay for secure, real-time bank-to-bank transactions, and
                includes various functionalities such as high-quality image
                management, variant-based licensing, and responsive design. My
                goal was to demonstrate that selling online doesn&apos;t require
                a massive team or complex infrastructure—it just needs the right
                vision and execution. If you&apos;re a seller or entrepreneur
                who wants to build something similar, I&apos;d be happy to help
                turn your ideas into a working, fully customized platform.
              </p>
            </li>
            <li className="flex items-start mt-2 gap-2">
              <Pointer className="rotate-90 size-5 mt-1 flex-shrink-0 " />
              <p className="text-justify">
                AxitPix is a modern digital image marketplace built with
                Next.js, Tailwind CSS, and Razorpay for secure payments. It
                allows users to explore and purchase premium image variants
                based on license types and resolutions. Every purchase unlocks a
                high-quality downloadable version tailored to user needs.
              </p>
            </li>
            <li className="flex items-start mt-2 gap-2">
              <Pointer className="rotate-90 mt-1 size-5 flex-shrink-0" />
              <p className="text-justify">
                At AxitPix, discover a curated collection of premium visuals
                across all styles. Whether for design, marketing, or creative
                projects, find the perfect image with ease and confidence.
              </p>
            </li>
          </ul>

          <div className="max-w-7xl border-t mt-4 border-indigo-300 mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Branding */}
            <div className="">
              <Link
                href="/"
                className="flex items-center text-xl mb-3 font-semibold text-indigo-900  hover:text-indigo-700  transition gap-2"
              >
                <ImageIcon className="w-6 h-6" />
                AxitPix
              </Link>
              <div className=" flex items-center space-x-2">
                <Image src="/gmail.png" alt="Gmail" width={25} height={25} />
                <p>axitundhad065@gmail.com</p>{" "}
              </div>
              <div className=" flex items-center space-x-2 mt-2">
                <Image
                  src="/location.png"
                  alt="location"
                  width={25}
                  height={25}
                />
                <p> Surat, India</p>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl text-indigo-900 md:pl-8 font-semibold mb-3">
                Quick Links
              </h3>
              <ul className="space-y-2 text-sm md:pl-15">
                <li>
                  <Link href="/" className="hover:text-indigo-600">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/" className="hover:text-indigo-600">
                    Explore
                  </Link>
                </li>
                <li>
                  <Link href="/aboutus" className="hover:text-indigo-600">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-indigo-600">
                    Login
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact & Socials */}
            <div>
              <h3 className="text-xl text-indigo-900 font-semibold mb-3">
                Social Media
              </h3>
              <p className="text-sm font-medium">
                Axit Undhad (Developer/Admin)
              </p>

              <div className="flex gap-4 mt-4 text-indigo-800 text-xl">
                <a
                  href="https://linkedin.com/in/axit-undhad-715a4b279"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin className="hover:text-indigo-600" />
                </a>
                <a
                  href="https://instagram.com/axit_undhad4?igsh=N3dhamo0ZDEwOG16"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="hover:text-indigo-600" />
                </a>
                <a
                  href="https://github.com/axitundhad"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub className="hover:text-indigo-600" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="w-full py-4 text-center border-t border-indigo-300 text-sm text-indigo-800">
            © {new Date().getFullYear()} AxitPix. All rights reserved.
          </div>
        </div>
      </div>
    </>
  );
}
