import Cookies from "js-cookie";

export const setTokens = (accessToken: string, refreshToken: string) => {
    Cookies.set("accessToken", accessToken, { secure: true, sameSite: "strict", expires: 1 });
    Cookies.set("refreshToken", refreshToken, { secure: true, sameSite: "strict", expires: 7 });
};

export const clearTokens = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
};