<script lang="ts">
  export let translateX: number = 0;
  export let rotate: number = 0;

  let rotateProperty: string = '';
  let translateXProperty: string = '';

  $: if (rotate > 0) {
    rotateProperty = `rotate-[${rotate}deg]`;
  } else if (rotate < 0) {
    rotateProperty = `-rotate-[${Math.abs(rotate)}deg]`;
  }

  $: if (translateX > 0) {
    translateXProperty = `translate-x-[${translateX}]`;
  } else if (translateX < 0) {
    translateXProperty = `-translate-x-[${Math.abs(translateX)}]`;
  }
</script>

<div
  class={`card h-full w-full opacity-100 bg-base-200 ${translateXProperty} ${rotateProperty} card-bordered border-gray-800`}
></div>
