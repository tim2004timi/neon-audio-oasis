
// Simple auth utility for demo purposes
// In a real application, this would be connected to a backend

export interface User {
  id: string;
  username: string;
  email: string;
}

export const registerUser = (email: string, password: string, username: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Check if user already exists
      const existingUsers = JSON.parse(localStorage.getItem('users') || '[]');
      if (existingUsers.find((u: any) => u.email === email)) {
        reject(new Error('Пользователь с таким email уже существует'));
        return;
      }

      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        username: username || email.split('@')[0],
      };

      // Store user
      existingUsers.push({ ...newUser, password });
      localStorage.setItem('users', JSON.stringify(existingUsers));
      
      // Set as authenticated
      localStorage.setItem('isAuthenticated', 'true');
      localStorage.setItem('username', newUser.username);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      resolve(newUser);
    }, 1000); // Simulate network delay
  });
};

export const loginUser = (email: string, password: string, remember: boolean = false): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        // Set as authenticated
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', user.username);
        localStorage.setItem('currentUser', JSON.stringify({
          id: user.id,
          email: user.email,
          username: user.username
        }));
        
        resolve({
          id: user.id,
          email: user.email,
          username: user.username
        });
      } else {
        reject(new Error('Неверный email или пароль'));
      }
    }, 1000); // Simulate network delay
  });
};

export const isAuthenticated = (): boolean => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

export const getCurrentUser = (): User | null => {
  const userJson = localStorage.getItem('currentUser');
  if (!userJson) return null;
  
  try {
    return JSON.parse(userJson);
  } catch (e) {
    return null;
  }
};

export const logoutUser = (): void => {
  localStorage.removeItem('isAuthenticated');
  localStorage.removeItem('currentUser');
  localStorage.removeItem('username');
};
