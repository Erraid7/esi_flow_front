"use client";
import { motion } from "framer-motion";
import { useState } from "react";

export default function WhoCanUseESIFlow() {
  const roles = [
    {
      id: "personal",
      title: "Personal",
      icon: (
        <img src="/shape.svg"></img>
      ),
      description: "Staff members, students, and teachers can quickly report technical issues, track the status of their requests, and receive real-time updates on their resolution."
    },
    {
      id: "administrator",
      title: "Administrator",
      icon: (
        <img src="/shape-1.svg"></img>
      ),
      description: "Administrators handle reported issues, delegate tasks to technicians, monitor platform activity, and facilitate seamless communication between users and the technical team to ensure efficient problem resolution at ESI."
    },
    {
      id: "technician",
      title: "Technician",
      icon: (
        <img src="/shape-2.svg"></img>
      ),
      description: "Technicians diagnose and resolve reported issues, update their status, implement solutions, and ensure a reliable and efficient environment for students, teachers, and staff at ESI."
    }
  ];
  return (
    <section id="users" className="p-20 bg-[#F5F7F8] ">
      
        <h1 className="text-7xl ml-4 font-bold text-gray-800 mb-16">
          Who Can Use<br />
          ESI Flow?
        </h1>

        <div className="flex justify-center items-center flex-col md:flex-row gap-20">
          {roles.map((role) => (
            <RoleCard 
              key={role.id}
              title={role.title}
              icon={role.icon}
              description={role.description}
            />
          ))}
        </div>
      
    </section>
  );
}

function RoleCard({ title, icon, description }) {
  const [hovered, setHovered] = useState(false);

  return (
    
      <motion.div
      className=" bg-white rounded-2xl shadow-md overflow-hidden h-80 w-96 cursor-pointer p-6"
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
          className="text-2xl font-bold text-center mb-1"
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
          className="text-gray-700 text-center px-4"
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