(function ($) {
  "use strict";

  var $game = $("#tetris-game");
  var $stage = $("#tetris-stage");
  var $status = $("#tetris-status");
  var $best = $("#tetris-best");
  var $pause = $("#tetris-pause");
  var $autoplay = $("#tetris-autoplay");
  var $fullscreen = $("#tetris-fullscreen");
  var storageKey = "xinhu-tetris-best";
  var paused = false;
  var autoplay = false;

  if (!$game.length || typeof $.fn.blockrain !== "function") return;

  function getBest() {
    return Number(localStorage.getItem(storageKey) || 0);
  }

  function setBest(score) {
    var best = Math.max(getBest(), Number(score) || 0);
    localStorage.setItem(storageKey, String(best));
    $best.text(best);
  }

  function setStatus(text) {
    $status.text(text);
  }

  function setPauseButton(isPaused) {
    paused = isPaused;
    $pause.attr("aria-pressed", String(isPaused));
    $pause.attr("title", isPaused ? "Resume game" : "Pause game");
    $pause.attr("aria-label", isPaused ? "Resume game" : "Pause game");
    $pause.find("i").attr("class", isPaused ? "fas fa-play" : "fas fa-pause");
  }

  function setAutoplayButton(isAutoplay) {
    autoplay = isAutoplay;
    $autoplay.attr("aria-pressed", String(isAutoplay));
    setStatus(isAutoplay ? "Autoplay" : "Playing");
  }

  var theme = {
    background: "#111417",
    backgroundGrid: "#1e252a",
    stroke: "#111417",
    strokeWidth: 2,
    innerStroke: "rgba(255,255,255,0.18)",
    blocks: {
      line: "#45c9d6",
      square: "#f2ca52",
      arrow: "#c36bd6",
      rightHook: "#ef8b4a",
      leftHook: "#4d83d6",
      rightZag: "#69bd69",
      leftZag: "#df5d62"
    }
  };

  $best.text(getBest());

  $game.blockrain({
    autoplay: false,
    autoplayRestart: true,
    showFieldOnStart: false,
    theme: theme,
    difficulty: "normal",
    speed: 20,
    playText: "Ready?",
    playButtonText: "Play",
    gameOverText: "Game Over",
    restartButtonText: "Play Again",
    scoreText: "Score",
    onStart: function () {
      setPauseButton(false);
      setStatus(autoplay ? "Autoplay" : "Playing");
    },
    onRestart: function () {
      setPauseButton(false);
      setStatus(autoplay ? "Autoplay" : "Playing");
    },
    onGameOver: function (score) {
      setBest(score);
      setPauseButton(false);
      setStatus("Game over");
    },
    onLine: function (lines, increment, score) {
      setBest(score);
    }
  });

  if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
    $game.blockrain("touchControls", true);
  }

  $("#tetris-restart").on("click", function () {
    $game.blockrain("restart");
  });

  $pause.on("click", function () {
    if (paused) {
      $game.blockrain("resume");
      setPauseButton(false);
      setStatus(autoplay ? "Autoplay" : "Playing");
    } else {
      $game.blockrain("pause");
      setPauseButton(true);
      setStatus("Paused");
    }
  });

  $autoplay.on("click", function () {
    setAutoplayButton(!autoplay);
    $game.blockrain("autoplay", autoplay);
  });

  $fullscreen.on("click", function () {
    if (!document.fullscreenElement) {
      $stage.get(0).requestFullscreen().catch(function () {});
    } else {
      document.exitFullscreen();
    }
  });

  document.addEventListener("fullscreenchange", function () {
    var isFullscreen = Boolean(document.fullscreenElement);
    $fullscreen.attr("title", isFullscreen ? "Exit fullscreen" : "Enter fullscreen");
    $fullscreen.attr("aria-label", isFullscreen ? "Exit fullscreen" : "Enter fullscreen");
    $fullscreen.find("i").attr("class", isFullscreen ? "fas fa-compress" : "fas fa-expand");
  });
})(jQuery);
