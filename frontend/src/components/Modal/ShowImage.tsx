import { Modal } from "flowbite-react";
import { Dispatch, SetStateAction } from "react";

type Prop = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  opentModal: boolean;
  url: string;
  setImage: Dispatch<SetStateAction<string>>;
};

export default function ShowImage({
  opentModal,
  setOpenModal,
  setImage,
  url,
}: Prop) {
  return (
    <>
      <Modal
        show={opentModal}
        size="md"
        onClose={() => {
          setOpenModal(false);
          setImage("");
        }}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <img src={url} className="w-full" alt="" />
        </Modal.Body>
      </Modal>
    </>
  );
}
