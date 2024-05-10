import { useDispatch, useSelector } from "react-redux";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import { useEffect, useState } from "react";
import VideoRequest from "../services/requests/video";
import { setVideos } from "../features/videos/videoSlice";

export default function Videos() {
  useDocumentTitle("Videos");
  const dispatch = useDispatch();
  const videos = useSelector((state) => state.vid.videos);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const response = VideoRequest.index();
    response
      .then((data) => {
        dispatch(setVideos(data));
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const videoElements = videos.map((video) => (
    <div
      className='[&>*]:w-full [&>*]:h-56 sm:[&>*]:h-80 md:[&>*]:h-56 lg:[&>*]:h-[315px]'
      key={video.id}
      dangerouslySetInnerHTML={{ __html: video.path }}
    />
  ));

  return (
    <>
      <div className='flex flex-col gap-10 my-10 mx-6 md:mx-20'>
        <div className='text-3xl lg:text-6xl'>Videos</div>
        {loading ? (
          <div className='w-full h-80 flex items-center justify-center'>
            <img
              src='/assets/images/Anamlogo_large_transparent.gif'
              className='h-40 w-40'
              alt=''
            />
          </div>
        ) : !(videos.length === 0) ? (
          <div className='grid grid-cols-1 md:grid-cols-2 place-content-center gap-4'>
            {videoElements}
          </div>
        ) : (
          <div className='w-full h-80 flex items-center justify-center text-xl font-medium'>
            No videos found
          </div>
        )}
      </div>
    </>
  );
}
