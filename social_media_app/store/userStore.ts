import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';
import { User } from '../utils/types';

export interface IUserStore {
    users: User[];
    fetchAllUsers: () => Promise<void>;
}

export const useUserStore = create<IUserStore>((set) => ({
    users: [],
    fetchAllUsers: async () => {
        const { data } = await axios.get<User[]>('/api/users');
        set({ users: data });
    },
}));
  
 
