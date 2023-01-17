<template>
  <div class="app-login-admin">
    <div class="app-login-admin__header header">
      <div class="header__content">
        <div class="header__info info">
          <img src="src/assets/pics/profile-icon.svg" />
          <div class="info__text text">
            <div class="text__name">{{userName}}</div>
            <div class="text__email">{{userMail}}</div>
          </div>
        </div>
        <div class="header__exit exit">
          <button class="exit__button" @click="_logOut">Выход</button>
        </div>
      </div>
    </div>
    <div class="app-login-admin__content content">
      <div class="content__header content-header">
        <div class="content-header__text">Заказы</div>
        <div class="content-header__sort">{{sortingText}} <img src="src/assets/pics/sort-icon.svg" style="position:absolute; right: 11px; top: 15px " /></div>
      </div>
      <div class="content__table-header table-header">
        <div class="table-header__item id" @click="sortById">Номер заказа</div>
        <div class="table-header__item email" @click="sortByEmail">Email</div>
        <div class="table-header__item amount" @click="sortByAmount">Сумма</div>
        <div class="table-header__item date" @click="sortByDate">Дата</div>
      </div>
      <div class="content__table" v-for="order in receivedOrdersData" :key="order.id">
        <OrderComponent
          :id="order.id"
          :email="order.email"
          :amount="order.amount"
          :date="order.date"
        />
      </div>
      <button class="content__load-data-button" @click="loadData">Показать еще...</button>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import OrderComponent from './OrderComponent.vue';
import axios from 'axios';
export default {
  components: { OrderComponent },

  computed: {
    ...mapState(['activeUser', 'receivedOrdersData']),
    userName () {
      return this.activeUser.name ?? localStorage.getItem('name');
    },
    userMail () {
      return this.activeUser.email ?? localStorage.getItem('email');
    },
  },

  data() {
    return {
      sortingText: 'По номеру заказа',
      sortIdAsc: true,
      sortEmailAsc: true,
      sortAmountAsc: true,
      sortDateAsc: true,
    }
  },

  methods: {
    ...mapMutations(['changeOrdersData']),
    sortById() {
      this.changeOrdersData(this.receivedOrdersData.sort((a, b) => {
        return this.sortIdAsc ? b.id - a.id : a.id - b.id
      }));
      this.sortIdAsc = !this.sortIdAsc;
      this.sortingText = 'По номеру заказа';
    },
    sortByEmail() {
      this.changeOrdersData(this.receivedOrdersData.sort((a, b) => {
        return this.sortEmailAsc ? b.email.localeCompare(a.email) : a.email.localeCompare(b.email);
      }));
      this.sortEmailAsc = !this.sortEmailAsc;
      this.sortingText = 'По почте';
    },
    sortByAmount() {
      this.changeOrdersData(this.receivedOrdersData.sort((a, b) => this.sortAmountAsc ? b.amount - a.amount : a.amount - b.amount));
      this.sortAmountAsc = !this.sortAmountAsc;
      this.sortingText = 'По сумме';
    },
    sortByDate() {
      this.changeOrdersData(this.receivedOrdersData.sort((a, b) => {
        return this.sortDateAsc ? b.date.localeCompare(a.date) : a.date.localeCompare(b.date);
      }));
      this.sortDateAsc = !this.sortDateAsc;
      this.sortingText = 'По дате';
    },
    loadData() {
      axios.get('src/assets/FrontendTest.json').then((response) => {
        this.changeOrdersData(JSON.parse(JSON.stringify(response.data.orders.filter((order) => order.id < this.receivedOrdersData.length + this.receivedOrdersData.length + 1))))
      })
    },
    _logOut() {
      this.$router.push('/login');
      localStorage.clear();
    }
  },

  mounted() {
    axios.get('src/assets/FrontendTest.json').then((response) => {
      this.changeOrdersData(JSON.parse(JSON.stringify(response.data.orders.filter((order) => order.id < 6))))
    })
  }
}
</script>

<style lang="scss">
.app-login-admin {
  width: 800px;
  margin: 20px auto;
  @media screen and (max-width: 1000px) {
    width: 90%;
  }
  &__header {
    height: 56px;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
  }
  .header {
    padding: 0 22px 0 13px ;
    margin-bottom: 11px;
    &__content {
      display: flex;
      justify-content: space-between;
      height: inherit;
      align-items: center;
    }
    &__info {
      display: flex;
      flex-direction: row;
      line-height: 14px;
      .info__text {
        display: flex;
        flex-direction: column;
      }
      .text {
        font-family: 'Inter', serif;
        font-style: normal;
        margin-left: 15px;
        &__name {
          font-weight: 700;
          font-size: 16px;
          line-height: 19px;
          color: #000000;
        }
        &__email {
          font-weight: 500;
          font-size: 12px;
          line-height: 15px;
          color: #9D9D9D;
        }
      }
    }
    &__exit {
       .exit__button {
         font-family: 'Inter', serif;
         font-style: normal;
         font-weight: 700;
         font-size: 12px;
         color: #595959;
         width: 65px;
         height: 25px;
         background: #F7F5F5;
         border-radius: 10px;
         line-height: 0;
         padding: 0;
       }
    }
  }
  .content {
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    height: 437px;
    padding: 27px 20px 0 20px;
    overflow: auto;
    text-align: center;
    &__header {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      @media screen and (max-width: 540px) {
        justify-content: center;
      }
      .content-header__text {
        font-family: 'Inter';
        font-style: normal;
        font-weight: 700;
        font-size: 32px;
        text-align: center;
        color: #000000;
      }
    }
    .content-header__sort {
      position: relative;
      width: 224px;
      height: 32px;
      background: #F7F5F5;
      border: 1px solid #ECEAEA;
      border-radius: 10px;
      line-height: 2;
      color: #595959;
      @media screen and (max-width: 725px) {
        display: none;
      }
    }
    &__table-header {
      display: flex;
      height: 37px;
      background: #F7F5F5;
      border: 1px solid #EBEBEB;
      border-radius: 10px;
      align-items: center;
      transition: all .5s ease;
    }
    .table-header {
      &__item {
        text-align: start;
        flex: 1;
        margin-left: 11px;
        font-weight: 700;
        font-size: 14px;
        line-height: 17px;
        transition: all .5s ease;
        color: #000000;
        &:hover {
          cursor: pointer;
          color: #86CD89;
        }
      }
      .id {
        max-width: 105px;
      }

    }
    &__table {
      display: flex;
      margin-top: 10px;
      flex-direction: column;
      gap: 10px;
    }
    &__load-data-button {
      margin-top: 20px;
      width: 254px;
      height: 42px;
      background: #F7F5F5;
      border: 1px solid #ECEAEA;
      border-radius: 10px;
      transition: all .5s ease;
      color: #595959;
    }
  }
}
</style>
