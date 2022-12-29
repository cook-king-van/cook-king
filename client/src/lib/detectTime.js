const detectTime = (time) => {
  switch (time) {
    case time === 120:
      return '< 2 hrs';
    case time === 999:
      return '2 hrs >';
    default:
      return `< ${time} min`;
  }
};

export default detectTime;
