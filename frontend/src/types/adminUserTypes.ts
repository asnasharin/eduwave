export interface IAdminTutor {
    _id: string;
    userID: string;
    name: string;
    phone: number;
    qualification: string[];
    languages: string[];
    user: {
      email: string;
      status: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }
  export interface IAdminStudent {
    _id: string;
    userID: string;
    name: string;
    phone: number;
    standard: string;
    subjects: string[];
    intrests: string[];
    user: {
      email: string;
      status: boolean;
      createdAt: string;
      updatedAt: string;
    };
  }
  
  export interface IDashboardData {
    teachers: number;
    students: number;
    monthlyJoinnings: number[];
  }
  