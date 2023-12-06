import { BsFacebook } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { Input } from "postcss";
import Button from "../../components/button";

const Register = ({handleLoginModal, setOpenLoginModal}) => {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* LOGO HERE */}
      <div className="bg-white shadow rounded w-full p-10 mt-16">
        <p className="focus:outline-none text-2xl font-extrabold leading-6 text-gray-800 pb-8 text-center">
          Register your account free
        </p>
        <div>
          <label
            className="text-sm font-medium leading-none text-gray-800"
          >
            Email
          </label>
          {/* <Input type="email" placeholder="example@gamil.com" /> */}
        </div>
        <div className="mt-6  w-full">
          <label
            className="text-sm font-medium leading-none text-gray-800"
          >
            Password
          </label>
          <div className="relative flex items-center justify-center">
            {/* <Input type="password" placeholder="············" /> */}
          </div>
        </div>
        <div className="mt-6  w-full">
          <label
            className="text-sm font-medium leading-none text-gray-800"
          >
            Confrim password
          </label>
          <div className="relative flex items-center justify-center">
            {/* <Input type="password" placeholder="············" /> */}
          </div>
        </div>
        <div className="mt-8">
          <Button name="Login" className="w-full justify-center text-sm" />
        </div>
        <div className="w-full flex items-center justify-between mt-6">
          <hr className="w-full bg-gray-400" />
          <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
            OR
          </p>
          <hr className="w-full bg-gray-400  " />
        </div>

        <Button className="border border-gray-700 bg-transparent w-full">
          <FcGoogle size="1.5rem" />
          <p className="text-base font-medium ml-1 text-gray-700">
            Continue with Google
          </p>
        </Button>
        <Button className="border border-gray-700 bg-transparent w-full">
          <BsFacebook size="1.5rem" color="#4267B2 " />
          <p className="text-base font-medium ml-1 text-gray-700">
            Continue with Facebook
          </p>
        </Button>

        <p className="focus:outline-none text-md mt-4 font-medium leading-none text-gray-500 text-center pb-4">
          Already have account?
          <a
            href="#"
            className="hover:text-gray-500 focus:text-gray-500 focus:outline-none focus:underline hover:underline text-md ml-2 leading-none  text-gray-800 cursor-pointer"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
