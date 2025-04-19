import { ReactNode } from "react";
import Footer from "./Footer/footer";
import Header from "./Header/header";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  return (
    <main
      className="min-h-screen flex flex-col"
      role="main"
      aria-label="Main content layout"
    >
      <Header />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-[1586px] mx-4 md:mx-16 flex-grow"
          aria-label={`Page content for ${location.pathname}`}
        >
          {children}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </main>
  );
};

export default Layout;
