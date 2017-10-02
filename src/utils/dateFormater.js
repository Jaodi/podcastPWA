const day = 1000 * 60 * 60 * 24;
const month = day * 30;
const year = day * 365;

const dateFormater1 = date => {
  if (date instanceof Date) {
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear() % 100}`
  } 
  return '';
}

const getSinceString = date => {
  const now = new Date();
  const period = now - date;

  if (period > year) {
    return `${Math.floor(period/year)}y`    
  }
  if (period > month) {
    return `${Math.floor(period/month)}m`    
  }
  return `${Math.floor(period/day)}d`    
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