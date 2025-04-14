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
      ],
      contact: {
        email: "esiflow@esi.dz",
        phone: "+213 (0) 555 55 55 55",
        button: "Contact",
      },
    },
  },
  dashboard: {
    title: "Tableau de Bord ESI Flow",
    overview: "Aperçu du Tableau de Bord",
    activeRequests: "Demandes actives / tech/utilisateurs",
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
}
