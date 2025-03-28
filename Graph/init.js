let target = '';
let token_key = '';  
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

  target = prompt('Напишите Id пользователя, друзей которого нужно вывести');
  token_key = '6e7b4f086e7b4f086e7b4f08016d60135566e7b6e7b4f0808cd415a2b0d6aabb97b6119'
}

function AddScript(src) {
  let script = document.createElement('SCRIPT');
  script.src = src;
  script.async = false
  document.getElementsByTagName("head")[0].appendChild(script);
}
