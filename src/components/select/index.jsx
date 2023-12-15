const Select = ({ children, ...props }) => {
  return <select {...props} className="border border-2 border-black w-full py-2 px-2">{children}</select>;
};

export default Select;
