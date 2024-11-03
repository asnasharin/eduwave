import { useEffect, useState } from "react";
import QulificationLabel from "../smallComponents/QualificationLab";
import LanguagesLabel from "../smallComponents/LanguagesLabel";
import { useAppDispatch, useAppSelector } from "../../app/store";
import { validate } from "../util/validateForms";
import { updateProfile } from "../../features/users/userService";
import Loader from "../Loader/Loader1/Loader";
import { teacherQualifications, indianLanguages } from "../../utils";

export type ElementTyoe = {
  id: number;
  value: string;
};
export default function TutorProfileCard() {
  const dispatch = useAppDispatch();
  const { profile, isLoading } = useAppSelector((state) => state.userProfile);

  const qualification: string[] = profile?.qualification
    ? (profile?.qualification as string[])
    : ([] as string[]);
  const initialQualification: ElementTyoe[] = [];
  for (let i = 0; i < (qualification as string[]).length; i++) {
    initialQualification.push({
      id: i,
      value: (qualification as string[])[i],
    });
  }
  const languages: string[] = profile?.languages
    ? (profile?.languages as string[])
    : ([] as string[]);
  const initialLanguages: ElementTyoe[] | null = [];
  for (let i = 0; i < (languages as string[]).length; i++) {
    initialLanguages.push({
      id: i,
      value: (languages as string[])[i],
    });
  }

  const [Qualifications, setQualifications] =
    useState<ElementTyoe[]>(initialQualification);
  const [Languages, setLanguages] = useState<ElementTyoe[]>(initialLanguages);
  const [submit, setSubmit] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);

  const inititalState = {
    name: profile ? profile.name : "",
    phone: profile ? JSON.stringify(profile.phone) : "",
    bio: profile ? profile.bio : "",
    qualification: profile ? profile.qualification : [],
    languages: profile ? profile.languages : [],
    pricing: profile ? profile.pricing : "",
  };

  const [formData, setFormData] = useState(inititalState);
  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    bio: "",
    qualification: "",
    languages: "",
    pricing: "",
  });

  const onchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setSubmit(true);
  };

  const submitForm = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (Qualifications.length >= 0 || Languages.length >= 0) {
      setFormData({
        ...formData,
        languages: Languages.map((e) => e.value),
        qualification: Qualifications.map((e) => e.value),
      });
    }
    setFormErrors({
      ...formErrors,
      name: validate("name", formData.name),
      phone: validate("phone", formData.phone),
      bio: validate("bio", formData.bio),
      languages: validate("languages", formData.languages),
      qualification: validate("qualification", formData.qualification),
      pricing: validate("pricing", formData.pricing),
    });
    setIsSubmit(true);
  };

  useEffect(() => {
    if (
      isSubmit &&
      !formErrors.name &&
      !formErrors.phone &&
      !formErrors.languages &&
      !formErrors.qualification &&
      !formErrors.pricing &&
      !formErrors.bio &&
      formData.languages &&
      formData.name &&
      formData.bio &&
      formData.phone &&
      formData.qualification
    ) {
      dispatch(updateProfile(formData));
      setIsSubmit(false);
    }
  }, [formData, isSubmit, formErrors, dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <>
      <div className="flex flex-col  rounded-lg ring-1 p-3 pb-10 ring-[#4d2389] items-center bg-[#302343]">
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
            <label htmlFor="date">Bio</label>
            {formErrors.bio && (
              <small className="text-red-600 ml-2">{formErrors.bio}</small>
            )}
            <input
              className="bg-secondary w-full rounded-md text-white"
              type="text"
              name="bio"
              value={formData.bio}
              onChange={onchange}
              placeholder="eg: Passionate about teaching"
            />
          </div>
          <div className="md:col-span-1 text-white space-y-1 w-full col-span-3">
            <label htmlFor="date">Pricing</label>
            {formErrors.pricing && (
              <small className="text-red-600 ml-2">{formErrors.pricing}</small>
            )}
            <input
              className="bg-secondary w-full rounded-md text-white"
              type="number"
              name="pricing"
              placeholder="Enter your pricing for 1 hour"
              value={formData.pricing}
              onChange={onchange}
            />
          </div>

          <div className="md:col-span-1 text-white space-y-1 w-full col-span-3">
            <label htmlFor="text">Qualifications</label>
            {formErrors.qualification && (
              <small className="text-red-600 ml-2">
                {formErrors.qualification}
              </small>
            )}
            <div className="flex flex-wrap gap-3 p-1">
              {Qualifications.map((intrest) => {
                return (
                  <QulificationLabel
                    qualifications={Qualifications}
                    id={intrest.id}
                    setQualifications={setQualifications}
                    val={intrest.value}
                    key={intrest.id}
                    setSubmit={setSubmit}
                  />
                );
              })}
            </div>
            <div className="relative">
              <select
                onChange={(e) => {
                  if (
                    !Qualifications.find((q) => q.value === e.target.value) &&
                    e.target.value
                  ) {
                    setQualifications([
                      ...Qualifications,
                      {
                        id: Qualifications.length + 1,
                        value: e.target.value,
                      },
                    ]);
                    setSubmit(true);
                  } else {
                    setQualifications(
                      Qualifications.filter((q) => q.value !== e.target.value)
                    );
                    setSubmit(true);
                  }
                }}
                name="qualification"
                className="bg-secondary  w-full rounded-md text-gray-200"
              >
                <option value="">-select qualification-</option>
                {teacherQualifications.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="md:col-span-1 relative text-white space-y-1 w-full col-span-3">
            <label htmlFor="text">Languages</label>
            {formErrors.languages && (
              <small className="text-red-600 ml-2">
                {formErrors.languages}
              </small>
            )}
            <div className="flex flex-wrap gap-3 p-1">
              {Languages.map((languae) => {
                return (
                  <LanguagesLabel
                    languages={Languages}
                    id={languae.id}
                    setLanguages={setLanguages}
                    val={languae.value}
                    setSubmit={setSubmit}
                    key={languae.id}
                  />
                );
              })}
            </div>
            <div className="relative">
              <select
                onChange={(e) => {
                  if (
                    !Languages.find((q) => q.value === e.target.value) &&
                    e.target.value
                  ) {
                    setLanguages([
                      ...Languages,
                      {
                        id: Languages.length + 1,
                        value: e.target.value,
                      },
                    ]);
                    setSubmit(true);
                  } else {
                    setLanguages(
                      Languages.filter((q) => q.value !== e.target.value)
                    );
                    setSubmit(true);
                  }
                }}
                name="language"
                className="bg-secondary  w-full rounded-md text-gray-200"
              >
                <option value="">-select language-</option>
                {indianLanguages.map((e) => (
                  <option value={e}>{e}</option>
                ))}
              </select>
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
