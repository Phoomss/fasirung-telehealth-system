import http from './http-commo'

const userInfo = () => {
    return http.get("/api/user/userInfo");
};

const editProfile = async (profileData) => {
    return http.put('/api/user/editProfile', profileData)
}

const userService = {
    userInfo,
    editProfile
}

export default userService;