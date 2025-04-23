// utils/userUtils.js

export const getCurrentUser = () => {
    if (typeof window === 'undefined') return null;
  
    try {
      const userData = localStorage.getItem('token');
      if (!userData) return null;
  
      const user = JSON.parse(userData);
  
      return {
        name: user.name || "No Name",
        role: user.role || "user",
        initials: user.name
          ? user.name
              .split(" ")
              .map(word => word[0])
              .join("")
              .toUpperCase()
          : "NA"
      };
    } catch (err) {
      console.error("Error reading user from localStorage:", err);
      return null;
    }
  };
  