function checkNoRepeatData(value, array) {
  return array.some((dict) => dict.id === value);
}

export default checkNoRepeatData;
