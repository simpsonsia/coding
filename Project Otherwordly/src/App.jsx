import { useMemo, useState } from "react";
import "./App.css";


const ROSTER = [
  {
    id: "jun", name: "Jun Meguri", title: "Prisoner", role: "BRUTE", age: 14,
    color: "#75d6e8", initials: "JM", description: "A close-range fighter whose power reflects confinement and pressure.",
    maxHp: 118, attack: 19, moves: [
      { id: "chain", name: "Chain Strike", type: "attack", power: 1.15, text: "A fast, close-range chain attack.", cost: "No cost" },
      { id: "shackles", name: "Shackles", type: "weaken", power: 0.75, text: "Deals damage and weakens the enemy's next attack.", cost: "Tactical" },
      { id: "noescape", name: "No Escape", type: "heavy", power: 2.1, text: "A heavy strike fueled by desperation.", cost: "Special" },
    ],
    unlockSkills: [
      { level: 5, id: "pole-sweep", name: "Metal Pole Sweep", type: "heavy", power: 1.55, text: "Swings his metal pole in a brutal sweeping strike.", cost: "Level 5 · Metal pole" },
      { level: 10, id: "shiv-stab", name: "Shiv Strike", type: "attack", power: 1.65, text: "A quick, dangerous shiv attack at close range.", cost: "Level 10 · Shiv" },
      { level: 15, id: "chain-snare", name: "Chain Snare", type: "weaken", power: 1.15, text: "Catches the enemy in his chain, dealing damage and weakening its next attack.", cost: "Level 15 · Chains" },
      { level: 20, id: "prison-break", name: "Prison Break", type: "heavy", power: 2.8, text: "Combines his chain, metal pole, and shiv into a desperate finishing assault.", cost: "Level 20 · Signature skill" },
    ],
  },
  {
    id: "stella", name: "Stella Ann", title: "Android", role: "SUPPORT", age: 14,
    color: "#a5b9ff", initials: "SA", description: "A tactical support fighter who analyzes threats and strengthens allies.",
    maxHp: 92, attack: 15, moves: [
      { id: "pulse", name: "Pulse Shot", type: "attack", power: 1.1, text: "A precise ranged energy shot.", cost: "No cost" },
      { id: "analysis", name: "Combat Analysis", type: "expose", power: 0.65, text: "Deals damage and exposes a weakness, increasing the next hit.", cost: "Tactical" },
      { id: "overclock", name: "Overclock", type: "teamheal", power: 0.18, text: "Restores a little health to every active ally.", cost: "Support" },
    ],
    unlockSkills: [
      { level: 5, id: "precision-burst", name: "Precision Burst", type: "attack", power: 1.5, text: "Fires a concentrated energy burst at the target.", cost: "Level 5 · Energy module" },
      { level: 10, id: "threat-mark", name: "Threat Mark", type: "expose", power: 1.0, text: "Analyzes and strikes a weak point, exposing the enemy.", cost: "Level 10 · Targeting system" },
      { level: 15, id: "emergency-repair", name: "Emergency Repair", type: "teamheal", power: 0.28, text: "Uses her support systems to restore more health to the active party.", cost: "Level 15 · Repair protocol" },
      { level: 20, id: "limitless-overclock", name: "Limitless Overclock", type: "teamheal", power: 0.42, text: "Pushes her systems past their limit to restore substantial party health.", cost: "Level 20 · Ultimate protocol" },
    ],
  },
  {
    id: "shizuka", name: "Shizuka Meguri", title: "Executioner", role: "BRUTE", age: 21,
    color: "#ff8d9a", initials: "SM", description: "A powerful frontline fighter who will do anything to protect Jun.",
    maxHp: 132, attack: 22, moves: [
      { id: "cut", name: "Executioner's Cut", type: "attack", power: 1.2, text: "A hard-hitting blade strike.", cost: "No cost" },
      { id: "intercept", name: "Intercept", type: "guard", power: 0, text: "Braces herself, reducing the next hit she takes.", cost: "Defense" },
      { id: "judgment", name: "Last Judgment", type: "heavy", power: 2.25, text: "A devastating execution strike.", cost: "Special" },
    ],
    unlockSkills: [
      { level: 5, id: "crosscut", name: "Crosscut", type: "attack", power: 1.5, text: "A fast double-direction blade cut.", cost: "Level 5 · Blade" },
      { level: 10, id: "guard-break", name: "Guard Break", type: "weaken", power: 1.25, text: "A heavy blade strike that also weakens the enemy's next attack.", cost: "Level 10 · Blade technique" },
      { level: 15, id: "protect-jun", name: "Protective Intercept", type: "guard", power: 0, text: "Takes a defensive stance to reduce the next hit she takes.", cost: "Level 15 · Defensive technique" },
      { level: 20, id: "execution-storm", name: "Execution Storm", type: "heavy", power: 2.85, text: "Unleashes a relentless sequence of devastating blade strikes.", cost: "Level 20 · Signature skill" },
    ],
  },
  {
    id: "rebecca", name: "Rebecca Ann", title: "Knight", role: "BRUTE", age: 16,
    color: "#e8c77b", initials: "RA", description: "A defensive knight who protects others, often at her own expense.",
    maxHp: 250, attack: 17, moves: [
      { id: "slash", name: "Knight's Slash", type: "attack", power: 1.05, text: "A dependable sword strike.", cost: "No cost" },
      { id: "takehit", name: "Take the Hit", type: "guard", power: 0, text: "Reduces incoming damage and protects the active party this turn.", cost: "Defense" },
      { id: "who", name: "If I Won't, Who Will?", type: "teamguard", power: 0, text: "Greatly reduces the next enemy attack against the team.", cost: "Special" },
    ],
    unlockSkills: [
      { level: 5, id: "shield-bash", name: "Shield Bash", type: "attack", power: 1.4, text: "Slams her shield into the enemy at close range.", cost: "Level 5 · Shield" },
      { level: 10, id: "iron-wall", name: "Iron Wall", type: "guard", power: 0, text: "Sets her shield and braces against the next incoming hit.", cost: "Level 10 · Shield defense" },
      { level: 15, id: "knight-cover", name: "Knight's Cover", type: "teamguard", power: 0, text: "Protects the entire active party with a disciplined defensive formation.", cost: "Level 15 · Knight training" },
      { level: 20, id: "unyielding-oath", name: "Unyielding Oath", type: "teamguard", power: 0, text: "Raises her strongest team-wide defense, refusing to let an ally fall.", cost: "Level 20 · Signature skill" },
    ],
  },
  {
    id: "flora", name: "Flora Garcia", title: "Sister", role: "SPECIALIST", age: 14,
    color: "#d6a6ff", initials: "FG", description: "Flora can only pray until her God answers with Harm or Grace.",
    maxHp: 100, attack: 14, moves: [],
    unlockSkills: [
      { level: 5, id: "harmful-answer", name: "Condemning Answer", type: "blessedAttack", power: 2.0, blessing: "harm", text: "Channels a stronger Harm blessing into the enemy.", cost: "Level 5 · Harm blessing" },
      { level: 10, id: "graceful-answer", name: "Gentle Grace", type: "blessedHeal", power: 52, blessing: "grace", text: "Restores a larger amount of health to one ally.", cost: "Level 10 · Grace blessing" },
      { level: 15, id: "divine-punishment", name: "Divine Punishment", type: "blessedAttack", power: 2.5, blessing: "harm", text: "Calls down a devastating Harm attack.", cost: "Level 15 · Harm blessing" },
      { level: 20, id: "miracle", name: "Miracle", type: "blessedHeal", power: 80, blessing: "grace", text: "A powerful act of Grace that restores a great deal of health to one ally.", cost: "Level 20 · Grace blessing" },
    ],
  },
  {
    id: "raymond", name: "Raymond Dixion", title: "Pugilist", role: "BRUTE", age: 15,
    color: "#f5a56f", initials: "RD", description: "A fast boxer who relies on combinations and counterattacks.",
    maxHp: 108, attack: 18, moves: [
      { id: "combo", name: "One-Two Combo", type: "attack", power: 1.25, text: "A quick two-punch combination.", cost: "No cost" },
      { id: "counter", name: "Counterpunch", type: "counter", power: 1.15, text: "Prepares to retaliate after the enemy attacks.", cost: "Defense" },
      { id: "rush", name: "Knockout Rush", type: "heavy", power: 1.95, text: "A rapid flurry of heavy punches.", cost: "Special" },
    ],
    unlockSkills: [
      { level: 5, id: "hook", name: "Rib-Shattering Hook", type: "attack", power: 1.5, text: "A powerful hook aimed at the enemy's center of mass.", cost: "Level 5 · Boxing" },
      { level: 10, id: "slip-counter", name: "Slip Counter", type: "counter", power: 1.55, text: "Dodges into position to counterattack after the enemy strikes.", cost: "Level 10 · Footwork" },
      { level: 15, id: "body-blow", name: "Body Blow", type: "weaken", power: 1.45, text: "A crushing body shot that weakens the enemy's next attack.", cost: "Level 15 · Boxing technique" },
      { level: 20, id: "champion-combo", name: "Champion's Combination", type: "heavy", power: 2.7, text: "A flawless series of punches delivered at full force.", cost: "Level 20 · Signature skill" },
    ],
  },

  {
    id: "emily", name: "Emily \"Maria\" Moore", title: "Police Officer", role: "SPECIALIST", age: 14,
    color: "#e8e1d5", initials: "EM", description: "A sharp, uncompromising officer who balances direct pressure with tactical support.",
    maxHp: 112, attack: 18, moves: [
      { id: "verdict", name: "Cracked Verdict", type: "expose", power: 0.9, text: "Strikes the target and exposes a weakness, increasing the next hit.", cost: "Tactical" },
      { id: "badgebreaker", name: "Badge Breaker", type: "attack", power: 1.35, text: "A decisive close-range strike backed by her Specialist training.", cost: "No cost" },
      { id: "coverorder", name: "Cover Order", type: "teamguard", power: 0, text: "Calls the team into a defensive formation, reducing the next enemy attack.", cost: "Support" },
    ],
    unlockSkills: [
      { level: 5, id: "baton-strike", name: "Baton Strike", type: "attack", power: 1.5, text: "Uses police training to land a precise baton strike.", cost: "Level 5 · Police equipment" },
      { level: 10, id: "evidence-mark", name: "Evidence Mark", type: "expose", power: 1.2, text: "Identifies a weakness and marks the enemy for the next attack.", cost: "Level 10 · Investigative training" },
      { level: 15, id: "arresting-hold", name: "Arresting Hold", type: "weaken", power: 1.35, text: "Restrains the enemy and weakens its next attack.", cost: "Level 15 · Restraint technique" },
      { level: 20, id: "final-verdict", name: "Final Verdict", type: "heavy", power: 2.65, text: "Combines her combat and tactical skills into a decisive finishing strike.", cost: "Level 20 · Signature skill" },
    ],
  },
  {
    id: "darren", name: "Darren Wilson", title: "Hero", role: "BRUTE", age: 30,
    color: "rgb(77, 4, 137)", initials: "DW", description: "A lonesome hero who just wants to make things right...",
    maxHp: 298, attack: 30, moves: [
      { id: "combo", name: "Critical C-C-Combo", type: "attack", power: 1.25, text: "A combo only fit for a hero.", cost: "No cost" },
      { id: "Rush", name: "Lonesome Rush", type: "attack", power: 1.75, text: "Takes on the enemy head on his own.", cost: "Special" },
      { id: "judgement", name: "Hail Mary Drop", type: "heavy", power: 2.20, text: "Flies upward to drop a critical strike on the ground harming both allies and enemies.", cost: "Special" },
    ],
    unlockSkills: [
      { level: 5, id: "heroic-flurry", name: "Heroic Flurry", type: "attack", power: 1.55, text: "A rapid string of hits delivered with heroic determination.", cost: "Level 5 · Combat technique" },
      { level: 10, id: "lone-wolf", name: "Lone Wolf Rush", type: "heavy", power: 2.35, text: "Focuses all his strength into a relentless charge.", cost: "Level 10 · Signature technique" },
      { level: 15, id: "rallying-presence", name: "Rallying Presence", type: "teamheal", power: 0.22, text: "His determination helps restore the active party's health.", cost: "Level 15 · Heroic support" },
      { level: 20, id: "true-hail-mary", name: "True Hail Mary", type: "heavy", power: 3.0, text: "Commits everything to a devastating final blow.", cost: "Level 20 · Ultimate skill" },
    ],
  }
];


const ENEMIES = [
  // EARLY-GAME ENEMIES
  {
    id: "hollow",
    name: "The Hollow Buzzy",
    kind: "Buzzy",
    description: "A restless knot of negative thoughts.",
    maxHp: 255,
    attack: 16,
    xpReward: 70,
    trait: "Balanced",
    special: "balanced"
  },
  {
    id: "mite",
    name: "The Mirror Mite",
    kind: "Inverted Monster",
    description: "A twitching reflection that strikes before you can react.",
    maxHp: 190,
    attack: 22,
    xpReward: 80,
    trait: "Quick Strikes",
    special: "quick"
  },
  {
    id: "whisper",
    name: "The Whispering Buzzy",
    kind: "Buzzy",
    description: "A tiny creature that feeds on the fear of being watched.",
    maxHp: 220,
    attack: 19,
    xpReward: 85,
    trait: "Balanced",
    special: "balanced"
  },
  {
    id: "stalker",
    name: "The Backward Stalker",
    kind: "Inverted Monster",
    description: "A twisted silhouette that strikes from unexpected angles.",
    maxHp: 270,
    attack: 25,
    xpReward: 100,
    trait: "Quick Strikes",
    special: "quick"
  },

  // MID-GAME ENEMIES
  {
    id: "brute",
    name: "The Guiltbound Brute",
    kind: "Inverted Monster",
    description: "A hulking creature that grows more dangerous as it weakens.",
    maxHp: 360,
    attack: 19,
    xpReward: 115,
    trait: "Enrages below 50% HP",
    special: "enrage"
  },
  {
    id: "double",
    name: "The Weeping Double",
    kind: "Inverted Monster",
    description: "A warped copy that drains strength from its target.",
    maxHp: 285,
    attack: 17,
    xpReward: 100,
    trait: "Restores its own integrity",
    special: "drain"
  },
  {
    id: "choir",
    name: "The Static Choir",
    kind: "Inverted Monster",
    description: "A chorus of broken voices that pierces defensive stances.",
    maxHp: 315,
    attack: 21,
    xpReward: 130,
    trait: "Pierces guards",
    special: "pierce"
  },
  {
    id: "griever",
    name: "The Grief Collector",
    kind: "Inverted Monster",
    description: "A faceless creature that grows stronger by exploiting despair.",
    maxHp: 420,
    attack: 27,
    xpReward: 155,
    trait: "Enrages below 50% HP",
    special: "enrage"
  },
  {
    id: "marionette",
    name: "The Hollow Marionette",
    kind: "Inverted Monster",
    description: "A puppet controlled by invisible threads that strikes without warning.",
    maxHp: 350,
    attack: 30,
    xpReward: 165,
    trait: "Quick Strikes",
    special: "quick"
  },
  {
    id: "mourner",
    name: "The Faceless Mourner",
    kind: "Inverted Monster",
    description: "It steals fragments of its victims' strength to repair its broken body.",
    maxHp: 450,
    attack: 25,
    xpReward: 180,
    trait: "Restores its own integrity",
    special: "drain"
  },

  // ELITE ENEMIES
  {
    id: "executioner",
    name: "The Guiltbound Executioner",
    kind: "Elite Inverted Monster",
    description: "A towering executioner that punishes anyone who lets their guard down.",
    maxHp: 620,
    attack: 36,
    xpReward: 240,
    trait: "Pierces guards",
    special: "pierce"
  },
  {
    id: "nightmare",
    name: "The Living Nightmare",
    kind: "Elite Inverted Monster",
    description: "A shifting mass of fears that becomes increasingly violent as it deteriorates.",
    maxHp: 700,
    attack: 32,
    xpReward: 275,
    trait: "Enrages below 50% HP",
    special: "enrage"
  },
  {
    id: "reflection",
    name: "The Perfect Reflection",
    kind: "Elite Inverted Monster",
    description: "A disturbing duplicate that refuses to remain damaged for long.",
    maxHp: 680,
    attack: 34,
    xpReward: 290,
    trait: "Restores its own integrity",
    special: "drain"
  },

  // CHARACTER BOSSES
  {
    id: "shizuka_boss",
    name: "Shizuka Meguri",
    kind: "Character Boss",
    description: "Jun's older sister. She will do anything to protect her brother, even if it means standing against the party.",
    maxHp: 1800,
    attack: 75,
    xpReward: 600,
    trait: "Relentless Executioner",
    special: "shizuka_boss",
    characterId: "shizuka"
  },
  {
    id: "warren_boss",
    name: "Warren",
    kind: "Character Boss",
    description: "A dangerous opponent whose appearance forces the party to confront an unexpected enemy.",
    maxHp: 2000,
    attack: 80,
    xpReward: 650,
    trait: "Boss Combatant",
    special: "warren_boss",
    characterId: "warren"
  },

  // CRONOSIS'S FOLLOWERS
  {
    id: "cultist",
    name: "Knight of Cronosis",
    kind: "Humanoid",
    description: "A devoted knight who hunts intruders in the name of the god of time.",
    maxHp: 500,
    attack: 50,
    xpReward: 210,
    trait: "Inverts the enemy's strength",
    special: "inversion"
  },
  {
    id: "knight",
    name: "Cronosis's High Knight",
    kind: "Humanoid",
    description: "The commander of Cronosis's knights, entrusted with protecting the path to their god.",
    maxHp: 850,
    attack: 58,
    xpReward: 400,
    trait: "Pierces guards",
    special: "pierce"
  },
  {
    id: "knight_commander",
    name: "The Eternal Warden",
    kind: "Elite Humanoid",
    description: "A relentless guardian who has served Cronosis for longer than mortal memory.",
    maxHp: 1100,
    attack: 65,
    xpReward: 550,
    trait: "Enrages below 50% HP",
    special: "enrage"
  },
  {
    id: "leader",
    name: "The Knightly Convergence",
    kind: "Inverted Monster",
    description: "A terrifying fusion of broken knights and abandoned thoughts, standing between the party and Cronosis.",
    maxHp: 1350,
    attack: 72,
    xpReward: 700,
    trait: "Pierces guards",
    special: "pierce"
  },

  // FINAL BOSS
  {
    id: "cronosis",
    name: "God Cronosis",
    kind: "Final Boss",
    description: "The god who presides over time. Past, present, and future become indistinguishable in his presence. Every second survived is a second stolen from eternity.",
    maxHp: 5000,
    attack: 90,
    xpReward: 2500,
    trait: "God of Time",
    special: "cronosis"
  }
];

const PURIFICATION_FORMS = {
  jun: {
    name: "Unchained Prisoner",
    description: "Jun stops seeing himself as someone trapped by his past.",
    moves: [
      { id: "unbound-chain", name: "Unbound Chain", type: "weaken", power: 1.8, text: "A sweeping chain attack that damages and weakens the enemy.", cost: "Purified form" },
      { id: "iron-tempest", name: "Iron Tempest", type: "heavy", power: 2.7, text: "Jun combines his chains and metal pole into a brutal barrage.", cost: "Purified form" },
      { id: "break-the-lock", name: "Break the Lock", type: "attack", power: 3.2, text: "Jun's shiv finds the opening in the enemy's defenses.", cost: "Purified form" },
    ],
  },
  stella: {
    name: "Autonomous Stella",
    description: "Stella fights by her own choice, not to satisfy everyone else.",
    moves: [
      { id: "prism-volley", name: "Prism Volley", type: "attack", power: 2.0, text: "Her floating modules fire a coordinated volley.", cost: "Purified form" },
      { id: "tactical-overdrive", name: "Tactical Overdrive", type: "expose", power: 1.7, text: "Stella identifies and strikes several critical weak points.", cost: "Purified form" },
      { id: "guardian-protocol", name: "Guardian Protocol", type: "teamheal", power: 0.35, text: "Her modules restore 35% of each living ally's maximum HP.", cost: "Purified form" },
    ],
  },
  flora: {
    name: "Independent Witch",
    description: "Flora's sister outfit becomes a traditional black-and-gold witch's outfit. She carries a torn potion bag filled with potions and harmful elixirs, along with a tome of spells. She protects people because she chooses to—not because she is waiting for her God to answer.",
    moves: [
      { id: "witchfire-elixir", name: "Witchfire Elixir", type: "heavy", power: 2.45, text: "Throws a harmful elixir from her battered potion bag, bursting against the enemy.", cost: "Purified form · Elixir" },
      { id: "hexing-tome", name: "Hexing Tome", type: "weaken", power: 1.65, text: "Reads a spell from her tome, damaging the enemy and weakening its next attack.", cost: "Purified form · Spell" },
      { id: "self-chosen-remedy", name: "Self-Chosen Remedy", type: "teamheal", power: 0.24, text: "Mixes her own remedy to restore 24% of each living active ally's maximum HP.", cost: "Purified form · Potion" },
    ],
  },
  raymond: {
    name: "Peaceful Resolve",
    description: "Raymond accepts that he hates violence, but will fight to protect the people he cares about. His boxing attire becomes a black monk-like outfit, his gloves are replaced by hand bandages, prayer beads float around him, and his skin turns gold while his eyes turn blue.",
    moves: [
      { id: "prayer-bead-barrage", name: "Prayer Bead Barrage", type: "attack", power: 2.1, text: "Commands his floating prayer beads to strike the enemy in a controlled barrage.", cost: "Purified form · Beads" },
      { id: "monks-verdict", name: "Monk's Verdict", type: "heavy", power: 2.65, text: "A decisive bandaged-fist strike used only when someone needs protecting.", cost: "Purified form · Close combat" },
      { id: "vow-of-protection", name: "Vow of Protection", type: "teamguard", power: 0, text: "The prayer beads circle his allies, reducing the next enemy attack against the active party.", cost: "Purified form · Protection" },
    ],
  },
  emily: {
    name: "Final Authority",
    description: "Emily becomes judge and protector on her own terms.",
    moves: [
      { id: "redline-verdict", name: "Redline Verdict", type: "heavy", power: 2.7, text: "A decisive strike empowered by her cracked badge emblem.", cost: "Purified form" },
      { id: "restraining-order", name: "Restraining Order", type: "weaken", power: 1.7, text: "Pins the enemy down and weakens its next attack.", cost: "Purified form" },
      { id: "protect-and-serve", name: "Protect and Serve", type: "teamguard", power: 0, text: "Creates a defensive formation around the active party.", cost: "Purified form" },
    ],
  },
};

const PURIFICATION_GAUGE_MAX = 100;
const PURIFICATION_DURATION = 3;

function enemyForEncounter(index) {
  const template = ENEMIES[index % ENEMIES.length];
  const tier = Math.floor(index / ENEMIES.length);
  const maxHp = Math.round(template.maxHp * (1 + tier * 0.16));
  return { ...template, maxHp, hp: maxHp, attack: Math.round(template.attack * (1 + tier * 0.1)), weakened: false, exposed: false, defeated: false, tier: tier + 1 };
}

function freshRoster() {
  return ROSTER.map((character) => ({
    ...character,
    level: 1,
    xp: 0,
    hp: character.maxHp,
    defeated: false,
    guard: 0,
    counter: false,
    blessing: null,
  }));
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function App() {
  const [characters, setCharacters] = useState(freshRoster);
  const [partyIds, setPartyIds] = useState(["jun", "stella", "rebecca"]);
  const [screen, setScreen] = useState("menu");
  const [activeId, setActiveId] = useState("jun");
  const [encounterIndex, setEncounterIndex] = useState(0);
  const [enemy, setEnemy] = useState(() => enemyForEncounter(0));
  const [logs, setLogs] = useState(["A Buzzy blocks the way. Choose your move."]);
  const [turn, setTurn] = useState(1);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(null);

  const active = characters.find((c) => c.id === activeId);
  const party = useMemo(() => partyIds.map((id) => characters.find((c) => c.id === id)).filter(Boolean), [partyIds, characters]);
  const livingParty = party.filter((c) => c.hp > 0);
  const enemyHpPercent = (enemy.hp / enemy.maxHp) * 100;

  function addLog(message) {
    setLogs((current) => [message, ...current].slice(0, 7));
  }

  function updateCharacter(id, update) {
    setCharacters((current) => current.map((c) => c.id === id ? { ...c, ...update } : c));
  }

  function resetBattle() {
    const reset = characters.map((c) => ({ ...c, hp: c.maxHp, guard: 0, counter: false, blessing: null, prayingThisTurn: false, purificationGauge: 0, purifiedTurns: 0 }));
    setCharacters(reset);
    setEnemy(enemyForEncounter(encounterIndex));
    setActiveId(partyIds.find((id) => reset.find((c) => c.id === id)?.hp > 0) || partyIds[0]);
    setLogs([`${enemyForEncounter(encounterIndex).name} blocks the way. Choose your move.`]);
    setTurn(1);
    setBusy(false);
    setResult(null);
    setScreen("battle");
  }

  function nextEncounter() {
    const nextIndex = encounterIndex + 1;
    setEncounterIndex(nextIndex);
    const restored = characters.map((c) => ({ ...c, hp: c.maxHp, guard: 0, counter: false, blessing: null, prayingThisTurn: false, purificationGauge: 0, purifiedTurns: 0 }));
    setCharacters(restored);
    const nextEnemy = enemyForEncounter(nextIndex);
    setEnemy(nextEnemy);
    setActiveId(partyIds[0]);
    setLogs([`${nextEnemy.name} emerges from the reflection. Your team recovers between encounters.`]);
    setTurn(1);
    setBusy(false);
    setResult(null);
  }

  function finishIfNeeded(nextCharacters, nextEnemyHp, partySet = partyIds) {
    const remainingParty = partySet.map((id) => nextCharacters.find((c) => c.id === id)).filter((c) => c && c.hp > 0);
    if (nextEnemyHp <= 0) {
      const rewarded = nextCharacters.map((c) => {
        if (!partySet.includes(c.id)) return c;
        let level = c.level || 1;
        let xp = (c.xp || 0) + enemy.xpReward;
        let maxHp = c.maxHp;
        let attack = c.attack;
        let hp = c.hp;
        const oldLevel = level;
        let levelsGained = 0;
        while (xp >= level * 100 && level < 20) {
          xp -= level * 100;
          level += 1;
          levelsGained += 1;
          maxHp += 10;
          attack += 2;
          if (hp > 0) hp = Math.min(maxHp, hp + 18);
        }
        if (level >= 20) {
          level = 20;
          xp = 0;
        }
        if (levelsGained) {
          addLog(`${c.name} reached Level ${level}! Max HP and attack increased.`);
          const learned = (c.unlockSkills || []).filter((skill) => skill.level > oldLevel && skill.level <= level);
          learned.forEach((skill) => addLog(`${c.name} learned ${skill.name} at Level ${skill.level}!`));
        }
        return { ...c, level, xp, maxHp, attack, hp };
      });
      setCharacters(rewarded);
      setEnemy((current) => ({ ...current, hp: 0, defeated: true }));
      setResult("victory");
      addLog(`${enemy.name} dissolves into the Inverted World. Party members earn ${enemy.xpReward} XP.`);
      return true;
    }
    if (remainingParty.length === 0) {
      setResult("defeat");
      addLog("The entire party has fallen. The battle is lost.");
      return true;
    }
    return false;
  }

  function enemyPhase(nextCharacters, nextEnemy, forcedActiveId = activeId, forcedPartyIds = partyIds) {
    let updatedCharacters = nextCharacters.map((c) => ({ ...c }));
    const currentActive = updatedCharacters.find((c) => c.id === forcedActiveId && forcedPartyIds.includes(c.id) && c.hp > 0)
      || updatedCharacters.find((c) => forcedPartyIds.includes(c.id) && c.hp > 0);
    if (!currentActive) {
      setCharacters(updatedCharacters);
      setResult("defeat");
      return;
    }
    const enraged = nextEnemy.special === "enrage" && nextEnemy.hp <= nextEnemy.maxHp * 0.5;
    const damage = Math.max(1, Math.round((nextEnemy.attack - (nextEnemy.weakened ? 7 : 0)) * (nextEnemy.special === "quick" ? 1.15 : 1) * (enraged ? 1.4 : 1)));
    const teamGuardActive = updatedCharacters.some((c) => forcedPartyIds.includes(c.id) && c.guard > 1);
    const reduced = currentActive.guard > 0 || teamGuardActive;
    const ignoresGuard = nextEnemy.special === "pierce";
    const finalDamage = Math.max(1, Math.round(damage * (reduced && !ignoresGuard ? 0.45 : 1)));
    const wasCountering = currentActive.counter;
    updatedCharacters = updatedCharacters.map((c) => {
      if (c.id === currentActive.id) return {
        ...c,
        hp: Math.max(0, c.hp - finalDamage),
        purificationGauge: c.purifiedTurns > 0 ? c.purificationGauge : Math.min(PURIFICATION_GAUGE_MAX, (c.purificationGauge || 0) + Math.max(8, Math.round(finalDamage * 1.2))),
        guard: 0, counter: false, counterPower: null
      };
      if (c.guard > 0) return { ...c, guard: 0 };
      return c;
    });
    addLog(`${nextEnemy.name} ${enraged ? "lashes out in a rage at" : "attacks"} ${currentActive.name} for ${finalDamage} damage${reduced && !ignoresGuard ? " (reduced)" : ignoresGuard && reduced ? " (guard pierced)" : ""}.`);

    const countering = wasCountering ? currentActive : null;
    let nextEnemyHp = nextEnemy.hp;
    if (countering) {
      const counterDamage = Math.round(countering.attack * (countering.counterPower || 1.15));
      nextEnemyHp = Math.max(0, nextEnemyHp - counterDamage);
      addLog(`${countering.name} counterpunches for ${counterDamage} damage.`);
    }

    // Flora's God answers only after the enemy has completed its attack phase.
    const prayingFlora = updatedCharacters.find((c) => c.id === "flora" && c.prayingThisTurn);
    updatedCharacters = updatedCharacters.map((c) => c.id === "flora" ? { ...c, prayingThisTurn: false } : c);
    if (prayingFlora && prayingFlora.hp > 0 && forcedPartyIds.includes("flora")) {
      const blessing = Math.random() < 0.5 ? "harm" : "grace";
      updatedCharacters = updatedCharacters.map((c) => c.id === "flora" ? { ...c, blessing } : c);
      addLog(`After the enemy finishes attacking, Flora's God answers with ${blessing.toUpperCase()}.`);
    }

    if (nextEnemy.special === "drain" && nextEnemyHp > 0) {
      nextEnemyHp = Math.min(nextEnemy.maxHp, nextEnemyHp + 12);
      addLog(`${nextEnemy.name} feeds on despair and restores 12 integrity.`);
    }
    nextEnemyHp = Math.max(0, nextEnemyHp);
    const nextEnemyState = { ...nextEnemy, hp: nextEnemyHp, weakened: false, exposed: nextEnemy.exposed };
    setCharacters(updatedCharacters);
    setEnemy(nextEnemyState);
    setTurn((current) => current + 1);
    if (!finishIfNeeded(updatedCharacters, nextEnemyHp, forcedPartyIds)) {
      const newActive = updatedCharacters.find((c) => c.id === forcedActiveId && forcedPartyIds.includes(c.id) && c.hp > 0)
        || updatedCharacters.find((c) => forcedPartyIds.includes(c.id) && c.hp > 0);
      if (newActive && newActive.id !== activeId) {
        setActiveId(newActive.id);
        addLog(`${newActive.name} is now active.`);
      }
    }
    setBusy(false);
  }

  function performAction(move) {
    if (busy || result || !active || active.hp <= 0) return;
    if (active.id === "flora" && !active.blessing && (active.purifiedTurns || 0) <= 0 && move.id !== "prayer" && move.type !== "purify") return;
    setBusy(true);

    let nextCharacters = characters.map((c) => ({ ...c }));
    let nextEnemy = { ...enemy };
    let nextEnemyHp = nextEnemy.hp;
    const actor = nextCharacters.find((c) => c.id === active.id);

    if (move.type === "purify") {
      const form = PURIFICATION_FORMS[actor.id];
      if (!form || actor.purifiedTurns > 0 || (actor.purificationGauge || 0) < PURIFICATION_GAUGE_MAX) {
        setBusy(false);
        return;
      }
      nextCharacters = nextCharacters.map((c) => c.id === actor.id
        ? { ...c, purificationGauge: 0, purifiedTurns: PURIFICATION_DURATION }
        : c);
      addLog(`${actor.name} enters ${form.name}! Purification lasts ${PURIFICATION_DURATION} actions.`);
    } else if (move.type === "prayer") {
      nextCharacters = nextCharacters.map((c) => c.id === "flora" ? { ...c, blessing: null, prayingThisTurn: true } : c);
      addLog("Flora begins to pray. Her God has not answered yet.");
    } else if (move.type === "blessedAttack") {
      const harmPower = move.power;
      const damage = Math.round((actor.attack + 9) * harmPower * (nextEnemy.exposed ? 1.5 : 1));
      nextEnemyHp = Math.max(0, nextEnemyHp - damage);
      nextEnemy = { ...nextEnemy, hp: nextEnemyHp, exposed: false };
      nextCharacters = nextCharacters.map((c) => c.id === actor.id ? { ...c, blessing: null } : c);
      addLog(`Flora uses ${move.name} for ${damage} damage. Her blessing fades.`);
    } else if (move.type === "blessedHeal") {
      const target = nextCharacters.find((c) => c.id === move.targetId) || actor;
      const amount = move.power;
      nextCharacters = nextCharacters.map((c) => c.id === target.id ? { ...c, hp: Math.min(c.maxHp, c.hp + amount) } : c);
      nextCharacters = nextCharacters.map((c) => c.id === actor.id ? { ...c, blessing: null } : c);
      addLog(`Flora uses ${move.name}, restoring ${amount} HP to ${target.name}. Her blessing fades.`);
    } else if (move.type === "attack" || move.type === "heavy" || move.type === "weaken" || move.type === "expose") {
      const damage = Math.round(actor.attack * move.power * (nextEnemy.exposed ? 1.5 : 1));
      nextEnemyHp = Math.max(0, nextEnemyHp - damage);
      nextEnemy = { ...nextEnemy, hp: nextEnemyHp, exposed: move.type === "expose", weakened: move.type === "weaken" };
      addLog(`${actor.name} uses ${move.name} for ${damage} damage${nextEnemy.exposed ? ". The enemy is exposed." : ""}.`);
    } else if (move.type === "teamheal") {
      nextCharacters = nextCharacters.map((c) => partyIds.includes(c.id) && c.hp > 0 ? { ...c, hp: Math.min(c.maxHp, c.hp + Math.round(c.maxHp * move.power)) } : c);
      addLog(`${actor.name} uses ${move.name}. The active party recovers health.`);
    } else if (move.type === "guard" || move.type === "teamguard") {
      nextCharacters = nextCharacters.map((c) => {
        if (c.id === actor.id || (move.type === "teamguard" && partyIds.includes(c.id))) {
          return { ...c, guard: move.type === "teamguard" ? 2 : 1, ...(actor.id === "flora" ? { blessing: null } : {}) };
        }
        return c;
      });
      addLog(`${actor.name} uses ${move.name} and braces for the enemy's attack${actor.id === "flora" ? ". Her blessing fades." : "."}`);
    } else if (move.type === "counter") {
      nextCharacters = nextCharacters.map((c) => c.id === actor.id ? { ...c, counter: true, counterPower: move.power || 1.15 } : c);
      addLog(`${actor.name} prepares a counterattack.`);
    }

    // Normal combat actions charge purification. A purified form lasts for three actions.
    nextCharacters = nextCharacters.map((c) => {
      if (c.id !== actor.id) return c;
      if (move.type === "purify") return c;
      if ((c.purifiedTurns || 0) > 0) {
        const remaining = c.purifiedTurns - 1;
        if (remaining <= 0) {
          addLog(`${c.name}'s purified form fades.`);
          return { ...c, purifiedTurns: 0 };
        }
        return { ...c, purifiedTurns: remaining };
      }
      return { ...c, purificationGauge: Math.min(PURIFICATION_GAUGE_MAX, (c.purificationGauge || 0) + 20) };
    });
    setCharacters(nextCharacters);
    setEnemy({ ...nextEnemy, hp: nextEnemyHp });
    if (finishIfNeeded(nextCharacters, nextEnemyHp)) {
      setBusy(false);
      return;
    }
    // Resolve the enemy's turn after the player's action. A short timeout gives the log a readable beat.
    window.setTimeout(() => enemyPhase(nextCharacters, { ...nextEnemy, hp: nextEnemyHp }), 420);
  }

  function switchCharacter(id) {
    if (busy || result || id === activeId) return;
    const target = characters.find((c) => c.id === id);
    if (!target || target.hp <= 0 || !partyIds.includes(id)) return;
    setBusy(true);
    setActiveId(id);
    addLog(`You switch from ${active?.name} to ${target.name}. Switching uses the turn.`);
    // Mark any prayer action already pending as not pending; switching is not prayer.
    const nextCharacters = characters.map((c) => c.id === "flora" ? { ...c, prayingThisTurn: false } : c);
    setCharacters(nextCharacters);
    window.setTimeout(() => enemyPhase(nextCharacters, { ...enemy }, id), 420);
  }



  function replaceFallen(fallenId, reserveId) {
    if (busy || result) return;
    const fallen = characters.find((c) => c.id === fallenId);
    const reserve = characters.find((c) => c.id === reserveId);
    if (!fallen || fallen.hp > 0 || !reserve || reserve.hp <= 0 || partyIds.includes(reserveId)) return;
    const nextPartyIds = partyIds.map((id) => id === fallenId ? reserveId : id);
    const nextActiveId = activeId === fallenId ? reserveId : activeId;
    setPartyIds(nextPartyIds);
    setActiveId(nextActiveId);
    setBusy(true);
    addLog(`${reserve.name} replaces fallen ${fallen.name}. The replacement costs your turn.`);
    const nextCharacters = characters.map((c) => c.id === reserveId ? { ...c, hp: Math.min(c.maxHp, Math.max(1, c.hp)), guard: 0, counter: false } : c);
    setCharacters(nextCharacters);
    window.setTimeout(() => enemyPhase(nextCharacters, { ...enemy }, nextActiveId, nextPartyIds), 420);
  }

  function toggleParty(id) {
    if (screen !== "party") return;
    setPartyIds((current) => {
      if (current.includes(id)) return current.length > 1 ? current.filter((item) => item !== id) : current;
      if (current.length >= 3) return current;
      return [...current, id];
    });
  }

  function startBattle() {
    if (partyIds.length !== 3) return;
    resetBattle();
  }

  function movesFor(character) {
    if (!character) return [];
    const purification = PURIFICATION_FORMS[character.id];
    if (purification && (character.purifiedTurns || 0) > 0) {
      return purification.moves.map((move) => move.type === "blessedHeal" ? { ...move, targetId: activeId } : move);
    }
    const unlockedSkills = (character.unlockSkills || []).filter((skill) => character.level >= skill.level);

    if (character.id === "flora") {
      if (!character.blessing) {
        const floraActions = [{ id: "prayer", name: "Prayer", type: "prayer", text: "Uses Flora's turn. Her God answers only after the enemy finishes attacking.", cost: "Consumes turn" }];
        if (purification && (character.purificationGauge || 0) >= PURIFICATION_GAUGE_MAX) floraActions.unshift({ id: "purify", name: `Purify: ${purification.name}`, type: "purify", text: "Spend the full purification gauge to enter this form for three actions.", cost: "Gauge 100% · Uses turn" });
        return floraActions;
      }
      if (character.blessing === "harm") {
        return [
          { id: "divinewrath", name: "Divine Wrath", type: "blessedAttack", power: 1.75, text: "A focused divine strike against one enemy.", cost: "Harm blessing" },
          { id: "judgment", name: "Judgment", type: "blessedAttack", power: 1.25, text: "A wider, less focused blast of divine harm.", cost: "Harm blessing" },
          ...unlockedSkills.filter((skill) => skill.blessing === "harm"),
          ...(purification && (character.purificationGauge || 0) >= PURIFICATION_GAUGE_MAX ? [{ id: "purify", name: `Purify: ${purification.name}`, type: "purify", text: "Spend the full purification gauge to enter this form for three actions.", cost: "Gauge 100% · Uses turn" }] : []),
        ];
      }
      return [
        { id: "mercy", name: "Divine Mercy", type: "blessedHeal", power: 36, targetId: activeId, text: "Restores health to Flora or a selected active ally.", cost: "Grace blessing" },
        { id: "sanctuary", name: "Sanctuary", type: "teamguard", power: 0, text: "Raises a protective guard for the active party.", cost: "Grace blessing" },
        ...unlockedSkills.filter((skill) => skill.blessing === "grace"),
        ...(purification && (character.purificationGauge || 0) >= PURIFICATION_GAUGE_MAX ? [{ id: "purify", name: `Purify: ${purification.name}`, type: "purify", text: "Spend the full purification gauge to enter this form for three actions.", cost: "Gauge 100% · Uses turn" }] : []),
      ];
    }

    const standardMoves = [...(character.moves || []), ...unlockedSkills];
    if (purification && (character.purificationGauge || 0) >= PURIFICATION_GAUGE_MAX) {
      return [
        { id: "purify", name: `Purify: ${purification.name}`, type: "purify", text: "Spend the full purification gauge to enter this form for three actions.", cost: "Gauge 100% · Uses turn" },
        ...standardMoves,
      ];
    }
    return standardMoves;
  }

  function chooseFloraHealTarget(targetId) {
    const move = { id: "mercy", name: "Divine Mercy", type: "blessedHeal", power: 36, targetId };
    performAction(move);
  }

  const currentMoves = movesFor(active);
  const showTargetPicker = active?.id === "flora" && active.blessing === "grace";

  return (
    <main className={`shown-app screen-${screen}`}>
      <header className="game-header">
        <button className="game-logo" onClick={() => setScreen("menu")} aria-label="Return to main menu">
          <span className="logo-emblem">S</span><span className="logo-wordmark">SHOWN<small>THE INVERTED WORLD</small></span>
        </button>
        <div className="header-center"><span className="header-live-dot" /> PSYCHOLOGICAL RPG <span className="header-slash">/</span> BUILD 0.3</div>
        <div className="header-right"><span className="header-file">CASE FILE</span><strong>{String(encounterIndex + 1).padStart(3, "0")}</strong></div>
      </header>

      {screen === "menu" ? (
        <section className="jrpg-menu">
          <div className="menu-background-rings" aria-hidden="true"><span /><span /><span /></div>
          <div className="menu-vertical-label">AN INVERTED WORLD STORY · EST. UNKNOWN</div>
          <div className="menu-main-art" aria-hidden="true"><div className="menu-art-halo" /><div className="menu-art-figure"><i /><b /><span /></div><div className="menu-art-floor" /></div>
          <div className="menu-copy">
            <p className="eyebrow">A TURN-BASED PSYCHOLOGICAL HORROR RPG</p>
            <h1 className="title-logo">SH<span>O</span>WN</h1>
            <p className="menu-tagline">THE REFLECTION REMEMBERS.</p>
            <div className="menu-rule"><span /> FILE 001 · THE OTHER SIDE</div>
            <p className="menu-description">A town's darkest thoughts have taken shape.<br />Enter the reflection. Decide what follows you out.</p>
            <div className="menu-actions">
              <button className="jrpg-primary" onClick={() => setScreen("party")}><span className="button-glyph">▶</span><span>BEGIN DESCENT<small>START NEW ENCOUNTER</small></span><b>↗</b></button>
              <button className="jrpg-secondary" onClick={() => setScreen("party")}>CHARACTER ARCHIVE <span>→</span></button>
            </div>
          </div>
          <div className="menu-bottom-meta"><span>NO ONE IS WHAT THEY SEEM</span><span>SHOWN PROJECT // COMBAT PROTOTYPE</span><span>01 — ∞</span></div>
        </section>
      ) : screen === "party" ? (
        <section className="roster-screen">
          <div className="screen-title-row"><div><p className="eyebrow">01 / PREPARE YOUR PARTY</p><h1>Choose your <em>fighters.</em></h1><p>Build a team of three. Each resident brings a different way to survive the reflection.</p></div><button className="jrpg-secondary back-button" onClick={() => setScreen("menu")}>← MAIN MENU</button></div>
          <div className="roster-toolbar"><div className="roster-count"><span>ACTIVE SQUAD</span><strong>{String(partyIds.length).padStart(2, "0")}<small> / 03</small></strong></div><div className="roster-slots">{[0, 1, 2].map((slot) => { const member = party[slot]; return <div className={`roster-slot ${member ? "filled" : "empty"}`} key={slot} style={member ? { "--character-color": member.color } : undefined}><span className="slot-number">0{slot + 1}</span>{member ? <><b>{member.initials}</b><span>{member.name}</span></> : <span className="slot-prompt">EMPTY SLOT</span>}</div>; })}</div><button className="jrpg-primary roster-confirm" disabled={partyIds.length !== 3} onClick={startBattle}><span className="button-glyph">▶</span><span>ENTER THE INVERTED WORLD<small>DEPLOY YOUR SQUAD</small></span><b>↗</b></button></div>
          <div className="roster-section-label"><span>RESIDENT ARCHIVE</span><span>SELECT UP TO THREE OPERATIVES</span></div>
          <div className="roster-grid">{characters.map((c, index) => {
            const selected = partyIds.includes(c.id);
            return <button className={`character-card ${selected ? "selected" : ""}`} key={c.id} onClick={() => toggleParty(c.id)} style={{ "--character-color": c.color }} aria-pressed={selected}>
              <div className="portrait-window"><div className="portrait-grid-lines" /><div className="portrait-orbit" /><div className={`portrait-person portrait-${c.id}`}><span className="portrait-hair" /><span className="portrait-face" /><span className="portrait-body" /></div><span className="portrait-initials">{c.initials}</span><span className="portrait-index">NO. {String(index + 1).padStart(2, "0")}</span><span className={`portrait-check ${selected ? "visible" : ""}`}>✓</span></div>
              <div className="character-card-body"><div className="character-card-kicker"><span>{c.role}</span><span>LV {c.level || 1} / 20 · AGE {c.age}</span></div><h2>{c.name}</h2><p className="character-title">{c.title}</p><p className="character-description">{c.description}</p><div className="character-stat-row"><span>HP <b>{c.maxHp}</b></span><span>ATK <b>{c.attack}</b></span><span className={`select-state ${selected ? "is-selected" : ""}`}>{selected ? "✓ IN SQUAD" : "+ RECRUIT"}</span></div></div>
            </button>;
          })}</div>
          <div className="roster-footer-note"><span className="note-icon">ⓘ</span> Select a character to add or remove them. Your squad must contain exactly three members before deployment.</div>
        </section>
      ) : (
        <section className="battle-screen">
          <div className="battle-topline"><div><p className="eyebrow">ENCOUNTER {String(encounterIndex + 1).padStart(3, "0")} / HOSTILE CONTACT</p><h1>{enemy.name}<span className="encounter-subtitle">{enemy.kind.toUpperCase()} · {enemy.trait.toUpperCase()}</span></h1></div><div className="battle-top-actions"><div className="turn-chip"><span>TURN</span><strong>{String(turn).padStart(2, "0")}</strong></div><button className="jrpg-secondary" onClick={() => setScreen("party")}>CHANGE PARTY <span>↗</span></button></div></div>
          <div className="battle-layout">
            <aside className="squad-rail"><div className="rail-heading"><span>SQUAD STATUS</span><b>{livingParty.length}/3</b></div><div className="squad-cards">{party.map((c, index) => <button key={c.id} className={`squad-card ${c.id === activeId ? "active-member" : ""} ${c.hp <= 0 ? "fallen-member" : ""}`} onClick={() => switchCharacter(c.id)} disabled={busy || !!result || c.id === activeId || c.hp <= 0} style={{ "--character-color": c.color }}><div className="squad-card-top"><span className="squad-index">0{index + 1}</span><span className="squad-role">{c.role}</span></div><div className="squad-portrait"><div className="mini-portrait-figure"><i /><b /></div><span>{c.initials}</span></div><div className="squad-name">{c.name}</div><div className="squad-class">{c.title} · LV {c.level || 1}</div><div className="squad-hp-label"><span>HP</span><b>{c.hp}<i>/{c.maxHp}</i></b></div><div className="squad-hp-track"><span style={{ width: `${(c.hp / c.maxHp) * 100}%` }} /></div><div className="squad-xp-track"><span style={{ width: `${c.level >= 20 ? 100 : ((c.xp || 0) / ((c.level || 1) * 100)) * 100}%` }} /></div><div className="squad-card-status">{c.hp <= 0 ? "✕ DOWN" : c.id === activeId ? "◆ ACTIVE" : "○ READY"}</div>{c.id === "flora" && <div className={`blessing-status ${c.blessing || "unblessed"}`}>{c.blessing ? `${c.blessing.toUpperCase()} BLESSING` : "AWAITING DIVINE ANSWER"}</div>}</button>)}</div>
              {party.some((c) => c.hp <= 0) && characters.some((c) => !partyIds.includes(c.id) && c.hp > 0) && <div className="replacement-panel"><div className="rail-heading">REINFORCEMENTS</div><p>Replacing a fallen member uses your turn.</p>{party.filter((c) => c.hp <= 0).map((fallen) => <div className="replacement-row" key={fallen.id}><span>{fallen.name} <b>DOWN</b></span><div>{characters.filter((c) => !partyIds.includes(c.id) && c.hp > 0).map((reserve) => <button key={reserve.id} className="replacement-button" disabled={busy || !!result} onClick={() => replaceFallen(fallen.id, reserve.id)}>+ {reserve.name}</button>)}</div></div>)}</div>}
            </aside>
            <div className="battle-main-column">
              <section className="arena-panel"><div className="arena-topline"><span><i className="arena-dot" /> LIVE COMBAT FEED</span><span>THREAT LEVEL <b>{enemy.special === "enrage" && enemy.hp <= enemy.maxHp * 0.5 ? "CRITICAL" : "ELEVATED"}</b></span></div><div className="arena-stage"><div className="arena-backdrop-grid" /><div className="arena-scan-ring ring-one" /><div className="arena-scan-ring ring-two" /><div className="arena-light-beam" /><div className="enemy-art-wrap"><div className="enemy-art-shadow" /><div className="enemy-aura" /><div className={`enemy-shape ${enemy.hp <= enemy.maxHp * 0.3 ? "enemy-wounded" : ""}`}><span /><i /><b /></div><div className="enemy-ground" /></div><div className="arena-target-label"><span>HOSTILE / {enemy.id.toUpperCase()}</span><strong>{enemy.name}</strong><small>{enemy.description}</small></div><div className="arena-corner arena-corner-tl" /><div className="arena-corner arena-corner-br" /></div><div className="enemy-hud"><div className="enemy-hud-heading"><div><span>ENEMY INTEGRITY</span><strong>{enemy.hp}<small> / {enemy.maxHp}</small></strong></div><div className="enemy-level">LV.{String(3 + encounterIndex).padStart(2, "0")}</div></div><div className="enemy-health-track"><span style={{ width: `${enemyHpPercent}%` }} /></div><div className="enemy-status-row">{enemy.weakened && <span className="status-pill weakened">↓ WEAKENED</span>}{enemy.exposed && <span className="status-pill exposed">◎ EXPOSED</span>}{!enemy.weakened && !enemy.exposed && <span className="status-pill neutral">NO STATUS EFFECTS</span>}<span className="enemy-trait">TRAIT: {enemy.trait}</span></div></div></section>
              <section className="command-panel"><div className="command-heading"><div className="active-hero-mini" style={{ "--character-color": active?.color }}><span>{active?.initials}</span></div><div className="command-title"><span className="section-kicker">COMMAND PHASE / ACTIVE OPERATIVE</span><h2>{active?.name}<small>{active?.title} · LV {active?.level || 1} / 20</small></h2></div><div className="active-vitals"><span>HP <b>{active?.hp}<i>/{active?.maxHp}</i></b></span><div><span style={{ width: `${active ? (active.hp / active.maxHp) * 100 : 0}%`, background: active?.color }} /></div><span>ATK <b>{active?.attack}</b></span></div></div>
                {active && PURIFICATION_FORMS[active.id] && <div className={`purification-panel ${(active.purifiedTurns || 0) > 0 ? "purification-active" : ""}`} style={{ margin: "14px 0 18px", padding: "14px 16px", border: `1px solid ${(active.purifiedTurns || 0) > 0 ? active.color : "rgba(165,185,255,.25)"}`, borderRadius: "12px", background: (active.purifiedTurns || 0) > 0 ? "rgba(115,214,232,.10)" : "rgba(8,12,22,.62)" }}>
                  <div className="purification-heading" style={{ display: "flex", justifyContent: "space-between", gap: "12px", fontSize: "11px", letterSpacing: ".12em", fontWeight: 800 }}><span>{(active.purifiedTurns || 0) > 0 ? `PURIFIED: ${PURIFICATION_FORMS[active.id].name.toUpperCase()}` : "PURIFICATION GAUGE"}</span><strong>{(active.purifiedTurns || 0) > 0 ? `${active.purifiedTurns} ACTIONS LEFT` : `${Math.min(PURIFICATION_GAUGE_MAX, active.purificationGauge || 0)}% / 100%`}</strong></div>
                  <div className="purification-track" style={{ height: "8px", marginTop: "10px", overflow: "hidden", borderRadius: "99px", background: "rgba(255,255,255,.10)" }}><span style={{ display: "block", height: "100%", borderRadius: "99px", width: `${(active.purifiedTurns || 0) > 0 ? 100 : Math.min(100, active.purificationGauge || 0)}%`, background: active.color, transition: "width .25s ease" }} /></div>
                  <p style={{ margin: "9px 0 0", fontSize: "12px", lineHeight: 1.5, opacity: .82 }}>{(active.purifiedTurns || 0) > 0 ? PURIFICATION_FORMS[active.id].description : "Deal damage or take hits to fill this gauge. At 100%, choose Purify to unlock form-specific moves."}</p>
                </div>}
                {active?.id === "flora" && !active.blessing && <div className="prayer-warning"><span>✧</span><div><strong>NO DIVINE ANSWER</strong><p>Prayer is Flora's only action. Her God answers after the enemy finishes attacking.</p></div></div>}
                {active?.id === "flora" && active.blessing && <div className={`blessing-banner ${active.blessing}`}><strong>{active.blessing === "harm" ? "HARM HAS BEEN GRANTED" : "GRACE HAS BEEN GRANTED"}</strong><p>{active.blessing === "harm" ? "Flora's divine power can now harm the enemy." : "Flora's divine power can now protect and restore her allies."}</p></div>}
                <div className="command-section-heading"><div><span className="section-kicker">SELECT ACTION</span><h3>What will you do?</h3></div><span className="action-count">{currentMoves.length} COMMAND{currentMoves.length === 1 ? "" : "S"}</span></div>
                <div className="moves-grid">{currentMoves.map((move, index) => <button className={`move-card move-${move.type} ${move.type === "prayer" ? "prayer-move" : ""} ${move.type.startsWith("blessed") || (active?.id === "flora" && active.blessing) ? "blessed-move" : ""}`} key={move.id} disabled={busy || !!result || active?.hp <= 0} onClick={() => move.id === "mercy" ? chooseFloraHealTarget(party.find((c) => c.hp > 0 && c.hp < c.maxHp)?.id || activeId) : performAction(move)}><div className="move-card-top"><span className="move-number">0{index + 1}</span><span className="move-symbol">{move.type === "prayer" ? "✧" : move.type.includes("Heal") || move.type === "blessedHeal" || move.type === "teamheal" ? "+" : move.type.includes("guard") || move.type === "counter" ? "◇" : "✦"}</span></div><h4>{move.name}</h4><p>{move.text}</p><div className="move-footer"><span>{move.cost}</span><span className="move-arrow">↗</span></div></button>)}</div>
                {showTargetPicker && <p className="target-note">Divine Mercy automatically heals the most injured living ally.</p>}
                <div className="command-footer"><span><kbd>SELECT</kbd> Choose an action</span><span><kbd>SWITCH</kbd> Costs your turn</span><span className={busy ? "combat-busy" : "combat-ready"}>{busy ? "● RESOLVING TURN" : "● AWAITING COMMAND"}</span></div>
              </section>
              <section className="combat-log-panel"><div className="log-heading"><span>COMBAT RECORD</span><span>RECENT EVENTS <b>07</b></span></div><div className="combat-log-list">{logs.map((line, index) => <p className={index === 0 ? "latest-log" : ""} key={`${line}-${index}`}><span>{String(logs.length - index).padStart(2, "0")}</span>{line}</p>)}</div></section>
            </div>
          </div>
          {result && <div className="result-overlay"><div className="result-card"><span className="eyebrow">ENCOUNTER COMPLETE</span><div className={`result-emblem ${result}`}><span>{result === "victory" ? "✦" : "×"}</span></div><h2>{result === "victory" ? `${enemy.name} is gone.` : "The party has fallen."}</h2><p>{result === "victory" ? "For a moment, the reflection grows quiet. Your team earns experience." : "The Inverted World swallows the last of your strength."}</p><button className="jrpg-primary result-primary" onClick={result === "victory" ? nextEncounter : resetBattle}><span className="button-glyph">▶</span><span>{result === "victory" ? "NEXT ENCOUNTER" : "RETRY ENCOUNTER"}<small>{result === "victory" ? "CONTINUE YOUR DESCENT" : "RETURN TO BATTLE"}</small></span><b>↗</b></button><button className="jrpg-secondary full-width" onClick={() => setScreen("party")}>CHANGE PARTY <span>→</span></button></div></div>}
        </section>
      )}
      <footer className="game-footer"><span>SHOWN <i> / </i> THE INVERTED WORLD</span><span>THE REFLECTION REMEMBERS.</span><span>PROTOTYPE BUILD 0.3</span></footer>
    </main>
  );
}

export default App;