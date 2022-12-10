import Link from "next/link";
import React from "react";
import { routes } from "../../config/routes";
import Search from "../Search/Search";

const Header = () => {
  return (
    <div className="header__wrapper">
      <header className="header">
        <nav className="header__nav">
          {routes.map((route) =>
            route.showInNav ? (
              <Link className="header__navLink" key={route.name} href={route.path}>
                {route.name}
              </Link>
            ) : null
          )}
        </nav>
        <Search />
      </header>
    </div>
  );
};

export default Header;
