import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout = ({ activeTab, setActiveTab, children }) => {
  return (
    <div className="layout-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="main-content">
        <main className="page-container">
          {children}
        </main>
        <Sidebar activeTab={activeTab} />
      </div>
    </div>
  );
};

export default Layout;
