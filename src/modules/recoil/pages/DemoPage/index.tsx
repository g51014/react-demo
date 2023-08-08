import UserDetail from "@modules/recoil/components/UserDetail";
import UserList from "@modules/recoil/components/UserList";
import {
  UserFilter,
  userFilter,
  userListSelector,
} from "@modules/recoil/models/user.model";
import ContentLayout from "@shared/components/ContentLayout";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface Props {}
const DemoPage = (props: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const list = useRecoilValue(userListSelector);
  const filter = useSetRecoilState(userFilter);
  const [isEdit, setEdit] = useState<boolean>(false);
  return (
    <ContentLayout testId="DemoPage">
      <div className="row gap-4 gap-md-0">
        <div className="col-12 mb-0 mb-md-4">
          <div className="d-flex flex-row align-items-center gap-3">
            fitler:
            <button onClick={() => filter(UserFilter.All)}>all</button>
            <button onClick={() => filter(UserFilter.Valid)}>valid</button>
          </div>
        </div>
        <div className="col-12 col-md-6">
          <UserList
            list={list}
            handleOnViewUser={(id) => {
              navigate(`/recoil/demo/${id}`);
              setEdit(false);
            }}
          />
        </div>
        <div className="col-12 col-md-6">
          <UserDetail
            id={id}
            isEdit={isEdit}
            handleOnModeChange={(isEdit) => setEdit(isEdit)}
          />
        </div>
      </div>
    </ContentLayout>
  );
};
export default DemoPage;
