import { useState, useEffect } from 'react';
import bookingService from '../service/bookingService';

export const useBookings = (itemsPerPage = 10) => {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchType, setSearchType] = useState("");

  const fetchBookings = async () => {
    setIsLoading(true);
    setError("");
    try {
      const res = await bookingService.bookingList();
      setBookings(res.data.data || []);
      setFilteredBookings(res.data.data || []);
    } catch (err) {
      console.error(err);
      setError("เกิดข้อผิดพลาดในการดึงข้อมูลการนัดหมาย");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    if (searchType) {
      const filtered = bookings.filter(
        (booking) => booking.booking_type === searchType
      );
      setFilteredBookings(filtered);
      setCurrentPage(1);
    } else {
      setFilteredBookings(bookings);
    }
  }, [searchType, bookings]);

  // Pagination Logic
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return {
    bookings,
    filteredBookings,
    currentBookings,
    isLoading,
    error,
    currentPage,
    totalPages,
    indexOfFirstItem,
    searchType,
    setSearchType,
    handlePreviousPage,
    handleNextPage,
    handlePageClick,
    refreshBookings: fetchBookings,
  };
};

export default useBookings;
