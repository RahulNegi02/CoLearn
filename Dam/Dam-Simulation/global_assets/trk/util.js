window.planet_schule_de || (window.planet_schule_de = {});
window.planet_schule_de.webtrack || (window.planet_schule_de.webtrack = {});
window.planet_schule_de.webtrack.util || (window.planet_schule_de.webtrack.util = {});

window.planet_schule_de.webtrack.util.onclick_delay = function(x) {
  if ( x.getAttribute("target") != "" )
    window.open(x.href,x.getAttribute("target"));
  else
    setTimeout(function(){document.location = x.href;},500);
  return false;
};

window.planet_schule_de.webtrack.util.img = function(src) {
  var img = new Image;
  img.src = src;
};

window.planet_schule_de.webtrack.util.img_size = function(src) {
  try {
    src += "&vx=" + document.documentElement.clientWidth
          + "&vy=" + document.documentElement.clientHeight;
  } catch(e){};
  try {
    src += "&sx=" + screen.width
          + "&sy=" + screen.height;
  } catch(e){};
  var img = new Image;
  img.src = src;
};
