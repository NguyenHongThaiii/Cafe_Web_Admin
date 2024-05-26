import InputControlCommon from "@/Form-Control/Input-Control-Common";
import kindsApi from "@/api/kindsApi";
import Pagination from "@/widgets/layout/pagination";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Typography,
} from "@material-tailwind/react";
import debounce from "lodash.debounce";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export function Kinds() {
  const { control, handleSubmit, setValue, formState } = useForm({
    mode: "onChange",
  });
  const [state, setState] = useState([]);
  const [count, setCount] = useState(0);
  const [filters, setFilters] = useState({
    page: 1,
    limit: 5,
  });

  useEffect(() => {
    (async () => {
      const data = await kindsApi.getAll(filters);
      console.log(data);
      const count = await kindsApi.getCount({ ...filters, page: 0 });
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
  return (
    <div className="mt-12 mb-8 flex flex-col gap-12">
      <Card>
        <CardHeader
          variant="gradient"
          color="gray"
          className="mb-8 p-6 flex justify-between items-center"
        >
          <Typography variant="h6" color="white">
            Kinds Table
          </Typography>
          <Typography as="a" href="/dashboard/create-kind">
            <Button color="white" size="sm">
              Create Kind
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
              placeholder="ex: Cafe Thu cung "
            />
          </form>
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table">
            <thead>
              <tr>
                {[
                  "name",
                  "slug",
                  "status",
                  "createdAt",
                  "updatedAt",
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
              {state.map((area, key) => {
                const className = `py-3 px-5 ${
                  key === state.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={area?.id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        {area?.image?.url && (
                          <Avatar
                            src={area?.image?.url}
                            alt={area?.name}
                            size="sm"
                            variant="rounded"
                          />
                        )}
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {area?.name}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {area?.slug}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Chip
                        variant="gradient"
                        color={area?.status != 0 ? "green" : "blue-gray"}
                        value={area?.status != 0 ? "active" : "inactive"}
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                      />
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {area?.createdAt}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {area?.updatedAt}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography
                        as="a"
                        href={`/dashboard/edit-kind/${area?.slug}`}
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
    </div>
  );
}

export default Kinds;
