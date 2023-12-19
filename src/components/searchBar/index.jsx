import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbLoader2 } from "react-icons/tb";
import { HiOutlineSearch } from "react-icons/hi";
import axios from "axios";
import Button from "../button";
import Input from "../input/index";
import addToSearchAction from "../../redux/actions/searchAction";
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
      handleQueryFetch();
    }
  };

  console.log(searchProducts, "_________________--");

  const handleQueryFetch = async () => {
    setSearchLoader(true);
    try {
      let response = await axios.get(
        `https://dummyjson.com/products/search?q=${search.trim()}`
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
      console.log(updateData);
      navigate("/search");
      dispatch(
        addToSearchAction(updateData, response.config.url, search.trim())
      );
      setSearch("");
      setSearchBarModal(false);
      setSearchLoader(false);
    } catch (error) {
      console.log(error);
      setSearchLoader(false);
      setSearchBarModal(false);
    }
  };

  return (
    <div className="">
      <form className="flex items-center">
        <div className="relative w-5/6 mr-2">
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
        <div className="w-1/6 relative">
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

      <div className="mt-5">
        <h2 className="font-medium text-xl">Recent Searched</h2>
        <div className="mt-2">
          {/* {searchProducts?.RecentSearched?.map((item) => {
            return (
              <div className="flex items-center gap-2">
                <span>
                  <HiOutlineSearch />
                </span>
                <span>{item}</span>
              </div>
            );
          })} */}
          <div className="flex items-center gap-2">
            <span>
              <HiOutlineSearch />
            </span>
            <span>Laptop</span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <HiOutlineSearch />
            </span>
            <span>Mobiles</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
