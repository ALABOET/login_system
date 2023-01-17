<template>
  <div class="app-login-modal">
    <div class="app-login-modal__content content">
      <div class="content__inputs">
        <input type="text" placeholder="Email" v-model="inputEmail">
        <input type="password" placeholder="Пароль" v-model="inputPassword">
      </div>
      <button class="content__enter-button" @click="_onLogin">ВОЙТИ</button>
      <div class="content__forget-password">Забыли пароль?</div>
      <transition
        name="fade"
        mode="out-in"
      >
        <div v-if="errorText" class="content__warning-text">{{errorText}}</div>
      </transition>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['activeUser']),
  },

  data () {
    return {
      inputEmail: '',
      inputPassword: '',
      errorText: '',
    }
  },

  methods: {
    ...mapMutations(['addActiveUser']),
    _onLogin () {
      axios.get('src/assets/FrontendTest.json').then((response) => {
        if (JSON.parse(JSON.stringify(response.data.users)).some((elem) => elem.email === this.inputEmail && elem.password === this.inputPassword)) {
          this.$router.push('/admin');
          this.addActiveUser(JSON.parse(JSON.stringify(response.data.users)).find((elem) => elem.email === this.inputEmail))
          localStorage.setItem('name', this.activeUser.name);
          localStorage.setItem('email', this.activeUser.email);
        }
        else {
          this.errorText = 'Данные введены некорректно, попробуйте еще раз';
        }
      })
    }
  }
}
</script>

<style lang="scss">
.app-login-modal {
  position: relative;
  width: 443px;
  height: 316px;
  margin: 20px auto;
  background: #FFFFFF;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  @media screen and (max-width: 700px) {
    width: 90%;
  }
  .content {
    padding: 20px;
    &__inputs {
      display: flex;
      flex-direction: column;
      gap: 20px;
      margin-bottom: 20px;
      input {
        height: 62px;
        background: #FAFAFA;
        border: 1px solid #D9D9D9;
        padding-left: 22px;
        border-radius: 10px;
        font-size: 30px;
        &::placeholder {
          font-family: 'Inter';
          font-style: normal;
          font-weight: 700;
          font-size: 24px;
          line-height: 29px;
          color: #C1C0C0;
        }
      }
    }

    &__warning-text {
      color: red;
      position: absolute;
      left: 50%;
      width: 100%;
      font-size: 14px;
      line-height: 1;
      margin-top: 4px;
      text-align: center;
      transform: translate(-50%, -40%);
    }
    &__enter-button {
      width: 100%;
      background: #86CD89;
      border-radius: 10px;
      color: #FFFFFF;
      font-family: 'Inter';
      font-style: normal;
      font-weight: 700;
      font-size: 32px;
      line-height: 0;
      height: 64px;
      margin-bottom: 20px;
    }
    &__forget-password {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 500;
      font-size: 20px;
      line-height: 24px;
      color: #A2A3A7;
      width: 136px;
      margin: 0 auto;
      transition: all .5s ease;
      &:hover {
        cursor: pointer;
        color: black;
      }
    }
  }
}
</style>
