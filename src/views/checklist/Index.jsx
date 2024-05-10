import { useEffect, useState } from "react";
import CharacterRequest from "../../services/requests/character";
import {
  setCharacters,
  setLoading,
} from "../../features/characters/characterSlice";
import { useSelector, useDispatch } from "react-redux";
import ChecklistTable from "../../components/layouts/checklist/ChecklistTable";
import { setCustom, setTasks } from "../../features/tasks/taskSlice";
import TaskRequest from "./../../services/requests/task";
import "ldrs/grid";

export default function Index() {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.character.loading);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const characterData = await CharacterRequest.index();
        const defaultTasksData = await TaskRequest.default();
        const customTasksData = await TaskRequest.custom();

        dispatch(setCharacters(characterData));
        dispatch(setTasks(defaultTasksData));
        dispatch(setCustom(customTasksData));
        dispatch(setLoading(false));
        setIsLoading(false);
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
          Checklist{" "}
          <span className='text-xs text-gray-400'>
            Track your daily and weekly tasks.
          </span>
        </p>
        <div className='overflow-x-auto'>
          {isLoading ? (
            <div className='h-full w-full flex items-center justify-center'>
              <l-grid size='120' speed='1.5' color='white'></l-grid>
            </div>
          ) : (
            <ChecklistTable />
          )}
        </div>
      </div>
    </>
  );
}
