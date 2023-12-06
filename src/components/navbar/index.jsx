import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { RiShoppingBag3Line } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { Fragment, useRef, useState } from "react";
import Modal from "../modal";
import Login from "../../screens/login";
import "./style.css";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Button from "../button";
import Register from "../../screens/register";

const Navbar = () => {
  const [openLoginModal, setOpenLoginModal] = useState(false);
  const [openRegisterModal, setOpenRegisterModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const cancelButtonRef = useRef(null);

  const { productData } = useSelector((state) => state.data);
  const { cart } = useSelector((stata) => stata.addToCart);

  const navigation = [];
  Object.keys(productData).map((item) => {
    let temp = { name: item, to: item, current: false };
    navigation.push(temp);
  });
  // console.log(navigation,"-------------------------------");

  function classNames(...classes) {
    return classes.filter(Boolean).join(" "); //make sure
  }

  const handleLoginModal = () => {
    setOpenLoginModal(true);
  };

  const handleRegisterModal = () => {
    setOpenLoginModal(false);
    // setOpenRegisterModal(true);
  };

  return (
    <div>
      <Disclosure as="nav" className="bg-white/70 hover:bg-white border-b">
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
              <div className="relative flex h-16  items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="absolute -inset-0.5" />
                    <IoMenu />
                    <span className="sr-only">Open main menu</span>
                    {/* {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )} */}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                  <div className="flex flex-shrink-0 items-center md:text-3xl text-xl font-semibold">
                    Awessome
                  </div>
                  <div className="hidden sm:ml-6 sm:block">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          to={`/category/${item.to}`}
                          className={classNames(
                            item.current
                              ? "text-black border-b-2 border-black"
                              : "text-gray-300 text-neutral-500 hover:text-black",
                            "py-2 text-sm font-medium px-4 py-3 flex-shrink-0"
                          )}
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <span
                    onClick={handleLoginModal}
                    className="cursor-pointer disabled:bg-neutral-500 rounded-full bg-black text-white border-transparent font-semibold hover:opacity-75 disabled:opacity-50 transition px-4 py-2.5"
                  >
                    <FaRegUser />
                  </span>
                  <Link
                    to="/cart"
                    className="ml-4 w-auto disabled:bg-neutral-500 rounded-full bg-black text-white border-transparent font-semibold hover:opacity-75 disabled:opacity-50 transition px-4 py-2 flex items-center justify-center"
                  >
                    <span className="">
                      <RiShoppingBag3Line size="1.25rem" />
                    </span>
                    <span className="ml-2 text-sm text-white">
                      {cart.length}
                    </span>
                  </Link>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

      <Modal
        open={openLoginModal}
        setOpen={setOpenLoginModal}
        cancelButtonRef={cancelButtonRef}
        customMaxWidth="custom-max-width"
      >
        {isLogin ? (
          <Login
            setIsLogin={setIsLogin}
            // handleRegisterModal={handleRegisterModal}
            // setOpenRegisterModal={setOpenRegisterModal}
            // open={open}
            // setOpen={setOpen}
            // cancelButtonRef={cancelButtonRef}
          />
        ) : (
          <Register />
        )}
      </Modal>

      {/* <Modal
        open={openRegisterModal}
        setOpen={setOpenRegisterModal}
        // cancelButtonRef={cancelButtonRef}
        // customMaxWidth="custom-max-width"
      >
        <Register
          // handleLoginModal={handleLoginModal}
          // setOpenLoginModa={setOpenLoginModal}
        />
      </Modal> */}
    </div>
  );
};

export default Navbar;
