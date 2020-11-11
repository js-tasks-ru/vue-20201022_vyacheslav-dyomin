/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button 
              class="rangepicker__selector-control-left"
              @click="setPrevMonthAndYear"
          ></button>
          <div>{{ getMonthString }} {{ currentYear }}</div>
          <button 
              class="rangepicker__selector-control-right"
              @click="setNextMonthAndYear"
          ></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div 
            v-for="day in getConsolidatedData"
            :class="['rangepicker__cell', {'rangepicker__cell_inactive': day.status === 'inactive'}]">
            {{ day.value }}
            <a
                v-for="meetup in meetupsForCurrentMonth.filter((el) => new Date(el.date).getDate() === day.value && day.status === 'active')"
                :key="meetup.id"
                class="rangepicker__event">
                {{ meetup.title }}
            </a>
        </div>
      </div>
    </div>
  </div>`,
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentDate: new Date(),
      currentYear: new Date().getFullYear(),
      maxDaysPerView: 35,
    };
  },
  computed: {
    meetupsForCurrentMonth() {
      return this.meetups.filter((item) => {
        return new Date(item.date).getMonth() === this.currentDate.getMonth()
            && new Date(item.date).getFullYear() === this.currentYear;
      });
    },
    getMonthString() {
      return this.currentDate.toLocaleString(navigator.language, {
        month: 'long',
      });
    },
    getConsolidatedData() {
      if (Number.isInteger(this.getDaysInMonth / 7)) {
        return [...this.getCurrentMonthData];
      } else {
        return [
          ...this.getPrevMonthData,
          ...this.getCurrentMonthData,
          ...this.getNextMonthData,
        ].slice(0, this.maxDaysPerView);
      }
    },
    getPrevMonthData() {
      const arr = [...Array(this.getDaysInPreviousMonth + 1).keys()].slice(1);
      const startValue =
        this.getDayWeekFirstDayMonth === 0
          ? 6
          : this.getDayWeekFirstDayMonth - 1;
      const days = arr.slice(arr.length - startValue, arr.length);
      const result = [];
      days.forEach((el) => {
        result.push({ value: el, status: 'inactive' });
      });
      return result;
    },
    getCurrentMonthData() {
      const arr = [...Array(this.getDaysInMonth + 1).keys()].slice(1);
      const result = [];
      arr.forEach((el) => {
        result.push({ value: el, status: 'active' });
      });
      return result;
    },
    getNextMonthData() {
      const arr = [...Array(this.getDaysInNextMonth + 1).keys()].slice(1);
      const lastValue =
        this.maxDaysPerView -
        this.getPrevMonthData.length -
        this.getCurrentMonthData.length;
      if (lastValue === 0) {
        return [];
      }
      const days = arr.slice(0, lastValue);
      const result = [];
      days.forEach((el) => {
        result.push({ value: el, status: 'inactive' });
      });
      return result;
    },
    getDaysInPreviousMonth() {
      return new Date(
        this.currentYear,
        this.currentDate.getMonth(),
        0,
      ).getDate();
    },
    getDaysInNextMonth() {
      return new Date(
        this.currentYear,
        this.currentDate.getMonth() + 2,
        0,
      ).getDate();
    },
    getDaysInMonth() {
      return new Date(
        this.currentYear,
        this.currentDate.getMonth() + 1,
        0,
      ).getDate();
    },
    getDayWeekFirstDayMonth() {
      return new Date(
        `${this.currentDate.getMonth() + 1} 
        1, 
        ${this.currentYear}`,
      ).getDay();
    },
  },
  methods: {
    setPrevMonthAndYear() {
      const month = this.currentDate.getMonth() - 1;
      this.setMonth(month);

      if (month === -1) this.setFullYear(this.currentYear - 1);
    },
    setNextMonthAndYear() {
      const month = this.currentDate.getMonth() + 1;
      this.setMonth(month);

      if (month === 12) this.setFullYear(this.currentYear + 1);
    },
    setMonth(month) {
      this.currentDate = new Date(this.currentDate.setMonth(month));
    },
    setFullYear(year) {
      const event = new Date(this.currentDate);
      event.setFullYear(year);
      this.currentYear = event.getFullYear();
    },
  },

  // Пропсы

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации

  // Методы понадобятся для переключения между месяцами
};
