function printHighscores() {
    // Either get scores from localstorage or set to empty array.
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    // Sort the highscores by score property in descending order.
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // Create <li> tag for each high score.
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      // Display on the page.
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  // Run the function when page loads.
  printHighscores();