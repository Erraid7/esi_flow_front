// File: app/example-page.js
"use client"

import { useState, useEffect } from "react" // Added missing import for useEffect
import DynamicTable from "../../components/DynamicTable"
import Sidebar from "../../components/sidebar"
import { useDarkMode } from "../../darkLightMode/darkModeContext"
import { Users, PenTool, Settings,UserCog } from "lucide-react"
import {ArrowRight2} from 'iconsax-react'
import axios from "axios"
import { useLanguage } from '../../translations/contexts/languageContext';
// Import the Card component from its file
import { Card } from "../../components/cards"

export default function UserManagement() {
  const { t } = useLanguage();
  const { isDarkMode } = useDarkMode();
  const [data, setData] = useState([
    {
      "id": 0,
      "name": "Ahmed Zitouni",
      "profession": "Doctor",
      "email": "a.zitouni@health.dz",
      "phoneNumber": "0555123789",
      "role": "Admin"
    },
    {
      "id": 1,
      "name": "Sarah Johnson",
      "profession": "Software Developer",
      "email": "s.johnson@devtech.com",
      "phoneNumber": "0776234567",
      "role": "User"
    },
    {
      "id": 2,
      "name": "Mehdi Boukadoum",
      "profession": "Teacher",
      "email": "m.boukadoum@edu.dz",
      "phoneNumber": "0666345678",
      "role": "Moderator"
    },
    {
      "id": 3,
      "name": "Emily Davis",
      "profession": "Marketing Specialist",
      "email": "e.davis@marketing.co",
      "phoneNumber": "0556456789",
      "role": "User"
    },
    {
      "id": 4,
      "name": "Youssef Khelifi",
      "profession": "Engineer",
      "email": "y.khelifi@tech.dz",
      "phoneNumber": "0777567890",
      "role": "Admin"
    },
    {
      "id": 5,
      "name": "Nadia Petrov",
      "profession": "Data Scientist",
      "email": "n.petrov@analytics.ai",
      "phoneNumber": "0667678901",
      "role": "User"
    },
    {
      "id": 6,
      "name": "Ali Benmoussa",
      "profession": "Architect",
      "email": "a.benmoussa@design.dz",
      "phoneNumber": "0556789012",
      "role": "Moderator"
    },
    {
      "id": 7,
      "name": "Léa Dupont",
      "profession": "Journalist",
      "email": "l.dupont@news.media",
      "phoneNumber": "0777890123",
      "role": "User"
    },
    {
      "id": 8,
      "name": "Omar Sahraoui",
      "profession": "Financial Advisor",
      "email": "o.sahraoui@finance.dz",
      "phoneNumber": "0668901234",
      "role": "Admin"
    },
    {
      "id": 9,
      "name": "Sophia Müller",
      "profession": "Biologist",
      "email": "s.muller@science.edu",
      "phoneNumber": "0559012345",
      "role": "User"
    },
    {
      "id": 10,
      "name": "Erraid Mohamed",
      "profession": "Teacher",
      "email": "nm_djemai@esi.dz",
      "phoneNumber": "0776262511",
      "role": "Admin"
    },
      {
        "id": 11,
        "name": "Lina Chen",
        "profession": "Software Engineer",
        "email": "l.chen@techcorp.com",
        "phoneNumber": "0555123456",
        "role": "User"
      },
      {
        "id": 12,
        "name": "James Wilson",
        "profession": "Doctor",
        "email": "j.wilson@medcenter.org",
        "phoneNumber": "0777890123",
        "role": "Moderator"
      },
      {
        "id": 13,
        "name": "Amina Belkacem",
        "profession": "Architect",
        "email": "a.belkacem@design.dz",
        "phoneNumber": "0666234567",
        "role": "User"
      },
      {
        "id": 14,
        "name": "David Miller",
        "profession": "Marketing Manager",
        "email": "d.miller@adagency.com",
        "phoneNumber": "0556678901",
        "role": "Admin"
      },
      {
        "id": 15,
        "name": "Yasmin Khan",
        "profession": "Research Scientist",
        "email": "y.khan@science.edu",
        "phoneNumber": "0777345678",
        "role": "User"
      },
      {
        "id": 16,
        "name": "Karim Bensaïd",
        "profession": "Financial Analyst",
        "email": "k.bensaid@finance.dz",
        "phoneNumber": "0666456789",
        "role": "Moderator"
      },
      {
        "id": 17,
        "name": "Sophie Martin",
        "profession": "Graphic Designer",
        "email": "s.martin@creative.com",
        "phoneNumber": "0556789012",
        "role": "Technician"
      },
      {
        "id": 18,
        "name": "Omar Touati",
        "profession": "Civil Engineer",
        "email": "o.touati@construction.dz",
        "phoneNumber": "0777567890",
        "role": "Admin"
      }
  ])
  

  const handleEdit = (row) => {
    console.log("Edit:", row)
    // Your edit logic here
  }

  const handleDelete = (row) => {
    console.log("Delete:", row)
    // Your delete logic here
  }

   // State for storing data from API
   const [userData, setUserData] = useState({
    totalUsers: 0,
    maintenanceTeam: 0,
    administrators: 0,
    loading: true,
    error: null
  })

   

  // Generate stats cards data
 const stats = [
  {
    title: t('userList','cards','sub',1),
    count: userData.totalUsers,
    increase: 15,
    icon: <Users className="h-5 w-5 text-neutral-950 dark:text-white" />,
  },
  {
    title: t('userList','cards','sub',2),
    count: userData.maintenanceTeam,
    increase: 10,
    icon: <Settings className="h-5 w-5 text-neutral-950 dark:text-white" />,
  },
  {
    title: t('userList','cards','sub',3),
    count: userData.administrators,
    increase: 5,
    icon: <UserCog  className="h-5 w-5 text-neutral-950 dark:text-white" />,
  },
]

return (
  <div className="flex flex-col md:flex-row bg-neutral-50 dark:bg-neutral-990 h-full">
    <div>
      <Sidebar 
        activeItem={"users"}
      />
    </div>

    <div className="w-full px-4 py-4">
      
      <div>
      <div className='flex items-center gap-2 mb-8 text-neutral-950 dark:text-neutral-50'>
      {t('userList','path',1)} <ArrowRight2 size="14" color="#697689"/> {t('userList','path',2)}
        </div>
        <h1 className="text-2xl font-bold text-neutral-950 dark:text-neutral-50 mb-6">{t('userList','cards','titel')}</h1>
        
        
        
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card
                key={index}
                title={stat.title}
                count={stat.count}
                increase={stat.increase}
                icon={stat.icon}
              />
            ))}
          </div>
      </div>
      <DynamicTable 
        data={data}
        isDarkMode={isDarkMode}
        title={t('userList','searchbar','titel')}
        columnConfig={{
          id: { hidden: true },  // Hide ID column
          name: { title: t('userList','tablehead',1) },  // Custom title
          profession:{title: t('userList','tablehead',2)},
          email:{title:t('userList','tablehead',3)},
          phoneNumber:{title:t('userList','tablehead',4)},
          role:{title:t('userList','tablehead',5)},
        }}
        addButtonText={t('userList','searchbar','buttons',3)}
        dropdownFields={["role","profession"]} 
        onEdit={handleEdit}
        onDelete={handleDelete}
        styled={["role"]}        
      />
    </div>
  </div>
)
}


