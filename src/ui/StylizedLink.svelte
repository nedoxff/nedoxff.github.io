<script lang="ts">
	import { MAIN_ANIMATION_DURATION, show } from "$lib";

    export let text: string;
    export let destination: string;

    const onClicked = () => {
        show.set(false);
        setTimeout(() => {
            window.history.replaceState(null, "", destination);
            window.location.reload();
        }, MAIN_ANIMATION_DURATION + 200);
    }
</script>

<button on:click={onClicked} class="flex justify-center items-center rounded-full transition-all ease-in-out-quad duration-[500] cursor-pointer hover:bg-black border-black border-2">
    <h2 class="text-4xl hover:text-white py-3 px-5">{text}</h2>
</button>