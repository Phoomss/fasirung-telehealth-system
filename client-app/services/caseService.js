import http from './http-commo'

const caseuserInfo = () => {
    return http.get("/api/case/info/user");
};

const caseService = {
    caseuserInfo
}

export default caseService