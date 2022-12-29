const refineRecipeName = (recipeName) => {
  const splitName = recipeName?.split(' ');
  for (let i = 0; i < splitName?.length; i++) {
    splitName[i] = splitName[i][0]?.toUpperCase() + splitName[i].slice(1);
  }
  return splitName?.join(' ');
};

export default refineRecipeName;
