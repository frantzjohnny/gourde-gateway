export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  profilePicture?: string;
}

export interface StorageData {
  users: User[];
  currentUser?: string; // user ID
}

const STORAGE_KEY = 'moneytracker_data';

export const getStorageData = (): StorageData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    const initialData: StorageData = { users: [] };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
    return initialData;
  }
  return JSON.parse(data);
};

export const setStorageData = (data: StorageData) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const getCurrentUser = (): User | undefined => {
  const data = getStorageData();
  if (!data.currentUser) return undefined;
  return data.users.find(user => user.id === data.currentUser);
};

export const setCurrentUser = (userId: string | undefined) => {
  const data = getStorageData();
  data.currentUser = userId;
  setStorageData(data);
};