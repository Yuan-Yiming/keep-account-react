export const tweenedNumber = (ctx, obj, key, newVal, duration = 100) => {
  let val = obj[key];
  let interval = newVal - val;
  let step = interval / (duration * 1000);
  let timer = setInterval(() => {
    val += step;
    console.log('val', val);
    ctx.$set(obj, key, val);
    if ((interval && val >= newVal) || (-interval && val <= newVal)) {
      ctx.$set(obj, key, newVal);
      clearInterval(timer)
    }
  }, 1)
}
