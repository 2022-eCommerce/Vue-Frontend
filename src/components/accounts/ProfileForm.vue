<template>
  <div class="container">
    <div class="layout-login">
      <div class="card">
        <div class="card-header">PROFILE</div>
        <p></p>

        <form @submit.prevent="getProfile" class="form">
          <label for="email">EMAIL</label>
          <div class="card-text">
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              disabled
            />
          </div>

          <label for="name">NAME</label>
          <div class="card-text">
            <input
              id="name"
              type="text"
              v-model="name"
              class="form-control"
              disabled
            />
          </div>

          <div class="card-text">
            <br />ADDRESS
            <p></p>

            <label for="address.city">CITY</label>
            <input
              id="address.city"
              type="text"
              v-model="address.city"
              class="form-control"
              disabled
            />

            <label for="address.street">STREET</label>
            <input
              id="address.street"
              type="text"
              v-model="address.street"
              class="form-control"
              disabled
            />

            <label for="address.zipCode">ZIPCODE</label>
            <input
              id="address.zipCode"
              type="number"
              v-model="address.zipCode"
              class="form-control"
              disabled
            />
          </div>

          <router-link
            to="/modify"
            type="submit"
            class="btn btn-primary"
            style="float: right"
            >GO TO PROFILE CHANGE</router-link
          >
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { profile } from '@/api/accounts';

export default {
  data() {
    return {
      accountRole: 'USER',
      email: '',
      name: '',
      address: {
        defaultAddress: true,
        city: '',
        street: '',
        zipCode: '',
      },
    };
  },
  methods: {
    // return
    async getProfile() {
      try {
        const { data } = await profile();
        this.accountRole = data.data.accountRole;
        this.email = data.data.email;
        this.name = data.data.name;
        this.address.city = data.data.address.city;
        this.address.street = data.data.address.street;
        this.address.zipCode = data.data.address.zipCode;

        this.$store.commit('setName', this.name);
        this.$store.commit('setCity', this.address.city);
        this.$store.commit('setStreet', this.address.street);
        this.$store.commit('setZipCode', this.address.zipCode);
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getProfile();
  },
};
</script>

<style scoped>
.card {
  margin: auto;
  max-width: 500px;
  padding: 10px;
}
input {
  width: 100%;
  padding: 8px;
}
.card-title {
  margin: 8px;
}
.btn {
  margin-top: 10px;
}
.card-header {
  text-align: center;
  font-size: 18px;
  font-weight: 600;
}
.layout-login {
  margin: auto;
  margin-top: 125px;
}
.link a,
.link {
  text-align: center;
  text-decoration: none;
}
.card:hover {
  transform: translate(0, 0);
}
</style>
