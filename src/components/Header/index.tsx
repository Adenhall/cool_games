import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-[#d1d8e0] border-b">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <Link
          to="/"
          className="flex items-center space-x-2 lg:flex-1 -m-1.5 p-1.5"
        >
          <span className="sr-only">Your Company</span>
          <img
            className="h-8 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt=""
          />
          <h1 className="font-bold text-2xl">Cool Games</h1>
        </Link>
      </nav>
    </header>
  );
};

export default Header;
