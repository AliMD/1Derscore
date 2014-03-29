/* 
 * 1Derscore.js v0.1.1
 * A whole mess of useful functional programming helpers without extending any built-in object for The One Developers <1Devs/>
 *
 * http://ali.md/1derscore
 * License: http://alimd.mit-license.org/
 */

(function (root, doc, undef) { // encapsulate all variables so they don't become global vars
  'use strict'; // set javascript engine to strict mode

  var _ = root._ = root._ || {};

  /**
   * Console polyfill
   * @return {[type]} [description]
   */
  _.con = (function(){
    if(root.console && root.console.log)
      return root.console;
    var
    prop, method,
    con = {},
    empty = {},
    dummy = function() {},
    properties = 'memory'.split(','),
    methods = ('assert,clear,count,debug,dir,dirxml,error,exception,group,' +
      'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' +
      'table,time,timeEnd,timeStamp,trace,warn').split(',');
    while (prop = properties.pop())
      if(!con[prop])
        con[prop] = empty;
    while (method = methods.pop())
      if(!con[method])
        con[method] = dummy;
    return con;
  })();

  /**
   * IE version detection
   * @return {Number} version of ie or undefined
   */
  _.ie = (function(){
    var
    ver = -1, // Return value assumes failure.
    ua = root.navigator.userAgent,
    msie = ua.indexOf('MSIE '),
    trident = ua.indexOf('Trident/'), // IE 11 (or newer)
    rv = trident>0 ? ua.indexOf('rv:') : undef;
    if (msie > 0) // IE 10 or older => return version number
      return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
    // IE 11 (or newer) => return version number
    return trident>0 ? parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10) :  undef;
  })();

  /**
   * Find current script src path
   * @return {[type]} the path or `undefined` if can't find
   */
  _.getScriptPath = function(){
    if(!doc.currentScript){
      if(window.console) console.warn('Cannot find current script path for load external file :(');
      return undef;
    }
    return doc.currentScript.src;
  };

  /**
   * Find current script directory path.
   * @return {Script} the path
   */
  _.getScriptDirectory = function(){
    var
    src = _.getScriptPath() || '',
    slashPos = src.lastIndexOf('/');
    if(slashPos===-1)
      return '';
    return src.substring(0, slashPos+1);
  };

  /**
   * Convert a number in rage of [x1, x2] to range of [y1, y2]
   * @param  {Number}  x       Input number
   * @param  {Array}   arr     Range: [x1,x2,y1,y2]
   * @param  {Boolean} protect Protect y between [y1, y2]
   * @return {Number}          calculated `y` in range
   */
  _.getInRange = Math.getInRange = function (x, arr, protect) {
    var y = ((arr[3] - arr[2]) * (x - arr[0])) / (arr[1] - arr[0]) + arr[2];
    if(protect) y = y < arr[2] ? arr[2] : (y > arr[3] ? arr[3] : y);
    return y;
  };

  /**
   * Get selected in docuemnt
   * @return {object} selected object or text in ie
   */
  var getSelection = (function(gs, s){
    return root[gs] ||
    doc[gs] ||
    function(){
      return doc[s] && doc[s].createRange().text;
    };
  })('getSelection', 'selection');

  /**
   * Get selected text in docuemnt
   * @return {string} selected text
   */
  _.getSelectionText = function () {
    return getSelection().toString();
  };

})(window, document);