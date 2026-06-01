const prisma = require("../config/db.config");
const { hashPassword } = require("../helpers/hashPassword");
const AppError = require("../exceptions/AppError");

// Centralized select fields to omit password for performance & security
const userSelectFields = {
  id: true,
  title: true,
  full_name: true,
  phone: true,
  age: true,
  username: true,
  role: true,
  createdAt: true,
};

class UserService {
  async userInfo(user) {
    if (!user) {
      throw new AppError("Unauthorized: User not found", 401);
    }
    // Remove password if present in request user
    if (user.password) {
      delete user.password;
    }
    return user;
  }

  async editProfile(userId, data) {
    const { title, full_name, phone, age, username, password } = data;

    const existingUsername = await prisma.user.findFirst({
      where: { username, id: { not: userId } }
    });
    if (existingUsername) {
      throw new AppError('Username already exists', 409);
    }

    const existingPhone = await prisma.user.findFirst({
      where: { phone, id: { not: userId } }
    });
    if (existingPhone) {
      throw new AppError('Phone number already exists', 409);
    }

    const parsedAge = parseInt(age);
    if (isNaN(parsedAge)) {
      throw new AppError('Invalid age value', 400);
    }

    const updatedData = {
      title,
      full_name,
      phone,
      age: parsedAge,
      username,
    };

    if (password) {
      updatedData.password = await hashPassword(password);
    }

    return await prisma.user.update({
      where: { id: userId },
      data: updatedData,
      select: userSelectFields,
    });
  }

  async userList() {
    return await prisma.user.findMany({
      select: userSelectFields,
    });
  }

  async userById(id) {
    const user = await prisma.user.findUnique({
      where: { id },
      select: userSelectFields,
    });
    if (!user) {
      throw new AppError("User not found", 404);
    }
    return user;
  }

  async searchUser(role) {
    const whereClause = {};
    if (role) {
      whereClause.role = role;
    }

    const users = await prisma.user.findMany({
      where: whereClause,
      select: userSelectFields,
    });
    if (users.length === 0) {
      throw new AppError("User not found", 404);
    }
    return users;
  }

  async updateUser(id, data) {
    const { title, full_name, phone, age, username, password } = data;

    const existingUsername = await prisma.user.findFirst({
      where: { username, id: { not: id } }
    });
    if (existingUsername) {
      throw new AppError('Username already exists', 409);
    }

    const existingPhone = await prisma.user.findFirst({
      where: { phone, id: { not: id } }
    });
    if (existingPhone) {
      throw new AppError('Phone number already exists', 409);
    }

    const parsedAge = parseInt(age);
    if (isNaN(parsedAge)) {
      throw new AppError('Invalid age value', 400);
    }

    const updatedData = {
      title,
      full_name,
      phone,
      age: parsedAge,
      username,
    };

    if (password) {
      updatedData.password = await hashPassword(password);
    }

    return await prisma.user.update({
      where: { id },
      data: updatedData,
      select: userSelectFields,
    });
  }

  async countUser() {
    const totalUsers = await prisma.user.count({
      where: {
        role: {
          in: ['USER', 'OFFICER', 'COUNSELOR']
        }
      }
    });

    const groups = await prisma.user.groupBy({
      by: ['role'],
      _count: {
        role: true
      },
      where: {
        role: {
          in: ['USER', 'OFFICER', 'COUNSELOR']
        }
      }
    });

    if (!groups || groups.length === 0) {
      throw new AppError("No users found", 404);
    }

    return {
      groups,
      totalUsers
    };
  }
}

module.exports = new UserService();
