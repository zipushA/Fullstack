// src/services/authService.ts

import axios from 'axios';
import { UserPostModel } from '../../models/UserType';

const BASE_URL = 'https://localhost:7082/api/Auth';

export const registerUser = (user: UserPostModel, role: string) => {
    return axios.post(`${BASE_URL}/register/${role}`, user, {
        headers: { 'Content-Type': 'application/json' },
    });
};

export const loginUser = (email: string, password: string) => {
    return axios.post(`${BASE_URL}/login`, { email, password }, {
        headers: { 'Content-Type': 'application/json' },
    });

};
export const updateUser = (user: UserPostModel) => {
  return axios.put(`${BASE_URL}/update`, user, {
    headers: { 'Content-Type': 'application/json' }
  });
  };