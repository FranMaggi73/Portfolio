<script lang="ts">
  import { onMount } from 'svelte';
  import { pageTitle } from '../../store/titleStore';
  pageTitle.set('Dino Jump');

  let dinoPosX: number = 42;
  let dinoPosY: number = 22;
  let dinoClass: string = 'dino-running';
  let obstacles: { posX: number; class: string }[] = [];
  let clouds: { posX: number; posY: number }[] = [];
  let score: number = 0;
  let gameVel: number = 1;
  let gameOver: boolean = false;
  let gameStart: boolean = false;
  let groundX = 0;

  let deltaTime: number = 0;
  let lastTime: number = Date.now();
  let stopped: boolean = false;
  let jumping: boolean = false;
  let groundY: number = 22;
  let velY: number = 0;
  let impulse: number = 900;
  let gravity: number = 2500;
  let scenarioVel: number = 1280 / 3;
  let timeUntilObstacle: number = 2;
  let obstacleMinTime: number = 0.7;
  let obstacleMaxTime: number = 1.8;
  let timeUntilCloud: number = 0.5;
  let cloudMinTime: number = 0.7;
  let cloudMaxTime: number = 2.7;
  let maxCloudY: number = 270;
  let minCloudY: number = 100;
  let cloudVel: number = 0.5;
  let ground: HTMLElement;
  let container: HTMLElement;
  let countdown: number = 3;
  let getReady = false;
  let create = false;

  onMount(() => {
    Start();
    requestAnimationFrame(Loop);
  });

  function Start() {
    document.addEventListener('keydown', HandleKeyDown);
    container = document.querySelector('.container') as HTMLElement;
    ground = document.querySelector('.ground') as HTMLElement;
    container.addEventListener('click', () => {
      if (!gameStart && !gameOver && !getReady) {
        StartCountdown();
      } else if (gameOver) {
        RestartGame();
      } else if (gameStart && !gameOver) {
        Jump();
      }
    });
  }

  function StartCountdown() {
    const interval = setInterval(() => {
      countdown--;
      if (countdown <= 0) {
        clearInterval(interval);
        gameStart = true;
        countdown = 3;

        lastTime = Date.now();

        timeUntilObstacle =
          obstacleMinTime + (Math.random() * (obstacleMaxTime - obstacleMinTime)) / gameVel;
        timeUntilCloud = cloudMinTime + (Math.random() * (cloudMaxTime - cloudMinTime)) / gameVel;

        requestAnimationFrame(Loop);
      }
    }, 1000);
    create = true;
  }

  function Loop() {
    const now: number = Date.now();
    deltaTime = (now - lastTime) / 1000;
    lastTime = now;

    if (!stopped) {
      MoveDinosaur();
      MoveGround(deltaTime);
      DecideToCreateObstacles();
      DecideToCreateClouds();
      MoveObstacles();
      MoveClouds();
      DetectCollision();
      velY -= gravity * deltaTime;
    }

    if (gameStart && !gameOver) {
      requestAnimationFrame(Loop);
    }
  }

  function HandleKeyDown(ev: KeyboardEvent) {
    if (ev.keyCode === 32 && gameStart && !gameOver) {
      Jump();
    }
  }

  function Jump() {
    if (dinoPosY === groundY && !gameOver) {
      jumping = true;
      velY = impulse;
      dinoClass = 'dino';
    }
  }

  function MoveDinosaur() {
    dinoPosY += velY * deltaTime;
    if (dinoPosY < groundY) {
      TouchGround();
    }
  }

  function TouchGround() {
    dinoPosY = groundY;
    velY = 0;
    if (jumping) {
      dinoClass = 'dino-running';
    }
    jumping = false;
  }

  function MoveGround(deltaTime: number) {
    groundX += CalculateDisplacement(deltaTime);
    ground.style.left = `-${groundX % container.clientWidth}px`;
  }

  function CalculateDisplacement(deltaTime: number) {
    return scenarioVel * deltaTime * gameVel;
  }

  function DecideToCreateObstacles() {
    timeUntilObstacle -= deltaTime;
    if (timeUntilObstacle <= 0 && create) {
      CreateObstacle();
    }
  }

  function DecideToCreateClouds() {
    timeUntilCloud -= deltaTime;
    if (timeUntilCloud <= 0 && create) {
      CreateCloud();
    }
  }

  function CreateObstacle() {
    const posX: number = window.innerWidth;
    obstacles.push({ posX, class: Math.random() > 0.5 ? 'cactus2' : 'cactus' });
    timeUntilObstacle =
      obstacleMinTime + (Math.random() * (obstacleMaxTime - obstacleMinTime)) / gameVel;
  }

  function CreateCloud() {
    const posX: number = window.innerWidth;
    const posY: number = minCloudY + Math.random() * (maxCloudY - minCloudY);
    clouds.push({ posX, posY });
    timeUntilCloud = cloudMinTime + (Math.random() * (cloudMaxTime - cloudMinTime)) / gameVel;
  }

  function MoveObstacles() {
    obstacles = obstacles.filter((obstacle) => {
      if (obstacle.posX < -46) {
        GainPoints();
        return false;
      } else {
        obstacle.posX -= scenarioVel * deltaTime * gameVel;
        return true;
      }
    });
  }

  function MoveClouds() {
    clouds = clouds.filter((cloud) => {
      if (cloud.posX < -92) {
        return false;
      } else {
        cloud.posX -= scenarioVel * deltaTime * cloudVel;
        return true;
      }
    });
  }

  function GainPoints() {
    score++;
    if (score === 5) {
      gameVel = 1.2;
      document.querySelector('.container')?.classList.add('noon');
    } else if (score === 10) {
      gameVel = 1.5;
      document.querySelector('.container')?.classList.add('afternoon');
    } else if (score === 20) {
      gameVel = 1.7;
      document.querySelector('.container')?.classList.add('night');
    }
  }

  function GameOver() {
    dinoClass = 'dino-crashed';
    stopped = true;
    gameOver = true;
  }

  function DetectCollision() {
    for (const obstacle of obstacles) {
      const dinoWidth = 84;
      const obstacleWidth = obstacle.class === 'cactus2' ? 98 : 46;
      const obstacleHeight = obstacle.class === 'cactus2' ? 66 : 96;

      if (
        obstacle.posX < dinoPosX + dinoWidth &&
        obstacle.posX + obstacleWidth > dinoPosX &&
        dinoPosY < groundY + obstacleHeight
      ) {
        GameOver();
        break;
      }
    }
  }

  function RestartGame() {
    if (gameOver) {
      dinoPosX = 42;
      dinoPosY = groundY;
      velY = 0;
      dinoClass = 'dino-running';
      jumping = false;

      obstacles = [];
      clouds = [];
      score = 0;
      gameVel = 1;
      groundX = 0;
      stopped = false;
      gameOver = false;
      gameStart = false;
      countdown = 3;
      lastTime = Date.now();
      timeUntilObstacle = 2;
      timeUntilCloud = 0.5;
      getReady = true;

      const containerElement = document.querySelector('.container');
      containerElement?.classList.remove('noon', 'afternoon', 'night');

      StartCountdown();
    }
  }
</script>

<main
  class="flex-1 flex justify-center pb-32 items-center fixed h-dvh sm:pb-16 w-svw overflow-x-auto"
>
  <div class="container">
    <div class="ground bg-repeat-x bg-ground"></div>
    {#if !gameStart && countdown > 0}
      <div class="start-message justify-center text-center text-secondary text-3xl font-bold">
        {#if getReady !== true}Click to start<br />{:else}Get ready<br />{/if}<span
          class="countdown mt-5 text-3xl text-success justify-center text-center">{countdown}</span
        >
      </div>
    {/if}
    {#each obstacles as { posX, class: obstacleClass }}
      <div class={`cactus ${obstacleClass}`} style="left: {posX}px;"></div>
    {/each}
    {#each clouds as { posX, posY }}
      <div class="cloud" style="left: {posX}px; bottom: {posY}px;"></div>
    {/each}
    <div class={`dino ${dinoClass}`} style="bottom: {dinoPosY}px; left: {dinoPosX}px;"></div>
    {#if gameStart && countdown > 0}
      <div class="score text-pink-500 font-bold text-right">{score}</div>
    {/if}
    <div class={`game-over text-3xl text-error font-bold ${gameOver ? 'active' : 'hidden'}`}>
      GAME OVER<br /><span class="text-success text-3xl font-bold">Click to play again</span>
    </div>
  </div>
</main>

<style>
  .countdown {
    position: absolute;
    width: 100%;
    z-index: 4;
    animation: countdownAnimation 1s infinite;
  }

  @keyframes countdownAnimation {
    0% {
      transform: translate(-50%, -50%) scale(1);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
    }
  }
  .container {
    width: 920px;
    height: 280px;
    position: relative;
    background: linear-gradient(#b7d6c7, transparent) #ffe2d1;
    transition: background-color 1s linear;
    overflow: hidden;
    border-radius: 20px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
    border-width: 3px;
    border-color: #2f2f2f;
    margin: 1rem;
  }

  .noon {
    background-color: #ffdcf3;
  }

  .afternoon {
    background-color: #ffadad;
  }

  .night {
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

  .dino-running {
    animation: animateDino 0.25s steps(2) infinite;
  }

  .dino-crashed {
    background-position-x: -252px;
  }

  .ground {
    width: 200%;
    height: 42px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: url('/img/ground.png') repeat-x 0px 0px;
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

  .cloud {
    width: 92px;
    height: 26px;
    position: absolute;
    z-index: 0;
    background: url('/img/cloud.png') no-repeat;
    background-size: 92px 26px;
  }

  .score {
    width: 100px;
    height: 30px;
    position: absolute;
    top: 5px;
    right: 15px;
    z-index: 3;
    color: rgb(247, 123, 123);
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
    z-index: 4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .start-message {
    position: absolute;
    width: 100%;
    text-align: center;
    z-index: 4;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  .game-over.active {
    display: block;
  }

  @keyframes animateDino {
    from {
      background-position-x: -84px;
    }
    to {
      background-position-x: -252px;
    }
  }
</style>
