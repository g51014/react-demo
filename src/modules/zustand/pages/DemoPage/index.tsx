import { ErrorMessage } from "@hookform/error-message";
import {
  IStock,
  Stock,
  useStockList,
} from "@modules/zustand/models/stock.model";
import ContentLayout from "@shared/components/ContentLayout";
import { useForm } from "react-hook-form";

type Form = Omit<Partial<IStock>, "id">;

const initialForm: Form = {
  name: "",
  market: undefined,
  exchange: undefined,
};

const DemoPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: initialForm,
  });
  const { list, add, remove, active } = useStockList();
  const form = (
    <form
      onSubmit={handleSubmit((formData) => {
        add(new Stock(formData));
        reset();
      })}
    >
      <table>
        <tbody>
          <tr>
            <th className="align-top py-2">name:</th>
            <td className="ps-3 py-2">
              <input
                type="text"
                {...register("name", { required: "field required" })}
              />
              <ErrorMessage
                errors={errors}
                name="name"
                render={({ message }) => (
                  <p className="text-start text-danger mb-0">{message}</p>
                )}
              />
            </td>
          </tr>
          <tr>
            <th className="py-2">market:</th>
            <td className="ps-3 py-2">
              <input type="text" {...register("market")} />
            </td>
          </tr>
          <tr>
            <th className="py-2">exchange:</th>
            <td className="ps-3 py-2">
              <input type="text" {...register("exchange")} />
            </td>
          </tr>
        </tbody>
      </table>
      <button disabled={Object.values(errors).length > 0} className="mt-3">
        submit
      </button>
    </form>
  );
  return (
    <ContentLayout testId="DemoPage">
      <div className="row">
        <div className="col-12 mt-4">
          <table className="w-100" style={{ tableLayout: "fixed" }}>
            <thead>
              <tr>
                <th style={{ width: "60%" }} className="pe-3 py-1">
                  name
                </th>
                <th className="pe-3 py-1">market</th>
                <th className="pe-3 py-1">ation</th>
              </tr>
            </thead>
            <tbody>
              {list.length > 0 ? (
                list.map((stock) => (
                  <tr key={stock.id}>
                    <td>{stock.name}</td>
                    <td>{stock.getMarketName()}</td>
                    <td>
                      <div className="d-flex flex-row align-items-center gap-3">
                        <button onClick={() => remove(stock.id)}>remove</button>
                        <button
                          disabled={stock.isActive}
                          onClick={() => active(stock.id)}
                        >
                          active
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2}>no data</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="col-12 mt-4">{form}</div>
      </div>
    </ContentLayout>
  );
};

export default DemoPage;
