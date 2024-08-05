<script lang="ts">
  import { onMount } from 'svelte';
  import { pageTitle } from '../../store/titleStore';
  pageTitle.set('Calculator');

  let currentInput: string = '';

  function appendNumber(number: number | string) {
    currentInput = currentInput.toString() + number.toString();
  }

  function chooseOperation(selectedOperator: string) {
    if (currentInput === '' && selectedOperator === '-') {
      currentInput = '-';
      return;
    }
    if (['+', '-', '*', '÷'].includes(currentInput.slice(-1))) {
      currentInput = currentInput.slice(0, -1) + selectedOperator;
    } else {
      currentInput = currentInput + selectedOperator;
    }
  }

  function compute() {
    try {
      currentInput = currentInput.replace(/÷/g, '/');
      currentInput = eval(currentInput).toString();
    } catch (e) {
      currentInput = 'Error';
    }
  }

  function clear() {
    currentInput = '';
  }

  function deleteLast() {
    currentInput = currentInput.toString().slice(0, -1);
  }

  function handleKeyPress(event: KeyboardEvent) {
    const key = event.key;
    if (key >= '0' && key <= '9') {
      appendNumber(parseInt(key));
    } else if (key === '.') {
      appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
      chooseOperation(key === '/' ? '÷' : key);
    } else if (key === 'Enter') {
      compute();
    } else if (key === 'Backspace') {
      deleteLast();
    } else if (key === 'Escape') {
      clear();
    }
  }

  onMount(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });
</script>

<main
  class="flex-1 flex justify-center pb-32 items-center fixed h-dvh sm:pb-16 w-svw overflow-x-auto"
>
  <div class="bg-base-200 p-6 rounded-lg shadow-lg max-w-md w-full">
    <div class="mb-4 text-3xl min-h-[3rem] flex items-center justify-end input-bordered input">
      <div class="ml-2">{currentInput}</div>
    </div>
    <div class="grid grid-cols-4 gap-2">
      <button class="btn btn-error col-span-2 text-white p-4 rounded" on:click={clear}>AC</button>
      <button class="btn btn-warning text-white p-4 rounded" on:click={deleteLast}>DEL</button>
      <button class="btn btn-primary text-white p-4 rounded" on:click={() => chooseOperation('÷')}
        >÷</button
      >
      <button class="btn btn-secondary text-black p-4 rounded" on:click={() => appendNumber(1)}>1</button>
      <button class="btn btn-secondary text-black p-4 rounded" on:click={() => appendNumber(2)}>2</button>
      <button class="btn btn-secondary text-black p-4 rounded" on:click={() => appendNumber(3)}>3</button>
      <button class="btn btn-primary text-white p-4 rounded" on:click={() => chooseOperation('*')}
        >*</button
      >

      <button class="btn btn-secondary text-black p-4 rounded" on:click={() => appendNumber(4)}>4</button>
      <button class="btn btn-secondary text-black p-4 rounded" on:click={() => appendNumber(5)}>5</button>
      <button class="btn btn-secondary text-black p-4 rounded" on:click={() => appendNumber(6)}>6</button>
      <button class="btn btn-primary text-white p-4 rounded" on:click={() => chooseOperation('+')}
        >+</button
      >

      <button class="btn btn-secondary text-black p-4 rounded" on:click={() => appendNumber(7)}>7</button>
      <button class="btn btn-secondary text-black p-4 rounded" on:click={() => appendNumber(8)}>8</button>
      <button class="btn btn-secondary text-black p-4 rounded" on:click={() => appendNumber(9)}>9</button>
      <button class="btn btn-primary text-white p-4 rounded" on:click={() => chooseOperation('-')}
        >-</button
      >

      <button class="btn btn-secondary col-span-2 text-black p-4 rounded" on:click={() => appendNumber(0)}
        >0</button
      >
      <button class="btn btn-primary text-black p-4 rounded" on:click={() => appendNumber('.')}
        >.</button
      >
      <button class="btn btn-success text-white p-4 rounded" on:click={compute}>=</button>
    </div>
  </div>
</main>
