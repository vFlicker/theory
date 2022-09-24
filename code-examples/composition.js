const defaultActions = (name) => ({
  code: () => console.log(`${name} coding..`),
  search: () => console.log(`${name} searching..`),
});

const canCreateReactApp = (name) => ({
  createReactApp: () => console.log(`${name} creating react app..`),
});

const createProgramer = (props) => {
  const { name } = props;

  return {
    ...props,
    ...defaultActions(name),
  }
};

const createWebProgramer = (props) => {
  const { name } = props;
  const programer = createProgramer(props);

  return {
    ...programer,
    ...canCreateReactApp(name),
  }
};

const programer = createProgramer({
  name:'Nguyen Van A',
  age: 16,
  city: 'Kyiv'
});

const webProgramer = createWebProgramer({
  name:'Vlad',
  age: 24,
  city: 'Kryvyi Rih',
});

programer.code();
programer.search();

webProgramer.code();
webProgramer.search();
webProgramer.createReactApp();
