import { ProductModule } from "@shared/enums/modules.enum";
import { Navigate, Route, useLocation } from "react-router-dom";
import React from "react";

export type RouteConfig = {
  path: string;
  component: any;
  /**
   * 路由名稱
   */
  i18n: string;
  icon?: string;
  /**
   * 子路由
   */
  children?: RouteConfig[];
  /**
   * 啟動規則，默認繼承父層規則
   */
  canActive?: (() => Promise<boolean>)[];
};

export const routeMap = new Map<ProductModule, RouteConfig>([
  [
    ProductModule.Recoil,
    {
      path: "",
      children: [
        {
          path: "demo",
          component: React.lazy(() => import("@modules/recoil/pages/DemoPage")),
        },
        {
          path: "demo/:id",
          component: React.lazy(() => import("@modules/recoil/pages/DemoPage")),
        },
      ],
    } as RouteConfig,
  ],
  [
    ProductModule.Zustand,
    {
      path: "",
      children: [
        {
          path: "demo",
          component: React.lazy(
            () => import("@modules/zustand/pages/DemoPage")
          ),
        },
      ],
    } as RouteConfig,
  ],
  [
    ProductModule.ReactQuery,
    {
      path: "",
      children: [
        {
          path: "demo",
          component: React.lazy(
            () => import("@modules/react-query/pages/DemoPage")
          ),
        },
      ],
    } as RouteConfig,
  ],
]);

/**
 * 巢狀路由
 * @param param0 當前路由設置
 * @param rootPath 父層路徑
 * @param parentCanActive 父層路由守衛
 * @returns 截至目前為止的路由目錄
 */
export const NestRoute = (
  { path, component: Component, children, canActive }: RouteConfig,
  rootPath: string,
  parentCanActive: (() => Promise<boolean>)[] = []
): React.ReactElement[] => {
  let childrenRoutes: React.ReactElement[] = [];
  const currentPath = path ? `${rootPath}/${path}` : rootPath;
  const currentCanAvtice = [...parentCanActive, ...(canActive ?? [])];
  const location = useLocation();

  if (!!children && children?.length > 0) {
    childrenRoutes = children.flatMap((config) =>
      NestRoute(config, currentPath, currentCanAvtice)
    );
  }

  return [
    ...childrenRoutes,
    <Route
      key={currentPath}
      path={currentPath}
      element={
        Component ? (
          <Component />
        ) : (
          <Navigate to="/404" state={{ from: location }} replace />
        )
      }
    />,
  ];
};
