export interface IBaseComponentProp {
    /**
     * children component
     */
    children?: React.ReactNode;
    /**
     * custom class
     */
    classes?: string;
    /**
     * for unit test
     */
    testId?: string;
}

export interface IBaseOverlay extends IBaseComponentProp {
    onClose: (id: string) => void;
    handleOnClose?: () => void;
}
