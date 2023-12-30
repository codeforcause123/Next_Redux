"use client";
import { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers } from "@/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";

interface Entity {
  name: string;
  id: number;
  age: number;
}
export default function Home() {
  const userRef = useRef(false);
  const { entities, loading ,userscount} = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    if (userRef.current === false) {
      dispatch(fetchUsers());
    }
    return () => {
      userRef.current = true;
    };
  }, []);

  return (
    <div>
      {userscount}
      {/* <h1>Entities</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        entities?.map((entity: Entity) => (
          <li key={entity.id}>{entity.name}</li>
        ))
      )} */}
    </div>
  );
}
