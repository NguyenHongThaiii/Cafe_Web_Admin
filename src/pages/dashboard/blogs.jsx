import InputControl from "@/Form-Control/Input-Control";
import InputControlCommon from "@/Form-Control/Input-Control-Common";
import blogsApi from "@/api/blogsApi";
import Pagination from "@/widgets/layout/pagination";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Input,
  Typography,
} from "@material-tailwind/react";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button as ButtonFB, Modal } from "flowbite-react";
import { toast } from "react-toastify";
export function Blogs() {
  const { control, handleSubmit, setValue, formState } = useForm({
    mode: "onChange",
  });
  const [state, setState] = useState([]);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
  });
  const [openModal, setOpenModal] = useState(false);
  const [id, setId] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const data = await blogsApi.getAll(filters);
      const count = await blogsApi.getCount({ ...filters, page: 0 });
      setCount(count);
      setState(data);
    })();
  }, [filters]);
  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page: page }));
  };
  const handleChangeInput = (data) => {
    setFilters((prev) => ({ ...prev, page: 1, name: data?.name }));
  };
  const handleDeleteBlog = async () => {
    setLoading(true);
    try {
      if (id === null || id === undefined) {
        toast.error("Something went wrong!");
        setOpenModal(false);
        return;
      }
      await blogsApi.delete({ productId: id?.blogId, userId: id?.userId });
      setOpenModal(false);
      setFilters((prev) => ({ ...prev }));
      toast("Delete blog successfully");
    } catch (error) {
      if (error?.message?.includes("could not execute statement"))
        toast.error("Product are still existing!");
      else toast.error("Something went wrong!");
    } finally {
      setOpenModal(false);
      setLoading(false);
    }
  };
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Blogs Table
          </Typography>
          <Typography as="a" href="/dashboard/create-blog">
            <Button color="white" size="sm">
              Create Blog
            </Button>
          </Typography>
        </CardHeader>
        <div className="md:mr-4 flex items-center justify-end mb-4 px-4 lg:px-0">
          <form
            onChange={handleSubmit(debounce(handleChangeInput, 300))}
            className="flex items-center"
          >
            <label htmlFor="search" className="w-[200px]">
              Find By Name:
            </label>
            <InputControlCommon
              control={control}
              name="name"
              focus
              id="name"
              type="name"
              placeholder="ex: Sunny Cafe"
            />
          </form>
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table">
            <thead>
              <tr>
                {[
                  "name",
                  "description",
                  "price",
                  "slug",
                  "phone",
                  "status",
                  "action",
                ].map((el) => (
                  <th
                    key={el}
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase text-blue-gray-400"
                    >
                      {el}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {state.map((blog, key) => {
                const className = `py-3 px-5 ${
                  key === state.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={blog?.id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <Avatar
                          src={
                            blog?.listImage?.length > 0
                              ? blog?.listImage[0]?.url
                              : ""
                          }
                          alt={blog?.name}
                          size="sm"
                          variant="rounded"
                        />
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {blog?.name}
                          </Typography>
                          <Typography className="text-xs font-normal text-blue-gray-500">
                            {blog?.location}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {blog?.description}
                      </Typography>
                      {/* <Typography className="text-xs font-normal text-blue-gray-500">
                          {"123"}
                        </Typography> */}
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {blog?.priceMin} - {blog?.priceMax}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {blog?.slug}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {blog?.phone}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color={blog?.status != 0 ? "green" : "blue-gray"}
                        value={blog?.status != 0 ? "active" : "inactive"}
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                      />
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href={`/dashboard/edit-place/${blog?.slug}`}
                        className="text-xs font-semibold text-blue-gray-600 flex items-center gap-2 transition-all hover:bg-gray-300 p-1 rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                          />
                        </svg>
                        Edit
                      </Typography>
                      <Typography
                        as="a"
                        href="#"
                        className="text-xs font-semibold text-blue-gray-600 flex items-center gap-2 mt-2 transition-all hover:bg-gray-300 p-1 rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        View
                      </Typography>
                      <Typography
                        onClick={() => {
                          setId({ blogId: blog?.id, userId: blog?.owner?.id });
                          setOpenModal(true);
                        }}
                        className="cursor-pointer text-xs font-semibold text-blue-gray-600 flex items-center gap-2 transition-all hover:bg-gray-300 p-1 rounded-md"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18 18 6M6 6l12 12"
                          />
                        </svg>
                        Delete
                      </Typography>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </CardBody>
        <div>
          <Pagination
            data={state}
            onChange={(page) => handlePageChange(page)}
            itemsPerPage={5}
            count={count}
            page={filters?.page}
          />
        </div>
      </Card>
      <Modal
        show={openModal}
        size="md"
        onClose={() => !loading && setOpenModal(false)}
        popup
        className="bg-blue-gray-600 opacity-90"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        id="test"
      >
        <Modal.Header />
        <Modal.Body className="">
          <div className="text-center ">
            <h3 className="mb-5 text-lg font-bold   ">
              Are you sure you want to delete this area?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                className={`${loading ? "bg-blue-gray-200" : "bg-red-900"}`}
                onClick={handleDeleteBlog}
                disabled={loading}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button disabled={loading} onClick={() => setOpenModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Blogs;
