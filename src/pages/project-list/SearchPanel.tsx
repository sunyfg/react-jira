import { Form, Input } from "antd";
import { Project } from "../../types/project";
import { UserSelect } from "../../components/user-select";
import { User } from "../../types/user";
interface SearchPanelProps {
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
  users: User[];
}
export default function SearchPanel({ param, setParam }: SearchPanelProps) {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          type="text"
          placeholder="项目名"
          value={param.name}
          onChange={(evt) =>
            setParam({
              ...param,
              name: evt.target.value,
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOption="负责人"
          value={param.personId}
          onChange={(value) => setParam({ ...param, personId: value })}
        />
      </Form.Item>
    </Form>
  );
}
