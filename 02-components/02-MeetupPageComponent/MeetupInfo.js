export const MeetupInfo = {
  template: `<ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="getMeetupDateOnlyString">{{ meetupFormattedLocalDate }}</time>
      </li>
    </ul>`,
  props: {
    organizer: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
    },
    date: {
      type: Number,
      required: true,
    },
  },
  computed: {
    getMeetupDateOnlyString() {
      const date = new Date(this.date)
      const YYYY = date.getFullYear();
      const MM = (date.getMonth() + 1).toString().padStart(2, '0');
      const DD = date.getDate().toString().padStart(2, '0');
      return `${YYYY}-${MM}-${DD}`;
    },
    meetupFormattedLocalDate() {
      return new Date(this.date).toLocaleString(navigator.language, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    },
  },
};
