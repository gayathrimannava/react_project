// import { createContext, useState } from "react";

// export const AuthContext = createContext(null);


// export function AuthContextProvider({ children }) {  
//     const [user, setUser] = useState(null);
//     const [loggedIn, setLoggedIn] = useState(false);
//     const [token, setToken] = useState(null);

//     function handleLogin(user, token) {
//         setUser(user);
//         setToken(token);
//         setLoggedIn(true);
//         localStorage.setItem("token", token);
//         localStorage.setItem("user", JSON.stringify(user));
//     }

//     const logout = () => {
//         setUser(null);
//         setToken(null);
//         setLoggedIn(false);
//         localStorage.removeItem("token");
//         localStorage.removeItem("user");
//     };

//     function getLoggedInUser() {
//         const token = localStorage.getItem("token");
//         const user = localStorage.getItem("user");
//         return {
//             token: token,
//             user: user ? JSON.parse(user) : null
//         }
//     }


//     return <AuthContext.Provider value={{user, loggedIn, handleLogin, token, logout }}>
//         {children}
//     </AuthContext.Provider>;
// }



import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  // Initialize token from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      setToken(storedToken);
      // Set default authorization header for all requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;
    }
  }, []);

  const login = async (username, password) => {
    try {
      console.log("Attempting login with username:", username);
      
      // Configure axios for the login request
      const config = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      };

      const response = await axios.post(
        "http://127.0.0.1:8000/api/token/",
        { username, password },
        config
      );

      console.log("Login response:", response.data);

      if (!response.data.access) {
        console.error("No access token in response");
        return false;
      }

      const accessToken = response.data.access;
      const refreshToken = response.data.refresh;

      // Set token in state and localStorage
      setToken(accessToken);
      setUser({ username });
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // Configure axios defaults for subsequent requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios.defaults.headers.common["Accept"] = "application/json";
      
      // Remove any existing interceptors
      axios.interceptors.request.eject(axios.interceptors.request.handlers[0]);
      
      // Add new interceptor
      axios.interceptors.request.use(
        (config) => {
          config.headers["Authorization"] = `Bearer ${accessToken}`;
          config.headers["Accept"] = "application/json";
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      console.log("Login successful, token stored:", accessToken);
      return true;
    } catch (error) {
      console.error("Login error details:", {
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        message: error.message
      });
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

