// eslint-disable-next-line react/prop-types
export default function InputLayout({ children, className, id }) {
  return (
    <div
      id={`${id}`}
      className={`p-6 bg-[#313338] w-full rounded flex flex-col gap-8 text-2xl font-light ${className}`}
    >
      {children}
    </div>
  );
}
