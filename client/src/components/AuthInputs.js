import styles from '../pages/Auth.module.css';

const AuthInputs = (props) => {
  const { title, type, value, onChange } = props;

  return (
    <>
      <label className={styles.email} htmlFor={title}>
        {title.toUpperCase()}
      </label>
      <input
        type={type ?? title}
        name={title}
        value={value}
        onChange={onChange}
        className={styles.authInputs}
      />
    </>
  );
};

export default AuthInputs;
