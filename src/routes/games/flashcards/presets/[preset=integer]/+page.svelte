<script lang="ts">
  import { goto } from '$app/navigation';
  import { pageTitle } from '../../../../../store/titleStore';
  import type { PageData } from './$types';
  import Flashcard from '$lib/components/Flashcard.svelte';
  import { fly } from 'svelte/transition';

  export let data: PageData;

  enum Mode {
    Known = 1,
    Learn = 0
  }

  let score = 0;
  let currentFlashcard = data.flashcards[0];
  let newFlashcard = [...data.flashcards];
  let translation = currentFlashcard.Known.Text;
  let mode = Mode.Known;
  let isAnimating = false;
  let animate = false;

  pageTitle.set('Flashcards');

  async function translateFlashcard() {
    if (isAnimating) return;
    if (mode === Mode.Known) {
      isAnimating = true;
      await new Promise((r) => setTimeout(r, 300));

      translation = currentFlashcard.Learn.Text;
      mode = Mode.Learn;
      await new Promise((r) => setTimeout(r, 600));

      isAnimating = false;
    }
  }

  async function nextFlashcard() {
    if (animate) return;
    currentFlashcard = newFlashcard[newFlashcard.indexOf(currentFlashcard) + 1];
    translation = currentFlashcard.Known.Text;
    animate = true;

    if (mode === Mode.Known) {
      mode = Mode.Learn;
      await new Promise((r) => setTimeout(r, 1));
      mode = Mode.Known;
    } else {
      mode = Mode.Known;
    }
    animate = true;
    await new Promise((r) => setTimeout(r, 600));
    animate = false;
  }

  function removeCurrentFlashcard() {
    const index = newFlashcard.indexOf(currentFlashcard);
    if (index === 0) {
      newFlashcard.splice(index, 1);
    }
    resetGame();
  }

  function resetGame() {
    if (data.flashcards.length === score + 1) {
      const url = '/games/flashcards';
      goto(url);
    }
  }

  function doKnown() {
    if (isAnimating) return;
    if (animate) return;
    removeCurrentFlashcard();
    nextFlashcard();
    if (data.flashcards.length != score + 1) {
      score += 1;
    }
  }

  function dontKnown() {
    if (isAnimating) return;
    if (animate) return;
    newFlashcard.push(currentFlashcard);
    nextFlashcard();
  }
</script>

<main class="flex flex-col pb-32 h-screen fixed sm:pb-16 w-screen">
  <div class="flex-1 flex items-center justify-center">
    <div>
      <div class="flex items-center gap-3 my-6 sm:mt-0 xl:mt-3 lg:mt-3 rounded-box">
        <progress
          class="flex-row progress progress-success sm:w-96 w-64"
          value={score + 1}
          max={data.flashcards.length}
        ></progress>
        <p class="text-xl font-bold text-primary">{score}/{data.flashcards.length}</p>
      </div>
      <div class="h-full w-full">
        <button on:click={translateFlashcard} class={` stack h-full w-full`}>
          {#each [currentFlashcard] as flashcard (flashcard)}
            <div
              class={`card text-5xl ${
                mode === Mode.Learn ? 'text-secondary' : 'text-primary'
              } opacity-100  lg:py-32 xl:py-32 py-36 sm:py-10 w-full h-full btn bg-base-200 card-bordered border-gray-800`}
              in:fly={{ x: 200, duration: 600 }}
              out:fly={{ x: -200, duration: 600 }}
            >
              <div class="card-body">
                <div class="flip-box-inner" class:flip-it={isAnimating}>
                  <div class="flip-box-front flex items-center justify-center">
                    <p>{translation}</p>
                  </div>
                  <div class="flip-box-back flex items-center justify-center">
                    <p>{translation}</p>
                  </div>
                </div>
              </div>
            </div>
          {/each}
          {#if score < data.flashcards.length - 1}
            <Flashcard />
          {/if}
          {#if score < data.flashcards.length - 2}
            <Flashcard translateX={-2} rotate={4} />
          {/if}
          {#if score < data.flashcards.length - 3}
            <Flashcard translateX={2} rotate={-5} />
          {/if}
          {#if score < data.flashcards.length - 4}
            <Flashcard translateX={-2} rotate={-6} />
          {/if}
          {#if score < data.flashcards.length - 5}
            <Flashcard translateX={1} rotate={7} />
          {/if}
        </button>
      </div>
      <div class="flex flex-row justify-center gap-4 my-8 rounded-box">
        <button on:click={doKnown} class={`btn rounded-box btn-outline btn-accent shadow basis-1/2`}
          >Know</button
        >
        <button on:click={dontKnown} class={`btn rounded-box btn-outline btn-info shadow basis-1/2`}
          >Don't Know</button
        >
      </div>
    </div>
  </div>
</main>

<style>
  .flip-box-front,
  .flip-box-back {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: absolute;
    width: 100%;
  }

  .flip-box-back {
    transform: rotateY(180deg);
  }
  .flip-box {
    perspective: 1000px;
  }

  .flip-box-inner {
    position: relative;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-it {
    animation: flipIt 0.8s forwards;
  }

  @keyframes flipIt {
    from {
      transform: rotateY(0deg);
    }
    to {
      transform: rotateY(180deg);
    }
  }
</style>
