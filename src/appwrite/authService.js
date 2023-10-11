import { Client, Account, ID } from "appwrite";
import { APPWRITE_PROJECT_ID, APPWRITE_URL } from "../Utils/constant";

class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(APPWRITE_URL).setProject(APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (userAccount) {
        return this.login({ email, password });
      } else {
        return userAccount;
      }
    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      return await this.account.createEmailSession(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (error) {
      console.log("Appwrite :: logout :: error", error);
    }
  }

  async getCurrentUser() {
    try {
      const user = await this.account.get();
      if (user) {
        return user;
      }
      return null;
    } catch (error) {
      //   console.log("Appwrite :: getCurrentUser :: error", error);
      throw error;
    }
  }
}

const authService = new AuthService();

export default authService;
