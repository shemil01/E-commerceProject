import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./register.css";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";
import myContext from "../../UseContext/Context";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { Axios } from "../Mainrouter";

const Login = () => {
  const loginNavigate = useNavigate();
  const { setUserData, setLog } = useContext(myContext);

  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please fill in the email and password");
      return;
    }

    Axios.post("/user/login", user, {
      withCredentials: true,
    })
      .then((response) => {
        // console.log(response.data);
        const { token, userData } = response.data;
        Cookies.set("token", token, { expires: 1 });
        localStorage.setItem("token", token);
        const userInfo = JSON.stringify(userData);
        localStorage.setItem("userInfo", userInfo);
        toast.success(response.data.message);
        loginNavigate("/");
        setLog(true)
        setUserData(user);
      })
      .catch((error) => {
        console.error("Login error", error);
        toast.error(error.response.data.message);
      });
  };
  return (
    <div
    // className="sign-item d-flex justify-content-center"
    // style={{
    //   backgroundImage: `url(https://static.nike.com/a/images/w_1920,c_limit/5413be7e-44cb-4fe1-bf60-88ba5f72381b/the-best-white-sneakers-by-nike.jpg)`,
    //   color: "black",
    // }}
    >
      <MDBContainer className="my-5 gradient-form px-auto">
        <MDBRow className="px-auto">
          <MDBCol className="mb-5 col-6 mx-auto">
            <div className="d-flex flex-column">
              <div className="text-center">
                <img
                  src="https://websitedemos.net/recycled-shoe-store-04/wp-content/uploads/sites/983/2021/11/cropped-favicon-180x180.png"
                  style={{ width: "185px" }}
                  alt="logo"
                />
                <h4 className="mt-1 mb-5 pb-1">
                  We are The plashoe shoppy team
                </h4>
              </div>

              <p>Please login to your account</p>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Email address"
                  id="form1"
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Password"
                  id="form2"
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                />

                <MDBBtn className="mb-4 w-100 gradient-custom-2">Login</MDBBtn>
              </form>
              <a className="text-muted" href="#!">
                Forgot password?
              </a>
            </div>

            <div className="d-flex flex-row align-items-center justify-content-center pb-4 mb-4">
              <p className="mb-0">Don't have an account?</p>
              <MDBBtn
                outline
                className="mx-2"
                color="danger"
                onClick={() => loginNavigate("/signup")}
              >
                REGISER
              </MDBBtn>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
};

export default Login;
