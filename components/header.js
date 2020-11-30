import Link from "next/link";

export default function Header({ hasHero }) {
  return (
    <div className="relative bg-gray-50 overflowHidden">
      <div className="relative py-4 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <nav
            className="relative flex items-center justify-between sm:h-10 md:justify-center"
            aria-label="Global"
          >
            <div className="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
              <div className="flex items-center justify-between w-full md:w-auto">
                <a href="https://certik.foundation">
                  <span className="sr-only">CertiK Foundation</span>
                  <img
                    className="h-8 w-auto sm:h-10"
                    src="https://certik.foundation/certik-foundation-logo-white.png"
                    alt="CertiK"
                  />
                </a>
                <div className="-mr-2 flex items-center md:hidden">
                  <button
                    type="button"
                    className="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                    id="main-menu"
                    aria-haspopup="true"
                  >
                    <span className="sr-only">Open main menu</span>
                    <svg
                      className="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            <div className="hidden md:flex md:space-x-10">
              <Link
                href="/"
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                Home
              </Link>

              <a
                href="https://certik.foundation"
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                Foundation
              </a>

              <a
                href="https://shield.certik.foundation"
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                Shield
              </a>

              <a
                href="https://explorer.certik.foundation"
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                Explorer
              </a>

              <a
                href="https://wallet.certik.foundation"
                className="font-medium text-gray-500 hover:text-gray-900"
              >
                Wallet
              </a>
            </div>
          </nav>
        </div>

        <div className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
          <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflowHidden">
            <div className="px-5 pt-4 flex items-center justify-between">
              <div>
                <img
                  className="h-8 w-auto"
                  src="https://certik.foundation/certik-foundation-logo-white.png"
                  alt="CertiK"
                />
              </div>
              <div className="-mr-2">
                <button
                  type="button"
                  className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                >
                  <span className="sr-only">Close menu</span>
                  <svg
                    className="h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="main-menu"
            >
              <div className="px-2 pt-2 pb-3" role="none">
                <a
                  href="https://certik.foundation"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  role="menuitem"
                >
                  Foundation Home
                </a>

                <a
                  href="https://shield.certik.foundation"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  role="menuitem"
                >
                  Shield
                </a>

                <a
                  href="https://explorer.certik.foundation"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  role="menuitem"
                >
                  Explorer
                </a>

                <a
                  href="https://wallet.certik.foundation"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                  role="menuitem"
                >
                  Wallet
                </a>
              </div>
            </div>
          </div>
        </div>

        {hasHero && (
          <main className="mt-8 mx-auto max-w-7xl px-4 sm:mt-12">
            <div className="text-center">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">CertiK Security Oracle</span>
                <span className="block text-indigo-600">SWC Registry</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                SWC Registry with Security Oracle Extensions
              </p>
            </div>
          </main>
        )}
      </div>
    </div>
  );
}
