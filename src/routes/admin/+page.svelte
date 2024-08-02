<script lang="ts">
  import { pageTitle } from '../../store/titleStore';
  import type { PageData } from './$types';
  import CreateWord from './DialogCreateWord.svelte';
  import EditWord from './DialogEditWord.svelte';
  import EditClassifiedWord from './DialogEditClassifiedWord.svelte';
  import DeleteWord from './DialogDeleteWord.svelte';
  import DeleteClassifiedWord from './DialogDeleteClassifiedWord.svelte';
  import EditIcon from '$lib/icons/EditIcon.svelte';
  import DeleteIcon from '$lib/icons/DeleteIcon.svelte';
  import DialogCreateClassifiedWord from './DialogCreateClassifiedWord.svelte';
  import DialogCreateTranslatedWord from './DialogCreateTranslateWord.svelte';
  import DialogCreateGender from './DialgoCreateGender.svelte';
  import DialogDeleteTranslateWord from './DialogDeleteTranslatedWord.svelte';
  import DialogEditGender from './DialogEditGender.svelte';
  import DialogDeleteGender from './DialogDeleteGender.svelte';
  import DialogCreateClassification from './DialogCreateClassification.svelte';
  import DialogDeleteClassification from './DialogDeleteClassification.svelte';
  import DialogEditClassification from './DialogEditClassification.svelte';
  import DialogCreateLanguage from './DialogCreateLanguage.svelte';
  import DialogDeleteLanguage from './DialogDeleteLanguage.svelte';
  import DialogEditLanguage from './DialogEditLanguage.svelte';
  import type { Word } from '$lib/types';
  import type { ClassifiedWord } from '$lib/types';
  pageTitle.set('Dictionary');

  export let data: PageData;

  const { languages, languagesMap, words, classifiedWords, genders, classifications, translation } =
    data;

  let classifiedWordNamesWithId: ClassifiedWord[] = [];
  let wordsWithId: Word[] = [];
  let ids: number[] = [];
  let wordNames: string[] = [];
  let pronunciations: string[] = [];
  let gender: string[] = [];
  let classification: string[] = [];
  let languageCodes: string[] = [];

  words.forEach((word) => {
    wordsWithId.push({ ...word });
    ids.push(word.id);
    wordNames.push(word.name);
    pronunciations.push(word.pronunciation);
    languageCodes.push(word.language_code);
  });

  classifiedWords.forEach((classifiedWord) => {
    classifiedWordNamesWithId.push({ ...classifiedWord });
    classification.push(classifiedWord.classification);
    gender.push(classifiedWord.gender);
  });
  let showOptions2: boolean;
  let search2 = '';
  let selectedWord2 = '';
  let filteredWordNames2 = wordNames;
  let filteredWordNames = wordsWithId;
  let filteredClassifiedWordNames = classifiedWords;
  let filteredTranslatedWordNames = translation;
  let filteredGenderNames = genders;
  let filteredClassicationNames = classifications;
  let filteredLanguageNames = languages;
  let index2: number = 0;
  let createWordDialog: HTMLDialogElement;
  let createClassifiedWordDialog: HTMLDialogElement;
  let editWordDialog: HTMLDialogElement;
  let editClassifiedWordDialog: HTMLDialogElement;
  let deleteWordDialog: HTMLDialogElement;
  let deleteClassifiedWordDialog: HTMLDialogElement;
  let deleteTranslatedWordDialog: HTMLDialogElement;
  let createTranslatedWordDialog: HTMLDialogElement;
  let createGenderDialog: HTMLDialogElement;
  let editGenderDialog: HTMLDialogElement;
  let deleteGenderDialog: HTMLDialogElement;
  let createClassificationDialog: HTMLDialogElement;
  let editClassificationDialog: HTMLDialogElement;
  let deleteClassificationDialog: HTMLDialogElement;
  let createLanguageDialog: HTMLDialogElement;
  let editLanguageDialog: HTMLDialogElement;
  let deleteLanguageDialog: HTMLDialogElement;
  let availableGenders: { id: number; name: string; language_code: string; code: string }[] = [];
  let searchTermWord = '';
  let searchTermGender = '';
  let searchTermClassifiedWord = '';
  let searchTermTranslatedWord = '';
  let searchTermClassifications = '';
  let searchTermLanguages = '';
  let wordToDelete: number = 0;
  let genderToDelete: number = 0;
  let classificationToDelete: number = 0;
  let classifiedWordToDelete: number = 0;
  let translatedWordToDelete: number = 0;
  let languageToDelete: number = 0;

  $: selectWord = { id: 0, name: '', pronunciation: '', language_code: '' };
  $: selectGender = { id: 0, name: '', language_code: '', code: '' };
  $: selectClassification = { ID: 0, Name: '', Code: '' };
  $: selectLanguage = { id: 0, code: '', name: '' };
  $: selectClassifiedWord = {
    id: 0,
    word: '',
    gender_code: '',
    classification_code: '',
    gender: '',
    classification: ''
  };

  $: {
    filteredWordNames2 = wordNames.filter(
      (wordName) =>
        wordName.toLowerCase().includes(search2.toLowerCase()) &&
        wordName.toLowerCase() !== selectedWord2.toLowerCase()
    );
    filteredWordNames = wordsWithId.filter((word) =>
      word.name.toLowerCase().includes(searchTermWord.toLowerCase())
    );
    filteredClassifiedWordNames = classifiedWords.filter((word) =>
      word.word.toLowerCase().includes(searchTermClassifiedWord.toLowerCase())
    );
    filteredTranslatedWordNames = translation.filter((word: { word_details: { name: string } }) =>
      word.word_details.name.toLowerCase().includes(searchTermTranslatedWord.toLowerCase())
    );
    filteredGenderNames = genders.filter((word) =>
      word.name.toLowerCase().includes(searchTermGender.toLowerCase())
    );
    filteredClassicationNames = classifications.filter((word) =>
      word.Name.toLowerCase().includes(searchTermClassifications.toLowerCase())
    );
    filteredLanguageNames = languages.filter((word) =>
      word.code.toLowerCase().includes(searchTermLanguages.toLowerCase())
    );
  }
</script>

<main class="flex-1 flex justify-center items-center pb-6 flex-col px-2">
  <div class="gap-4 mt-4 w-full p-4">
    <div class="shadow-lg rounded-box p-2 mt-8">
      <div class="sticky top-0 z-1 p-2 flex justify-between items-center">
        <div class="w-1/4">
          <input
            type="text"
            class="input input-bordered"
            placeholder="Search..."
            bind:value={searchTermTranslatedWord}
          />
        </div>
        <div class="flex justify-center">
          <h2 class="text-3xl font-black">Translate a Classified Word</h2>
        </div>
        <div class="w-1/5 flex justify-end mt-2 mr-2"></div>
      </div>
      <div class="max-h-96 overflow-y-auto">
        <table class="table w-full">
          <thead>
            <tr>
              <th class="w-1/12">ID</th>
              <th class="w-1/6">Name</th>
              <th class="w-1/6">Pronunciation</th>
              <th class="w-1/6">Language</th>
              <th class="w-1/6">Gender</th>
              <th class="w-1/6">Classification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {#each filteredTranslatedWordNames as word}
              <tr class="hover">
                <th class="w-1/12">{word.word_id}</th>
                <td class="w-1/6">{word.word_details.name}</td>
                <td class="w-1/6">{word.word_details.pronunciation}</td>
                <td class="w-1/6">{languagesMap[word.word_details.language_code]}</td>
                <td class="w-1/6">{word.word_details.gender}</td>
                <td class="w-1/6">{word.word_details.classification}</td>
                <td class="flex gap-4">
                  <button
                    disabled
                    class="btn btn-error"
                    on:click={() => deleteTranslatedWordDialog.show()}
                  >
                    <DeleteIcon />
                  </button>
                  <DialogDeleteTranslateWord
                    bind:deleteTranslatedWordDialog
                    {translatedWordToDelete}
                  />
                </td>
              </tr>
              <tr>
                <th class="w-1/12">Translation:</th>
                <td class="w-1/12">{word.translation_details.name}</td>
                <td class="w-1/6">{word.translation_details.pronunciation}</td>
                <td class="w-1/6">{languagesMap[word.translation_details.language_code]}</td>
                <td class="w-1/6">{word.translation_details.gender}</td>
                <td class="w-1/6">{word.translation_details.classification}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div class="shadow-lg rounded-box p-2 mt-8">
      <div class="sticky top-0 z-1 p-2 flex justify-between items-center">
        <div class="w-1/4">
          <input
            type="text"
            class="input input-bordered"
            placeholder="Search..."
            bind:value={searchTermClassifiedWord}
          />
        </div>
        <div class="flex justify-center">
          <h2 class="text-3xl font-black">Create a classified word</h2>
        </div>
        <div class="w-1/5 flex justify-end mt-2 mr-2"></div>
      </div>
      <table class="table w-full">
        <thead>
          <tr>
            <th class="w-1/12">ID</th>
            <th class="w-1/4">Name</th>
            <th class="w-1/4">Gender</th>
            <th class="w-1/5">Classification</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      <div class="max-h-96 overflow-y-auto">
        <table class="table w-full">
          <tbody>
            {#each filteredClassifiedWordNames as word, i}
              <tr class="hover">
                <th class="w-1/12">{word.id}</th>
                <td class="w-1/4">{word.word}</td>
                <td class="w-1/4">{word.gender}</td>
                <td class="w-1/5">{word.classification}</td>
                <td class="flex gap-4">
                  <button
                    class="btn btn-accent"
                    on:click={() => {
                      selectClassifiedWord = classifiedWords[i];
                      selectWord = words[i];
                      showOptions2 = false;
                      createTranslatedWordDialog.showModal();
                    }}
                  >
                    <EditIcon />
                  </button>
                  <DialogCreateTranslatedWord
                    bind:createTranslatedWordDialog
                    {search2}
                    {index2}
                    {filteredWordNames2}
                    {classifiedWordNamesWithId}
                    {selectedWord2}
                    {pronunciations}
                    {languageCodes}
                    {classification}
                    {gender}
                    {wordNames}
                    {selectClassifiedWord}
                    {selectWord}
                    {showOptions2}
                  />
                  <button
                    class="btn btn-primary"
                    on:click={() => {
                      selectClassifiedWord = classifiedWords[i];
                      selectWord = words[i];
                      availableGenders = genders.filter((gender) => {
                        return gender.language_code === word.language_code;
                      });
                      editClassifiedWordDialog.showModal();
                    }}
                  >
                    <EditIcon />
                  </button>
                  <EditClassifiedWord
                    bind:editClassifiedWordDialog
                    {selectClassifiedWord}
                    {classifications}
                    {availableGenders}
                    {selectWord}
                  />
                  <button
                    class="btn btn-error"
                    on:click={() => {
                      classifiedWordToDelete = word.id;
                    }}
                    on:click={() => deleteClassifiedWordDialog.show()}
                  >
                    <DeleteIcon />
                  </button>
                  <DeleteClassifiedWord bind:deleteClassifiedWordDialog {classifiedWordToDelete} />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div class="shadow-lg rounded-box p-2 mt-8">
      <div class="sticky top-0 z-1 p-2 flex justify-between items-center">
        <div class="w-1/3">
          <input
            type="text"
            class="input input-bordered"
            placeholder="Search..."
            bind:value={searchTermWord}
          />
        </div>
        <div class="w-1/3 flex justify-center">
          <h2 class="text-3xl font-black">Create a word</h2>
        </div>
        <div class="w-1/3 flex justify-end mt-2 mr-2">
          <button
            class="btn btn-accent m-1"
            on:click={() => {
              selectWord = { id: 0, name: '', pronunciation: '', language_code: '' };
            }}
            on:click={() => createWordDialog.showModal()}>Create</button
          >
        </div>
        <CreateWord bind:createWordDialog {languages} />
      </div>
      <table class="table w-full">
        <thead>
          <tr>
            <th class="w-1/12">ID</th>
            <th class="w-1/4">Name</th>
            <th class="w-1/4">Pronunciation</th>
            <th class="w-1/5">Language</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      <div class="max-h-96 overflow-y-auto">
        <table class="table w-full">
          <tbody>
            {#each filteredWordNames as word, i}
              <tr class="hover">
                <th class="w-1/12">{word.id}</th>
                <td class="w-1/4">{word.name}</td>
                <td class="w-1/4">{word.pronunciation}</td>
                <td class="w-1/5">{languagesMap[word.language_code]}</td>
                <td class="flex gap-4">
                  <DialogCreateClassifiedWord
                    bind:createClassifiedWordDialog
                    {selectClassifiedWord}
                    {availableGenders}
                    classifications={data.classifications}
                  />
                  <button
                    class="btn btn-accent"
                    on:click={() => {
                      selectClassifiedWord = {
                        id: word.id,
                        word: word.name,
                        gender: '',
                        gender_code: '',
                        classification_code: '',
                        classification: ''
                      };
                      availableGenders = genders.filter((gender) => {
                        return gender.language_code === word.language_code;
                      });
                      createClassifiedWordDialog.showModal();
                    }}
                  >
                    <EditIcon />
                  </button>
                  <button
                    class="btn btn-primary"
                    on:click={() => (selectWord = words[i])}
                    on:click={() => editWordDialog.showModal()}
                  >
                    <EditIcon />
                  </button>
                  <EditWord bind:editWordDialog {languages} word={selectWord} />
                  <button
                    class="btn btn-error"
                    on:click={() => {
                      wordToDelete = word.id;
                    }}
                    on:click={() => deleteWordDialog.show()}
                  >
                    <DeleteIcon />
                  </button>
                  <DeleteWord bind:deleteWordDialog {wordToDelete} />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div class="shadow-lg rounded-box p-2 mt-8">
      <div class="sticky top-0 z-1 p-2 flex justify-between items-center">
        <div class="w-1/3">
          <input
            type="text"
            class="input input-bordered"
            placeholder="Search..."
            bind:value={searchTermGender}
          />
        </div>
        <div class="w-1/3 flex justify-center">
          <h2 class="text-3xl font-black">Create Gender</h2>
        </div>
        <div class="w-1/3 flex justify-end mt-2 mr-2">
          <button
            class="btn btn-accent m-1"
            on:click={() => {
              createGenderDialog.showModal();
            }}>Create</button
          >
        </div>
        <DialogCreateGender bind:createGenderDialog {languages} />
      </div>
      <table class="table w-full">
        <thead>
          <tr>
            <th class="w-1/12">ID</th>
            <th class="w-1/4">Name</th>
            <th class="w-1/4">Code</th>
            <th class="w-1/5">Language</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      <div class="max-h-96 overflow-y-auto">
        <table class="table w-full">
          <tbody>
            {#each filteredGenderNames as word, i}
              <tr class="hover">
                <th class="w-1/12">{word.id}</th>
                <td class="w-1/4">{word.name}</td>
                <td class="w-1/4">{word.code}</td>
                <td class="w-1/5">{languagesMap[word.language_code]}</td>
                <td class="flex gap-4">
                  <button
                    class="btn btn-primary"
                    on:click={() => (selectGender = genders[i])}
                    on:click={() => editGenderDialog.showModal()}
                  >
                    <EditIcon />
                  </button>
                  <DialogEditGender bind:editGenderDialog {languages} gender={selectGender} />
                  <button
                    class="btn btn-error"
                    on:click={() => {
                      genderToDelete = word.id;
                    }}
                    on:click={() => deleteGenderDialog.show()}
                  >
                    <DeleteIcon />
                  </button>
                  <DialogDeleteGender bind:deleteGenderDialog {genderToDelete} />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div class="shadow-lg rounded-box p-2 mt-8">
      <div class="sticky top-0 z-1 p-2 flex justify-between items-center">
        <div class="w-1/3">
          <input
            type="text"
            class="input input-bordered"
            placeholder="Search..."
            bind:value={searchTermClassifications}
          />
        </div>
        <div class="w-1/3 flex justify-center">
          <h2 class="text-3xl font-black">Create Classification</h2>
        </div>
        <div class="w-1/3 flex justify-end mt-2 mr-2">
          <button
            class="btn btn-accent m-1"
            on:click={() => {
              createClassificationDialog.showModal();
            }}>Create</button
          >
        </div>
        <DialogCreateClassification bind:createClassificationDialog />
      </div>
      <table class="table w-full">
        <thead>
          <tr>
            <th class="w-1/6">ID</th>
            <th class="w-1/3">Name</th>
            <th class="w-1/3">Code</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      <div class="max-h-96 overflow-y-auto">
        <table class="table w-full">
          <tbody>
            {#each filteredClassicationNames as word, i}
              <tr class="hover">
                <th class="w-1/6">{word.ID}</th>
                <td class="w-1/3">{word.Name}</td>
                <td class="w-1/3">{word.Code}</td>
                <td class="flex gap-4">
                  <button
                    class="btn btn-primary"
                    on:click={() => (selectClassification = classifications[i])}
                    on:click={() => editClassificationDialog.showModal()}
                  >
                    <EditIcon />
                  </button>
                  <DialogEditClassification
                    bind:editClassificationDialog
                    classification={selectClassification}
                  />
                  <button
                    class="btn btn-error"
                    on:click={() => {
                      classificationToDelete = word.ID;
                    }}
                    on:click={() => deleteClassificationDialog.show()}
                  >
                    <DeleteIcon />
                  </button>
                  <DialogDeleteClassification
                    bind:deleteClassificationDialog
                    {classificationToDelete}
                  />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
    <div class="shadow-lg rounded-box p-2 mt-8">
      <div class="sticky top-0 z-1 p-2 flex justify-between items-center">
        <div class="w-1/3">
          <input
            type="text"
            class="input input-bordered"
            placeholder="Search..."
            bind:value={searchTermLanguages}
          />
        </div>
        <div class="w-1/3 flex justify-center">
          <h2 class="text-3xl font-black">Create Language</h2>
        </div>
        <div class="w-1/3 flex justify-end mt-2 mr-2">
          <button
            class="btn btn-accent m-1"
            on:click={() => {
              createLanguageDialog.showModal();
            }}>Create</button
          >
        </div>
        <DialogCreateLanguage bind:createLanguageDialog />
      </div>
      <table class="table w-full">
        <thead>
          <tr>
            <th class="w-1/6">ID</th>
            <th class="w-1/3">Name</th>
            <th class="w-1/3">Code</th>
            <th>Actions</th>
          </tr>
        </thead>
      </table>
      <div class="max-h-96 overflow-y-auto">
        <table class="table w-full">
          <tbody>
            {#each filteredLanguageNames as word, i}
              <tr class="hover">
                <th class="w-1/6">{word.id}</th>
                <td class="w-1/3">{word.name}</td>
                <td class="w-1/3">{word.code}</td>
                <td class="flex gap-4">
                  <button
                    class="btn btn-primary"
                    on:click={() => (selectLanguage = languages[i])}
                    on:click={() => editLanguageDialog.showModal()}
                  >
                    <EditIcon />
                  </button>
                  <DialogEditLanguage bind:editLanguageDialog language={selectLanguage} />
                  <button
                    class="btn btn-error"
                    on:click={() => {
                      languageToDelete = word.id;
                    }}
                    on:click={() => deleteLanguageDialog.show()}
                  >
                    <DeleteIcon />
                  </button>
                  <DialogDeleteLanguage bind:deleteLanguageDialog {languageToDelete} />
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
</main>
