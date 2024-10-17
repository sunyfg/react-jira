import { AuthProvider } from "./auth-context";
import { ConfigProvider } from "antd";

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1DA57A",
          fontSize: 16,
        },
      }}
    >
      <AuthProvider>{children}</AuthProvider>
    </ConfigProvider>
  );
};
