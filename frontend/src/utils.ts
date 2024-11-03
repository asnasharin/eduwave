export const teacherQualifications: string[] = [
    "Bachelor of Arts (BA)",
    "Master of Arts (MA)",
    "Bachelor of Science (BS)",
    "Master of Science (MS)",
    "Master of Education (MEd)",
    "Bachelor of Education (BEd)",
    "Bachelor of Engineering (BE)",
  ];
  
  export const indianLanguages: string[] = [
    "Hindi",
    "Bengali",
    "Telugu",
    "Marathi",
    "Tamil",
    "Urdu",
    "Gujarati",
    "Kannada",
    "Odia",
    "Punjabi",
    "Malayalam",
    "Assamese",
    "Maithili",
    "Sanskrit",
    "Kashmiri",
    "Konkani",
    "Sindhi",
    "Dogri",
    "Manipuri",
    "Nepali",
    "Bodo",
    "Santhali",
    "English",
  ];
  
  export const caetgories: string[] = [
    "IT and Software",
    "Design",
    "Art",
    "Music",
    "Business",
    "Health and Fitness",
    "Science",
  ];
  
  export function getVideoDuration(file: File): Promise<number> {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const url = URL.createObjectURL(file);
  
      video.addEventListener("loadedmetadata", () => {
        URL.revokeObjectURL(url);
        resolve(video.duration);
      });
  
      video.addEventListener("error", (event) => {
        URL.revokeObjectURL(url);
        reject(event);
      });
  
      video.src = url;
    });
  }
  
  export function formatDuration(duration: number): string {
    const hours = Math.floor(duration / 3600);
    const minutes = Math.floor((duration % 3600) / 60);
    const seconds = Math.floor(duration % 60);
  
    const formattedHours = hours > 0 ? hours.toString() + ":" : "";
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");
  
    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  }
  
  export function getAllYears(): number[] {
    const currentYear = new Date().getFullYear();
    const startYear = 2023;
    const years: number[] = [];
  
    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
  
    return years.reverse();
  }
  
  export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
  
    return `${day}/${month}/${year}`;
  }
  