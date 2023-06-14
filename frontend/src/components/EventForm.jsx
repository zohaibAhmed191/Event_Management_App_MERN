import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CreateNewEvent, getEvent, UpdateEvent } from "../services/api";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
const EventForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const getSingleEvent = async () => {
    try {
      const response = await getEvent(params.id);
      const {
        title,
        description,
        start_date,
        end_date,
        location,
        start_time,
        end_time,
      } = response?.data?.event;
      setValue("title", title);
      setValue("description", description);
      setValue("start_date", start_date);
      setValue("end_date", end_date);
      setValue("location", location);
      setValue("start_time", start_time);
      setValue("end_time", end_time);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSingleEvent();
    // eslint-disable-next-line
  }, [params.id]);

  const createEvent = async (event) => {
    try {
      setIsLoading(true);
      const response = await CreateNewEvent(event);
      setIsLoading(false);
      toast.success(response?.data?.message);
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.error[0]?.message);
    }
  };

  const updating = async (body) => {
    try {
      setIsLoading(true);
      const response = await UpdateEvent(body, params.id);
      setIsLoading(false);
      toast.success(response?.data?.message);
      navigate("/home");
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.response?.data?.error[0]?.message);
    }
  };

  return (
    <>
      <Toaster />
      {isLoading ? (
        <Loader />
      ) : (
        <div className="container my-5 pt-4">
          <h1 className="text-center mb-5">
            {params.id ? "Update Event" : "Add New Event"}
          </h1>
          <form
            onSubmit={
              params.id ? handleSubmit(updating) : handleSubmit(createEvent)
            }
          >
            <div className="row">
              <div className="col-lg-6">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    {...register("title", { required: true })}
                  />
                  {errors.title && (
                    <p className="text-danger m-0">Title Required</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    {...register("description", { required: true })}
                  />
                  {errors.description && (
                    <p className="text-danger m-0">description Required</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">
                    Location
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    {...register("location", { required: true })}
                  />
                  {errors.location && (
                    <p className="text-danger m-0">location Required</p>
                  )}
                </div>
              </div>
              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Start Date
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        {...register("start_date", { required: true })}
                      />
                      {errors.start_date && (
                        <p className="text-danger m-0">start_date Required</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Start Time
                      </label>
                      <input
                        type="time"
                        class="form-control"
                        {...register("start_time", { required: true })}
                      />
                      {errors.start_time && (
                        <p className="text-danger m-0">start_time Required</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="row">
                  <div className="col-lg-6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        End Date
                      </label>
                      <input
                        type="date"
                        class="form-control"
                        {...register("end_date", { required: true })}
                      />
                      {errors.end_date && (
                        <p className="text-danger m-0">end_date Required</p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div class="mb-3">
                      <label for="exampleInputEmail1" class="form-label">
                        End Time
                      </label>
                      <input
                        type="time"
                        class="form-control"
                        {...register("end_time", { required: true })}
                      />
                      {errors.end_time && (
                        <p className="text-danger m-0">end_time Required</p>
                      )}
                    </div>
                  </div>

                  <div className="col">
                    <div class="mb-3 float-end">
                      <input type="submit" class="submit-btn px-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EventForm;
