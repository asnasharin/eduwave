import { Tintrests } from "../studentProfile/StudentProfile";
import { Dispatch, SetStateAction } from "react";

type prop = {
  val: string;
  languages: Tintrests[];
  id: number;
  setLanguages: Dispatch<React.SetStateAction<Tintrests[]>>;
  setSubmit: Dispatch<SetStateAction<boolean>>;
};

export default function LanguagesLabel({
  val,
  id,
  setLanguages,
  setSubmit,
  languages,
}: prop) {
  const removeElemnt = (id: number) => {
    setLanguages(languages.filter((i) => i.id != id));
    setSubmit(true);
  };
  return (
    <div className="bg-[#4b277b] rounded-full flex justify-center items-center text-gray-300 gap-2 py-1 px-4">
      {val}{" "}
      <span
        className="font-bold text-white cursor-pointer"
        onClick={() => removeElemnt(id)}
      >
        x
      </span>
    </div>
  );
}
