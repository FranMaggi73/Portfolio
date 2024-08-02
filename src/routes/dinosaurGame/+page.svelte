<script lang="ts">
    import { onMount } from 'svelte';
  
    // Variables del juego
    let dinoPosX: number = 42;
    let dinoPosY: number = 22;
    let dinoClass: string = 'dino-corriendo';
    let obstacles: { posX: number; class: string }[] = [];
    let clouds: { posX: number; posY: number }[] = [];
    let score: number = 0;
    let gameVel: number = 1;
    let gameOver: boolean = false;
    let sueloX = 0;

    let deltaTime: number = 0;
    let lastTime: number = Date.now();
    let parado: boolean = false;
    let saltando: boolean = false;
    let sueloY: number = 22;
    let velY: number = 0;
    let impulso: number = 900;
    let gravedad: number = 2500;
    let velEscenario: number = 1280 / 3;
    let tiempoHastaObstaculo: number = 2;
    let tiempoObstaculoMin: number = 0.7;
    let tiempoObstaculoMax: number = 1.8;
    let tiempoHastaNube: number = 0.5;
    let tiempoNubeMin: number = 0.7;
    let tiempoNubeMax: number = 2.7;
    let maxNubeY: number = 270;
    let minNubeY: number = 100;
    let velNube: number = 0.5;
    let suelo: HTMLElement;
    let contenedor: HTMLElement;
  
    onMount(() => {
      Start();
      requestAnimationFrame(Loop);
    });
  
    function Start() {
      document.addEventListener('keydown', HandleKeyDown);
      contenedor = document.querySelector('.contenedor') as HTMLElement;
      suelo = document.querySelector('.suelo') as HTMLElement;
    }
  
    function Loop() {
      const now: number = Date.now();
      deltaTime = (now - lastTime) / 1000; // Convert to seconds
      lastTime = now;
  
      if (!parado) {
        MoverDinosaurio();
        MoverSuelo(deltaTime);
        DecidirCrearObstaculos();
        DecidirCrearNubes();
        MoverObstaculos();
        MoverNubes();
        DetectarColision();
        velY -= gravedad * deltaTime;
      }
  
      requestAnimationFrame(Loop);
    }
  
    function HandleKeyDown(ev: KeyboardEvent) {
      if (ev.keyCode === 32) {
        Saltar();
      }
    }
  
    function Saltar() {
      if (dinoPosY === sueloY) {
        saltando = true;
        velY = impulso;
        dinoClass = 'dino';
      }
    }
  
    function MoverDinosaurio() {
      dinoPosY += velY * deltaTime;
      if (dinoPosY < sueloY) {
        TocarSuelo();
      }
    }
  
    function TocarSuelo() {
      dinoPosY = sueloY;
      velY = 0;
      if (saltando) {
        dinoClass = 'dino-corriendo';
      }
      saltando = false;
    }
  
    function MoverSuelo(deltaTime: number) {
      sueloX += CalcularDesplazamiento(deltaTime);
      suelo.style.left = `-${sueloX % contenedor.clientWidth}px`;
    }
    function CalcularDesplazamiento(deltaTime: number) {
      return velEscenario * deltaTime * gameVel;
    }
  
    function DecidirCrearObstaculos() {
      tiempoHastaObstaculo -= deltaTime;
      if (tiempoHastaObstaculo <= 0) {
        CrearObstaculo();
      }
    }
  
    function DecidirCrearNubes() {
      tiempoHastaNube -= deltaTime;
      if (tiempoHastaNube <= 0) {
        CrearNube();
      }
    }
  
    function CrearObstaculo() {
      const posX: number = window.innerWidth;
      obstacles.push({ posX, class: Math.random() > 0.5 ? 'cactus2' : 'cactus' });
      tiempoHastaObstaculo = tiempoObstaculoMin + Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin) / gameVel;
    }
  
    function CrearNube() {
      const posX: number = window.innerWidth;
      const posY: number = minNubeY + Math.random() * (maxNubeY - minNubeY);
      clouds.push({ posX, posY });
      tiempoHastaNube = tiempoNubeMin + Math.random() * (tiempoNubeMax - tiempoNubeMin) / gameVel;
    }
  
    function MoverObstaculos() {
      obstacles = obstacles.filter(obstacle => {
        if (obstacle.posX < -46) { // Ajusta según el ancho del obstáculo
          GanarPuntos();
          return false;
        } else {
          obstacle.posX -= velEscenario * deltaTime * gameVel;
          return true;
        }
      });
    }
  
    function MoverNubes() {
      clouds = clouds.filter(cloud => {
        if (cloud.posX < -92) { // Ajusta según el ancho de la nube
          return false;
        } else {
          cloud.posX -= velEscenario * deltaTime * velNube;
          return true;
        }
      });
    }
  
    function GanarPuntos() {
      score++;
      if (score === 5) {
        gameVel = 1.5;
        document.querySelector('.contenedor')?.classList.add('mediodia');
      } else if (score === 10) {
        gameVel = 2;
        document.querySelector('.contenedor')?.classList.add('tarde');
      } else if (score === 20) {
        gameVel = 3;
        document.querySelector('.contenedor')?.classList.add('noche');
      }
    }
  
    function GameOver() {
      Estrellarse();
      gameOver = true;
    }
  
    function Estrellarse() {
      dinoClass = 'dino-estrellado';
      parado = true;
    }
  
    function DetectarColision() {
  for (const obstacle of obstacles) {
    const dinoWidth = 84;
    const obstacleWidth = obstacle.class === 'cactus2' ? 98 : 46;
    const obstacleHeight = obstacle.class === 'cactus2' ? 66 : 96;
    
    if (obstacle.posX < dinoPosX + dinoWidth &&
        obstacle.posX + obstacleWidth > dinoPosX &&
        dinoPosY < sueloY + obstacleHeight) { // Verifica la altura
      GameOver();
      break;
    }
  }
}
  </script>
  

  <style>
    * {
      padding: 0;
      margin: 0;
    }
  
    .contenedor {
      width: 920px;
      height: 280px;
      margin: 0 auto;
      position: relative;
      background: linear-gradient(#b7d6c7, transparent) #ffe2d1;
      transition: background-color 1s linear;
      overflow: hidden;
    }
  
    .mediodia {
      background-color: #ffdcf3;
    }
  
    .tarde {
      background-color: #ffadad;
    }
  
    .noche {
      background-color: #aca8c7;
    }
  
    .dino {
      width: 84px;
      height: 84px;
      position: absolute;
      bottom: 22px;
      left: 42px;
      z-index: 2;
      background: url('/img/dino.png') repeat-x 0px 0px;
      background-size: 336px 84px;
      background-position-x: 0px;
    }
  
    .dino-corriendo {
      animation: animarDino 0.25s steps(2) infinite;
    }
  
    .dino-estrellado {
      background-position-x: -252px;
    }
  
    .suelo {
      width: 200%;
      height: 42px;
      position: absolute;
      bottom: 0;
      left: 0;
      background: url('/img/suelo.png') repeat-x 0px 0px;
      background-size: 50% 42px;
    }
  
    .cactus {
      width: 46px;
      height: 96px;
      position: absolute;
      bottom: 16px;
      z-index: 1;
      background: url('/img/cactus1.png') no-repeat;
    }
  
    .cactus2 {
      width: 98px;
      height: 66px;
      background: url('/img/cactus2.png') no-repeat;
    }
  
    .nube {
      width: 92px;
      height: 26px;
      position: absolute;
      z-index: 0;
      background: url('/img/nube.png') no-repeat;
      background-size: 92px 26px;
    }
  
    .score {
      width: 100px;
      height: 30px;
      position: absolute;
      top: 5px;
      right: 15px;
      z-index: 10;
      color: #d48871;
      font-family: Verdana;
      font-size: 30px;
      font-weight: bold;
      text-align: right;
    }
  
    .game-over {
      display: none;
      position: absolute;
      width: 100%;
      text-align: center;
      color: #7e928b;
      font-size: 30px;
      font-family: Verdana;
      font-weight: 700;
    }
  
    @keyframes animarDino {
      from {
        background-position-x: -84px;
      }
      to {
        background-position-x: -252px;
      }
    }
  </style>
<div class="contenedor">
    <div class="suelo"></div> 
    {#each obstacles as { posX, class: obstacleClass }}
      <div class={`cactus ${obstacleClass}`} style="left: {posX}px;"></div>
    {/each}
    {#each clouds as { posX, posY }}
      <div class="nube" style="left: {posX}px; bottom: {posY}px;"></div>
    {/each}
    <div class={`dino ${dinoClass}`} style="bottom: {dinoPosY}px; left: {dinoPosX}px;"></div>
    <div class="score">{score}</div>
    <div class="game-over" style:display={gameOver ? 'block' : 'none'}>GAME OVER</div>
  </div>