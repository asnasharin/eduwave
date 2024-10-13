export type userType = {
    _id: string;
    name: string;
    email: string;
    role: string;
  };
  
  export type errorMessage = {
    message: string;
    status: number | null;
  };
  export interface AuthInterface {
    user: userType | null;
    isLoading: boolean;
    isError: boolean;
    errorMessage: errorMessage;
    isSuccess: boolean;
  }
  
  export type userData = {
    name: string;
    email: string;
    password: string;
    phone: string;
    role?: string;
  };
  