import person from "../../../assets/images/hero-1-2.jpg.png";
import person1 from "../../../assets/images/Component 4.png";
import world from "../../../assets/vector/shape-1-2.png.png";
import logo from "../../../assets/vector/shape-1-1.png.png";
import AdvertisementGrid from "./Products/products";

const LandingPage = () => {
  return (
    <div className="flex flex-col gap-10 my-15">
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div className="relative font-semibold text-4xl md:text-6xl text-[#212121] mb-6 md:mb-0">
          <h1>Get daily things in</h1>
          <h1>
            the same <span className="text-[#D3D3D3]">platform</span>
          </h1>
          <p className="absolute top-20 -z-10 text-[15vw] opacity-8 font-extrabold leading-none select-none text-transparent [-webkit-text-stroke:1px_#000]">
            LISTBNB
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="relative">
            <img
              src={person1}
              alt="Featured person"
              className="h-[500px] w-[314px] object-cover"
            />
            <img
              src={logo}
              alt="Company logo"
              className="absolute w-[130px] h-[110px] top-[145px] left-[100px] md:top-[120px] md:left-[150px] md:w-[220px] md:h-[180px]"
            />
          </div>
          <div className="grid grid-cols-1 gap-2">
            <div className="relative bg-[#F50963] flex justify-center w-[150px] md:w-[300px] h-[190px]">
              <img
                src={world}
                alt="World map illustration"
                className="h-[152px] w-[278px]"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-opacity-20 p-4 flex flex-col justify-center items-center text-white">
                <p className="font-bold text-xl">5000+</p>
                <p>Daily Ads Listed</p>
              </div>
            </div>
            <img
              src={person}
              alt="Secondary featured person"
              className="w-[300px] h-[300px]"
            />
          </div>
        </div>
      </section>
      <AdvertisementGrid />
    </div>
  );
};

export default LandingPage;
