import styled from "@emotion/styled";
import { useKanban } from "../../utils/kanban";
import { useDocumentTitle } from "../../utils/utils";
import { KanbanColumn } from "./kanban-column";
import { useKanbanSearchParams, useProjectInUrl } from "./utils";
import { SearchPanel } from "./search-panel";

export default function KanbanScreen() {
  useDocumentTitle("看板列表");

  const { data: currentProject } = useProjectInUrl();

  const { data: kanbans } = useKanban(useKanbanSearchParams());
  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnsContainer>
        {kanbans?.map((kanban) => {
          return <KanbanColumn key={kanban.id} kanban={kanban} />;
        })}
      </ColumnsContainer>
    </div>
  );
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
