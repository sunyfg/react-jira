import { useEffect, useState } from "react";
import qs from "qs";
import List from "./ProjectList";
import SearchPanel from "./SearchPanel";
import { removeEmptyValue } from "../../utils/utils";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProjectList() {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "1",
  });
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(removeEmptyValue(param))}`).then(
      async (response) => {
        if (response.ok) {
          setList(await response.json());
        }
      },
    );
  }, [param]);

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        setUsers(await response.json());
      }
    });
  }, []);

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
}
