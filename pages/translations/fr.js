export const fr = {
  common: {
    toggleLanguage: "Traduire en anglais"
  },
  login: {
    title: "Connexion",
    emailPlaceholder: "Email",
    passwordPlaceholder: "Mot de passe",
    button: "Connexion",
    error: "Identifiants invalides"
  },
  home: {
    navbar: {
      1: "Accueil",
      2: "À propos",
      3: "Guide",
      4: "Utilisateurs",
      5: "FAQ",
      6: "Contact",
      button: "Connexion"
    },
    hero: {
      title: {
        1: "Bienvenue à",
        2: "ESI",
        3: "Flow"
      },
      subtitle: "Suivre, Gérer, Maintenir - La méthode ESI Flow !",
      description: "ESI Flow est votre solution de référence pour signaler et suivre les problèmes techniques à l'ESI. Avec une interface intuitive et fluide, restez informé des incidents en cours et contribuez activement à l'amélioration de votre environnement académique.",
      button: "Connexion"
    },
    discover: {
      title: "Découvrir ESI",
      about: "À propos d'ESI Flow",
      aboutDescription: "ESI Flow est une plateforme dédiée conçue pour les étudiants et le personnel de l'ESI, leur permettant de signaler, suivre et résoudre efficacement les problèmes techniques au sein de l'institution. Notre objectif est d'améliorer la communication, la transparence et la réactivité face aux problèmes techniques.",
      mission: "Notre Mission",
      missionDescription: "Simplifier la gestion des problèmes techniques en fournissant un système de signalement centralisé en temps réel. Avec ESI Flow, chaque problème est traité rapidement, assurant un environnement d'apprentissage optimal et ininterrompu pour tous."
    },
    howItWorks: {
      title: {
        1: "Comment ESI Flow",
        2: "Fonctionne",
      },
      description: "ESI Flow simplifie la gestion de la maintenance en offrant un processus structuré et intuitif pour signaler les problèmes, attribuer des tâches aux techniciens et fournir des notifications en temps réel. Il assure la transparence et la réactivité, avec un tableau de bord convivial offrant une vue d'ensemble des interventions en cours et terminées.",
      button: "Télécharger le Guide"
    },
    users: {
      title: "Qui Peut Utiliser",
      roles: {
        personal: {
          1: "Personnel",
          2: "Les membres du personnel, les étudiants et les enseignants peuvent rapidement signaler des problèmes techniques, suivre l'état de leurs demandes et recevoir des mises à jour en temps réel sur leur résolution.",
        },
        administrator: {
          1: "Administrateur",
          2: "Les administrateurs gèrent les problèmes signalés, délèguent des tâches aux techniciens, surveillent l'activité de la plateforme et facilitent une communication fluide entre les utilisateurs et l'équipe technique pour assurer une résolution efficace des problèmes à l'ESI.",
        },
        technician: {
          1: "Technicien",
          2: "Les techniciens diagnostiquent et résolvent les problèmes signalés, mettent à jour leur statut, implémentent des solutions et assurent un environnement fiable et efficace pour les étudiants, les enseignants et le personnel de l'ESI.",
        },
      }
    },
    faq: {
      title: {
        1: "Découvrir ESI",
        2: "Flow FAQ"
      },
      questions: [
        {
          question: "Qu'est-ce qu'ESI Flow ?",
          answer: "ESI Flow est une plateforme qui permet aux étudiants et au personnel de signaler, suivre et rester informés des problèmes techniques au sein de l'ESI."
        },
        {
          question: "Qui peut utiliser ESI Flow ?",
          answer: "Les étudiants, le personnel administratif et les techniciens peuvent utiliser ESI Flow."
        },
        {
          question: "Comment signaler un problème technique ?",
          answer: "Vous pouvez signaler un problème via la plateforme ESI Flow en remplissant un simple formulaire décrivant le problème."
        },
        {
          question: "Puis-je suivre l'état de mon signalement ?",
          answer: "Oui, ESI Flow fournit un suivi en temps réel pour que vous puissiez surveiller la progression de vos problèmes signalés."
        }
      ],
      contact: {
        email: "esiflow@esi.dz",
        phone: "+213 (0) 555 55 55 55",
        button: "Contact"
      }
    }
  },
  login: {
    title: "Bon retour",
    ph1: "Email",
    input1: "Email ou numéro de téléphone",
    ph2: "Mot de passe",
    input2: "Entrez le mot de passe",
    remember: "Se souvenir de moi",
    forgot: "Mot de passe oublié ?",
    button: "Se connecter",
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
      professionCreate: "Attribuer une profession spécifique à l'utilisateur",
      role: "Rôle et permissions",
      roleUpdate: "Mettre à jour le rôle de l'utilisateur",
      roleCreate: "Attribuer un rôle spécifique à l'utilisateur",
      roleDescription: "Le rôle d'administrateur donne un accès complet à toutes les fonctionnalités du système, y compris la gestion des utilisateurs, les rapports et la configuration du système.",
      password: "Mot de passe",
      passwordPlaceholder: "Entrez le mot de passe",
      passwordComment: "Le mot de passe doit comporter au moins 8 caractères avec des chiffres et des caractères spéciaux",
      confirmPassword: "Confirmer le mot de passe",
      confirmPasswordPlaceholder: "Confirmer le mot de passe"
    },
    placeholders: {
      fullName: "Entrez le nom complet",
      email: "Entrez l'adresse email",
      phone: "Entrez le numéro de téléphone",
    },
    passwordInfo: "La modification du mot de passe nécessitera un code de confirmation envoyé à votre email.*",
    sendMail: "Envoyer une invitation par email",
    sendMailComment:" L'utilisateur recevra les identifiants de connexion par email.",
    requirePassword: "Exiger un changement de mot de passe",
    requirePasswordComment: "L'utilisateur devra changer son mot de passe lors de la première connexion.",
    actions: {
      save: "Enregistrer les modifications",
      create: "Créer l'utilisateur",
      saving: "Enregistrement en cours...",
      cancel: "Annuler"
    },
    toast: {
      success: "Informations utilisateur mises à jour avec succès",
      error: "Veuillez corriger les erreurs dans le formulaire"
    },
    validation: {
      requiredField: "{field} est requis",
      validEmail: "Un email valide est requis",
      phoneFormat: "Le téléphone doit être au format (XXX) XXX-XXXX",
      passwordLength: "Le mot de passe doit comporter au moins 8 caractères",
      passwordComplexity: "Le mot de passe doit inclure des majuscules, des chiffres et des caractères spéciaux",
      passwordsMatch: "Les mots de passe ne correspondent pas"
    }
  },
  // Traductions pour SideNavbar
  sideNav: {
    items: {
      dashboard: "Tableau de bord",
      requests: "Demandes",
      equipment: "Équipement",
      users: "Utilisateurs",
      reports: "Rapports",
      notifications: "Notifications",
      settings: "Paramètres"
    },
    logout: "Déconnexion",
    personal: "Personnel"
  }
};