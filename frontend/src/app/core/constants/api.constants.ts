import {environment} from '../../../environments/environment';

export const API_CONSTANTS = {
    BASE_URL: environment.API_URL,
    ENDPOINTS: {
      AUTH: {
        LOGIN: "/users/authenticate",
        REGISTER: "/users/register",
        LOGOUT: "/users/logout",
        REFRESH: "/users/refresh",
        FORGET_PASSWORD: "/users/forgot-password",
        CHANGE_PASSWORD: "/users/change-password",
      },
      USERS: {
        BASE: "/users",
        BY_USERNAME: "/users/by.username",
        BY_EMAIL: "/users/by.email",
        LIST: "/users",
        UPDATE: "/users",
        DELETE: "/users",
      },
      COURSES: {
        BASE: "/courses",
        LIST: "/courses",
        CREATE: "/courses",
        UPDATE: "/courses",
        DELETE: "/courses",
        ENROLL: "/courses/enroll",
      },
      COMMENTS: {
        BASE: "/comments",
        LIST: "/comments",
        CREATE: "/comments",
        DELETE: "/comments",
      },
    },
    TIMEOUTS: {
      SHORT: 5000,
      MEDIUM: 15000,
      LONG: 30000,
    },
  }
