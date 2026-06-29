const GEN_RANGES = {
  1: [1, 151],
  2: [152, 251],
  3: [252, 386],
  4: [387, 493],
  5: [494, 649],
  6: [650, 721],
  7: [722, 809],
  8: [810, 905],
  9: [906, 1025]
};

const POKEMON_LIMIT = 1025;

// Visiting canvas.html?guest=1 forces a temporary guest session.
if (new URLSearchParams(window.location.search).get("guest") === "1") {
  localStorage.setItem("pokedrawUsername", "Guest");
}


const MEGA_FORMS = [
  "venusaur-mega", "charizard-mega-x", "charizard-mega-y", "blastoise-mega",
  "beedrill-mega", "pidgeot-mega", "alakazam-mega", "slowbro-mega",
  "gengar-mega", "kangaskhan-mega", "pinsir-mega", "gyarados-mega",
  "aerodactyl-mega", "mewtwo-mega-x", "mewtwo-mega-y", "ampharos-mega",
  "steelix-mega", "scizor-mega", "heracross-mega", "houndoom-mega",
  "tyranitar-mega", "sceptile-mega", "blaziken-mega", "swampert-mega",
  "gardevoir-mega", "sableye-mega", "mawile-mega", "aggron-mega",
  "medicham-mega", "manectric-mega", "sharpedo-mega", "camerupt-mega",
  "altaria-mega", "banette-mega", "absol-mega", "glalie-mega",
  "salamence-mega", "metagross-mega", "latias-mega", "latios-mega",
  "rayquaza-mega", "lopunny-mega", "garchomp-mega", "lucario-mega",
  "abomasnow-mega", "gallade-mega", "audino-mega", "diancie-mega"
];

const GMAX_FORMS = [
  "venusaur-gmax", "charizard-gmax", "blastoise-gmax", "butterfree-gmax",
  "pikachu-gmax", "meowth-gmax", "machamp-gmax", "gengar-gmax",
  "kingler-gmax", "lapras-gmax", "eevee-gmax", "snorlax-gmax",
  "garbodor-gmax", "melmetal-gmax", "rillaboom-gmax", "cinderace-gmax",
  "inteleon-gmax", "corviknight-gmax", "orbeetle-gmax", "drednaw-gmax",
  "coalossal-gmax", "flapple-gmax", "appletun-gmax", "sandaconda-gmax",
  "toxtricity-amped-gmax", "centiskorch-gmax", "hatterene-gmax", "grimmsnarl-gmax",
  "alcremie-gmax", "copperajah-gmax", "duraludon-gmax", "urshifu-single-strike-gmax",
  "urshifu-rapid-strike-gmax"
];

const REGIONAL_FORMS = [
  "rattata-alola", "raticate-alola", "raichu-alola", "sandshrew-alola", "sandslash-alola",
  "vulpix-alola", "ninetales-alola", "diglett-alola", "dugtrio-alola", "meowth-alola",
  "persian-alola", "geodude-alola", "graveler-alola", "golem-alola", "grimer-alola",
  "muk-alola", "exeggutor-alola", "marowak-alola",
  "meowth-galar", "ponyta-galar", "rapidash-galar", "slowpoke-galar", "slowbro-galar",
  "farfetchd-galar", "weezing-galar", "mr-mime-galar", "articuno-galar", "zapdos-galar",
  "moltres-galar", "slowking-galar", "corsola-galar", "zigzagoon-galar", "linoone-galar",
  "darumaka-galar", "darmanitan-galar-standard", "yamask-galar", "stunfisk-galar",
  "growlithe-hisui", "arcanine-hisui", "voltorb-hisui", "electrode-hisui", "typhlosion-hisui",
  "qwilfish-hisui", "sneasel-hisui", "samurott-hisui", "lilligant-hisui", "zorua-hisui",
  "zoroark-hisui", "braviary-hisui", "sliggoo-hisui", "goodra-hisui", "avalugg-hisui",
  "decidueye-hisui",
  "tauros-paldea-combat-breed", "tauros-paldea-blaze-breed", "tauros-paldea-aqua-breed", "wooper-paldea"
];

const OTHER_FORMS = [
  "deoxys-attack", "deoxys-defense", "deoxys-speed",
  "wormadam-sandy", "wormadam-trash", "giratina-origin", "shaymin-sky",
  "rotom-heat", "rotom-wash", "rotom-frost", "rotom-fan", "rotom-mow",
  "basculin-blue-striped", "basculin-white-striped", "darmanitan-zen", "tornadus-therian",
  "thundurus-therian", "landorus-therian", "keldeo-resolute", "meloetta-pirouette",
  "aegislash-blade", "pumpkaboo-small", "pumpkaboo-large", "pumpkaboo-super",
  "gourgeist-small", "gourgeist-large", "gourgeist-super", "zygarde-10", "zygarde-complete",
  "hoopa-unbound", "oricorio-pom-pom", "oricorio-pau", "oricorio-sensu",
  "lycanroc-midnight", "lycanroc-dusk", "wishiwashi-school", "minior-orange-meteor",
  "mimikyu-busted", "toxtricity-low-key", "eiscue-noice", "indeedee-female",
  "morpeko-hangry", "zacian-crowned", "zamazenta-crowned", "eternatus-eternamax",
  "urshifu-rapid-strike", "basculegion-female", "enamorus-therian",
  "oinkologne-female", "maushold-family-of-three", "palafin-hero", "tatsugiri-droopy",
  "tatsugiri-stretchy", "dudunsparce-three-segment", "gimmighoul-roaming", "ogerpon-wellspring-mask",
  "ogerpon-hearthflame-mask", "ogerpon-cornerstone-mask", "terapagos-terastal", "terapagos-stellar"
];


function getAccounts() {
  return JSON.parse(localStorage.getItem("pokedrawAccounts") || "{}");
}

function saveAccounts(accounts) {
  localStorage.setItem("pokedrawAccounts", JSON.stringify(accounts));
}

function getUsername() {
  return localStorage.getItem("pokedrawUsername") || "Guest";
}

function getCurrentAccount() {
  return getAccounts()[getUsername()] || null;
}

function formatDate(dateString) {
  if (!dateString) return "Guest session";
  return new Date(dateString).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

function getSketchStorageKey() {
  return `pokedrawSketches_${getUsername()}`;
}

function getStoredSketches() {
  return JSON.parse(localStorage.getItem(getSketchStorageKey()) || "{}");
}

function saveStoredSketches(sketches) {
  localStorage.setItem(getSketchStorageKey(), JSON.stringify(sketches));
}

function getDrawnPokemonCount() {
  return Object.values(getStoredSketches()).filter((entry) => entry?.drawings?.length).length;
}


function getStatsKey() {
  return `pokedrawStats_${getUsername()}`;
}

function getUserStats() {
  return JSON.parse(localStorage.getItem(getStatsKey()) || JSON.stringify({
    roundsPlayed: 0,
    savedDrawings: 0,
    totalScore: 0,
    scoredDrawings: 0,
    bestScore: null,
    lastPlayed: "",
    dailyStreak: 0,
    lastDailyDate: ""
  }));
}

function saveUserStats(stats) {
  localStorage.setItem(getStatsKey(), JSON.stringify(stats));
}

function recordDrawingStats(scoreResult = null, isDaily = false) {
  const stats = getUserStats();
  stats.roundsPlayed = Number(stats.roundsPlayed || 0) + 1;
  stats.savedDrawings = Number(stats.savedDrawings || 0) + 1;
  stats.lastPlayed = new Date().toISOString();

  if (scoreResult && typeof scoreResult.score === "number") {
    stats.scoredDrawings = Number(stats.scoredDrawings || 0) + 1;
    stats.totalScore = Number(stats.totalScore || 0) + scoreResult.score;
    stats.bestScore = Math.max(Number(stats.bestScore || 0), scoreResult.score);
  }

  if (isDaily) {
    const today = todayKey();
    if (stats.lastDailyDate !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      stats.dailyStreak = stats.lastDailyDate === yesterday ? Number(stats.dailyStreak || 0) + 1 : 1;
      stats.lastDailyDate = today;
    }
  }

  saveUserStats(stats);
}

function getAchievementData() {
  const stats = getUserStats();
  const drawn = getDrawnPokemonCount();
  const best = Number(stats.bestScore || 0);

  return [
    { name: "First Sketch", unlocked: drawn >= 1, hint: "Save your first drawing." },
    { name: "Pokédex Starter", unlocked: drawn >= 10, hint: "Draw 10 Pokémon." },
    { name: "Sketch Marathon", unlocked: Number(stats.roundsPlayed || 0) >= 25, hint: "Play 25 rounds." },
    { name: "Professor Approved", unlocked: best >= 80, hint: "Score 80+ on a drawing." },
    { name: "Daily Painter", unlocked: Number(stats.dailyStreak || 0) >= 3, hint: "Complete 3 daily challenges in a row." },
    { name: "Completionist", unlocked: drawn >= 1025, hint: "Draw every listed Pokémon." }
  ];
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function getDailyPokemonId() {
  const today = todayKey();
  let hash = 0;
  for (let i = 0; i < today.length; i++) hash = (hash * 31 + today.charCodeAt(i)) >>> 0;
  return (hash % POKEMON_LIMIT) + 1;
}

function formatPokemonName(name) {
  return String(name || "").split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("-");
}

function startDailyChallenge() {
  const dailyId = getDailyPokemonId();
  localStorage.setItem("pokedrawSettings", JSON.stringify({
    timeLimit: 120,
    totalRounds: 1,
    generations: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    includeMegas: false,
    includeGmax: false,
    includeRegional: false,
    includeOtherForms: false,
    gameMode: "solo",
    lobbyCode: "",
    forcedPokemonChoice: dailyId,
    dailyChallenge: true,
    dailyDate: todayKey()
  }));
  sessionStorage.removeItem("pokedrawLobbyCode");
  window.location.href = "canvas.html";
}

async function setupDailyChallengeCards() {
  const cards = document.querySelectorAll(".daily-card");
  if (!cards.length) return;
  const dailyId = getDailyPokemonId();
  let name = `Pokémon #${dailyId}`;
  let image = "";
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${dailyId}`);
    const data = await response.json();
    name = formatPokemonName(data.name);
    image = data.sprites.other["official-artwork"].front_default || data.sprites.front_default || "";
  } catch (error) {
    console.error(error);
  }
  document.querySelectorAll("#dailyHomeName, #dailyAccountName").forEach((element) => element.textContent = name);
  document.querySelectorAll("#dailyHomeImage, #dailyAccountImage").forEach((element) => {
    if (image) element.src = image;
    element.alt = name;
  });
  document.querySelectorAll("#dailyHomeBtn, #dailyAccountBtn").forEach((button) => button.addEventListener("click", startDailyChallenge));
}

function getGameSettings() {
  const saved = JSON.parse(localStorage.getItem("pokedrawSettings") || "{}");
  return {
    timeLimit: Number(saved.timeLimit) || 120,
    totalRounds: Number(saved.totalRounds) || 5,
    generations: saved.generations?.length ? saved.generations : [1, 2, 3, 4, 5, 6, 7, 8, 9],
    includeMegas: Boolean(saved.includeMegas),
    includeGmax: Boolean(saved.includeGmax),
    includeRegional: Boolean(saved.includeRegional),
    includeOtherForms: Boolean(saved.includeOtherForms),
    gameMode: saved.gameMode || "solo",
    lobbyCode: saved.lobbyCode || "",
    forcedPokemonChoice: saved.forcedPokemonChoice || null,
    dailyChallenge: Boolean(saved.dailyChallenge),
    dailyDate: saved.dailyDate || ""
  };
}

function getLobbies() {
  return JSON.parse(localStorage.getItem("pokedrawLobbies") || "{}");
}

function saveLobbies(lobbies) {
  localStorage.setItem("pokedrawLobbies", JSON.stringify(lobbies));
}

function makeLobbyCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) code += alphabet[Math.floor(Math.random() * alphabet.length)];
  return code;
}

function getPlayerName() {
  return sessionStorage.getItem("pokedrawPlayerName") || getUsername();
}

function normalizeAnswer(text) {
  return String(text || "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function guessMatchesAnswer(guess, answer) {
  const guessText = normalizeAnswer(guess);
  const keywords = normalizeAnswer(answer).split(" ").filter(Boolean);
  return keywords.length > 0 && keywords.every((word) => guessText.includes(word));
}

function setupLoginPage() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

  const forgotOverlay = document.getElementById("forgotOverlay");
  const resetOverlay = document.getElementById("resetOverlay");
  const forgotBtn = document.getElementById("forgotPasswordBtn");
  const closeForgotBtn = document.getElementById("closeForgotBtn");
  const sendResetBtn = document.getElementById("sendResetBtn");
  const finishResetBtn = document.getElementById("finishResetBtn");

  function getResetTokens() {
    return JSON.parse(localStorage.getItem("pokedrawResetTokens") || "{}");
  }

  function saveResetTokens(tokens) {
    localStorage.setItem("pokedrawResetTokens", JSON.stringify(tokens));
  }

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;
    const error = document.getElementById("loginError");
    const accounts = getAccounts();

    if (!accounts[username] || accounts[username].password !== password) {
      error.textContent = "Username or password does not match.";
      return;
    }

    localStorage.setItem("pokedrawUsername", username);
    window.location.href = "account.html";
  });

  forgotBtn?.addEventListener("click", () => {
    document.getElementById("forgotMessage").textContent = "";
    forgotOverlay?.classList.remove("hidden");
  });

  closeForgotBtn?.addEventListener("click", () => forgotOverlay?.classList.add("hidden"));
  forgotOverlay?.addEventListener("click", (event) => {
    if (event.target === forgotOverlay) forgotOverlay.classList.add("hidden");
  });

  sendResetBtn?.addEventListener("click", () => {
    const username = document.getElementById("forgotUsername").value.trim();
    const email = document.getElementById("forgotEmail").value.trim().toLowerCase();
    const message = document.getElementById("forgotMessage");
    const accounts = getAccounts();
    const account = accounts[username];

    if (!username || !email) {
      message.textContent = "Please enter both your username and email.";
      return;
    }

    if (!account || String(account.email || "").toLowerCase() !== email) {
      message.textContent = "The email is not associated with that username.";
      return;
    }

    const token = `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const tokens = getResetTokens();
    tokens[token] = {
      username,
      expiresAt: Date.now() + 1000 * 60 * 30
    };
    saveResetTokens(tokens);

    const resetLink = `${window.location.origin}${window.location.pathname}?reset=${encodeURIComponent(token)}`;
    const mailto = `mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent("Smeargle Says password reset")}&body=${encodeURIComponent(`Use this link to reset your Smeargle Says password:\n\n${resetLink}\n\nThis demo reset link works in this browser for 30 minutes.`)}`;

    message.innerHTML = `Reset link created for <strong>${email}</strong>.<br><a href="${mailto}">Open email draft</a> or <a href="${resetLink}">reset now</a>.`;
  });

  const resetToken = new URLSearchParams(window.location.search).get("reset");
  if (resetToken && resetOverlay) {
    resetOverlay.classList.remove("hidden");
  }

  finishResetBtn?.addEventListener("click", () => {
    const message = document.getElementById("resetMessage");
    const password = document.getElementById("resetPassword").value;
    const confirmPassword = document.getElementById("resetConfirmPassword").value;
    const tokens = getResetTokens();
    const reset = tokens[resetToken];

    if (!reset || reset.expiresAt < Date.now()) {
      message.textContent = "This reset link is invalid or expired.";
      return;
    }
    if (password.length < 8) {
      message.textContent = "Password must be at least 8 characters.";
      return;
    }
    if (password !== confirmPassword) {
      message.textContent = "Passwords do not match.";
      return;
    }

    const accounts = getAccounts();
    if (!accounts[reset.username]) {
      message.textContent = "Account not found.";
      return;
    }

    accounts[reset.username].password = password;
    saveAccounts(accounts);
    delete tokens[resetToken];
    saveResetTokens(tokens);
    localStorage.setItem("pokedrawUsername", reset.username);
    message.textContent = "Password reset! Redirecting...";
    setTimeout(() => window.location.href = "account.html", 900);
  });
}

function setupCreateAccountPage() {
  const form = document.getElementById("createAccountForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("newUsername").value.trim();
    const email = document.getElementById("newEmail").value.trim().toLowerCase();
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const captcha = document.getElementById("captchaCheck").checked;
    const error = document.getElementById("createError");
    const accounts = getAccounts();

    if (!username) {
      error.textContent = "Please enter a username.";
      return;
    }
    if (!email || !email.includes("@")) {
      error.textContent = "Please enter a valid email address.";
      return;
    }
    if (Object.values(accounts).some((account) => String(account.email || "").toLowerCase() === email)) {
      error.textContent = "That email is already being used.";
      return;
    }
    if (accounts[username]) {
      error.textContent = "That username is already taken.";
      return;
    }
    if (password.length < 8) {
      error.textContent = "Password must be at least 8 characters.";
      return;
    }
    if (password !== confirmPassword) {
      error.textContent = "Passwords do not match.";
      return;
    }
    if (!captcha) {
      error.textContent = "Please check the CAPTCHA box.";
      return;
    }

    accounts[username] = {
      username,
      email,
      password,
      createdAt: new Date().toISOString(),
      avatar: ""
    };
    saveAccounts(accounts);
    localStorage.setItem("pokedrawUsername", username);
    window.location.href = "account.html";
  });
}

function setupAccountPage() {
  const newGameBtn = document.getElementById("newGameBtn");
  const joinGameBtn = document.getElementById("joinGameBtn");
  const configOverlay = document.getElementById("configOverlay");
  if (!newGameBtn || !configOverlay) return;

  const closeConfigBtn = document.getElementById("closeConfigBtn");
  const startGameBtn = document.getElementById("startGameBtn");
  const lobbyCodeInput = document.getElementById("lobbyCode");
  const joinOverlay = document.getElementById("joinOverlay");
  const closeJoinBtn = document.getElementById("closeJoinBtn");
  const joinStartBtn = document.getElementById("joinStartBtn");
  const profileName = document.getElementById("profileName");
  const drawnCount = document.getElementById("drawnCount");
  const createdDate = document.getElementById("createdDate");
  const avatarButton = document.getElementById("avatarButton");
  const avatarImage = document.getElementById("avatarImage");
  const avatarOverlay = document.getElementById("avatarOverlay");
  const closeAvatarBtn = document.getElementById("closeAvatarBtn");
  const avatarChoices = document.getElementById("avatarChoices");

  const account = getCurrentAccount();
  profileName.textContent = getUsername();
  drawnCount.textContent = getDrawnPokemonCount();
  createdDate.textContent = account ? formatDate(account.createdAt) : "Guest session";

  if (account?.avatar) {
    avatarImage.src = account.avatar;
    avatarImage.classList.remove("hidden");
    avatarButton.classList.add("has-avatar");
  }

  function renderAvatarChoices() {
    const sketches = getStoredSketches();
    const drawings = Object.values(sketches).flatMap((entry) =>
      (entry.drawings || []).map((drawing) => ({
        image: drawing.image,
        name: entry.name,
        date: drawing.date
      }))
    );

    if (!drawings.length) {
      avatarChoices.innerHTML = '<p class="empty-gallery">No saved sketches yet. Finish a round with Done first.</p>';
      return;
    }

    avatarChoices.innerHTML = drawings.map((drawing, index) => `
      <button class="avatar-choice" data-index="${index}">
        <img src="${drawing.image}" alt="${drawing.name} sketch">
        <span>${drawing.name}</span>
      </button>
    `).join("");

    avatarChoices.querySelectorAll(".avatar-choice").forEach((button) => {
      button.addEventListener("click", () => {
        const selected = drawings[Number(button.dataset.index)];
        const accounts = getAccounts();
        if (accounts[getUsername()]) {
          accounts[getUsername()].avatar = selected.image;
          saveAccounts(accounts);
        }
        avatarImage.src = selected.image;
        avatarImage.classList.remove("hidden");
        avatarButton.classList.add("has-avatar");
        avatarOverlay.classList.add("hidden");
      });
    });
  }

  avatarButton.addEventListener("click", () => {
    renderAvatarChoices();
    avatarOverlay.classList.remove("hidden");
  });
  closeAvatarBtn.addEventListener("click", () => avatarOverlay.classList.add("hidden"));

  function renderProfileExtras() {
    const stats = getUserStats();
    const avg = stats.scoredDrawings ? Math.round(stats.totalScore / stats.scoredDrawings) : null;
    const setText = (id, value) => {
      const el = document.getElementById(id);
      if (el) el.textContent = value;
    };

    setText("statRounds", stats.roundsPlayed || 0);
    setText("statBestScore", stats.bestScore ? `${stats.bestScore}/100` : "--");
    setText("statAvgScore", avg ? `${avg}/100` : "--");
    setText("statStreak", stats.dailyStreak || 0);

    const list = document.getElementById("achievementList");
    if (list) {
      list.innerHTML = getAchievementData().map((achievement) => `
        <div class="achievement ${achievement.unlocked ? "unlocked" : "locked"}">
          <span>${achievement.unlocked ? "🏆" : "○"}</span>
          <strong>${achievement.name}</strong>
          <small>${achievement.hint}</small>
        </div>
      `).join("");
    }
  }

  renderProfileExtras();

  const savedSettings = getGameSettings();
  document.getElementById("timeLimit").value = savedSettings.timeLimit;
  document.getElementById("totalRounds").value = savedSettings.totalRounds;
  document.querySelectorAll('input[name="generation"]').forEach((input) => {
    input.checked = savedSettings.generations.includes(Number(input.value));
  });
  document.getElementById("includeMegas").checked = savedSettings.includeMegas;
  document.getElementById("includeGmax").checked = savedSettings.includeGmax;
  document.getElementById("includeRegional").checked = savedSettings.includeRegional;
  document.getElementById("includeOtherForms").checked = savedSettings.includeOtherForms;
  const savedModeInput = document.querySelector(`input[name="gameMode"][value="${savedSettings.gameMode}"]`);
  if (savedModeInput) savedModeInput.checked = true;
  lobbyCodeInput.value = savedSettings.lobbyCode || makeLobbyCode();

  newGameBtn.addEventListener("click", () => {
    if (!lobbyCodeInput.value) lobbyCodeInput.value = makeLobbyCode();
    configOverlay.classList.remove("hidden");
  });
  closeConfigBtn.addEventListener("click", () => configOverlay.classList.add("hidden"));
  configOverlay.addEventListener("click", (event) => {
    if (event.target === configOverlay) configOverlay.classList.add("hidden");
  });

  if (joinGameBtn && joinOverlay) {
    joinGameBtn.addEventListener("click", () => joinOverlay.classList.remove("hidden"));
    closeJoinBtn.addEventListener("click", () => joinOverlay.classList.add("hidden"));
    joinOverlay.addEventListener("click", (event) => {
      if (event.target === joinOverlay) joinOverlay.classList.add("hidden");
    });
    joinStartBtn.addEventListener("click", () => {
      const code = document.getElementById("joinLobbyCode").value.trim().toUpperCase();
      const playerName = document.getElementById("joinPlayerName").value.trim() || getUsername();
      const error = document.getElementById("joinError");
      const lobbies = getLobbies();
      if (!code || !lobbies[code]) {
        error.textContent = "Lobby code not found on this browser. A real online version needs a WebSocket backend.";
        return;
      }
      if (!lobbies[code].players.includes(playerName)) lobbies[code].players.push(playerName);
      saveLobbies(lobbies);
      localStorage.setItem("pokedrawSettings", JSON.stringify(lobbies[code].settings));
      sessionStorage.setItem("pokedrawLobbyCode", code);
      sessionStorage.setItem("pokedrawPlayerName", playerName);
      window.location.href = "canvas.html";
    });
  }

  startGameBtn.addEventListener("click", () => {
    const generations = [...document.querySelectorAll('input[name="generation"]:checked')].map((input) => Number(input.value));
    const selectedMode = document.querySelector('input[name="gameMode"]:checked')?.value || "solo";
    const lobbyCode = lobbyCodeInput.value || makeLobbyCode();
    const settings = {
      timeLimit: Number(document.getElementById("timeLimit").value),
      totalRounds: Number(document.getElementById("totalRounds").value),
      generations: generations.length ? generations : [1, 2, 3, 4, 5, 6, 7, 8, 9],
      includeMegas: document.getElementById("includeMegas").checked,
      includeGmax: document.getElementById("includeGmax").checked,
      includeRegional: document.getElementById("includeRegional").checked,
      includeOtherForms: document.getElementById("includeOtherForms").checked,
      gameMode: selectedMode,
      lobbyCode,
      forcedPokemonChoice: null,
      dailyChallenge: false,
      dailyDate: ""
    };
    localStorage.setItem("pokedrawSettings", JSON.stringify(settings));
    sessionStorage.setItem("pokedrawLobbyCode", lobbyCode);
    sessionStorage.setItem("pokedrawPlayerName", getUsername());
    const lobbies = getLobbies();
    lobbies[lobbyCode] = {
      code: lobbyCode,
      createdAt: new Date().toISOString(),
      settings,
      players: [getUsername()],
      round: 1,
      artistIndex: 0,
      currentPokemonChoice: null,
      chainDrawings: {},
      competitiveScores: {}
    };
    saveLobbies(lobbies);
    window.location.href = "canvas.html";
  });
}

function setupCanvasPage() {
  const canvas = document.getElementById("canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  const pokemonName = document.getElementById("pokemonName");
  const pokemonImage = document.getElementById("pokemonImage");
  const timerElement = document.querySelector(".timer");
  const roundNumber = document.getElementById("roundNumber");
  const giveUpBtn = document.getElementById("giveUpBtn");
  const doneBtn = document.getElementById("doneBtn");
  const fillBtn = document.getElementById("fillBtn");
  const undoBtn = document.getElementById("undoBtn");
  const redoBtn = document.getElementById("redoBtn");
  const brushBtn = document.getElementById("brushBtn");
  const eraserBtn = document.getElementById("eraserBtn");

  const settings = getGameSettings();
  const lobbyCode = sessionStorage.getItem("pokedrawLobbyCode") || settings.lobbyCode || "";
  const playerName = getPlayerName();
  const isMultiplayer = settings.gameMode && settings.gameMode !== "solo";
  const channel = isMultiplayer && lobbyCode ? new BroadcastChannel(`pokedraw_${lobbyCode}`) : null;
  let lobbyState = lobbyCode ? getLobbies()[lobbyCode] : null;
  if (isMultiplayer && lobbyCode && !lobbyState) {
    const lobbies = getLobbies();
    lobbies[lobbyCode] = {
      code: lobbyCode,
      createdAt: new Date().toISOString(),
      settings,
      players: [playerName],
      round: 1,
      artistIndex: 0,
      currentPokemonChoice: null,
      chainDrawings: {},
      competitiveScores: {}
    };
    saveLobbies(lobbies);
    lobbyState = lobbies[lobbyCode];
  }
  if (lobbyState && !lobbyState.players.includes(playerName)) {
    lobbyState.players.push(playerName);
    const lobbies = getLobbies();
    lobbies[lobbyCode] = lobbyState;
    saveLobbies(lobbies);
  }
  let drawing = false;
  let activeTool = "brush";
  let brushColor = "#000000";
  let brushSize = 5;
  let brushOpacity = 1;
  let timeLeft = settings.timeLimit;
  let timerInterval;
  let round = 1;
  let currentPokemon = null;
  let blankCanvas = canvas.toDataURL("image/png");
  let undoStack = [];
  let redoStack = [];

  function pushUndoState() {
    undoStack.push(canvas.toDataURL("image/png"));
    if (undoStack.length > 30) undoStack.shift();
    redoStack = [];
  }

  function restoreCanvasState(dataUrl) {
    const image = new Image();
    image.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      broadcastCanvasSnapshot();
    };
    image.src = dataUrl;
  }

  function undoCanvas() {
    if (!undoStack.length) return;
    redoStack.push(canvas.toDataURL("image/png"));
    restoreCanvasState(undoStack.pop());
  }

  function redoCanvas() {
    if (!redoStack.length) return;
    undoStack.push(canvas.toDataURL("image/png"));
    restoreCanvasState(redoStack.pop());
  }


  function getRoundArtist() {
    const lobby = lobbyCode ? getLobbies()[lobbyCode] : null;
    const players = lobby?.players?.length ? lobby.players : [playerName];
    const index = ((round - 1) % players.length + players.length) % players.length;
    return players[index];
  }

  function amArtist() {
    return !isMultiplayer || settings.gameMode !== "guessing" || getRoundArtist() === playerName;
  }

  function updateLobbyPatch(patch) {
    if (!lobbyCode) return;
    const lobbies = getLobbies();
    const current = lobbies[lobbyCode] || lobbyState || {};
    lobbies[lobbyCode] = { ...current, ...patch };
    lobbyState = lobbies[lobbyCode];
    saveLobbies(lobbies);
  }

  function createMultiplayerPanel() {
    if (!isMultiplayer) return;
    const modeTitle = settings.gameMode === "guessing" ? "Guessing Game" : settings.gameMode === "buildon" ? "Build-on" : "Competitive";
    const rightPanel = document.querySelector(".reference");
    rightPanel.classList.add("multiplayer-side");
    if (settings.gameMode === "guessing" && !amArtist()) {
      rightPanel.innerHTML = `
        <h3>${modeTitle}</h3>
        <p class="helper-text">Lobby <strong>${lobbyCode}</strong></p>
        <p>Artist: <strong id="artistName">${getRoundArtist()}</strong></p>
        <p>Your guesses:</p>
        <div id="guessLog" class="guess-log"></div>
        <input id="guessInput" class="guess-input" placeholder="Type a guess">
        <button id="guessSubmitBtn" class="small-action">Guess</button>
      `;
      canvas.classList.add("spectator-canvas");
      document.querySelectorAll(".toolbar button, .toolbar input").forEach((control) => control.disabled = true);
      document.getElementById("guessSubmitBtn").addEventListener("click", submitGuess);
      document.getElementById("guessInput").addEventListener("keydown", (event) => {
        if (event.key === "Enter") submitGuess();
      });
    } else if (settings.gameMode === "guessing") {
      rightPanel.insertAdjacentHTML("afterbegin", `<p class="helper-text">Lobby <strong>${lobbyCode}</strong><br>You are the artist. Others are guessing.</p>`);
    } else if (settings.gameMode === "buildon") {
      rightPanel.insertAdjacentHTML("afterbegin", `<p class="helper-text">Lobby <strong>${lobbyCode}</strong><br>Each round passes the previous sketch to the next player. Press Done to save your layer.</p>`);
    } else if (settings.gameMode === "competitive") {
      rightPanel.insertAdjacentHTML("afterbegin", `<p class="helper-text">Lobby <strong>${lobbyCode}</strong><br>Everyone gets the same prompt. Done saves and scores your entry.</p>`);
    }
  }

  function appendGuessLine(text) {
    const log = document.getElementById("guessLog");
    if (!log) return;
    const line = document.createElement("p");
    line.textContent = text;
    log.appendChild(line);
    log.scrollTop = log.scrollHeight;
  }

  function submitGuess() {
    const input = document.getElementById("guessInput");
    if (!input || !currentPokemon) return;
    const guess = input.value.trim();
    if (!guess) return;
    input.value = "";
    const correct = guessMatchesAnswer(guess, currentPokemon.name);
    appendGuessLine(`${playerName}: ${guess}${correct ? " ✓" : ""}`);
    channel?.postMessage({ type: "guess", playerName, guess, correct, answer: currentPokemon.name });
    if (correct) {
      alert(`${playerName} guessed ${currentPokemon.name}!`);
      channel?.postMessage({ type: "roundComplete", reason: "correctGuess", playerName });
      nextRound(false);
    }
  }

  function broadcastCanvasSnapshot() {
    if (!channel || settings.gameMode !== "guessing" || !amArtist()) return;
    channel.postMessage({ type: "canvasSnapshot", image: canvas.toDataURL("image/png") });
  }

  function setActiveTool(tool) {
    activeTool = tool;
    [brushBtn, eraserBtn, fillBtn].forEach((button) => button.classList.remove("active-tool"));
    if (tool === "brush") brushBtn.classList.add("active-tool");
    if (tool === "eraser") eraserBtn.classList.add("active-tool");
    if (tool === "fill") fillBtn.classList.add("active-tool");
  }

  function getPointerPosition(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: Math.floor((event.clientX - rect.left) * (canvas.width / rect.width)),
      y: Math.floor((event.clientY - rect.top) * (canvas.height / rect.height))
    };
  }

  function hexToRgba(hex, alpha) {
    const value = hex.replace("#", "");
    return [
      parseInt(value.slice(0, 2), 16),
      parseInt(value.slice(2, 4), 16),
      parseInt(value.slice(4, 6), 16),
      Math.round(alpha * 255)
    ];
  }

  function colorsMatch(data, index, target) {
    return data[index] === target[0] && data[index + 1] === target[1] && data[index + 2] === target[2] && data[index + 3] === target[3];
  }

  function floodFill(startX, startY) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const startIndex = (startY * canvas.width + startX) * 4;
    const target = [data[startIndex], data[startIndex + 1], data[startIndex + 2], data[startIndex + 3]];
    const fill = hexToRgba(brushColor, brushOpacity);

    if (target.every((value, index) => value === fill[index])) return;

    const stack = [[startX, startY]];
    while (stack.length) {
      const [x, y] = stack.pop();
      if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) continue;
      const index = (y * canvas.width + x) * 4;
      if (!colorsMatch(data, index, target)) continue;
      data[index] = fill[0];
      data[index + 1] = fill[1];
      data[index + 2] = fill[2];
      data[index + 3] = fill[3];
      stack.push([x + 1, y], [x - 1, y], [x, y + 1], [x, y - 1]);
    }
    ctx.putImageData(imageData, 0, 0);
  }

  function startDrawing(event) {
    if (settings.gameMode === "guessing" && !amArtist()) return;
    const position = getPointerPosition(event);
    if (activeTool === "fill") {
      pushUndoState();
      floodFill(position.x, position.y);
      broadcastCanvasSnapshot();
      return;
    }
    pushUndoState();
    drawing = true;
    draw(event);
  }

  function stopDrawing() {
    drawing = false;
    ctx.beginPath();
    broadcastCanvasSnapshot();
  }

  function draw(event) {
    if (!drawing || activeTool === "fill") return;
    const position = getPointerPosition(event);
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.strokeStyle = activeTool === "eraser" ? "#fafafa" : brushColor;
    ctx.globalAlpha = activeTool === "eraser" ? 1 : brushOpacity;
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(position.x, position.y);
    ctx.globalAlpha = 1;
  }

  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blankCanvas = canvas.toDataURL("image/png");
  }

  function clearCanvasWithUndo() {
    pushUndoState();
    clearCanvas();
    broadcastCanvasSnapshot();
  }

  function saveCurrentDrawing(scoreResult = null) {
    if (!currentPokemon) return null;
    const image = canvas.toDataURL("image/png");
    if (image === blankCanvas) return null;

    const sketches = getStoredSketches();
    const pokemonKey = currentPokemon.key || String(currentPokemon.id);
    if (!sketches[pokemonKey]) {
      sketches[pokemonKey] = {
        id: currentPokemon.id,
        key: pokemonKey,
        name: currentPokemon.name,
        generation: currentPokemon.generation,
        isForm: currentPokemon.isForm,
        drawings: []
      };
    }
    const savedDrawing = {
      image,
      date: new Date().toLocaleString(),
      round,
      score: scoreResult?.score ?? null,
      scoreMessage: scoreResult?.message ?? "",
      scoreBreakdown: scoreResult?.breakdown ?? null
    };
    sketches[pokemonKey].drawings.unshift(savedDrawing);
    saveStoredSketches(sketches);
    return savedDrawing;
  }

  function createScoreModal() {
    let modal = document.getElementById("scoreOverlay");
    if (modal) return modal;
    modal = document.createElement("div");
    modal.id = "scoreOverlay";
    modal.className = "modal-overlay hidden";
    modal.innerHTML = `
      <div class="score-modal detailed-score-modal">
        <h2>Score</h2>
        <div id="scoreNumber" class="score-number">--</div>
        <div id="scoreBreakdown" class="score-breakdown" aria-live="polite"></div>
        <p id="scoreMessage">Comparing your drawing...</p>
        <button id="scoreContinueBtn">Next Round</button>
      </div>
    `;
    document.body.appendChild(modal);
    return modal;
  }

  function getImageDataFromSource(source, width = 128, height = 128) {
    const temp = document.createElement("canvas");
    temp.width = width;
    temp.height = height;
    const tempCtx = temp.getContext("2d", { willReadFrequently: true });
    tempCtx.fillStyle = "#fafafa";
    tempCtx.fillRect(0, 0, width, height);
    if (source instanceof HTMLCanvasElement) {
      tempCtx.drawImage(source, 0, 0, width, height);
    } else {
      tempCtx.drawImage(source, 0, 0, width, height);
    }
    return tempCtx.getImageData(0, 0, width, height);
  }

  function buildUserMask(imageData) {
    const mask = [];
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      const isInk = a > 10 && !(r > 235 && g > 235 && b > 235);
      mask.push(isInk ? 1 : 0);
    }
    return mask;
  }

  function buildReferenceMask(imageData) {
    const mask = [];
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i], g = data[i + 1], b = data[i + 2], a = data[i + 3];
      const visiblePokemonPixel = a > 30 && !(r > 245 && g > 245 && b > 245);
      mask.push(visiblePokemonPixel ? 1 : 0);
    }
    return mask;
  }

  function getMaskStats(mask, width = 128) {
    let count = 0;
    let minX = width, minY = width, maxX = 0, maxY = 0;
    mask.forEach((value, index) => {
      if (!value) return;
      count++;
      const x = index % width;
      const y = Math.floor(index / width);
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x);
      maxY = Math.max(maxY, y);
    });
    if (!count) return { count: 0, area: 0, centerX: 0, centerY: 0, width: 0, height: 0 };
    return {
      count,
      area: (maxX - minX + 1) * (maxY - minY + 1),
      centerX: (minX + maxX) / 2,
      centerY: (minY + maxY) / 2,
      width: maxX - minX + 1,
      height: maxY - minY + 1
    };
  }

  function compareMasks(userMask, referenceMask) {
    let intersection = 0;
    let union = 0;
    for (let i = 0; i < userMask.length; i++) {
      if (userMask[i] && referenceMask[i]) intersection++;
      if (userMask[i] || referenceMask[i]) union++;
    }
    return union ? intersection / union : 0;
  }

  function scoreCurrentDrawing() {
    try {
      const userData = getImageDataFromSource(canvas);
      const referenceData = getImageDataFromSource(pokemonImage);
      const userMask = buildUserMask(userData);
      const referenceMask = buildReferenceMask(referenceData);
      const overlap = compareMasks(userMask, referenceMask);
      const userStats = getMaskStats(userMask);
      const refStats = getMaskStats(referenceMask);

      if (!userStats.count) {
        return {
          score: 0,
          message: "No drawing detected yet. Try sketching before pressing Done!",
          breakdown: { outline: 0, proportions: 0, placement: 0, detail: 0 }
        };
      }

      const coverageRatio = Math.min(userStats.count, refStats.count) / Math.max(userStats.count, refStats.count || 1);
      const widthRatio = Math.min(userStats.width, refStats.width) / Math.max(userStats.width, refStats.width || 1);
      const heightRatio = Math.min(userStats.height, refStats.height) / Math.max(userStats.height, refStats.height || 1);
      const sizeSimilarity = (coverageRatio + widthRatio + heightRatio) / 3;
      const centerDistance = Math.hypot(userStats.centerX - refStats.centerX, userStats.centerY - refStats.centerY);
      const centerSimilarity = Math.max(0, 1 - centerDistance / 90);
      const completion = Math.min(1, userStats.count / 900);

      const outlineScore = Math.max(0, Math.min(100, Math.round(overlap * 100)));
      const proportionsScore = Math.max(0, Math.min(100, Math.round(sizeSimilarity * 100)));
      const placementScore = Math.max(0, Math.min(100, Math.round(centerSimilarity * 100)));
      const detailScore = Math.max(0, Math.min(100, Math.round(completion * 100)));

      const rawScore = (outlineScore * 0.45) + (proportionsScore * 0.3) + (placementScore * 0.15) + (detailScore * 0.1);
      const score = Math.max(1, Math.min(100, Math.round(rawScore)));
      let message = "Nice effort! The AI saw some similarity in the overall shape.";
      if (score >= 80) message = "Excellent match! Strong outline, proportions, and placement.";
      else if (score >= 60) message = "Good job! The drawing has a decent silhouette match.";
      else if (score >= 35) message = "Not bad! Try matching the Pokémon's biggest shapes more closely.";
      else message = "Keep practicing! Focus on the main body shape first.";
      return {
        score,
        message,
        breakdown: {
          outline: outlineScore,
          proportions: proportionsScore,
          placement: placementScore,
          detail: detailScore
        }
      };
    } catch (error) {
      console.error(error);
      return {
        score: null,
        message: "The score could not be calculated, but your drawing was saved.",
        breakdown: null
      };
    }
  }

  function makeScoreBar(label, value) {
    const safeValue = Math.max(0, Math.min(100, Number(value) || 0));
    const filled = Math.round(safeValue / 10);
    const blocks = "".repeat(filled) + "".repeat(10 - filled);
    return `
      <div class="score-row">
        <span class="score-label">${label}</span>
        <span class="score-bar-text" aria-hidden="true">${blocks}</span>
        <span class="score-value">${safeValue}</span>
        <div class="score-bar-track"><div class="score-bar-fill" style="width:${safeValue}%"></div></div>
      </div>
    `;
  }

  function showScoreThenContinue(scoreResult) {
    const modal = createScoreModal();
    document.getElementById("scoreNumber").textContent = scoreResult.score === null ? "Saved" : `${scoreResult.score}/100`;
    document.getElementById("scoreMessage").textContent = scoreResult.message;
    const breakdown = scoreResult.breakdown || { outline: 0, proportions: 0, placement: 0, detail: 0 };
    document.getElementById("scoreBreakdown").innerHTML = `
      ${makeScoreBar("Outline", breakdown.outline)}
      ${makeScoreBar("Proportions", breakdown.proportions)}
      ${makeScoreBar("Placement", breakdown.placement)}
      ${makeScoreBar("Detail", breakdown.detail)}
    `;
    modal.classList.remove("hidden");
    document.getElementById("scoreContinueBtn").onclick = () => {
      modal.classList.add("hidden");
      advanceRoundAfterDone();
    };
  }


  if (channel) {
    channel.onmessage = (event) => {
      const message = event.data || {};
      if (message.type === "canvasSnapshot" && settings.gameMode === "guessing" && !amArtist()) {
        const image = new Image();
        image.onload = () => {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
        };
        image.src = message.image;
      }
      if (message.type === "guess") {
        appendGuessLine(`${message.playerName}: ${message.guess}${message.correct ? " ✓" : ""}`);
        if (message.correct && settings.gameMode === "guessing") {
          alert(`${message.playerName} guessed ${message.answer}!`);
        }
      }
      if (message.type === "roundComplete" && settings.gameMode === "guessing") {
        nextRound(false, true);
      }
      if (message.type === "nextRound") {
        round = message.round;
        roundNumber.textContent = `Round ${round}`;
        timeLeft = settings.timeLimit;
        clearCanvas();
        loadRandomPokemon();
        startTimer();
      }
    };
  }

  canvas.addEventListener("pointerdown", startDrawing);
  canvas.addEventListener("pointerup", stopDrawing);
  canvas.addEventListener("pointerleave", stopDrawing);
  canvas.addEventListener("pointermove", draw);

  document.getElementById("color").addEventListener("change", (event) => brushColor = event.target.value);
  document.getElementById("size").addEventListener("change", (event) => brushSize = Number(event.target.value));
  document.getElementById("opacity").addEventListener("change", (event) => brushOpacity = Number(event.target.value));
  document.getElementById("clearBtn").addEventListener("click", clearCanvasWithUndo);
  undoBtn?.addEventListener("click", undoCanvas);
  redoBtn?.addEventListener("click", redoCanvas);
  eraserBtn.addEventListener("click", () => setActiveTool("eraser"));
  brushBtn.addEventListener("click", () => setActiveTool("brush"));
  fillBtn.addEventListener("click", () => setActiveTool("fill"));
  giveUpBtn.addEventListener("click", () => nextRound(false));
  doneBtn.addEventListener("click", () => nextRound(true));

  function getGenerationById(id) {
    const numericId = Number(id);
    for (const [generation, range] of Object.entries(GEN_RANGES)) {
      if (numericId >= range[0] && numericId <= range[1]) return Number(generation);
    }
    return "bonus";
  }

  function buildPokemonPool() {
    const basePokemon = [];
    settings.generations.forEach((generation) => {
      const [min, max] = GEN_RANGES[generation] || GEN_RANGES[1];
      for (let id = min; id <= max; id++) basePokemon.push(id);
    });
    const bonusForms = [];
    if (settings.includeMegas) bonusForms.push(...MEGA_FORMS);
    if (settings.includeGmax) bonusForms.push(...GMAX_FORMS);
    if (settings.includeRegional) bonusForms.push(...REGIONAL_FORMS);
    if (settings.includeOtherForms) bonusForms.push(...OTHER_FORMS);
    return [...basePokemon, ...bonusForms];
  }

  const pokemonPool = buildPokemonPool();
  const getRandomPokemonChoice = () => pokemonPool[Math.floor(Math.random() * pokemonPool.length)] || 1;

  async function loadRandomPokemon() {
    let randomChoice = settings.forcedPokemonChoice || getRandomPokemonChoice();
    if (isMultiplayer && lobbyCode) {
      const lobby = getLobbies()[lobbyCode];
      if (lobby?.currentPokemonChoice) randomChoice = lobby.currentPokemonChoice;
      else updateLobbyPatch({ currentPokemonChoice: randomChoice, round });
    }
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomChoice}`);
      const data = await response.json();
      const isForm = typeof randomChoice === "string" || data.id > POKEMON_LIMIT;
      currentPokemon = {
        id: data.id,
        key: isForm ? data.name : String(data.id),
        name: data.name,
        generation: isForm ? "bonus" : getGenerationById(data.id),
        isForm
      };
      pokemonName.textContent = formatPokemonName(data.name);
      pokemonImage.crossOrigin = "anonymous";
      pokemonImage.src = data.sprites.other["official-artwork"].front_default || data.sprites.front_default;
      pokemonImage.alt = data.name;
    } catch (error) {
      pokemonName.textContent = "Error loading Pokémon";
      console.error(error);
    }
  }

  function startTimer() {
    clearInterval(timerInterval);
    timerElement.textContent = timeLeft;
    timerInterval = setInterval(() => {
      timeLeft--;
      timerElement.textContent = timeLeft;
      if (timeLeft <= 0) nextRound(false);
    }, 1000);
  }

  function advanceRoundAfterDone() {
    if (round >= settings.totalRounds) {
      clearInterval(timerInterval);
      alert("Game over! Your scored drawings were added to your Pokédex.");
      window.location.href = "account.html";
      return;
    }
    round++;
    roundNumber.textContent = `Round ${round}`;
    timeLeft = settings.timeLimit;
    if (isMultiplayer && lobbyCode) {
      updateLobbyPatch({ round, artistIndex: (round - 1), currentPokemonChoice: null });
      channel?.postMessage({ type: "nextRound", round });
    }
    clearCanvas();
    loadRandomPokemon();
    startTimer();
  }

  function nextRound(shouldSave, fromRemote = false) {
    if (shouldSave) {
      clearInterval(timerInterval);
      const scoreResult = scoreCurrentDrawing();
      saveCurrentDrawing(scoreResult);
      showScoreThenContinue(scoreResult);
      return;
    }
    if (round >= settings.totalRounds) {
      clearInterval(timerInterval);
      alert("Game over!");
      window.location.href = "account.html";
      return;
    }
    round++;
    roundNumber.textContent = `Round ${round}`;
    timeLeft = settings.timeLimit;
    if (isMultiplayer && lobbyCode) {
      updateLobbyPatch({ round, artistIndex: (round - 1), currentPokemonChoice: null });
      if (!fromRemote) channel?.postMessage({ type: "nextRound", round });
    }
    clearCanvas();
    loadRandomPokemon();
    startTimer();
  }

  createMultiplayerPanel();
  if (settings.gameMode === "guessing" && !amArtist()) {
    doneBtn.disabled = true;
    giveUpBtn.disabled = true;
  }
  setActiveTool("brush");
  roundNumber.textContent = `Round ${round}`;
  clearCanvas();
  loadRandomPokemon();
  startTimer();
}

function getGenerationById(id) {
  const numericId = Number(id);
  for (const [generation, range] of Object.entries(GEN_RANGES)) {
    if (numericId >= range[0] && numericId <= range[1]) return Number(generation);
  }
  return "bonus";
}

async function setupPokedexPage() {
  const pokedexList = document.getElementById("pokedexList");
  if (!pokedexList) return;

  const searchInput = document.getElementById("pokedexSearch");
  const filterSelect = document.getElementById("pokedexFilter");
  const generationFilter = document.getElementById("generationFilter");
  const sortMode = document.getElementById("sortMode");
  const countElement = document.getElementById("pokedexDrawnCount");
  const sketches = getStoredSketches();
  countElement.textContent = getDrawnPokemonCount();

  let pokemonList = [];
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${POKEMON_LIMIT}&offset=0`);
    const data = await response.json();
    const baseList = data.results.map((pokemon, index) => ({
      id: index + 1,
      key: String(index + 1),
      name: pokemon.name,
      generation: getGenerationById(index + 1),
      isForm: false
    }));
    const drawnForms = Object.values(sketches).filter((entry) => entry.isForm).map((entry) => ({
      id: entry.id,
      key: entry.key || entry.name,
      name: entry.name,
      generation: "bonus",
      isForm: true
    }));
    pokemonList = [...baseList, ...drawnForms];
  } catch (error) {
    console.error(error);
    pokedexList.innerHTML = '<p class="loading-text">Could not load the Pokédex. Check your internet connection.</p>';
    return;
  }

  function renderPokedex() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    const filter = filterSelect.value;
    const generation = generationFilter.value;
    const sort = sortMode.value;

    let filtered = pokemonList.filter((pokemon) => {
      const entry = sketches[pokemon.key || String(pokemon.id)];
      const hasDrawings = Boolean(entry?.drawings?.length);
      const matchesSearch = pokemon.name.includes(searchTerm) || String(pokemon.id).includes(searchTerm);
      const matchesGeneration = generation === "all" || String(pokemon.generation) === generation;
      if (!matchesSearch || !matchesGeneration) return false;
      if (filter === "drawn") return hasDrawings;
      if (filter === "missing") return !hasDrawings;
      return true;
    });

    filtered.sort((a, b) => {
      const aDrawn = Boolean(sketches[a.key || String(a.id)]?.drawings?.length);
      const bDrawn = Boolean(sketches[b.key || String(b.id)]?.drawings?.length);
      if (sort === "az") return a.name.localeCompare(b.name);
      if (sort === "za") return b.name.localeCompare(a.name);
      if (sort === "drawnFirst") return Number(bDrawn) - Number(aDrawn) || a.id - b.id;
      if (sort === "missingFirst") return Number(aDrawn) - Number(bDrawn) || a.id - b.id;
      if (sort === "latestDrawn") {
        const latestA = Math.max(...(sketches[a.key || String(a.id)]?.drawings || []).map((drawing) => Date.parse(drawing.date) || 0), 0);
        const latestB = Math.max(...(sketches[b.key || String(b.id)]?.drawings || []).map((drawing) => Date.parse(drawing.date) || 0), 0);
        return latestB - latestA || Number(bDrawn) - Number(aDrawn) || a.id - b.id;
      }
      return (a.isForm === b.isForm ? a.id - b.id : a.isForm ? 1 : -1);
    });

    pokedexList.innerHTML = filtered.map((pokemon) => {
      const entry = sketches[pokemon.key || String(pokemon.id)];
      const drawings = entry?.drawings || [];
      const hasDrawings = drawings.length > 0;
      const gallery = hasDrawings
        ? `<div class="sketch-gallery">${drawings.map((drawing, index) => `
            <figure class="sketch-card">
              <img src="${drawing.image}" alt="Sketch of ${pokemon.name}">
              <div class="sketch-actions">
                <button class="sketch-maximize" type="button" data-image="${drawing.image}" data-title="${formatPokemonName(pokemon.name)} sketch ${index + 1}">Maximize</button>
                <a class="sketch-download" href="${drawing.image}" download="${pokemon.name}-sketch-${index + 1}.png">Download</a>
              </div>
              <figcaption>Sketch ${index + 1}<br>${drawing.date}${drawing.score !== null && drawing.score !== undefined ? `<br>Score: ${drawing.score}/100` : ""}</figcaption>
            </figure>`).join("")}</div>`
        : '<p class="empty-gallery">No sketches yet.</p>';

      return `<details class="pokedex-entry ${hasDrawings ? "drawn" : "missing"}">
        <summary>
          <span>${pokemon.isForm ? "Bonus" : `#${String(pokemon.id).padStart(4, "0")}`} ${pokemon.name}</span>
          <span class="draw-status">${hasDrawings ? `Drawn (${drawings.length})` : "Not drawn"}</span>
        </summary>
        ${gallery}
      </details>`;
    }).join("");
  }

  pokedexList.addEventListener("click", (event) => {
    const button = event.target.closest(".sketch-maximize");
    if (!button) return;
    let overlay = document.getElementById("sketchLightbox");
    if (!overlay) {
      overlay = document.createElement("div");
      overlay.id = "sketchLightbox";
      overlay.className = "modal-overlay hidden sketch-lightbox";
      overlay.innerHTML = `
        <section class="sketch-lightbox-card">
          <button id="closeSketchLightbox" class="close-button" type="button">×</button>
          <h2 id="sketchLightboxTitle">Sketch</h2>
          <img id="sketchLightboxImage" alt="Expanded sketch">
        </section>`;
      document.body.appendChild(overlay);
      overlay.addEventListener("click", (lightboxEvent) => {
        if (lightboxEvent.target === overlay || lightboxEvent.target.id === "closeSketchLightbox") overlay.classList.add("hidden");
      });
    }
    document.getElementById("sketchLightboxTitle").textContent = button.dataset.title || "Sketch";
    document.getElementById("sketchLightboxImage").src = button.dataset.image;
    overlay.classList.remove("hidden");
  });

  [searchInput, filterSelect, generationFilter, sortMode].forEach((element) => {
    element.addEventListener(element.tagName === "INPUT" ? "input" : "change", renderPokedex);
  });
  renderPokedex();
}

setupDailyChallengeCards();
setupLoginPage();
setupCreateAccountPage();
setupAccountPage();
setupCanvasPage();
setupPokedexPage();
