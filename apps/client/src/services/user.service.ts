import axios from 'axios';
import { User } from '../components/shared/types/user';
import authService from './auth.service';

const API_URL = 'http://localhost:3000/api/user/';

class UserService {


  async getUserData(): Promise<User> {
    try {
      const token = authService.getCurrentUserToken();
      
      const response = await fetch(API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
      );
      const userData = await response.json();
      return userData.data;
    } catch (error: any) {
      console.log(error.response);
      console.log(error.response.data);
      throw new Error(error.response.data.message);
    }
  }

}

export default new UserService();