'use client'
import { HomeIcon, Search, Calculator, ChevronDown } from "lucide-react";
import Link from "next/link";
import SearchToggle from "./Search";
import Image from "next/image";
import LangSwitch from "./LangSwitch";
import Logo from "../../public/assets/img/logo-1.png"
import { useParams, usePathname } from "next/navigation";
import CalcSwitch from "./CalcSwitch";

const Navbar = () => {
    const { lang, slug } = useParams() as { lang: string[], slug: string[] }; 
    const CurrentLang = lang ? lang.toString() : '';
    const asPath = usePathname();
    const currentPage = asPath ? asPath.split('/')[2] : null;
    return(
        <>
        <nav className="sticky top-0 z-40 w-full flex-none border-b border-[#000000]/50 bg-background-foreground/80 backdrop-blur print:hidden">
        <div className="container">
          <div className="flex h-[60px] items-center">
            <button className="rounded-md bg-secondary p-2 text-foreground lg:hidden">
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
              <Link href={"/"}>
                <Image src={Logo.src} alt="Logo" width={90} height={90} />
              </Link>
            </div>
            <div className="hidden lg:ml-[250px] lg:block lg:self-stretch">
              <div className="flex h-full space-x-6">
              <Link
                className={`relative z-10 -mb-px flex items-center space-x-2 border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                  currentPage === undefined ? 'border-primary text-primary' : 'text-foreground text-white hover:text-primary-300 border-transparent hover:border-primary'
                }`}
                href="/"
              >
                <HomeIcon width={20} height={20} />
                <span>Beranda</span>
              </Link>
              <Link
                className={`relative z-10 -mb-px flex items-center space-x-2 border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out ${
                  currentPage === 'invoice' ? 'border-primary text-primary' : 'text-foreground text-white hover:text-primary-300 border-transparent hover:border-primary'
                }`}
                href="/invoice"
              >
                <Search width={20} height={20} />
                <span>Cek Transaksi</span>
              </Link>
              <CalcSwitch />
              </div>
            </div>
            <div className="ml-auto flex h-full items-center space-x-2 lg:space-x-6">
              <div className="flex flex-row-reverse items-center gap-x-2">
                <div className="relative inline-block text-left">
                  <div>
                    <LangSwitch lang={"id"} currentUrl={""} />
                  </div>
                </div>
                <SearchToggle />
              </div>
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-2">
                <Link href={"/sign-in"} className="inline-flex items-center justify-center rounded-lg border border-border/100 px-4 py-2 text-sm font-medium text-foreground duration-300 ease-in-out hover:bg-muted/75">
                    Masuk
                </Link>
                <Link href={"/sign-up"} className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground duration-300 hover:bg-primary/75"> 
                  Daftar
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      </>
    )
}

export default Navbar