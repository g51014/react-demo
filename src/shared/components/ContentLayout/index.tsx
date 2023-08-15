import { IBaseComponentProp } from "@shared/interfaces/base-component.interface";
import { useEffect } from "react";

const ContentLayout = ({ children, testId, classes }: IBaseComponentProp) => {
    useEffect(() => window.scrollTo({ top: 0, behavior: "smooth" }), []);
    return (
        <section data-testid={testId} className={`component-content-layout mx-4 py-4 ${classes ?? ""}`}>
            {children}
        </section>
    );
};

export default ContentLayout;
