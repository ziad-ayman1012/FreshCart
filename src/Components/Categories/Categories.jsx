

import { ThreeCircles } from "react-loader-spinner";

import useAllCategories from "../useAllCategories/useAllCategories";

export default function Categories() {
  const { data, isError, isLoading } = useAllCategories();

  if (isLoading) {
    return (
      <>
        <div className="h-screen flex justify-center items-center">
          <ThreeCircles
            visible={true}
            height="80"
            width="80"
            color="#bcf06d"
            ariaLabel="three-circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      </>
    );
  }

  if (isError) {
    
    <>
      <div
        className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
        role="alert"
      >
        <span className="font-medium">Not Found</span>
      </div>
    </>;
  }
  return (
    <>
      <div className="container mx-auto px-20">
        <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 py-20 gap-4">
          {data.data.data.map((brand) => {
            return (
              <div
                key={brand._id}
                className="brand rounded-lg md:block text-center relative group overflow-hidden"
              >
                <img src={brand.image} className="w-96 h-80 " alt={brand.name} />
                <div className="layer flex items-center justify-center text-lg bg-blue-200 absolute top-0 left-0 right-0 bottom-0 translate-y-[200%] group-hover:translate-y-0 transition-all">
                  <h2>{brand.name}</h2>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

