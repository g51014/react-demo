import { atom, selector, useRecoilState, useSetRecoilState } from "recoil";

interface IUser {
  name: string;
  id: string;
  isAuth: boolean;
  using: boolean;
  email?: string;
  address?: string;
  phone?: string;
}

export enum UserFilter {
  All = 1,
  Incomplete,
  Valid,
}

export class User implements IUser {
  public name!: string;
  public id!: string;
  public isAuth: boolean = false;
  public using: boolean = false;
  public email?: string | undefined;
  public address?: string | undefined;
  public phone?: string | undefined;

  constructor(user?: IUser) {
    if (user) {
      Object.assign(this, user);
    }
  }

  public edit({ name, address, phone, email, isAuth, using }: Partial<IUser>) {
    if (name) {
      this.name = name;
    }
    this.address = address;
    this.phone = phone;
    this.email = email;
    if (typeof isAuth === "boolean") {
      this.isAuth = isAuth;
    }
    if (typeof using === "boolean") {
      this.using = using;
    }
  }
}

export const userListState = atom<User[]>({
  key: "user-list",
  default: [
    new User({
      name: "test",
      id: new Date().getTime().toString(),
      isAuth: true,
      using: true,
    }),
  ],
});

export const userFilter = atom<UserFilter>({
  key: "user-list-filter",
  default: undefined,
});

export const userListSelector = selector({
  key: "user-list-selector",
  get: ({ get }) => {
    const filter = get(userFilter);
    const list = get(userListState);

    switch (filter) {
      case UserFilter.Valid:
        return list.filter(({ isAuth }) => isAuth);
      default:
        return list;
    }
  },
});

export const useUserInfo = (id: string) => {
  const setter = useSetRecoilState(userListState);
  const [userList] = useRecoilState(userListState);
  const targetIndex = userList.findIndex((user) => user.id === id);
  const user = userList.find((user) => user.id === id)
    ? new User(userList.find((user) => user.id === id))
    : undefined;
  return {
    user,
    update: (info: Partial<IUser>) => {
      if (user) {
        setter((oldList) => {
          user.edit(info);
          const newList = oldList.slice(0);
          newList[targetIndex] = user;
          return newList;
        });
      }
    },
    switchUser: () => {
      if (user) {
        setter((oldList) => {
          const newList = oldList.slice(0).map((user) => new User(user));
          newList.forEach((user, index) =>
            user.edit({ using: index === targetIndex })
          );
          return newList;
        });
      }
    },
  };
};
