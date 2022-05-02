/** @format */

import React, { useState } from "react";
import styles from "./styles.scss";
import { Modal, Toast, ToastContainer } from "react-bootstrap";
import ImageUploading, {
	ImageListType,
	ImageType,
} from "react-images-uploading";
import { uploadImage } from "../../model/Image";

interface ImageUploaderProps {
	hide: boolean;
	examString: string;
	updateImageUrl: (arg:string) => void,
	closeModal: () => void;
}

//code from https://www.npmjs.com/package/react-images-uploading/v/1.0.1
const ImageUploader: React.FunctionComponent<ImageUploaderProps> = ({
	hide,
	examString,
	updateImageUrl,
	closeModal,
}) => {
	const [images, setImages] = useState([]);
	const maxNumber = 69;
	const [show, setShow] = useState(false);
	const showToast = () => setShow(true);

	const onChange = (
		imageList: ImageListType,
		addUpdateIndex: number[] | undefined,
	) => {
		// data for submit
		console.log(imageList, addUpdateIndex);
		setImages(imageList as never[]);
	};
	const fileUpload = (listOfImages: ImageListType) => {
		
		if (listOfImages.length != 0) {
			for (let imageToUpload of listOfImages) {
				if (imageToUpload.file != undefined) {
					uploadImage(imageToUpload.file, examString)
						.then((downloadURL) => updateImageUrl(downloadURL))
						.catch(() => console.log("tried to upload an empty image"));
					console.log("button to upload pressed");
					// } else {
					// 
					// }
				}
			}
		} 
		if (images.length != 0) {
			showToast();
			setTimeout(() => {
				closeModal();
			}, 500);
		}
	};

	return (
		<div className='ImageUploader'>
			<ImageUploading
				multiple
				value={images}
				onChange={onChange}
				maxNumber={maxNumber}
			>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps,
				}) => (
					// write your building UI
					<Modal
						dialogClassName={styles.modal}
						show={hide}
						onHide={close}
					>
						<Modal.Header>
							<Modal.Title>Upload Image</Modal.Title>
							<ToastContainer position='top-center'>
								<Toast
									onClose={() => setShow(false)}
									show={show}
									delay={3000}
									autohide
								>
									<Toast.Body>Image Added!</Toast.Body>
								</Toast>
							</ToastContainer>
						</Modal.Header>
						<Modal.Body>
							<div className='upload__image-wrapper'>
								<button
									onClickCapture={() => {
										fileUpload(images);
									}}
								>
									{" "}
									Upload Images{" "}
								</button>
								<button
									style={
										isDragging
											? { color: "red" }
											: undefined
									}
									onClick={onImageUpload}
									{...dragProps}
								>
									Click or Drop here
								</button>
								&nbsp;
								<button onClick={onImageRemoveAll}>
									Remove image
								</button>
								{imageList.map((image, index) => (
									<div key={index} className='image-item'>
										<img
											src={image.dataURL}
											alt=''
											width='100'
										/>
										<div className='image-item__btn-wrapper'>
											<button
												onClick={() =>
													onImageUpdate(index)
												}
											>
												Update
											</button>
											<button
												onClick={() =>
													onImageRemove(index)
												}
											>
												Remove
											</button>
										</div>
									</div>
								))}
							</div>
						</Modal.Body>
						<Modal.Footer>
							<button
								className={styles.close}
								onClick={closeModal}
							>
								{" "}
								Close{" "}
							</button>
						</Modal.Footer>
					</Modal>
				)}
			</ImageUploading>
		</div>
	);
};
export default ImageUploader;
