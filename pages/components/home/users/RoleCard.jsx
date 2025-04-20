import React from 'react';
import { motion } from "framer-motion";
import { useState } from "react";

function RoleCard({ title, icon, description }) {
    const [hovered, setHovered] = useState(false);
  
    return (
      
        <motion.div
        className=" bg-white dark:bg-neutral-950 rounded-2xl shadow-md overflow-hidden h-80 md:h-80 w-80 md:w-96 cursor-pointer p-6"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="h-full flex flex-col items-center">
          <motion.div
            initial={{ scale: 1 }}
            animate={hovered ? { scale: 0.5, y: -30, marginTop:16 , marginBottom:-10  } : { scale: 1, y: 0,  marginTop:85, marginBottom:10 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            {icon}
          </motion.div>
  
          
  
          <motion.h2
            className="text-2xl font-bold text-center mb-1 text-neutral-950 dark:text-neutral-100"
            initial={{ y: 0 }}
            animate={hovered ? { y: -30 } : { y: 0 }}
            transition={{
              duration: 0.5,
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          >
            {title}
          </motion.h2>
  
          <motion.p
            className="text-neutral-950 dark:text-neutral-100 text-center px-4 text-sm "
            initial={{ opacity: 0, y: 20 }}
            animate={hovered ? { opacity: 1, y: -30 } : { opacity: 0, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          >
            {description}
          </motion.p>
        </div>
      </motion.div>
      
    );
  }

  export default RoleCard;
