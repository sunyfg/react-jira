import { Row } from "./components/lib";
import { useAuth } from "./context/auth-context";
import ProjectListScreen from "./pages/project-list/index";
import SoftwareLogo from "./assets/software-logo.svg";
import styled from "@emotion/styled";
import { Button, Dropdown, MenuProps } from "antd";

export default function AuthenticatedApp() {
  const { logout, user } = useAuth();

  const handleClick: MenuProps["onClick"] = (e) => {
    if (e.key === "logout") {
      logout();
    }
  };
  return (
    <Container>
      <Header between>
        <HeaderLeft gap>
          <img src={SoftwareLogo} alt="" />
          <h2>项目</h2>
          <h2>用户</h2>
        </HeaderLeft>
        <HeaderRight>
          {/* <button onClick={logout}>登出</button> */}
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
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  );
}

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
  > img {
    width: 18rem;
  }
  > h2 {
    white-space: nowrap;
    font-size: 2rem;
  }
`;
const HeaderRight = styled.div``;

const Main = styled.main``;
