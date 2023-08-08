import { create } from "zustand";

enum Market {
  HK = "HK",
  US = "NA",
}

export interface IStock {
  id: string;
  name: string;
  market?: Market;
  exchange?: string;
  isActive: boolean;
}

interface StockInfo {
  list: Stock[];
  add: (stock: Stock) => void;
  remove: (id: string) => void;
  active: (id: string) => void;
}

export class Stock implements IStock {
  public id!: string;
  public isActive: boolean = false;
  public market?: Market | undefined;
  public name: string = "";
  public exchange?: string | undefined;
  constructor({
    name,
    market,
    exchange,
  }: Omit<Partial<IStock>, "id" | "isActive">) {
    this.id = new Date().getTime().toString();
    if (name) {
      this.name = name;
    }
    this.market = market;
    this.exchange = exchange;
  }

  public getMarketName(): string {
    switch (this.market) {
      case Market.HK:
        return "港交所";
      case Market.US:
        return "納茲達克";
      default:
        return "其他";
    }
  }
}

export const useStockList = create<StockInfo>()((set) => ({
  list: [],
  add: (stock) => set(({ list }) => ({ list: [...list, stock] })),
  remove: (stockId) =>
    set(({ list }) => ({ list: list.filter(({ id }) => id !== stockId) })),
  active: (stockId) =>
    set(({ list }) => {
      const target = list.find(({ id }) => stockId === id);
      if (target) {
        target.isActive = true;
      }
      return { list };
    }),
}));
