import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

// REACT ICONS
import { IoIosLogOut } from "react-icons/io";

export default function Logout({ className }) {
  const router = useRouter();

  const onHandleLogout = () => {
    localStorage.removeItem("access-token");
    localStorage.removeItem("refresh-token");
    router.refresh();
    router.push("/auth/login");
  };

  return (
    <Button
      variant=""
      className={`${className} w-full py-6 flex items-center justify-center gap-4`}
      onClick={onHandleLogout}
    >
      <span>Logout</span>
      <IoIosLogOut size={25} />
    </Button>
  );
}
