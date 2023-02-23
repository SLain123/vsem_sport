export type MailType = {
  name: string;
  email: string;
  message: string;
};

export type MailAttributeType = MailType & {
  createdAt: string;
  updatedAt: string;
};

export type MailRequest = {
  data: MailType;
};

export type MailResponse = {
  data: MailType;
  attributes: MailAttributeType;
  meta: {};
};
