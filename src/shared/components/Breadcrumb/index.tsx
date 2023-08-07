import { useBreadcrumb } from "@shared/hooks/useBreadcrumb";
import { RouteConfig } from "@utilities/routes";
import { NavLink } from "react-router-dom";
import { IBaseComponentProp } from "@shared/interfaces/base-component.interface";
import { forwardRef } from "react";

interface Props extends IBaseComponentProp {}

export type BreadcrumbConifg = Pick<RouteConfig, "i18n" | "path">;

const Breadcrumb = forwardRef<HTMLDivElement>((prop: Props, ref) => {
  const { pathname, breadcrumbs, configs, module } = useBreadcrumb();

  return (
    <nav
      ref={ref}
      className="d-flex flex-row align-items-center py-3 mx-5 border-bottom border-line-3 psgp-breadcrumb"
      hidden={/401|404/.test(pathname)}
    >
      {breadcrumbs.map((breadcrumb, index) => {
        const isCurrentPage = new RegExp(`${breadcrumb}$`).test(pathname);
        return (
          <NavLink
            className={`d-flex flex-row align-items-center text-gray-${
              isCurrentPage ? 1 : 2
            } text-gray-${isCurrentPage ? 1 : 2}--hover ${
              isCurrentPage ? "cursor-default" : ""
            }`}
            key={breadcrumb}
            to={breadcrumbs.reduce((path, breadcrumb, i) =>
              i > index ? path : `${path}/${breadcrumb}`
            )}
            onClick={(e) => {
              if (isCurrentPage) {
                e.preventDefault();
              }
            }}
          >
            {
              configs.find(({ path }) =>
                path ? path === breadcrumb : module === breadcrumb
              )?.i18n
            }
          </NavLink>
        );
      })}
    </nav>
  );
});
export default Breadcrumb;
