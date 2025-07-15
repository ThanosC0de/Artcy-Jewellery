import AppSidebar from "@/components/Application/admin/AppSidebar";
import ThemeProvider from "@/components/Application/admin/ThemeProvider";
import TopBar from "@/components/Application/admin/TopBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";

const layout = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SidebarProvider>
        <AppSidebar />
        <main className="md:w-[calc(100vw-16rem)] ">
          <div className="pt-[85px] px-8 min-h-[calc(100vh-40px)] pb-10">
            <TopBar />
            {children}
          </div>

          <div className="border-t h-[40px] flex justify-center items-center bg-gray-50 dark:bg-background text-sm">
            © 2025 Sahil Thummar™. All rights reserved
          </div>
        </main>
      </SidebarProvider>
    </ThemeProvider>
  );
};

export default layout;
