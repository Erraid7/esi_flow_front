// utils/auth.js

export function getTokenFromCookies() {
    if (typeof document === 'undefined') return null;
  
    const match = document.cookie.match('(^|;)\\s*jwt\\s*=\\s*([^;]+)');
    return match ? match.pop() : null;
  }
  
  export function checkAuth(requiredRoles = []) {
    if (typeof window === 'undefined') return { authorized: false };
  
    const token = getTokenFromCookies('jwt'); // now correctly looks for 'jwt'
    const userData = localStorage.getItem('user');
    console.log("User data from localStorage:", userData);
    console.log("Token from cookies:", token);
  
    if (!userData || !token) {
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
  