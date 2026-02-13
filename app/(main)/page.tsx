import About from "@/components/Home/About";
import OurPromise from "@/components/Home/OurPromise";
import PopularTours from "@/components/Home/PopularTours";
import Subscribe from "@/components/Home/Subscribe";
import SearchComponent from "@/components/searchComponent";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] w-full">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/Hero-bg.png)' }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* Content */}
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <div className="max-w-4xl text-center text-white">
            <span className="mb-6 bg-black/30 px-4 py-[7px] uppercase rounded-full text-primary font-semibold">
              Discover The Untamed
            </span>
            <h1 className="my-8 text-5xl md:text-6xl lg:text-7xl font-bold max-w-sm mx-auto">
              Your Next Adventure Starts Here
            </h1>
            <p className="text-[#E2E8F0] text-lg md:text-xl max-w-2xl md:max-w-3xl mx-auto">
              Explore the world's most breathtaking landscapes with expert guides.
              From the peaks of the Andes to the depths of the Amazon, we've got you covered.
            </p>
          </div>
        </div>
      </section>
      {/* Search Component */}
      <SearchComponent />
      <About />
      <PopularTours />
      <OurPromise />
      <Subscribe />
    </div>
  );
}
