let target = '';

init()
function init() {

  const startScripts = [
    // FRAMEWORKS
    './ThreeJS/three.js',
    
    // ADDONS
    './addons/OrbitControls.js',
    './addons/three.interaction.js',

    // USER SCRIPT
    './scripts/scene.js',
    './scripts/vkRequest.js',
    
  ].forEach((el)=>AddScript(el));

  target = prompt('Write userId');
}

function AddScript(src) {
  let script = document.createElement('SCRIPT');
  script.src = src;
  script.async = false
  document.getElementsByTagName("head")[0].appendChild(script);
}
