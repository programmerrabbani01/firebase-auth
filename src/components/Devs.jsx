import { useEffect, useState } from "react";
import {
  createDeVs,
  deleteDeVsRealTimeData,
  // getAllDeVs,
  getAllDeVsRealTimeData,
} from "../firebase/database.js";
import { serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase/index.js";

const Devs = () => {
  const [input, setInput] = useState({
    name: "",
    age: "",
    skill: "",
    photo: "",
    createdAt: serverTimestamp(),
    status: true,
    trash: false,
  });
  const [deVs, setDeVs] = useState([]);
  const [file, setFile] = useState([]);

  console.log(file);

  //  handle input change

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // handle DeVs Create

  const handleDeVsCreate = async (e) => {
    e.preventDefault();

    const fileRef = ref(storage, file.name);

    const fileData = await uploadBytesResumable(fileRef, file);

    const link = await getDownloadURL(fileData.ref);

    await createDeVs("Developers", { ...input, photo: link });

    setInput({
      name: "",
      age: "",
      skill: "",
    });
  };

  // handle delete data

  const handleDeleteData = async (id) => {
    await deleteDeVsRealTimeData("Developers", id);
  };

  // get all Developers data

  // useEffect(() => {
  //   const getAllDeVsData = async () => {
  //     const allDeVs = await getAllDeVs("Developers");

  //     setDeVs(allDeVs);
  //   };

  //   getAllDeVsData();
  // }, [getAllDeVs]);

  useEffect(() => {
    getAllDeVsRealTimeData("Developers", setDeVs);
  }, []);
  return (
    <>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <div className="card">
              <div className="card-header">
                <form onSubmit={handleDeVsCreate}>
                  <div className="my-3">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Type Your Name"
                      className="form-control"
                      name="name"
                      value={input.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="my-3">
                    <label>Age</label>
                    <input
                      type="text"
                      placeholder="Type Your Age"
                      className="form-control"
                      name="age"
                      value={input.age}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="my-3">
                    <label>Skill</label>
                    <input
                      type="text"
                      placeholder="Type Your Skill"
                      className="form-control"
                      name="skill"
                      value={input.skill}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="my-3">
                    <label>Photo</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>

                  <div className="my-3">
                    <button className="btn btn-primary" type="submit">
                      Add Now
                    </button>
                  </div>
                </form>
              </div>
              <div className="card-body">
                <table className="table table-striped ">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Photo</th>
                      <th>Name</th>
                      <th>Age</th>
                      <th>Skill</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="align-middle">
                    {deVs.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>
                            <img
                              style={{
                                width: "50px",
                                height: "50px",
                                objectFit: "cover",
                              }}
                              src={item.photo}
                              alt=""
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.age}</td>
                          <td>{item.skill}</td>
                          <td>
                            <button>View</button>
                            <button>Edit</button>
                            <button onClick={() => handleDeleteData(item.id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Devs;
