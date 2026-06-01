const prisma = require("../config/db.config");
const AppError = require("../exceptions/AppError");

class ResponseService {
  async createResponse(data) {
    const { userId, responses } = data;

    if (!Array.isArray(responses) || responses.length === 0) {
      throw new AppError("Responses list cannot be empty", 400);
    }

    return await prisma.response.createMany({
      data: responses.map(response => ({
        userId: userId,
        questionId: parseInt(response.questionId, 10),
        answerId: response.answerId
      }))
    });
  }

  async listResponse() {
    const responses = await prisma.response.findMany({
      include: {
        user: {
          select: {
            id: true,
            title: true,
            full_name: true,
            age: true,
            phone: true
          }
        },
        question: true,
        answer: true
      },
      orderBy: {
        id: 'desc'
      }
    });

    const groupedResponses = responses.reduce((acc, response) => {
      const uId = response.user.id;
      if (!acc[uId]) {
        acc[uId] = {
          user: response.user,
          responses: []
        };
      }
      acc[uId].responses.push({
        question: response.question,
        answer: response.answer
      });
      return acc;
    }, {});

    return Object.values(groupedResponses);
  }

  async responseByUserId(userId) {
    if (isNaN(userId)) {
      throw new AppError("Invalid user ID", 400);
    }

    const responses = await prisma.response.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            title: true,
            full_name: true,
            age: true,
            phone: true
          }
        },
        question: true,
        answer: true
      }
    });

    if (responses.length === 0) {
      throw new AppError("No responses found for this user", 404);
    }

    return responses;
  }

  async updateResponse(id, data) {
    const { questionId, answerId } = data;

    // Check if response exists
    const responseExists = await prisma.response.findUnique({ where: { id } });
    if (!responseExists) {
      throw new AppError("Response not found", 404);
    }

    return await prisma.response.update({
      where: { id },
      data: {
        questionId: questionId ? parseInt(questionId, 10) : undefined,
        answerId: answerId ? parseInt(answerId, 10) : undefined
      }
    });
  }

  async deleteResponse(id) {
    // Check if response exists
    const responseExists = await prisma.response.findUnique({ where: { id } });
    if (!responseExists) {
      throw new AppError("Response not found", 404);
    }

    return await prisma.response.delete({
      where: { id }
    });
  }
}

module.exports = new ResponseService();
