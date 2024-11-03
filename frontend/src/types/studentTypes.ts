export interface IRequests {
    _id: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    teacherId: string;
    studentId?: string;
    teacher: {
      name: string;
      profile: string;
      bio: string;
    };
  }
  
  export interface IMyTutor {
    _id?: string;
    userID?: string;
    bio?: string;
    name?: string;
    profile?: string;
  }
  
  export interface ITutorRequests {
    _id: string;
    status?: string;
    createdAt?: string;
    updatedAt?: string;
    teacherId?: string;
    studentId: string;
    student: {
      name: string;
      profile: string;
      intrests: string[];
      subjects: string[];
    };
  }
  