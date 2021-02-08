<template>
  <div class="container">
    <div class="row">
        <div class="col-md-7 mrgnbtm">
        <h2>Create User</h2>
            <form>
                <div class="row">
                    <div class="form-group col-md-6">
                        <label htmlFor="firstname">First Name</label>
                        <input type="text" class="form-control" v-model="firstName" name="firstname" id="firstname" aria-describedby="emailHelp" placeholder="First Name" />
                    </div>
                    <div class="form-group col-md-6">
                        <label htmlFor="lastname">Last Name</label>
                        <input type="text" class="form-control" v-model="lastName" name="lastname" id="lastname" placeholder="Last Name" />
                    </div>
                    <div class="form-group col-md-6">
                        <label htmlFor="userName">User Name</label>
                        <input type="text" class="form-control" v-model="username" name="userName" id="username" placeholder="User Name" />
                    </div>
                    <div class="form-group col-md-6">
                        <label htmlFor="mobilePhone">User Name</label>
                        <input type="number" class="form-control" v-model="mobilePhone" name="mobilePhone" id="mobilePhone" placeholder="Mobile Phone" />
                    </div>
                </div>
                <div class="row">
                    <div class="form-group col-md-12">
                        <label htmlFor="InputEmail1">Email</label>
                        <input type="text" class="form-control" v-model="email" name="email" id="email" aria-describedby="emailHelp" placeholder="Email" />
                    </div>
                </div><div class="row">
                    <div class="form-group col-md-12">
                        <label htmlFor="InputPassword1">Password</label>
                        <input type="password" class="form-control" v-model="passwd" name="email" id="passwd" aria-describedby="emailHelp" placeholder="Password" />
                    </div>
                </div>
                <button type="button" @click='createUser()' class="btn btn-danger">Create</button>
            </form>
        </div>
    </div>
    </div>
</template>

<script>
export default {
  name: 'CreateUser',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      passwd: '',
      username: '',
      mobilePhone: ''
    }
  },
  methods: {
      createUser() {
          const payload = {
              firstName: this.firstName,
              lastName: this.lastName,
              email: this.email,
              passWd: this.passwd,
              userName: this.username,
              mobilePhone: this.mobilePhone
          }
          this.$emit('createUser', payload)
          this.clearForm()
      },
      clearForm() {
          this.firstName = ""
          this.lastName = ""
          this.email = ""
          this.passwd = ""
          this.username = ""
          this.mobilePhone = ""
      }
  }
}
</script>