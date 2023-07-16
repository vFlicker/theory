const data = {
  lots: [
    {
      test: [
        {
          test: "P",
          full_name: "P ОБРАЗОВАНИЕ",
        },
      ],
    },
    {
      okved: [
        {
          code: "P",
          full_name: "P ОБРАЗОВАНИЕ",
        },
      ],
    },
    {
      okved: [
        {
          code: "P",
          full_name: "P ОБРАЗОВАНИЕ",
        },
        {
          code: "X",
          full_name: "X ТЕСТ",
        },
      ],
      nomenclature: [
        {
          code: "Q",
          full_name: "Q УСЛУГИ В ОБЛАСТИ ОБРАЗОВАНИЯ"
        },
      ],
    },
    {
      okved: [
        {
          code: "P",
          full_name: "P ОБРАЗОВАНИЕ",
        },
        {
          code: "X",
          full_name: "X ТЕСТ",
        },
      ],
      nomenclature: [
        {
          code: "Q",
          full_name: "Q УСЛУГИ В ОБЛАСТИ ОБРАЗОВАНИЯ"
        },
      ],
    },
    {
      okved: [
        {
          code: "P",
          full_name: "P ОБРАЗОВАНИЕ",
        },
        {
          code: "X",
          full_name: "X ТЕСТ",
        },
      ],
      nomenclature: [
        {
          code: "Q",
          full_name: "Q УСЛУГИ В ОБЛАСТИ ОБРАЗОВАНИЯ"
        },
      ],
    },
  ]
};

const getCode = (object) => {
  const newData = [];

  (function func(object) {
    for (const key in object) {
      const value = object[key];
      if (value.hasOwnProperty('code')) {
        newData.push(value['code']);
      } else if (typeof value !== 'string'){
        func(value);
      }
    }
  })(object);

  return newData;
}

const getCode2 = (lots) => {
  const codes = [];

  for (const obj of lots) {
    for (const [key, value] of Object.entries(obj)) {
      if (key === 'okved' || key === 'nomenclature') {
        for (const item of value) {
          codes.push(item.code);
        }
      }
    }
  }

  return codes;
}

const getCode3 = (lots) => {
  const floatedData = lots.flatMap(({ okved, nomenclature }) => {
    return (okved || []).concat(nomenclature || [])
  });

  const codes = floatedData.map(({ code }) => code);
  return codes;
};

const codes = getCode(data.lots);
console.log(codes);

const codes2 = getCode2(data.lots);
console.log(codes2);

const codes3 = getCode3(data.lots);
console.log(codes3);
