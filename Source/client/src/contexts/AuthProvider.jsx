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
const LOGIN_URL = `${SERVER_HOST}:${SERVER_PORT}/login`;

const getToken = async (username, password) => {
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
    const token = Cookies.get("token");
    const validToken =
      token && jwtDecode(token).exp * 1000 > new Date().getTime();
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

  // const updateUser = async (username, password) => {
  //   // TODO
  //   // Update the user object in the state
  //   // Update the token cookie
  //   // Fetch to the server using PUT method
  // };

  return (
    <AuthContext.Provider value={{ user, isUserLoading, attemptLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
