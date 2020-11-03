import { MeetupAgendaItem } from './MeetupAgendaItem.js';

export const MeetupAgenda = {
  name: 'MeetupAgenda',

  template: `
    <div class="meetup-agenda">
      <meetup-agenda-item 
          v-for="item in agenda"
          :key="item.id"
          :agendaItem="item">        
      </meetup-agenda-item>
    </div>`,
  components: {
    MeetupAgendaItem,
  },
  props: {
    agenda: {
      type: Array,
      required: true,
    },
  },
};
