import { useDocumentTitle } from "../hooks/useDocumentTitle";
import LightGallery from "lightgallery/react";

import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ImageRequest from "../services/requests/image";
import { setImages } from "../features/images/imageSlice";

export default function Images() {
  useDocumentTitle("Images");
  const dispatch = useDispatch();
  const images = useSelector((state) => state.img.images);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const response = ImageRequest.index();
    response
      .then((data) => {
        dispatch(setImages(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const imageElements = images.map((image) => (
    <a key={image.id} href={`http://localhost:8000/storage/${image.path}`}>
      <img
        alt={image.alt || "Image"}
        src={`http://localhost:8000/storage/${image.path}`}
        className=' object-cover h-full'
      />
    </a>
  ));

  console.log(imageElements);

  return (
    <>
      <div className='flex flex-col gap-10 my-10 mx-6 md:mx-20'>
        <div className='text-3xl lg:text-6xl'>Gallery</div>
        {loading ? (
          <div className='w-full h-80 flex items-center justify-center'>
            <img
              src='/assets/images/Anamlogo_large_transparent.gif'
              className='h-40 w-40'
              alt=''
            />
          </div>
        ) : !(images.length === 0) ? (
          <LightGallery
            speed={500}
            plugins={[lgThumbnail, lgZoom]}
            elementClassNames='grid grid-cols-2 md:grid-cols-3 place-content-center gap-4'
          >
            {imageElements}
          </LightGallery>
        ) : (
          <div className='w-full h-80 flex items-center justify-center text-xl font-medium'>
            No images found
          </div>
        )}
      </div>
    </>
  );
}
