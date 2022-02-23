/**
 * ThreeJS Particle System
 * 
 * This file contains all the interaction with ThreeJS
 */

// Particle Engine!
let engine;

// ThreeJS
let camera, scene, renderer, clock, cube;

// DatGUI
let gui;
// DatGUI Folders
let animation;
// DatGUI Settings
let anim = {
    speed: 1.0,
};

init();
animate();

function init_gui() {
    gui = new dat.GUI({name: 'Particle Controls'});
    animation = gui.addFolder('Animation Settings');
    animation.add(anim, "speed", 0.0, 10.0, 0.05);
}

function init_three() {
    engine = new ParticleEngine(); // Doesn't do much yet

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 0.1, 1000 );


    clock = new THREE.Clock(true); // Will autostart

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    // Particle Setup
    const particleGeometry = new THREE.BufferGeometry;  // specify points
    const particleMaterial = new THREE.PointsMaterial(
        {
            size: 0.005,
            color: "lightblue",
        }
    );  
    
    const NR_PARTICLES = 3000; // number of particles
    let positions = new Float32Array( NR_PARTICLES * 3 );  // array of particle positions
    for(let i = 0; i < NR_PARTICLES * 3; i++)
    {
        positions[i] = 8 * ( Math.random() - 0.5 );   // randomize positions
    }

    // assign positions to particles
    particleGeometry.setAttribute( "position", new THREE.BufferAttribute( positions, 3 ) );
    const particleMesh = new THREE.Points( particleGeometry, particleMaterial ); // mesh
    scene.add(particleMesh);
    
    camera.position.z = 5;
    
    window.addEventListener( 'resize', onWindowResize );
}

function init() {
    init_gui();
    init_three();
}

/**
 *  animate() - Calls each individual animation frame and renders it.
 */
function animate() {
    requestAnimationFrame( animate );

    render();

    renderer.render( scene, camera );
}

/**
 * render() - Manipulates the scene property for the current render frame
 */
function render() {
    cube.position.y = Math.cos(clock.getElapsedTime()*anim.speed);
    cube.position.x = Math.sin(clock.getElapsedTime()*anim.speed);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
}

/**
 * onWindowResize() - Called when the window is resized
 */
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );
}
