const Footer = () => {
  return (
    <footer className="border-t">
      <div className="container flex flex-col items-center justify-between gap-3 py-8 md:flex-row">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Manjeet Kumar</p>
        <nav className="flex gap-4 text-sm text-muted-foreground">
          <a href="#services" className="hover:underline">
            Services
          </a>
          <a href="#portfolio" className="hover:underline">
            Portfolio
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
