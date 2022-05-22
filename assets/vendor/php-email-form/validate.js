/* PHP Email Form Validation - v3.2 */

(function () {
  "use strict";

  // Get the data from the class .php-email-form
  let forms = document.querySelectorAll('.php-email-form');

  // Loop through $forms and fire a function with e value as paramiter
  forms.forEach( function(e) {
    // Add event lisrener to the e that fire function with event value as paramiter
    e.addEventListener('submit', function(event) {
      // Accect ptecentDefault method inside event and run it
      event.preventDefault();

      // let thisForm variable hold the current value of this form
      let thisForm = this;

      // Get the 'action' & 'data-recaptcha-site-key' attribute of this form
      let action = thisForm.getAttribute('action');
      let recaptcha = thisForm.getAttribute('data-recaptcha-site-key');
      
      // Only if Not equel action do 
      if( ! action ) {
        // Display error
        displayError(thisForm, 'The form action property is not set!')
        return;
      } // Else if action
      // Add class list to 'loading' class
      thisForm.querySelector('.loading').classList.add('d-block');
      // Remove class list from 'error-message' & 'sent-message' class
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      // Create an object 'formData' from the class 'FormData' and pass an argument 'thisForm' to the class methods
      let formData = new FormData( thisForm );

      // Check if recaptcha ??
      if ( recaptcha ) {
        if(typeof grecaptcha !== "undefined" ) {
          // Access the method 'ready' and fire a function inside it
          grecaptcha.ready(function() {
            try {
              grecaptcha.execute(recaptcha, {action: 'php_email_form_submit'})
              .then(token => {
                formData.set('recaptcha-response', token);
                php_email_form_submit(thisForm, action, formData);
              })
            } catch(error) {
              displayError(thisForm, error)
            }
          });
        } else {
          displayError(thisForm, 'The reCaptcha javascript API url is not loaded!')
        }
      } else {
        php_email_form_submit(thisForm, action, formData);
      }
    });
  });

  // Function Php Email Form Submit
  function php_email_form_submit(thisForm, action, formData) {
    // fetch/get action and array of form data
    fetch(action, {
      method: 'POST',
      body: formData,
      headers: {'X-Requested-With': 'XMLHttpRequest'}
    })
    // then fire arrow function thats check the response state if its okay
    .then(response => {
      if( response.ok ) {
        return response.text()
      } else {
        throw new Error(`${response.status} ${response.statusText} ${response.url}`); 
      }
    })
    // then fire a arrow function that remove class list from '.loading'
    .then(data => {
      thisForm.querySelector('.loading').classList.remove('d-block');
      // Check that data state
      if (data.trim() == 'OK') {
        // Add cladd list to the 'sent-message'
        thisForm.querySelector('.sent-message').classList.add('d-block');
        thisForm.reset(); 
      } else {
        throw new Error(data ? data : 'Form submission failed and no error message returned from: ' + action); 
      }
    })
    .catch((error) => {
      displayError(thisForm, error);
    });
  }

  // Display Error
  function displayError(thisForm, error) {
    // ??
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').innerHTML = error;
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
