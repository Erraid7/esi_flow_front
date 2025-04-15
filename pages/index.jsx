// pages/index.jsx
import Hero from './components/hero/pages';
import WhoCanUse from './components/users';
import FAQ from './components/faq/index';
import Nav from './components/navbar/index';
import Explor from './components/about/index';
import How from './components/guide/index';
import { useLanguage } from './translations/contexts/languageContext';
import edituser from './edit_user/index';
import UserCreateForm from './create_user/index';
import UserEditForm from './edit_user/index';



export default function Home() {
  const { t, toggleLanguage } = useLanguage();
  
  return (
    <div className=" w-full">
   
      <UserCreateForm />
  
      {/* add link to edit user page */}
     
    </div>
  );
}