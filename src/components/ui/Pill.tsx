export default function Pill({ text }: { text: string }) {
  return (
    <>
      <span className="transition border border-input font-poppins-light flex items-center text-xs px-2.5 py-1.5 rounded-full hover:-translate-y-1 hover:bg-black hover:text-white duration-300">
        {text}
      </span>
    </>
  );
}
