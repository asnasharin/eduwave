import { Modal } from "flowbite-react";
import { SetStateAction, Dispatch, useState, useRef } from "react";
import ReactCrop, {
  type Crop,
  makeAspectCrop,
  centerCrop,
  convertToPixelCrop,
} from "react-image-crop";
import setCanvasPreview from "../util/setCanvasPreview";

type ModalType = {
  openModal: boolean;
  setOpenModal: Dispatch<SetStateAction<boolean>>;
  setCropDone: Dispatch<SetStateAction<boolean>>;
  setCroppedImage: Dispatch<SetStateAction<File | undefined>>;
};

const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

export default function CropModal({
  openModal,
  setOpenModal,
  setCropDone,
  setCroppedImage,
}: ModalType) {
  const [image, setImage] = useState("");
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  const [crop, setCrop] = useState<Crop>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const imageElement = new Image();
        const imageUrl = reader.result?.toString() || "";
        imageElement.src = imageUrl;
        setImage(imageUrl);
      });
      reader.readAsDataURL(file);
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const { width, height } = e.currentTarget;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: cropWidthInPercent,
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body className=" rounded-md">
          <div className="text-center">
            <label className="block mb-3 w-fit">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-xs file:bg-gray-700 file:text-sky-300 hover:file:bg-gray-600"
              />
            </label>
            {image && (
              <>
                <div className="flex flex-col items-center">
                  <ReactCrop
                    crop={crop}
                    onChange={(_pixelCrop, percentCrop) => setCrop(percentCrop)}
                    keepSelection
                    aspect={ASPECT_RATIO}
                    minWidth={MIN_DIMENSION}
                  >
                    <img
                      ref={imgRef}
                      src={image}
                      alt="Upload"
                      onLoad={onImageLoad}
                    />
                  </ReactCrop>
                  <button
                    className="text-white font-medium text-xs py-2 px-4 rounded-2xl mt-4 bg-primary hover:bg-[#422c5f]"
                    onClick={async () => {
                      setCanvasPreview(
                        imgRef?.current as unknown as HTMLImageElement, // HTMLImageElement
                        previewCanvasRef?.current as unknown as HTMLCanvasElement, // HTMLCanvasElement
                        convertToPixelCrop(
                          crop as Crop,
                          (imgRef?.current as unknown as HTMLImageElement)
                            .width,
                          (imgRef?.current as unknown as HTMLImageElement)
                            .height
                        )
                      );
                      async function convertUrlToFile(
                        url: string,
                        filename: string,
                        mimeType: string
                      ): Promise<File> {
                        const response = await fetch(url);
                        const blob = await response.blob();
                        return new File([blob], filename, { type: mimeType });
                      }

                      if (previewCanvasRef.current) {
                        const dataUrl = (
                          previewCanvasRef?.current as HTMLCanvasElement
                        ).toDataURL();
                        const filename: string = Date.now().toString();
                        const imageFile = await convertUrlToFile(
                          dataUrl,
                          filename,
                          "image/jpeg"
                        );
                        setCroppedImage(imageFile);
                        setCropDone(true);
                        setOpenModal(false);
                      }
                    }}
                  >
                    Crop Image
                  </button>
                </div>
                {crop && (
                  <canvas
                    ref={previewCanvasRef}
                    className="mt-4"
                    style={{
                      display: "none",
                      border: "1px solid black",
                      objectFit: "contain",
                      width: 150,
                      height: 150,
                    }}
                  />
                )}
              </>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
