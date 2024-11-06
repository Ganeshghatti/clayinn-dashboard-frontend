import Auth from "@/components/Auth_Components";

export default function Login() {
  return (
    <div className="flex justify-center items-center h-screen  relative">
      <Auth />
      <div className="absolute top-0 left-0 w-[150px] h-[150px] bg-sideBg/50 blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-[150px] h-[150px] bg-sideBg/50 blur-3xl"></div>
    </div>
  );
}
