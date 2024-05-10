import { useSelector } from "react-redux";
export default function Welcome() {
  const user = useSelector((state) => state.auth.user);

  return (
    <>
      <div className='relative px-4 md:px-14 bg-cover w-full h-[40vh] lg:h-[60vh] bg-fixed bg-right lg:bg-bottom bg-no-repeat bg-[url("/assets/images/legion-commanders.png")]'>
        <div className='absolute stroke-1 top-28 lg:top-36 text-5xl lg:text-[66px] text-stroke-1'>
          Welcome to checklist tool!
        </div>
      </div>
      <div className='flex flex-col my-20 md:px-20 lg:flex-row lg:justify-between gap-4'>
        <div className='flex flex-col gap-10 w-full md:w-1/2'>
          {user === null && (
            <p className='text-2xl underline'>
              You must be logged in to use the checklist tool!
            </p>
          )}

          <p>
            This handy tool lets you manage your Lost Ark tasks with ease.
            Create checklists, track progress, and stay on top of your in-game
            goals.
          </p>
          <p>
            No more forgetting those crucial daily quests or missing out on
            valuable weekly rewards and Misoria forgetting about GVG gold.
          </p>
        </div>
        <div className='w-full md:w-1/3'>
          <video
            src='/assets/videos/meteor.mp4'
            className='w-full'
            autoPlay
            loop
            muted
          ></video>
        </div>
      </div>
    </>
  );
}
