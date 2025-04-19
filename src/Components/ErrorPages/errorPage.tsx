import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface ErrorPageProps {
  title?: string;
  message?: string;
  showHomeButton?: boolean;
}

const ErrorPage = ({
  title = "404 - Page Not Found",
  message = "The page you are looking for might have been removed or is temporarily unavailable.",
  showHomeButton = true
}: ErrorPageProps) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h1 className="text-6xl font-bold text-[#F50964] mb-4">{title}</h1>
        <p className="text-xl text-gray-600 mb-8">{message}</p>
        
        {showHomeButton && (
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-[#F50964] text-white rounded-full font-medium hover:bg-[#d9085a] transition-colors"
          >
            Return Home
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default ErrorPage;
