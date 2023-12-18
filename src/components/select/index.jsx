import './style.css'

const Select = ({ children, ...props }) => {
  return <select {...props} className="border border-2 border-black w-full py-2 px-3 custom-select">{children}</select>;
};

export default Select;
