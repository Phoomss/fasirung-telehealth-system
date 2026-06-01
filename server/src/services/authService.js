const { JWT_SECRET } = require("../../constants");
const prisma = require("../config/db.config");
const { hashPassword, comparePassword } = require("../helpers/hashPassword");
const jwt = require('jsonwebtoken');
const AppError = require("../exceptions/AppError");

class AuthService {
  async signup(data) {
    const { title, full_name, phone, age, username, password, role } = data;

    const existingUsername = await prisma.user.findFirst({
      where: { username }
    });
    if (existingUsername) {
      throw new AppError("Username already exists", 409);
    }

    const existingPhone = await prisma.user.findFirst({
      where: { phone }
    });
    if (existingPhone) {
      throw new AppError("Phone already exists", 409);
    }

    const parsedAge = parseInt(age);
    if (isNaN(parsedAge)) {
      throw new AppError("Invalid age value", 400);
    }

    const allowedRoles = ["USER", "OFFICER", "COUNSELOR"];
    const assignedRole = allowedRoles.includes(role) ? role : "USER";

    const hashedPassword = await hashPassword(password);

    return await prisma.user.create({
      data: {
        title,
        full_name,
        phone,
        age: parsedAge,
        username,
        password: hashedPassword,
        role: assignedRole
      }
    });
  }

  async login(username, password) {
    const user = await prisma.user.findFirst({
      where: { username }
    });

    if (!user) {
      throw new AppError("Username not found", 401);
    }

    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      throw new AppError("Incorect password", 401);
    }

    const token = jwt.sign(
      {
        userId: user.id,
        username: user.username
      },
      JWT_SECRET
    );

    return {
      full_name: user.full_name,
      username: user.username,
      role: user.role,
      token
    };
  }

  async initializeAdminUser() {
    try {
      const adminUser = await prisma.user.findFirst({
        where: { username: 'admin' }
      });

      if (!adminUser) {
        const hashedPassword = await hashPassword('admin1234');
        await prisma.user.create({
          data: {
            title: 'Admin',
            full_name: 'System Administrator',
            phone: '0000000000',
            age: 30,
            username: 'admin',
            password: hashedPassword,
            role: 'ADMIN'
          }
        });
        console.log('Admin user created successfully!');
      } else {
        console.log('Admin user already exists.');
      }
    } catch (error) {
      console.error('Error creating admin user:', error);
    }
  }
}

module.exports = new AuthService();
