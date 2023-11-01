// import Devs from "./components/Devs.jsx";
import { useEffect, useState } from "react";
import Registration from "./components/Registration.jsx";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/index.js";
import Login from "./components/Login.jsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState();

  useEffect(() => {
    // kono user login obosthai ace ki na ta check korar jonno

    const authState = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(user);
        console.log(user);
      } else {
        console.log("No User Found");
      }
    });

    return () => authState();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

            <hr />

            {isLoggedIn && (
              <>
                <h3>{isLoggedIn?.displayName}</h3>
                <h4>{isLoggedIn?.email}</h4>
                <img
                  src={isLoggedIn?.photoURL}
                  style={{ width: "100px", height: "100px" }}
                  alt=""
                />
              </>
            )}
          </div>
          <div className="col-md-6">
            <Registration
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
            />
          </div>
        </div>
      </div>
      {/* <Devs /> */}
    </>
  );
}

export default App;
