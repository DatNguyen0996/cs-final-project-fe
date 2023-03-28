import { createContext, useReducer, useEffect } from "react";
import apiService from "../app/apiService";
import { isValidToken } from "../utils/jwt";

const initialState = {
  isInitialized: false,
  isAuthenticated: false,
  user: null,
};

const INITTIALIZE = "AUTH.INITIALIZE";
const LOGIN_SUCCESS = "AUTH.LOGIN_SUCCESS";
const REGISTER_SUCCESS = "AUTH.REGISTER_SUCCESS";
const LOGOUT = "AUTH.LOGOUT";

const reducer = (state, action) => {
  switch (action.type) {
    case INITTIALIZE:
      const { isAuthenticated, user } = action.payload;
      return {
        ...state,
        isInitialized: true,
        isAuthenticated,
        user,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

const AuthContext = createContext({ ...initialState });

const setSession = (accessToken) => {
  if (accessToken) {
    window.localStorage.setItem("accessToken", accessToken);
    apiService.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else {
    window.localStorage.removeItem("accessToken");
    delete apiService.defaults.headers.common.Authorization;
  }
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem("accessToken");
        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);
          const response = await apiService.get("/api/users/me");
          const user = response.data;
          dispatch({
            type: INITTIALIZE,
            payload: { isAuthenticated: true, user },
          });
        } else {
          setSession(null);
          dispatch({
            type: INITTIALIZE,
            payload: { isAuthenticated: false, user: null },
          });
        }
      } catch (error) {
        setSession(null);
        dispatch({
          type: INITTIALIZE,
          payload: { isAuthenticated: false, user: null },
        });
      }
    };
    initialize();
  }, []);

  const login = async ({ email, password }, callback) => {
    const response = await apiService.post("/api/auth/login", {
      email,
      password,
    });
    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispatch({ type: LOGIN_SUCCESS, payload: user });
    callback();
  };

  const register = async ({ name, email, password }, callback) => {
    const response = await apiService.post("/api/users", {
      name,
      email,
      password,
    });
    const { user, accessToken } = response.data;

    setSession(accessToken);
    dispatch({ type: REGISTER_SUCCESS, payload: user });
    callback();
  };

  const logout = () => {
    setSession(null);
    dispatch({ type: LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
