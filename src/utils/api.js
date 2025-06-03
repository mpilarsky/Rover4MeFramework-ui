const API_BASE_URL = "http://localhost:8000/api/v1";

/**
 * Pobiera listę rezerwacji użytkownika.
 * @returns {Promise<Array>}
 */
export const getReservations = async () => {
  const userId = localStorage.getItem("user_id");
  const response = await fetch(`${API_BASE_URL}/reservations?user_id=${userId}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error("Błąd pobierania rezerwacji");
  }
  return response.json();
};


/**
 * Dodaje nową rezerwację.
 * @param {Object} reservationData - Dane nowej rezerwacji.
 * @returns {Promise<Object>}
 */
export const addReservation = async (reservationData) => {
  const response = await fetch(`${API_BASE_URL}/addReservation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservationData),
  });

  if (!response.ok) {
    throw new Error("Błąd przy dodawaniu rezerwacji");
  }
  return response.json();
};

/**
 * Logowanie użytkownika.
 * @param {Object} credentials - Dane logowania (email, hasło).
 * @returns {Promise<Object>}
 */
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    credentials: 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Błędne dane logowania");
  }
  const userData = await response.json();
  localStorage.setItem("user_id", userData.id);
  return userData;
};

/**
 * Rejestracja nowego użytkownika.
 * @param {Object} userData - Dane nowego użytkownika.
 * @returns {Promise<Object>}
 */
export const signupUser = async (userData) => {
  const response = await fetch(`${API_BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    throw new Error("Błąd rejestracji użytkownika");
  }
  return response.json();
};

/**
 * Wylogowanie użytkownika.
 * @returns {Promise<void>}
 */
export const logoutUser = async () => {
  const response = await fetch(`${API_BASE_URL}/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Błąd podczas wylogowywania");
  }

  localStorage.removeItem("user_id");
};