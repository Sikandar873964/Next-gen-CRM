import SideNav from "@/components/sidebar";
import Header from "@/components/ui/header";

// Global layout for the dashboard route
const Layout = ({ children }) => {
  return (
    <>
      {/* Render the SideNav component */}
      <SideNav />

      {/* Render the Header component */}
      <Header />

      {/* Render the children components within a div */}
      <div className="p-6 sm:pl-20">{children}</div>
    </>
  );
};

export default Layout;
