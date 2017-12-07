<template>
  <div class="container" style="margin-top: 100px;">
    <div class="row">
      <div class="col-md-4 col-md-offset-4">
        <div class="form-body">
          <ul class="nav nav-tabs final-login">
            <li class="active"><a data-toggle="tab" href="#sectionA">Sign In</a></li>
            <li><a data-toggle="tab" href="#sectionB">Join us!</a></li>
          </ul>
          <div class="tab-content">
            <div id="sectionA" class="tab-pane fade in active">
              <div class="innter-form">
                <div class="sa-innate-form">
                  <label>Email Address</label>
                  <input type="text" v-model="dataLogin.email">
                  <label>Password</label>
                  <input type="password" v-model="dataLogin.password">
                  <button @click="loginUser">Sign In</button>
                </div>
              </div>
              <div class="social-login">
                <p>- - - - - - - - - - - - - Sign In With - - - - - - - - - - - - - </p>
    		        <ul>
                  <li>-</li>
                  <li><a href="#" @click="loginFB"><i class="fa fa-facebook"></i> Facebook</a></li>
                  <li>-</li>
                </ul>
              </div>
              <div class="clearfix"></div>
            </div>
            <div id="sectionB" class="tab-pane fade">
			        <div class="innter-form">
                <div class="sa-innate-form" method="post">
                  <label>Name</label>
                  <input type="text" v-model="dataRegister.name">
                  <label>Email Address</label>
                  <input type="text" v-model="dataRegister.email">
                  <label>Password</label>
                  <input type="password" v-model="dataRegister.password">
                  <button @click="registerUser">Join now</button>
                  <p>By clicking Join now, you agree to hifriends's User Agreement, Privacy Policy, and Cookie Policy.</p>
                </div>
              </div>
              <div class="social-login">
                <p>- - - - - - - - - - - - - Register With - - - - - - - - - - - - - </p>
			          <ul>
                  <li>-</li>
                  <li><a href="#" @click="loginFB"><i class="fa fa-facebook"></i> Facebook</a></li>
                  <li>-</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  name: 'HelloWorld',
  data () {
    return {
      dataRegister: {
        name: '',
        email: '',
        password: ''
      },
      dataLogin: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    registerUser () {
      this.$http.post('/users/register', {
        name: this.dataRegister.name,
        email: this.dataRegister.email,
        password: this.dataRegister.password
      })
      .then(newUserData => {
        alert('Registration Successful')
        this.dataRegister.name = ''
        this.dataRegister.email = ''
        this.dataRegister.password = ''
      })
      .catch(err => alert(err))
    },
    loginUser () {
      if (this.dataLogin.email === '' || this.dataLogin.password === '') {
        alert('Please fill all input')
      } else {
        this.$http.post('/api/users/loginuser', {
          email: this.dataLogin.email,
          password: this.dataLogin.password
        })
        .then(({data}) => { 
          if (data === 'invalid') {
            alert('Invalid Username or Password')
          } else {
            localStorage.setItem('tokenOverflow', data)
            this.$router.push({name: 'Index'})
          }
        })
        .catch(err => console.error(err))
      }
    },
    loginFB () {
      FB.login((response) => {
        if (response.authResponse) {
          localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
          this.$http.post('/api/users/loginfb', {
            userID: response.authResponse.userID
          }, {
            headers: {
              accesstoken: response.authResponse.accessToken
            }
          })
          .then(({data}) => {
            localStorage.setItem('tokenOverflow', data)
            this.$router.push({name: 'Index'})
          })
          .catch(err => console.error(err))
        } else {
          console.log('User cancelled login or did not fully authorize.')
        }
      }, {scope: 'public_profile,email,publish_actions,user_posts'})
    }
  },
  mounted () {
    // init fbjssdk
    window.fbAsyncInit = function () {
      FB.init({
        appId      : '352796951848044',
        cookie     : true,  // enable cookies to allow the server to access 
                        // the session
        xfbml      : true,  // parse social plugins on this page
        version    : 'v2.8' // use graph api version 2.8
      })
    }

    // This is called with the results from from FB.getLoginStatus().
    function statusChangeCallback (response) {
      if (response.status === 'connected') {
        localStorage.setItem('fbaccesstoken', response.authResponse.accessToken)
      }
    }
    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0]
      if (d.getElementById(id)) return
      js = d.createElement(s); js.id = id
      js.src = '//connect.facebook.net/en_US/sdk.js'
      fjs.parentNode.insertBefore(js, fjs)
    }(document, 'script', 'facebook-jssdk'))
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* form */
body{
    background:#efefef
}

.form-body{
    background:#fff;
    padding:20px;
}
.login-form{
    background:rgba(255,255,255,0.8);
	padding:20px;
	border-top:3px solid#3e4043;
}
.innter-form{
	padding-top:20px;
}
.final-login li{
	width:50%;
}

.nav-tabs {
    border-bottom: none !important;
}

.nav-tabs>li{
	color:#222 !important;
}
.nav-tabs>li.active>a, .nav-tabs>li.active>a:hover, .nav-tabs>li.active>a:focus {
    color: #fff;
    background-color: #d14d42;
    border: none !important;
    border-bottom-color: transparent;
	border-radius:none !important;
}
.nav-tabs>li>a {
    margin-right: 2px;
    line-height: 1.428571429;
    border: none !important;
    border-radius:none !important;
	text-transform:uppercase;
	font-size:16px;
}

.social-login{
	text-align:center;
	font-size:12px;
}
.social-login p{
	margin:15px 0;
}
.social-login ul{
	margin:0;
	padding:0;
	list-style-type:none;
}
.social-login ul li{
	width:33%;
	float:left;
    clear:fix;
}
.social-login ul li a{
	font-size:13px;
	color:#fff;
	text-decoration:none;
	padding:10px 0;
	display:block;
}
.social-login ul li:nth-child(1) a{
	background:#3b5998;
}
.social-login ul li:nth-child(2) a{
	background:#3b5998;
}
.social-login ul li:nth-child(3) a{
	background:#3698d9;
}
.sa-innate-form input[type=text], input[type=password], input[type=file], textarea, select, email{
    font-size:13px;
	padding:10px;
	border:1px solid#ccc;
	outline:none;
	width:100%;
	margin:8px 0;
	
}
.sa-innate-form input[type=submit]{
    border:1px solid#e64b3b;
	background:#e64b3b;
	color:#fff;
	padding:10px 25px;
	font-size:14px;
	margin-top:5px;
	}
	.sa-innate-form input[type=submit]:hover{
	border:1px solid#db3b2b;
	background:#db3b2b;
	color:#fff;
	}
	
	.sa-innate-form button{
	border:1px solid#e64b3b;
	background:#e64b3b;
	color:#fff;
	padding:10px 25px;
	font-size:14px;
	margin-top:5px;
	}
	.sa-innate-form button:hover{
	border:1px solid#db3b2b;
	background:#db3b2b;
	color:#fff;
	}
  .sa-innate-form p{
    font-size:13px;
    padding-top:10px;
  }
</style>