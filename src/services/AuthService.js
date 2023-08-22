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

const authService = {
  login: (email, password) => {
    return new Promise((resolve, reject) => {
      const user = users.get(email);
      if (user && user.password === password) {
        resolve({ success: true, message: 'Login successful!', user: { name: user.name, email } });
      } else {
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
  }
};

export default authService;
