const prisma = require("../config/db.config");
const AppError = require("../exceptions/AppError");

class AnswerService {
  async createAnswer(data) {
    const { questionId, answerTexts } = data;

    const parsedQuestionId = parseInt(questionId, 10);
    if (isNaN(parsedQuestionId)) {
      throw new AppError("Invalid question ID provided.", 400);
    }

    if (!Array.isArray(answerTexts) || answerTexts.length === 0) {
      throw new AppError("คำตอบไม่สามารถเป็นค่าว่างหรือไม่ถูกต้อง", 400);
    }

    // Verify question exists
    const question = await prisma.question.findUnique({ where: { id: parsedQuestionId } });
    if (!question) {
      throw new AppError("Question not found", 404);
    }

    return await prisma.answer.createMany({
      data: answerTexts.map(text => ({
        questionId: parsedQuestionId,
        answer_text: text
      }))
    });
  }

  async listAnswer() {
    return await prisma.answer.findMany({
      include: {
        question: {
          select: {
            ques_name: true
          }
        }
      }
    });
  }

  async answerById(id) {
    const answer = await prisma.answer.findUnique({
      where: { id },
      include: {
        question: {
          select: {
            ques_name: true
          }
        }
      }
    });

    if (!answer) {
      throw new AppError("Answer not found", 404);
    }

    return answer;
  }

  async searchAnswer(questionId) {
    const whereClause = {};
    if (questionId) {
      whereClause.questionId = parseInt(questionId, 10);
    }

    const answers = await prisma.answer.findMany({
      where: whereClause,
      include: {
        question: {
          select: {
            ques_name: true,
            id: true
          }
        }
      }
    });

    if (answers.length === 0) {
      throw new AppError("Answers not found", 404);
    }

    return answers;
  }

  async updateAnswer(id, data) {
    const { answer_text } = data;
    if (!answer_text) {
      throw new AppError("Answer text is required", 400);
    }

    // Check if answer exists
    await this.answerById(id);

    return await prisma.answer.update({
      where: { id },
      data: { answer_text }
    });
  }

  async deleteAnswer(id) {
    // Check if answer exists
    await this.answerById(id);

    return await prisma.answer.delete({
      where: { id }
    });
  }
}

module.exports = new AnswerService();
