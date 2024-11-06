import { Dispatch, SetStateAction } from "react";
import { Modal } from "flowbite-react";

type prop = {
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  opentModal: boolean;
  url: string;
  setVideo: Dispatch<SetStateAction<string>>;
};
export default function ShowVideo({
  opentModal,
  setVideo,
  setOpenModal,
  url,
}: prop) {
  return (
    <>
      <Modal
        show={opentModal}
        size="md"
        onClose={() => {
          setOpenModal(false);
          setVideo("");
        }}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <video controls  controlsList="nodownload" autoPlay >
            <source type="" src={url} />
          </video>
        </Modal.Body>
      </Modal>
    </>
  );
}
