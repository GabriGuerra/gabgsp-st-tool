import { motion } from "framer-motion";

function Header() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-4 bg-blue-500 text-white"
    >
      <h1 className="text-xl font-bold">Strava Support Tool</h1>
    </motion.div>
  );
}

export default Header;
