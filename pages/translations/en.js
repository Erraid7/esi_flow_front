export const en = {
  common: {
    toggleLanguage: "Translate to French"
  },
  login: {
    title: "Login",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    button: "Login",
    error: "Invalid credentials"
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
  dashboard: {
    title: "ESI Flow Dashboard",
    overview: "Dashboard Overview",
    activeRequests: "Active requests / tech/users",
    cards: {
      users: {
        title: "Number of users",
        count: "2.4k users",
        button: "View Trends",
      },
      technicians: {
        title: "Technician Number",
        count: "107 technicians",
        button: "View Details",
      },
      requests: {
        title: "Active requests",
        count: "99.7% this month",
        button: "View Report",
      },
    },
    charts: {
      priority: {
        title: "Priority Request",
        high: "High priority",
        medium: "Medium priority",
        low: "Low priority",
      },
      equipment: {
        title: "Equipment Status",
        cancelled: "Cancelled",
        inProgress: "In Progress",
        completed: "Completed",
        toDo: "To Do",
        pending: "Pending",
        button: "Manage equipment",
      },
      pieChart: {
        title: "Equipment Status",
        working: "Working",
        needMaintenance: "Need maintenance",
        outOfService: "Out of Service",
      },
    },
    notifications: {
      title: "My notification",
      button: "View notifications",
    },
    createUser: {
      title: "Create new user",
      description: "Click and discover notification here",
      button: "Create",
    },
    maintenance: {
      title: "Recent Maintenance Tasks",
      search: "Search tasks...",
      addButton: "Add New Task",
      columns: {
        name: "Task name",
        location: "Location",
        person: "Person",
        priority: "Priority",
        deadline: "Deadline",
        status: "Status",
      },
      noTasks: "No tasks found matching your filters",
      pagination: {
        showing: "Showing",
        to: "to",
        of: "of",
        results: "results",
        previous: "Previous",
        next: "Next",
      },
      perPage: {
        show: "Show",
        tasksPerPage: "tasks per page",
      },
    },
    sidebar: {
      dashboard: "Dashboard",
      requests: "Requests",
      equipment: "Equipment",
      users: "Users",
      reports: "Reports",
      notifications: "Notifications",
      settings: "Settings",
    },
  },
  
};