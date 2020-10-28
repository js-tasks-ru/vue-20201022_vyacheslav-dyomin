import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

async function fetchMeetupDataById(meetupId) {
  const response = await fetch(`${API_URL}/meetups/${meetupId}`);
  return await response.json();
}

function getDateOnlyString(date) {
  const YYYY = date.getFullYear();
  const MM = (date.getMonth() + 1).toString().padStart(2, '0');
  const DD = date.getDate().toString().padStart(2, '0');
  return `${YYYY}-${MM}-${DD}`;
}

export const app = new Vue({
  el: '#app',

  data: {
    meetup: null,
    isFetching: false,
  },

  mounted() {
    this.getMeetupDataById(MEETUP_ID);
  },

  computed: {
    meetupCover() {
      return this.meetup?.cover
        ? { '--bg-url': `url(${this.meetup.cover})` }
        : '';
    },
    meetupFormattedLocalDate() {
      return this.meetup?.date
        ? new Date(this.meetup.date).toLocaleString(navigator.language, {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })
        : '';
    },
    getMeetupDateOnlyString() {
      return this.meetup?.date
        ? getDateOnlyString(new Date(this.meetup.date))
        : '';
    },
  },

  methods: {
    async getMeetupDataById(meetupId) {
      this.isFetching = true;

      try {
        this.meetup = await fetchMeetupDataById(meetupId);
        this.receiveMeetupCoverLink();
      } catch {
        console.warn('Fetch meetup data failed');
      } finally {
        this.isFetching = false;
      }
    },
    receiveMeetupCoverLink() {
      try {
        const link = getMeetupCoverLink(this.meetup);
        this.meetup = {
          ...this.meetup,
          cover: link,
        };
      } catch {
        console.log('Meetup image is unavailable');
      }
    },
    getAgendaItemIconLink(type) {
      const itemIcon = agendaItemIcons[type];
      return `/assets/icons/icon-${itemIcon}.svg`;
    },
    getAgendaItemTitle(item) {
      return item.title || agendaItemTitles[item.type];
    },
  },
});
