

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
      <div className="container mx-auto">
        <div className="grid grid-cols-4 py-20 gap-4 px-20">
          {data.data.data.map((brand) => {
            return (
              <div
                key={brand._id}
                className="brand rounded-lg bg-blue-200 text-center"
              >
                <img src={brand.image} className="w-full" alt={brand.name} />
                <h2>{brand.name}</h2>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

