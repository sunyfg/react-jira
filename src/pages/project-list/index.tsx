import List from "./ProjectList";
import SearchPanel from "./SearchPanel";
import useDebounce from "../../hooks/useDebounce";
import styled from "@emotion/styled";
import { Button, Typography } from "antd";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectsSearchParams } from "./util";
import { Row } from "../../components/lib";

export default function ProjectList(props: {
  setProjectModalOpen: (open: boolean) => void;
}) {
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
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
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
        setProjectModalOpen={props.setProjectModalOpen}
      />
    </Container>
  );
}

// whyDidYouRender 用于检测组件是否被重新渲染
ProjectList.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
