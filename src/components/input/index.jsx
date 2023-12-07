const Input = ({ isError, messageError, ...props }) => {
  return (
    <>
      <input
        {...props}
        className={`${
          isError && `validationError`
        } bg-gray-200 border rounded  text-sm leading-none text-gray-800 py-3 w-full pl-3 mt-2 placeholder:text-sm`}
      />
      {messageError !== "" ? (
        <small className="text-red-500 block absolute ">{messageError}</small>
      ) : (
        ""
      )}
    </>
  );
};

export default Input;
