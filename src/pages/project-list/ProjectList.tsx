import React from "react";

interface Props {
  list: any;
  users: any[];
}
export default function List({ users, list }: Props) {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map((item: any) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>
              {users.find((user) => user.id === item.personId)?.name || "未知"}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
