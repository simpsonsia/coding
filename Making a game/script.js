const log = document.getElementById('log');
const moveBtn = document.getElementById('moveBtn');
const attackBtn = document.getElementById('attackBtn');
const runBtn = document.getElementById('runBtn');
const blockBtn = document.getElementById('blockBtn');
const specialBtn = document.getElementById('specialBtn');
const retryBtn = document.getElementById('retryBtn');
const ultimateBtn = document.getElementById('ultimateBtn');
const absorbBtn = document.getElementById('absorbBtn');

const playerHpElement = document.getElementById('playerHp');
const playerLevelElement = document.getElementById('playerLevel');
const playerExpElement = document.getElementById('playerXp');
const ultimateMeterElement = document.getElementById('ultimateMeter');
const ultimateFillElement = document.getElementById('ultimateFill');

let currentEnemy = null;

function createLog(text) {
    const message = document.createElement('p');
    message.textContent = text;
    log.append(message);
    log.scrollTop = log.scrollHeight;
}

class Character {
    constructor(name, hp, atkPwr, inventory, level, exp = 0) {
        this.name = name;
        this.hp = hp;
        this.maxHp = hp;
        this.atkPower = atkPwr;
        this.inventory = inventory;
        this.level = level;
        this.exp = exp;
        this.blocking = false;
        this.expReward = 0;
    }

    attack(combatant) {
        let damage = this.atkPower;

        if (Math.random() > 0.9) {
            damage = Math.ceil(damage * 4.3);
            createLog('Critical Strike!');
        }

        if (combatant.blocking) {
            damage = Math.ceil(damage * 0.25);
            createLog(`${combatant.name} blocks the attack!`);
            createLog('Damage reduced by 75%!');
        }

        combatant.hp -= damage;

        if (combatant.hp < 0) {
            combatant.hp = 0;
        }

        const equipment = this.inventory.join(' & ');

        createLog(
            `${this.name} attacks ${combatant.name} with ${equipment} for ${damage} damage!`
        );

        createLog(
            `${combatant.name} has ${combatant.hp}/${combatant.maxHp} HP remaining.`
        );

        combatant.blocking = false;
        updateUI();
    }
}

const player = new Character(
    'Starkk',
    4012,
    30,
    ['Corrupted Arm', 'Telekinesis'],
    1
);

const Furiosus = new Character(
    'Furiosus',
    1070,
    500,
    ['Claws', 'Telekinesis'],
    3
);

Furiosus.expReward = 70;

const Daemon = new Character(
    'Daemon',
    160,
    120,
    ['Corrupted Pipe'],
    2
);

Daemon.expReward = 25;

const Grunt = new Character(
    'Grunt',
    120,
    106,
    ['Pipe'],
    1
);

Grunt.expReward = 25;

const enemies = [
    Furiosus,
    Daemon,
    Grunt
];

let ultimateMeter = 0;
const ultimateMax = 100;

function gainUltimate(amount) {
    if (ultimateMeter >= ultimateMax) {
        return;
    }

    ultimateMeter += amount;

    if (ultimateMeter > ultimateMax) {
        ultimateMeter = ultimateMax;
    }

    createLog(
        `Cascading Junk Pile meter: ${ultimateMeter}/${ultimateMax}`
    );

    updateUI();
}

function resetUltimate() {
    ultimateMeter = 0;
    updateUI();
}

function getExpNeeded() {
    return player.level * 100;
}

function gainExp(amount) {
    player.exp += amount;

    createLog(`${player.name} gained ${amount} EXP!`);
    createLog(`EXP: ${player.exp}/${getExpNeeded()}`);

    while (player.exp >= getExpNeeded()) {
        player.exp -= getExpNeeded();
        levelUp();
    }

    updateUI();
}

function levelUp() {
    player.level++;
    player.maxHp += 250;
    player.hp = player.maxHp;
    player.atkPower += 15;

    createLog(`LEVEL UP! ${player.name} is now Level ${player.level}!`);
    createLog(`Max HP increased to ${player.maxHp}!`);
    createLog(`Attack Power increased to ${player.atkPower}!`);
    createLog(`${player.name} has been fully healed!`);

    updateUI();
}

function specialAttack(caster, combatant, element, power) {
    let damage = Math.ceil(caster.atkPower * power);

    if (Math.random() > 0.9) {
        damage = Math.ceil(damage * 4.3);
        createLog('Critical Hit!');
    }

    if (combatant.blocking) {
        damage = Math.ceil(damage * 0.25);
        createLog(`${combatant.name} blocks the attack!`);
        createLog('Damage reduced by 75%!');
    }

    combatant.hp -= damage;

    if (combatant.hp < 0) {
        combatant.hp = 0;
    }

    createLog(
        `${caster.name} uses ${element} for ${damage} damage!`
    );

    createLog(
        `${combatant.name} has ${combatant.hp}/${combatant.maxHp} HP remaining.`
    );

    combatant.blocking = false;
    updateUI();
}

function telekinesisAttack(caster, combatant) {
    let damage = Math.ceil(caster.atkPower * 1.5);

    if (Math.random() > 0.9) {
        damage = Math.ceil(damage * 4.3);
        createLog('Critical Strike!');
    }

    if (combatant.blocking) {
        damage = Math.ceil(damage * 0.25);
        createLog(`${combatant.name} blocks the attack!`);
        createLog('Damage reduced by 75%!');
    }

    combatant.hp -= damage;

    if (combatant.hp < 0) {
        combatant.hp = 0;
    }

    createLog(`${caster.name} uses Telekinesis!`);
    createLog(
        `${caster.name} throws random object at ${combatant.name} dealing ${damage} damage!`
    );

    createLog(
        `${combatant.name} has ${combatant.hp}/${combatant.maxHp} HP remaining.`
    );

    combatant.blocking = false;
    updateUI();
}

function handleAbsorb() {
    if (currentEnemy === null) {
        createLog("There's no enemy to absorb from.");
        return;
    }

    if (player.hp <= 0) {
        createLog(`${player.name} has fallen. Retry to continue.`);
        return;
    }

    if (
        currentEnemy.name !== 'Furiosus' &&
        currentEnemy.name !== 'Daemon'
    ) {
        createLog(`Absorb has no effect on ${currentEnemy.name}.`);
        return;
    }

    const quarterHealth = currentEnemy.maxHp * 0.25;

    if (currentEnemy.hp > quarterHealth) {
        createLog(`${currentEnemy.name} is not weak enough to absorb.`);
        createLog(
            `Absorb only works when ${currentEnemy.name} is at 25% HP or lower.`
        );
        return;
    }

    const healAmount = 250;

    player.hp += healAmount;

    if (player.hp > player.maxHp) {
        player.hp = player.maxHp;
    }

    createLog(`${player.name} uses Absorb on ${currentEnemy.name}!`);
    createLog(`${player.name} absorbs energy from ${currentEnemy.name}!`);
    createLog(`${player.name} restores ${healAmount} HP!`);

    createLog(
        `${player.name} has ${player.hp}/${player.maxHp} HP.`
    );

    gainUltimate(15);

    handleEnemyTurn();
}

function handleSpecialAttack() {
    if (currentEnemy === null) {
        createLog("You can't hit what you can't see.");
        return;
    }

    if (player.hp <= 0) {
        createLog(`${player.name} has fallen. Retry to continue.`);
        return;
    }

    telekinesisAttack(player, currentEnemy);
    gainUltimate(25);

    if (currentEnemy.hp <= 0) {
        defeatEnemy();
        return;
    }

    handleEnemyTurn();
}

function handleUltimateAttack() {
    if (currentEnemy === null) {
        createLog("You can't hit what you can't see.");
        return;
    }

    if (player.hp <= 0) {
        createLog(`${player.name} has fallen. Retry to continue.`);
        return;
    }

    if (ultimateMeter < ultimateMax) {
        createLog("Cascading Junk Pile isn't ready!");

        createLog(
            `Ultimate Meter: ${ultimateMeter}/${ultimateMax}`
        );

        return;
    }

    createLog(`${player.name} unleashes Cascading Junk Pile!`);

    specialAttack(
        player,
        currentEnemy,
        'Cascading Junk Pile',
        2.0
    );

    resetUltimate();

    if (currentEnemy.hp <= 0) {
        defeatEnemy();
        return;
    }

    handleEnemyTurn();
}

function handleMove() {
    if (currentEnemy !== null) {
        createLog(`You're already fighting ${currentEnemy.name}!`);
        return;
    }

    if (player.hp <= 0) {
        createLog(`${player.name} has fallen. Retry to continue.`);
        return;
    }

    if (Math.random() < 0.5) {
        createLog('Initiating Combat!');

        gainUltimate(5);
        handleEncounter();
    } else {
        createLog('The World Is Yours...');
    }

    updateUI();
}

function handleEncounter() {
    const randomIndex = Math.floor(
        Math.random() * enemies.length
    );

    currentEnemy = enemies[randomIndex];

    currentEnemy.hp = currentEnemy.maxHp;
    currentEnemy.blocking = false;

    createLog(`${currentEnemy.name} is in your path!`);

    createLog(
        `${currentEnemy.name} has ${currentEnemy.hp}/${currentEnemy.maxHp} HP.`
    );

    createLog(
        `${currentEnemy.name} is equipped with ${currentEnemy.inventory.join(' & ')}.`
    );

    updateUI();
}

function defeatEnemy() {
    if (currentEnemy === null) {
        return;
    }

    const defeatedEnemy = currentEnemy;

    createLog(`${defeatedEnemy.name} has been defeated!`);

    createLog(
        `${defeatedEnemy.name} dropped ${defeatedEnemy.expReward} EXP!`
    );

    gainExp(defeatedEnemy.expReward);

    currentEnemy = null;

    updateUI();
}

function updateUI() {
    if (playerHpElement) {
        playerHpElement.textContent = player.hp;
    }

    if (playerLevelElement) {
        playerLevelElement.textContent = player.level;
    }

    if (playerExpElement) {
        playerExpElement.textContent =
            `${player.exp} / ${getExpNeeded()}`;
    }

    if (ultimateMeterElement) {
        ultimateMeterElement.textContent =
            `${ultimateMeter} / ${ultimateMax}`;
    }

    if (ultimateFillElement) {
        ultimateFillElement.style.width =
            `${ultimateMeter}%`;
    }
}

function handleEnemyTurn() {
    if (currentEnemy === null || player.hp <= 0) {
        return;
    }

    const oldHp = player.hp;

    currentEnemy.attack(player);

    const damageTaken = oldHp - player.hp;

    if (damageTaken > 0) {
        gainUltimate(10);
    }

    if (player.hp <= 0) {
        player.hp = 0;

        createLog(`${player.name} has fallen!`);
        createLog(
            'Press Retry to start the battle again at full health.'
        );
    }

    updateUI();
}

function handleCombat() {
    if (currentEnemy === null) {
        createLog("You can't hit what you can't see.");
        return;
    }

    if (player.hp <= 0) {
        createLog(`${player.name} has fallen. Retry to continue.`);
        return;
    }

    player.attack(currentEnemy);
    gainUltimate(20);

    if (currentEnemy.hp <= 0) {
        defeatEnemy();
        return;
    }

    handleEnemyTurn();
}

function handleBlock() {
    if (currentEnemy === null) {
        createLog("There's nothing to block.");
        return;
    }

    if (player.hp <= 0) {
        createLog(`${player.name} has fallen. Retry to continue.`);
        return;
    }

    player.blocking = true;

    createLog(`${player.name} raises their guard!`);
    createLog('Incoming damage will be reduced by 75%.');

    gainUltimate(10);

    handleEnemyTurn();
}

function handleRetry() {
    if (player.hp > 0) {
        createLog(
            `${player.name} is still alive. There is nothing to retry.`
        );
        return;
    }

    player.hp = player.maxHp;
    player.blocking = false;

    if (currentEnemy !== null) {
        currentEnemy.hp = currentEnemy.maxHp;
        currentEnemy.blocking = false;
    }

    createLog(`${player.name} has returned to the fight!`);

    createLog(
        `${player.name} has ${player.hp}/${player.maxHp} HP.`
    );

    if (currentEnemy !== null) {
        createLog(`${currentEnemy.name} has returned to full health!`);

        createLog(
            `${currentEnemy.name} has ${currentEnemy.hp}/${currentEnemy.maxHp} HP.`
        );
    }

    updateUI();
}

function handleRun() {
    if (currentEnemy === null) {
        createLog("There's nothing to run from.");
        return;
    }

    if (player.hp <= 0) {
        createLog(`${player.name} has fallen. Retry to continue.`);
        return;
    }

    const chance = Math.floor(Math.random() * 20) + 1;

    if (chance < 10) {
        createLog('You successfully escaped!');

        currentEnemy = null;

        updateUI();
    } else {
        createLog('You failed to escape!');
        createLog(`${currentEnemy.name} attacks!`);

        handleEnemyTurn();
    }
}

moveBtn.addEventListener('click', handleMove);
attackBtn.addEventListener('click', handleCombat);
specialBtn.addEventListener('click', handleSpecialAttack);
runBtn.addEventListener('click', handleRun);
blockBtn.addEventListener('click', handleBlock);
retryBtn.addEventListener('click', handleRetry);
ultimateBtn.addEventListener('click', handleUltimateAttack);
absorbBtn.addEventListener('click', handleAbsorb);

updateUI();


