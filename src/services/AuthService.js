import { BehaviorSubject } from "rxjs";

const users = new Map();

// Adding the default admin user to the in-memory map
const defaultAdminEmail = 'admin@admin.com';
const defaultAdminPassword = 'admin';
const defaultAdminName = 'Administrator';

users.set(defaultAdminEmail, {
  name: defaultAdminName,
  email: defaultAdminEmail,
  password: defaultAdminPassword,
});

export const User = new BehaviorSubject(null);

const authService = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      const user = users.get(email);
      if (user && user.password === password) {
        const loggedInUser = { name: user.name, email };
        User.next(loggedInUser);
        resolve({ success: true, message: 'Login successful!', user: loggedInUser });
      } else {
        User.next(null);
        reject({ success: false, message: 'Invalid email or password!' });
      }
    });
  },
  register: (name, email, password) => {
    return new Promise((resolve, reject) => {
      // Check if the email is already registered
      if (users.has(email)) {
        reject({ success: false, message: 'Email already registered!' });
      } else {
        // Save the new user in the in-memory map
        users.set(email, { name, email, password });
        resolve({ success: true, message: 'Registration successful!', user: { name, email } });
      }
    });
  },
  authCheck: (url) => {
    return new Promise((resolve, reject) => {
      const publicPaths = ["/login", "/register"];
      const path = url.split("?")[0];
      if (!User.value && !publicPaths.includes(path)) {
        reject({success: false, message: 'User not logged in!'})
      } else {
        resolve({ success: true, message: 'User logged in!' })
      }
    });
  }
};

export default authService;
