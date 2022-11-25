import '../pages/Auth.css';

const AuthInputs = (props) => {
  const { title, type, name, value, onChange, condition } = props;
  console.log('type', type);
  return (
    <>
      <label className='Auth-email' htmlFor={title}>
        {title.toUpperCase()}
      </label>
      <div className='Auth-authContainer'>
        <div className='Auth-authInputValid'>
          <input
            type={type ?? title}
            name={name ?? title}
            value={value}
            onChange={onChange}
            className={condition ? 'Auth-authInputs' : 'Auth-authInputsError'}
          />
          {!condition && <div className='Auth-authValid'>✓</div>}
        </div>
        <div className='Auth-authErrormsg'>{condition}</div>
      </div>
    </>
  );
};

export default AuthInputs;
