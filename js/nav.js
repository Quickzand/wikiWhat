function navButtonBuilder(name, link) {
    var navButton = $("<div>").addClass("navButton");
    var navButtonLink = $("<a>").attr("href", link).text(name);
    navButton.append(navButtonLink);
    return navButton;
}


function navBarBuilder() {
    $("#navButtons").empty();
    var playButton = navButtonBuilder("Play", "play.html");
    var aboutButton = navButtonBuilder("About", "about.html");
    $("#navButtons").append(playButton).append(aboutButton);
}


function onLogin() {

}


$("#userIcon img").on("click", function () {
    $("#userMenu").toggleClass("hidden");
});




navBarBuilder();