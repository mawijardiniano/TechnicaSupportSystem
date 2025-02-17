import Navbar from "@/components/admin/navbar";
import Sidebar from "@/components/admin/sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden w-full">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-blue-800 text-white hidden md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 p-6 bg-blue-100">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
