<template>
  <div class="login">
    <b-jumbotron
      header="Vue.js Chat"
      lead="Powered by Chatkit SDK and Bootstrap-Vue"
      bg-variant="info"
      text-variant="white"
      class="text-center"
    >
      <p>For more information visit website</p>
      <b-btn target="_blank" href="https://pusher.com/chatkit">More Info</b-btn>
    </b-jumbotron>
    <b-container>
      <b-row>
        <b-col lg="4" md="3"></b-col>
        <b-col lg="4" md="6">
          <LoginForm />
        </b-col>
        <b-col lg="4" md="3"></b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import LoginForm from '../components/LoginForm';
export default {
  name: 'login',
  components: {
    LoginForm,
  },
  props: {},
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {},
  created() {},
  mounted() {},
};
</script>
<style lang="less" scoped></style>
