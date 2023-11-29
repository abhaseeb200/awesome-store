const CardProductDetails = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-6 space-y-8 myPadding mt-5">
      <div className=" flex flex-col-reverse gap-5">
        <div className="grid grid-cols-4 gap-6">
          <button className="ring-2 ring-offset-4 ring-black outline-none rounded-lg w-full aspect-square relative">
            <img
              className="object-contain rounded-lg"
              style={{
                position: "absolute",
                height: "100%",
                width: "100%",
                left: 0,
                top: 0,
                right: 0,
                bottom: 0,
                color: "transparent",
              }}
              src="https://next13-e-commerce-frontend.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdrhzjli1l%2Fimage%2Fupload%2Fv1697368985%2Fbou8gyq5otftsbcmbzwq.avif&w=1080&q=75"
            />
          </button>
        </div>
        <div>
          <div className="w-full aspect-square  border rounded-xl p-2 ">
            <div className="w-full aspect-square relative  rounded-xl ">
              <img
                className="object-contain rounded-xl"
                style={{
                  position: "absolute",
                  height: "100%",
                  width: "100%",
                  left: 0,
                  top: 0,
                  right: 0,
                  bottom: 0,
                  color: "transparent",
                }}
                sizes="100vw"
                src="https://next13-e-commerce-frontend.vercel.app/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fdrhzjli1l%2Fimage%2Fupload%2Fv1697368985%2Fbou8gyq5otftsbcmbzwq.avif&w=1080&q=75"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h2 className="text-3xl font-bold">Gray Casual Pants</h2>
        <div className="text-2xl mt-3">
          <div className="font-semibold">$40.00</div>
        </div>
        <hr className="my-6" />
        <div className="flex flex-col gap-y-4">
          <div className="flex gap-x-2 items-center">
            <p className="font-semibold">Size: </p>
            <p>Large</p>
          </div>
          <div className="flex gap-x-2 items-center">
            <p className="font-semibold">Color: </p>
            <span
              title="Gray"
              style={{ backgroundColor: "#888" }}
              className="p-3 rounded-full border"
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold">Describtion</h2>
            <p className="text-sm text-gray-600 max-h-[300px] overflow-y-auto  mySecondScroll pr-2 text-justify">
              Discover our versatile and stylish collection of casual pants.
              Made from high-quality fabrics, these pants offer both comfort and
              fashion-forward appeal. With a range of colors and patterns
              available, you can effortlessly create trendy outfits for any
              occasion. Dress them up or down to suit your personal style.
              Upgrade your casual wardrobe today and embrace a fashionable and
              comfortable look.
            </p>
          </div>
        </div>
        <button className="w-auto disabled:bg-neutral-500 rounded-full bg-black text-white border-transparent px-5 py-3 font-semibold hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed transition mt-6 flex items-center gap-x-2">
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default CardProductDetails;
