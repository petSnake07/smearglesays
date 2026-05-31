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

function getGameSettings() {
  const saved = JSON.parse(localStorage.getItem("pokedrawSettings") || "{}");
  return {
    timeLimit: Number(saved.timeLimit) || 120,
    totalRounds: Number(saved.totalRounds) || 5,
    generations: saved.generations?.length ? saved.generations : [1, 2, 3, 4, 5, 6, 7, 8, 9],
    includeMegas: Boolean(saved.includeMegas),
    includeGmax: Boolean(saved.includeGmax),
    includeRegional: Boolean(saved.includeRegional),
    includeOtherForms: Boolean(saved.includeOtherForms)
  };
}

function setupLoginPage() {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) return;

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
}

function setupCreateAccountPage() {
  const form = document.getElementById("createAccountForm");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const captcha = document.getElementById("captchaCheck").checked;
    const error = document.getElementById("createError");
    const accounts = getAccounts();

    if (!username) {
      error.textContent = "Please enter a username.";
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
  const configOverlay = document.getElementById("configOverlay");
  if (!newGameBtn || !configOverlay) return;

  const closeConfigBtn = document.getElementById("closeConfigBtn");
  const startGameBtn = document.getElementById("startGameBtn");
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

  newGameBtn.addEventListener("click", () => configOverlay.classList.remove("hidden"));
  closeConfigBtn.addEventListener("click", () => configOverlay.classList.add("hidden"));
  configOverlay.addEventListener("click", (event) => {
    if (event.target === configOverlay) configOverlay.classList.add("hidden");
  });

  startGameBtn.addEventListener("click", () => {
    const generations = [...document.querySelectorAll('input[name="generation"]:checked')].map((input) => Number(input.value));
    localStorage.setItem("pokedrawSettings", JSON.stringify({
      timeLimit: Number(document.getElementById("timeLimit").value),
      totalRounds: Number(document.getElementById("totalRounds").value),
      generations: generations.length ? generations : [1, 2, 3, 4, 5, 6, 7, 8, 9],
      includeMegas: document.getElementById("includeMegas").checked,
      includeGmax: document.getElementById("includeGmax").checked,
      includeRegional: document.getElementById("includeRegional").checked,
      includeOtherForms: document.getElementById("includeOtherForms").checked
    }));
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
  const brushBtn = document.getElementById("brushBtn");
  const eraserBtn = document.getElementById("eraserBtn");

  const settings = getGameSettings();
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
    const position = getPointerPosition(event);
    if (activeTool === "fill") {
      floodFill(position.x, position.y);
      return;
    }
    drawing = true;
    draw(event);
  }

  function stopDrawing() {
    drawing = false;
    ctx.beginPath();
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
      scoreMessage: scoreResult?.message ?? ""
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
      <div class="score-modal">
        <h2>AI Score</h2>
        <div id="scoreNumber" class="score-number">--</div>
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
        return { score: 0, message: "No drawing detected yet. Try sketching before pressing Done!" };
      }

      const coverageRatio = Math.min(userStats.count, refStats.count) / Math.max(userStats.count, refStats.count || 1);
      const widthRatio = Math.min(userStats.width, refStats.width) / Math.max(userStats.width, refStats.width || 1);
      const heightRatio = Math.min(userStats.height, refStats.height) / Math.max(userStats.height, refStats.height || 1);
      const sizeSimilarity = (coverageRatio + widthRatio + heightRatio) / 3;
      const centerDistance = Math.hypot(userStats.centerX - refStats.centerX, userStats.centerY - refStats.centerY);
      const centerSimilarity = Math.max(0, 1 - centerDistance / 90);
      const completion = Math.min(1, userStats.count / 900);

      const rawScore = (overlap * 0.45) + (sizeSimilarity * 0.3) + (centerSimilarity * 0.15) + (completion * 0.1);
      const score = Math.max(1, Math.min(100, Math.round(rawScore * 100)));
      let message = "Nice effort! The AI saw some similarity in the overall shape.";
      if (score >= 80) message = "Excellent match! Strong shape, size, and placement similarity.";
      else if (score >= 60) message = "Good job! The drawing has a decent outline match.";
      else if (score >= 35) message = "Not bad! Try matching the Pokémon's silhouette more closely.";
      else message = "Keep practicing! Focus on the biggest outline and main body shape first.";
      return { score, message };
    } catch (error) {
      console.error(error);
      return { score: null, message: "The score could not be calculated, but your drawing was saved." };
    }
  }

  function showScoreThenContinue(scoreResult) {
    const modal = createScoreModal();
    document.getElementById("scoreNumber").textContent = scoreResult.score === null ? "Saved" : `${scoreResult.score}/100`;
    document.getElementById("scoreMessage").textContent = scoreResult.message;
    modal.classList.remove("hidden");
    document.getElementById("scoreContinueBtn").onclick = () => {
      modal.classList.add("hidden");
      advanceRoundAfterDone();
    };
  }

  canvas.addEventListener("pointerdown", startDrawing);
  canvas.addEventListener("pointerup", stopDrawing);
  canvas.addEventListener("pointerleave", stopDrawing);
  canvas.addEventListener("pointermove", draw);

  document.getElementById("color").addEventListener("change", (event) => brushColor = event.target.value);
  document.getElementById("size").addEventListener("change", (event) => brushSize = Number(event.target.value));
  document.getElementById("opacity").addEventListener("change", (event) => brushOpacity = Number(event.target.value));
  document.getElementById("clearBtn").addEventListener("click", clearCanvas);
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
    const randomChoice = getRandomPokemonChoice();
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
      pokemonName.textContent = data.name;
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
    clearCanvas();
    loadRandomPokemon();
    startTimer();
  }

  function nextRound(shouldSave) {
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
    clearCanvas();
    loadRandomPokemon();
    startTimer();
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
      return (a.isForm === b.isForm ? a.id - b.id : a.isForm ? 1 : -1);
    });

    pokedexList.innerHTML = filtered.map((pokemon) => {
      const entry = sketches[pokemon.key || String(pokemon.id)];
      const drawings = entry?.drawings || [];
      const hasDrawings = drawings.length > 0;
      const gallery = hasDrawings
        ? `<div class="sketch-gallery">${drawings.map((drawing, index) => `
            <figure>
              <img src="${drawing.image}" alt="Sketch of ${pokemon.name}">
              <figcaption>Sketch ${index + 1}<br>${drawing.date}${drawing.score !== null && drawing.score !== undefined ? `<br>AI Score: ${drawing.score}/100` : ""}</figcaption>
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

  [searchInput, filterSelect, generationFilter, sortMode].forEach((element) => {
    element.addEventListener(element.tagName === "INPUT" ? "input" : "change", renderPokedex);
  });
  renderPokedex();
}

setupLoginPage();
setupCreateAccountPage();
setupAccountPage();
setupCanvasPage();
setupPokedexPage();
