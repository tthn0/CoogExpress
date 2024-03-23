import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import AuthContext from "./AuthContext";

const SERVER_HOST =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEVELOPMENT_SERVER_HOST
    : process.env.REACT_APP_PRODUCTION_SERVER_HOST;
const SERVER_PORT =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_DEVELOPMENT_SERVER_PORT
    : process.env.REACT_APP_PRODUCTION_SERVER_PORT;
const SERVER_BASE_URL = `${SERVER_HOST}:${SERVER_PORT}`;

export { SERVER_BASE_URL };

const getToken = async (username, password) => {
  const LOGIN_URL = `${SERVER_BASE_URL}/login`;
  try {
    const response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error("Failed to get token from server.");
    const data = await response.json();
    return data.token;
  } catch (error) {
    alert("Error, check the console for details.");
    console.error(
      error,
      error.stack,
      error.message,
      error.name,
      error.response,
      error.request,
      error.config
    );
  }
};

const removeTokenCookie = () => Cookies.remove("token");

const addTokenCookie = (token) => {
  const decodedToken = jwtDecode(token);
  const expiryTimestampMs = decodedToken.exp * 1000;
  const currentTimestampMs = Date.now();
  const msToExpiry = expiryTimestampMs - currentTimestampMs;
  const daysToExpiry = msToExpiry / (1000 * 60 * 60 * 24);
  Cookies.set("token", token, {
    expires: daysToExpiry,
    path: "/",
  });
};

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isUserLoading, setLoadingUser] = useState(true);

  useEffect(() => {
    const now = new Date().getTime();
    const token = Cookies.get("token");
    const validToken = token && jwtDecode(token).exp * 1000 > now;
    if (validToken) setUser(jwtDecode(token));
    setLoadingUser(false);
    // TODO
    // If token is expiring soon, refresh it with a new server request.
  }, []);

  const logout = () => {
    removeTokenCookie();
    setUser(null);
  };

  const attemptLogin = async (username, password, callback) => {
    const token = await getToken(username, password);
    if (!token) {
      alert("Invalid username or password.");
    } else {
      addTokenCookie(token);
      setUser(jwtDecode(token));
    }
    if (callback) callback();
  };

  const updateUser = async (newUser) => {
    const dateToSqlDatetime = (date) =>
      date.toISOString().slice(0, 19).replace("T", " ");

    const endpoint = user.role ? "employee" : "customer";
    try {
      const response = await fetch(`${SERVER_BASE_URL}/${endpoint}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newUser,
          id: user.role ? user.employee_id : user.customer_id,
          date_of_birth: user.role
            ? dateToSqlDatetime(new Date(user.date_of_birth))
            : null,
        }),
      });
      const data = await response.json();
      if (data.errno) {
        alert(`Error: ${data.message}. Check the console for more details.`);
        console.error(data);
      } else {
        console.log(newUser);
        attemptLogin(newUser.username, newUser.password_hash);
        alert("User updated successfully!");
      }
    } catch (error) {
      alert(`Error: ${error.message}. Check the console for more details.`);
      console.log(error);
    }
  };

  const deleteUser = async () => {
    const endpoint = user.role ? "employee" : "customer";
    await fetch(`${SERVER_BASE_URL}/${endpoint}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: user.role ? user.employee_id : user.customer_id,
      }),
    });
    logout();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isUserLoading,
        attemptLogin,
        updateUser,
        deleteUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
