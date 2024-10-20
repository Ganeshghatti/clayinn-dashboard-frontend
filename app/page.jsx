import { Button } from "@/components/ui/button";
import Link from "next/link";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";


import { CiUser } from "react-icons/ci";
import { IoIosArrowRoundForward } from "react-icons/io";

const Page = () => {

  return (
    <div className="flex flex-col h-screen items-center justify-center">
      <Link href="/super-admin" className="mx-5 my-2">
        <Button className="flex items-center gap-2"><span><CiUser size={20} /></span>Super Admin</Button>
      </Link>
      <Link href="/auth/login" className="mx-5 my-2">
        <Button className="flex items-center gap-2 group">Login <span className="group-hover:translate-x-2 transition-all duration-300 ease-linear"><IoIosArrowRoundForward size={26} /></span></Button>
      </Link>
    </div>
  );
};

export default Page;
