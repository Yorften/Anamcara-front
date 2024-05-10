export default function AboutUs() {
  return (
    <section id='about_us' className='lg:my-40 my-20 mx-4 lg:mx-10'>
      <h1 className='xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-semibold'>
        WHO WE ARE
      </h1>
      <div className='flex md:flex-row flex-col gap-8 my-10'>
        <div className='lg:w-3/5 w-full h-fit px-2 py-8 bg-transparent/25 shadow-xl'>
          <div className='flex items-center md:gap-4 text-xl font-medium mb-8'>
            <p>Anamcara - Meaning &#34;Soul Friends&#34;</p>
            <img
              src='assets/images/emotes/emoji_a_52.png'
              className='object-contain h-16 inline-block'
              alt=''
            />
          </div>
          <p className='text-lg font-medium'>
            We are a guild with a strong community based on friendship and a
            shared passion for Lost Ark. Our objective is to combine competitive
            gaming with a relaxed vibe, while maintaining one of the top spots
            on our server. Expect a welcoming environment with plenty of
            terrible banter.
          </p>
        </div>
        <div className='lg:w-2/5 w-full flex flex-col gap-6'>
          <img
            src='assets/images/halloween_1.webp'
            alt='anamcara group picture'
            className='shadow-lg'
          />
          <div className='flex justify-between items-center gap-4 [&>*]:object-cover [&>*]:h-28 [&>*]:w-[30%] md:[&>*]:h-16 md:[&>*]:w-[30%] lg:[&>*]:h-20 lg:[&>*]:w-[30%] [&>*]:shadow-lg'>
            <img
              src='assets/images/Selfie_20220529_Misoria_010.webp'
              alt='anamcara group picture'
            />
            <img
              src='assets/images/halloween_2.webp'
              alt='anamcara group picture'
            />
            <img
              src='assets/images/Selfie_20221002_Misoria_027.webp'
              alt='anamcara group picture'
            />
          </div>
        </div>
      </div>
    </section>
  );
}
