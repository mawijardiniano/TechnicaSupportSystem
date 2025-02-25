import Navbar from "@/components/users/navbar";
import Sidebar from "@/components/users/sidebar";

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex flex-col overflow-hidden w-full">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 bg-blue-800 text-white hidden md:block">
          <Sidebar />
        </aside>
        <main className="flex-1 p-6 bg-white">{children}</main>
      </div>
    </div>
  );
};

export default Layout;