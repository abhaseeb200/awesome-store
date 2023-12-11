const FilterTab = ({ title, handleFilterTab, currentFilterTab }) => {
  return (
    <div
      className={`${
        currentFilterTab === title ? `bg-black text-white` : `text-black bg-white`
      } sm:text-md text-xs capitalize cursor-pointer w-auto disabled:bg-neutral-500 px-5 py-3 font-semibold hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition border-neutral-300 border rounded-md`}
      onClick={() => handleFilterTab(title)}
    >
      {title}
    </div>
  );
};

export default FilterTab;
