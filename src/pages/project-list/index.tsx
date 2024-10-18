import List from "./ProjectList";
import SearchPanel from "./SearchPanel";
import useDebounce from "../../hooks/useDebounce";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import { ButtonNoPadding, Row } from "../../components/lib";

export default function ProjectList() {
  const { open } = useProjectModal();
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
      <Row between>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          新建项目
        </ButtonNoPadding>
      </Row>
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

// whyDidYouRender 用于检测组件是否被重新渲染
ProjectList.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
