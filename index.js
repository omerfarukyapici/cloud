let scene, camera, renderer, cloudParticles = [];

const init = () => {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;

    let ambient = new THREE.AmbientLight(0x555555);
    scene.add(ambient);

    let directionalLight = new THREE.DirectionalLight(0xff7b19)
    directionalLight.position.set(0, 0, 1);
    scene.add(directionalLight);

    let orangeLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
    orangeLight.position.set(500, 300, 100);
    scene.add(orangeLight);

    let redLight = new THREE.PointLight(0xd8547e, 50, 450, 1.7);
    redLight.position.set(200, 300, 100);
    scene.add(redLight);

    let blueLight = new THREE.PointLight(0xcc6600, 50, 450, 1.7);
    blueLight.position.set(600, 300, 600);
    scene.add(blueLight);

    renderer = new THREE.WebGL1Renderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    scene.fog = new THREE.FogExp2(0x000000, 0.001);
    renderer.setClearColor(scene.fog.color);
    document.body.appendChild(renderer.domElement);

    // Cloud part 
    let cloudGeo, cloudMaterial;

    let loader = new THREE.TextureLoader();
    loader.load('img/smoke-1.png', (texture) => {
        cloudGeo = new THREE.PlaneBufferGeometry(500, 500);
        cloudMaterial = new THREE.MeshLambertMaterial({
            map: texture,
            transparent: true
        })

        for (let cloudPicture = 0; cloudPicture < 50; cloudPicture++) {
            let cloud = new THREE.Mesh(cloudGeo, cloudMaterial);
            cloud.position.set(
                Math.random() * 800 - 400,
                500,
                Math.random() * 500 - 500
            );

            cloud.rotation.x = 1.16;
            cloud.rotation.y = -0.12;
            cloud.rotation.z = Math.random() * 2 * Math.PI;
            cloud.material.opacity = 0.55;
            cloudParticles.push(cloud);
            scene.add(cloud);
        }
    });

    render();
}

const render = () => {
    cloudParticles.forEach(p => {
        p.rotation.z -= 0.002;
    });

    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

init();
