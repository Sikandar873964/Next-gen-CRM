import SideNav from "@/components/sidebar";
import Header from "@/components/ui/header";

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
