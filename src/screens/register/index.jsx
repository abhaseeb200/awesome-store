import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { TbLoader2 } from "react-icons/tb";
import Button from "../../components/button";
import Input from "../../components/input";
import { authSignUp, authWithGoogle } from "../../config/services/firebase/auth";
import { toast } from "react-toastify";

const Register = ({ setIsLogin, setOpenModal }) => {
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
  const [confirmPassword, setConfirmPassword] = useState({
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

    if (passwordVal !== "") {
      if (
        passwordVal !== confirmPassword.value &&
        confirmPassword.value !== ""
      ) {
        setConfirmPassword({
          value: confirmPassword.value,
          isError: true,
          messageError: "Password does't match",
        });
      } else {
        setConfirmPassword({
          value: confirmPassword.value,
          isError: false,
          messageError: "",
        });
      }
    }
  };

  const hanldeConfirmPassword = (e) => {
    let confirmVal = e.target.value;
    if (confirmVal === "") {
      setConfirmPassword({
        value: confirmVal,
        isError: true,
        messageError: "Password can't be empty",
      });
    } else if (confirmVal !== password.value) {
      setConfirmPassword({
        value: confirmVal,
        isError: true,
        messageError: "Password does't match",
      });
    } else {
      setConfirmPassword({
        value: confirmVal,
        isError: false,
        messageError: "",
      });
    }
  };

  const signUpHandler = async (e) => {
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
    if (confirmPassword.value === "") {
      setConfirmPassword({
        value: confirmPassword.value,
        isError: true,
        messageError: "Password can't be empty",
      });
    }

    if (
      email.value === "" ||
      password.value === "" ||
      confirmPassword.value === ""
    ) {
      return;
    }

    //validation cheeck
    if (!email.isError && !password.isError && !confirmPassword.isError) {
      try {
        setLoader(true);
        const userCredential = await authSignUp(email.value, password.value);
        const user = userCredential.user;
        console.log(user, ":________");
        toast.success("Register account successfully!", {
          autoClose: 1500,
        });
        setLoader(false);
        setOpenModal(false)
      } catch (err) {
        console.log(err);
        setLoader(false);
        toast.error(err, {
          autoClose: 1500,
        });
        toast.error(err.message, {
          autoClose: 1500,
        });
      }
    }
  };

  const handleAuthWithGoogle = async () => {
    try {
      let response = await authWithGoogle();
      console.log(response, "+++++++++++++++");
      setOpenModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      {/* LOGO HERE */}
      <div className="bg-white shadow rounded w-full p-10 mt-16">
        <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 pb-8 text-center">
          Register your account free
        </p>
        <div>
          <label className="text-sm font-medium leading-none text-gray-800">
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
          <label className="text-sm font-medium leading-none text-gray-800">
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
        <div className="mt-6  w-full">
          <label className="text-sm font-medium leading-none text-gray-800">
            Confrim password
          </label>
          <Input
            type="password"
            placeholder="············"
            value={confirmPassword.value}
            isError={confirmPassword.isError}
            messageError={confirmPassword.messageError}
            onChange={hanldeConfirmPassword}
            autoComplete="off"
          />
        </div>
        <div className="mt-8">
          <Button
            className="w-full justify-center text-sm"
            onClick={signUpHandler}
          >
            {loader ? (
              <TbLoader2 size="1.4rem" className="animate-spin" />
            ) : (
              "Create an account"
            )}
          </Button>
        </div>
        <div className="w-full flex items-center justify-between mt-6">
          <hr className="w-full bg-gray-400" />
          <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
            OR
          </p>
          <hr className="w-full bg-gray-400  " />
        </div>

        <Button className="border border-gray-700 bg-transparent w-full" onClick={handleAuthWithGoogle}>
          <FcGoogle size="1.5rem" />
          <p className="text-base font-medium ml-1 text-gray-700">
            Continue with Google
          </p>
        </Button>

        <p className="focus:outline-none text-md mt-4 font-medium leading-none text-gray-500 text-center pb-4">
          Already have account?
          <span
            onClick={() => setIsLogin(true)}
            className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-md ml-2 leading-none  text-gray-800 cursor-pointer"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Register;
