/** @format */

import React, { useState } from "react";
import styles from "./styles.scss";
import { Modal, Toast, ToastContainer, Button } from "react-bootstrap";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { uploadImage } from "../../model/Image";

interface ImageUploaderProps {
	hide: boolean;
	examString: string;
	updateImageURL: (arg: string) => void;
	closeModal: () => void;
}

//code adapted from https://www.npmjs.com/package/react-images-uploading/v/1.0.1
const ImageUploader: React.FunctionComponent<ImageUploaderProps> = ({
	hide,
	examString,
	updateImageURL,
	closeModal,
}) => {
	const [images, setImages] = useState([]);
	const maxNumber = 69;
	// state for Toast to notify user of successful image upload
	const [show, setShow] = useState(false);
	const showToast = () => setShow(true);

	const onChange = (imageList: ImageListType) => {
		// data for submit
		setImages(imageList as never[]);
	};

	// upload the file to firebase
	const fileUpload = (listOfImages: ImageListType) => {
		// currently only let users upload one image at a time
		if (listOfImages.length !== 0) {
			for (const imageToUpload of listOfImages) {
				if (imageToUpload.file != undefined) {
					uploadImage(imageToUpload.file, examString)
						.then((downloadURL) => updateImageURL(downloadURL))
						.catch(() =>
							console.error("tried to upload an empty image"),
						);
				}
			}
		}
		if (images.length !== 0) {
			showToast();
			setTimeout(() => {
				closeModal();
			}, 500);
		}
	};

	return (
		<div>
			<ImageUploading
				multiple
				value={images}
				onChange={onChange}
				maxNumber={maxNumber}
			>
				{({
					imageList,
					onImageUpload,
					onImageUpdate,
					onImageRemove,
					dragProps,
				}) => (
					<Modal show={hide} onHide={close}>
						<Modal.Header>
							<Modal.Title>Upload Image</Modal.Title>
							{/* Toast to notify of success */}
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
						<Modal.Body className={styles.modalLayout}>
							{/* let users add an image if there is not one uploaded yet */}
							{images.length < 1 ? (
								<Button onClick={onImageUpload} {...dragProps}>
									Click or Drop here
								</Button>
							) : (
								""
							)}
							{imageList.map((image, index) => (
								<div className={styles.modalLayout} key={index}>
									{/* display the image being added */}
									<img
										src={image.dataURL}
										alt=''
										width='100%'
									/>
									<div className={styles.buttonRow}>
										{/* upload the chosen image */}
										<Button
											variant='success'
											onClickCapture={() => {
												fileUpload(images);
											}}
										>
											Upload Image
										</Button>
										{/* replace the image with a different one */}
										<Button
											variant='outline-primary'
											onClick={() => onImageUpdate(index)}
										>
											Change Image
										</Button>
										{/* remove the image entirely */}
										<Button
											variant='danger'
											onClick={() => onImageRemove(index)}
										>
											Remove
										</Button>
									</div>
								</div>
							))}
						</Modal.Body>
						<Modal.Footer>
							{/* close the modal */}
							<Button
								variant='outline-primary'
								onClick={closeModal}
							>
								Close
							</Button>
						</Modal.Footer>
					</Modal>
				)}
			</ImageUploading>
		</div>
	);
};
export default ImageUploader;
