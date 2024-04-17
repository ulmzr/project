<script>
    export let active;
</script>

<aside>
    <ul>
        <li><a href="/" class:active={active === ""}>Home</a></li>
        <li><a href="/login?q=test" class:active={active === "login"}>Login...</a></li>
        <li><a href="/register" class:active={active === "register"}>Register</a></li>
        <li><a href="/about" class:active={active === "about"}>About</a></li>
    </ul>
</aside>

<style>
    aside {
        --width: 16em;
        --pos: calc(var(--width) * -1);
        --sidebar-bg: #123;

        position: fixed;
        top: 0;
        bottom: 0;
        left: var(--pos);
        background-color: var(--sidebar-bg);
        width: var(--width);
        color: #fff;
    }

    a {
        text-decoration: none;
        color: inherit;
    }

    @media (min-width: 768px) {
        aside {
            left: 0;
        }
    }
</style>
