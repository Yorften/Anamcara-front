export default function Hero() {
  return (
    <section>
      <p className='absolute xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl text-3xl font-semibold w-1/2 top-[25vw] md:top-[18vw] left-[5vw]'>
        WELCOME TO <span className='font-light'>ANAMCARA</span>
        <span className=' inline-block'>
          <img
            src='assets/images/mokoko_bow.png'
            alt='mokoko bow'
            className=' object-contain h-8 lg:h-[7vw]'
          />
        </span>
      </p>
    </section>
  );
}
