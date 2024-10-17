import { useEffect, useState } from "react";
import qs from "qs";
import List from "./ProjectList";
import SearchPanel from "./SearchPanel";
import { removeEmptyValue } from "../../utils/utils";
import useMount from "../../hooks/useMount";
import useDebounce from "../../hooks/useDebounce";
import { useHttp } from "../../utils/http";
import { useAuth } from "../../context/auth-context";
import styled from "@emotion/styled";

const apiUrl = import.meta.env.VITE_API_URL;

export default function ProjectList() {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "1",
  });
  const debouncedParam = useDebounce(param, 500);
  const [list, setList] = useState([]);

  const client = useHttp();

  useEffect(() => {
    client("projects", { data: removeEmptyValue(debouncedParam) }).then(
      setList,
    );
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`;
