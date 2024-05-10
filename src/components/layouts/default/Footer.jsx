import Logo from "../Logo";

export default function Footer() {
  return (
    <footer className='h-60 bg-[#141619] relative'>
      <div className='w-full h-full flex justify-center items-center'>
        <Logo />
      </div>
      <p className='absolute w-full text-center bottom-0 '>
        © 2024 Anamcara. All Rights Reserved.
      </p>
    </footer>
  );
}
