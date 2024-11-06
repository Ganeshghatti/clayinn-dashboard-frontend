import { navLinks } from "@/constants";
import Link from "next/link";

export default function Nav({ locationId, pathname }) {
  return (
    <div className="space-y-8 mt-12">
      {navLinks.map((eachLink) => {
        return (
          <Link
            key={eachLink?.id}
            href={`/location/${locationId}/${eachLink.link}`}
            className={`${
              eachLink.link === pathname.split("/")[3]
                ? "bg-mainBg text-black rounded-l-full h-12"
                : "text-mainBg "
            } flex items-center justify-start gap-2 transition-all duration-300 ease-linear px-10 text-sm ml-10 h-12`}
          >
            <span>{eachLink?.icon}</span>
            <span className="text-lg">{eachLink?.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
