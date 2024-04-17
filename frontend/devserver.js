const serve = require("./serve");
const fs = require("fs/promises");
const path = require("path");

const directoryPath = "src/pages";

function generateRoute() {
    routing(directoryPath)
        .then(async (pages) => {
            // const routes = JSON.stringify(pages, null, 4);
            const routes = pages.join("");
            try {
                await fs.writeFile("src/routes.js", `export default [${routes}]`);
                console.log(`File "routes.js" has been written successfully.`);
            } catch (error) {
                console.error("Error occurred while writing the file:", error);
            }
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

generateRoute();
serve();

async function routing(directory, pages = []) {
    try {
        const files = await fs.readdir(directory);

        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = await fs.stat(filePath);

            if (stat.isDirectory()) {
                // Recursively search subdirectories
                await routing(filePath, pages);
            } else if (file.match(/^[A-Z].*\.svelte$/) || file.startsWith("pageIndex")) {
                // Check if file starts with capital letter or is pageIndex and ends with .xht
                const pagePath = filePath.replaceAll("\\", "/").replace("src/", "./");
                let pathName;
                if (pagePath.endsWith("pageIndex.svelte")) {
                    pathName = path.dirname(pagePath);
                } else {
                    pathName = pagePath.replace(".svelte", "").toLowerCase();
                }
                pathName = pathName.replace("./pages", "") || "/";
                pages.push(`{ path: "${pathName}", page: import("${pagePath}") },`);
            }
        }
        return pages;
    } catch (error) {
        console.error("Error occurred:", error);
        return [];
    }
}
