export const en = {
  common: {
    toggleLanguage: "Translate to French"
  },
  home:{
    navbar:{
      1:"Home",
      2:"About",
      3:"Guide",
      4:"Users",
      5:"FAQ",
      6:"Contact",
      button:"Log In"
    },
    hero: {
      title:{
        1:"Welcome to",
        2:"ESI",
        3: "Flow"
      },
      subtitle: "Track, Manage, Maintain - The ESI Flow Way !",
      description: "ESI Flow is your go-to solution for reporting and tracking technical issues at ESI. With an intuitive and seamless interface, stay informed about ongoing incidents and actively contribute to enhancing your academic environment.",
      button: "Log In"
    },
    discover: {
      title: "Discover ESI",
      about: "About ESI Flow",
      aboutDescription: "ESI Flow is a dedicated platform designed for students and staff at ESI, allowing them to efficiently report, track, and resolve technical issues within the institution. Our goal is to enhance communication, transparency, and responsiveness to technical problems.",
      mission: "Our Mission",
      missionDescription: "To simplify technical issue management by providing a centralized, real-time reporting system. With ESI Flow, every problem is handled swiftly, ensuring an optimal and uninterrupted learning environment for everyone."
    },
    howItWorks: {
      title: {
        1:"How ESI Flow",
        2:"Works",
      },
      
      description: "ESI Flow streamlines maintenance management by offering a structured, intuitive process for reporting issues, assigning tasks to technicians, and providing real-time notifications. It ensures transparency and responsiveness, with a user-friendly dashboard providing an overview of ongoing and completed interventions.",
      button: "Download The Guide"
    },
    users: {
        title: "Who Can Use",
        roles: {
          personal:{
            1:"Personal",
            2:"Staff members, students, and teachers can quickly report technical issues, track the status of their requests, and receive real-time updates on their resolution.",
          } ,
          administrator:{
            1:"Administrator",
            2:"Administrators handle reported issues, delegate tasks to technicians, monitor platform activity, and facilitate seamless communication between users and the technical team to ensure efficient problem resolution at ESI.",
          } ,
          technician:{
            1:"Technician",
            2:"Technicians diagnose and resolve reported issues, update their status, implement solutions, and ensure a reliable and efficient environment for students, teachers, and staff at ESI.",
          } ,
          
        }
      },
    faq: {
      title:{
        1:"Discover ESI",
        2:"Flow FAQs"
      },
      questions: [
        {
          question: "What is ESI Flow?",
          answer: "ESI Flow is a platform that allows students and staff to report, track, and stay updated on technical issues within ESI."
        },
        {
          question: "Who can use ESI Flow?",
          answer: "Students, administrative staff, and technicians can use ESI Flow."
        },
        {
          question: "How do I report a technical problem?",
          answer: "You can report an issue through the ESI Flow platform by filling out a simple form describing the problem."
        },
        {
          question: "Can I track the status of my report?",
          answer: "Yes, ESI Flow provides real-time tracking so you can monitor the progress of your reported issues."
        }
      ],
      contact: {
        email: "esiflow@esi.dz",
        phone: "+213 (0) 555 55 55 55",
        button: "Contact"
      }
    }
  },
  login:{
    title: "Welcome back",
    ph1: "Email",
    input1: "Email or phone number",
    ph2: "Password",
    input2: "Enter password",
    remember:"Remember me",
    forgot:"Forgot password?",
    button:"Sign in",
  },
  // Add translations for UserEditForm component
  userEdit: {
    password: {
      tooWeak: "Too weak",
      weak: "Weak",
      fair: "Fair",
      good: "Good",
      strong: "Strong",
      strength: "Strength:"
    },
    breadcrumb: {
      users: "Users",
      edit: "Edit User",
      create: "Create User"
    },
    title: "Edit User",
    sections: {
      basicInfo: "Basic Information",
      accountSetup: "Account Setup"
    },
    fields: {
      fullName: "Full Name",
      email: "Email Address",
      emailComment: "Changing the email will require a confirmation code*",
      phone: "Phone Number",
      phoneComment: "Changing the Phone Number will require a confirmation code*",
      biography: "Biography",
      profession: "Profession",
      professionUpdate: "Update the profession of user",
      professionCreate: "Assign user to specific profession",
      role: "Role & Permissions",
      roleUpdate: "Update the role of user",
      roleCreate: "Assign user to specific role",
      roleDescription: "Admin role grants full access to all system features including user management, reports, and system configuration.",
      password: "Password",
      passwordPlaceholder: "Enter password",
      passwordComment: "Password must be at least 8 characters with numbers and special characters",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm password"
    },
    placeholders: {
      fullName: "Enter full name",
      email: "Enter email address",
      phone: "Enter phone number",
    },
    passwordInfo: "Changing the Password will require a confirmation code sent to your email.*",
    sendMail: "Send Email Invitation",
    sendMailComment: "User will receive login credentials via email.",
    requirePassword:"Require Password Change",
    requirePasswordComment: "User must change password on first login.",
    actions: {
      save: "Save Changes",
      create: "Create User",
      saving: "Saving Changes...",
      cancel: "Cancel"
    },
    toast: {
      success: "User information updated successfully",
      error: "Please fix the errors in the form"
    },
    validation: {
      requiredField: "{field} is required",
      validEmail: "Valid email is required",
      phoneFormat: "Phone should be in format (XXX) XXX-XXXX",
      passwordLength: "Password must be at least 8 characters",
      passwordComplexity: "Password must include uppercase, numbers, and special characters",
      passwordsMatch: "Passwords do not match"
    }
  },
  // Add translations for SideNavbar
  sideNav: {
    items: {
      dashboard: "Dashboard",
      requests: "Requests",
      equipment: "Equipment",
      users: "Users",
      reports: "Reports",
      notifications: "Notifications",
      settings: "Settings"
    },
    logout: "Logout",
    personal: "Personal"
  }
};