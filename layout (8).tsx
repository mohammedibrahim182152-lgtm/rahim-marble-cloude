import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import SessionProviderWrapper from "@/components/admin/SessionProviderWrapper";

export default async function AdminLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: Promise<Record<string, string>>;
}) {
  const session = await auth();

  // Login page is rendered inside this layout but without sidebar
  // Middleware handles the redirect, but we still render the child (login form)
  if (!session) {
    // Don't redirect here - let middleware handle it
    // This layout still renders login page content
    return (
      <SessionProviderWrapper>
        <div className="min-h-screen bg-[#0F0F0F]">
          {children}
        </div>
      </SessionProviderWrapper>
    );
  }

  return (
    <SessionProviderWrapper>
      <div className="min-h-screen bg-[#0F0F0F] flex">
        <AdminSidebar />
        <main className="flex-1 ml-64 p-8 overflow-auto min-h-screen">{children}</main>
      </div>
    </SessionProviderWrapper>
  );
}
