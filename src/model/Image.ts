/** @format */

//Note code is based off of Google firebase docs see https://firebase.google.com/docs/storage/web/upload-files
import {
	getStorage,
	ref,
	uploadBytesResumable,
	getDownloadURL,
} from "firebase/storage";

//Upload Image and Get URL to store in question field

export function uploadImage(imageFile: File, examName: string) {
	const storage = getStorage();
	const storageRef = ref(
		storage,
		"images/" + examName + "/" + imageFile.name,
	);
	const uploadTask = uploadBytesResumable(storageRef, imageFile);
	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
	// 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	return new Promise<string>((resolve, reject) => {
		uploadTask.on(
			"state_changed",
			(snapshot) => {
				// Observe state change events such as progress, pause, and resume
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				const progress =
					(snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
			},
			(error) => {
				// Handle unsuccessful uploads
				console.log("There was an error!", error.message);
				reject(new Error("Failed to upload image"));
			},
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					resolve(downloadURL);
				});
			},
		);
	});
}
