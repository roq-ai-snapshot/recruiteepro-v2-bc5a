import axios from 'axios';
import queryString from 'query-string';
import { UserPermissionInterface } from 'interfaces/user-permission';
import { GetQueryInterface } from '../../interfaces';

export const getUserPermissions = async (query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-permissions${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUserPermission = async (userPermission: UserPermissionInterface) => {
  const response = await axios.post('/api/user-permissions', userPermission);
  return response.data;
};

export const updateUserPermissionById = async (id: string, userPermission: UserPermissionInterface) => {
  const response = await axios.put(`/api/user-permissions/${id}`, userPermission);
  return response.data;
};

export const getUserPermissionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/user-permissions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUserPermissionById = async (id: string) => {
  const response = await axios.delete(`/api/user-permissions/${id}`);
  return response.data;
};
