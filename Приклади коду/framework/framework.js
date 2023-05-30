const controllers = {};

const addController = (name, constructor) => {
  // Store controller constructor
  controllers[name] = {
    factory: constructor,
    instances: [],
  };

  // Look for elements using the controller
  const controllerElement = document.querySelector(`[ng-controller=${name}]`);
  if (!controllerElement) return;

  const controller = new controllers[name].factory();
  controllers[name].instances.push(controller);

  // Get elements bound to properties
  const bindings = {};

  const childElements = controllerElement.querySelectorAll('[ng-bind]');
  childElements.forEach((childElement) => {
    const boundedValue = childElement.getAttribute('ng-bind');

    if (!bindings[boundedValue]) {
      bindings[boundedValue] = {
        boundedValue,
        elements: [],
      };
    }

    bindings[boundedValue].elements.push(childElement);
  });

  // Update DOM element bound when controller property is set
  const proxy = new Proxy(controller, {
    set: (target, prop, value) => {
      const bind = bindings[prop];

      if (bind) {
        bind.elements.forEach((element) => {
          element.value = value;
          element.setAttribute('value', value);
        })
      }

      return Reflect.set(target, prop, value);
    },
  })

  // Listen DOM element update to set the controller property
  Object.keys(bindings).forEach((boundedValue) => {
    const bind = bindings[boundedValue];

    bind.elements.forEach((element) => {
      element.addEventListener('input', (evt) => {
        proxy[bind.boundedValue] = evt.target.value;
      });
    })
  })

  // Fill proxy with controller properties
  // and return proxy, not the controller
  Object.assign(proxy, controller);
  return proxy;
};

export const framework = {
  controller: addController
}