import * as React from "react";
import { Link } from "gatsby";
import { motion, AnimatePresence } from "framer-motion";
import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";

// Components
import Button from "./button";

// Styles
import "../styles/components/navbar.scss";

// Assets
import Logo from "../assets/icons/logo.inline.svg";
import HamburgerMenuBlob from "../assets/icons/hamburger-menu-blob.inline.svg";
import SearchIcon from "../assets/icons/search.inline.svg";
import GithubIcon from "../assets/icons/github.inline.svg";

// Menu Data
const menuData = [
  {
    title: "About",
    submenu: [
      { title: "Manifesto", to: "/manifesto" },
      { title: "Team", to: "/team" },
      {
        title: "What is Green software?",
        to: "/articles/what-is-green-software",
      },
      {
        title: "How we work?",
        to: "/articles/welcome-to-the-green-software-foundation",
      },
      { title: "Press", to: "/press" },
      {
        title: "Media Kit",
        href: "https://drive.google.com/drive/folders/1mC2YiR9cRfTe5h7p_-aCndTB0v0biWVq?usp=sharing",
      },
      { title: "Trademark Policy", to: "/policy/trademark" },
      { title: "Code Of Conduct", to: "/code-of-conduct" },
    ],
  },
  {
    title: "Working Groups",
    submenu: [
      {
        title: "Standards",
        href: "https://standards.greensoftware.foundation",
      },
      { title: "Policy", href: "https://policy.greensoftware.foundation" },
      {
        title: "Opensource",
        href: "https://opensource.greensoftware.foundation",
      },
      {
        title: "Community",
        href: "https://community.greensoftware.foundation",
      },
    ],
  },
  {
    title: "Projects",
    to: "/projects",
  },
  {
    title: "Resources",
    submenu: [
      {
        title: "Awesome Green Software",
        href: "https://github.com/Green-Software-Foundation/awesome-green-software",
      },
      {
        title: "Principles of Green Software Engineering",
        href: "https://principles.green",
      },
    ],
  },
  {
    title: "Articles",
    to: "/articles",
  },
];

const MenuItems = ({ className, responsive }) => {
  const [selectedMenu, setSelectedMenu] = React.useState("");
  return (
    <ul
      className={`${responsive ? "responsive-nav-menu" : "nav-menu"} ${
        className ? className : ""
      }`}
    >
      {menuData.map((menuItem) => (
        <li
          className={`nav-menu-item ${menuItem.submenu ? "has-submenu" : ""}`}
          key={menuItem.title}
        >
          {menuItem.submenu ? (
            <>
              <button
                className={`${
                  selectedMenu === menuItem.title ? "selected" : ""
                }`}
                onClick={() =>
                  setSelectedMenu(
                    selectedMenu === menuItem.title ? "" : menuItem.title
                  )
                }
              >
                <span>{menuItem.title}</span>
              </button>
              <ul
                className={`submenu-wrapper ${
                  selectedMenu === menuItem.title ? "selected" : ""
                }`}
              >
                {menuItem.submenu.map((submenuItem) => (
                  <li key={submenuItem.title}>
                    {submenuItem.to ? (
                      <Link to={submenuItem.to}>{submenuItem.title}</Link>
                    ) : (
                      <a
                        href={submenuItem.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {submenuItem.title}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <Link to={menuItem.to}>{menuItem.title}</Link>
          )}
        </li>
      ))}
    </ul>
  );
};
const CTAs = ({ openSearch }) => (
  <div className="cta-wrapper flex-align-center">
    <a
      href="https://github.com/Green-Software-Foundation"
      target="_blank"
      rel="noopener noreferrer"
      className="search-btn"
    >
      <GithubIcon style={{ width: "1.5rem", height: "1.5rem" }} />
    </a>
    <button onClick={openSearch} className="search-btn">
      <SearchIcon style={{ width: "1.5rem", height: "1.5rem" }} />
    </button>
    <Button color="primary" edgeColor="primary-dark" to="/join-us">
      JOIN US
    </Button>
  </div>
);

const ResponsiveMenu = () => {
  const menuEl = React.useRef(null);
  React.useEffect(() => {
    disableBodyScroll(menuEl.current);
    return () => clearAllBodyScrollLocks();
  }, []);

  return (
    <motion.div
      ref={menuEl}
      key="responsive-menu"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100%", opacity: 0 }}
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
      className="responsive-menu-wrapper"
    >
      <MenuItems responsive />
      <CTAs />
    </motion.div>
  );
};
const Navbar = ({ openSearch }) => {
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  return (
    <header>
      <nav className="main-navbar flex-center-between">
        <div>
          <Link
            className="gsf-logo"
            aria-label="GSF Logo"
            aria-current="page"
            to="/"
          >
            <Logo />
          </Link>
        </div>
        <div>
          <MenuItems className="flex-center-between" />
        </div>
        <CTAs openSearch={openSearch} />
        <div className="hamburger-menu">
          <button
            aria-label="search"
            onClick={openSearch}
            className="search-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <HamburgerMenuBlob />
            <SearchIcon className="icon" />
          </button>
          <button
            aria-label="menu"
            onClick={() => setMenuIsOpen((prev) => !prev)}
          >
            <HamburgerMenuBlob />
            <div
              className={`hamburger-menu-lines ${menuIsOpen ? "is-open" : ""}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>
        </div>
        <AnimatePresence>{menuIsOpen && <ResponsiveMenu />}</AnimatePresence>
      </nav>
    </header>
  );
};

export default Navbar;
