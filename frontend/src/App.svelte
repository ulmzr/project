<script>
    import { onMount } from "svelte";
    import Router from "svelte-devserver/router";
    import routes from "./routes";

    import E404 from "./cmp/E404.svelte";
    import Sidebar from "./cmp/Sidebar.svelte";

    let cmp,
        params = {},
        query = {};

    const router = Router(routes, E404, (route) => {
        cmp = route.cmp;
        params = route.params;
        query = route.query;
        scrollTo(0, 0);
    });

    onMount(() => {
        router.route();
    });
</script>

<!-- <nav>
    <ul>
        <li><a href="/" class:active={params[0] === ""}>Home</a></li>
        <li><a href="/login?q=test" class:active={params[0] === "login"}>Login</a></li>
        <li><a href="/register" class:active={params[0] === "register"}>Register</a></li>
        <li><a href="/about" class:active={params[0] === "about"}>About</a></li>
    </ul>
</nav> -->

<Sidebar params={params[0]} />

<main>
    {#if cmp}
        <svelte:component this={cmp} {params} {query} />
    {/if}
</main>

<style>
    main {
        padding: 1.5em 2em;
    }
</style>
