import CheckAuth from "@/hoc/checkAuth";

export default function Layout({ children }) {
    return (
        <CheckAuth>
            {children}
        </CheckAuth>
    )
}
