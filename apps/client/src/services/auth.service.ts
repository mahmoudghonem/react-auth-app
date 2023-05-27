import axios from "axios";
import { TokenData, User } from "../components/shared/types/user";
import jwtDecode from "jwt-decode";
const API_URL = "http://localhost:3000/api/auth/";

class AuthService {
    async login(email: string, password: string) {
        try {


            const response = await axios
                .post(API_URL + "login", {
                    email,
                    password
                });
            const data = await response.data;
            return data.token;
        } catch (error: any) {
            switch (error.response.status) {
                case 404:
                    throw new Error('User not registered');
                case 401:
                    throw new Error('Invalid credentials');
                default:
                    throw new Error('Something went wrong, Please try again later');
            }
        }

    }


    logout() {
        localStorage.removeItem("user");
    }

    async register(first_name: string, last_name: string, email: string, password: string) {
        try {
            const response = await axios.post(API_URL + "register", {
                first_name,
                last_name,
                email,
                password
            });

            const data = await response.data
            return data.token;

        } catch (error: any) {
            switch (error.response.status) {
                case 400:
                    throw new Error('User already registered');
                default:
                    throw new Error('Something went wrong, Please try again later');
            }
        }
    }

    verifyToken(token: string): boolean {
        try {
            const decodedToken = jwtDecode(token) as any;
            if (decodedToken.exp * 1000 < Date.now()) {
                this.logout();
                return false;
            }
            return true;
        } catch {
            return false;
        }
    }

    decodeToken(token: string): TokenData {
        return jwtDecode(token);
    }

    getCurrentUserToken() :any{
        return localStorage.getItem('token');
    }

    getAuthHeader() {        
        const headers:any = { 'Authorization': 'Bearer ' + this.getCurrentUserToken() };
        return headers;
    }
}

export default new AuthService();