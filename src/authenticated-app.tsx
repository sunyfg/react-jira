import { ButtonNoPadding, Row } from "./components/lib";
import { useAuth } from "./context/auth-context";
import ProjectListScreen from "./pages/project-list/index";
import SoftwareLogo from "./assets/software-logo.svg";
import styled from "@emotion/styled";
import { Button, Dropdown, MenuProps } from "antd";
import { Route, Routes, Navigate } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import ProjectScreen from "./pages/project";
import { resetRoute } from "./utils/utils";
import { ProjectModal } from "./components/project-modal";
import { ProjectPopover } from "./components/project-popover";

export default function AuthenticatedApp() {
  return (
    <Container>
      <Router>
        <PageHeader />
        <Main>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            {/* 默认路由 */}
            <Route path="/" element={<Navigate to="/projects" />} />
          </Routes>
        </Main>
        <ProjectModal />
      </Router>
    </Container>
  );
}

const PageHeader = () => {
  return (
    <Header between>
      <HeaderLeft gap>
        <ButtonNoPadding type="link" onClick={resetRoute}>
          <img src={SoftwareLogo} alt="" />
        </ButtonNoPadding>

        <ProjectPopover />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  );
};

const User = () => {
  const { logout, user } = useAuth();

  const handleClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      logout();
    }
  };
  return (
    <Dropdown
      menu={{
        items: [{ key: "logout", label: "登出" }],
        onClick: handleClick,
      }}
    >
      <Button type="link" onClick={(e) => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  );
};

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem; // 设置行高
  height: 100vh;
`;

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
`;

const HeaderLeft = styled(Row)`
  > button {
    padding-left: 0;
    padding-right: 0;
  }
  img {
    width: 18rem;
  }
  > h2 {
    white-space: nowrap;
    font-size: 2rem;
  }
`;
const HeaderRight = styled.div``;

const Main = styled.main``;
