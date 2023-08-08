import { User, useUserInfo } from "@modules/recoil/models/user.model";
import { useNavigate } from "react-router-dom";

interface Props {
  list: User[];
  handleOnViewUser: (id: string) => void;
}

interface ListItem {
  user: User;
  handleOnViewUser: (id: string) => void;
}

const UserListItem = ({ user, handleOnViewUser }: ListItem) => {
  const { update, switchUser } = useUserInfo(user.id);
  const { id, name, isAuth, using } = user!;
  return (
    <tr className="py-3">
      <td className="pe-3 py-1 text-wrap" style={{ wordBreak: "break-all" }}>
        {name}
      </td>
      <td className="pe-3 py-1">
        <div className="d-flex flex-row align-items-center gap-3">
          <button onClick={() => handleOnViewUser(id)}>view</button>
          {!isAuth && (
            <button onClick={() => update({ isAuth: true })}>auth</button>
          )}
          {isAuth && (
            <button disabled={using} onClick={switchUser}>
              switch
            </button>
          )}
        </div>
      </td>
    </tr>
  );
};

const UserList = ({ list, handleOnViewUser }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <h1>user list</h1>
      <table className="w-100" style={{ tableLayout: "fixed" }}>
        <thead>
          <tr>
            <th style={{ width: "60%" }} className="pe-3 py-1">
              name
            </th>
            <th className="pe-3 py-1">ation</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((user) => (
              <UserListItem
                key={user.id}
                user={user}
                handleOnViewUser={handleOnViewUser}
              />
            ))
          ) : (
            <tr>
              <td colSpan={2}>no data</td>
            </tr>
          )}
        </tbody>
      </table>
      <button className="mt-4" onClick={() => navigate(`/recoil/demo/add`)}>
        add
      </button>
    </>
  );
};
export default UserList;
