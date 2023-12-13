import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Disclosure, Transition } from "@headlessui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { RiShoppingBag3Line } from "react-icons/ri";
import { IoClose, IoMenu } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import Modal from "../modal";
import Login from "../../screens/login";
import Register from "../../screens/register";
import { emptyCarttAction } from "../../redux/actions/cartAction";
import { emptyFavouriteAction } from "../../redux/actions/favouriteAction";
import { authLogout } from "../../config/services/firebase/auth";
import "./style.css";

const Navbar = ({
  isUser,
  handleModal,
  openModal,
  setOpenModal,
  cancelButtonRef,
}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [navigation, setNavigation] = useState([]);
  const [showSideNav, setShowSideNav] = useState(false);

  const dispatch = useDispatch();

  const { cart } = useSelector((stata) => stata.addToCart);
  const { favourite } = useSelector((stata) => stata.addToFavourite);

  const location = useLocation();

  const handleLogout = async () => {
    try {
      await authLogout();
      toast.success("LogOut successfully!", {
        autoClose: 1500,
      });
      dispatch(emptyCarttAction());
      dispatch(emptyFavouriteAction());
    } catch (error) {
      toast.success(error, {
        autoClose: 1500,
      });
    }
  };

  const handleShowSideNav = () => {
    setShowSideNav(!showSideNav);
  };

  const handleNavigation = async () => {
    try {
      let response = await axios.get(
        "https://dummyjson.com/products/categories"
      );
      let navTemp = [];
      let data = response.data.slice(0, 6);
      data.map((item) => {
        let temp = { name: item, to: item };
        navTemp.push(temp);
      });
      setNavigation(navTemp);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleNavigation();
  }, []);

  return (
    <>
      <Transition.Root show={showSideNav}>
        <BackgroundLayer />
        <SlideOverLayer handleShowSideNav={handleShowSideNav}>
          <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col mysidenav">
            <h2 className="text-foreground text-2xl font-semibold pb-4">
              Categories
            </h2>
            {navigation.map((item, index) => (
              <Link
                key={index}
                to={`/category/${item.to}`}
                className={`py-4 text-md font-medium flex-shrink-0 capitalize text-gray-300 text-neutral-500 hover:text-black ${
                  location.pathname === `/category/${item.to}` && "active"
                }`}
                aria-current={item.current ? "page" : undefined}
                onClick={() => handleShowSideNav()}
              >
                {item.name}
              </Link>
            ))}
          </div>
          <span className="absolute top-4 right-4 cursor-pointer">
            <IoClose size="1.1rem" onClick={() => handleShowSideNav()} />
          </span>
        </SlideOverLayer>
      </Transition.Root>
      <Disclosure as="nav" className="bg-white/70 hover:bg-white border-b">
        {({ open }) => (
          <>
            <div className="px-1 lg:px-9">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button
                    onClick={() => handleShowSideNav()}
                    className="relative inline-flex items-center justify-center rounded-md p-2 text-black"
                  >
                    <span className="absolute -inset-0.5" />
                    <IoMenu size="1.5rem" />
                    <span className="sr-only">Open main menu</span>
                  </Disclosure.Button>
                </div>
                <div className="flex flex-1 items-center lg:items-stretch lg:justify-start">
                  <div className="flex flex-shrink-0 items-center md:text-3xl text-xl font-semibold pl-10 lg:p-0">
                    <Link to="/">Awessome </Link>
                  </div>
                  <div className="hidden lg:ml-6 lg:block">
                    <div className="flex space-x-2">
                      {navigation.map((item, index) => (
                        <NavLink
                          key={index}
                          to={`/category/${item.to}`}
                          className="py-2 text-sm font-medium px-4 py-3 flex-shrink-0 capitalize text-gray-300 text-neutral-500 hover:text-black"
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                  <Link
                    to="/favourite"
                    className="sm:mr-4 mr-1 w-auto disabled:bg-neutral-500 rounded-full bg-black text-white border-transparent font-semibold hover:opacity-75 disabled:opacity-50 transition sm:px-4 sm:py-2 px-2 py-1.5 flex items-center justify-center"
                  >
                    <span className="cursor-pointer">
                      <IoMdHeartEmpty size="1.25rem" />
                    </span>
                    <span className="ml-2 text-sm text-white">
                      {favourite.length}
                    </span>
                  </Link>
                  <Link
                    to="/cart"
                    className="sm:mr-4 mr-1 w-auto disabled:bg-neutral-500 rounded-full bg-black text-white border-transparent font-semibold hover:opacity-75 disabled:opacity-50 transition sm:px-4 sm:py-2 px-2 py-1.5 flex items-center justify-center"
                  >
                    <span className="">
                      <RiShoppingBag3Line size="1.25rem" />
                    </span>
                    <span className="ml-2 text-sm text-white">
                      {cart.length}
                    </span>
                  </Link>
                  <span className="cursor-pointer w-auto flex items-center justify-center disabled:bg-neutral-500 rounded-full bg-black text-white border-transparent font-semibold hover:opacity-75 disabled:opacity-50 transition">
                    {isUser ? (
                      <span
                        className="sm:px-4 sm:py-2.5 px-3 py-2"
                        onClick={handleLogout}
                      >
                        <MdLogout />
                      </span>
                    ) : (
                      <span
                        onClick={handleModal}
                        className="sm:px-4 sm:py-2.5 px-3 py-2"
                      >
                        <FaRegUser />
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>
          </>
        )}
      </Disclosure>

      <Modal
        open={openModal}
        setOpen={setOpenModal}
        cancelButtonRef={cancelButtonRef}
        setIsLogin={setIsLogin}
        customMaxWidth="custom-max-width"
      >
        {isLogin ? (
          <Login setIsLogin={setIsLogin} setOpenModal={setOpenModal} />
        ) : (
          <Register setIsLogin={setIsLogin} setOpenModal={setOpenModal} />
        )}
      </Modal>
    </>
  );
};

export default Navbar;

const BackgroundLayer = () => (
  <Transition.Child
    enter="transition-opacity ease-in-out duration-500"
    enterFrom="opacity-0"
    enterTo="opacity-100"
    leave="transition-opacity ease-in-out duration-500"
    leaveFrom="opacity-100"
    leaveTo="opacity-0"
    className="relative z-10 w-full h-full block cursor-pointer"
  >
    <div className="fixed inset-0 bg-gray-500 opacity-75" />
  </Transition.Child>
);

const SlideOverLayer = ({ handleShowSideNav, children }) => (
  <Transition.Child
    as={Fragment}
    enter="transform transition ease-in-out duration-500"
    enterFrom="translate-x-full"
    enterTo="translate-x-0"
    leave="transform transition ease-in-out duration-500 delay-100"
    leaveFrom="translate-x-0"
    leaveTo="translate-x-full"
  >
    <div
      className="fixed inset-0 overflow-hidden z-20"
      onClick={() => handleShowSideNav()}
    >
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="fixed inset-y-0 right-0 flex"
          style={{ maxWidth: "80%" }}
          onClick={(e) => e.preventDefault()}
        >
          <div className="w-screen max-w-2xl">
            <div className="flex h-full flex-col bg-white py-6 shadow-xl">
              <div className="px-4 sm:px-6">{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition.Child>
);
