import Select from "../select";

const SortingProducts = ({ handleSorting }) => {
  
  return (
    <Select onChange={handleSorting}>
      <option value="0" select="select">
        Relevance
      </option>
      <option value="lowToHighPrice">Price Low - High</option>
      <option value="highToLowPrice">Price High - Low</option>
      <option value="AToZ">A - Z</option>
      <option value="ZToA">Z - A</option>
    </Select>
  );
};

export default SortingProducts;
