import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useMemo } from "react";
import { useBreadcrumb } from "@shared/hooks/useBreadcrumb";
import Breadcrumb from "@shared/components/Breadcrumb";
import { Navigate, Route, Routes } from "react-router-dom";
import { NestRoute, routeMap } from "@utilities/routes";
import { useRecoilState } from "recoil";
import { userListState } from "@modules/recoil/models/user.model";

function App() {
  const { configs } = useBreadcrumb();
  const [list] = useRecoilState(userListState);
  const currentUser = useMemo(() => list.find(({ using }) => using), [list]);
  return (
    <>
      <header className="mx-4 d-flex flex-row justify-content-end align-items-center pt-3">
        current user: {currentUser?.name}
      </header>
      <main className="d-flex flex-column">
        {configs.length > 0 && <Breadcrumb />}
        <React.Suspense fallback={<></>}>
          <Routes>
            {Array.from(routeMap.keys()).map((key) =>
              NestRoute(routeMap.get(key)!, key)
            )}
            <Route path="*" element={<Navigate to="recoil/demo" />} />
          </Routes>
        </React.Suspense>
      </main>
    </>
  );
}

export default App;
