import { useDispatch, useSelector } from "react-redux";
import { setCharacters } from "../../features/characters/characterSlice";
import { setIcons } from "../../features/icons/iconSlice";
import { useEffect, useRef, useState } from "react";
import CharacterRequest from "../../services/requests/character";
import Swal from "sweetalert2/src/sweetalert2.js";
import { RiDeleteBin2Line } from "react-icons/ri";
import IconRequest from "../../services/requests/icon";
import "ldrs/grid";

export default function Characters() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const characters = useSelector((state) => state.character.characters);
  const icons = useSelector((state) => state.icon.icons);
  const nameRef = useRef();
  const noteRef = useRef();
  const ilvlRef = useRef();
  const iconRef = useRef();

  const updateCharacter = (id, data) => {
    const response = CharacterRequest.update(id, data);
    response
      .then(() => {})
      .catch((error) => {
        console.error(error);
        Swal.fire({
          title: "Error!",
          html: error.message || "Unknown error",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const deleteCharacter = (id) => {
    const response = CharacterRequest.delete(id);
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
          html: error.message || "Unknown error",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      name: nameRef.current.value,
      note: noteRef.current.value,
      ilvl: ilvlRef.current.value,
      class_icon_id: iconRef.current.value,
    };

    const response = CharacterRequest.store(payload);
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
          html: error.message || "Unknown error",
          icon: "error",
          confirmButtonText: "Ok",
        });
      });
  };

  const options = icons.map((icon) => (
    <option key={icon.id} value={icon.id}>
      {icon.name}
    </option>
  ));

  const tableRows = characters.map((character) => (
    <tr key={character.id}>
      <td className='w-16 md:w-14 lg:w-10'>
        <img
          src={`/assets/Icons/classes/${character.icon_path}`}
          className='w-6 h-6'
          alt=''
        />
      </td>
      <td>
        <div className='flex flex-col gap-2'>
          <input
            type='text'
            name='name'
            defaultValue={character.name}
            onBlur={(ev) =>
              updateCharacter(character.id, { name: ev.target.value })
            }
            className='bg-[#141414] p-2 rounded-sm'
          />
          <div>
            ilvl:
            <input
              type='text'
              name='ilvl'
              onBlur={(ev) =>
                updateCharacter(character.id, { ilvl: ev.target.value })
              }
              className='bg-[#141414] ml-1 p-1 rounded-sm w-2/3 inline-block'
              defaultValue={character.ilvl}
            />
          </div>
        </div>
      </td>
      <td>
        <textarea
          name='note'
          id=''
          rows='3'
          className='bg-[#141414] w-full text-sm'
          placeholder='Custom note, you can use it to set your bifrost info ect...'
          defaultValue={character.note}
          onBlur={(ev) =>
            updateCharacter(character.id, { note: ev.target.value })
          }
        ></textarea>
      </td>
      <td>
        <select
          name='icon'
          className='w-full bg-[#141414] text-sm'
          defaultValue={character.class_icon_id}
          onBlur={(ev) =>
            updateCharacter(character.id, { class_icon_id: ev.target.value })
          }
        >
          {options}
        </select>
      </td>
      <td className=' text-center'>
        <RiDeleteBin2Line
          className='h-6 w-6 inline-block cursor-pointer text-red-600'
          onClick={() => deleteCharacter(character.id)}
        />
      </td>
    </tr>
  ));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterData = await CharacterRequest.index();
        const iconData = await IconRequest.index();

        dispatch(setCharacters(characterData));
        dispatch(setIcons(iconData));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [loading]);

  return (
    <>
      <div className='flex flex-col gap-10 p-4'>
        <p className='text-lg'>
          Roster manager{" "}
          <span className='text-xs text-gray-400'>
            Manage & configure your roster
          </span>
        </p>
        <div className='overflow-x-auto'>
          <table className='bg-[#141414] border-2 border-[#646464] min-w-[724px] w-full'>
            <thead className='border-2 border-[#646464]'>
              <tr className='*:p-4'>
                <th colSpan={2} className='w-4/12 text-left font-medium'>
                  Characters
                </th>
                <th className='w-4/12'></th>
                <th className='w-3/12'></th>
                <th className='w-1/12'></th>
              </tr>
            </thead>
            <tbody className='[&>*]:[&>*]:p-2 [&>*]:border-b-2 [&>*]:border-[#646464] '>
              {loading ? (
                <tr>
                  <td colSpan={4} className='text-center'>
                    <l-grid size='60' speed='1.5' color='white'></l-grid>
                  </td>
                </tr>
              ) : characters.length === 0 ? (
                <tr>
                  <td colSpan={4} className='text-center'>
                    No characters found
                  </td>
                </tr>
              ) : (
                tableRows
              )}
            </tbody>
          </table>
        </div>
        <table className=' w-full bg-[#141414] border-2 border-[#646464]'>
          <thead className='border-2 border-[#646464]'>
            <tr className='*:p-4'>
              <th
                colSpan={4}
                className='w-4/12 text-left indent-2 font-medium border-[#646464]'
              >
                Add a character
              </th>
            </tr>
          </thead>
          <tbody className='[&>*]:[&>*]:p-2 [&>*]:border-b-2 [&>*]:border-[#646464] '>
            <tr>
              <td>
                <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
                  <input
                    type='text'
                    name='name'
                    className='bg-[#141414] p-1 rounded-sm w-full placeholder:text-sm indent-2'
                    placeholder='Name'
                    ref={nameRef}
                  />
                  <input
                    type='number'
                    name='ilvl'
                    className='bg-[#141414] p-1 rounded-sm w-full placeholder:text-sm indent-2'
                    placeholder='Item Level'
                    ref={ilvlRef}
                  />
                  <textarea
                    name='note'
                    rows='3'
                    className='bg-[#141414] w-full text-sm placeholder:text-sm'
                    placeholder='Custom note, you can use it to set your bifrost info ect...'
                    ref={noteRef}
                  ></textarea>
                  <div className='flex items-center'>
                    <p className='border-2 h-[37.47px] border-r-0 pt-2 px-2 text-xs border-[#646464] bg-[#1d1d1d] '>
                      Class
                    </p>
                    <select
                      name='icon'
                      defaultValue='Select...'
                      className='bg-[#141414] w-1/4 text-sm'
                      ref={iconRef}
                    >
                      {options}
                    </select>
                  </div>
                  <button
                    type='submit'
                    className=' transition-all duration-300 bg-[#1d1d1d] hover:bg-[#303030] px-2 py-1 rounded text-center w-1/4 lg:w-1/6 border border-[#646464]'
                  >
                    Add
                  </button>
                </form>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
