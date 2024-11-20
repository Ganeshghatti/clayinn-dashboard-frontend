export const convertBookingsToEvents = (bookings) => {
  const events = [];

  if (!bookings) {
    console.error("Bookings data is undefined or null!");
    return events;
  }

  Object.keys(bookings).forEach((date) => {
    const booking = bookings[date];

    // Checking for Afternoon Event

    if (booking.afternoon) {
      const afternoonEvent = {
        title: booking.afternoon.status,
        start: `${date}T12:00:00`,
        end: `${date}T15:00:00`,
        backgroundColor: booking.afternoon.bg_color,
        extendedProps: { timeOfDay: "afternoon" },
      };
      events.push(afternoonEvent);
    }

    // Checking for Evening Event
    if (booking.evening) {
      const eveningEvent = {
        title: booking.evening.status,
        start: `${date}T18:00:00`,
        end: `${date}T21:00:00`,
        backgroundColor: booking.evening.bg_color,
        extendedProps: { timeOfDay: "evening" },
      };
      events.push(eveningEvent);
    }
  });

  return events;
};
