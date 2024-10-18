import { Button } from "@/components/ui/button";
import Link from "next/link";

export const description =
  "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action.";

const Page = () => {
  return (
    <div className="flex flex-col">
      <Link href="/super-admin" className="mx-5 my-2">
        <Button>Super Admin</Button>
      </Link>
      <Link href="/auth/login" className="mx-5 my-2">
        <Button>Login</Button>
      </Link>
    </div>
  );
};

export default Page;
