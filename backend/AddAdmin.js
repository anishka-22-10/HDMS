const Admin = require('./models/adminModel');

const addAdmin = async () => {
  const admin = new Admin({
    email: 'admin123@gmail.com',
    password: '123', // Make sure to hash this password in a real-world application
  });

  await admin.save();
};

addAdmin().catch(err => console.error(err));
