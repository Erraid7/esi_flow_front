export const fr = {
  common: {
    toggleLanguage: "Traduire en anglais",
  },
  login: {
    title: "Connexion",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Mot de passe",
    button: "Connexion",
    error: "Identifiants invalides",
    welcome: "Bienvenue",
    ph1: "Email",
    input1: "Email ou numéro de téléphone",
    ph2: "Mot de passe",
    input2: "Entrer le mot de passe",
    remember: "Se souvenir de moi",
    forgot: "Mot de passe oublié ?",
  },
  home: {
    navbar: {
      1: "Accueil",
      2: "À propos",
      3: "Guide",
      4: "Utilisateurs",
      5: "FAQ",
      6: "Contact",
      button: "Se connecter",
    },
    hero: {
      title: {
        1: "Bienvenue sur",
        2: "ESI",
        3: "Flow",
      },
      subtitle: "Anticipez, signalez, résolvez – La maintenance repensée",
      description:
        "ESI Flow est votre solution incontournable pour signaler et suivre les problèmes techniques à l'ESI. Grâce à une interface fluide et intuitive, restez informé des situations techniques en cours et contribuez activement à l'amélioration de votre environnement académique.",
      button: "Connectez-vous",
    },
    discover: {
      title: "Explorez ESI",
      about: "À Propos d'ESI Flow",
      aboutDescription:
        "ESI Flow est une plateforme dédiée aux étudiants et au personnel de l'ESI, conçue pour signaler, suivre et résoudre efficacement les problèmes techniques. Notre objectif est de renforcer la communication, la transparence et la réactivité face aux incidents techniques.",
      mission: "Notre Engagement",
      missionDescription:
        "Faciliter la gestion des problèmes techniques grâce à un système centralisé et en temps réel. Avec ESI Flow, chaque problème est traité rapidement, garantissant un environnement d'apprentissage fluide et optimisé pour tous.",
    },
    howItWorks: {
      title: {
        1: "Approche D'ESI",
        2: "Flow",
      },
      description:
        "ESI Flow facilite la gestion de la maintenance en organisant les signalements, en automatisant l'attribution des tâches aux techniciens et en envoyant des notifications en temps réel. Son tableau de bord interactif offre une vue d'ensemble claire des interventions, garantissant transparence et réactivité.",
      button: "Téléchargez le guide",
    },
    users: {
      title: "À qui est destiné",
      roles: {
        personal: {
          1: "Personnel",
          2: "Le personnel, les étudiants et les enseignants ont la possibilité de signaler facilement les problèmes techniques, de suivre l'avancement de leurs demandes et de recevoir des mises à jour en temps réel sur leur résolution.",
        },
        administrator: {
          1: "Administrateur",
          2: "Les administrateurs assurent la gestion des problèmes signalés, assignent les tâches aux techniciens, supervisent l'activité de la plateforme et facilitent la communication entre les utilisateurs et l'équipe technique afin d'assurer une résolution efficace des anomalies à l'ESI.",
        },
        technician: {
          1: "Technicien",
          2: "Les techniciens diagnostiquent et traitent les problèmes signalés, actualisent leur statut, déploient des solutions adaptées et garantissent un environnement stable et performant pour les étudiants, les enseignants et le personnel de l'ESI.",
        },
      },
    },
    faq: {
      title: {
        1: "FAQ d'ESI",
        2: "Flow",
      },
      questions: [
        {
          question: "Qu'est-ce qu'ESI Flow ?",
          answer:
            "ESI Flow est une plateforme permettant aux étudiants et au personnel de signaler, suivre et rester informés des anomalies au sein de l'ESI.",
        },
        {
          question: "Qui peut utiliser ESI Flow ?",
          answer: "Les étudiants, le personnel administratif et les techniciens peuvent utiliser ESI Flow.",
        },
        {
          question: "Comment signaler un problème technique ?",
          answer:
            "Vous pouvez signaler un problème via la plateforme ESI Flow en remplissant un formulaire simple décrivant l'incident.",
        },
        {
          question: "Puis-je suivre l'état de mon rapport ?",
          answer: "Oui, ESI Flow permet de suivre en temps réel l'avancement des problèmes signalés.",
        },
        {
          question: "Comment contacter le support technique ?",
          answer: "Vous pouvez contacter le support technique via la plateforme ESI Flow ou par email à l'adresse fournie.",
        }
      ],
      contact: {
        email: "esiflow@esi.dz",
        phone: "+213 (0) 555 55 55 55",
        button: "Contact",
      },
    },
  },
  dashboard: {
    tasks: {
      title: "Mes Tâches",
      taskId: "ID de la tâche",
      report: "Rapport",
      type: "Type",
      status: "Statut",
      deadline: "Date limite",
      createdAt: "Créé le",
      requestId: "ID de la demande",
      addButton: "Ajouter une tâche",
      noTasks: "Aucune tâche ne vous a été assignée"
    },
    
    technician: {
      title: "Tableau de bord du technicien",
      mostFrequentIssues: "Problèmes les plus fréquents",
      highPriority: "Haute priorité",
      mediumPriority: "Priorité moyenne",
      lowPriority: "Faible priorité",
      lastTaskProgress: "Progression de la dernière tâche",
      clickAndDiscover: "Cliquez et découvrez, notification ici",
      makeReport: "Faire le rapport",
      equipmentStatus : "État de l'équipement",
      progress : "Voici votre progression dans la tâche selon votre statut",
    },
  
    personal: {
      title: "Tableau de bord personnel",
      requestStatus: "État de mes demandes",
      requestStatuses: {
        completed: "Terminé",
        pending: "En attente",
        toDo: "À faire",
        inProgress: "En cours",
        canceled: "Annulé"
      },
      lastRequestProgress: "Progression de la dernière demande",
      clickAndDiscover: "Cliquez et découvrez, notification ici",
      myNotification: "Mes notifications",
      viewNotification: "Voir les notifications"
    },
    title: "Tableau de Bord ESI Flow",
    overview: "Aperçu du Tableau de Bord",
    activeRequests: "Stastistiques",
    cards: {
      users: {
        title: "Nombre d'utilisateurs",
        count: "2,4k utilisateurs",
        button: "Voir les Tendances",
      },
      technicians: {
        title: "Nombre de Techniciens",
        count: "107 techniciens",
        button: "Voir les Détails",
      },
      requests: {
        title: "Demandes actives",
        count: "99,7% ce mois-ci",
        button: "Voir le Rapport",
      },
    },
    charts: {
      priority: {
        title: "Demandes par Priorité",
        high: "Haute priorité",
        medium: "Priorité moyenne",
        low: "Basse priorité",
      },
      equipment: {
        title: "État des Équipements",
        cancelled: "Annulé",
        inProgress: "En cours",
        completed: "Terminé",
        toDo: "À faire",
        pending: "En attente",
        button: "Gérer les équipements",
      },
      pieChart: {
        title: "État des Équipements",
        working: "Fonctionnel",
        needMaintenance: "Besoin de maintenance",
        outOfService: "Hors service",
      },
    },
    notifications: {
      title: "Mes notifications",
      button: "Voir les notifications",
    },
    createUser: {
      title: "Créer un nouvel utilisateur",
      description: "Cliquez et découvrez les notifications ici",
      button: "Créer",
    },
    maintenance: {
      title: "Tâches de Maintenance Récentes",
      search: "Rechercher des tâches...",
      addButton: "Ajouter une Nouvelle Tâche",
      columns: {
        name: "Nom de la tâche",
        location: "Emplacement",
        person: "Personne",
        priority: "Priorité",
        deadline: "Échéance",
        status: "Statut",
      },
      noTasks: "Aucune tâche trouvée correspondant à vos filtres",
      pagination: {
        showing: "Affichage de",
        to: "à",
        of: "sur",
        results: "résultats",
        previous: "Précédent",
        next: "Suivant",
      },
      perPage: {
        show: "Afficher",
        tasksPerPage: "tâches par page",
      },
    },
    sidebar: {
      dashboard: "Tableau de Bord",
      requests: "Demandes",
      equipment: "Équipements",
      users: "Utilisateurs",
      reports: "Rapports",
      notifications: "Notifications",
      settings: "Paramètres",
    },
  },
  // Traductions pour le composant UserEditForm
  userEdit: {
    password: {
      tooWeak: "Très faible",
      weak: "Faible",
      fair: "Moyen",
      good: "Bon",
      strong: "Fort",
      strength: "Force :"
    },
    breadcrumb: {
      users: "Utilisateurs",
      edit: "Modifier l'utilisateur",
      create: "Créer un utilisateur"
    },
    title: "Modifier l'utilisateur",
    sections: {
      basicInfo: "Informations de base",
      accountSetup: "Configuration du compte"
    },
    fields: {
      fullName: "Nom complet",
      email: "Adresse email",
      emailComment: "La modification de l'email nécessitera un code de confirmation*",
      phone: "Numéro de téléphone",
      phoneComment: "La modification du numéro de téléphone nécessitera un code de confirmation*",
      biography: "Biographie",
      profession: "Profession",
      professionUpdate: "Mettre à jour la profession de l'utilisateur",
      role: "Rôle et permissions",
      roleUpdate: "Mettre à jour le rôle de l'utilisateur",
      roleDescription: "Le rôle d'administrateur donne un accès complet à toutes les fonctionnalités du système, y compris la gestion des utilisateurs, les rapports et la configuration du système.",
      password: "Mot de passe",
      passwordPlaceholder: "Entrez le mot de passe",
      passwordComment: "Le mot de passe doit comporter au moins 8 caractères avec des chiffres et des caractères spéciaux",
      confirmPassword: "Confirmer le mot de passe",
      confirmPasswordPlaceholder: "Confirmer le mot de passe"
    },
    passwordInfo: "La modification du mot de passe nécessitera un code de confirmation envoyé à votre email.*",
    actions: {
      save: "Enregistrer",
      create: "Créer un utilisateur",
      saving: "en cours...",
      cancel: "Annuler"
    },
    toast: {
      success: "Informations utilisateur mises à jour avec succès",
      error: "Veuillez corriger les erreurs dans le formulaire"
    },
    validation: {
      requiredField: "le champs est requis",
      validEmail: "Un email valide est requis",
      phoneFormat: "Le téléphone doit être au format (XXX) XXX-XXXX",
      passwordLength: "Le mot de passe doit comporter au moins 8 caractères",
      passwordComplexity: "Le mot de passe doit inclure des majuscules, des chiffres et des caractères spéciaux",
      passwordsMatch: "Les mots de passe ne correspondent pas"
    },
    sendMail: "Envoyer une invitation par e-mail",
    sendMailComment: "L'utilisateur recevra ses identifiants de connexion par e-mail",
    requirePassword: "Exiger un changement de mot de passe",
    requirePasswordComment: "L'utilisateur devra changer son mot de passe lors de la première connexion",    
  },
  // Traductions pour SideNavbar
  sideNav: {
    items: {
      dashboard: "Tableau de bord",
      requests: "Demandes",
      tasks: "Tâches",
      equipment: "Équipement",
      users: "Utilisateurs",
      reports: "Rapports",
      notifications: "Notifications",
      settings: "Paramètres",
    },
    logout: "Déconnexion",
    personal: "Personnel",
    roles: {
      admin: "Administrateur",
      technician: "Technicien",
      user: "Utilisateur",
    }
  },
  // Add this to your fr object
  equipmentEdit: {
    breadcrumb: {
      equipment: "Équipement",
      add: "Ajouter un enregistrement",
      edit: "Modifier l'équipement"
    },
    title: {
      add: "Ajouter un équipement",
      edit: "Modifier l'équipement"
    },
    sections: {
      equipmentInfo: "Informations sur l'équipement",
      recordDetails: "Détails de l'enregistrement",
      maintenanceSchedule: "Calendrier de maintenance"
    },
    fields: {
      code: "Code d'inventaire",
      codePlaceholder: "Entrez le code",
      type: "Type",
      typePlaceholder: "Sélectionnez le type d'équipement",
      category: "Catégorie",
      categoryPlaceholder: "Sélectionnez la catégorie d'équipement",
      acquisition: "Date d'acquisition",
      commissioning: "Date de mise en service",
      location: "Emplacement",
      locationPlaceholder: "Précisez l'emplacement",
      status: "État",
      statusPlaceholder: "Sélectionnez l'état",
      description: "Description",
      descriptionPlaceholder: "Entrez une description détaillée",
      codeComment: "Code d'identification de l'équipement",
      image: "Image de l'équipement",
      picture: "Photo de l'équipement",
      imageHelp: "Téléchargez une image de l'équipement. Si aucune n'est fournie, l'image actuelle sera conservée.",
      maintenanceInterval: "Intervalle de maintenance automatique (jours)",
      maintenanceIntervalPlaceholder: "ex., 90 pour une maintenance tous les 3 mois",
      maintenanceIntervalHelp: "Entrez le nombre de jours entre les vérifications de maintenance régulières",
      seasonalMonths: "Mois de maintenance saisonnière",
      seasonalMonthsHelp: "Sélectionnez les mois où la maintenance saisonnière doit être effectuée"
    },
    actions: {
      create: "Créer",
      update: "Mettre à jour",
      cancel: "Annuler",
      saving: "Enregistrement...",
      creating: "Création...",
      updating: "Mise à jour..."
    },
    toast: {
      addSuccess: "Équipement ajouté avec succès",
      updateSuccess: "Équipement mis à jour avec succès",
      error: "Veuillez remplir tous les champs obligatoires",
      loadError: "Échec du chargement des données d'équipement"
    },
    validation: {
      requiredField: "{field} est requis",
      codeRequired: "Le code d'inventaire est requis",
      typeRequired: "Le type d'équipement est requis",
      categoryRequired: "La catégorie est requise",
      acquisitionRequired: "La date d'acquisition est requise",
      commissioningRequired: "La date de mise en service est requise",
      locationRequired: "L'emplacement est requis",
      statusRequired: "L'état est requis",
      maintenanceIntervalInvalid: "L'intervalle de maintenance doit être un nombre"
    },
    loading: "Chargement des données d'équipement..."
  },
  // Translations for the request form
  requestForm: {
    editTitle: "Modifier la demande",
    breadcrumb: {
      dashboard: "Tableau de bord",
      myRequests: "Mes demandes",
      newRequest: "Nouvelle demande",
      editRequest: "Modifier la demande"
    },
    title: "Formulaire de demande",
    header: {
      title: "Formulaire de signalement",
      description: "Veuillez remplir les informations ci-dessous pour soumettre votre demande d'intervention.",
      editTitle: "Formulaire de modification de demande",
      editDescription: "Mettez à jour les informations pour cette demande d'intervention."
    },
    metadata: {
      requestId: "ID de la demande",
      createdAt: "Créée le",
      lastUpdated: "Dernière mise à jour",
      currentStatus: "Statut"
    },
    fields: {
      requestTitle: {
        label: "Titre de la demande",
        placeholder: "Ex: Panne d'électricité dans la salle 302"
      },
      location: {
        label: "Localisation",
        placeholder: "Ex: Bâtiment A, Étage 3, Salle 302",
        selectPlaceholder: "Sélectionnez un emplacement"
      },
      equipmentCode: {
        label: "Code d'équipement",
        placeholder: "Ex: 123456",
        noEquipmentMessage: "Aucun équipement trouvé pour cet emplacement",
        noMatchMessage: "Aucun équipement ne correspond à votre recherche"
      },
      description: {
        label: "Description du problème",
        placeholder: "Décrivez le problème rencontré en détail..."
      },
      urgencyLevel: {
        label: "Niveau d'urgence",
        placeholder: "Sélectionnez un niveau d'urgence"
      },
      photos: {
        label: "Photos (optionnel)",
        addButton: "Ajouter des photos",
        maxPhotos: "Maximum {count} photos"
      },
      status: {
        label: "Statut",
        placeholder: "Sélectionnez un statut"
      }
    },
    urgencyLevels: {
      low: "Faible",
      medium: "Moyen",
      high: "Élevé"
    },
    statusOptions: {
      pending: "En attente",
      inProgress: "En cours",
      completed: "Terminé",
      cancelled: "Annulé"
    },
    actions: {
      submit: "Soumettre la demande",
      submitting: "Soumission...",
      cancel: "Annuler",
      update: "Mettre à jour la demande",
      updating: "Mise à jour..."
    },
    validation: {
      titleRequired: "Le titre de la demande est requis",
      locationRequired: "La localisation est requise",
      descriptionRequired: "La description du problème est requise",
      urgencyLevelRequired: "Le niveau d'urgence est requis",
      statusRequired: "Le statut est requis",
      equipmentRequired: "La sélection d'équipement est requise"
    },
    toast: {
      success: "Demande soumise avec succès",
      error: "Veuillez remplir tous les champs obligatoires",
      submitError: "Échec de la soumission de la demande",
      updateSuccess: "Demande mise à jour avec succès",
      updateError: "Échec de la mise à jour de la demande",
      fetchError: "Échec du chargement des données de la demande",
      equipmentFetchError: "Échec du chargement des données d'équipement"
    },
    loading: "Chargement des données de la demande..."
  },
  // Add translations for task forms
  taskForm: {
    breadcrumb: {
      dashboard: "Tableau de bord",
      tasks: "Tâches",
      addTask: "Ajouter une nouvelle tâche",
      editTask: "Modifier la tâche"
    },
    title: {
      add: "Ajouter une nouvelle tâche",
      edit: "Modifier la tâche"
    },
    metadata: {
      taskId: "ID de la tâche",
      createdAt: "Créée le",
      lastUpdated: "Dernière mise à jour",
      createdBy: "Créée par"
    },
    sections: {
      taskDetails: "Détails de la tâche",
      requestInfo: "Informations de la demande"
    },
    fields: {
      name: {
        label: "Nom de la tâche",
        placeholder: "Entrez le nom de la tâche"
      },
      assignTo: {
        label: "Assigner à",
        placeholder: "Sélectionnez le personnel ou l'équipe",
        noPersonnelMessage: "Aucun personnel disponible",
        noMatchMessage: "Aucun personnel correspondant trouvé"
      },
      taskType: {
        label: "Type de tâche",
        placeholder: "Sélectionnez le type de tâche"
      },
      deadline: {
        label: "Date limite"
      },
      status: {
        label: "Statut",
        placeholder: "Sélectionnez le statut"
      },
      report: {
        label: "Rapport",
        placeholder: "Fournissez une description détaillée de la tâche de maintenance"
      },
      equipmentCode: {
        label: "Code d'équipement",
        placeholder: "Ex: 123456",
        noEquipmentMessage: "Aucun équipement disponible",
        noMatchMessage: "Aucun équipement correspondant trouvé"
      },
      location: {
        label: "Emplacement",
        placeholder: "Précisez l'emplacement",
        comment: "Filtrez l'équipement par emplacement ou laissez vide"
      },
      description: {
        label: "Description",
        placeholder: "Fournissez une description détaillée de la tâche de maintenance"
      },
      priority: {
        label: "Priorité",
        placeholder: "Sélectionnez la priorité"
      },
      photos: {
        label: "Photos (optionnel)",
        addButton: "Ajouter des photos",
        maxPhotos: "Maximum 3 photos"
      }
    },
    taskTypes: [
      "Maintenance",
      "Réparation",
      "Installation",
      "Inspection"
    ],
    statusOptions: [
      "Non commencé",
      "En cours",
      "En attente",
      "Terminé",
      "Annulé"
    ],
    priorityOptions: [
      "Faible",
      "Moyen",
      "Élevé",
      "Critique"
    ],
    actions: {
      create: "Créer",
      update: "Mettre à jour",
      cancel: "Annuler",
      creating: "Création...",
      updating: "Mise à jour..."
    },
    validation: {
      nameRequired: "Le nom de la tâche est requis",
      assignToRequired: "L'assignation est requise",
      statusRequired: "Le statut est requis",
      deadlineRequired: "La date limite est requise",
      equipmentCodeRequired: "Le code d'équipement est requis",
      priorityRequired: "La priorité est requise",
      taskTypeRequired: "Le type de tâche est requis",
      locationRequired: "L'emplacement est requis"
    },
    toast: {
      createSuccess: "Tâche créée avec succès",
      updateSuccess: "Tâche mise à jour avec succès",
      error: "Veuillez remplir tous les champs obligatoires",
      loadError: "Échec du chargement des données de la tâche",
      equipmentError: "Échec du chargement des données d'équipement",
      userError: "Échec du chargement des données des utilisateurs",
      createBothSuccess: "Tâche et demande créées avec succès",
    },
    loading: "Chargement des données de la tâche..."
  },
  
  userList: {
    path: {
      1: "Tableau de bord",
      2: "Liste des utilisateurs"
    },
    cards: {
      titel: "Gestion des utilisateurs",
      sub: {
        1: "Utilisateurs totaux",
        2: "Équipe de maintenance",
        3: "Administrateurs"
      }
    },
    searchbar: {
      titel: "Tableau d'Utilisateurs",
      placeholder: "Rechercher...",
      buttons: {
        1: "Exporter le tableau",
        2: "Effacer les filtres",
        3: "Ajouter un utilisateur"
      }
    },
    tablehead: {
      1: "Nom complet",
      2: "Profession",
      3: "E-mail",
      4: "Numéro de téléphone",
      5: "Rôle",
      6: "Actions",
      clearfilter: "Effacer le filtre"
    },
    deleteConfirm : "Confirmer la suppression",
    deleteDescription : "Êtes-vous sûr de vouloir supprimer l'utilisateur {name} ? Cette action ne peut pas être annulée.",
    deleteUserDetails : "Détails de l'utilisateur",
    deleteUserName : "Nom :",
    deleteUserEmail : "Email :",
    deleteUserRole : "Rôle :",
    deleteCancel : "Annuler",
    deleteConfirmButton : "Supprimer l'utilisateur",
    deleteError : "Échec de la suppression de l'utilisateur"
  },
  
  requestList:{
    path: {
      dashboard: "Tableau de bord",
      requests: "Demandes de maintenance",
    },
    cards: {
      title: "Gestion des demandes de maintenance",
      totalRequests: "Demandes totales",
      pendingRequests: "Demandes en attente",
      completedRequests: "Demandes terminées",
    },
    searchbar: {
      title: "Liste des demandes de maintenance",
      placeholder: "Rechercher des demandes...",
      addButton: "Ajouter une demande",
      buttons: {
        export: "Exporter",
        clearFilters: "Effacer les filtres",
      },
    },
    columns: {
      id: "ID de demande",
      title: "Titre",
      location: "Emplacement",
      requestedBy: "Demandé par",
      urgencyLevel: "Urgence",
      status: "Statut",
      createdAt: "Créé le",
      inventoryCode : "code inventaire",
      requestCode : "code demande",
    },
    tablehead: {
      clearfilter: "Effacer le filtre",
    },
    toast: {
      fetchError: "Échec du chargement des demandes",
      deleteSuccess: "Demande supprimée avec succès",
      deleteError: "Échec de la suppression de la demande",
    },
  },


equipmentList: {
  deleteConfirm: "Confirmer la suppression",
        path: {
          1: "Tableau de bord",
          2: "Équipement",
        },
        cards: {
          title: "Gestion des Équipements",
          sub: {
            1: "Équipement Total",
            2: "Nécessite Maintenance",
            3: "En Fonctionnement",
            4: "Hors Service",
          },
        },
        tablehead: {
          1: "Code d'Inventaire",
          2: "ID",
          3: "Type",
          4: "Catégorie",
          5: "Emplacement",
          6: "Date d'acquisition",
          7: "Statut",
        },
        searchbar: {
          title: "Table des Équipements",
          buttons: {
            1: "Rechercher",
            2: "Réinitialiser",
            3: "Ajouter un Équipement",
          },
        },
      },
      tasksList: {
        path: {
          1: "Tableau de bord",
          2: "Tâches",
        },
        cards: {
          title: "Gestion des Tâches",
          sub: {
            1: "En attente",
            2: "En cours",
            3: "Terminées",
            4: "À faire",
          },
        },
        tablehead: {
          1: "Nom de la tâche",
          2: "Emplacement",
          3: "Responsable",
          4: "Priorité",
          5: "Échéance",
          6: "Statut",
          7: "Type",
        },
        searchbar: {
          title: "Tableau des Tâches",
          placeholder: "Entrez du texte pour rechercher",
          buttons: {
            1: "Rechercher",
            2: "Réinitialiser",
            3: "Ajouter une Tâche",
          },
        },
        status: {
          1: "En attente",
          2: "En cours",
          3: "Terminées",
          4: "À faire",
        },
        priority: {
          1: "Faible",
          2: "Moyenne",
          3: "Élevée",
        },
      },
 notifications: {
    title: "Notifications",
    unread: "non lues",
    loading: "Chargement des notifications...",
    noNotifications: "Aucune notification trouvée",
    checkBackLater: "Revenez plus tard pour de nouvelles notifications",
    clearSearch: "Effacer la recherche",
    searchPlaceholder: "Rechercher des notifications...",
    refresh: "Actualiser les notifications",
    markAsRead: "Marquer comme lue",
    delete: "Supprimer la notification",
    markAllAsRead: "Tout marquer comme lu",
    loadMore: "Charger plus",

    breadcrumb: {
      dashboard: "Tableau de bord",
      notifications: "Notifications"
    },

    filters: {
      title: "Filtres",
      all: "Toutes",
      unread: "Non lues",
      requests: "Demandes",
      tasks: "Tâches",
      system: "Système"
    },

    groups: {
      today: "Aujourd'hui",
      yesterday: "Hier",
      thisWeek: "Cette semaine"
    },

    timeFormat: {
      minutesAgo: "il y a {{count}} minutes",
      hoursAgo: "il y a {{count}} heures",
      daysAgo: "il y a {{count}} jours"
    },

    toast: {
      refreshSuccess: "Notifications actualisées avec succès",
      fetchError: "Échec du chargement des notifications",
      markedAsRead: "Notification marquée comme lue",
      deleted: "Notification supprimée",
      markedAllRead: "Toutes les notifications ont été marquées comme lues",
      loadingMore: "Chargement de notifications supplémentaires...",
      noUnreadNotifications: "Aucune notification non lue",
    },

    mockData: {
      welcome: "Bienvenue sur ESI Flow",
      welcomeDesc: "Votre compte a été créé avec succès.",

      newRequest: "Nouvelle demande de maintenance",
      newRequestDesc: "Une nouvelle demande de maintenance a été soumise pour le climatiseur du bâtiment A.",

      requestRefused: "Demande refusée",
      requestRefusedDesc: "Votre demande de maintenance pour l'imprimante dans la salle 101 a été refusée. Raison : Équipement prévu pour remplacement la semaine prochaine.",

      requestAccepted: "Demande acceptée",
      requestAcceptedDesc: "Votre demande de maintenance pour le serveur dans le centre de données B a été acceptée. L'équipement est maintenant en maintenance.",

      taskAssigned: "Nouvelle tâche assignée",
      taskAssignedDesc: "Une nouvelle tâche de maintenance vous a été assignée pour le système HVAC du bâtiment C.",

      taskCompleted: "Tâche terminée",
      taskCompletedDesc: "Le technicien Ahmed a terminé la tâche de maintenance du commutateur réseau dans la salle des serveurs A.",

      requestFulfilled: "Demande complétée",
      requestFulfilledDesc: "Votre demande de maintenance pour le projecteur dans la salle de conférence D a été complétée. Veuillez vérifier que l'équipement fonctionne correctement.",

      interventionUpdated: "Statut de l'intervention mis à jour",
      interventionUpdatedDesc: "Le statut de l'intervention n°49 a été mis à jour de 'En cours' à 'En attente'. Raison : En attente de pièces de rechange.",

      scheduledMaintenance: "Maintenance planifiée",
      scheduledMaintenanceDesc: "Une maintenance planifiée pour toutes les imprimantes du 2e étage aura lieu ce week-end. Veuillez enregistrer votre travail et éteindre les équipements avant de partir vendredi.",

      todayDeadline: "Échéance aujourd'hui",
      tomorrowDeadline: "Échéance demain"
    }
  },
  settings: {
    title: "Paramètres",
    breadcrumb: {
      dashboard: "Tableau de bord",
      settings: "Paramètres"
    },
    tabs: {
      general: "Paramètres généraux",
      user: "Informations utilisateur",
      system: "Informations système"
    },
    general: {
      systemPreferences: "Préférences système",
      darkMode: "Mode sombre",
      darkModeDescription: "Activez le mode sombre pour une meilleure expérience visuelle dans les environnements peu éclairés.",
      language: "Langue",
      languageDescription: "Changer la langue de l'interface",
      notifications: "Notifications",
      emailNotifications: "Notifications par e-mail",
      emailNotificationsDescription: "Recevez des mises à jour importantes et des notifications par e-mail.",
      reminderNotifications: "Notifications de rappel",
      reminderNotificationsDescription: "Recevez des rappels pour les tâches à venir et les échéances.",
      advancedSettings: "Paramètres avancés",
      dataSharing: "Partage de données",
      dataSharingDescription: "Partagez des données d'utilisation anonymes pour aider à améliorer la plateforme."
    },
    user: {
      profilePicture: "Photo de profil",
      uploadPicture: "Cliquez pour télécharger une photo de profil",
      basicInformation: "Informations de base",
      fullName: "Nom complet",
      email: "E-mail",
      emailComment: "Votre adresse e-mail sera utilisée pour les notifications liées au compte.",
      phone: "Téléphone",
      phoneComment: "Votre numéro de téléphone sera utilisé pour la récupération de compte et la sécurité.",
      biography: "Biographie",
      profession: "Profession",
      professionUpdate: "Mettre à jour votre rôle professionnel",
      role: "Rôle",
      roleUpdate: "Mettre à jour votre rôle système",
      roleDescription: "Votre rôle détermine les actions que vous pouvez effectuer dans le système.",
      accountSecurity: "Sécurité du compte",
      passwordInfo: "Laissez les champs de mot de passe vides si vous ne souhaitez pas changer votre mot de passe.",
      password: "Mot de passe",
      passwordPlaceholder: "Entrez un nouveau mot de passe",
      passwordComment: "Le mot de passe doit comporter au moins 8 caractères avec des majuscules, des chiffres et des caractères spéciaux.",
      confirmPassword: "Confirmer le mot de passe",
      confirmPasswordPlaceholder: "Confirmer le nouveau mot de passe"
    },
    system: {
      platformInformation: "Informations sur la plateforme",
      platformDescription: "Cette section fournit des informations sur la version actuelle du système et des détails techniques.",
      platformVersion: "Version de la plateforme",
      serverEnvironment: "Environnement serveur",
      databaseVersion: "Version de la base de données",
      lastUpdate: "Dernière mise à jour",
      developmentTeam: "Équipe de développement",
      projectLead: "Chef de projet",
      backendDeveloper: "Développeur backend",
      leadDeveloper: "Développeur principal",
      uiDesigner: "Designer UI/UX",
      qaEngineer: "Ingénieur QA",
      supportInformation: "Informations de support",
      technicalSupport: "Support technique",
      documentation: "Documentation",
      madeWithLove: "Fait avec amour par l'équipe ARCAD"
    },
    actions: {
      saveSettings: "Enregistrer les paramètres",
      saveChanges: "Enregistrer les modifications",
      saving: "Enregistrement...",
      cancel: "Annuler"
    },
    validation: {
      passwordLength: "Le mot de passe doit comporter au moins 8 caractères",
      passwordComplexity: "Le mot de passe doit inclure des majuscules, des chiffres et des caractères spéciaux",
      passwordsMatch: "Les mots de passe ne correspondent pas"
    },
    toast: {
      generalSuccess: "Paramètres généraux enregistrés avec succès",
      generalError: "Échec de l'enregistrement des paramètres généraux",
      userSuccess: "Informations utilisateur mises à jour avec succès",
      userError: "Échec de la mise à jour des informations utilisateur",
      formErrors: "Veuillez corriger les erreurs dans le formulaire",
      loadError: "Échec du chargement des données utilisateur"
    }
  },
  // Add translations for the user edit form
  forgotPassword: {
    title: "Mot de passe oublié",
    description:
      "Entrez votre adresse e-mail et nous vous enverrons un code de vérification pour réinitialiser votre mot de passe.",
    emailLabel: "Adresse e-mail",
    emailPlaceholder: "Entrez votre adresse e-mail",
    invalidEmail: "Veuillez entrer une adresse e-mail valide",
    emailNotFound: "Cette adresse e-mail n'est pas enregistrée dans notre système",
    cancelButton: "Annuler",
    continueButton: "Continuer",
    sending: "Envoi en cours...",
  },
  verification: {
    title: "Code de vérification",
    description: "Nous avons envoyé un code de vérification à {email}. Veuillez entrer le code ci-dessous.",
    incompleteCode: "Veuillez entrer le code de vérification à 6 chiffres complet",
    invalidCode: "Le code de vérification que vous avez entré est invalide ou a expiré",
    verifyButton: "Vérifier le code",
    verifying: "Vérification...",
    didNotReceive: "Vous n'avez pas reçu le code ?",
    resendButton: "Renvoyer le code",
    resendIn: "Renvoyer le code dans",
    resending: "Renvoi en cours...",
    codeSent: "Un nouveau code de vérification a été envoyé à votre e-mail",
    resendFailed: "Échec de l'envoi du code de vérification. Veuillez réessayer.",
  },
  newPassword: {
    title: "Créer un nouveau mot de passe",
    description:
      "Veuillez créer un nouveau mot de passe pour votre compte. Assurez-vous qu'il est sécurisé et facile à retenir.",
    passwordLabel: "Nouveau mot de passe",
    passwordPlaceholder: "Entrez un nouveau mot de passe",
    confirmPasswordLabel: "Confirmer le mot de passe",
    confirmPasswordPlaceholder: "Confirmez votre nouveau mot de passe",
    passwordRequirements: "Votre mot de passe doit répondre à toutes les exigences ci-dessous",
    passwordsDoNotMatch: "Les mots de passe ne correspondent pas",
    passwordTooShort: "Le mot de passe doit comporter au moins 8 caractères",
    resetButton: "Réinitialiser le mot de passe",
    resetting: "Réinitialisation...",
    resetFailed: "Échec de la réinitialisation du mot de passe. Veuillez réessayer.",
    cancelButton: "Retour",
    passwordStrength: "Force du mot de passe",
    strengthEmpty: "Vide",
    strengthWeak: "Faible",
    strengthMedium: "Moyen",
    strengthStrong: "Fort",
    minLength: "Au moins 8 caractères",
    upperCase: "Lettre majuscule",
    lowerCase: "Lettre minuscule",
    number: "Chiffre",
    specialChar: "Caractère spécial",
  },
  success: {
    title: "Succès !",
    description:
      "Votre mot de passe a été réinitialisé avec succès. Vous pouvez maintenant vous connecter avec votre nouveau mot de passe.",
    backButton: "Retour à la connexion",
  },
  reportPage: {
    path: {
      1: "Tableau de bord",
      2: "Rapports",
    },
    title: "Rapports du Système",
    sections: {
      users: "Rapport des Utilisateurs",
      tasks: "Rapport des Tâches",
      equipment: "Rapport des Équipements",
    },
    tables: {
      users: {
        title: "Gestion des Utilisateurs",
        columns: {
          name: "Nom",
          profession: "Profession",
          email: "Email",
          phoneNumber: "Numéro de Téléphone",
          role: "Rôle",
        },
        addButton: "Ajouter un Utilisateur",
      },
      tasks: {
        title: "Gestion des Tâches",
        columns: {
          taskName: "Nom de la Tâche",
          location: "Emplacement",
          responsible: "Responsable",
          priority: "Priorité",
          deadline: "Échéance",
          status: "Statut",
        },
        addButton: "Ajouter une Tâche",
      },
      equipment: {
        title: "Gestion des Équipements",
        columns: {
          inventoryCode: "Code d'Inventaire",
          id: "ID",
          type: "Type",
          category: "Catégorie",
          location: "Emplacement",
          acquisitionDate: "Date d'Acquisition",
          status: "Statut",
        },
        addButton: "Ajouter un Équipement",
      },
    },
  },
  reportPage: {
    path: {
      dashboard: "Tableau de bord",
      reports: "Rapports",
    },
    title: "Rapports",
    sections: {
      taskStats: "Statistiques des tâches",
      tasks: "Tâches",
      equipmentStats: "Statistiques des équipements",
      equipment: "Équipements",
      userStats: "Statistiques des utilisateurs",
      users: "Utilisateurs",
      requestStats: "Statistiques des demandes",
      requests: "Demandes",
    },
    stats: {
      pending: "En attente",
      inProgress: "En cours",
      completed: "Terminé",
      toDo: "À faire",
      totalEquipment: "Total des équipements",
      needsMaintenance: "Nécessite maintenance",
      working: "Fonctionnel",
      outOfService: "Hors service",
      totalUsers: "Total des utilisateurs",
      maintenanceTeam: "Équipe de maintenance",
      administrators: "Administrateurs",
      totalRequests: "Total des demandes",
      pendingRequests: "Demandes en attente",
      completedRequests: "Demandes terminées",
    },
    tables: {
      tasks: {
        title: "Gestion des tâches",
        addButton: "Ajouter une tâche",
        columns: {
          taskName: "Nom de la tâche",
          location: "Emplacement",
          responsible: "Responsable",
          priority: "Priorité",
          deadline: "Date limite",
          status: "Statut",
        },
      },
      equipment: {
        title: "Gestion des équipements",
        addButton: "Ajouter un équipement",
        columns: {
          inventoryCode: "Code d'inventaire",
          type: "Type",
          category: "Catégorie",
          location: "Emplacement",
          acquisitionDate: "Date d'acquisition",
          status: "Statut",
        },
      },
      users: {
        title: "Gestion des utilisateurs",
        addButton: "Ajouter un utilisateur",
        columns: {
          name: "Nom",
          profession: "Profession",
          email: "Email",
          phoneNumber: "Numéro de téléphone",
          role: "Rôle",
        },
      },
      requests: {
        title: "Gestion des demandes",
        addButton: "Ajouter une demande",
        columns: {
          requestCode: "Code de demande",
          title: "Titre",
          location: "Emplacement",
          requestedBy: "Demandé par",
          urgencyLevel: "Niveau d'urgence",
          status: "Statut",
        },
      },
    },
    actions: {
      edit: "Modifier",
      delete: "Supprimer",
      accept: "Accepter",
      reject: "Rejeter",
      export: "Exporter",
      print: "Imprimer",
      filter: "Filtrer",
    },
    notifications: {
      deleteConfirm: "Confirmer la suppression",
      deleteSuccess: "Élément supprimé avec succès",
      deleteError: "Échec de la suppression de l'élément",
      loadError: "Échec du chargement des données",
      loading: "Chargement des données...",
    },
  }
};

export default function Placeholder() {
  return null;
}