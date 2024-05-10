import { useEffect, useRef, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import "ldrs/grid";
import moment from "moment";
import { Button, Modal } from "flowbite-react";
import { setVideos } from "../../features/videos/videoSlice";
import VideoRequest from "./../../services/requests/video";
import Swal from "sweetalert2/src/sweetalert2.js";

export default function Videos() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const videos = useSelector((state) => state.vid.videos);
  const [loading, setLoading] = useState(true);
  const videoRef = useRef();
  const columns = [
    {
      name: "Video id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Link",
      selector: (row) => extractYouTubeURL(row.path),
      sortable: true,
    },
    {
      name: "Date",
      format: (row) => moment(row.created_at).format("DD-MM-YYYY HH:mm"),
      selector: (row) => row.created_at,
      sortable: true,
    },
    {
      name: "Action",
      button: true,
      cell: (row) => (
        <Button
          onClick={() => handleDelete(row.id)}
          className='bg-red-600 enabled:hover:bg-red-700 py-0'
        >
          Delete
        </Button>
      ),
    },
  ];

  const extractYouTubeURL = (url) => {
    const regex = /src="([^"]+)"/;
    const match = url.match(regex);
    if (match) {
      const url = match[1];
      return url;
    } else {
      return null;
    }
  };

  const handleDelete = (id) => {
    const response = VideoRequest.destroy(id);
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
        Swal.fire({
          title: "Error!",
          html: "Unkown error",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.error(error);
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const payload = {
      path: videoRef.current.value,
    };

    const response = VideoRequest.store(payload);
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
        Swal.fire({
          title: "Error!",
          html: "Unkown error",
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.error(error);
      });
  };

  const onRowClicked = (row) => {
    let url = extractYouTubeURL(row.path);
    window.open(url, "_blank");
  };

  useEffect(() => {
    const response = VideoRequest.index();
    response
      .then((data) => {
        console.log(data);
        dispatch(setVideos(data));
        setLoading(false);
      })
      .catch((error) => {
        dispatch(setVideos([]));
        setLoading(false);
        console.error(error);
      });
  }, [loading]);
  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Please put a valid youtube embed link</Modal.Header>
        <form className='space-y-6' onSubmit={onSubmit}>
          <Modal.Body>
            <input
              type='text'
              id='path'
              placeholder='Embed link'
              className=' placeholder:text-sm placeholder:font-medium focus:ring-gray-600 focus:ring-2 rounded-sm w-full py-3'
              ref={videoRef}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='submit'
              className='bg-blue-600 enabled:hover:bg-blue-700'
            >
              Add
            </Button>

            <Button color='gray' onClick={() => setOpenModal(false)}>
              Cancel
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
      <div id='content' className='flex flex-col gap-8 h-full lg:h-[85vh]'>
        <div className='flex items-center justify-between flex-wrap'>
          <ul className='flex items-center'>
            <li className='inline-flex items-center'>
              <Link
                to={"/dashboard"}
                className="className='hover:text-blue-500'"
              >
                <MdSpaceDashboard className='h-6 w-6' />
              </Link>
              <span className='mx-4 h-auto text-gray-400 font-medium'>/</span>
            </li>
            <li className='inline-flex items-center'>
              <Link
                to={"/dashboard/videos"}
                className="className='hover:text-blue-500'"
              >
                Videos
              </Link>
            </li>
          </ul>
          <Button
            onClick={() => setOpenModal(true)}
            className='bg-blue-600 enabled:hover:bg-blue-700'
          >
            New Video +
          </Button>
        </div>
        {loading ? (
          <div className='flex items-center justify-center w-full h-[70vh]'>
            <l-grid size='100' speed='1.5' color='black'></l-grid>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={videos}
            pagination
            paginationPerPage={8}
            paginationRowsPerPageOptions={[8]}
            striped={true}
            pointerOnHover={true}
            highlightOnHover={true}
            onRowClicked={onRowClicked}
            className='shadow-xl'
          />
        )}
      </div>
    </>
  );
}
