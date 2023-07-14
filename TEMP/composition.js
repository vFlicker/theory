// Methods
const defaultActions = (name) => ({
  code: () => console.log(`${name} coding..`),
  search: () => console.log(`${name} searching..`),
});

const canCreateReactApp = (name) => ({
  createReactApp: () => console.log(`${name} creating react app..`),
});

const canCreateNodeJSApp = (name) => ({
  createNodeJSApp: () => console.log(`${name} creating nodejs app..`),
});


// Creators
const createProgramer = (props) => {
  const { name } = props;

  return {
    ...props,
    ...defaultActions(name),
  }
};

const createFrontendProgramer = (props) => {
  const { name } = props;
  const programer = createProgramer(props);

  return {
    ...programer,
    ...canCreateReactApp(name),
  }
};

const createBackendProgramer = (props) => {
  const { name } = props;
  const programer = createProgramer(props);

  return {
    ...programer,
    ...canCreateNodeJSApp(name),
  }
};

const createFullstackProgramer = (props) => {
  const { name } = props;
  const programer = createProgramer(props);

  return {
    ...programer,
    ...canCreateReactApp(name),
    ...canCreateNodeJSApp(name),
  }
};


// Entities
const programer = createProgramer({
  name:'Nguyen Van A',
  age: 16,
  city: 'Kyiv'
});

const frontendProgramer = createFrontendProgramer({
  name:'Vlad Frontend',
  age: 24,
  city: 'Kryvyi Rih',
});

const backendProgramer = createBackendProgramer({
  name:'Vlad Backend',
  age: 24,
  city: 'Kryvyi Rih',
});

const fullstackProgramer = createFullstackProgramer({
  name:'Vlad Fullstack',
  age: 24,
  city: 'Kryvyi Rih',
});


// Instances
programer.code();
programer.search();

frontendProgramer.code();
frontendProgramer.search();
frontendProgramer.createReactApp();

backendProgramer.code();
backendProgramer.search();
backendProgramer.createNodeJSApp();

fullstackProgramer.code();
fullstackProgramer.search();
fullstackProgramer.createReactApp();
fullstackProgramer.createNodeJSApp();
