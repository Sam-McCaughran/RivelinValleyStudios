async function loadPartials() {
    const header = await fetch('./partials/header.html');
    const footer = await fetch('./partials/footer.html');
    document.getElementById('header').innerHTML = await header.text();
    document.getElementById('footer').innerHTML = await footer.text();
}

loadPartials();
