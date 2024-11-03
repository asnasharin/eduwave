export type errorMessage = {
    message: string;
    status: number | null;
  };
  
  export type studentProfile = {
    _id?: string;
    name: string;
    phone?: string;
    profile?: string;
    dob?: string;
    gender?: string;
    intrests?: string[];
    standard?: string;
    subjects?: string[];
    preffered_language?: string;
    languages?: string[];
    bio?: string;
    qualification?: string[];
    pricing?: string;
  };
  
  export interface IUserProfileState {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    errorMessage: errorMessage;
    profile: studentProfile | null;
  }
  