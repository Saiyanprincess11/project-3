//Displays Error Popup
  const handleSignupErr = (message) => {
    document.getElementById('incorrectValsErrMsg').textContent = message; 
    document.getElementById('incorrectValsErrMsg').classList.remove('hidden'); 
  };
  const removeSignupErr = () => {
    document.getElementById('incorrectValsErrMsg').classList.add('hidden'); 
  }; 
  const handleLoginErr = (message) => {
    document.getElementById('loginError').textContent = message; 
    document.getElementById('loginError').classList.remove('hidden');
  };
  const handleTitleErr = (message) => {
    document.getElementById("titleErr").classList.remove('is-hidden'); 
    document.getElementById("playlist-title").classList.add('is-danger'); 
  }; 
  const removeTitleErr = () => {
    document.getElementById("titleErr").classList.add('is-hidden'); 
    document.getElementById("playlist-title").classList.remove('is-danger'); 
  }; 
  const handleDescriptionErr = (message) => {
    document.getElementById("descriptionErr").classList.remove('is-hidden'); 
    document.getElementById("playlist-description").classList.add('is-danger'); 
  }; 
  const removeDescriptionErr = () => {
    document.getElementById("descriptionErr").classList.add('is-hidden'); 
    document.getElementById("playlist-description").classList.remove('is-danger'); 
  }; 
  const handlePrivacyErr = (message) => {
    document.getElementById("privacyErr").classList.remove('is-hidden'); 
  }; 
  const removePrivacyErr = () => {
    document.getElementById("privacyErr").classList.add('is-hidden'); 
  }; 
  const handlePlaylistError = (message) => {
    document.getElementById('playlist-error-msg').textContent = message;
  };
  const handleSignupError = (message) => {
    document.getElementById('incorrectValsErrMsg').textContent = message;
    document.getElementById('incorrectValsErrMsg').classList.remove('hidden');
    document.getElementById('user').classList.add('is-danger');
    document.getElementById('pass').classList.add('is-danger');
  };




  //When username is already in use...
  const handleNameError = (message) => {
    document.getElementById('incorrectNameErrMsg').textContent = message;
    document.getElementById('incorrectNameErrMsg').classList.remove('hidden');
    document.getElementById('user').classList.add('is-danger');
  };
  
  //When passwords don't match
  const handleValueError = (message) => {
    document.getElementById('incorrectValsErrMsg').textContent = message;
    document.getElementById('incorrectValsErrMsg').classList.remove('hidden');
    document.getElementById('pass').classList.add('is-danger');
    document.getElementById('pass2').classList.add('is-danger');
  };

  //Button Events 
  //Hides music card data
  const hideData = () => {
    document.getElementById('music-data').classList.add('is-hidden'); 
    document.getElementById('music-data-footer').classList.add('is-hidden'); 
  };

  //Displays music card data
  const showData = () => {
    document.getElementById('music-data').classList.remove('is-hidden'); 
    document.getElementById('music-data-footer').classList.remove('is-hidden'); 
  };

  //Hides Playlist Card data
  const hidePlaylistData = (id) => {
    //document.getElementById(id).classList.add('is-hidden');
  }
  const showPlaylistData = (id) => {

    console.log(id); 
    //document.getElementsByClassName(`$id`).classList.add('is-hidden'); 
    //document.getElementById(id).classList.remove('is-hidden');
  }
   
 
  /* Sends post requests to the server using fetch. Will look for various
     entries in the response JSON object, and will handle them appropriately.
  */
  const sendPost = async (url, data, handler) => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
  
    const result = await response.json();
  
    if(result.redirect) {
      window.location = result.redirect;
    }
  
    if(result.error) {
     console.log(result.error);
    }

    if(handler){
      handler(result); 
    }
  };


  //Hides error pop-up
  const hideError = () => {
    //document.getElementById('pass').classList.remove('is-danger'); 
    //document.getElementById('user').classList.remove('is-danger'); 
  }; 

  module.exports = {

    handleSignupErr,
    removeSignupErr,
    handleLoginErr, 

    handleTitleErr, 
    removeTitleErr, 
    handleDescriptionErr, 
    removeDescriptionErr, 
    handlePrivacyErr, 
    removePrivacyErr, 

    handlePlaylistError,
    handleSignupError,
    handleNameError,
    handleValueError,
    sendPost, 
    hideError,
    hideData, 
    hidePlaylistData,
    showPlaylistData, 
    showData,
  }