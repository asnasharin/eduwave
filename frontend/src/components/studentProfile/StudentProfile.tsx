import { Dispatch, SetStateAction, useEffect, useState } from "react";
import SmallLabel from "../smallComponents/SmallLabel";
import SubjectsLabel from "../smallComponents/SubjectsLabel";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { validate } from "../util/validateForms";
import { updateProfile } from "../../features/users/userService";
import Loader from "../Loader/Loader1/Loader";
import { reset } from "../../features/users/userSlice";
import { toast } from "react-toastify";

export type Tintrests = {
  id: number;
  value: string;
};
type Prop = {
  submit: boolean;
  setSubmit: Dispatch<SetStateAction<boolean>>;
};
export default function StudentProfile({ submit, setSubmit }: Prop) {
  const dispatch = useAppDispatch();
  const { profile, isLoading, isError, isSuccess, errorMessage } =
    useAppSelector((state) => state.userProfile);
  const intrests: string[] = profile?.intrests
    ? (profile?.intrests as string[])
    : ([] as string[]);
  const inititalInrest: Tintrests[] | null = [];
  for (let i = 0; i < (intrests as string[]).length; i++) {
    inititalInrest.push({
      id: i,
      value: (intrests as string[])[i],
    });
  }
  const subjectss: string[] = profile?.subjects
    ? (profile?.subjects as string[])
    : ([] as string[]);
  const inititalSubjects: Tintrests[] | null = [];
  for (let i = 0; i < (subjectss as string[]).length; i++) {
    inititalSubjects.push({
      id: i,
      value: (subjectss as string[])[i],
    });
  }
  const [intrest, setIntrest] = useState("");
  const [Intrests, setIntrests] = useState<Tintrests[]>(
    inititalInrest ? inititalInrest : []
  );
  const [subject, setSubject] = useState("");
  const [subjects, setSubjects] = useState<Tintrests[]>(inititalSubjects);
  const [isSubmit, setIsSubmit] = useState(false);

  const inititalState = {
    name: profile ? profile.name : "",
    phone: profile ? JSON.stringify(profile.phone) : "",
    dob: profile ? profile.dob : "",
    gender: profile ? profile.gender : "",
    standard: profile ? profile.standard : "",
    preffered_language: profile ? profile.preffered_language : "",
    intrests: profile ? profile.intrests : [],
    subjects: profile ? profile.subjects : [],
  };

  const [formData, setFormData] = useState(inititalState);
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    dob: "",
    gender: "",
    class: "",
    preffered_language: "",
    intrests: "",
    subjects: "",
  });

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSubmit(true);
  };
  const onselectChange = (
    e:
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSubmit(true);
  };

  const addValue = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (intrest) {
      setIntrests([
        ...Intrests,
        {
          id: Intrests.length + 1,
          value: intrest,
        },
      ]);
      setIntrest("");
      setSubmit(true);
    } else if (subject) {
      setSubjects([
        ...subjects,
        {
          id: subjects.length + 1,
          value: subject,
        },
      ]);
      setSubject("");
      setSubmit(true);
    }
  };

  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (Intrests.length >= 0 || subjects.length >= 0) {
      setFormData({
        ...formData,
        intrests: Intrests.map((intrest) => intrest.value),
        subjects: subjects.map((sub) => sub.value),
      });
    }
    setFormErrors({
      ...formErrors,
      name: validate("name", formData.name),
      phone: validate("phone", formData.phone),
      gender: validate("gender", formData.gender),
      class: validate("class", formData.standard),
      dob: validate("dob", formData.dob),
      preffered_language: validate(
        "preffered_language",
        formData.preffered_language
      ),
      intrests: validate("intrests", formData.intrests),
      subjects: validate("subjects", formData.subjects),
    });
    setIsSubmit(true);
  };

  useEffect(() => {
    if (
      isSubmit &&
      submit &&
      !formErrors.class &&
      !formErrors.dob &&
      !formErrors.gender &&
      !formErrors.intrests &&
      !formErrors.name &&
      !formErrors.phone &&
      !formErrors.preffered_language &&
      !formErrors.subjects
    ) {
      dispatch(updateProfile(formData));
    }
  }, [formData, isSubmit, formErrors, submit, dispatch]);

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage?.message);
      dispatch(reset());
    }
    if (isSuccess) {
      setIsSubmit(false);
    }
  }, [isError, errorMessage, setIsSubmit, isSuccess, dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex flex-col  rounded-lg ring-1 p-3 pb-10 ring-[#4d2389] items-center mt-6 bg-[#302343]">
        <h1 className="text-white text-4xl text-center font-bold my-4">
          Complete your profile
        </h1>
        <div className="w-full bg-[#552794] rounded-full h-[0.2px] mb-2"></div>

        <div className="grid grid-cols-3 w-full px-3 gap-3">
          <div className="md:col-span-1 text-white space-y-1 w-full col-span-3">
            <label htmlFor="text">Name</label>
            {formErrors.name && (
              <small className="text-red-600 ml-2">{formErrors.name}</small>
            )}
            <input
              className="bg-secondary w-full rounded-md text-white"
              type="text"
              name="name"
              placeholder="Enter your Name "
              value={formData.name}
              onChange={onchange}
            />
          </div>
          <div className="md:col-span-1 text-white space-y-1 w-full col-span-3">
            <label htmlFor="text">Phone</label>
            {formErrors.phone && (
              <small className="text-red-600 ml-2">{formErrors.phone}</small>
            )}
            <input
              className="bg-secondary w-full rounded-md text-white"
              placeholder="Enter your phone "
              type="number"
              name="phone"
              value={formData.phone}
              onChange={onchange}
            />
          </div>
          <div className="md:col-span-1 text-white space-y-1 w-full col-span-3">
            <label htmlFor="date">Date of Birth</label>
            {formErrors.dob && (
              <small className="text-red-600 ml-2">{formErrors.dob}</small>
            )}
            <input
              className="bg-secondary w-full rounded-md text-white"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={onselectChange}
            />
          </div>
          <div className="md:col-span-1 text-white space-y-1 w-full col-span-3">
            <label htmlFor="date">Geneder</label>
            {formErrors.gender && (
              <small className="text-red-600 ml-2">{formErrors.gender}</small>
            )}
            <select
              name="gender"
              className="bg-secondary w-full rounded-md text-white"
              onChange={onselectChange}
            >
              {formData.gender ? (
                <option value={formData.gender}> {formData.gender}</option>
              ) : (
                <option value=""></option>
              )}
              <option value="male">Male</option>
              <option value="femail">Female</option>
              <option value="other ">Other</option>
            </select>
          </div>
          <div className="md:col-span-1 text-white space-y-1 w-full col-span-3">
            <label htmlFor="date">Class</label>
            {formErrors.class && (
              <small className="text-red-600 ml-2">{formErrors.class}</small>
            )}
            <select
              name="standard"
              className="bg-secondary w-full rounded-md text-white"
              onChange={onselectChange}
            >
              {formData.standard ? (
                <option value={formData.standard}>{formData.standard}</option>
              ) : (
                <option value=""></option>
              )}
              <option value="LP">LP</option>
              <option value="UP">UP</option>
              <option value="high school">High school</option>
              <option value="higher secondary">Higher Secondary</option>
              <option value="degree">Degree</option>
            </select>
          </div>
          <div className="md:col-span-1 text-white space-y-1 w-full col-span-3">
            <label htmlFor="date">Preffered Language</label>
            {formErrors.preffered_language && (
              <small className="text-red-600 ml-2">
                {formErrors.preffered_language}
              </small>
            )}
            <select
              name="preffered_language"
              className="bg-secondary w-full rounded-md text-white"
              onChange={onselectChange}
            >
              {formData.preffered_language ? (
                <option value={formData.preffered_language}>
                  {formData.preffered_language}
                </option>
              ) : (
                <option value=""></option>
              )}
              <option value="english">English</option>
              <option value="malayalam">Malayalam</option>
              <option value="hindi">Hindi</option>
            </select>
          </div>
          <div className="md:col-span-1 text-white space-y-1 w-full col-span-3">
            <label htmlFor="text">Intrests</label>
            {formErrors.intrests && (
              <small className="text-red-600 ml-2">{formErrors.intrests}</small>
            )}
            <div className="flex flex-wrap gap-3 p-1">
              {Intrests.map((intrest) => {
                return (
                  <SmallLabel
                    intrests={Intrests}
                    id={intrest.id}
                    setIntrests={setIntrests}
                    val={intrest.value}
                    key={intrest.id}
                    setSubmit={setSubmit}
                  />
                );
              })}
            </div>
            <div className="relative">
              <input
                value={intrest}
                onChange={(e) => setIntrest(e.target.value)}
                className="bg-secondary  w-full rounded-md text-white"
                type="text"
              />
              <button
                onClick={addValue}
                className="absolute right-5 top-2 bg-black px-3 rounded-md "
              >
                ADD
              </button>
            </div>
          </div>
          <div className="md:col-span-1 relative text-white space-y-1 w-full col-span-3">
            <label htmlFor="text">Subjects</label>
            {formErrors.subjects && (
              <small className="text-red-600 ml-2">{formErrors.subjects}</small>
            )}
            <div className="flex flex-wrap gap-3 p-1">
              {subjects.map((subject) => {
                return (
                  <SubjectsLabel
                    subjects={subjects}
                    id={subject.id}
                    setSubjects={setSubjects}
                    val={subject.value}
                    setSubmit={setSubmit}
                  />
                );
              })}
            </div>
            <div className="relative">
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="bg-secondary  w-full rounded-md text-white"
                type="text"
              />
              <button
                onClick={addValue}
                className="absolute right-5 top-2 bg-black px-3 rounded-md "
              >
                ADD
              </button>
            </div>
          </div>
        </div>
        {submit && (
          <button
            onClick={submitForm}
            className="bg-primary mt-6 p-2 w-[98%] rounded-md text-gray-200 font-bold"
          >
            SAVE CHANGES
          </button>
        )}
      </div>
    </>
  );
}
