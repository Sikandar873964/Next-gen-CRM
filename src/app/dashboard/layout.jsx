import SideNav from "@/components/sidebar";
import Header from "@/components/ui/header";

// Global layout for the dashboard route
const Layout = ({ children }) => {
  return (
    <>
      <SideNav />
      <Header />
      <div className="p-6 sm:pl-20">{children}</div>
    </>
  );
};

export default Layout;
