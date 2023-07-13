
const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// const camera = new THREE.OrthographicCamera(-5,5,-5,5, 0.1, 1000);
const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1, 5);

const controls = new OrbitControls( camera, renderer.domElement );
controls.update();

// const interaction = new Interaction( renderer, scene, camera );


/////// Добавляем объекты в сцену
{
  const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
  const points = [];
  points.push(new THREE.Vector3(-3, 0, 0 ));
  points.push(new THREE.Vector3( 0, 3, 0 ));
  points.push(new THREE.Vector3( 3, 0, 0 ));
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  const line = new THREE.Line( geometry, material );
  line.position.set(0, 0, 0);
  scene.add(line);
}

let Turner = new class LoadLimiter{
  constructor(){
    this.loadCounter = 0;
    this.loadQueue = [];
  }
  add(loader, url, x,y,z){
    if(this.loadCounter < 8){/// LIMITER
      this.loadCounter++;
      loader.load(url,img=>{
        this.spriteRender(img, x,y,z)
        this.loaderNext()
      })
    }else{
      this.loadQueue.push([loader,url,x,y,z])
    }
  }
  loaderNext(){
    let next = this.loadQueue.shift(); // next == [loader, url, x,y,z]
    if(next){
      next[0].load(next[1], img=>{
        this.spriteRender(img, next[2],next[3],next[4])
        this.loaderNext()
      })
    }else{      
      this.loadCounter--;
    }
  }
  spriteRender(img, x,y,z){
    const material = new THREE.SpriteMaterial({map:img})
    const sprite = new THREE.Sprite(material)
    if( !(isNaN(x) || isNaN(y) || isNaN(z)) ){ sprite.position.set(x,y,z) }
    scene.add(sprite)
    // sprite.on('click', ev => {
    //   console.log(ev);
    // });
    return sprite
  }
}


function SpriteLoad(url, x,y,z){
  const map = new THREE.TextureLoader();
  Turner.add(map,url,x,y,z);
}


animate()
function animate() {
  requestAnimationFrame(animate)

  controls.update();

  renderer.render(scene, camera);
}