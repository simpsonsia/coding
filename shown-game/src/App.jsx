import { useMemo, useState } from "react";

const ROSTER = [
  {
    id: "jun", name: "Jun Meguri", title: "Prisoner", role: "BRUTE", age: 14,
    color: "#75d6e8", initials: "JM", description: "A close-range fighter whose power reflects confinement and pressure.",
    maxHp: 118, attack: 19, moves: [
      { id: "chain", name: "Chain Strike", type: "attack", power: 1.15, text: "A fast, close-range chain attack.", cost: "No cost" },
      { id: "shackles", name: "Shackles", type: "weaken", power: 0.75, text: "Deals damage and weakens the enemy's next attack.", cost: "Tactical" },
      { id: "noescape", name: "No Escape", type: "heavy", power: 2.1, text: "A heavy strike fueled by desperation.", cost: "Special" },
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
  },
  {
    id: "shizuka", name: "Shizuka Meguri", title: "Executioner", role: "BRUTE", age: 21,
    color: "#ff8d9a", initials: "SM", description: "A powerful frontline fighter who will do anything to protect Jun.",
    maxHp: 132, attack: 22, moves: [
      { id: "cut", name: "Executioner's Cut", type: "attack", power: 1.2, text: "A hard-hitting blade strike.", cost: "No cost" },
      { id: "intercept", name: "Intercept", type: "guard", power: 0, text: "Braces herself, reducing the next hit she takes.", cost: "Defense" },
      { id: "judgment", name: "Last Judgment", type: "heavy", power: 2.25, text: "A devastating execution strike.", cost: "Special" },
    ],
  },
  {
    id: "rebecca", name: "Rebecca Ann", title: "Knight", role: "BRUTE", age: 16,
    color: "#e8c77b", initials: "RA", description: "A defensive knight who protects others, often at her own expense.",
    maxHp: 145, attack: 17, moves: [
      { id: "slash", name: "Knight's Slash", type: "attack", power: 1.05, text: "A dependable sword strike.", cost: "No cost" },
      { id: "takehit", name: "Take the Hit", type: "guard", power: 0, text: "Reduces incoming damage and protects the active party this turn.", cost: "Defense" },
      { id: "who", name: "If I Won't, Who Will?", type: "teamguard", power: 0, text: "Greatly reduces the next enemy attack against the team.", cost: "Special" },
    ],
  },
  {
    id: "flora", name: "Flora Garcia", title: "Sister", role: "SPECIALIST", age: 14,
    color: "#d6a6ff", initials: "FG", description: "Flora can only pray until her God answers with Harm or Grace.",
    maxHp: 88, attack: 14, moves: [],
  },
  {
    id: "raymond", name: "Raymond Dixion", title: "Pugilist", role: "BRUTE", age: 15,
    color: "#f5a56f", initials: "RD", description: "A fast boxer who relies on combinations and counterattacks.",
    maxHp: 108, attack: 18, moves: [
      { id: "combo", name: "One-Two Combo", type: "attack", power: 1.25, text: "A quick two-punch combination.", cost: "No cost" },
      { id: "counter", name: "Counterpunch", type: "counter", power: 1.15, text: "Prepares to retaliate after the enemy attacks.", cost: "Defense" },
      { id: "rush", name: "Knockout Rush", type: "heavy", power: 1.95, text: "A rapid flurry of heavy punches.", cost: "Special" },
    ],
  },
];

const ENEMIES = [
  { id: "hollow", name: "The Hollow Buzzy", kind: "Buzzy", description: "A restless knot of negative thoughts.", maxHp: 255, attack: 16, xpReward: 70, trait: "Balanced", special: "balanced" },
  { id: "mite", name: "The Mirror Mite", kind: "Inverted Monster", description: "A twitching reflection that strikes before you can react.", maxHp: 190, attack: 22, xpReward: 80, trait: "Quick Strikes", special: "quick" },
  { id: "brute", name: "The Guiltbound Brute", kind: "Inverted Monster", description: "A hulking creature that grows more dangerous as it weakens.", maxHp: 360, attack: 19, xpReward: 115, trait: "Enrages below 50% HP", special: "enrage" },
  { id: "double", name: "The Weeping Double", kind: "Inverted Monster", description: "A warped copy that drains strength from its target.", maxHp: 285, attack: 17, xpReward: 100, trait: "Restores its own integrity", special: "drain" },
  { id: "choir", name: "The Static Choir", kind: "Inverted Monster", description: "A chorus of broken voices that pierces defensive stances.", maxHp: 315, attack: 21, xpReward: 130, trait: "Pierces guards", special: "pierce" },
];

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
  const [screen, setScreen] = useState("party");
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
    const reset = characters.map((c) => ({ ...c, hp: c.maxHp, guard: 0, counter: false, blessing: null, prayingThisTurn: false }));
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
    const restored = characters.map((c) => ({ ...c, hp: c.maxHp, guard: 0, counter: false, blessing: null, prayingThisTurn: false }));
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
        let levelsGained = 0;
        while (xp >= level * 100) {
          xp -= level * 100;
          level += 1;
          levelsGained += 1;
          maxHp += 10;
          attack += 2;
          if (hp > 0) hp = Math.min(maxHp, hp + 18);
        }
        if (levelsGained) addLog(`${c.name} reached Level ${level}! Max HP and attack increased.`);
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
      if (c.id === currentActive.id) return { ...c, hp: Math.max(0, c.hp - finalDamage), guard: 0, counter: false };
      if (c.guard > 0) return { ...c, guard: 0 };
      return c;
    });
    addLog(`${nextEnemy.name} ${enraged ? "lashes out in a rage at" : "attacks"} ${currentActive.name} for ${finalDamage} damage${reduced && !ignoresGuard ? " (reduced)" : ignoresGuard && reduced ? " (guard pierced)" : ""}.`);

    const countering = wasCountering ? currentActive : null;
    let nextEnemyHp = nextEnemy.hp;
    if (countering) {
      const counterDamage = Math.round(countering.attack * 1.15);
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
    if (active.id === "flora" && !active.blessing && move.id !== "prayer") return;
    setBusy(true);

    let nextCharacters = characters.map((c) => ({ ...c }));
    let nextEnemy = { ...enemy };
    let nextEnemyHp = nextEnemy.hp;
    const actor = nextCharacters.find((c) => c.id === active.id);

    if (move.type === "prayer") {
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
      nextCharacters = nextCharacters.map((c) => c.id === actor.id ? { ...c, counter: true } : c);
      addLog(`${actor.name} prepares a counterattack.`);
    }

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
    if (character.id === "flora") {
      if (!character.blessing) return [{ id: "prayer", name: "Prayer", type: "prayer", text: "Uses Flora's turn. Her God answers only after the enemy finishes attacking.", cost: "Consumes turn" }];
      if (character.blessing === "harm") return [
        { id: "divinewrath", name: "Divine Wrath", type: "blessedAttack", power: 1.75, text: "A focused divine strike against one enemy.", cost: "Harm blessing" },
        { id: "judgment", name: "Judgment", type: "blessedAttack", power: 1.25, text: "A wider, less focused blast of divine harm.", cost: "Harm blessing" },
      ];
      return [
        { id: "mercy", name: "Divine Mercy", type: "blessedHeal", power: 36, targetId: activeId, text: "Restores health to Flora or a selected active ally.", cost: "Grace blessing" },
        { id: "sanctuary", name: "Sanctuary", type: "teamguard", power: 0, text: "Raises a protective guard for the active party.", cost: "Grace blessing" },
      ];
    }
    return character.moves || [];
  }

  function chooseFloraHealTarget(targetId) {
    const move = { id: "mercy", name: "Divine Mercy", type: "blessedHeal", power: 36, targetId };
    performAction(move);
  }

  const currentMoves = movesFor(active);
  const showTargetPicker = active?.id === "flora" && active.blessing === "grace";

  return (
    <main className="shown-app">
      <header className="topbar">
        <div className="brand-lockup"><div className="brand-mark">S</div><div><div className="brand-name">SHOWN</div><div className="brand-subtitle">INVERTED WORLD // COMBAT SIMULATION</div></div></div>
        <div className="topbar-right"><span className="status-indicator" /> <span>PROTOTYPE BUILD 0.2</span><span className="topbar-divider">/</span><span>{screen === "party" ? "PARTY SETUP" : `TURN ${turn}`}</span></div>
      </header>

      {screen === "party" ? (
        <section className="setup-screen">
          <div className="intro-block"><p className="eyebrow">THE INVERTED WORLD · CHARACTER SELECT</p><h1>Choose your <em>team.</em></h1><p className="intro-copy">Six playable characters. Three battle slots. Build a team that can survive what the town's darker thoughts have become.</p></div>
          <div className="party-selection-bar"><div><span className="section-kicker">ACTIVE PARTY</span><strong>{partyIds.length} <small>/ 3 SELECTED</small></strong></div><div className="selected-chips">{party.map((c) => <span key={c.id} style={{ "--character-color": c.color }}>{c.name}</span>)}</div><button className="primary-button" disabled={partyIds.length !== 3} onClick={startBattle}>ENTER THE INVERTED WORLD <span>→</span></button></div>
          <div className="roster-grid">{characters.map((c) => {
            const selected = partyIds.includes(c.id);
            return <button className={`character-card ${selected ? "selected" : ""}`} key={c.id} onClick={() => toggleParty(c.id)} style={{ "--character-color": c.color }} aria-pressed={selected}>
              <div className="card-topline"><span className="character-number">0{ROSTER.findIndex((r) => r.id === c.id) + 1}</span><span className="role-label">{c.role}</span></div>
              <div className="character-sigil">{c.initials}<span /></div>
              <div className="character-title">{c.title}</div><h2>{c.name}</h2><p>{c.description}</p>
              <div className="card-bottom"><span>{c.maxHp} BASE HP</span><span className={`select-state ${selected ? "is-selected" : ""}`}>{selected ? "✓ SELECTED" : "+ SELECT"}</span></div>
            </button>;
          })}</div>
          <p className="setup-note">Tip: Selecting a fourth character is disabled until you remove one from your party. Your roster can be rearranged freely.</p>
        </section>
      ) : (
        <section className="battle-screen">
          <div className="battle-heading"><div><p className="eyebrow">ENCOUNTER 001 · UNKNOWN RESIDENT</p><h1>Something is <em>watching.</em></h1></div><button className="quiet-button" onClick={() => setScreen("party")}>← PARTY SETUP</button></div>
          <div className="battle-grid">
            <section className="enemy-panel">
              <div className="panel-topline"><span>HOSTILE ENTITY</span><span className="danger-label">THREAT: ACTIVE</span></div>
              <div className="enemy-stage"><div className="enemy-aura" /><div className="enemy-shape"><span /><i /><b /></div><div className="enemy-ground" /></div>
              <div className="enemy-name-row"><div><h2>{enemy.name}</h2><p>{enemy.kind.toUpperCase()} · {enemy.trait.toUpperCase()}</p></div><span className="enemy-level">LV. {String(3 + encounterIndex).padStart(2, "0")}</span></div>
              <p className="enemy-description">{enemy.description}</p>
              <div className="health-line"><div className="health-label"><span>ENTITY INTEGRITY</span><b>{enemy.hp} / {enemy.maxHp}</b></div><div className="bar"><div className="enemy-bar-fill" style={{ width: `${enemyHpPercent}%` }} /></div></div>
              <div className="enemy-effects">{enemy.weakened && <span>WEAKENED</span>}{enemy.exposed && <span>EXPOSED</span>}{!enemy.weakened && !enemy.exposed && <span>NO STATUS EFFECTS</span>}</div>
              <div className="battle-log"><div className="section-kicker">COMBAT LOG</div>{logs.map((line, index) => <p className={index === 0 ? "latest-log" : ""} key={`${line}-${index}`}>{line}</p>)}</div>
            </section>

            <section className="player-panel">
              <div className="panel-topline"><span>YOUR PARTY</span><span className="turn-label">YOUR TURN · {turn}</span></div>
              <div className="party-list">{party.map((c) => <button key={c.id} className={`party-member ${c.id === activeId ? "active-member" : ""} ${c.hp <= 0 ? "fallen-member" : ""}`} onClick={() => switchCharacter(c.id)} disabled={busy || !!result || c.id === activeId || c.hp <= 0} style={{ "--character-color": c.color }}>
                <div className="member-sigil">{c.initials}</div><div className="member-info"><div className="member-name-row"><strong>{c.name}</strong><span>{c.title} · LV {c.level || 1}</span></div><div className="mini-health"><div><span style={{ width: `${(c.hp / c.maxHp) * 100}%` }} /></div><small>{c.hp}/{c.maxHp} HP</small></div><div className="xp-line"><span style={{ width: `${((c.xp || 0) / ((c.level || 1) * 100)) * 100}%` }} /></div><small className="xp-caption">{c.xp || 0}/{(c.level || 1) * 100} XP</small>{c.id === "flora" && <div className={`blessing-status ${c.blessing || "unblessed"}`}>{c.blessing ? `${c.blessing.toUpperCase()} BLESSING` : "AWAITING DIVINE ANSWER"}</div>}</div><span className="member-status">{c.hp <= 0 ? "FALLEN" : c.id === activeId ? "ACTIVE" : "SWITCH"}</span>
              </button>)}</div>
              {party.some((c) => c.hp <= 0) && characters.some((c) => !partyIds.includes(c.id) && c.hp > 0) && <div className="replacement-panel"><div className="section-kicker">REINFORCEMENTS AVAILABLE</div><p>Replace a fallen teammate with a living reserve. This uses your turn, and the enemy attacks afterward.</p>{party.filter((c) => c.hp <= 0).map((fallen) => <div className="replacement-row" key={fallen.id}><span>{fallen.name} <b>FALLEN</b></span><div>{characters.filter((c) => !partyIds.includes(c.id) && c.hp > 0).map((reserve) => <button key={reserve.id} className="replacement-button" disabled={busy || !!result} onClick={() => replaceFallen(fallen.id, reserve.id)}>+ {reserve.name}</button>)}</div></div>)}</div>}

              <div className="active-character-summary"><div className="active-character-avatar" style={{ "--character-color": active?.color }}>{active?.initials}</div><div><span className="section-kicker">ACTIVE CHARACTER</span><h2>{active?.name}</h2><p>{active?.role} / {active?.title}</p></div></div>
              {active?.id === "flora" && !active.blessing && <div className="prayer-warning"><span>✧</span><div><strong>Flora has no blessing.</strong><p>Prayer is her only action. Her God answers after the enemy finishes attacking.</p></div></div>}
              {active?.id === "flora" && active.blessing && <div className={`blessing-banner ${active.blessing}`}><strong>{active.blessing === "harm" ? "HARM HAS BEEN GRANTED" : "GRACE HAS BEEN GRANTED"}</strong><p>{active.blessing === "harm" ? "Flora's divine power can now harm the Buzzy." : "Flora's divine power can now protect and restore her allies."}</p></div>}
              <div className="moves-header"><div><span className="section-kicker">AVAILABLE ACTIONS</span><h3>Choose your move</h3></div><span className="action-count">{currentMoves.length} ACTION{currentMoves.length === 1 ? "" : "S"}</span></div>
              <div className="moves-grid">{currentMoves.map((move, index) => <button className={`move-card ${move.type === "prayer" ? "prayer-move" : ""} ${move.type.startsWith("blessed") || (active?.id === "flora" && active.blessing) ? "blessed-move" : ""}`} key={move.id} disabled={busy || !!result || active?.hp <= 0} onClick={() => move.id === "mercy" ? chooseFloraHealTarget(party.find((c) => c.hp > 0 && c.hp < c.maxHp)?.id || activeId) : performAction(move)}>
                <div className="move-card-top"><span className="move-number">0{index + 1}</span><span className="move-symbol">{move.type === "prayer" ? "✧" : move.type.includes("Heal") || move.type === "blessedHeal" ? "+" : move.type.includes("guard") || move.type === "counter" ? "◇" : "✦"}</span></div><h4>{move.name}</h4><p>{move.text}</p><div className="move-footer"><span>{move.cost}</span><span className="move-arrow">↗</span></div>
              </button>)}</div>
              {showTargetPicker && <p className="target-note">Divine Mercy automatically heals the most injured living ally. You can change this targeting behavior later.</p>}
              <div className="battle-controls"><span><kbd>CLICK</kbd> Choose an action</span><span><kbd>SWITCH</kbd> Costs your turn</span></div>
            </section>
          </div>
          {result && <div className="result-overlay"><div className="result-card"><span className="eyebrow">ENCOUNTER COMPLETE</span><h2>{result === "victory" ? `${enemy.name} is gone.` : "The party has fallen."}</h2><p>{result === "victory" ? "For a moment, the reflection grows quiet." : "The Inverted World swallows the last of your strength."}</p><button className="primary-button" onClick={result === "victory" ? nextEncounter : resetBattle}>{result === "victory" ? "NEXT ENCOUNTER" : "RETRY ENCOUNTER"} <span>→</span></button><button className="quiet-button full-width" onClick={() => setScreen("party")}>CHANGE PARTY</button></div></div>}
        </section>
      )}
      <footer className="page-footer"><span>SHOWN / INVERTED WORLD</span><span>TURN-BASED COMBAT PROTOTYPE</span><span>THE REFLECTION REMEMBERS.</span></footer>
    </main>
  );
}

export default App;
