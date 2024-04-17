<script>
    export let authenticated;

    import Login from "./Login.svelte";

    let showLogin = false;

    function processLogout() {
        authenticated = !authenticated;
        localStorage.clear();
    }
</script>

<nav class:authenticated>
    <span>
        <img src="/img/uisi.png" alt="uisi" />
    </span>
    <ul>
        <li><a href="/">Home</a></li>
        <li>
            {#if !authenticated}
                <button on:click={() => (showLogin = !showLogin)}>Login</button>
            {:else}
                <button on:click={processLogout}>Logout</button>
            {/if}
        </li>
    </ul>
</nav>

{#if showLogin}
    <Login bind:active={showLogin} bind:authenticated />
{/if}

<style>
    nav {
        z-index: 9;
        position: fixed;
        display: flex;
        align-items: center;
        justify-content: space-between;
        top: 0;
        height: var(--navbar-height);
        background-color: var(--navbar-bg);
        color: #fff;
        left: 0;
        right: 0;
        padding: 0 1em;
    }

    nav > span {
        height: 100%;
        padding: 0.5em;
    }

    img {
        height: inherit;
    }

    ul {
        display: flex;
        gap: 1em;
    }

    @media (min-width: 768px) {
        nav.authenticated {
            left: var(--sidebar-width);
        }
    }
</style>
