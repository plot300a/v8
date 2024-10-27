import axios, { AxiosRequestConfig } from "axios";
import { customResponseCodes } from ".";

let serverPort = 4040;
let serverAddress = `${process.env.EXPO_PUBLIC_SERVER_ADDRESS}:${serverPort}`;

console.log("Using server address: " + serverAddress);

export const getServerEndpoint = (pathname: `/${string}`) =>
  `${serverAddress}${pathname}`;

const ServerEndpoints = {
  User: getServerEndpoint(`/api/user`),
  GoogleServices: getServerEndpoint("/api/user/google"),
};

type ServerRequestsType = {
  User: {
    create: {
      route: "/createUser";
      body: { email: string; phone: string; password: string };
      axiosConfig?: AxiosRequestConfig<any>;
    };
    login: {
      route: "/login";
      body: { email: string; password: string };
      axiosConfig?: AxiosRequestConfig<any>;
    };
    verifyEmail: {
      route: "/verify";
      body: { email: string; OTP: string };
      axiosConfig?: AxiosRequestConfig<any>;
    };
    reset: {
      route: "/resetPassword";
      body: { email: string; pass_new: string; pass_old?: string };
      axiosConfig?: AxiosRequestConfig<any>;
    };
    delete: {
      route: "/delete";
      body: { email: string };
      axiosConfig?: AxiosRequestConfig<any>;
    };
    getOTP: {
      route: "/otp";
      body: { email: string; OTP: string };
      axiosConfig?: AxiosRequestConfig<any>;
    };
  };
  GoogleService: {
    signin: {
      route: "/signin" | "/signup";
      body: { email: string; picture_url?: string };
      axiosConfig?: AxiosRequestConfig<any>;
    };
  };
};

type ServerResponseType = {
  responseCode: number;
};

async function UserRoute({
  route,
  body,
  axiosConfig,
}: ServerRequestsType["User"][keyof ServerRequestsType["User"]]) {
  const url = `${ServerEndpoints.User}${route}`;
  try {
    switch (route) {
      case "/createUser":
      case "/login":
      case "/otp":
        return await axios.post<ServerResponseType>(url, body, axiosConfig);
      case "/verify":
      case "/resetPassword":
        return await axios.put<ServerResponseType>(url, body, axiosConfig);
    }
  } catch (error) {
    // handle error
    return { data: undefined } as AxiosRequestConfig<any>;
  }
}

async function GoogleServiceRoute({
  route,
  body,
  axiosConfig,
}: ServerRequestsType["GoogleService"][keyof ServerRequestsType["GoogleService"]]) {
  const url = `${ServerEndpoints.GoogleServices}${route}`;
  try {
    switch (route) {
      case "/signup":
      case "/signin":
        return await axios.post<ServerResponseType>(url, body, axiosConfig);
    }
  } catch (error) {
    // handle error
    return { data: undefined } as AxiosRequestConfig<any>;
  }
}

export const ServerRequests = {
  async User({
    route,
    body,
    axiosConfig,
  }: ServerRequestsType["User"][keyof ServerRequestsType["User"]]) {
    const response = await UserRoute({ route, body, axiosConfig } as any);
    return {
      successful: !!(
        response?.data &&
        response.data.responseCode === customResponseCodes.SUCCESSFUL
      ),
    };
  },
  async GoogleService({
    route,
    body,
    axiosConfig,
  }: ServerRequestsType["GoogleService"][keyof ServerRequestsType["GoogleService"]]) {
    const response = await GoogleServiceRoute({
      route,
      body,
      axiosConfig,
    } as any);
    return {
      successful: !!(
        response?.data &&
        response.data.responseCode === customResponseCodes.SUCCESSFUL
      ),
    };
  },
};

// export const trendingTodayAPI = postRoute.get("/trendingToday", trendingToday);
