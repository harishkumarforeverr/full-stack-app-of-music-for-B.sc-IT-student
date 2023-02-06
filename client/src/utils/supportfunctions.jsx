import { deleteObject, ref } from "firebase/storage";
import { storage } from "../config/firebase.config";

export const filters = [
  { id: 2, name: "Romantic", value: "Romantic" },
  { id: 3, name: "Rock", value: "Rock" },
  { id: 4, name: "Melody", value: "Melody" },
  { id: 5, name: " Jasp", value: "Jasp" },
];

export const filterByLanguage = [
  { id: 1, name: "Hindi", value: "hindi" },
  { id: 2, name: "English", value: "english" },
  { id: 3, name: "Bhojpuri", value: "bhojpuri" },
  { id: 4, name: " South", value: "south" },
];

export const deleteAnObject = (referenceUrl) => {
  const deleteRef = ref(storage, referenceUrl);
  deleteObject(deleteRef)
    .then(() => {
      return true;
    })
    .catch((error) => {
      return false;
    });
};

export const deleteFileObject = (url, isImage) => {};
