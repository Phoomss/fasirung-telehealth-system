const prisma = require("../config/db.config");
const AppError = require("../exceptions/AppError");

class CaseService {
  async createCase(data) {
    const { bookingId, officerId, physicianId } = data;

    const parsedBookingId = parseInt(bookingId, 10);
    const parsedOfficerId = parseInt(officerId, 10);
    const parsedPhysicianId = parseInt(physicianId, 10);

    if (isNaN(parsedPhysicianId)) {
      throw new AppError('Invalid physicianId', 400);
    }
    if (isNaN(parsedBookingId)) {
      throw new AppError('Invalid bookingId', 400);
    }
    if (isNaN(parsedOfficerId)) {
      throw new AppError('Invalid officerId', 400);
    }

    const booking = await prisma.booking.findUnique({ where: { id: parsedBookingId } });
    const officer = await prisma.user.findUnique({ where: { id: parsedOfficerId } });
    const physician = await prisma.user.findUnique({ where: { id: parsedPhysicianId } });

    if (!booking) {
      throw new AppError('Booking not found', 404);
    }
    if (!officer) {
      throw new AppError('Officer not found', 404);
    }
    if (!physician) {
      throw new AppError('Physician not found', 404);
    }

    return await prisma.case.create({
      data: {
        bookingId: parsedBookingId,
        officerId: parsedOfficerId,
        physicianId: parsedPhysicianId,
        case_status: 'accepting',
      }
    });
  }

  async countCaseStatus() {
    const counts = await prisma.case.groupBy({
      by: ['case_status'],
      _count: {
        case_status: true
      },
      where: {
        case_status: {
          in: ['completed', 'accepting']
        }
      }
    });

    if (!counts || counts.length === 0) {
      throw new AppError("No cases found", 404);
    }

    return counts;
  }

  async caseInfo(physicianId) {
    return await prisma.case.findMany({
      where: {
        physicianId,
        case_status: 'accepting'
      },
      include: {
        officer: {
          select: {
            title: true,
            full_name: true,
            phone: true,
            role: true
          }
        },
        physician: {
          select: {
            title: true,
            full_name: true,
            phone: true,
            role: true
          }
        },
        booking: {
          select: {
            booking_type: true,
            booking_detail: true,
            appointment: true,
            user: {
              select: {
                title: true,
                full_name: true,
                phone: true
              }
            }
          }
        }
      }
    });
  }

  async caseUserInfo(userId) {
    // Check if user exists
    const userExists = await prisma.user.findUnique({ where: { id: parseInt(userId, 10) } });
    if (!userExists) {
      throw new AppError("User not found", 404);
    }

    return await prisma.case.findMany({
      where: {
        booking: {
          user: {
            id: parseInt(userId, 10),
          }
        },
        case_status: 'completed'
      },
      include: {
        officer: {
          select: {
            title: true,
            full_name: true,
            phone: true,
            role: true
          }
        },
        physician: {
          select: {
            title: true,
            full_name: true,
            phone: true,
            role: true
          }
        },
        booking: {
          select: {
            booking_type: true,
            booking_detail: true,
            appointment: true,
            user: {
              select: {
                title: true,
                full_name: true,
                phone: true
              }
            }
          }
        }
      }
    });
  }

  async caseList() {
    return await prisma.case.findMany({
      include: {
        officer: {
          select: {
            title: true,
            full_name: true,
            phone: true,
            role: true
          }
        },
        physician: {
          select: {
            title: true,
            full_name: true,
            phone: true,
            role: true
          }
        },
        booking: {
          select: {
            booking_type: true,
            booking_detail: true,
            appointment: true,
            user: {
              select: {
                title: true,
                full_name: true,
                phone: true
              }
            }
          }
        }
      }
    });
  }

  async caseById(id) {
    const caseData = await prisma.case.findUnique({
      where: { id },
      include: {
        officer: {
          select: {
            title: true,
            full_name: true,
            phone: true,
            role: true
          }
        },
        physician: {
          select: {
            title: true,
            full_name: true,
            phone: true,
            role: true
          }
        },
        booking: {
          select: {
            user: {
              select: {
                title: true,
                full_name: true,
                phone: true,
              }
            },
            booking_type: true,
            booking_detail: true,
            appointment: true
          }
        }
      }
    });

    if (!caseData) {
      throw new AppError("Case not found", 404);
    }

    return caseData;
  }

  async updateCase(id, data) {
    const { bookingId, officerId, physicianId, case_status } = data;

    // Check if case exists
    await this.caseById(id);

    return await prisma.case.update({
      where: { id },
      data: {
        bookingId: bookingId ? parseInt(bookingId, 10) : undefined,
        officerId: officerId ? parseInt(officerId, 10) : undefined,
        physicianId: physicianId ? parseInt(physicianId, 10) : undefined,
        case_status: case_status || undefined
      }
    });
  }

  async deleteCase(id) {
    // Check if case exists
    await this.caseById(id);

    return await prisma.case.delete({
      where: { id }
    });
  }
}

module.exports = new CaseService();
