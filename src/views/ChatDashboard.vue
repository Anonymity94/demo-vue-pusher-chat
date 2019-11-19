<template>
  <div class="chart-dashbpard">
    <ChartNavBar />
    <b-container fluid class="ld-over content" v-bind:class="{ running: loading }">
      <div class="ld ld-ring ld-spin"></div>
      <b-row>
        <b-col cols="2">
          <RoomList />
        </b-col>

        <b-col cols="8">
          <b-row>
            <b-col id="chat-content">
              <MessageList />
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <MessageForm />
            </b-col>
          </b-row>
        </b-col>

        <b-col cols="2">
          <UserList />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ChartNavBar from '../components/ChatNavBar';
import RoomList from '@/components/RoomList';
import MessageList from '@/components/MessageList';
import MessageForm from '@/components/MessageForm';
import UserList from '@/components/UserList';

import { mapState } from 'vuex';

export default {
  name: 'ChatDashboard',
  components: {
    ChartNavBar,
    RoomList,
    MessageList,
    MessageForm,
    UserList,
  },
  computed: {
    ...mapState(['loading']),
  },
};
</script>
<style lang="less" scoped>
.content {
  margin-top: 10px;
}
</style>
