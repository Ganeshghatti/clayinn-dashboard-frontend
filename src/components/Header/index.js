import { FaAngleRight } from "react-icons/fa6";

export default function Header({ content }) {
  return (
    <div className="flex items-center gap-1 mt-5">
      <p className="max-md:text-lg md:text-3xl text-mainText font-semibold">
        Clay Inn Hotels
      </p>
      <p>
        <FaAngleRight size={24} />
      </p>
      <p className="max-md:text-lg md:text-2xl capitalize">{content}</p>
    </div>
  );
}
