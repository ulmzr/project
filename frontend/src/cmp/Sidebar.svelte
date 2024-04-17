<script>
    export let active;
    export let authenticated;
</script>

<aside class:authenticated>
    <ul>
        <li><a href="/" class:active={active === ""}>Home</a></li>
        <li><a href="/login?q=test" class:active={active === "login"}>Login...</a></li>
        <li><a href="/register" class:active={active === "register"}>Register</a></li>
        <li><a href="/about" class:active={active === "about"}>About</a></li>
    </ul>
</aside>

<style>
    aside {
        z-index: 9;
        position: fixed;
        top: 0;
        bottom: 0;
        left: var(--sidebar-left);
        background-color: var(--sidebar-bg);
        width: var(--sidebar-width);
        color: #fff;
    }

    @media (min-width: 768px) {
        aside.authenticated {
            left: 0;
        }
    }
</style>
