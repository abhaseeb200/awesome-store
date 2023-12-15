import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { TbLoader2 } from "react-icons/tb";
import axios from "axios";
import Button from "../button";
import Input from "../input/index";
import addToSearchAction from "../../redux/actions/searchAction";
import { generateRandomColors, getRandomSizes } from "../../config/services/randomGenerators/randomGenerates";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const [searchLoader, setSearchLoader] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== "") {
      console.log(search, "----");
      handleQueryFetch();
    }
  };

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
      dispatch(addToSearchAction(updateData, response.config.url));
      setSearchLoader(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="px-4 md:p-8 lg:px-10"
      style={{ paddingBottom: "0", paddingTop: "10px" }}
    >
      <form className="flex items-center">
        <div className="relative w-2/3 mr-2">
          <Input
            type="text"
            placeholder="Search Products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ marginTop: "0" }}
          />
        </div>
        <div className="w-1/3">
          {searchLoader ? (
            <Button
              className="inline-flex w-full items-center justify-center py-2.5 px-3 text-sm font-medium text-white border mt-0"
              disabled
            >
              <TbLoader2 size="1.3rem" className="animate-spin" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              name="Search"
              className="inline-flex w-full items-center justify-center py-2.5 px-3 text-sm font-medium text-white border mt-0"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
