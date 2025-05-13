// utils/auth.js

export default function getTokenFromCookies() {
    if (typeof document === 'undefined') return null;
  
    const match = document.cookie.match('(^|;)\\s*jwt\\s*=\\s*([^;]+)');
    return match ? match.pop() : null;
  }
  
  export function checkAuth(requiredRoles = []) {
    if (typeof window === 'undefined') return { authorized: false };
  
   
    const userData = localStorage.getItem('user');
    
  
    if (!userData) {
      return { authorized: false };
    }
  
    try {
      const user = JSON.parse(userData);
  
      if (requiredRoles.length && !requiredRoles.includes(user.role)) {
        return { authorized: false };
      }
  
      return { authorized: true, user };
    } catch (error) {
      console.error("Invalid user data in localStorage:", error);
      return { authorized: false };
    }
  }
  