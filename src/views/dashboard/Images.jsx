import { useEffect, useState } from "react";
import { MdSpaceDashboard } from "react-icons/md";
import { Link } from "react-router-dom";
import ImageRequest from "./../../services/requests/image";
import DataTable from "react-data-table-component";
import { useDispatch, useSelector } from "react-redux";
import "ldrs/grid";
import moment from "moment";
import { Button, Modal } from "flowbite-react";
import { setImages } from "../../features/images/imageSlice";
import Swal from "sweetalert2/src/sweetalert2.js";

export default function Images() {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const images = useSelector((state) => state.img.images);
  const [loading, setLoading] = useState(true);
  const columns = [
    {
      name: "Image id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Link",
      selector: (row) => `${import.meta.env.VITE_API_URL}/storage/${row.path}`,
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

  function handleImage(file, image) {
    const allowedExtensions = ["jpg", "jpeg", "png", "webp"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      image.nextElementSibling.innerHTML = "Invalid file extension";
      return false;
    }
    const maxSizeInBytes = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSizeInBytes) {
      image.nextElementSibling.innerHTML = "File size exceeds the limit";
      return false;
    }
    return true;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const image = document.getElementById("image");
    if (image.files && image.files[0]) {
      let formData = new FormData();
      let file = image.files[0];

      if (handleImage(file, image)) {
        image.classList.remove("border-2", "border-red-600");
        image.nextElementSibling.innerHTML = "";
        formData.append("image", file);

        const response = ImageRequest.store(formData);
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
          });
      }
    } else {
      image.classList.add("border-2", "border-red-600");
      image.nextElementSibling.innerHTML = "Required field";
    }
  };

  const handleDelete = (id) => {
    const response = ImageRequest.destroy(id);
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
    let url = `${import.meta.env.VITE_API_URL}/storage/${row.path}`;
    window.open(url, "_blank");
  };

  useEffect(() => {
    const response = ImageRequest.index();
    response
      .then((data) => {
        dispatch(setImages(data));
        setLoading(false);
      })
      .catch((error) => {
        dispatch(setImages([]));
        setLoading(false);
        console.error(error);
      });
  }, [loading]);

  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Upload Image</Modal.Header>
        <form
          className='space-y-6'
          encType='multipart/form-data'
          onSubmit={onSubmit}
        >
          <Modal.Body>
            <input
              type='file'
              id='image'
              className=' placeholder:text-sm placeholder:font-medium focus:ring-gray-600 focus:ring-2 rounded-sm w-full py-3'
            />
            <p className='text-red-600 text-sm font-medium'></p>
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
                to={"/dashboard/images"}
                className="className='hover:text-blue-500'"
              >
                Images
              </Link>
            </li>
          </ul>
          <Button
            onClick={() => setOpenModal(true)}
            className='bg-blue-600 enabled:hover:bg-blue-700'
          >
            New Image +
          </Button>
        </div>
        {loading ? (
          <div className='flex items-center justify-center w-full h-[70vh]'>
            <l-grid size='100' speed='1.5' color='black'></l-grid>
          </div>
        ) : (
          <DataTable
            columns={columns}
            data={images}
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
