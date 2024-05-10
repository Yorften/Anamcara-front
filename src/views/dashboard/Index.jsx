import { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import ApplicationRequest from "../../services/requests/application";
import { setApplication } from "../../features/applications/applicationSlice";
import DataTable from "react-data-table-component";

export default function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const applications = useSelector((state) => state.application.applications);

  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: "Username",
      selector: (row) => row.user.username,
      sortable: true,
    },
    {
      name: "Date",
      format: (row) => moment(row.created_at).format("DD-MM-YYYY"),
      selector: (row) => row.created_at,
      sortable: true,
    },
  ];

  useEffect(() => {
    const response = ApplicationRequest.index();
    response
      .then((data) => {
        dispatch(setApplication(data));
        setLoading(false);
      })
      .catch((error) => {
        dispatch(setApplication(null));
        setLoading(false);
        console.error(error);
      });
  }, []);

  const onRowClicked = (row) => {
    navigate(`/dashboard/applicants/${row.id}`);
  };

  const user = useSelector((state) => state.auth.user);
  return (
    <div id='content' className='flex flex-col gap-8 h-full'>
      <div className='flex items-center flex-wrap'>
        <ul className='flex items-center'>
          <li className='inline-flex items-center'>
            <Link
              to={"/dashboard"}
              className='flex items-center gap-4 hover:text-blue-500'
            >
              <MdSpaceDashboard className='h-6 w-6' />
              <span>Dashboard</span>
            </Link>
          </li>
        </ul>
      </div>
      <p className='text-2xl lg:text-5xl font-medium'>
        Welcome {user.username}
      </p>
      <div className='p-2 rounded bg-gray-50 w-1/2 border-t shadow-lg min-h-[60vh]'>
        <p className='text-xl'>New Applicatns</p>
        {loading ? (
          <div className='flex items-center justify-center w-full h-[70vh]'>
            <l-grid size='100' speed='1.5' color='black'></l-grid>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={applications}
            striped={true}
            pointerOnHover={true}
            highlightOnHover={true}
            onRowClicked={onRowClicked}
          />
        )}
      </div>
    </div>
  );
}
