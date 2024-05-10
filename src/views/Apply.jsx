import { useEffect, useRef, useState } from "react";
import { useDocumentTitle } from "../hooks/useDocumentTitle";
import UserRequest from "../services/requests/user";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setUserInGuild } from "../features/auth/authSlice";
import JoinUs from "../components/layouts/default/JoinUs";
import InputLayout from "../components/apply/InputLayout";
import ApplicationRequest from "../services/requests/application";
import Swal from "sweetalert2/src/sweetalert2.js";
import { useHasRole } from "../hooks/useHasRole";

function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default function Apply() {
  const dispatch = useDispatch();
  const userInGuild = useSelector((state) => state.auth.userInGuild);
  const user = useSelector((state) => state.auth.token);
  const isGuildMember = useHasRole("Guildmate");
  const isTrailMember = useHasRole("Trial Member");
  const [isLoading, setIsLoading] = useState(true);

  const serverRef = useRef();
  const serverNameRef = useRef();
  const descriptionRef = useRef();
  const experienceRef = useRef();
  const playTimeRef = useRef();
  const gvgRef = useRef();
  const gveRef = useRef();
  const serverExpectationsRef = useRef();
  const inquirySourceRef = useRef();
  const additionalInfoRef = useRef();
  const guildCooldownRef = useRef();
  const acquaintancesRef = useRef();

  useDocumentTitle("Apply");

  function handleImage(file, image) {
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      image.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      image.nextElementSibling.innerHTML = "Invalid file extension";
      return false;
    }

    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
      image.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      image.nextElementSibling.innerHTML = "File size exceeds the limit";
      return false;
    }
    return true;
  }

  function required(payload, id) {
    if (payload[id] == "") {
      const input = document.getElementById(id);
      input.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      input.classList.add("border-2", "border-red-600");
      setTimeout(() => {
        input.classList.remove("border-2", "border-red-600");
      }, 3000);
      return false;
    }
    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const image = document.getElementById("image");
    const payload = {
      in_server: serverRef.current.value,
      server: serverNameRef.current.value,
      description: descriptionRef.current.value,
      experience: experienceRef.current.value,
      play_time: playTimeRef.current.value,
      gvg: gvgRef.current.value,
      gve: gveRef.current.value,
      server_expectations: serverExpectationsRef.current.value,
      inquiry_source: inquirySourceRef.current.value,
      additional_info: additionalInfoRef.current.value,
      guild_cooldown: guildCooldownRef.current.value,
      acquaintances: acquaintancesRef.current.value,
    };
    if (
      required(payload, "in_server") &&
      required(payload, "description") &&
      required(payload, "experience") &&
      required(payload, "play_time") &&
      required(payload, "gvg") &&
      required(payload, "gve") &&
      required(payload, "server_expectations") &&
      required(payload, "inquiry_source")
    ) {
      if (image.files && image.files[0]) {
        let formData = new FormData();
        let file = image.files[0];

        if (handleImage(file, image)) {
          formData.append("image", file);
          for (const key in payload) {
            formData.append(key, payload[key]);
          }

          const response = ApplicationRequest.store(formData);
          response
            .then((data) => {
              Swal.fire({
                title: "Success!",
                html: data.message,
                icon: "success",
                confirmButtonText: "Ok",
              });
            })
            .catch((error) => {
              console.error(error);
              Swal.fire({
                title: "Error!",
                html: error.response.data.message,
                icon: "error",
                confirmButtonText: "Ok",
              });
            });
        }
      } else {
        image.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
        image.parentElement.parentElement.classList.add(
          "border-2",
          "border-red-600"
        );
        setTimeout(() => {
          image.classList.remove("border-2", "border-red-600");
        }, 3000);
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await UserRequest.isUserInGuild();
        dispatch(setUserInGuild(response.userInGuild));
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  return (
    <>
      <ScrollToTop />
      <img
        src='/assets/images/welcome-apply.png'
        className='object-contain h-full'
        alt=''
      />
      <div className='my-4 lg:my-14 mx-2 md:mx-20'>
        {isLoading ? (
          <div className='w-full h-80 flex items-center justify-center'>
            <img
              src='/assets/images/Anamlogo_large_transparent.gif'
              className='h-40 w-40'
              alt=''
            />
          </div>
        ) : user === null ? (
          <div>
            <div className='text-2xl lg:text-5xl'>
              You must be logged in to apply!
            </div>
          </div>
        ) : !userInGuild ? (
          <div>
            <JoinUs userInGuild={userInGuild} />
          </div>
        ) : isGuildMember || isTrailMember ? (
          <div className='flex lg:flex-row flex-col items-center lg:items-end'>
            <div className='text-2xl lg:text-5xl'>
              You are already a guildmate!
            </div>
            <img
              src='/assets/images/emotes/emoji_a_55.png'
              className='h-20'
              alt=''
            />
          </div>
        ) : (
          <>
            <p className='text-2xl lg:text-5xl mb-4 lg:mb-20'>
              Application form
            </p>
            <div className='min-h-screen h-full w-full bg-transparent/25 rounded-md px-4 py-4 mx-auto md:py-20'>
              <form
                encType='multipart/form-data'
                className='flex flex-col items-center gap-10 [&>*]:md:text-lg [&>*]:text-sm mx-4 lg:px-20'
                onSubmit={onSubmit}
              >
                <InputLayout id='in_server'>
                  <p>We are based in Elpon server, are you from Elpon?</p>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-4'>
                      <input
                        onInput={(e) => {
                          serverRef.current = e.target;
                          document
                            .getElementById("server_name")
                            .classList.add("hidden");
                        }}
                        ref={serverRef}
                        type='radio'
                        name='server'
                        value={1}
                        id='elpon'
                      />
                      <label htmlFor='elpon'>{`Yes - I'm from Elpon`}</label>
                    </div>
                    <div className='flex items-center gap-4'>
                      <input
                        onInput={(e) => {
                          serverRef.current = e.target;
                          document
                            .getElementById("server_name")
                            .classList.remove("hidden");
                        }}
                        ref={serverRef}
                        type='radio'
                        name='server'
                        value={0}
                        id='other'
                      />
                      <label htmlFor='other'>
                        Other :{" "}
                        <input
                          type='text'
                          id='server_name'
                          placeholder='Serve name'
                          className='placeholder:text-[#A6AEB7] placeholder:text-sm placeholder:font-light focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] w-80 py-3 border-none hidden'
                          ref={serverNameRef}
                        />
                      </label>
                    </div>
                    <div className='flex items-center gap-4'>
                      <input
                        className='hidden'
                        ref={serverRef}
                        type='radio'
                        name='server'
                        value={""}
                        id='elpon2'
                      />
                    </div>
                  </div>
                </InputLayout>
                <InputLayout id='description'>
                  <p>
                    {`Tell us about yourself! (Your name/nickname preference, where
                  you're from, hobbies, your age, etc...)`}
                  </p>
                  <textarea
                    name='description'
                    id='desc'
                    cols='30'
                    rows='5'
                    className='p-2 focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] border-none'
                    ref={descriptionRef}
                  ></textarea>
                </InputLayout>
                <InputLayout id='roster_image'>
                  <p>{`What does your Roster look like? (Main 1-6) Please provide a
                  screenshot of your roster overview.`}</p>
                  <img
                    src='assets/images/roster.png'
                    className=' object-contain'
                    alt='roster image example'
                  />
                  <div className='flex flex-col'>
                    <input
                      className=' bg-[#4F545C] w-full rounded shadow-md text-base'
                      type='file'
                      id='image'
                    />
                    <p className='text-red-600 text-sm'></p>
                  </div>
                </InputLayout>
                <InputLayout id='experience'>
                  <p>{`What is your Lost Ark experience and what are your goals? (How long have you played, whats your Raid experience, etc...)`}</p>
                  <textarea
                    name='experience'
                    id='exp'
                    cols='30'
                    rows='5'
                    className='p-2 focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] border-none'
                    ref={experienceRef}
                  ></textarea>
                </InputLayout>
                <InputLayout id='play_time'>
                  <p>{`How much time do you spend on the game? (Daily, every other day, etc.)`}</p>
                  <input
                    type='text'
                    id='playtime'
                    placeholder='Playtime'
                    className='placeholder:text-[#A6AEB7] placeholder:text-sm placeholder:font-light focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] w-full lg:w-[60%] py-3 border-none'
                    ref={playTimeRef}
                  />
                </InputLayout>
                <InputLayout id='gvg'>
                  <p>{`Are you interested in joining GVG?`}</p>
                  <p>
                    GVG is a PVP based Guild vs. Guild event. PVP Build, iLvl
                    and stats are required. Please feel free to get in touch
                    with a{" "}
                    <span className=' text-[#A61655] bg-[#A61655]/20 '>
                      @GVG Officer
                    </span>{" "}
                    for more information.
                  </p>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-4'>
                      <input
                        onInput={(e) => {
                          gvgRef.current = e.target;
                        }}
                        ref={gvgRef}
                        type='radio'
                        name='gvg'
                        value={1}
                        id='yes_gvg'
                      />
                      <label htmlFor='yes_gvg'>{`Yes`}</label>
                    </div>
                    <div className='flex items-center gap-4'>
                      <input
                        onInput={(e) => {
                          gvgRef.current = e.target;
                        }}
                        ref={gvgRef}
                        type='radio'
                        name='gvg'
                        value={0}
                        id='no_gvg'
                      />
                      <label htmlFor='no_gvg'>{`No`}</label>
                    </div>
                    <div className='flex items-center gap-4'>
                      <input
                        className='hidden'
                        ref={gvgRef}
                        type='radio'
                        name='gvg'
                        value={""}
                        id='null_gvg'
                      />
                    </div>
                  </div>
                </InputLayout>
                <InputLayout id='gve'>
                  <p>{`Our schedule for GVE is on Sundays at 19:40 ST (Server Time) with optional Alt Guild GVE's afterwards`}</p>
                  <p>{`GVE is a PVE Guild Raid for bloodstones that everyone can participate in, takes around 5 minutes`}</p>
                  <p>{`We expect you to show up for Main Guild GVE as often as possible, do you agree to this? Please write in "Other" if there is a reason you cannot participate. This does not effect your application.`}</p>
                  <div className='flex flex-col gap-4'>
                    <div className='flex items-center gap-4'>
                      <input
                        onInput={(e) => {
                          gveRef.current = e.target;
                          document
                            .getElementById("reason")
                            .classList.add("hidden");
                        }}
                        ref={gveRef}
                        type='radio'
                        name='gve'
                        value={"Yes"}
                        id='yes_gve'
                      />
                      <label htmlFor='yes_gve'>{`Yes`}</label>
                    </div>
                    <div className='flex items-center gap-4'>
                      <input
                        onInput={() => {
                          document
                            .getElementById("reason")
                            .classList.remove("hidden");
                        }}
                        type='radio'
                        name='gve'
                        id='no_gve'
                      />
                      <label htmlFor='no_gve'>
                        Other :{" "}
                        <input
                          onChange={(e) => {
                            gveRef.current = e.target;
                          }}
                          type='text'
                          id='reason'
                          placeholder='Reason'
                          className='placeholder:text-[#A6AEB7] placeholder:text-sm placeholder:font-light focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] w-52 lg:w-80 py-3 border-none hidden'
                          ref={gveRef}
                        />
                      </label>
                    </div>
                    <div className='flex items-center gap-4'>
                      <input
                        className='hidden'
                        ref={gveRef}
                        type='radio'
                        name='gve'
                        value={""}
                        id='null_gve'
                      />
                    </div>
                  </div>
                </InputLayout>
                <InputLayout id='server_expectations'>
                  <p>{`What are you looking for in Anamcara?`}</p>
                  <input
                    type='text'
                    id='expectations'
                    placeholder='Expectations'
                    className='placeholder:text-[#A6AEB7] placeholder:text-sm placeholder:font-light focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] w-full lg:w-[60%] py-3 border-none'
                    ref={serverExpectationsRef}
                  />
                </InputLayout>
                <InputLayout id='inquiry_source'>
                  <p>{`How did you hear about us?`}</p>
                  <input
                    type='text'
                    id='inquiry'
                    placeholder='Source'
                    ref={inquirySourceRef}
                    className='placeholder:text-[#A6AEB7] placeholder:text-sm placeholder:font-light focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] w-full lg:w-[60%] py-3 border-none'
                  />
                </InputLayout>
                <InputLayout id='additional_info'>
                  <p className='text-xs'>*Not Required</p>
                  <p>{`Anything else you'd like us to know?`}</p>
                  <input
                    type='text'
                    id='info'
                    placeholder='Info'
                    className='placeholder:text-[#A6AEB7] placeholder:text-sm placeholder:font-light focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] w-full lg:w-[60%] py-3 border-none'
                    ref={additionalInfoRef}
                  />
                </InputLayout>
                <InputLayout id='guild_cooldown'>
                  <p className='text-xs'>*Not Required</p>
                  <p>{`Are you in a Guild at the moment/What was your previous Guild? (Please also include your Guild Cooldown/when you can be invited)`}</p>
                  <input
                    type='text'
                    id='cooldown'
                    placeholder='Guild / Previous guild'
                    className='placeholder:text-[#A6AEB7] placeholder:text-sm placeholder:font-light focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] w-full lg:w-[60%] py-3 border-none'
                    ref={guildCooldownRef}
                  />
                </InputLayout>
                <InputLayout id='acquaintances'>
                  <p className='text-xs'>*Not Required</p>
                  <p>{`Do you know anyone in the guild already? If you have a reference please give their IGN.`}</p>
                  <input
                    type='text'
                    id='acquant'
                    placeholder='IGN'
                    className='placeholder:text-[#A6AEB7] placeholder:text-sm placeholder:font-light focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] w-full lg:w-[60%] py-3 border-none'
                    ref={acquaintancesRef}
                  />
                </InputLayout>
                <div className='flex flex-col lg:flex-row gap-4 lg:gap-2 items-center justify-between w-full'>
                  <p className='text-sm font-light w-full lg:w-3/6 text-gray-300'>
                    By submitting an application, you agree to our leadership
                    reviewing it. We will reach out to you within a week via
                    discord.
                  </p>
                  <button className='w-full lg:w-2/6 text-center font-light bg-[#878dd1] hover:bg-[#787CAD] py-3 rounded-md shadow-lg'>
                    SEND
                  </button>
                </div>
              </form>
            </div>
          </>
        )}
      </div>
    </>
  );
}
