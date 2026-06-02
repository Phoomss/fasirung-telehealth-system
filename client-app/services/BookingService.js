import http from './http-commo'

const bookingInfo = async () => {
    const res = await http.get('/api/booking/info')

    return res.data.data
}

const createBooking = async (bookingData) => {
    return http.post('/api/booking/create', bookingData)
}

const deleteBooking = async(bookingId)=>{
    return http.delete(`/api/booking/${bookingId}`)
}

const bookingService = {
    bookingInfo,
    createBooking,
    deleteBooking
}

export default bookingService