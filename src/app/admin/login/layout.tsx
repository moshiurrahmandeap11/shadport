import { Metadata } from "next";
import AdminLoginPage from "./page";

export const metadata: Metadata = {
  title: "Admin Login | Moshiur Rahman",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <AdminLoginPage />;
}
