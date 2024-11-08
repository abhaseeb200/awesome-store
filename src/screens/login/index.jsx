import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FcGoogle } from "react-icons/fc";
import { TbLoader2 } from "react-icons/tb";
import Button from "../../components/button";
import Input from "../../components/input";
import { currentUserAction } from "../../redux/actions/userAction";
import {
  authSignIn,
  authWithGoogle,
} from "../../config/services/firebase/auth";
import { setUsers } from "../../config/services/firebase/users";

const Login = ({ setIsLogin, setOpenModal }) => {
  const [loader, setLoader] = useState(false);
  const [email, setEmail] = useState({
    value: "",
    isError: false,
    messageError: "",
  });
  const [password, setPassword] = useState({
    value: "",
    isError: false,
    messageError: "",
  });

  const handleEmail = (e) => {
    let emailVal = e.target.value.trim();
    if (emailVal === "") {
      setEmail({
        value: emailVal,
        isError: true,
        messageError: "Please enter your email address.",
      });
    } else if (
      !emailVal
        .trim()
        .charAt(0)
        .match(/[a-zA-Z/]/)
    ) {
      setEmail({
        value: emailVal,
        isError: true,
        messageError: "Email must start with a letter",
      });
    } else if (emailVal.charAt(emailVal.length - 4) === "@") {
      setEmail({
        value: emailVal,
        isError: true,
        messageError: "@ isn't used in last 4 charactor",
      });
    } else {
      setEmail({
        value: emailVal,
        isError: false,
        messageError: "",
      });
    }
  };

  const handlePassword = (e) => {
    let passwordVal = e.target.value;
    if (passwordVal === "") {
      setPassword({
        value: e.target.value,
        isError: true,
        messageError: "Please enter your password",
      });
    } else if (passwordVal.length < 6) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password should be greater than 6",
      });
    } else if (!passwordVal.match(/[a-zA-Z/]/)) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password required Alphabats",
      });
    } else if (!passwordVal.match(/[0-9]/)) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password required Numbers",
      });
    } else if (!passwordVal.match(/[!@#$%^&*]/)) {
      setPassword({
        value: passwordVal,
        isError: true,
        messageError: "Password required Special Character",
      });
    } else {
      setPassword({
        value: passwordVal,
        isError: false,
        messageError: "",
      });
    }
  };

  const dispatch = useDispatch()

  const signInHandler = async (e) => {
    e.preventDefault();
    if (email.value === "") {
      setEmail({
        value: email.value,
        isError: true,
        messageError: "Please enter your email address",
      });
    }
    if (password.value === "") {
      setPassword({
        value: password.value,
        isError: true,
        messageError: "Please enter your password",
      });
    }

    if (email.value === "" || password.value === "") {
      return;
    }

    //validation cheeck
    if (!email.isError && !password.isError) {
      try {
        setLoader(true);
        const userCredential = await authSignIn(email.value, password.value);
        const user = userCredential.user;
        dispatch(currentUserAction(user.uid))
        setLoader(false);
        setOpenModal(false);
        toast.success("Login successfully!", {
          autoClose: 1500,
        });
      } catch (err) {
        setLoader(false);
        toast.error(err.code, {
          autoClose: 1500,
        });
      }
    }
  };

  const handleAuthWithGoogle = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      let response = await authWithGoogle();
      let user = response.user;
      let isNewUser = response.additionalUserInfo.isNewUser;
      console.log({ response }, "USER >>>>>>");
      if (isNewUser) {
        await setUsers(user.email, user.displayName, user.uid);
      }
      dispatch(currentUserAction(user.uid));
      setOpenModal(false);
      toast.success("Login successfully!", {
        autoClose: 1500,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        autoClose: 1500,
      });
    } finally {
      setLoader(false);
    }
  };



  return (
    <>
      <div className="flex flex-col items-center justify-center">
        {/* LOGO HERE */}
        <form className="bg-white shadow rounded w-full sm:p-10 p-5 mt-5">
          <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 pb-8 text-center">
            Welcome to Awesome Store
          </p>
          <div>
            <label
              id="email"
              className="text-sm font-medium leading-none text-gray-800"
            >
              Email
            </label>
            <Input
              type="email"
              placeholder="example@gamil.com"
              value={email.value}
              isError={email.isError}
              messageError={email.messageError}
              onChange={handleEmail}
            />
          </div>
          <div className="mt-6  w-full">
            <label
              htmlFor="pass"
              className="text-sm font-medium leading-none text-gray-800"
            >
              Password
            </label>
            <Input
              type="password"
              placeholder="············"
              value={password.value}
              isError={password.isError}
              messageError={password.messageError}
              onChange={handlePassword}
              autoComplete="off"
            />
          </div>
          <div className="mt-8">
            {loader ? (
              <Button
                className="w-full justify-center text-sm"
                disabled="disabled"
              >
                <TbLoader2 size="1.3rem" className="animate-spin" />
              </Button>
            ) : (
              <Button
                name="Login"
                className="w-full justify-center text-sm"
                onClick={signInHandler}
              />
            )}
          </div>
          <div className="w-full flex items-center justify-between mt-6">
            <hr className="w-full bg-gray-400" />
            <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
              OR
            </p>
            <hr className="w-full bg-gray-400  " />
          </div>

          <Button
            className="border border-gray-700 bg-transparent w-full"
            onClick={handleAuthWithGoogle}
          >
            <FcGoogle size="1.5rem" />
            <p className="text-base font-medium ml-1 text-gray-700">
              Continue with Google
            </p>
          </Button>

          <p className="focus:outline-none text-md mt-4 font-medium leading-none text-gray-500 text-center pb-4">
            Dont have account?
            <span
              onClick={() => setIsLogin(false)}
              className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-md ml-2 leading-none  text-gray-800 cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
