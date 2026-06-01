const bookingService = require("../services/bookingService");

exports.createBooking = async (req, res, next) => {
    try {
        const newBooking = await bookingService.createBooking(req.body);
        return res.status(201).json({
            message: "Booking created successfully",
            data: newBooking
        });
    } catch (error) {
        next(error);
    }
};

exports.searchBookingConsult = async (req, res, next) => {
    try {
        const { booking_type } = req.query;
        const query = await bookingService.searchBookingConsult(booking_type);
        res.status(200).json({ message: "Booking search retrieved successfully", data: query });
    } catch (error) {
        next(error);
    }
};

exports.listBooking = async (req, res, next) => {
    try {
        const query = await bookingService.listBooking();
        return res.status(200).json({
            message: "List of bookings retrieved successfully",
            data: query
        });
    } catch (error) {
        next(error);
    }
};

exports.countBookingType = async (req, res, next) => {
    try {
        const query = await bookingService.countBookingType();
        return res.status(200).json({
            message: "List of bookings retrieved successfully",
            data: query
        });
    } catch (error) {
        next(error);
    }
};

exports.bookingById = async (req, res, next) => {
    try {
        const bookingId = parseInt(req.params.id);
        const query = await bookingService.bookingById(bookingId);
        // Original returned findMany result (array) - keeping compatibility:
        return res.status(200).json({
            message: "List of bookings retrieved successfully",
            data: [query]
        });
    } catch (error) {
        next(error);
    }
};

exports.bookingInfo = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const query = await bookingService.bookingInfo(userId);
        return res.status(200).json({
            message: "List of bookings retrieved successfully",
            data: query
        });
    } catch (error) {
        next(error);
    }
};

exports.bookingUpdate = async (req, res, next) => {
    try {
        const bookingId = parseInt(req.params.id);
        const updatedBooking = await bookingService.bookingUpdate(bookingId, req.body);
        return res.status(200).json({
            message: "Booking updated successfully",
            data: updatedBooking
        });
    } catch (error) {
        next(error);
    }
};

exports.bookingDelete = async (req, res, next) => {
    try {
        const bookingId = parseInt(req.params.id);
        await bookingService.bookingDelete(bookingId);
        return res.status(200).json({
            message: "Booking deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
