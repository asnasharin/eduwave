import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ISearch } from "../../types/courseType";
import { useAppDispatch } from "../../app/store";
import { getAllCourses } from "../../features/course/courseService";
import { indianLanguages, caetgories } from "../../utils";
import { useSearchParams } from "react-router-dom";

type prop = {
  search: ISearch;
  setSearch: Dispatch<SetStateAction<ISearch>>;
};

export default function FilterBarCourse({ search, setSearch }: prop) {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const [searchText, setSearchText] = useState<string>(
    searchQuery ? searchQuery : ""
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllCourses(search));
  }, [search, dispatch]);

  const onchange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setSearch({
      ...search,
      [name]: value,
    });
  };

  return (
    <>
      <div className="flex flex-wrap space-y-2 md:justify-between items-center justify-center flex-shrink px-3 py-3 bg-my-bg-dark h-fit w-full ">
        <div className="h-fit w-[500px] flex gap-x-2">
          <select
            name="category"
            onChange={onchange}
            className="md:w-1/3 w-28 py-1 cursor-pointer text-sm bg-gray-900 rounded-full pl-4 text-gray-200"
          >
            <option value="">All Categories</option>
            {caetgories.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
          <select
            name="language"
            onChange={onchange}
            className="md:w-1/3 w-28 py-1 cursor-pointer text-sm bg-gray-900 rounded-full pl-4 text-gray-200"
          >
            <option value="">All Languages</option>
            {indianLanguages.map((e) => (
              <option value={e}>{e}</option>
            ))}
          </select>
          <select
            name="sort"
            onChange={onchange}
            className="md:w-1/3 w-28 py-1 cursor-pointer text-sm bg-gray-900 rounded-full pl-4 text-gray-200"
          >
            <option value="">Sort</option>
            <option value="low-high">low-high</option>
            <option value="high-low">high-low</option>
            <option value="new-first">new first</option>
            <option value="popular">most popular</option>
          </select>
        </div>
        <div className="">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSearch({
                ...search,
                search: searchText,
              });
            }}
          >
            <div className="relative text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="p-1 focus:outline-none focus:shadow-outline"
                >
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6"
                  >
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </span>
              <input
                type="search"
                name="q"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="py-1 text-sm text-white bg-gray-900 rounded-full pl-10 focus:border-0 focus:outline-none  focus:text-gray-200"
                placeholder="Search..."
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
