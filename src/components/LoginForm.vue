<template>
  <div class="login-form">
    <h5 class="text-center">Chat Login</h5>
    <hr />
    <b-form @submit.prevent="onSubmit">
      <b-alert variant="danger" :show="hasError">{{ error }} </b-alert>

      <b-form-group id="userInputGroup" label="User Name" label-for="userInput">
        <b-form-input
          id="userInput"
          type="text"
          placeholder="Enter user name"
          v-model="userId"
          autocomplete="off"
          :disabled="loading"
          required
        >
        </b-form-input>
      </b-form-group>

      <b-button
        type="submit"
        variant="primary"
        class="ld-ext-right"
        v-bind:class="{ running: loading }"
        :disabled="isValid"
      >
        Login
        <div class="ld ld-ring ld-spin"></div>
      </b-button>
    </b-form>

    <!-- 提示 -->
    <div class="footer">
      <p>You can use the following users:</p>
      <b-badge v-for="user in users" :key="user" variant="info" @click="quickLogin(user)">{{
        user
      }}</b-badge>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex';

export default {
  name: 'login-form',
  data() {
    return {
      userId: '',
      users: ['张三', '李四', 'john'],
    };
  },
  computed: {
    isValid: function() {
      const result = this.userId.length < 2;
      return result ? result : this.loading;
    },
    ...mapState(['loading', 'error']),
    ...mapGetters(['hasError']),
  },
  methods: {
    ...mapActions(['login']),
    async onSubmit() {
      const result = await this.login(this.userId);
      if (result) {
        this.$router.push('chat');
      }
    },
    quickLogin(userId) {
      this.userId = userId;
    },
  },
};
</script>
<style lang="less" scoped>
.login-form {
  margin-top: 50px;
  border: 1px solid rgb(101, 219, 255);
  border-radius: 4px;
  padding: 25px;
  -webkit-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
  box-shadow: 1px 1px 5px 0px rgba(0, 0, 0, 0.75);
}

.footer {
  margin-top: 20px;

  p {
    margin-bottom: 8px;
  }

  .badge {
    cursor: pointer;
    margin-right: 10px;
  }
}
</style>
