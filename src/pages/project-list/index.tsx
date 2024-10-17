import { useEffect, useState } from "react";
import List from "./ProjectList";
import SearchPanel from "./SearchPanel";
import { removeEmptyValue } from "../../utils/utils";
import useMount from "../../hooks/useMount";
import useDebounce from "../../hooks/useDebounce";
import { useHttp } from "../../utils/http";
import styled from "@emotion/styled";
import { Typography } from "antd";

export default function ProjectList() {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const debouncedParam = useDebounce(param, 500);
  const [list, setList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | Error>(null);

  const client = useHttp();

  useEffect(() => {
    setIsLoading(true);
    client("projects", { data: removeEmptyValue(debouncedParam) })
      .then(setList)
      .catch((error) => {
        setList([]);
        setError(error);
      })
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      });
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
  });

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  );
}

const Container = styled.div`
  padding: 3.2rem;
`;
