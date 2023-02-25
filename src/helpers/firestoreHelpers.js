import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

export const schemaCollectionRef = collection(db, "schema");
export const dataCollectionRef = collection(db, "data");

const getDoc = (type, id) => doc(db, type, id);

export const getSchemaDoc = (id) => getDoc("schema", id);
export const getDataDoc = (id) => getDoc("data", id);

export const addData = async (payload) => {
  return await addDoc(dataCollectionRef, payload);
};

export const updateData = async (payload) => {
  return await updateDoc(dataCollectionRef, payload);
};

export const deleteData = async (id) => {
  const dataDoc = getDataDoc(id);
  return await deleteDoc(dataDoc);
};
