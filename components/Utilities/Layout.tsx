import { ReactNode, useEffect, useState } from "react";
import { Disclosure } from "@headlessui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import Footer from "@/components/Utilities/Footer";

const navigation = [
  { name: "Home", href: "/#home" },
  { name: "The Problem", href: "/#problem" },
  { name: "Why NeoCast?", href: "/#why" },
  { name: "FAQ", href: "/#faq" },
  { name: "Contact", href: "/#contact" },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

interface Props {
  children?: ReactNode;
}

export default function Layout({ children }: Props) {
  const router = useRouter();
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    console.log(router.pathname);
  }, [router]);

  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="min-h-full">
        <div className="fixed w-full top-0 z-10">
          <Disclosure
            as="nav"
            className="border-b border-secondary-600 border-opacity-25 bg-gradient-to-r from-primary-900/50 to-secondary-900/50 lg:border-none"
            style={
              scrollPosition > 0
                ? {
                    backdropFilter: "blur(10px)",
                  }
                : {}
            }
          >
            {() => (
              <>
                <div className="mx-auto max-w-7xl px-2 sm:px-4 lg:px-8">
                  <div className="relative flex h-24 items-center justify-between">
                    <div className="flex items-center px-2 lg:px-0">
                      <div className="flex-shrink-0 flex items-center gap-x-3">
                        <Image
                          className="block h-12 w-12"
                          height={1109}
                          width={1115}
                          src="/logo/color.svg"
                          alt="NeoCast"
                        />
                        <span className="font-black text-white text-3xl">
                          NeoCast
                        </span>
                      </div>
                      <div className="hidden lg:ml-10 lg:block">
                        <div className="flex space-x-4">
                          {navigation.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                item.href === router.pathname
                                  ? "bg-white text-zinc-900"
                                  : "text-zinc-200 hover:text-zinc-900 hover:bg-zinc-100",
                                "rounded-md py-2 px-3 text-lg font-medium transition-all duration-200 ease-in-out"
                              )}
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div>
                      <button className="rounded-md bg-white px-3.5 py-2.5 text-lg font-semibold text-zinc-900 ring-1 ring-inset ring-zinc-300 hover:bg-zinc-50">
                        Launch dApp
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Disclosure>
        </div>

        <div className="h-24 bg-gradient-to-r from-primary-900 to-secondary-900" />
        <main>{children}</main>

        <Footer />
      </div>
    </>
  );
}