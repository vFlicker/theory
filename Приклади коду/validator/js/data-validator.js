const RegExps = {
  email: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
  url: /^((https?):\/\/(\w+:{0,1}\w*@)?(\S+)|)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
  numbers: /^\d+(\.\d{1,2})?$/,
  digits: /[0-9]*$/,
  letters: /[a-z][A-Z]*$/
};

export class DataValidator {
  constructor(customMethods = {}) {
    for (const [method, action] of Object.entries(customMethods)) {
      this[method] = action;
    }
  }

  required({ data }) { return data.length > 0; };
  
  min({ data, param }) { return data.length >= param; };
  
  max({ data, param }) { return data.length <= param; };
  
  match({ data, param }) { return RegExps[param].test(data); };

  init(rawData, rules) {
    const data = rawData.trim();

    const results = {
      data,
      passed: [],
      failed: [],
    }

    for (const [rule, param] of Object.entries(rules)) {
      const result = this[rule]({ data, param });
      const config = { rule, param };

      if (!result) {
        results.failed.push(config);
      } else {
        results.passed.push(config);
      }
    }
 
    results.valid = results.failed.length === 0;
    return results;
  };
}
