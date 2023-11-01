import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";
import { auth, facebookAuthProvider, googleAuthProvider } from "../firebase/index.js";

const Login = ({ isLoggedIn, setIsLoggedIn }) => {
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  //  handle input change

  const handleInputChange = (e) => {
    setInput((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //   handle LogIn

  const handleLogIn = async (e) => {
    e.preventDefault();

    const data = await signInWithEmailAndPassword(
      auth,
      input.email,
      input.password
    );

    setIsLoggedIn(data.user);
    signOut(auth);

    setInput({
      email: "",
      password: "",
    });
  };

  // handle Google login

  const handleGoogleLogin = async () => {
    const data = await signInWithPopup(auth, googleAuthProvider);
    setIsLoggedIn(data.user);
  };

  // handle facebook login

  const handleFacebookLogin = async () => {
    const data = await signInWithPopup(auth, facebookAuthProvider);
    setIsLoggedIn(data.user);
  };

  // handle LogOut

  const handleLogOut = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };
  return (
    <>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header">
                <h1 className="text-center">Log In Now</h1>
              </div>
              <div className="card-body">
                <form onSubmit={handleLogIn}>
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

                  <div className="my-3 text-center">
                    <button type="submit" className="btn btn-primary btn-sm">
                      Log In
                    </button>
                  </div>
                </form>

                <hr />
                <div className="text-center">
                  <h5>Log In Method</h5>
                  <br />
                  <br />
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleGoogleLogin}
                  >
                    Google
                  </button>
                  &nbsp; or &nbsp;
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={handleFacebookLogin}
                  >
                    Facebook
                  </button>
                </div>

                <hr />

                {isLoggedIn ? (
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
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
