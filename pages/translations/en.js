export const en = {
  common: {
    toggleLanguage: "Translate to French",
    actions: {
      close: "Close",
      save: "Save",
      cancel: "Cancel",
      edit: "Edit",
      delete: "Delete",
      copy: "Copy",
      "Copy to clipboard": "Copy to clipboard",
      "Clear filters": "Clear filters"
    },
    navigation: {
      "Previous record": "Previous record",
      "Next record": "Next record"
    },
    search: {
      "Search fields...": "Search fields...",
      "No matching fields": "No matching fields",
      "Try a different search term or filter": "Try a different search term or filter"
    },
    filters: {
      "All": "All",
      "IDs": "IDs",
      "Dates": "Dates",
      "Contact Info": "Contact Info",
      "Other": "Other"
    },
    boolean: {
      "Yes": "Yes",
      "No": "No",
      "True": "True",
      "False": "False"
    },
    status: {
      "Active": "Active",
      "Inactive": "Inactive",
      "Pending": "Pending",
      "Completed": "Completed"
    },
    errors: {
      "Something went wrong": "Something went wrong",
      "Please try again": "Please try again"
    }
  },
  login: {
    title: "Login",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Password",
    button: "Login",
    error: "Invalid credentials",
    welcome: "Welcome back",
    ph1: "Email",
    input1: "Email or phone number",
    ph2: "Password",
    input2: "Enter password",
    remember:"Remember me",
    forgot:"Forgot password?",
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
  dashboard: {
    tasks: {
      title: "My Tasks",                         // Mes Tâches
      taskId: "Task ID",                         // ID de la tâche
      report: "Report",                     // Description
      type: "Type",                              // Type
      status: "Status",                          // Statut
      deadline: "Deadline",                      // Date limite
      createdAt: "Created At",                   // Créé le
      requestId: "Request ID",                   // ID de la demande
      addButton: "Add Task",                     // Ajouter une tâche
      noTasks: "No tasks assigned to you"        // Aucune tâche ne vous a été assignée
    },
    technician: {
      title: "Technician Dashboard",
      mostFrequentIssues: "Most Frequent Issues",
      highPriority: "High priorty",
      mediumPriority: "Meduim priority",
      lowPriority: "Low priority",
      lastTaskProgress: "Last Task Progress",
      clickAndDiscover: "click and discover, notification here",
      makeReport: "Make a report",
      equipmentStatus : "Equipment Status",
      progress :  "here you progres in your task according to your status"
     
    },
    personal: {
      title: "Personal Dashboard",
      requestStatus: "Status of my accepted requests",
      requestStatuses: {
        completed: "Completed",
        pending: "Pending",
        toDo: "To Do",
        inProgress: "In Progress",
        canceled: "Canceled"
      },
      lastRequestProgress: "Last request Progress",
      clickAndDiscover: "click and discover, notification here",
      myNotification: "My notification",
      viewNotification: "view notification"
    },
    title: "ESI Flow Dashboard",
    overview: "Dashboard Overview",
    activeRequests: "Statistics",
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
        high: "repair",
        medium: "maintenance",
        low: "replacement",
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
    },
    sendMail: "Send Email Invitation",
    sendMailComment: "User will receive login credentials via email",
    requirePassword: "Require Password Change",
    requirePasswordComment: "User must change password on first login", 
    
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
      add: "Add Equipment",
      edit: "Edit Equipment"
    },
    sections: {
      equipmentInfo: "Equipment Information",
      recordDetails: "Record Details",
      maintenanceSchedule: "Maintenance Schedule"
    },
    fields: {
      code: "Inventory Code",
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
      descriptionPlaceholder: "Enter detailed description",
      codeComment: "Equipment identification code",
      image: "Equipment Image",
      picture: "Equipment Picture",
      imageHelp: "Upload an image of the equipment. If none is provided, the current image will be kept.",
      maintenanceInterval: "Automatic Maintenance Interval (days)",
      maintenanceIntervalPlaceholder: "e.g., 90 for maintenance every 3 months",
      maintenanceIntervalHelp: "Enter the number of days between regular maintenance checks",
      seasonalMonths: "Seasonal Maintenance Months",
      seasonalMonthsHelp: "Select months when seasonal maintenance should be performed"
    },
    actions: {
      create: "Create",
      update: "Update",
      cancel: "Cancel",
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
      statusRequired: "Status is required",
      maintenanceIntervalInvalid: "Maintenance interval must be a number"
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
    },
    loading: "Loading request data..."
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
      userError: "Failed to load users data",
      createBothSuccess: "Request and maintenance task created successfully!"
    },
    loading: "Loading task data..."
  },
  
  userList:{
    path:{
      1:"Dashboard",
      2:"User List"
    },
    cards:{
      titel:"User Management",
      sub:{
        1:"Total Users",
        2:"Maintenance Team",
        3:"Administrators"
      }
    },
    searchbar:{
      titel:"Users Table",
      placeholder:"Search...",
      buttons:{
        1:"Export Table",
        2:"Clear Filters",
        3:"Add User"
      }
    },
    tablehead:{
      1:"Full Name",
      2:"Profession",
      3:"E-mail",
      4:"Phone Number",
      5:"Role",
      6:"Actions",
      clearfilter:"Clear filter",
           // New translations for delete confirmation
     deleteConfirm : "Confirm Deletion",
     deleteDescription : "Are you sure you want to delete the user {name}? This action cannot be undone.",
     deleteUserDetails : "User Details",
     deleteUserName : "Name:",
     deleteUserEmail : "Email:",
     deleteUserRole : "Role:",
     deleteCancel : "Cancel",
     deleteConfirmButton : "Delete User",
     deleteError : "Failed to delete user"
    
    }
  },
  
  requestList:{
    path: {
      dashboard: "Dashboard",
      requests: "Maintenance Requests",
    },
    cards: {
      title: "Maintenance Request Management",
      totalRequests: "Total Requests",
      pendingRequests: "Pending Requests",
      completedRequests: "Completed Requests",
    },
    searchbar: {
      title: "Maintenance Request List",
      placeholder: "Search requests...",
      addButton: "Add Request",
      buttons: {
        export: "Export",
        clearFilters: "Clear Filters",
      },
    },
    columns: {
      id: "Request ID",
      title: "Title",
      location: "Location",
      requestedBy: "Requested By",
      urgencyLevel: "Urgency",
      status: "Status",
      createdAt: "Created At",
      inventoryCode : "Inventory Code",
      requestCode : "Request Code",
    },
    tablehead: {
      clearfilter: "Clear Filter",
    },
    toast: {
      fetchError: "Failed to load requests",
      deleteSuccess: "Request deleted successfully",
      deleteError: "Failed to delete request",
    },
    emptyState: "No requests found",
  },


 equipmentList: {
  deleteConfirm: "Confirm Deletion",
      path: {
        1: "Dashboard",
        2: "Equipment",
      },
      cards: {
        title: "Equipment Management",
        sub: {
          1: "Total Equipment",
          2: "Needs Maintenance",
          3: "Working",
          4: "Out of Service",
        },
      },
      tablehead: {
        1: "Inventory Code",
        2: "ID",
        3: "Type",
        4: "Category",
        5: "Location",
        6: "Acquisition date",
        7: "Status",
      },
      searchbar: {
        title: "Equipment Table",
        buttons: {
          1: "Search",
          2: "Reset",
          3: "Add Equipment",
        },
      },
    },
    tasksList: {
      path: {
        1: "Dashboard",
        2: "Tasks",
      },
      cards: {
        title: "Tasks Management",
        sub: {
          1: "Pending",
          2: "In Progress",
          3: "Completed",
          4: "To Do",
        },
      },
      tablehead: {
        1: "Task name",
        2: "Location",
        3: "Responsible",
        4: "Priority",
        5: "Deadline",
        6: "Status",
        7: "Type",
      },
      searchbar: {
        title: "Task Table",
        placeholder: "Enter text to search",
        buttons: {
          1: "Search",
          2: "Reset",
          3: "Add Task",
        },
      },
      status: {
        1: "Pending",
        2: "In Progress",
        3: "Completed",
        4: "To Do",
      },
      priority: {
        1: "Low",
        2: "Medium",
        3: "High",
      },
    },
  notifications: {
    title: "Notifications",
    unread: "unread",
    loading: "Loading notifications...",
    noNotifications: "No notifications found",
    checkBackLater: "Check back later for new notifications",
    clearSearch: "Clear search",
    searchPlaceholder: "Search notifications...",
    refresh: "Refresh notifications",
    markAsRead: "Mark as read",
    delete: "Delete notification",
    markAllAsRead: "Mark all as read",
    loadMore: "Load more",

    breadcrumb: {
      dashboard: "Dashboard",
      notifications: "Notifications"
    },

    filters: {
      title: "Filters",
      all: "All",
      unread: "Unread",
      requests: "Requests",
      tasks: "Tasks",
      system: "System"
    },

    groups: {
      today: "Today",
      yesterday: "Yesterday",
      thisWeek: "This Week"
    },

    timeFormat: {
      minutesAgo: "{{count}} minutes ago",
      hoursAgo: "{{count}} hours ago",
      daysAgo: "{{count}} days ago"
    },

    toast: {
      refreshSuccess: "Notifications refreshed successfully",
      fetchError: "Failed to fetch notifications",
      markedAsRead: "Notification marked as read",
      deleted: "Notification deleted",
      markedAllRead: "All notifications marked as read",
      loadingMore: "Loading more notifications...",
      noUnreadNotifications: "No unread notifications",
      updateError: "Failed to update notification",
      deleteError: "Failed to delete notification"
    },

    mockData: {
      welcome: "Welcome to ESI Flow",
      welcomeDesc: "Your account has been created successfully.",

      newRequest: "New Maintenance Request",
      newRequestDesc: "A new maintenance request has been submitted for the air conditioning unit in Building A.",

      requestRefused: "Request Refused",
      requestRefusedDesc: "Your maintenance request for the printer in Room 101 has been refused. Reason: Equipment scheduled for replacement next week.",

      requestAccepted: "Request Accepted",
      requestAcceptedDesc: "Your maintenance request for the server in Data Center B has been accepted. The equipment is now under maintenance.",

      taskAssigned: "New Task Assignment",
      taskAssignedDesc: "You have been assigned a new maintenance task for the HVAC system in Building C.",

      taskCompleted: "Task Completed",
      taskCompletedDesc: "Technician Ahmed has completed the maintenance task for the network switch in Server Room A.",

      requestFulfilled: "Request Fulfilled",
      requestFulfilledDesc: "Your maintenance request for the projector in Conference Room D has been completed. Please verify the equipment is working properly.",

      interventionUpdated: "Intervention Status Updated",
      interventionUpdatedDesc: "The status of intervention #49 has been updated from 'In Progress' to 'On Hold'. Reason: Waiting for replacement parts.",

      scheduledMaintenance: "Scheduled Maintenance",
      scheduledMaintenanceDesc: "Scheduled maintenance for all printers on Floor 2 will occur this weekend. Please save your work and turn off the equipment before leaving on Friday.",

      todayDeadline: "Due today",
      tomorrowDeadline: "Due tomorrow"
    }
  },
  // English translations (en.js)
  settings: {
    title: "Settings",
    breadcrumb: {
      dashboard: "Dashboard",
      settings: "Settings"
    },
    tabs: {
      general: "General Settings",
      user: "User Information",
      system: "System Information"
    },
    general: {
      systemPreferences: "System Preferences",
      darkMode: "Dark Mode",
      darkModeDescription: "Enable dark mode for a better viewing experience in low light environments.",
      language: "Language",
      languageDescription: "Change the language of the interface",
      notifications: "Notifications",
      emailNotifications: "Email Notifications",
      emailNotificationsDescription: "Receive important updates and notifications via email.",
      reminderNotifications: "Reminder Notifications",
      reminderNotificationsDescription: "Get reminders for upcoming tasks and deadlines.",
      advancedSettings: "Advanced Settings",
      dataSharing: "Data Sharing",
      dataSharingDescription: "Share anonymous usage data to help improve the platform."
    },
    user: {
      profilePicture: "Profile Picture",
      uploadPicture: "Click to upload profile picture",
      basicInformation: "Basic Information",
      fullName: "Full Name",
      email: "Email",
      emailComment: "Your email address will be used for account-related notifications.",
      phone: "Phone",
      phoneComment: "Your phone number will be used for account recovery and security purposes.",
      biography: "Biography",
      profession: "Profession",
      professionUpdate: "Update your professional role",
      role: "Role",
      roleUpdate: "Update your system role",
      roleDescription: "Your role determines what actions you can perform in the system.",
      accountSecurity: "Account Security",
      passwordInfo: "Leave the password fields empty if you don't want to change your password.",
      password: "Password",
      passwordPlaceholder: "Enter new password",
      passwordComment: "Password must be at least 8 characters with uppercase, numbers, and special characters.",
      confirmPassword: "Confirm Password",
      confirmPasswordPlaceholder: "Confirm new password"
    },
    system: {
      platformInformation: "Platform Information",
      platformDescription: "This section provides information about the current system version and technical details.",
      platformVersion: "Platform Version",
      serverEnvironment: "Server Environment",
      databaseVersion: "Database Version",
      lastUpdate: "Last Update",
      developmentTeam: "Development Team",
      projectLead: "Project Lead",
      backendDeveloper: "Backend Developer",
      leadDeveloper: "Lead Developer",
      uiDesigner: "UI/UX Designer",
      qaEngineer: "QA Engineer",
      supportInformation: "Support Information",
      technicalSupport: "Technical Support",
      documentation: "Documentation",
      madeWithLove: "Made with love by CUDA WIZARDS team"
    },
    actions: {
      saveSettings: "Save Settings",
      saveChanges: "Save Changes",
      saving: "Saving...",
      cancel: "Cancel"
    },
    validation: {
      passwordLength: "Password must be at least 8 characters",
      passwordComplexity: "Password must include uppercase, numbers, and special characters",
      passwordsMatch: "Passwords do not match"
    },
    toast: {
      generalSuccess: "General settings saved successfully",
      generalError: "Failed to save general settings",
      userSuccess: "User information updated successfully",
      userError: "Failed to update user information",
      formErrors: "Please fix the errors in the form",
      loadError: "Failed to load user data"
    }
  },
  // Add translations for the password reset component
  forgotPassword: {
    title: "Forgot Password",
    description: "Enter your email address and we'll send you a verification code to reset your password.",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email address",
    invalidEmail: "Please enter a valid email address",
    emailNotFound: "This email address is not registered in our system",
    cancelButton: "Cancel",
    continueButton: "Continue",
    sending: "Sending...",
  },
  verification: {
    title: "Verification Code",
    description: "We've sent a verification code to {email}. Please enter the code below.",
    incompleteCode: "Please enter the complete 6-digit verification code",
    invalidCode: "The verification code you entered is invalid or has expired",
    verifyButton: "Verify Code",
    verifying: "Verifying...",
    didNotReceive: "Didn't receive the code?",
    resendButton: "Resend Code",
    resendIn: "Resend code in",
    resending: "Resending...",
    codeSent: "A new verification code has been sent to your email",
    resendFailed: "Failed to resend verification code. Please try again.",
  },
  newPassword: {
    title: "Create New Password",
    description: "Please create a new password for your account. Make sure it's secure and easy to remember.",
    passwordLabel: "New Password",
    passwordPlaceholder: "Enter new password",
    confirmPasswordLabel: "Confirm Password",
    confirmPasswordPlaceholder: "Confirm your new password",
    passwordRequirements: "Your password must meet all the requirements below",
    passwordsDoNotMatch: "Passwords do not match",
    passwordTooShort: "Password must be at least 8 characters long",
    resetButton: "Reset Password",
    resetting: "Resetting...",
    resetFailed: "Failed to reset password. Please try again.",
    cancelButton: "Back",
    passwordStrength: "Password Strength",
    strengthEmpty: "Empty",
    strengthWeak: "Weak",
    strengthMedium: "Medium",
    strengthStrong: "Strong",
    minLength: "At least 8 characters",
    upperCase: "Uppercase letter",
    lowerCase: "Lowercase letter",
    number: "Number",
    specialChar: "Special character",
  },
  success: {
    title: "Success!",
    description: "Your password has been reset successfully. You can now log in with your new password.",
    backButton: "Back to Login",
  },
  // Report page translations
  reportPage: {
    path: {
      dashboard: "Dashboard",
      reports: "Reports",
    },
    title: "Reports",
    sections: {
      taskStats: "Task Statistics",
      tasks: "Tasks",
      equipmentStats: "Equipment Statistics",
      equipment: "Equipment",
      userStats: "User Statistics",
      users: "Users",
      requestStats: "Request Statistics",
      requests: "Requests",
    },
    stats: {
      pending: "Pending",
      inProgress: "In Progress",
      completed: "Completed",
      toDo: "To Do",
      totalEquipment: "Total Equipment",
      needsMaintenance: "Needs Maintenance",
      working: "Working",
      outOfService: "Out of Service",
      totalUsers: "Total Users",
      maintenanceTeam: "Maintenance Team",
      administrators: "Administrators",
      totalRequests: "Total Requests",
      pendingRequests: "Pending Requests",
      completedRequests: "Completed Requests",
    },
    tables: {
      tasks: {
        title: "Tasks Management",
        addButton: "Add Task",
        columns: {
          taskName: "Task Name",
          location: "Location",
          responsible: "Responsible",
          priority: "Priority",
          deadline: "Deadline",
          status: "Status",
        },
      },
      equipment: {
        title: "Equipment Management",
        addButton: "Add Equipment",
        columns: {
          inventoryCode: "Inventory Code",
          type: "Type",
          category: "Category",
          location: "Location",
          acquisitionDate: "Acquisition Date",
          status: "Status",
        },
      },
      users: {
        title: "User Management",
        addButton: "Add User",
        columns: {
          name: "Name",
          profession: "Profession",
          email: "Email",
          phoneNumber: "Phone Number",
          role: "Role",
        },
      },
      requests: {
        title: "Request Management",
        addButton: "Add Request",
        columns: {
          requestCode: "Request Code",
          title: "Title",
          location: "Location",
          requestedBy: "Requested By",
          urgencyLevel: "Urgency Level",
          status: "Status",
        },
      },
    },
    actions: {
      edit: "Edit",
      delete: "Delete",
      accept: "Accept",
      reject: "Reject",
      export: "Export",
      print: "Print",
      filter: "Filter",
    },
    notifications: {
      deleteConfirm: "Confirm Deletion",
      deleteSuccess: "Item deleted successfully",
      deleteError: "Failed to delete item",
      loadError: "Failed to load data",
      loading: "Loading data...",
    },
  },
  // Specific to RowDetailModal component
  rowDetails: {
    title: "Row Details",
    buttons: {
      "Close": "Close",
      "Edit": "Edit",
      "Export": "Export"
    },
    messages: {
      "No data available": "No data available",
      "Field copied to clipboard": "Field copied to clipboard"
    },
    fields: {
      // Common field names that might be used
      "id": "ID",
      "name": "Name",
      "email": "Email",
      "phone": "Phone",
      "address": "Address",
      "created_at": "Created At",
      "updated_at": "Updated At",
      "status": "Status",
      "description": "Description"
    }
  },

  // Date formatting
  dates: {
    formats: {
      short: "MM/DD/YYYY",
      long: "MMMM D, YYYY",
      time: "h:mm A"
    },
    relative: {
      "today": "Today",
      "yesterday": "Yesterday",
      "tomorrow": "Tomorrow",
      "days_ago": "{{count}} days ago",
      "in_days": "In {{count}} days"
    }
  }
}

export default function Placeholder() {
  return null;
}
