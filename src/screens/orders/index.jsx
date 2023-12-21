import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineSearch } from "react-icons/hi";
import Input from "../../components/input";

const Orders = ({ loaderOrder, productsOrder }) => {
  const [search, setSearch] = useState("");
  const [productsOrderBackUP, setProductsOrderBackUP] = useState([]);

  const handleSearchOrderID = (e) => {
    let val = e.target.value.trim().toLowerCase();
    setSearch(e.target.value);
    if (val !== "") {
      let findOrder = productsOrder.filter(
        (order) => order.timeStamp == val || order.status === val
      );
      // console.log(findOrder, "____");
      setProductsOrderBackUP(findOrder);
    } else {
      setProductsOrderBackUP(productsOrder);
    }
  };

  useEffect(() => {
    console.log(productsOrder,"-----");
    setProductsOrderBackUP(productsOrder);
  }, [productsOrder]);

  return (
    <div className="myPadding flex-1 min-h-[700px]">
      <div className="flex sm:py-10 py-5">
        <h2 className="font-medium text-3xl w-1/2">My Orders</h2>
        <div className="w-1/2 flex">
          <form className="flex relative w-full">
            <Input
              placeholder="Search Order..."
              value={search}
              onChange={handleSearchOrderID}
              style={{
                border: "2px solid",
                marginTop: "0",
                background: "none",
              }}
            />
            <span className="absolute right-3 top-3">
              <HiOutlineSearch size="1.2rem" />
            </span>
          </form>
        </div>
      </div>
      {loaderOrder ? (
        <div className="animate-pulse">
          <div className="bg-gray-300 p-4"></div>
          <div className="bg-gray-300 p-4 mt-2"></div>
          <div className="bg-gray-300 p-4 mt-2"></div>
          <div className="bg-gray-300 p-4 mt-2"></div>
        </div>
      ) : productsOrderBackUP?.length > 0 ? (
        <table className="border-collapse border border-slate-500 w-full">
          <thead>
            <tr>
              <th className="border border-slate-600 text-left p-2 sm:p-4 bg-gray-300">
                Order ID
              </th>
              <th className="border border-slate-600 text-left p-2 sm:p-4 bg-gray-300">
                Order Status
              </th>
              <th className="border border-slate-600 text-left p-2 sm:p-4 bg-gray-300">
                View Orders
              </th>
            </tr>
          </thead>
          <tbody>
            {productsOrderBackUP.map((order, index) => {
              return (
                <Fragment key={index}>
                  <tr>
                    <td className="border border-slate-700 py-2 sm:px-4 px-2 text-sm sm:text-base">
                      {order.timeStamp}
                    </td>
                    <td className="border border-slate-700 py-2 sm:px-4 px-2 capitalize text-sm sm:text-base">
                      {order.status}
                    </td>
                    <td className="border border-slate-700 py-2 sm:px-4 px-2">
                      <Link
                        to={`/orders/${order.timeStamp}`}
                        className="hover:underline underline-offset-4 decoration-2 text-sm sm:text-base"
                      >
                        View Products
                      </Link>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>No order is found</p>
      )}
    </div>
  );
};

export default Orders;
