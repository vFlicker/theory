const prioritize1 = (appointments) => {
  const schedule = [];

  // Збережемо тут час початку пізнішої зустрічі,
  // щоб зупинити алгоритм, коли вже перейдемо цей час
  const latestAppointment = appointments.reduce((latest, current) => {
    return latest.end < current.end ? current : latest;
  }, appointments[0]);

  // Зберігатимемо тут час закінчення попередньої зустрічі
  let startAfter = 0;

  // поки ми ще можемо впхнути зустріч у кінець
  while (startAfter < latestAppointment.end) {
    // Знайдемо всі зустрічі після останньої
    const nextAppointments = appointments.filter(({ start }) => {
      return start >= startAfter;
    });

    // Знайдемо зустріч, яка закінчується максимально рано після останньої
    const appointment = nextAppointments.reduce((latest, current) => {
      return latest.end > current.end ? current : latest;
    }, nextAppointments[0]);

    startAfter = appointment.end;

    schedule.push(appointment);
  }

  return schedule;
};

const prioritize2 = (appointments) => {
  const schedule = [];

  while (true) {
    let latestAppointment = null;

    for (const currentAppointment of appointments) {
      // Перевіряємо, чи список зустрічей порожній
      // або поточна зустріч починається після закінчення
      // останньої зустрічі у розкладі
      if (schedule.length === 0 || currentAppointment.start >= schedule[schedule.length - 1].end) {
        if (latestAppointment === null) {
          latestAppointment = currentAppointment;
          continue;
        }

        // Порівнюємо час закінчення поточної зустрічі
        // з найраніше закінченою зустріччю, що ми знаходимо
        if (currentAppointment.end < latestAppointment.end) {
          latestAppointment = currentAppointment;
        }
      }
    }

    // Якщо не знайдено нової зустрічі,
    // яка може бути додана до розкладу, виходимо з циклу
    if (latestAppointment === null) break;

    // Додаємо зустріч у розклад
    schedule.push(latestAppointment);
  }

  return schedule;
};

const prioritize3 = (appointments) => {
  // Створюємо копію масиву appointments для маніпуляцій
  const sortedAppointments = [...appointments];

  // Сортуємо зустрічі за часом закінчення у порядку зростання
  sortedAppointments.sort((a, b) => a.end - b.end);

  const schedule = [sortedAppointments[0]]; // Додаємо першу зустріч в розклад

  for (let i = 1; i < sortedAppointments.length; i++) {
    const currentAppointment = sortedAppointments[i];

    // Перевіряємо, чи зустріч може бути додана до розкладу
    if (currentAppointment.start >= schedule[schedule.length - 1].end) {
      schedule.push(currentAppointment);
    }
  }

  return schedule;
};

const appointments = [
  {
    title: "Title 1",
    start: 10,
    end: 13,
  },
  {
    title: "Title 2",
    start: 12,
    end: 13,
  },
  {
    title: "Title 3",
    start: 9,
    end: 11,
  },
  {
    title: "Title 4",
    start: 14,
    end: 16,
  },
  {
    title: "Title 5",
    start: 13,
    end: 15,
  },
  {
    title: "Title 6",
    start: 15,
    end: 17,
  },
  {
    title: "Title 7",
    start: 10,
    end: 11,
  },
];
console.log(prioritize1(appointments));
console.log(prioritize2(appointments));
console.log(prioritize3(appointments));
