<template>
  <div class="toasts">
    <div
      v-for="(item, index) in toasts"
      :key="index"
      :class="[
        'toast',
        item.type === 'error' ? 'toast_error' : 'toast_success',
      ]"
    >
      <app-icon
        :icon="item.type === 'error' ? 'alert-circle' : 'check-circle'"
      />
      <span>{{ item.message }}</span>
    </div>
  </div>
</template>

<script>
import AppIcon from './AppIcon';

const DELAY = 5000;

export default {
  name: 'AppToast',

  components: { AppIcon },

  data() {
    return {
      toasts: [],
    };
  },

  methods: {
    error(message) {
      this.toasts.push({ type: 'error', message, id: new Date().getTime() });
      this.removeToastsItem();
    },

    success(message) {
      this.toasts.push({ type: 'success', message, id: new Date().getTime() });
      this.removeToastsItem();
    },

    removeToastsItem() {
      setTimeout(() => {
        this.toasts.shift();
      }, DELAY);
    },
  },
};
</script>

<style scoped>
.toasts {
  position: fixed;
  bottom: 8px;
  right: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  white-space: pre-wrap;
  z-index: 999;
}

.toast {
  display: flex;
  flex: 0 0 auto;
  flex-direction: row;
  align-items: center;
  padding: 16px;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
  border-radius: 4px;
  font-size: 18px;
  line-height: 28px;
  width: auto;
}

.toast + .toast {
  margin-top: 20px;
}

.toast > .icon {
  margin-right: 12px;
}

.toast.toast_success {
  color: var(--green);
}

.toast.toast_error {
  color: var(--red);
}

@media all and (min-width: 992px) {
  .toasts {
    bottom: 72px;
    right: 112px;
  }
}
</style>
