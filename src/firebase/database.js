import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { fireBaseApp } from "./index.js";

// init database

export const db = getFirestore(fireBaseApp);

// create developers

export const createDeVs = async (colName, data) => {
  return await addDoc(collection(db, colName), {
    ...data,
  });
};

// get all developers data

export const getAllDeVs = async (colName) => {
  const getAllData = await getDocs(collection(db, colName));

  const getDataList = [];

  getAllData.forEach((item) => {
    getDataList.push(item.data());
  });

  return getDataList;
};

// get all developers data real time

export const getAllDeVsRealTimeData = (colName, stateName) => {
  onSnapshot(
    query(
      collection(db, colName),
      // orderBy("name", "desc"),
      where("status", "==", true)
    ),
    (snapShot) => {
      const dataList = [];

      snapShot.docs.forEach((item) => {
        dataList.push({ ...item.data(), id: item.id });
      });

      stateName(dataList);
      console.log(dataList);
    }
  );
};

// delete developers data real time

export const deleteDeVsRealTimeData = async (colName, id) => {
  await deleteDoc(doc(db, colName, id));
};
