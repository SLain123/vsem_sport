import React, { FC, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import { Input, Textarea, Button, Checkbox } from "components/ui";

import { useSendMailMutation } from "redux/api/emailApi";

import styles from "./ContactForm.module.scss";

const ContactForm: FC = () => {
  const [privacy, setPrivacy] = useState(true);
  const [sendMail, { isSuccess, isLoading, error }] = useSendMailMutation();

  const initialValues = { name: "", email: "", message: "" };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Имя является Обязательным"),
    email: Yup.string()
      .email("Некорректный Email")
      .required("Email является Обязательным"),
    message: Yup.string()
      .min(10, "Сообщение слишком короткое, от 10 символов")
      .required("Сообщение является Обязательным"),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: ({ name, email, message }) => {
      const data = { data: { name, email, message } };
      sendMail(data);
    },
  });

  const isDisabled =
    !privacy || isLoading || isSuccess || !formik.isValid || !formik.dirty;

  return (
    <form className={styles.form_container} onSubmit={formik.handleSubmit}>
      <div className={styles.form_field}>
        <label htmlFor="name" className={styles.form_label}>
          Имя:
        </label>
        <Input
          name="name"
          placeholder="Введите ваше имя"
          id="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          error={Boolean(formik.touched.name && formik.errors.name)}
          errorMessage={formik.errors.name}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          error={Boolean(formik.touched.email && formik.errors.email)}
          errorMessage={formik.errors.email}
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
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.message}
          resize="vertical"
          error={Boolean(formik.touched.message && formik.errors.message)}
          errorMessage={formik.errors.message}
        />
      </div>

      <div className={styles.form_privacy}>
        <Checkbox
          checkboxName="privacy"
          onChange={(value) => {
            setPrivacy(value);
          }}
          label="Я изучил лицензионное соглашение и согласен со всеми его условиями."
          isActive={privacy}
        />
      </div>

      {isSuccess && (
        <>
          <p className={styles.form_success}>Сообщение успешно отправлено!</p>
          <p className={styles.form_success}>
            Пожалуйста ожидайте, мы свяжемся с вами в ближайшее время.
          </p>
        </>
      )}
      {error && (
        <>
          <p className={styles.form_error}>Произошла ошибка!</p>
          <p className={styles.form_error}>
            Пожалуйста попробуйте повторить отправку.
          </p>
        </>
      )}

      <Button
        size="max"
        type="submit"
        disabled={isDisabled}
        loading={isLoading}
        className={styles.form_btn}
      >
        Отправить
      </Button>
    </form>
  );
};

export { ContactForm };
