import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import React, { useMemo } from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { NestRoute, routeMap } from "@utilities/routes";
import { useRecoilState } from "recoil";
import { userListState } from "@modules/recoil/models/user.model";
import { ProductModule } from "@shared/enums/modules.enum";
import { useStockList } from "@modules/zustand/models/stock.model";

function App() {
    const navigate = useNavigate();
    const [list] = useRecoilState(userListState);
    const { data } = useStockList();
    const currentUser = useMemo(() => list.find(({ using }) => using), [list]);
    return (
        <>
            <header className="mx-4 d-flex flex-row justify-content-between align-items-center pt-3 mx-4">
                <nav className="d-flex flex-row gap-2">
                    {[ProductModule.Recoil, ProductModule.Zustand, ProductModule.ReactQuery].map((e) => (
                        <a key={e} onClick={() => navigate(`/${e}/demo`)}>
                            {e}
                        </a>
                    ))}
                </nav>
                <div className="d-flex flex-row gap-2">
                    {data
                        .filter(({ isActive }) => isActive)
                        .map(({ name, id }) => (
                            <p key={id} className="m-0">
                                {name}
                            </p>
                        ))}
                    <p className="m-0">current user: {currentUser?.name}</p>
                </div>
            </header>
            <main className="d-flex flex-column">
                <React.Suspense fallback={<></>}>
                    <Routes>
                        {Array.from(routeMap.keys()).map((key) => NestRoute(routeMap.get(key)!, key))}
                        <Route path="*" element={<Navigate to="recoil/demo" />} />
                    </Routes>
                </React.Suspense>
            </main>
        </>
    );
}

export default App;
