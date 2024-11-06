import { ThemeProvider, createTheme } from "@mui/material/styles";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import { useAppSelector } from "../../app/store";
import Skeleton from "@mui/material/Skeleton";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

export default function LessonsCard() {
  const { course, isLoading } = useAppSelector((state) => state.courseDetail);

  const [expanded, setExpanded] = useState<string | false>("");
  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <>
      <div className="flex flex-col items-center md:max-w-2xl w-[90vw] space-y-1">
        <h1 className="text-4xl font-bold mt-5">Course Contents</h1>
        <ThemeProvider theme={darkTheme}>
          {course && course?.lessons.length === 0 ? (
            <>
              <h1>no lessons</h1>
            </>
          ) : (
            <>
              {course &&
                course.lessons.map((lesson, i) => (
                  <>
                    {isLoading ? (
                      <>
                        <Skeleton
                          variant="rounded"
                          className="mt-1"
                          width={500}
                          height={50}
                        />
                      </>
                    ) : (
                      <>
                        <Accordion
                          expanded={expanded === i.toString()}
                          onChange={handleChange(i.toString())}
                        >
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3-content"
                            id="panel3-header"
                          >
                            {lesson.title}
                          </AccordionSummary>
                          <AccordionDetails>
                            {lesson.description}
                          </AccordionDetails>
                        </Accordion>
                      </>
                    )}
                  </>
                ))}
            </>
          )}
        </ThemeProvider>
      </div>
    </>
  );
}
