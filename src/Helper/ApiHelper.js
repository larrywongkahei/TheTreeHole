
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
              alert("Signup Failed.\nUsername or Email has been used.")
              break;
            case 201:
              alert("Created Account\nWelcome")
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
              alert("Username or Password wrong")
              break;
            case 202:
              alert("Welcome back")
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

    updateCommentInteractions(data) {
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

      createPrivateComments(data){
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
  
      getPrivateComments(){
        return fetch('https://thetreeholebackend.herokuapp.com/api/PrivateComments')
        .then(res => res.json())
      },
  
      getLatestUsers(){
        return fetch('https://thetreeholebackend.herokuapp.com/api/Create')
        .then(res => res.json())
      },
  
  }
  
  export default API