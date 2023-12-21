import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbLoader2 } from "react-icons/tb";
import { HiOutlineSearch } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import Button from "../button";
import Input from "../input/index";
import {
  addToSearchAction,
  removeToSearchAction,
} from "../../redux/actions/searchAction";
import {
  generateRandomColors,
  getRandomSizes,
} from "../../config/services/randomGenerators/randomGenerates";

const SearchBar = ({ setSearchBarModal }) => {
  const [search, setSearch] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);

  const { searchProducts } = useSelector((state) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      handleQueryFetch(search);
    }
  };

  const handleQueryFetch = async (currentSearch) => {
    setSearchLoader(true);
    try {
      let response = await axios.get(
        `https://dummyjson.com/products/search?q=${currentSearch
          .trim()
          .toLowerCase()}`
      );
      let products = response.data.products;
      let updateData = products.map((item) => {
        return {
          ...item,
          sizes: getRandomSizes(item.price),
          quantity: 0,
          colors: generateRandomColors(),
        };
      });
      navigate("/search");
      setSearch("");
      setSearchBarModal(false);
      setSearchLoader(false);
      setTimeout(() => {
        dispatch(
          addToSearchAction(
            updateData,
            response.config.url,
            currentSearch.trim().toLowerCase()
          )
        );
      }, 500);
    } catch (error) {
      console.log(error);
      setSearchLoader(false);
      setSearchBarModal(false);
    }
  };

  const handleRemoveSearch = (currentSearch) => {
    dispatch(removeToSearchAction(currentSearch));
  };

  const handleRecentSearched = (currentSearch) => {
    setSearch(currentSearch);
    handleQueryFetch(currentSearch)
  };

  return (
    <div className="">
      <form className="flex items-center">
        <div className="relative w-3/4 sm:w-5/6 mr-2">
          <Input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginTop: "0" }}
          />
          <div className="absolute top-3 right-3">
            {searchLoader ? (
              <span>
                <TbLoader2 size="1.2rem" className="animate-spin" />
              </span>
            ) : (
              <button onClick={handleSubmit} className="cursor-pointer">
                <HiOutlineSearch size="1.2rem" />
              </button>
            )}
          </div>
        </div>
        <div className="relative w-1/4 sm:w-1/6">
          <Button
            style={{ marginTop: "0", padding: "10px 0" }}
            className="w-full justify-center"
            onClick={(e) => {
              e.preventDefault();
              setSearchBarModal(false);
            }}
          >
            Cancel
          </Button>
        </div>
      </form>

      <div className="mt-7">
        <h2 className="font-medium text-xl">Recent Searched</h2>
        <div className="mt-4">
          {searchProducts.recentSearched.map((item, index) => {
            return (
              <div
                className="flex items-center justify-between py-1 px-2 hover:bg-gray-300"
                key={index}
              >
                <div
                  className="flex gap-3 items-center w-full cursor-pointer"
                  onClick={() => handleRecentSearched(item)}
                >
                  <span>
                    <HiOutlineSearch size="1.1rem" />
                  </span>
                  <span className="capitalize">{item}</span>
                </div>
                <div className="cursor-pointer hover:bg-black hover:text-white p-0.5">
                  <IoClose
                    size="1.1rem"
                    onClick={() => handleRemoveSearch(item)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
