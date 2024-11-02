import Skeleton from "@mui/material/Skeleton";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function CouresCardSkeleton() {
  return (
    <>
      <div className="w-64 space-y-1 mb-4">
        <ThemeProvider theme={darkTheme}>
          <Skeleton variant="rounded" height={100} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width={150} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
          <Skeleton variant="text" width={150} sx={{ fontSize: "1rem" }} />
          <Skeleton variant="rounded" height={40} />
        </ThemeProvider>
      </div>
    </>
  );
}
