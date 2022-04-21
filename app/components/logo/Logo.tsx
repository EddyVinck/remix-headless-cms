import logo from "../../../public/favicon.png";

export const Logo = () => (
  <span className="h-10">
    <a href="/" className="flex items-center">
      <img src={logo} className="h-10 pr-2" alt="" />
      <span className="block font-bold">Remix Book Store</span>
    </a>
  </span>
);
