import React, { useEffect, useState } from "react";
import MUIDataTable from "mui-datatables";
import { DeleteEvent, getAllEvents } from "../services/api";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import toast, { Toaster } from "react-hot-toast";
import Loader from "./Loader";

const Table = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const getEvents = async () => {
    setIsLoading(true)
    try {
      const events = await getAllEvents();
      setEvents(events?.data?.events);
      setIsLoading(false)
    } catch (error) {
      toast.error(error?.response?.data?.error[0]?.message);
      setIsLoading(false)
    }
  };

  const delete_event = async (id) => {
    try {
      const response = await DeleteEvent(id);
      toast.success(response?.data?.message);
      getEvents();
    } catch (error) {
      toast.error(error?.response?.data?.error[0]?.message);
    }
  };

  const updateEvent = (id) => navigate(`/Update_Event/${id}`);

  useEffect(() => {
    getEvents();
    // eslint-disable-next-line
  }, []);

  const columns = [
    "title",
    "description",
    "start_date",
    "start_time",
    "end_date",
    "end_time",
    {
      name: "_id",
      label: "Actions",
      options: {
        customBodyRender: (value, tableMeta) => {
          return (
            <div className="d-flex">
              <DeleteIcon
                className="icons"
                onClick={() => delete_event(value)}
              />
              <EditIcon
                className="ms-3 icons"
                onClick={() => updateEvent(value)}
              />

              {/* Your custom rendering */}
            </div>
          );
        },
      },
    },
  ];

  const options = {
    filterType: "checkbox",
  };
  return (
    <>
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : (
        <MUIDataTable
          title={"Event List"}
          data={events}
          columns={columns}
          options={options}
        />
      )}
    </>
  );
};

export default Table;
