const ColorButton = ({ title, background }) => {
  return (
    <span
      title={title}
      className="p-3 rounded-full border cursor-pointer"
      style={{ backgroundColor: `${background}` }}
    />
  );
};

export default ColorButton;
