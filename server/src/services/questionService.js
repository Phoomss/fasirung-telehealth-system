const prisma = require("../config/db.config");
const AppError = require("../exceptions/AppError");

class QuestionService {
  async createQuestion(data) {
    const { ques_name } = data;
    if (!ques_name) {
      throw new AppError("Question name is required", 400);
    }

    return await prisma.question.create({
      data: { ques_name }
    });
  }

  async listQuestion() {
    const query = await prisma.question.findMany();
    const count = await prisma.question.count();
    return { query, count };
  }

  async questionById(id) {
    const question = await prisma.question.findUnique({
      where: { id }
    });

    if (!question) {
      throw new AppError("Question not found", 404);
    }

    return question;
  }

  async updateQuestion(id, data) {
    const { ques_name } = data;
    if (!ques_name) {
      throw new AppError("Question name is required", 400);
    }

    // Check if question exists
    await this.questionById(id);

    return await prisma.question.update({
      where: { id },
      data: { ques_name }
    });
  }

  async deleteQuestion(id) {
    // Check if question exists
    await this.questionById(id);

    return await prisma.question.delete({
      where: { id }
    });
  }
}

module.exports = new QuestionService();
