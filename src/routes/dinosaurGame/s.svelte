<script lang="ts">
    import { onMount } from 'svelte';
  
    let score = 0;
    let gameOverVisible = false;
    let dinoClass = 'dino dino-corriendo';
    let dinoPosY = 22;
    let dinoPosX = 42;
    let velY = 0;
    let gameVel = 1;
    let sueloX = 0;
    let parado = false;
    let saltando = false;
    let tiempoHastaObstaculo = 2;
    let tiempoHastaNube = 0.5;
    const sueloY = 22;
    const impulso = 900;
    const gravedad = 2500;
    const velEscenario = 1280 / 3;
    const tiempoObstaculoMin = 0.7;
    const tiempoObstaculoMax = 1.8;
    const obstaculoPosY = 22;
    const tiempoNubeMin = 0.7;
    const tiempoNubeMax = 2.7;
    const maxNubeY = 270;
    const minNubeY = 100;
    const velNube = 0.5;
    let contenedor: HTMLElement;
    let suelo: HTMLElement;
    let textoScore: HTMLElement;
    let dino: HTMLElement;
    let gameOver: HTMLElement;
    let obstaculos: HTMLElement[] = [];
    let nubes: HTMLElement[] = [];
  
    onMount(() => {
      Start();
      Loop();
    });
  
    function Start() {
      gameOver = document.querySelector('.game-over') as HTMLElement;
      suelo = document.querySelector('.suelo') as HTMLElement;
      contenedor = document.querySelector('.contenedor') as HTMLElement;
      textoScore = document.querySelector('.score') as HTMLElement;
      dino = document.querySelector('.dino') as HTMLElement;
      document.addEventListener('keydown', HandleKeyDown);
    }
  
    let lastTime = Date.now();
    function Loop() {
      const currentTime = Date.now();
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;
  
      if (!parado) {
        MoverDinosaurio(deltaTime);
        MoverSuelo(deltaTime);
        DecidirCrearObstaculos(deltaTime);
        DecidirCrearNubes(deltaTime);
        MoverObstaculos(deltaTime);
        MoverNubes(deltaTime);
        DetectarColision();
      }
  
      requestAnimationFrame(Loop);
    }
  
    function HandleKeyDown(ev: KeyboardEvent) {
      if (ev.keyCode == 32) {
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
  
    function MoverDinosaurio(deltaTime: number) {
      if (saltando) {
        velY -= gravedad * deltaTime;
      }
      dinoPosY += velY * deltaTime;
      if (dinoPosY < sueloY) {
        TocarSuelo();
      }
      dino.style.bottom = `${dinoPosY}px`;
    }
  
    function TocarSuelo() {
      dinoPosY = sueloY;
      velY = 0;
      if (saltando) {
        dinoClass = 'dino dino-corriendo';
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
  
    function Estrellarse() {
      dinoClass = 'dino dino-estrellado';
      parado = true;
    }
  
    function DecidirCrearObstaculos(deltaTime: number) {
      tiempoHastaObstaculo -= deltaTime;
      if (tiempoHastaObstaculo <= 0) {
        CrearObstaculo();
      }
    }
  
    function DecidirCrearNubes(deltaTime: number) {
      tiempoHastaNube -= deltaTime;
      if (tiempoHastaNube <= 0) {
        CrearNube();
      }
    }
  
    function CrearObstaculo() {
      const obstaculo = document.createElement('div');
      contenedor.appendChild(obstaculo);
      obstaculo.classList.add('cactus');
      if (Math.random() > 0.5) obstaculo.classList.add('cactus2');
      obstaculo.style.left = `${contenedor.clientWidth}px`;
      obstaculo.style.bottom = `${obstaculoPosY}px`;
  
      obstaculos.push(obstaculo);
      tiempoHastaObstaculo =
        tiempoObstaculoMin +
        (Math.random() * (tiempoObstaculoMax - tiempoObstaculoMin)) / gameVel;
    }
  
    function CrearNube() {
      const nube = document.createElement('div');
      contenedor.appendChild(nube);
      nube.classList.add('nube');
      nube.style.left = `${contenedor.clientWidth}px`;
      nube.style.bottom = `${minNubeY + Math.random() * (maxNubeY - minNubeY)}px`;
  
      nubes.push(nube);
      tiempoHastaNube =
        tiempoNubeMin +
        (Math.random() * (tiempoNubeMax - tiempoNubeMin)) / gameVel;
    }
  
    function MoverObstaculos(deltaTime: number) {
      obstaculos = obstaculos.filter((obstaculo) => {
        obstaculo.style.left = `${
          parseFloat(obstaculo.style.left) - CalcularDesplazamiento(deltaTime)
        }px`;
  
        if (parseFloat(obstaculo.style.left) < -obstaculo.clientWidth) {
          obstaculo.remove();
          GanarPuntos();
          return false;
        }
        return true;
      });
    }
  
    function MoverNubes(deltaTime: number) {
      nubes = nubes.filter((nube) => {
        nube.style.left = `${
          parseFloat(nube.style.left) - CalcularDesplazamiento(deltaTime) * velNube
        }px`;
  
        if (parseFloat(nube.style.left) < -nube.clientWidth) {
          nube.remove();
          return false;
        }
        return true;
      });
    }
  
    function GanarPuntos() {
      score++;
      if (score === 5) {
        gameVel = 1.5;
        contenedor.classList.add('mediodia');
      } else if (score === 10) {
        gameVel = 2;
        contenedor.classList.add('tarde');
      } else if (score === 20) {
        gameVel = 3;
        contenedor.classList.add('noche');
      }
      suelo.style.animationDuration = `${3 / gameVel}s`;
    }
  
    function GameOver() {
      Estrellarse();
      gameOverVisible = true;
    }
  
    function DetectarColision() {
      for (const obstaculo of obstaculos) {
        if (parseFloat(obstaculo.style.left) > dinoPosX + dino.clientWidth) {
          break;
        }
        if (IsCollision(dino, obstaculo, 10, 30, 15, 20)) {
          GameOver();
        }
      }
    }
  
    function IsCollision(
      a: HTMLElement,
      b: HTMLElement,
      paddingTop: number,
      paddingRight: number,
      paddingBottom: number,
      paddingLeft: number
    ) {
      const aRect = a.getBoundingClientRect();
      const bRect = b.getBoundingClientRect();
  
      return !(
        aRect.top + aRect.height - paddingBottom < bRect.top ||
        aRect.top + paddingTop > bRect.top + bRect.height ||
        aRect.left + aRect.width - paddingRight < bRect.left ||
        aRect.left + paddingLeft > bRect.left + bRect.width
      );
    }
  </script>
  