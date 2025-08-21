import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navItemCls =
    "px-3 py-2 rounded-md text-sm font-medium hover:bg-accent hover:text-foreground transition-colors duration-200";

  return (
    <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        <a href="#home" className="font-playfair text-xl font-semibold">
          Manjeet Kumar
        </a>
        <div className="hidden gap-1 md:flex">
          <a href="#about" className={navItemCls}>
            About
          </a>
          <a href="#services" className={navItemCls}>
            Services
          </a>
          <a href="#portfolio" className={navItemCls}>
            Portfolio
          </a>
          <a href="#contact" className={navItemCls}>
            Contact
          </a>
          <NavLink to="/admin" className={navItemCls}>
            Admin
          </NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
