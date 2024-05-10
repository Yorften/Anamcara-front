import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function JoinUs({ userInGuild }) {
  const handleTabChange = (event) => {
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const contentAreas = document.querySelectorAll(".content");
    const clickedRadioButtonId = event.target.id;
    const contentAreaToShow = document.getElementById(
      clickedRadioButtonId + "_text"
    );

    contentAreas.forEach((area) => area.classList.add("hidden"));

    contentAreaToShow.classList.remove("hidden");

    const clickedLabel = document.getElementById(
      `label_${clickedRadioButtonId}`
    );
    if (clickedLabel) {
      radioButtons.forEach((button) =>
        button.parentElement.classList.add("bg-transparent/40")
      );
      clickedLabel.classList.remove("bg-transparent/40");
    }
  };
  return (
    <section
      id='join_us'
      className={`${
        userInGuild
          ? "lg:mt-40 mt-20 mx-4 lg:mx-10 pb-20"
          : "mt-20 mx-4 lg:mx-10 pb-20"
      }`}
    >
      <div className='flex items-end gap-4 mb-8'>
        <h1 className='xl:text-6xl lg:text-5xl md:text-4xl sm:text-3xl text-3xl font-semibold'>
          {!userInGuild
            ? "You must be in the Anamcara discord server to apply!"
            : "JOIN US"}
        </h1>
        {userInGuild && (
          <img
            src='assets/images/emotes/emoji_a_1_53.png'
            className='object-contain h-20 inline-block'
            alt=''
          />
        )}
      </div>
      <div className='flex md:flex-row flex-col gap-8 lg:gap-0 justify-between mt-10'>
        <div className='lg:w-3/5 w-full h-full'>
          <div className='flex items-center w-fit'>
            <label
              htmlFor='expectations'
              id='label_expectations'
              className='bg-transparent/25 py-4 px-2 font-semibold cursor-pointer'
            >
              What to expect from us
              <input
                onChange={(event) => {
                  handleTabChange(event);
                }}
                type='radio'
                className='hidden'
                name='tabs'
                id='expectations'
              />
            </label>

            <label
              htmlFor='requirements'
              id='label_requirements'
              className='bg-transparent/25 py-4 px-2 font-semibold cursor-pointer bg-transparent/40'
            >
              Requirements
              <input
                onChange={(event) => {
                  handleTabChange(event);
                }}
                type='radio'
                className='hidden'
                name='tabs'
                id='requirements'
              />
            </label>
          </div>
          <div className='bg-transparent/25 py-4 px-2 min-h-80 shadow-xl'>
            <div id='expectations_text' className='content flex flex-col gap-4'>
              <p>✧ A Friendly, active and organised discord.</p>
              <p>✧ 3 Alt guilds with maxed out shops and weekly GVE.</p>
              <p>
                ✧ Weekly Raid Marathons both NM/HM (Voldis/Akkan/Kayangel/Brel
                etc...)
              </p>
              <p>✧ Organised and competitive GvG and GvE.</p>
              <p>✧ LFG channels for everything you&#39;d want.</p>
              <p>✧ We also provide learning runs for returning players!</p>
              <p>
                ✧ Game nights outside of Lost Ark. (League of Legends, Valorant,
                Apex, Zomboid, Jackbox, Movie Nights & various other fun
                activities)
              </p>
            </div>
            <div
              id='requirements_text'
              className='content flex flex-col gap-4 hidden'
            >
              <p>✧ 1580+ (Especially looking for GvG ready players)</p>
              <p>
                ✧ Be respectful towards others. No toxicity, Racism, Hate speech
                etc.
              </p>
              <p>
                ✧ Be active. We understand that everyone has a life, channels
                are available to notify us of 5+ days absence.
              </p>
              <p>
                ✧ min. 500% Contribution in the Main Guild (subject to change)
              </p>
              <p>✧ Mindset towards improving.</p>
              <p>✧ Have fun!</p>
            </div>
          </div>
        </div>
        <div className='lg:w-1/3 w-full flex flex-col gap-8 lg:gap-0'>
          <div className='flex flex-col relative'>
            <img
              src='assets/images/halloween_1.webp'
              alt='anamcara group picture'
              className='h-48 sm:h-52 md:h-[40%] object-cover rounded-t-md'
            />
            <img
              src='assets/images/Anamlogo_small.gif'
              alt='Anamcara logo'
              className='object-contain h-14 p-1 top-[45%] md:top-[31%] left-10 bg-[#292B2F] rounded-md absolute'
            />
            <div className='flex flex-col justify-between h-40 p-4 pt-5 bg-[#292B2F] shadow-lg'>
              <div>
                <div className='flex items-center gap-1'>
                  <img
                    src='assets/images/community.svg'
                    className='h-4'
                    alt=''
                  />
                  <h1 className='text-lg font-medium'>Anamcara</h1>
                </div>
                <p className='text-sm ml-2'>
                  Hellohello! Welcome to Anamcara! &#34;Soul Friends&#34; in
                  Gaelic
                </p>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-4'>
                  <p className=''>&#9679; 277 Members</p>
                  <p className='text-green-400'>&#9679; 120 Online</p>
                </div>
                <Link
                  className='w-[17%] self-end text-center bg-[#3BA561] hover:bg-[#339155] py-1 rounded-md shadow-md'
                  to={"https://discord.gg/anamcara"}
                  target='_blank'
                >
                  Join
                </Link>
              </div>
            </div>
          </div>
          {userInGuild && (
            <Link
              to={"/apply"}
              className=' text-center font-semibold bg-[#878dd1] hover:bg-[#787CAD] py-3 rounded-md shadow-lg'
            >
              APPLY NOW
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
