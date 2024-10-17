import { useState } from "react";
import List from "./ProjectList";
import SearchPanel from "./SearchPanel";
import useDebounce from "../../hooks/useDebounce";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectsSearchParams } from "./util";

export default function ProjectList() {
  const [param, setParam] = useProjectsSearchParams();

  const {
    isLoading,
    error,
    data: list,
    retry,
  } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type="danger">{error.message}</Typography.Text>
      ) : null}
      <List
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  );
}

ProjectList.whyDidYouRender = true;

const Container = styled.div`
  padding: 3.2rem;
`;
