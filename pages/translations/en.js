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
        },
        {
          question: "How do I contact support?",
          answer: "You can reach out to our support team via the contact information provided on the ESI Flow platform."
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
      role: "Role & Permissions",
      roleUpdate: "Update the role of user",
      roleDescription: "Admin role grants full access to all system features including user management, reports, and system configuration.",
      password: "Password",
      passwordPlaceholder: "Enter password",
      passwordComment: "Password must be at least 8 characters with numbers and special characters",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm password"
    },
    passwordInfo: "Changing the Password will require a confirmation code sent to your email.*",
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
      requiredField: "this field is required",
      validEmail: "Valid email is required",
      phoneFormat: "Phone should be in format (XXX) XXX-XXXX",
      passwordLength: "Password must be at least 8 characters",
      passwordComplexity: "Password must include uppercase, numbers, and special characters",
      passwordsMatch: "Passwords do not match"
    }
  },
  // Add translations for side nav component
  sideNav: {
    items: {
      dashboard: "Dashboard",
      requests: "Requests",
      tasks: "Tasks",
      equipment: "Equipment",
      users: "Users",
      reports: "Reports",
      notifications: "Notifications",
      settings: "Settings",
    },
    logout: "Logout",
    personal: "Personal",
    roles: {
      admin: "Administrator",
      technician: "Technician",
      user: "User",
    },
  },
  // Add this to your existing en object
  equipmentEdit: {
    breadcrumb: {
      equipment: "Equipment",
      add: "Add Record",
      edit: "Edit Equipment"
    },
    title: {
      add: "Add Maintenance Record",
      edit: "Edit Equipment"
    },
    sections: {
      equipmentInfo: "Equipment Information",
      recordDetails: "Record Details"
    },
    fields: {
      code: "Code Inventaire",
      codePlaceholder: "Enter code",
      type: "Type",
      typePlaceholder: "Select equipment type",
      category: "Category",
      categoryPlaceholder: "Select equipment category",
      acquisition: "Acquisition Date",
      commissioning: "Date of commissioning",
      location: "Location",
      locationPlaceholder: "Specify location",
      status: "Status",
      statusPlaceholder: "Select status",
      description: "Description",
      descriptionPlaceholder: "Enter detailed description of maintenance performed"
    },
    typeOptions: [
      "Mechanical", 
      "Electrical", 
      "Hydraulic", 
      "Pneumatic", 
      "Electronic", 
      "Other"
    ],
    categoryOptions: [
      "Production", 
      "Maintenance", 
      "Safety", 
      "Quality Control", 
      "Logistics", 
      "Office"
    ],
    statusOptions: [
      "Operational", 
      "Under Maintenance", 
      "Out of Service", 
      "Pending Installation", 
      "Retired"
    ],
    actions: {
      create: "Create",
      update: "Update",
      cancel: "cancel",
      saving: "Saving...",
      creating: "Creating...",
      updating: "Updating..."
    },
    toast: {
      addSuccess: "Equipment added successfully",
      updateSuccess: "Equipment updated successfully",
      error: "Please fill in all required fields",
      loadError: "Failed to load equipment data"
    },
    validation: {
      requiredField: "{field} is required",
      codeRequired: "Inventory code is required",
      typeRequired: "Equipment type is required",
      categoryRequired: "Category is required",
      acquisitionRequired: "Acquisition date is required",
      commissioningRequired: "Commissioning date is required",
      locationRequired: "Location is required",
      statusRequired: "Status is required"
    },
    loading: "Loading equipment data..."
  },
  // Add translations for the request form component
  requestForm: {
    editTitle: "Edit Request",
    breadcrumb: {
      dashboard: "Dashboard",
      myRequests: "My Requests",
      newRequest: "New Request",
      editRequest: "Edit Request"
    },
    title: "Request Form",
    header: {
      title: "Reporting Form",
      description: "Please fill in the information below to submit your service request.",
      editTitle: "Edit Request Form",
      editDescription: "Update the information for this service request."
    },
    metadata: {
      requestId: "Request ID",
      createdAt: "Created",
      lastUpdated: "Last Updated",
      currentStatus: "Status"
    },
    fields: {
      requestTitle: {
        label: "Request Title",
        placeholder: "Ex: Power outage in room 302"
      },
      location: {
        label: "Location",
        selectPlaceholder: "Select a location"
      },
      equipmentCode: {
        label: "Equipment Code",
        placeholder: "Ex: 123456",
        noEquipmentMessage: "No equipment found for this location",
        noMatchMessage: "No equipment matches your search"
      },
      description: {
        label: "Problem Description",
        placeholder: "Describe the problem in detail..."
      },
      urgencyLevel: {
        label: "Urgency Level",
        placeholder: "Select urgency level"
      },
      photos: {
        label: "Photos (optional)",
        addButton: "Add photos",
        maxPhotos: "Maximum {count} photos"
      },
      status: {
        label: "Status",
        placeholder: "Select status"
      }
    },
    urgencyLevels: {
      low: "Low",
      medium: "Medium",
      high: "High"
    },
    statusOptions: {
      pending: "Pending",
      inProgress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled"
    },
    actions: {
      submit: "Submit Request",
      submitting: "Submitting...",
      cancel: "Cancel",
      update: "Update Request",
      updating: "Updating..."
    },
    validation: {
      titleRequired: "Request title is required",
      locationRequired: "Location is required",
      descriptionRequired: "Problem description is required",
      urgencyLevelRequired: "Urgency level is required",
      statusRequired: "Status is required",
      equipmentRequired: "Equipment selection is required"
    },
    toast: {
      success: "Request submitted successfully",
      error: "Please fill in all required fields",
      submitError: "Failed to submit request",
      updateSuccess: "Request updated successfully",
      updateError: "Failed to update request",
      fetchError: "Failed to load request data",
      equipmentFetchError: "Failed to load equipment data"
    }
  },
  // Add translations for task forms
  taskForm: {
    breadcrumb: {
      dashboard: "Dashboard",
      tasks: "Tasks",
      addTask: "Add New Task",
      editTask: "Edit Task"
    },
    title: {
      add: "Add New Task",
      edit: "Edit Task"
    },
    metadata: {
      taskId: "Task ID",
      createdAt: "Created",
      lastUpdated: "Last Updated",
      createdBy: "Created By"
    },
    sections: {
      taskDetails: "Task Details",
      requestInfo: "Request Information"
    },
    fields: {
      name: {
        label: "Task Name",
        placeholder: "Enter task name"
      },
      assignTo: {
        label: "Assign To",
        placeholder: "Select personnel or team",
        noPersonnelMessage: "No personnel available",
        noMatchMessage: "No matching personnel found"
      },
      taskType: {
        label: "Task Type",
        placeholder: "Select task type"
      },
      deadline: {
        label: "Deadline"
      },
      status: {
        label: "Status",
        placeholder: "Select status"
      },
      report: {
        label: "Report",
        placeholder: "Provide detailed description of the maintenance task"
      },
      equipmentCode: {
        label: "Equipment Code",
        placeholder: "Ex: 123456",
        noEquipmentMessage: "No equipment available",
        noMatchMessage: "No matching equipment found"
      },
      location: {
        label: "Location",
        placeholder: "Specify location",
        comment: "Filter equipment by location or leave empty"
      },
      description: {
        label: "Description",
        placeholder: "Provide detailed description of the maintenance task"
      },
      priority: {
        label: "Priority",
        placeholder: "Select priority"
      },
      photos: {
        label: "Photos (optional)",
        addButton: "Add photos",
        maxPhotos: "Maximum 3 photos"
      }
    },
    taskTypes: [
      "Maintenance",
      "Repair",
      "Installation",
    ],
    statusOptions: [
      "To Do",
      "In Progress",
      "Pending",
      "Completed",
      "Cancelled"
    ],
    priorityOptions: [
      "Low",
      "Medium",
      "High",
      "Critical"
    ],
    actions: {
      create: "Create",
      update: "Update",
      cancel: "Cancel",
      creating: "Creating...",
      updating: "Updating..."
    },
    validation: {
      nameRequired: "Task name is required",
      assignToRequired: "Assignment is required",
      statusRequired: "Status is required",
      deadlineRequired: "Deadline is required",
      equipmentCodeRequired: "Equipment code is required",
      priorityRequired: "Priority is required",
      taskTypeRequired: "Task type is required",
      locationRequired: "Location is required"
    },
    toast: {
      createSuccess: "Task created successfully",
      updateSuccess: "Task updated successfully",
      error: "Please fill in all required fields",
      loadError: "Failed to load task data",
      equipmentError: "Failed to load equipment data",
      userError: "Failed to load users data"
    },
    loading: "Loading task data..."
  }
};