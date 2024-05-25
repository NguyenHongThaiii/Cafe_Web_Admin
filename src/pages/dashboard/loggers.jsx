import InputControlCommon from "@/Form-Control/Input-Control-Common";
import blogsApi from "@/api/blogsApi";
import loggersAPi from "@/api/loggersApi";
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

export function Loggers() {
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
      const loggers = await loggersAPi.getAll(filters);
      const count = await loggersAPi.getCount({ ...filters, page: 0 });
      setState(loggers);
      setCount(count);
    })();
  }, [filters]);
  const handlePageChange = (page) => {
    setFilters((prev) => ({ ...prev, page: page }));
  };
  const handleChangeInput = (data) => {
    setFilters((prev) => ({ ...prev, page: 1, createdAt: data?.createdAt }));
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
            Logs Table
          </Typography>
        </CardHeader>
        <div className="md:mr-4 flex items-center justify-end mb-4 px-4 lg:px-0">
          <form
            onChange={handleSubmit(debounce(handleChangeInput, 300))}
            className=" flex items-center "
          >
            <label htmlFor="search" className="w-[200px]">
              Find By Date
            </label>
            <InputControlCommon
              control={control}
              name="createdAt"
              focus
              id="createdAt"
              placeholder="21-12-2023 18:26:28"
            />{" "}
          </form>
        </div>
        <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
          <table className="w-full min-w-[640px] table">
            <thead>
              <tr>
                {[
                  "method",
                  "agent",
                  "message",
                  "result",
                  "action",
                  "created_at",
                  "",
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
              {state.map((log, key) => {
                const className = `py-3 px-5 ${
                  key === state.length - 1 ? "" : "border-b border-blue-gray-50"
                }`;

                return (
                  <tr key={log?.id}>
                    <td className={className}>
                      <div className="flex items-center gap-4">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold"
                          >
                            {log?.method}
                          </Typography>
                        </div>
                      </div>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {log?.agent}
                      </Typography>
                    </td>

                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {log?.message}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {log?.result}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {log?.action}
                      </Typography>
                    </td>
                    <td className={className}>
                      <Typography className="text-xs font-semibold text-blue-gray-600">
                        {log?.createdAt}
                      </Typography>
                    </td>
                    <td className={className}>
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

export default Loggers;
