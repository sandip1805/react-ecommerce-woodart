const authService = {
    login: (email, password) => {
      // Simulate an API call and return a promise that resolves or rejects based on the credentials.
      return new Promise((resolve, reject) => {
        // For simplicity, we'll use a hardcoded email and password.
        if (email === 'user@example.com' && password === 'password') {
          resolve({ success: true, message: 'Login successful!' });
        } else {
          reject({ success: false, message: 'Invalid email or password!' });
        }
      });
    },
  };
  
  export default authService;
  