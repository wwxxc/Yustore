// app/components/NavbarClient.tsx (Client Component)
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Drawer from 'react-modern-drawer';
import 'react-modern-drawer/dist/index.css';

interface NavbarClientProps {
  dictionary: any;
  lang: string;
}

const NavbarClient = ({ dictionary, lang }: NavbarClientProps) => {
  const asPath = usePathname();
  const currentPage = asPath ? asPath : null;
  const asPath2 = asPath.split('/');
  const CurrentUrl = asPath2[2] + '/' + asPath2[3];

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <nav className="sticky top-0 z-40 w-full flex-none border-b border-[#000000]/50 bg-background-foreground/80 backdrop-blur print:hidden">
      <div className="container">
        <div className="flex h-[60px] items-center">
          <button onClick={toggleDrawer} className="rounded-md bg-black p-2 text-foreground lg:hidden">
            <span className="sr-only">Open menu</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
          <div className="ml-3 mr-2 flex lg:ml-0">
            <Link href={`/${lang}`}>
              <img src="logo.png" alt="Logo" width={90} height={90} />
            </Link>
          </div>
          <div className="hidden lg:ml-[250px] lg:block lg:self-stretch">
            <div className="flex h-full space-x-6">
              <Link
                className={`relative z-10 -mb-px flex items-center space-x-2 border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                  currentPage === `/${lang}` ? 'border-primary text-primary' : 'text-foreground text-white hover:text-primary-300 border-transparent hover:border-primary'
                }`}
                href={`/${lang}`}
              >
                <span>{dictionary.home}</span>
              </Link>
              <Link
                className={`relative z-10 -mb-px flex items-center space-x-2 border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                  currentPage === `/${lang}/invoice` ? 'border-primary text-primary' : 'text-foreground text-white hover:text-primary-300 border-transparent hover:border-primary'
                }`}
                href={`/${lang}/invoice`}
              >
                <span>{dictionary.invoice}</span>
              </Link>
            </div>
          </div>
          <div className="ml-auto flex h-full items-center space-x-2 lg:space-x-6">
            <Link href={"/sign-in"} className="inline-flex items-center justify-center rounded-lg border border-border/100 px-4 py-2 text-sm font-medium text-foreground duration-300 ease-in-out hover:bg-muted/75">
              Masuk
            </Link>
            <Link href={"/sign-up"} className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75"> 
              Daftar
            </Link>
          </div>
        </div>
        <div className="lg:hidden">
          <Drawer
            open={isOpen}
            onClose={toggleDrawer}
            direction='left'
            className='w-full'
            lockBackgroundScroll={true}
            size={300}
          >
            <div className="bg-muted h-full w-full overflow-hidden">
              <div className="flex flex-row-reverse items-center justify-between border-b border-dashed p-4">
                <button className="text-murky-400 -m-2 inline-flex items-center justify-center rounded-md p-2"><span className="sr-only">Close menu</span></button>
                <div className="flex items-center">
                  <a className="relative w-24" href={`/${lang}`}>
                    <img src="http://192.168.1.15:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo-1.836fce09.png&w=96&q=75" alt="" className="position: absolute; height: 100%; width: 100%; inset: 0px; color: transparent;" />
                  </a>
                </div>
              </div>
              <div className="space-y-2 border-y border-background p-4">
                <div>
                  <a className="group flex items-center justify-between rounded-md px-4 py-2 font-medium text-foreground hover:bg-muted" href={`/${lang}`}>
                    <span>{dictionary.home}</span>
                  </a>
                </div>
                <div>
                  <a className="group flex items-center justify-between rounded-md px-4 py-2 font-medium text-foreground hover:bg-muted" href={`/${lang}/invoice`}>
                    <span>{dictionary.invoice}</span>
                  </a>
                </div>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
    </nav>
  );
};

export default NavbarClient;