import SideNav from "@/components/sidebar";

const Layout = ({ children }) => {
  return (
    <>
      <SideNav />
      <div>{children}</div>
    </>
  );
};

export default Layout;
