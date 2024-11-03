export interface IMyStudents {
    _id?: string;
    userID?: string;
    name?: string;
    phone?: number;
    gender?: string;
    standard?: string;
    subjects?: string[];
    intrests?: string[];
    preffered_language?: string;
  }
  
  export interface ITutorProfile {
    name?: string;
    profile?: string;
    bio?: string;
    qualification?: string[];
    languages?: string[];
    pricing?: number;
  }
  
  export interface ITutors {
    _id?: string;
    averageRating?: number;
    profile?: ITutorProfile;
    isInConnection?: boolean;
    isRequested?: boolean;
  }
  
  export interface IinitialState {
    isLoading: boolean;
    isError: boolean;
    isSuccess: boolean;
    errorMessage: {
      mesage: "";
      status: number | null;
    };
    tutors: ITutors[];
    count: number;
  }
  
  export interface ItutorSearch {
    page: string;
    language: string;
    qualification: string;
    search: string;
    sort: string;
  }
  