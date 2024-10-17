import { Route, Routes, Navigate } from "react-router";
import { Link } from "react-router-dom";
import KanbanScreen from "../kanban";
import EpicScreen from "../epic";

export default function ProjectScreen() {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link to={"kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"/kanban"} element={<KanbanScreen />} />
        <Route path={"/epic"} element={<EpicScreen />} />
        <Route path={"/*"} element={<Navigate to={"kanban"} />} />
      </Routes>
    </div>
  );
}
