const timeAgo = (d) => {
  let time = new Date(d);
  time = (Date.now() - time.getTime()) / 1000 / 60;

  if (time < 60) {
    if (time < 1) {
      return 'just now';
    }
    time = Math.round(time);
    return `${time > 1 ? `${time} minutes` : `${time} minute`} ago`;
  }

  if (time > 60 && time < 60 * 24) {
    time = Math.round(time / 60);
    return `${time > 1 ? `${time} hours` : `${time} hour`} ago`;
  }

  if (time > 60 * 24 && time < 60 * 24 * 7) {
    time = Math.round(time / 60 / 24);
    return `${time > 1 ? `${time} days` : `${time} day`} ago`;
  }

  if (time > 60 * 24 * 7 && time < 60 * 24 * 7 * 4) {
    time = Math.round(time / 60 / 24 / 7);
    return `${time > 1 ? `${time} weeks` : `${time} week`} ago`;
  }

  if (time > 60 * 24 * 7 * 4 && time < 60 * 24 * 7 * 4 * 12) {
    time = Math.round(time / 60 / 24 / 7 / 4);
    return `${time > 1 ? `${time} months` : `${time} month`} ago`;
  }

  if (time > 60 * 24 * 7 * 4 * 12) {
    time = Math.round(time / 60 / 24 / 7 / 4 / 12);
    return `${time > 1 ? `${time} years` : `${time} year`} ago`;
  }
};

export default timeAgo;
