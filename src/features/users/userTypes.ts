export type Company = {
  name: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  company?: Company;
};
