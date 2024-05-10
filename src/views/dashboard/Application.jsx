import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { setApplicant } from "../../features/applications/applicantSlice";
import { useEffect, useState, useRef } from "react";
import ApplicationRequest from "../../services/requests/application";
import AvatarComponent from "../../components/AvatarComponent";
import InputLayout from "../../components/apply/InputLayout";
import Swal from "sweetalert2/src/sweetalert2.js";
import { Button, Modal } from "flowbite-react";

export default function Application() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const application = useSelector((state) => state.applicant.applicant);
  const reasonRef = useRef();

  const handleAccept = () => {
    const payload = {
      accepted: true,
    };
    const response = ApplicationRequest.update(id, payload);
    response
      .then((data) => {
        console.log(data);
        setLoading(true);
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
          html: error.response.data.error,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const handleReject = (e) => {
    e.preventDefault();
    const payload = {
      accepted: false,
      reason: reasonRef.current.value,
    };

    const response = ApplicationRequest.update(id, payload);

    response
      .then((data) => {
        setLoading(true);
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
          html: error.response.data.error,
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  useEffect(() => {
    const response = ApplicationRequest.show(id);
    response
      .then((data) => {
        dispatch(setApplicant(data));
        setLoading(false);
      })
      .catch((error) => {
        dispatch(setApplicant(null));
        setLoading(false);
        console.error(error);
      });
  }, [loading]);

  return (
    <div id='content' className='flex flex-col gap-8 h-full'>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Rejection reason</Modal.Header>
        <form className='space-y-6' onSubmit={handleReject}>
          <Modal.Body>
            <textarea
              name='reason'
              id='reason'
              cols='30'
              rows='10'
              className='p-2 w-full text-gray-200 focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] border-none'
              ref={reasonRef}
            ></textarea>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='submit'
              className='bg-blue-600 enabled:hover:bg-blue-700'
            >
              Send
            </Button>

            <Button color='gray' onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div className='flex items-center flex-wrap'>
        <ul className='flex items-center'>
          <li className='inline-flex items-center'>
            <Link to={"/dashboard"} className="className='hover:text-blue-500'">
              <MdSpaceDashboard className='h-6 w-6' />
            </Link>
            <span className='mx-4 h-auto text-gray-400 font-medium'>/</span>
          </li>
          <li className='inline-flex items-center'>
            <Link className="className='hover:text-blue-500'">Application</Link>
          </li>
        </ul>
      </div>
      {loading ? (
        <div className='flex items-center justify-center w-full h-[70vh]'>
          <l-grid size='100' speed='1.5' color='black'></l-grid>
        </div>
      ) : application ? (
        <div className='h-full p-4 lg:p-8 rounded-lg bg-gray-100'>
          <div className='flex flex-col gap-8'>
            <AvatarComponent
              imageUrl={`https://cdn.discordapp.com/avatars/${application.user.id}/${application.user.avatar}.png`}
              user={application.user}
              application={true}
            />
            <div className='flex flex-col items-center gap-10 text-white [&>*]:bg-[#313338] [&>*]:text-lg mx-4 lg:mx-20'>
              <InputLayout id='in_server'>
                <p>We are based in Elpon server, are you from Elpon?</p>
                {application.in_server ? (
                  <>
                    <p className='font-medium'>Answer :</p>
                    <p>Yes</p>
                  </>
                ) : (
                  <div className='w-full flex flex-col gap-1 lg:flex-row lg:items-center justify-between'>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium'>Answer :</p>
                      <p>No</p>
                    </div>
                    <p className=''>
                      <span className='font-medium'>Server: </span>
                      {application.server}
                    </p>
                  </div>
                )}
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
                  disabled
                  className='p-2 focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] border-none'
                  value={application.description}
                ></textarea>
              </InputLayout>
              <InputLayout id='roster_image'>
                <p>{`What does your Roster look like? (Main 1-6) Please provide a
                  screenshot of your roster overview.`}</p>
                <img
                  src={`${import.meta.env.VITE_API_URL}/storage/${
                    application.roster_image
                  }`}
                  className=' object-contain'
                  alt='roster image example'
                />
              </InputLayout>
              <InputLayout id='experience'>
                <p>{`What is your Lost Ark experience and what are your goals? (How long have you played, whats your Raid experience, etc...)`}</p>
                <textarea
                  name='experience'
                  id='exp'
                  cols='30'
                  rows='5'
                  disabled
                  value={application.experience}
                  className='p-2 focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] border-none'
                ></textarea>
              </InputLayout>
              <InputLayout id='play_time'>
                <p>{`How much time do you spend on the game? (Daily, every other day, etc.)`}</p>
                <input
                  type='text'
                  id='playtime'
                  placeholder='Playtime'
                  disabled
                  value={application.play_time}
                  className='placeholder:text-[#A6AEB7] placeholder:text-sm placeholder:font-medium focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] w-full lg:w-[60%] py-3 border-none'
                />
              </InputLayout>
              <InputLayout id='gvg'>
                <p>{`Are you interested in joining GVG?`}</p>
                <p>
                  GVG is a PVP based Guild vs. Guild event. PVP Build, iLvl and
                  stats are required. Please feel free to get in touch with a{" "}
                  <span className=' text-[#A61655] bg-[#A61655]/20 '>
                    @GVG Officer
                  </span>{" "}
                  for more information.
                </p>
                {application.gvg ? (
                  <>
                    <div className='flex items-center gap-1'>
                      <p className='font-medium'>Answer :</p>
                      <p>Yes</p>
                    </div>
                  </>
                ) : (
                  <div className='flex items-center gap-1'>
                    <p className='font-medium'>Answer :</p>
                    <p>No</p>
                  </div>
                )}
              </InputLayout>
              <InputLayout id='gve'>
                <p>{`Our schedule for GVE is on Sundays at 19:40 ST (Server Time) with optional Alt Guild GVE's afterwards`}</p>
                <p>{`GVE is a PVE Guild Raid for bloodstones that everyone can participate in, takes around 5 minutes`}</p>
                <p>{`We expect you to show up for Main Guild GVE as often as possible, do you agree to this? Please write in "Other" if there is a reason you cannot participate. This does not effect your application.`}</p>
                <div className='flex items-center gap-1'>
                  <p className='font-medium'>Answer :</p>
                  <p>{application.gve}</p>
                </div>
              </InputLayout>
              <InputLayout id='server_expectations'>
                <p>{`What are you looking for in Anamcara?`}</p>
                <textarea
                  name='server_expectations'
                  id='exp'
                  cols='30'
                  rows='5'
                  disabled
                  value={application.server_expectations}
                  className='p-2 focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] border-none'
                ></textarea>
              </InputLayout>
              <InputLayout id='inquiry_source'>
                <p>{`How did you hear about us?`}</p>
                <textarea
                  name='inquiry_source'
                  id='exp'
                  cols='30'
                  rows='5'
                  disabled
                  value={application.inquiry_source}
                  className='p-2 focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] border-none'
                ></textarea>
              </InputLayout>
              <InputLayout id='additional_info'>
                <p className='text-xs'>*Not Required</p>
                <p>{`Anything else you'd like us to know?`}</p>
                <textarea
                  name='additional_info'
                  id='exp'
                  cols='30'
                  rows='5'
                  disabled
                  value={application.additional_info}
                  className='p-2 focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] border-none'
                ></textarea>
              </InputLayout>
              <InputLayout id='guild_cooldown'>
                <p className='text-xs'>*Not Required</p>
                <p>{`Are you in a Guild at the moment/What was your previous Guild? (Please also include your Guild Cooldown/when you can be invited)`}</p>
                <textarea
                  name='guild_cooldown'
                  id='exp'
                  cols='30'
                  rows='5'
                  disabled
                  value={application.guild_cooldown}
                  className='p-2 focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] border-none'
                ></textarea>
              </InputLayout>
              <InputLayout id='acquaintances'>
                <p className='text-xs'>*Not Required</p>
                <p>{`Do you know anyone in the guild already? If you have a reference please give their IGN.`}</p>
                <textarea
                  name='acquaintances'
                  id='exp'
                  cols='30'
                  rows='5'
                  disabled
                  value={application.acquaintances}
                  className='p-2 focus:ring-gray-600 focus:ring-2 rounded-sm bg-[#18191C] border-none'
                ></textarea>
              </InputLayout>
            </div>
            {application.accepted == null ? (
              <div className='flex items-center gap-2 text-white font-medium mx-4 lg:mx-20'>
                <button
                  onClick={handleAccept}
                  className='w-1/2 text-center bg-[#787CAD] hover:bg-[#5e64a3] py-3 rounded-md shadow-lg'
                >
                  ACCEPT
                </button>
                <button
                  onClick={() => setOpenModal(true)}
                  className='w-1/2 text-center bg-[#313338] hover:bg-[#292b31] py-3 rounded-md shadow-lg'
                >
                  REJECT
                </button>
              </div>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      ) : (
        <div className='h-[70vh] w-full flex items-center justify-center'>
          <p className='text-xl font-medium'>Application not found</p>
        </div>
      )}
    </div>
  );
}
