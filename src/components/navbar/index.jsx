import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Link, NavLink, useLocation } from "react-router-dom";
import axios from "axios";
import { CiCircleMore, CiSettings } from "react-icons/ci";
import { FiMoreHorizontal } from "react-icons/fi";
import { TbFileInvoice } from "react-icons/tb";
import { RiShoppingBag3Line } from "react-icons/ri";
import { CgMoreO } from "react-icons/cg";
import { IoClose, IoMenu, IoSearch } from "react-icons/io5";
import { LuHeart } from "react-icons/lu";
import { FaRegHeart, FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import Modal from "../modal";
import SearchBar from "../searchBar";
import Login from "../../screens/login";
import Register from "../../screens/register";
import { emptyCarttAction } from "../../redux/actions/cartAction";
import { emptyFavouriteAction } from "../../redux/actions/favouriteAction";
import { currentUserAction } from "../../redux/actions/userAction";
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
  const [searchBarModal, setSearchBarModal] = useState(false);
  // const [isUser, setIsUser] = useState(false);

  const dispatch = useDispatch();

  const { cart } = useSelector((stata) => stata.addToCart);
  const { favourite } = useSelector((stata) => stata.addToFavourite);
  const { userID } = useSelector((state) => state.user);

  const location = useLocation();

  const handleLogout = async () => {
    try {
      await authLogout();
      toast.success("LogOut successfully!", {
        autoClose: 1500,
      });
      dispatch(currentUserAction(""))
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
    document.body.classList.toggle("overflow-hidden");
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

  const handleSearchBarModal = () => {
    setSearchBarModal(true);
  };

  const handleKeyPress = (e) => {
    if (e.ctrlKey && e.key === "y") {
      setSearchBarModal(true);
    }
  };

  useEffect(() => {
    handleNavigation();
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress);
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  return (
    <>
      <Transition.Root show={showSideNav}>
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
                          className="py-2 text-sm font-medium px-2.5 py-3 flex-shrink-0 capitalize text-gray-300 text-neutral-500 hover:text-black"
                          aria-current={item.current ? "page" : undefined}
                        >
                          {item.name}
                        </NavLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 lg:static lg:inset-auto lg:ml-6 lg:pr-0">
                  <div className="relative">
                    <Menu>
                      <Menu.Button
                        style={{ width: "45px", height: "35px" }}
                        className="bg-black text-white rounded-full cursor-pointer w-auto flex items-center justify-center disabled:bg-neutral-500 border-transparent hover:opacity-75 disabled:opacity-50 transition"
                      >
                        <FiMoreHorizontal size="1.4rem" />
                      </Menu.Button>
                      <Menu.Items className="z-30 absolute mt-2 w-56 right-0 origin-top-right divide-y divide-gray-100 overflow-hidden rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none transform opacity-100 scale-100">
                        <Menu.Item>
                          <Link
                            className={`text-gray-900 group flex w-full items-center px-2.5 py-2 text-sm block hover:bg-gray-200`}
                            to="/favourite"
                          >
                            <span>
                              <LuHeart size="1rem" />
                            </span>
                            <span className="ml-1">
                              Favourite {`(${favourite.length})`}
                            </span>
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link
                            className={`text-gray-900 group flex w-full items-center px-2.5 py-2 text-sm block hover:bg-gray-200`}
                            to="/cart"
                          >
                            <span>
                              <RiShoppingBag3Line size="1rem" />
                            </span>
                            <span className="ml-1">
                              Cart {`(${cart.length})`}
                            </span>
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <Link to="/orders">
                            <span className="cursor-pointer text-gray-900 group flex w-full items-center px-2.5 py-2 text-sm block hover:bg-gray-200">
                              <LiaFileInvoiceSolid size="1rem" />
                              <span className="ml-1">My Order</span>
                            </span>
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <span
                            className="cursor-pointer text-gray-900 group flex w-full items-center px-2.5 py-2 text-sm block hover:bg-gray-200"
                            onClick={handleSearchBarModal}
                          >
                            <IoSearch size="1rem" />
                            <span className="ml-1">Search (Ctrl + Y)</span>
                          </span>
                        </Menu.Item>
                      </Menu.Items>
                    </Menu>
                  </div>
                  <span className="ml-2 cursor-pointer w-auto flex disabled:bg-neutral-500 rounded-full bg-black text-white border-transparent font-semibold hover:opacity-75 disabled:opacity-50 transition">
                    {isUser ? (
                      <span
                        onClick={handleLogout}
                        className="flex justify-center items-center"
                        style={{ width: "45px", height: "35px" }}
                      >
                        <MdLogout />
                      </span>
                    ) : (
                      <span
                        onClick={handleModal}
                        className="flex justify-center items-center"
                        style={{ width: "45px", height: "35px" }}
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

      <Modal
        open={searchBarModal}
        setOpen={setSearchBarModal}
        customMaxWidth="searchFullScreen"
        isCloseIcon={true}
      >
        <SearchBar setSearchBarModal={setSearchBarModal} />
      </Modal>
    </>
  );
};

export default Navbar;

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
      className="fixed inset-0 overflow-hidden z-40"
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
