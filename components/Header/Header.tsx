import { Auth } from "aws-amplify";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { routes } from "../../config/routes";
import Search from "../Search/Search";

const Header = () => {
  const router = useRouter()

  const handleLogout = () => {
    Auth.signOut()
    router.push("/");
  }

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
        <button className="header__logoutBtn" onClick={handleLogout}>Log out</button>
      </header>
    </div>
  );
};

export default Header;
