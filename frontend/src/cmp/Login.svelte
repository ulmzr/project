<script>
    export let active;
    export let authenticated;

    function processLogin() {
        active = !active;
        authenticated = true;
        localStorage.setItem("authenticated", true);
    }
</script>

<section>
    <div>Login</div>
    <button class="button" on:click={processLogin}> Submit </button>
</section>

<style>
    section {
        z-index: 99;
        position: fixed;
        inset: 0;
        background-color: #fff;
    }
</style>
