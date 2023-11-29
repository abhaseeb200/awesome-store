const HeroSection = ({ title, backgroundImage }) => {
  return (
    <div className="p-1 md:p-8 lg:p-10 ">
      <section
        className="flex items-center justify-center text-center rounded-xl aspect-video md:aspect-[2.4/1]"
        style={{
          background: `url('${backgroundImage}') center/cover no-repeat`,
        }}
      >
        <div className="flex items-center justify-center">
          <div className="hero-title display-4">
            <p className="font-bold text-md sm:text-5xl lg:text-6xl sm:max-w-xl max-w-xs w-full  text-center py-6 px-3 sm:py-12 sm:px-6 rounded-3xl backdrop-blur-sm bg-white/30 ">
              {title}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HeroSection;
