import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";


export default function Logout({ className }) {
    const router = useRouter();

    const onHandleLogout = () => {
        localStorage.removeItem("access-token");
        router.push("/auth/login");
    }

    return (

        <Button variant="" className={`${className} w-full py-6 flex items-center justify-center gap-4`} onClick={onHandleLogout}>
            <span>Logout</span>
        </Button>

    )
}   