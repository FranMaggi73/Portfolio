<script lang="ts">
        import { pageTitle } from '../../store/titleStore';
        pageTitle.set('Calculator');

    let currentInput: string = '';
    let previousInput: string = '';
    let operator: string = '';
  
    function appendNumber(number: number | string) {
      if (number === '.' && currentInput.includes('.')) return;
      currentInput = currentInput.toString() + number.toString();
    }
  
    function chooseOperation(selectedOperator: string) {
      if (currentInput === '') return;
      if (previousInput !== '') {
        compute();
      }
      operator = selectedOperator;
      previousInput = currentInput;
      currentInput = '';
    }
  
    function compute() {
      let computation: number;
      const prev = parseFloat(previousInput);
      const current = parseFloat(currentInput);
      if (isNaN(prev) || isNaN(current)) return;
      switch (operator) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '*':
          computation = prev * current;
          break;
        case '÷':
          computation = prev / current;
          break;
        default:
          return;
      }
      currentInput = computation.toString();
      operator = '';
      previousInput = '';
    }
  
    function clear() {
      currentInput = '';
      previousInput = '';
      operator = '';
    }
  
    function deleteLast() {
      currentInput = currentInput.toString().slice(0, -1);
    }
  </script>
  
  <main class="flex items-center justify-center min-h-screen">
    <div class="bg-base-300 p-6 rounded-lg shadow-lg max-w-md w-full">
      <div class="mb-4 flex text-3xl">
        <div>{previousInput} {operator}</div>
        <div class="ml-2">{currentInput}</div>
      </div>
      <div class="grid grid-cols-4 gap-2">
        <button class="col-span-2 bg-red-500 text-white p-4 rounded" on:click={clear}>AC</button>
        <button class="bg-yellow-500 text-white p-4 rounded" on:click={deleteLast}>DEL</button>
        <button class="bg-blue-500 text-white p-4 rounded" on:click={() => chooseOperation('÷')}>÷</button>
  
        <button class="bg-gray-300 text-black p-4 rounded" on:click={() => appendNumber(1)}>1</button>
        <button class="bg-gray-300 text-black p-4 rounded" on:click={() => appendNumber(2)}>2</button>
        <button class="bg-gray-300 text-black p-4 rounded" on:click={() => appendNumber(3)}>3</button>
        <button class="bg-blue-500 text-white p-4 rounded" on:click={() => chooseOperation('*')}>*</button>
  
        <button class="bg-gray-300 text-black p-4 rounded" on:click={() => appendNumber(4)}>4</button>
        <button class="bg-gray-300 text-black p-4 rounded" on:click={() => appendNumber(5)}>5</button>
        <button class="bg-gray-300 text-black p-4 rounded" on:click={() => appendNumber(6)}>6</button>
        <button class="bg-blue-500 text-white p-4 rounded" on:click={() => chooseOperation('+')}>+</button>
  
        <button class="bg-gray-300 text-black p-4 rounded" on:click={() => appendNumber(7)}>7</button>
        <button class="bg-gray-300 text-black p-4 rounded" on:click={() => appendNumber(8)}>8</button>
        <button class="bg-gray-300 text-black p-4 rounded" on:click={() => appendNumber(9)}>9</button>
        <button class="bg-blue-500 text-white p-4 rounded" on:click={() => chooseOperation('-')}>-</button>
  
        <button class="col-span-2  text-black bg-gray-300 p-4 rounded" on:click={() => appendNumber(0)}>0</button>
        <button class="bg-gray-300 text-black p-4 rounded" on:click={() => appendNumber('.')}>.</button>
        <button class="bg-green-500 text-white p-4 rounded" on:click={compute}>=</button>
      </div>
    </div>
  </main>

  