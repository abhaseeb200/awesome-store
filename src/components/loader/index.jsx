import { BiLoaderAlt } from "react-icons/bi";

const Loader = ({ className }) => {
  return (
    <div className={`flex justify-center items-center ${className}`}>
      <BiLoaderAlt size="3rem" className="animate-spin" />
    </div>
  );
};

export default Loader;
