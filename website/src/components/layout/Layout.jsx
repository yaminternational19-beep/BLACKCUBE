import Header from './Header';
import Footer from './Footer';
import CustomCursor from '../ui/CustomCursor';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-primary-black text-primary-gray">
      <CustomCursor />
      <Header />
      <main className="pt-20">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
