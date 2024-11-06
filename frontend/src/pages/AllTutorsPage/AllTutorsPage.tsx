import { useEffect, useState } from "react";
import StudentNav from "../../components/NavBar/StudentNav";
import { ItutorSearch } from "../../types/tutorTypes";
import FilterBarTutor from "../../components/FilterBarTutor/FilterBarTutor";
import { useAppSelector } from "../../app/store";
import CouresCardSkeleton from "../../components/skeletons/courseCardSkeletons";
import { Pagination } from "flowbite-react";
import TutorDetailCard from "../../components/TutorDetailCard/TutorDetailCard";
import Footer from "../../components/Footer/Footer";

export default function AllTutorsPage() {
  const { isLoading, tutors, count } = useAppSelector((state) => state.tutors);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState<ItutorSearch>({
    language: "",
    page: "",
    search: "",
    sort: "",
    qualification: "",
  });
  const onPageChange = (page: number) => setCurrentPage(page);
  useEffect(() => {
    if (currentPage >= 1) {
      setSearch({
        ...search,
        page: currentPage.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);
  return (
    <>
      <StudentNav />
      <div className="flex flex-wrap bg-secondary flex-col w-full min-h-screen text-gray-200">
        <FilterBarTutor search={search} setSearch={setSearch} />
        <div className="flex md:p-10 gap-6 p-3 items-center justify-center w-full flex-wrap">
          {isLoading && (
            <>
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
              <CouresCardSkeleton />
            </>
          )}
          {tutors.length > 0 &&
            tutors.map((e, i) => {
              return (
                <>
                  <TutorDetailCard
                    _id={e._id}
                    isRequested={e.isRequested}
                    isInConnection={e.isInConnection}
                    averageRating={e.averageRating}
                    bio={e.profile?.bio}
                    key={i}
                    languages={e.profile?.languages}
                    name={e.profile?.name}
                    pricing={e.profile?.pricing}
                    profile={e.profile?.profile}
                    qualification={e.profile?.qualification}
                  />
                </>
              );
            })}
          {tutors.length === 0 && !isLoading && (
            <div className="">
              <h1>No tutors</h1>
            </div>
          )}
          {count > 0 && (
            <div className="flex mypage overflow-x-auto w-[80%] sm:justify-end">
              <Pagination
                currentPage={currentPage}
                totalPages={count}
                onPageChange={onPageChange}
              />
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
