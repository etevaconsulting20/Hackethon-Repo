import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "src/config/firebaseConfig";

export const schemaCollectionRef = collection(db, "schema");
export const dataCollectionRef = collection(db, "data");

const getDoc = (type, id) => doc(db, type, id);

export const getSchemaDoc = (id) => getDoc("schema", id);
export const getDataDoc = async (id) => await getDoc("data", id);

export const addData = async (payload) => {
  return await addDoc(dataCollectionRef, payload);
};

export const updateData = async (payload) => {
  const dataDoc = getDataDoc(payload.id);
  return await updateDoc(dataDoc, payload);
};

export const deleteData = async (id) => {
  const dataDoc = getDataDoc(id);
  return await deleteDoc(dataDoc);
};

export const getFormData = async () => {
  const data = await getDocs(dataCollectionRef);
  const data2 = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  return data2;
};
