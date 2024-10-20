import List from "./ProjectList";
import SearchPanel from "./SearchPanel";
import useDebounce from "../../hooks/useDebounce";
import styled from "@emotion/styled";
import { useProjects } from "../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectModal, useProjectsSearchParams } from "./util";
import {
  ButtonNoPadding,
  ErrorBox,
  Row,
  ScreenContainer,
} from "../../components/lib";

export default function ProjectList() {
  const { open } = useProjectModal();
  const [param, setParam] = useProjectsSearchParams();

  const { isLoading, error, data: list } = useProjects(useDebounce(param, 500));
  const { data: users } = useUsers();

  return (
    <ScreenContainer>
      <Row between>
        <h1>项目列表</h1>
        <ButtonNoPadding type={"link"} onClick={open}>
          新建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </ScreenContainer>
  );
}

// whyDidYouRender 用于检测组件是否被重新渲染
ProjectList.whyDidYouRender = false;
