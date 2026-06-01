const prisma = require("../config/db.config");
const AppError = require("../exceptions/AppError");

class ContentService {
  async createContent(data) {
    const { content_name, content_detail } = data;
    if (!content_name || !content_detail) {
      throw new AppError("Content name and details are required", 400);
    }

    return await prisma.content.create({
      data: {
        content_name,
        content_detail
      }
    });
  }

  async listContent() {
    const count = await prisma.content.count();
    const query = await prisma.content.findMany({
      select: {
        id: true,
        content_name: true
      }
    });

    if (!query || query.length === 0) {
      throw new AppError("Content not found", 404);
    }

    return {
      query,
      count
    };
  }

  async contentById(id) {
    const content = await prisma.content.findUnique({
      where: { id }
    });

    if (!content) {
      throw new AppError("Content not found", 404);
    }

    return content;
  }

  async contentUpdate(id, data) {
    const { content_name, content_detail } = data;

    const updateData = {};
    if (content_name !== undefined) {
      updateData.content_name = content_name;
    }
    if (content_detail !== undefined) {
      updateData.content_detail = content_detail;
    }

    if (Object.keys(updateData).length === 0) {
      throw new AppError("No fields provided to update", 400);
    }

    // Check if content exists
    await this.contentById(id);

    return await prisma.content.update({
      where: { id },
      data: updateData
    });
  }

  async contentDelete(id) {
    // Check if content exists
    await this.contentById(id);

    return await prisma.content.delete({
      where: { id }
    });
  }
}

module.exports = new ContentService();
