export type userType = {
  id: number;
  fullName?: string;
  avatarUrl: string;
  userName: string;
  access_token: string;
  subscriptions?: string;
};

export type userResponse = {
  id: number;
  fullName?: string;
  avatarUrl: string;
  userName: string;
  access_token: string;
  subscriptions?: string;
};

export type login = {
  userName: string;
  password: string;
};

export type roomType = {
  id: number;
  title: string;
  listenersCount: number;
  type: string;
  speakers: userType[];
};

export type register = {
  fullName?: string;
  userName: string;
  password: string;
};
export type update = {
  fullName: string;
  userName: string;
  password: string;
};
