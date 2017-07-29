const dateFormater1 = date => {
  if (date instanceof Date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear() % 100}`
  } 
  return '';
}

const getSinceString = date => {
  const now = new Date();
  if (date instanceof Date) {
    if (now.getFullYear()!==date.getFullYear()) {
      return `${now.getFullYear()-date.getFullYear()}y`
    }
    if (now.getMonth()!==date.getMonth()) {
      return `${now.getMonth()-date.getMonth()}m`
    }
    return `${now.getDate()-date.getDate()}d`
  } 
  return '';
}

const getStringPart = (amount, base) => `0${base && amount % base || amount}`.slice(-2)

const getMMSS = ms => {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  
  return `${getStringPart(minutes)}:${getStringPart(seconds, 60)}`
}

export {
  getSinceString,
  getMMSS
}