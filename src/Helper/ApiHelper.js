import Swal from 'sweetalert2'
  // A post method function to send new user data to the endpoint,
  // which then will trigger the create user django built-in method in the API view file.
  // forumapp/views.py Line83
  const API = {
    createUser(newUser) {
      return fetch('https://thetreeholebackend.herokuapp.com/api/Create', {
        method: "post",
        body: JSON.stringify(newUser),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(res => {
          switch (res.status) {
            case 400:
              Swal.fire({
                title: 'Signup Failed',
                text: 'Username or Email has been used',
                icon: 'warning',
                width: '24rem',
                confirmButtonText: 'Ok'
              })
              break;
            case 201:
              Swal.fire({
                title: 'Account created!',
                text: 'Welcome',
                icon: 'success',
                width: '24rem',
                timer:'1500',
                showConfirmButton:false
              })
              return res.json()
          }
        })
    },
  
  
    createTitle(data) {
      return fetch('https://thetreeholebackend.herokuapp.com/api/Titles', {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          'Content-type': 'application/json'
        }
      })
    },
  
  
     Login(user) {
      return fetch('https://thetreeholebackend.herokuapp.com/api/Login', {
        method: "post",
        body: JSON.stringify(user),
        headers: {
          'Content-type': 'application/json'
        }
      })
        .then(res => {
          switch (res.status) {
            case 400:
              Swal.fire({
                title: 'Signin Failed',
                text: 'Username or Password wrong',
                icon: 'error',
                width: '24rem',
                confirmButtonText: 'Ok'
              })
              break;
            case 202:
              Swal.fire({
                title: 'Logged In',
                text: 'Welcome back',
                icon: 'success',
                width: '24rem',
                timer:'1500',
                showConfirmButton:false
              })
              return res.json();
          }
    })
  },
  
      createComment(data) {
          return fetch('https://thetreeholebackend.herokuapp.com/api/Comments', {
              method: "post",
              body: JSON.stringify(data),
              headers: {
                  'Content-type' : 'application/json'
              }
          })
          .then(res => res.json() )
      },

      createCommentInteractions() {
        return fetch('https://thetreeholebackend.herokuapp.com/api/CommentInteractions', {
            method: "post",
            headers: {
                'Content-type' : 'application/json'
            }
        })
    },

    putCommentInteractions(data) {
      return fetch('https://thetreeholebackend.herokuapp.com/api/CommentInteractions', {
          method: "put",
          body: JSON.stringify(data),
          headers: {
              'Content-type' : 'application/json'
          }
      })
  },

    updateFavourite(data){
      return fetch('https://thetreeholebackend.herokuapp.com/api/Create', {
        method: "put",
        body: JSON.stringify(data),
        headers: {
          'Content-type' : 'application/json'
        }
      })
    },

      createPrivateTitles(data){
        return fetch('https://thetreeholebackend.herokuapp.com/api/PrivateComments', {
          method: "post",
          body: JSON.stringify(data),
          headers: {
                  'Content-type' : 'application/json'
          }
        })
      },

      getCommentInteractions() {
        return fetch('https://thetreeholebackend.herokuapp.com/api/CommentInteractions')
        .then(res => res.json())
      },
      
  
      getTitles(){
        return fetch('https://thetreeholebackend.herokuapp.com/api/Titles')
        .then(res => res.json())      
      },
  
      getComments(){
        return fetch('https://thetreeholebackend.herokuapp.com/api/Comments')
        .then(res => res.json())
      },
  
      getPrivateTitles(){
        return fetch('https://thetreeholebackend.herokuapp.com/api/PrivateComments')
        .then(res => res.json())
      },
  
      getLatestUsers(){
        return fetch('https://thetreeholebackend.herokuapp.com/api/Create')
        .then(res => res.json())
      },
  
  }
  
  export default API