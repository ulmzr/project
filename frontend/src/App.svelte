<script>
    import { onMount } from "svelte";
    import Router from "../router";
    import routes from "./routes";

    import E404 from "./cmp/E404.svelte";
    import Navbar from "./cmp/Navbar.svelte";
    import Sidebar from "./cmp/Sidebar.svelte";

    let cmp,
        params = {},
        query = {};

    let authenticated = localStorage.getItem("authenticated");

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

<Navbar bind:authenticated />

<Sidebar params={params[0]} {authenticated} />

<main class:authenticated>
    {#if cmp}
        <svelte:component this={cmp} {params} {query} />
    {/if}
</main>

<style>
    main {
        display: block;
        position: relative;
        padding: 1.5em 2em;
        margin-left: 0;
    }

    :global(nav) ~ main {
        padding-top: calc(var(--navbar-height) + 2em);
    }

    @media (min-width: 768px) {
        main.authenticated {
            margin-left: var(--sidebar-width);
        }
    }
</style>
