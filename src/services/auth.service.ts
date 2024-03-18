import {IResponseUserData, IUser, IUserData} from "../types/types";
import {axiosAuth} from "../api/api";

export const AuthService = {
    async registration(userData: IUserData): Promise<IResponseUserData | undefined> {
        const { data } = await axiosAuth().post<IResponseUserData>('users', userData);
        return data;
    },
    async login(userData: IUserData): Promise<IUser | undefined> {
        const { data } = await axiosAuth().post<IUser>('auth/login', userData);
        return data;
    },
    async getProfile(): Promise<IUser | undefined> {
        const { data } = await axiosAuth().get<IUser>('auth/profile')
        if (data) {
            return data;
        }
    }
}