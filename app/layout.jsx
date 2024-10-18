import "./globals.css";

export const metadata = {
  title: "Clay Inn Dashboard",
  description: "A Hotel Management Dashboard for Clay Inn Hotels",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="family-poppins">{children}</body>
    </html>
  );
}
