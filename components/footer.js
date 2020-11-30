export default function Footer() {
  return (
    <footer className="bg-white" aria-labelledby="footerHeading">
      <h2 id="footerHeading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto pb-8 px-4 sm:px-6 lg:pb-12 lg:px-8">
        <p className="text-base text-gray-400 xl:text-center">
          &copy; {new Date().getFullYear()} CertiK Foundation. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
