import { Modal } from "flowbite-react";
import { SetStateAction, Dispatch } from "react";
import { Link } from "react-router-dom";
type Prop = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  openModal: boolean;
};
export default function AskTutorStudent({ openModal, setOpenModal }: Prop) {
  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h1 className="mb-5 text-5xl font-black text-primary">I am a</h1>
            <div className="flex w-full justify-center gap-4">
              <Link
                to={"/student/signup"}
                className="bg-primary font-semibold w-full text-white rounded-md py-2"
              >
                STUDENT
              </Link>
              <Link
                to={"/tutor/signup"}
                className="bg-primary font-semibold w-full text-white rounded-md py-2"
              >
                TEACHER
              </Link>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
