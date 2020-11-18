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
          <div>{{ monthString }} {{ currentYear }}</div>
          <button 
              class="rangepicker__selector-control-right"
              @click="setNextMonthAndYear"
          ></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div 
            v-for="day in consolidatedData"
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
        return (
          new Date(item.date).getMonth() === this.currentDate.getMonth() &&
          new Date(item.date).getFullYear() === this.currentYear
        );
      });
    },
    monthString() {
      return this.currentDate.toLocaleString(navigator.language, {
        month: 'long',
      });
    },
    consolidatedData() {
      if (Number.isInteger(this.daysInMonth / 7)) {
        return [...this.currentMonthData];
      } else {
        return [
          ...this.prevMonthData,
          ...this.currentMonthData,
          ...this.nextMonthData,
        ].slice(0, this.maxDaysPerView);
      }
    },
    prevMonthData() {
      const arr = [...Array(this.daysInPreviousMonth + 1).keys()].slice(1);
      const startValue =
        this.dayWeekFirstDayMonth === 0 ? 6 : this.dayWeekFirstDayMonth - 1;
      const days = arr.slice(arr.length - startValue, arr.length);
      const result = [];
      days.forEach((el) => {
        result.push({ value: el, status: 'inactive' });
      });
      return result;
    },
    currentMonthData() {
      const arr = [...Array(this.daysInMonth + 1).keys()].slice(1);

      return arr.map((el) => {
        return {
          value: el,
          status: 'active',
        };
      });
    },
    nextMonthData() {
      const arr = [...Array(this.daysInNextMonth + 1).keys()].slice(1);
      const lastValue =
        this.maxDaysPerView -
        this.prevMonthData.length -
        this.currentMonthData.length;

      if (lastValue === 0) {
        return [];
      }

      return arr.slice(0, lastValue).map((el) => {
        return {
          value: el,
          status: 'inactive',
        };
      });
    },
    daysInPreviousMonth() {
      return new Date(
        this.currentYear,
        this.currentDate.getMonth(),
        0,
      ).getDate();
    },
    daysInNextMonth() {
      return new Date(
        this.currentYear,
        this.currentDate.getMonth() + 2,
        0,
      ).getDate();
    },
    daysInMonth() {
      return new Date(
        this.currentYear,
        this.currentDate.getMonth() + 1,
        0,
      ).getDate();
    },
    dayWeekFirstDayMonth() {
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
      const setedMonthDate = new Date(this.currentDate.setMonth(month));
      this.currentDate = new Date(setedMonthDate.setDate(1));
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
