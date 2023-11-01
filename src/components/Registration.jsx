import { serverTimestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth, storage } from "../firebase/index.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Registration = ({ isLoggedIn, setIsLoggedIn }) => {
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    photo: "",
    createdAt: serverTimestamp(),
    status: true,
    trash: false,
  });
  const [file, setFile] = useState([]);

  //  handle input change

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   handle Registration

  const handleRegistration = async (e) => {
    e.preventDefault();

    const fileRef = ref(storage, file.name);

    const fileData = await uploadBytesResumable(fileRef, file);

    const link = await getDownloadURL(fileData.ref);

    const data = await createUserWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );

    await updateProfile(data.user, {
      displayName: input.name,
      photoURL: link,
    });

    // await signOut(auth);
    // setIsLoggedIn(false);

    setInput({
      name: "",
      email: "",
      password: "",
      photo: "",
    });
  };

  // handle LogOut

  // const handleLogOut = async () => {
  //   await signOut(auth);
  //   setIsLoggedIn(false);
  // };

  return (
    <>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-10">
            <div className="card">
              <div className="card-header">
                <h1 className="text-center">Register Now</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleRegistration}>
                  <div className="my-3">
                    <label>Name</label>
                    <input
                      type="text"
                      placeholder="Type Your Name ...."
                      className="form-control"
                      name="name"
                      value={input.name}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="my-3">
                    <label>Email</label>
                    <input
                      type="email"
                      placeholder="Type Your Email ...."
                      className="form-control"
                      name="email"
                      value={input.email}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="my-3">
                    <label>Password</label>
                    <input
                      type="password"
                      placeholder="Type Your Password ...."
                      className="form-control"
                      name="password"
                      value={input.password}
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

                  <div className="my-3 text-center">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Register Now
                    </button>
                  </div>
                </form>
                {/* {isLoggedIn ? (
                  <div className="text-center">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={handleLogOut}
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <h5 className="text-center" style={{ color: "red" }}>
                    You Need Log In
                  </h5>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Registration;
