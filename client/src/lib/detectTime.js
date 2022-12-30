const detectTime = (time) => {
  if (!time) {
    return '';
  }
  if (time === 120) {
    return '< 2 hrs';
  } else if (time === 999) {
    return '2 hrs >';
  } else {
    return `< ${time} min`;
  }
};

export default detectTime;
