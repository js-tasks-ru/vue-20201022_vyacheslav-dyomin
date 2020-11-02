import { MeetupView } from './MeetupView.js';
import { MEETUP_ID, fetchMeetup } from './data.js';

export const MeetupPage = {
  name: 'MeetupPage',

  template: `<div>
  <span v-if="isFetching">Fetching data....</span>
  <meetup-view v-if="meetup" :meetup="meetup"></meetup-view>
  </div>`,

  components: {
    MeetupView,
  },
  data() {
    return {
      isFetching: false,
      meetup: null,
    };
  },
  mounted() {
    this.fetchMeetupData();
  },
  methods: {
    async fetchMeetupData() {
      this.isFetching = true;

      try {
        this.meetup = await fetchMeetup(MEETUP_ID);
      } catch {
        console.log('Fetch meetup data is failed');
      } finally {
        this.isFetching = false;
      }
    },
  },
};
