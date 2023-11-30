const Input = ({...props}) => {
  return (
    <input
      {...props}
      className="bg-gray-200 border rounded  text-sm leading-none text-gray-800 py-3 w-full pl-3 mt-2 placeholder:text-sm"
    />
  );
};

export default Input;
