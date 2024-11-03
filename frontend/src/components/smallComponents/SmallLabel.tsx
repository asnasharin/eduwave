import { Tintrests } from "../studentProfile/StudentProfile";
import { Dispatch, SetStateAction } from "react";

type prop = {
  val: string;
  intrests: Tintrests[];
  id: number;
  setIntrests: Dispatch<React.SetStateAction<Tintrests[]>>;
  setSubmit: Dispatch<SetStateAction<boolean>>;
};

export default function SmallLabel({
  val,
  id,
  setIntrests,
  setSubmit,
  intrests,
}: prop) {
  const removeElemnt = (id: number) => {
    setIntrests(intrests.filter((i) => i.id != id));
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
