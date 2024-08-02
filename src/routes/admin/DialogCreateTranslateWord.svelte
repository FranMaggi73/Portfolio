<script lang="ts">
  import type { ClassifiedWord, Word } from '$lib/types';

  export let createTranslatedWordDialog: HTMLDialogElement;

  export let showOptions2: boolean;
  export let classifiedWordNamesWithId: ClassifiedWord[] = [];
  export let selectedWord2 = '';
  export let search2 = '';
  export let index2: number = 0;
  export let pronunciations: string[] = [];
  export let languageCodes: string[] = [];
  export let classification: string[] = [];
  export let gender: string[] = [];
  export let wordNames: string[] = [];
  export let filteredWordNames2 = wordNames;
  export let selectClassifiedWord: ClassifiedWord;
  export let selectWord: Word;

  $: filteredWordNames2 = wordNames.filter((wordName) =>
    wordName.toLowerCase().includes(search2.toLowerCase())
  );

  const selectWord2 = (wordName: string) => {
    selectedWord2 = wordName;
    search2 = wordName;
    showOptions2 = false;
    let selectedWordObject = classifiedWordNamesWithId.find((word) => word.word === wordName);

    if (selectedWordObject) {
      index2 = selectedWordObject.id;
    }
  };
</script>

<dialog bind:this={createTranslatedWordDialog} class="modal modal-middle">
  <div class="modal-box">
    <div>
      <form method="POST" action="?/createTranslation">
        <div
          class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 gap-4"
        >
          <div>
            <h1 class="text-center text-xl font-extrabold">Native word</h1>
            <div class="relative input-container">
              <input
                disabled
                required
                type="text"
                class="input input-bordered font-bold w-full mt-4"
                placeholder={selectWord.name}
              />
              <input
                required
                type="hidden"
                id="classifiedWordID"
                name="classifiedWordID"
                value={selectWord.id}
              />
            </div>
            <div class="flex flex-col items-center mt-2 gap-2 justify-center">
              <div>
                <span class="font-bold">pronunciation: </span>{selectWord.pronunciation}
              </div>
              <div>
                <span class="font-bold">language: </span>{selectWord.language_code}
              </div>
              <div>
                <span class="font-bold">classification: </span>{selectClassifiedWord.classification}
              </div>
              <div>
                <span class="font-bold">gender: </span>{selectClassifiedWord.gender}
              </div>
            </div>
          </div>
          <div>
            <h1 class="text-center text-xl font-extrabold">Learning word</h1>
            <div class="relative input-container">
              <input
                required
                type="text"
                class="input input-bordered font-bold w-full mt-4"
                bind:value={search2}
                placeholder={selectedWord2 || 'Search the word'}
                on:click={() => (showOptions2 = !showOptions2)}
                on:focus={() => {
                  selectedWord2 = '';
                  search2 = '';
                  index2 = 0;
                }}
              />
              <input
                required
                type="hidden"
                id="classifiedWordID2"
                name="classifiedWordID2"
                value={index2 !== undefined ? index2 : ''}
              />
              {#if showOptions2}
                <div
                  class="absolute z-10 bg-base-100 mt-1 w-full border border-base-300 rounded-md overflow-auto max-h-28"
                >
                  {#each filteredWordNames2 as word (word)}
                    <button
                      type="button"
                      class="cursor-pointer hover:bg-base-200 p-2 w-full text-left"
                      on:click={() => selectWord2(word)}
                      >{word}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
            <div class="flex flex-col items-center mt-2 gap-2 justify-center">
              <div>
                <span class="font-bold">pronunciation: </span>{pronunciations[index2 - 1] !==
                undefined
                  ? pronunciations[index2 - 1]
                  : ' '}
              </div>
              <div>
                <span class="font-bold">language: </span>{languageCodes[index2 - 1] !== undefined
                  ? languageCodes[index2 - 1]
                  : ' '}
              </div>
              <div>
                <span class="font-bold">classification: </span>{classification[index2 - 1] !==
                undefined
                  ? classification[index2 - 1]
                  : ' '}
              </div>
              <div>
                <span class="font-bold">gender: </span>{gender[index2 - 1] !== undefined
                  ? gender[index2 - 1]
                  : ' '}
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-center flex-col items-center">
          <div class="flex flex-col mb-4 items-center">
            <label for="invertValues"><span class="font-bold text-accent">reciprocal</span></label>
            <input
              type="checkbox"
              id="invertValues"
              name="invertValues"
              class="mt-2 toggle toggle-primary"
              checked
            />
          </div>
          <button class="btn btn-accent w-1/2" type="submit"> Translate </button>
        </div>
      </form>
      <div class="modal-action">
        <form method="dialog">
          <button class="btn btn-error btn-outline">Close</button>
        </form>
      </div>
    </div>
  </div>
</dialog>
