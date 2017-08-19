export const USER_ID_STORAGE_KEY = 'userID';

export const getUserID = async () => {
  if (localStorage) {
    const savedUserID = localStorage.getItem(USER_ID_STORAGE_KEY);

    return savedUserID || await fetchUserID();
  }
  return 1;
}

const fetchUserID = async () => {
  const response = await fetch('/api/userID');
  const { id } = await response.json();

  localStorage.setItem(USER_ID_STORAGE_KEY, id);
  return id;
}