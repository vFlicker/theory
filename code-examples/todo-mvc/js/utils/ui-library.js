const createAttribute = (name) => {
  switch (name) {
    case 'className':
      return 'class';
    case 'htmlFor':
      return 'for';
    default:
      return name;
  }
};

const renderChildren = (element, children) => {
  for (const child of children) {
    const isText = typeof child === 'string';
    const childNode = isText ? document.createTextNode(child) : child;
    element.appendChild(childNode);
  }
};

/**
 * Function for creating an element
 *
 * @param {string} type a string that specifies the type of element to be created
 * @param {Object} props an object that has strings specifying the name of the attribute whose value is to be set and their value
 * @param {(string | HTMLElement)[]} children HTMLElements or string
 * @returns {HTMLElement} created element
 */
export const createElement = (type, props, ...children) => {
  const element = document.createElement(type);

  Object.entries(props).forEach(([key, value]) => {
    const attribute = createAttribute(key);
    element.setAttribute(attribute, value);
  });

  renderChildren(element, children);

  return element;
};
