import { BreadcrumbConifg } from "@shared/components/Breadcrumb";
import { ProductModule } from "@shared/enums/modules.enum";
import { RouteConfig, routeMap } from "@utilities/routes";
import { useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";

interface Prop {
  /**
   * 須由useCallback建立
   * @param breadcrumbs 麵包屑設定
   */
  handleOnBreadcrumbChanged?: (breadcrumbs: BreadcrumbConifg[]) => void;
}

interface IBreadcrumb {
  pathname: string;
  /**
   * 麵包屑紀錄
   */
  breadcrumbs: string[];
  /**
   * 當前模組
   */
  module: ProductModule | null;
  /**
   * 路由設定
   */
  configs: BreadcrumbConifg[];
}

/**
 * 攤平路由
 * @param breadcrumb 父層路徑
 * @param routePath 當前路徑
 */
const getFlatRouterConfig = ({
  i18n,
  path,
  children,
}: RouteConfig): BreadcrumbConifg[] => {
  const currentConfig = { i18n, path };
  if (children && children.length > 0) {
    return [
      currentConfig,
      ...children
        .map((config) => getFlatRouterConfig(config))
        .reduce((configs, current) => [...configs, ...current], []),
    ];
  } else {
    return [{ i18n, path }];
  }
};

export const useBreadcrumb = (prop?: Prop): IBreadcrumb => {
  const { pathname } = useLocation();
  const breadcrumbs: string[] = useMemo(
    () => pathname.replace(/^\//, "").split("/"),
    [pathname]
  );
  const module: ProductModule | null = useMemo(
    () => (breadcrumbs[0] as ProductModule) || null,
    [breadcrumbs]
  );
  const flatRouteConfig: BreadcrumbConifg[] = useMemo(
    () =>
      routeMap.get(module) ? getFlatRouterConfig(routeMap.get(module)!) : [],
    [module]
  );

  useEffect(() => {
    if (prop?.handleOnBreadcrumbChanged) {
      prop.handleOnBreadcrumbChanged(flatRouteConfig);
    }
  }, [flatRouteConfig, prop]);

  return { pathname, breadcrumbs, module, configs: flatRouteConfig };
};
