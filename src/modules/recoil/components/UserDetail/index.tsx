import { User, useUserInfo, userListState } from "@modules/recoil/models/user.model";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useSetRecoilState } from "recoil";

interface Props {
    id?: string;
    isEdit: boolean;
    handleOnModeChange: (isEdit: boolean) => void;
}

interface Form {
    name: string;
    email?: string;
    address?: string;
    phone?: string;
}

const UserDetail = ({ id = "", isEdit, handleOnModeChange }: Props) => {
    const setter = useSetRecoilState(userListState);
    const { user, update } = useUserInfo(id);

    const {
        setValue,
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<Form>({
        mode: "onChange",
    });

    const onSubmit: SubmitHandler<Form> = (data: Partial<Omit<User, "name">> & Pick<User, "name">) => {
        switch (id) {
            case "add":
                setter((list) => [
                    ...list,
                    new User({
                        ...data,
                        ...{
                            id: new Date().getTime().toString(),
                            isAuth: false,
                            using: false,
                        },
                    }),
                ]);
                reset();
                break;
            default:
                update(data);
                break;
        }
    };

    useEffect(() => {
        if (user && isEdit) {
            const { name, email, address, phone } = user;
            setValue("name", name);
            setValue("email", email);
            setValue("address", address);
            setValue("phone", phone);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isEdit]);

    useEffect(() => {
        if (!user) {
            reset();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    return (
        <>
            <form className={`${isEdit || id === "add" ? "d-block" : "d-none"}`} onSubmit={handleSubmit(onSubmit)}>
                <table>
                    <tbody>
                        <tr>
                            <th className="align-top py-2">name:</th>
                            <td className="ps-3 py-2">
                                <input type="text" {...register("name", { required: "field required" })} />
                                <ErrorMessage
                                    errors={errors}
                                    name="name"
                                    render={({ message }) => <p className="text-start text-danger mb-0">{message}</p>}
                                />
                            </td>
                        </tr>
                        <tr>
                            <th className="py-2">email:</th>
                            <td className="ps-3 py-2">
                                <input type="text" {...register("email")} />
                            </td>
                        </tr>
                        <tr>
                            <th className="py-2">address:</th>
                            <td className="ps-3 py-2">
                                <input type="text" {...register("address")} />
                            </td>
                        </tr>
                        <tr>
                            <th className="py-2">phone number:</th>
                            <td className="ps-3 py-2">
                                <input type="text" {...register("phone")} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button
                    disabled={Object.values(errors).length > 0}
                    className="mt-3"
                    onClick={() => handleOnModeChange(false)}
                >
                    submit
                </button>
            </form>
            {user && (
                <section className={`${isEdit ? "d-none" : "d-block"}`}>
                    <h1>user info</h1>
                    <h3>{user?.name}</h3>
                    <ul className="list-unstyled">
                        <li>email: {user?.email ?? "-"}</li>
                        <li>address: {user?.address ?? "-"}</li>
                        <li>phone number: {user?.phone ?? "-"}</li>
                    </ul>
                    <button className="mt-3" onClick={() => handleOnModeChange(true)}>
                        edit
                    </button>
                </section>
            )}
        </>
    );
};
export default UserDetail;
