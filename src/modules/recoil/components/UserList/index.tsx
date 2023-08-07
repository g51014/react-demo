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
    <li className="d-flex flex-row align-items-center gap-2">
      {name}
      <button onClick={() => handleOnViewUser(id)}>view</button>
      {!isAuth && (
        <button onClick={() => update({ isAuth: true })}>auth</button>
      )}
      {isAuth && (
        <button disabled={using} onClick={switchUser}>
          switch
        </button>
      )}
    </li>
  );
};

const UserList = ({ list, handleOnViewUser }: Props) => {
  const navigate = useNavigate();
  return (
    <>
      <h1>user list</h1>
      <ul className="p-0 m-0 list-unstyled gap-3 d-flex flex-column">
        {list.length > 0 ? (
          list.map((user) => (
            <UserListItem
              key={user.id}
              user={user}
              handleOnViewUser={handleOnViewUser}
            />
          ))
        ) : (
          <li>no data</li>
        )}
        <li>
          <button onClick={() => navigate(`/recoil/demo/add`)}>add</button>
        </li>
      </ul>
    </>
  );
};
export default UserList;
