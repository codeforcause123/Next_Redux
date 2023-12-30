"use client";
import React, { useEffect } from "react";
import { useState, ChangeEvent, FormEvent } from "react";
import { Select, Option } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store/store";
import { fetchUsers, increment, loadingToggle } from "@/slices/userSlice";
import Skeleton from "@mui/material/Skeleton";
import {
  List,
  ListItem,
  ListItemSuffix,
  Card,
  IconButton,
} from "@material-tailwind/react";
import { toast } from "react-toastify";
function TrashIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-5 w-5"
    >
      <path
        fillRule="evenodd"
        d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
        clipRule="evenodd"
      />
    </svg>
  );
}
type Request = {
  method: string;
  name: string;
  age: number;
};
interface Entity {
  name: string;
  id: number;
  age: number | string;
}

const DropDownandInput = () => {
  const { entities, loading, userscount } = useSelector(
    (state: RootState) => state.user
  );
  const dispatch = useDispatch<AppDispatch>();
  const [request, setRequest] = useState<Request>({
    method: "GETALL",
    name: "",
    age: 0,
  });

  const [disableNameField, setDisableNameField] = useState(true);
  const [disableAgeField, setDisableAgeField] = useState(true);

  const handleSelectChange = (value: string): void => {
    setRequest((prevData: Request) => ({
      ...prevData,
      method: value,
      // Reset name and age when "GETALL" is selected
      name: value === "GETALL" ? "" : prevData.name,
      age: value === "GETALL" ? "" : prevData.age,
    }));

    if (value === "GETALL") {
      setDisableNameField(true);
      setDisableAgeField(true);
    } else {
      setDisableAgeField(false);
      setDisableNameField(false);
    }
  };

  const handleDelete = async (id: number) => {
    dispatch(loadingToggle());
    try {
      const response = await fetch(`http://localhost:4000/users/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        toast.success("User Deleted Successfully", {
          position: toast.POSITION.TOP_RIGHT,
        });
        dispatch(fetchUsers());
        dispatch(loadingToggle());
      }
    } catch (error) {}
  };
  const handleChange = (
    e: ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    const { value } = e.target;
    setRequest((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      let url: string;

      if (request.method === "GETALL") {
        url = `http://localhost:4000/users/handle-request?method=${request.method}`;

        request.method = "GET";
      } else if (request.method === "GET") {
        url = `http://localhost:4000/users/handle-request?name=${request.name}&age=${request.age}`;
      } else {
        url = "http://localhost:4000/users/handle-request";
      }

      const requestOptions: RequestInit = {
        method: request.method,
        headers: {
          "Content-Type": "application/json",
        },
      };

      if (["POST", "PUT"].includes(request.method)) {
        requestOptions.body = JSON.stringify(request);
      }

      const response = await fetch(url, requestOptions);

      if (response.ok) {
        dispatch(fetchUsers());
        console.log(entities);
      } else {
        console.error("Failed to submit form data");
      }
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="px-2 m-10 flex flex-col lg:flex-row gap-2"
      >
        <Select
          variant="outlined"
          label="Req to Send"
          size="md"
          color="blue"
          onChange={handleSelectChange}
          value={request.method}
        >
          <Option value="GETALL">GETALL</Option>
          <Option value="GET">GET</Option>
          <Option value="POST">POST</Option>
          <Option value="PUT">PUT</Option>
          <Option value="DELETE">DELETE</Option>
        </Select>
        <Input
          color="purple"
          label="Name"
          type="text"
          value={request.name}
          onChange={(e) => handleChange(e, "name")}
          disabled={disableNameField}
        />
        <Input
          color="teal"
          label="Age"
          type="number"
          value={request.age}
          onChange={(e) => handleChange(e, "age")}
          disabled={disableAgeField}
        />
        <button className="btn btn-success btn-sm" type="submit">
          Submit
        </button>
      </form>
      {loading ? (
        <div className="flex flex-row justify-center">
          <Skeleton variant="rounded" width={250} height={300} />
        </div>
      ) : (
        <div className="flex flex-row justify-center">
          <Card className="w-64" placeholder={"card"}>
            <List placeholder={"list"}>
              {entities.map((entity: Entity) => (
                <ListItem
                  ripple={false}
                  className="py-1 pr-1 pl-4"
                  key={entity.id}
                  placeholder={"Items"}
                >
                  {entity.name} - {entity.age}
                  <ListItemSuffix placeholder={"suffix"}>
                    <IconButton
                      variant="text"
                      color="blue-gray"
                      placeholder={"iconButton"}
                      onClick={() => handleDelete(entity.id)}
                    >
                      <TrashIcon />
                    </IconButton>
                  </ListItemSuffix>
                </ListItem>
              ))}
            </List>
          </Card>
        </div>
      )}
    </>
  );
};

export default DropDownandInput;
