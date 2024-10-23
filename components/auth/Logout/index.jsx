import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import { IoLogOut } from "react-icons/io5";

export default function Logout({ className }) {
    const router = useRouter();

    const onHandleLogout = () => {
        localStorage.removeItem("access-token");
        router.push("/auth/login");
    }

    return (
        <div>
            <Button variant="outline" className={`${className} w-full py-6 flex items-center justify-center gap-4`} onClick={onHandleLogout}>
                <IoLogOut size={45} />
            </Button>
        </div>
    )
}   