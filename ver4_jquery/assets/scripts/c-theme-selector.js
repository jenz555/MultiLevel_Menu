var themeSelector = (function () {

  'use strict';

  function init () {

    var dropdown = document.getElementById('theme-selector-dropdown');
    var options = dropdown.getElementsByTagName('li');

    for (var i = 0; i < options.length; i++) {
      options[i].addEventListener('click', setSelectedMenuItem);
    }

    setThemeCSS();
    setThemeHighlight();
  }

  function setSelectedMenuItem (e) {

    e.preventDefault();

    var siblings = Array.prototype.filter.call(e.target.parentNode.children, function (child) {
      return child !== e.target;
    });

    for (var i = 0; i < siblings.length; i++) {
      siblings[i].classList.remove('isActive');
    }

    e.target.classList.add('isActive');

    setThemeInSession(e.target);

  }

  function setThemeInSession (target) {

    var theme = sessionStorage.getItem('theme');
    if (theme && JSON.parse(theme).activeItem === target.id) {
      return false;
    }

    sessionStorage.setItem('theme', JSON.stringify({
      css: target.getAttribute('data-theme'),
      activeItem: target.id
    }));

    setThemeCSS();
    setThemeHighlight();
  }


  function setThemeCSS () {

    var theme = JSON.parse(sessionStorage.getItem('theme'));
    var themeSelector = document.getElementsByClassName("theme-selector")[0];
    var host = window.location.host;
    var baseUrl = host.match('localhost')
      ? 'http://localhost:' + window.location.port + '/assets/styles/'
      : 'http://ux.allstate.com/ux/allstate-ui-toolkit/assets/styles/';

    if (theme !== null && theme.css !== '') {
      document.getElementById('allstate-brand-stylesheet').href = baseUrl + theme.css;
    } else if (theme !== null && theme.css === '') {
      document.getElementById('allstate-brand-stylesheet').href = '';
    } else {
      document.getElementById('allstate-brand-stylesheet').href = baseUrl + 'app.min.css';
      themeSelector.classList.add("theme-selector--non-whitelabel");
    }

    document.getElementById(!theme ? 'theme-1' : theme.activeItem).classList.add('isActive');
  }


  function setThemeHighlight() {
    var consumerThemeId = "theme-1";
    var themeSelector = document.getElementsByClassName("theme-selector")[0];
    var themeInSession = JSON.parse(sessionStorage.getItem("theme"));
    var themeIdInSession = "";

    // check if a theme id selected in the session
    // and set in the themeIdInSession variable
    if (themeInSession != null) {
      themeIdInSession = themeInSession.activeItem;

      // if the theme id in the session is the consumer theme
      // them add the theme highlight if it does not already exist
      // else remove it
      if (
          (!themeSelector.classList.contains("theme-selector--non-whitelabel"))
          && (themeIdInSession === consumerThemeId)
          ) {
        themeSelector.classList.add("theme-selector--non-whitelabel");
      } else {
        themeSelector.classList.remove("theme-selector--non-whitelabel");
      }
    }
  }


  return {
    init: init
  };

}());
