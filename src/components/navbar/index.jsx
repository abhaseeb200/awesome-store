import { useRef, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { RiShoppingBag3Line } from "react-icons/ri";
import { IoMenu } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Modal from "../modal";
import Login from "../../screens/login";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Register from "../../screens/register";
import { authLogout, authState } from "../../config/services/firebase/auth";
import { TbLoader2 } from "react-icons/tb";
import { toast } from "react-toastify";
import { emptyCarttAction } from "../../redux/actions/cartAction";
import { IoMdHeartEmpty } from "react-icons/io";

const Navbar = ({ loaderAuthIcon, isUser, loaderCart }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const cancelButtonRef = useRef(null);

  const dispatch = useDispatch();

  const { productData } = useSelector((state) => state.data);
  const { cart } = useSelector((stata) => stata.addToCart);
  const { favourite } = useSelector((stata) => stata.addToFavourite);

  const navigation = [];
  Object.keys(productData).map((item) => {
    let temp = { name: item, to: item };
    navigation.push(temp);
  });

  function classNames(...classes) {
    return classes.filter(Boolean).join(" "); //make sure
  }

  const handleModal = () => {
    setOpenModal(true);
  };

  const handleLogout = async () => {
    try {
      let response = await authLogout();
      toast.success("LogOut successfully!", {
        autoClose: 1500,
      });
      dispatch(emptyCarttAction());
    } catch (error) {
      toast.success(error, {
        autoClose: 1500,
      });
    }
  };

  return (
    <div>
      <Disclosure as="nav" className="bg-white/70 hover:bg-white border-b">
        {({ open }) => (
          <>
            <div className="px-1 lg:px-9">
              <div className="relative flex h-16 items-center justify-between">
                <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-black hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
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
                          key={item.name}
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
                    className="mr-4 w-auto disabled:bg-neutral-500 rounded-full bg-black text-white border-transparent font-semibold hover:opacity-75 disabled:opacity-50 transition px-4 py-2 flex items-center justify-center"
                  >
                    <span className="">
                      <IoMdHeartEmpty size="1.25rem" />
                    </span>
                    <span className="ml-2 text-sm text-white">
                      {favourite.length}
                    </span>
                  </Link>
                  <Link
                    to="/cart"
                    className="mr-4 w-auto disabled:bg-neutral-500 rounded-full bg-black text-white border-transparent font-semibold hover:opacity-75 disabled:opacity-50 transition px-4 py-2 flex items-center justify-center"
                  >
                    <span className="">
                      <RiShoppingBag3Line size="1.25rem" />
                    </span>
                    <span className="ml-2 text-sm text-white">
                      {cart.length}
                    </span>
                  </Link>
                  <span className="cursor-pointer w-auto flex items-center justify-center disabled:bg-neutral-500 rounded-full bg-black text-white border-transparent font-semibold hover:opacity-75 disabled:opacity-50 transition">
                    {loaderAuthIcon ? (
                      <span className="px-4 py-2.5">
                        <TbLoader2 size="1rem" className="animate-spin" />
                      </span>
                    ) : isUser ? (
                      <span className="px-4 py-2.5" onClick={handleLogout}>
                        <MdLogout />
                      </span>
                    ) : (
                      <span onClick={handleModal} className="px-4 py-2.5">
                        <FaRegUser />
                      </span>
                    )}
                  </span>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="lg:hidden">
              <div className="space-y-1 px-2 pb-3 pt-2 flex flex-col">
                {navigation.map((item, index) => (
                  <NavLink
                    key={item.name}
                    to={`/category/${item.to}`}
                    className={classNames(
                      item.current
                        ? "text-red border-b-2 border-black"
                        : "text-gray-300 text-neutral-500 hover:text-black",
                      "py-2 text-sm font-medium px-4 py-3 flex-shrink-0 capitalize"
                    )}
                    aria-current={item.current ? "page" : undefined}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </Disclosure.Panel>
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
    </div>
  );
};

export default Navbar;
