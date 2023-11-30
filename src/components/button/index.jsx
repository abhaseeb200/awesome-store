const Button = ({ name, className, children, ...props }) => {
  return (
    <button
      {...props}
      className={`w-auto disabled:bg-neutral-500 rounded bg-black text-white px-5 py-3 font-semibold hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition mt-6 flex items-center gap-x-2 ${className}`}
    >
      {name}
      {children}
    </button>
  );
};

export default Button;

//make sure children, name are perfect code...?
