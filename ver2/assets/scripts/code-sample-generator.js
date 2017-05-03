
'use strict';

var initCodeSamples = (function () {
  document.addEventListener('DOMContentLoaded', function () {
    var codeSamples = document.querySelectorAll('[data-code-sample]');
    for (var i = 0; i < codeSamples.length; i++) {
      var target = codeSamples[i],
          fileName = target.getAttribute('data-code-sample'),
          callback = target.getAttribute('data-callback');
      createCodeSample(fileName + '.html', target, callback);
    }
  });
}());

function createCodeSample (file, target, callback) {

  var isJs = file.match('.js');
  var request = new XMLHttpRequest();

  request.open('GET', 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/t-489/' + file, true);

  request.onload = function () {
    if (request.status >= 200 && request.status < 400) {

      var resp = request.responseText;
      var codesample = document.createElement ('div');

      codesample.className = 'code-sample vr--x2';
      codesample.innerHTML =  '<pre class="code-snippet ' + (isJs ? 'language-js' : 'language-html') + '"><code>' + resp.replace(/\</g, '&lt;').replace(/\>/g, '&gt;') + '</code></pre>' + (isJs ? '' : resp);

      target.parentNode.replaceChild(codesample, target);

      if (typeof callback !== 'undefined') {
        var callbackWrapper = new Function(callback)();
      }

      Prism.highlightAll(false);

    } else {
      console.log('something went wrong while processing the request for ' + file);
    }
  };

  request.onerror = function() {
    console.log('Could not connect.');
  };

  request.send();
}
