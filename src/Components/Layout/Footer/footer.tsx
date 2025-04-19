import logo from "../../../assets/images/logo-white-2.png.png";
import image1 from "../../../assets/vector/Footer/Text (1).png";
import image2 from "../../../assets/vector/Footer/Text.png";
import image3 from "../../../assets/vector/Footer/Text3.png";
import image4 from "../../../assets/vector/Footer/Text4.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="flex justify-between items-center py-4 px-4 md:px-16 shadow-lg bg-[#212121] w-full"
      role="contentinfo"
    >
      <div className="flex items-center gap-6">
        <img
          src={logo}
          alt="Planet Media Logo"
          className="w-[160px] h-[30px]"
          width={160}
          height={30}
        />
        <div
          className="h-[15px] w-[1px] bg-[#F50963] border border-[#F50963]"
          role="separator"
          aria-hidden="true"
        />
        <p className="font-normal text-[#666666] text-sm">
          Copyright © {currentYear}
        </p>
      </div>

      <nav
        className="flex justify-between gap-4 items-center"
        aria-label="Footer navigation"
      >
        <ul className="flex items-center gap-2">
          <li>
            <img src={image1} alt="Facebook" className="size-4" />
          </li>
          <li>
            <img src={image2} alt="Terms of Service" className="size-4" />
          </li>
          <li>
            <img src={image3} alt="Twitter" className="size-4" />
          </li>
          <li>
            <img src={image4} alt="Youtube" className="size-4" />
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
