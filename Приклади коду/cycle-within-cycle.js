/**
 * O(n^2)
 */
const ineffectiveBanning = (shows) => {
  // починається обхід всіх шоу
  shows.forEach(show => {
    // береться ID кожного
    const { id: showID } = show;

    // запускається обхід заборонених шоу
    bannedShows.forEach(bannedShow => {
      // тепер беремо ID кожного заблокованих
      const { id: bannedShowID } = bannedShow;

      // порівнюємо ID і якщо збіг — помічаємо шоу як заблоковане
      if (showID === bannedShowID) {
        show.isBanned = true;
      	}
     });
  });
};

/**
 * O(n)
 */
const effectiveBanning = (shows) => {
  const bannedShowsIDs = new Set();


  // наповнили Set заблоковане ID
  bannedShows.forEach(({ id }) => bannedShowsIDs.add(id));

  shows.forEach(({ id }) => {
    // якщо ID поточного шоу є у сеті заблокованих — помічаємо його
    if (bannedShowsIDs.has(id)) show.isBanned = true;
  });
}

