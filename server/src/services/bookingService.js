const prisma = require("../config/db.config");
const AppError = require("../exceptions/AppError");

class BookingService {
  async createBooking(data) {
    const { userId, booking_type, booking_detail, appointment } = data;

    const parsedAppointment = new Date(appointment);
    if (isNaN(parsedAppointment)) {
      throw new AppError("Invalid appointment date", 400);
    }

    return await prisma.booking.create({
      data: {
        userId,
        booking_type,
        booking_detail,
        appointment: parsedAppointment,
      },
    });
  }

  async searchBookingConsult(booking_type) {
    const whereClause = {};
    if (booking_type) {
      whereClause.booking_type = booking_type;
    }

    const bookings = await prisma.booking.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            title: true,
            full_name: true,
            phone: true,
          },
        },
      },
    });

    if (bookings.length === 0) {
      throw new AppError("Booking not found", 404);
    }

    return bookings;
  }

  async listBooking() {
    const bookings = await prisma.booking.findMany({
      include: {
        user: {
          select: {
            title: true,
            full_name: true,
            phone: true,
          },
        },
      },
    });

    if (!bookings || bookings.length === 0) {
      throw new AppError("No bookings found", 404);
    }

    return bookings;
  }

  async countBookingType() {
    const counts = await prisma.booking.groupBy({
      by: ['booking_type'],
      _count: {
        booking_type: true,
      },
      where: {
        booking_type: {
          in: ['bloodTest', 'consult'],
        },
      },
    });

    if (!counts || counts.length === 0) {
      throw new AppError("No bookings found", 404);
    }

    return counts;
  }

  async bookingById(id) {
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            title: true,
            full_name: true,
            phone: true,
          },
        },
      },
    });

    if (!booking) {
      throw new AppError("Booking not found", 404);
    }

    return booking;
  }

  async bookingInfo(userId) {
    const bookings = await prisma.booking.findMany({
      where: { userId },
      include: {
        user: {
          select: {
            title: true,
            full_name: true,
            phone: true,
          },
        },
      },
    });

    if (!bookings || bookings.length === 0) {
      throw new AppError("No bookings found", 404);
    }

    return bookings;
  }

  async bookingUpdate(id, data) {
    const { booking_type, booking_detail, appointment } = data;

    if (!booking_type && !booking_detail && !appointment) {
      throw new AppError("No update fields provided", 400);
    }

    // Check if booking exists
    await this.bookingById(id);

    return await prisma.booking.update({
      where: { id },
      data: {
        booking_type: booking_type || undefined,
        booking_detail: booking_detail || undefined,
        appointment: appointment ? new Date(appointment) : undefined,
      },
    });
  }

  async bookingDelete(id) {
    // Check if booking exists
    await this.bookingById(id);

    return await prisma.booking.delete({
      where: { id },
    });
  }
}

module.exports = new BookingService();
