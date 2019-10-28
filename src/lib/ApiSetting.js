import http from "../lib/http";

export const getAccount = () => {
  return http.get("/api/login/getAccount");
};
export const createAccount = params => {
  return http.post("/api/login/createAccount", params);
};

export const checkAccount = params => {
  return http.post("/api/login/checkAccount", params);
};
export const Loginin = params => {
  return http.post("/api/login/loginin", params);
};
