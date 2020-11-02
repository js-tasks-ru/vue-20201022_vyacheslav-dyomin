export const MeetupCover = {
  template: `<div class="meetup-cover" :style="imageUrl">
        <h1 class="meetup-cover__title">{{ title }}</h1>
    </div>`,
  props: {
    link: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
  },
  computed: {
    imageUrl() {
      return {
        '--bg-url': `url(${this.link})`,
      };
    },
  },
};
