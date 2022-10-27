import '../pages/Auth.css';

const AuthInputs = (props) => {
  const { title, type, value, onChange, condition } = props;
  return (
    <>
      <label className='Auth-email' htmlFor={title}>
        {title.toUpperCase()}
      </label>
      <div className='Auth-authContainer'>
        <input
          type={type ?? title}
          name={title}
          value={value}
          onChange={onChange}
          className={condition ? 'Auth-authInputs' : 'Auth-authInputsError'}
        />
        {!condition && <div className='Auth-authValid'>✓</div>}
      </div>
    </>
  );
};

export default AuthInputs;
