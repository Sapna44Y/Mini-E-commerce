import Navbar from "./Navbar";
import Tabs from "./Tabs";

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs />
        <main className="py-8">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
