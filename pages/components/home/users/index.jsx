"use client";
import { useLanguage } from '@/pages/translations/contexts/languageContext';
import { useDarkMode } from '../../../darkLightMode/darkModeContext';
import RoleCard from './RoleCard';


export default function WhoCanUseESIFlow() {
    const { t, toggleLanguage } = useLanguage();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
  const roles = [
    {
      id: "personal",
      title: t('home' , 'users' ,'roles', 'personal',1),
      icon: isDarkMode ? (
        <img src="home/users/personel-dark.svg"></img>
      ) : (
        <img src="home/users/shape.svg"></img>
      ),
      description: t('home' , 'users' ,'roles', 'personal',2)
    },
    {
      id: "administrator",
      title: t('home' , 'users' ,'roles', 'administrator',1),
      icon: isDarkMode ? (
        <img src="home/users/admin-dark.svg"></img>
      ) : (
        <img src="home/users/shape-1.svg"></img>
      ),
      description:t('home' , 'users' ,'roles', 'administrator',2)
    },
    {
      id: "technician",
      title: t('home' , 'users' ,'roles', 'technician',1),
      icon: isDarkMode ? (
        <img src="home/users/tech-dark.svg"></img>
      ) : (
        <img src="home/users/shape-2.svg"></img>
      ),
      description: t('home' , 'users' ,'roles', 'technician',2),
    }
  ];
  return (
    <section id="users" className="my-8 px-4 md:px-20  flex flex-col gap-8 bg-neutral-50 dark:bg-neutral-990 pb-12">
      
        <h1 className="text-[50px] md:text-[80px] font-russo text-neutral-950 dark:text-neutral-100 leading-tight">
        {t('home' , 'users' , 'title')}<br />
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

