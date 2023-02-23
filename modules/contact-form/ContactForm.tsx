import React, { FC } from "react";

import { Input, Textarea } from "components/ui";

// import { useSendMailMutation } from "redux/api/emailApi";

import styles from "./ContactForm.module.scss";

const ContactForm: FC = () => {
  //   const [sendMail, { isSuccess, isLoading, error }] = useSendMailMutation();

  return (
    <form className={styles.form_container}>
      <div className={styles.form_field}>
        <label htmlFor="name" className={styles.form_label}>
          Имя:
        </label>
        <Input
          name="name"
          placeholder="Введите ваше имя"
          id="name"
          onChange={(evt) => console.log(evt)}
        />
      </div>

      <div className={styles.form_field}>
        <label htmlFor="email" className={styles.form_label}>
          Email:
        </label>
        <Input
          name="email"
          placeholder="Введите ваш email"
          id="email"
          onChange={(evt) => console.log(evt)}
        />
      </div>

      <div className={styles.form_field}>
        <label htmlFor="message" className={styles.form_label}>
          Сообщение:
        </label>
        <Textarea
          name="message"
          placeholder="Введите текст сообщения"
          id="message"
          onChange={(evt) => console.log(evt)}
        />
      </div>
    </form>
  );
};

export { ContactForm };
