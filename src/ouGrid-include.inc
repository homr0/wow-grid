<script>
    // Creates a node for the OU-Grid script.
    var rScript = document.createElement("script");
    rScript.type = "text/javascript";
    rScript.src = "/dist/omni.js";

    // Creates a node for the OU-Grid stylesheet.
    var rStyle = document.createElement("link");
    rStyle.rel = "stylesheet";
    rStyle.href = "/dist/omni.css";

    // Appends the nodes to the head of the page.
    var head = document.getElementsByTagName("head").item(0);
    head.appendChild(rScript);
    head.appendChild(rStyle);
</script>
