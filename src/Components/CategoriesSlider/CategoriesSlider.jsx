import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { ThreeCircles } from "react-loader-spinner";

import useAllCategories from "../useAllCategories/useAllCategories";

export default function CategoriesSlider() {
    // const [allCategories, setAllCategories] = useState(null)

    // async function getCategories() {
    //      axios.get(
    //       "https://ecommerce.routemisr.com/api/v1/categories"
    //     )
    //          .then((res) => {
    //              console.log(res.data.data);
    //              setAllCategories(res.data.data);
            
    //     })
    //          .catch((res) => {
    //         console.log(res.data);
            
    //     })
        
        
    // }
    // useEffect(() => {
    //     getCategories();
    // },[])
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 10,
    slidesToScroll: 5,
  };
  const {data , isError , isLoading } = useAllCategories()

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
      <Slider {...settings} arrows={false}>
          
            {data.data.data.map((category) => {
              return (
                <div key={category._id}>
                  <img
                    className="w-full h-20"
                    src={category.image}
                    alt={category.name}
                  />
                  <h5 className="text-lg">{category.name}</h5>
                </div>
              );
            })}

        </Slider>
    </>
  );
}
