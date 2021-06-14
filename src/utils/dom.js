
export const createElm = (tag) => {
  return document.createElement(tag);
}

export const createText = (text) => {
  return document.createTextNode(text);
}

export const queryElm = (selector) => {
  return document.querySelector(selector);
}