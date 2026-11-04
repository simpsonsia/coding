
let userAction = null;
let zombieAction = null;

const user = {
    name: "Leon S Kennedy",
    life: 100,
    maxLife: 100,
    attack: 10,
    heal: 20,
    meds: 3,
    comboCount: 0,
    poisoned: false,
    moved: false,

    move() {
        userAction = "move";
        document.getElementById("userChoice").textContent = "Move";
    },

    attackZombie() {
        userAction = "knife";
        document.getElementById("userChoice").textContent = "Knife Attack";
    },

    useMeds() {
        userAction = "meds";
        document.getElementById("userChoice").textContent = "Use Meds";
    },

    handgun() {
        userAction = "handgun";
        document.getElementById("userChoice").textContent = "Handgun";
    },

    cleanStrike() {
        userAction = "combo";
        document.getElementById("userChoice").textContent = "Clean Strike";
    },

    parry() {
        userAction = "parry";
        document.getElementById("userChoice").textContent = "Parry";
    },

    requiem() {
        userAction = "requiem";
        document.getElementById("userChoice").textContent = "Requiem";
    }
};


const zombie = {
    name: "Zombie",
    life: 150,
    maxLife: 150,
    type: "Tank",
    stunned: false,

    scratch() {
        zombieAction = "scratch";
        document.getElementById("zombieChoice").textContent = "Scratch";
    },

    bite() {
        zombieAction = "bite";
        document.getElementById("zombieChoice").textContent = "Bite";
    },

    tackle() {
        zombieAction = "tackle";
        document.getElementById("zombieChoice").textContent = "Tackle";
    }
};


// ==========================================
// USER BUTTONS
// ==========================================

function userMove() {
    if (battleOver()) return;
    user.move();
}

function userAttack() {
    if (battleOver()) return;
    user.attackZombie();
}

function useMeds() {
    if (battleOver()) return;
    user.useMeds();
}

function specialAttack() {
    if (battleOver()) return;
    user.handgun();
}

function comboAttack() {
    if (battleOver()) return;
    user.cleanStrike();
}

function userParry() {
    if (battleOver()) return;
    user.parry();
}

function userRequiem() {
    if (battleOver()) return;
    user.requiem();
}


// ==========================================
// ZOMBIE BUTTONS
// ==========================================

function zombieScratch() {
    if (battleOver()) return;
    zombie.scratch();
}

function zombieBite() {
    if (battleOver()) return;
    zombie.bite();
}

function zombieTackle() {
    if (battleOver()) return;
    zombie.tackle();
}


// ==========================================
// RESOLVE TURN
// ==========================================

function resolveTurn() {

    if (battleOver()) {
        return;
    }

    if (userAction === null || zombieAction === null) {
        logAction("Both Leon and the zombie must choose an action!");
        return;
    }

    logAction("----- TURN RESOLVED -----");

    const currentUserAction = userAction;
    const currentZombieAction = zombieAction;


    // ======================================
    // LEON'S ACTION
    // ======================================

    resolveUserAction(currentUserAction);


    // ======================================
    // CHECK IF ZOMBIE DIED
    // ======================================

    if (zombie.life <= 0) {

        zombie.life = 0;

        logAction("The zombie has been defeated!");

        clearActions();
        updateUI();

        return;
    }


    // ======================================
    // ZOMBIE'S ACTION
    // ======================================

    resolveZombieAction(
        currentUserAction,
        currentZombieAction
    );


    // ======================================
    // POISON
    // ======================================

    if (user.life > 0) {
        applyPoison();
    }


    // ======================================
    // CHECK BATTLE STATE
    // ======================================

    checkBattleState();


    // ======================================
    // CLEAR ACTIONS
    // ======================================

    clearActions();

    updateUI();
}


// ==========================================
// RESOLVE LEON'S ACTION
// ==========================================

function resolveUserAction(action) {

    // MOVE
    if (action === "move") {

        user.moved = true;

        logAction("Leon prepared to dodge!");

        return;
    }


    // KNIFE
    if (action === "knife") {

        const damage = user.attack;

        zombie.life -= damage;

        logAction(
            `Leon attacked with his knife for ${damage} damage!`
        );

        return;
    }


    // MEDS
    if (action === "meds") {

        if (user.meds <= 0) {

            logAction("Leon has no meds left!");

            return;
        }

        user.meds--;

        const oldLife = user.life;

        user.life += user.heal;

        if (user.life > user.maxLife) {
            user.life = user.maxLife;
        }

        const actualHealing = user.life - oldLife;

        logAction(
            `Leon used meds and recovered ${actualHealing} HP!`
        );

        return;
    }


    // HANDGUN
    if (action === "handgun") {

        const damage = 30;

        zombie.life -= damage;

        logAction(
            `Leon fired his handgun for ${damage} damage!`
        );

        return;
    }


    // CLEAN STRIKE
    if (action === "combo") {

        const damage = user.attack * 3;

        zombie.life -= damage;

        user.comboCount++;

        logAction(
            `Leon performed a Clean Strike for ${damage} damage!`
        );

        logAction(
            `Clean Strikes: ${user.comboCount}`
        );

        return;
    }


    // REQUIEM
    if (action === "requiem") {

        const damage = 60;

        zombie.life -= damage;

        logAction(
            `Leon fired Requiem for ${damage} massive damage!`
        );

        return;
    }


    // PARRY
    if (action === "parry") {

        logAction(
            "Leon prepared to counter the zombie!"
        );

        return;
    }
}


// ==========================================
// RESOLVE ZOMBIE ACTION
// ==========================================

function resolveZombieAction(userAction, zombieAction) {

    if (zombie.life <= 0) {
        return;
    }


    // ======================================
    // ZOMBIE IS STUNNED
    // ======================================

    if (zombie.stunned) {

        logAction(
            "The zombie is still stumbling and cannot attack!"
        );

        zombie.stunned = false;

        return;
    }


    // ======================================
    // LEON MOVES
    // ======================================

    if (userAction === "move") {

        logAction(
            `Leon dodged the zombie's ${getZombieAttackName(zombieAction)}!`
        );

        user.moved = false;

        return;
    }


    // ======================================
    // PARRY
    // ======================================

    if (userAction === "parry") {

        // Tackle cannot be parried.
        if (zombieAction === "tackle") {

            const damage = 15;

            damageUser(damage);

            logAction(
                "The zombie used Tackle!"
            );

            logAction(
                "Tackle cannot be parried!"
            );

            logAction(
                `Leon took ${damage} damage!`
            );

            return;
        }


        // 70% chance of successful parry.
        const success = Math.random() < 0.7;


        if (success) {

            const counterDamage = 20;

            zombie.life -= counterDamage;

            zombie.stunned = true;

            logAction(
                `Leon successfully countered the zombie's ${getZombieAttackName(zombieAction)}!`
            );

            logAction(
                `The zombie took ${counterDamage} counter damage!`
            );

            logAction(
                "The zombie stumbled and will miss its next attack!"
            );

            return;
        }


        // ==================================
        // FAILED PARRY
        // ==================================

        const damage = getZombieDamage(zombieAction);

        damageUser(damage);

        logAction(
            "Leon failed to parry!"
        );

        logAction(
            `Leon took ${damage} damage!`
        );


        // Bite still applies its effects.
        if (zombieAction === "bite" && user.life > 0) {
            biteEffect();
        }

        return;
    }


    // ======================================
    // NORMAL ZOMBIE ATTACK
    // ======================================

    const damage = getZombieDamage(zombieAction);

    damageUser(damage);

    logAction(
        `The zombie used ${getZombieAttackName(zombieAction)} for ${damage} damage!`
    );


    // Bite effects.
    if (zombieAction === "bite" && user.life > 0) {
        biteEffect();
    }
}


// ==========================================
// DAMAGE LEON
// ==========================================

function damageUser(amount) {

    user.life -= amount;

    if (user.life < 0) {
        user.life = 0;
    }
}


// ==========================================
// BITE EFFECT
// ==========================================

function biteEffect() {

    user.poisoned = true;

    const healAmount = 10;

    zombie.life += healAmount;

    if (zombie.life > zombie.maxLife) {
        zombie.life = zombie.maxLife;
    }

    logAction(
        "Leon has been poisoned!"
    );

    logAction(
        `The zombie healed ${healAmount} HP from the bite!`
    );
}


// ==========================================
// ZOMBIE DAMAGE
// ==========================================

function getZombieDamage(action) {

    if (action === "scratch") {
        return 8;
    }

    if (action === "bite") {
        return 12;
    }

    if (action === "tackle") {
        return 15;
    }

    return 0;
}


// ==========================================
// ZOMBIE ATTACK NAME
// ==========================================

function getZombieAttackName(action) {

    if (action === "scratch") {
        return "Scratch";
    }

    if (action === "bite") {
        return "Bite";
    }

    if (action === "tackle") {
        return "Tackle";
    }

    return "Unknown Attack";
}


// ==========================================
// POISON
// ==========================================

function applyPoison() {

    if (!user.poisoned || user.life <= 0) {
        return;
    }

    const poisonDamage = 5;

    user.life -= poisonDamage;

    if (user.life < 0) {
        user.life = 0;
    }

    logAction(
        `Poison dealt ${poisonDamage} damage to Leon!`
    );
}


// ==========================================
// BATTLE STATE
// ==========================================

function checkBattleState() {

    if (zombie.life <= 0) {

        zombie.life = 0;

        logAction(
            "The zombie has been defeated!"
        );

        return;
    }


    if (user.life <= 0) {

        user.life = 0;

        logAction(
            "Leon has been defeated!"
        );
    }
}


// ==========================================
// BATTLE OVER
// ==========================================

function battleOver() {

    return user.life <= 0 || zombie.life <= 0;
}


// ==========================================
// CLEAR ACTIONS
// ==========================================

function clearActions() {

    userAction = null;
    zombieAction = null;

    user.moved = false;

    document.getElementById("userChoice").textContent =
        "No action selected";

    document.getElementById("zombieChoice").textContent =
        "No action selected";
}


// ==========================================
// UPDATE UI
// ==========================================

function updateUI() {

    document.getElementById("userName").textContent =
        user.name;

    document.getElementById("userLife").textContent =
        user.life;

    document.getElementById("userMeds").textContent =
        user.meds;

    document.getElementById("comboCount").textContent =
        user.comboCount;


    document.getElementById("zombieName").textContent =
        zombie.name;

    document.getElementById("zombieLife").textContent =
        zombie.life;

    document.getElementById("zombieType").textContent =
        zombie.type;
}


// ==========================================
// GAME LOG
// ==========================================

function logAction(action) {

    const log = document.getElementById("logMessages");

    const message = document.createElement("p");

    message.textContent = action;

    log.appendChild(message);

    log.scrollTop = log.scrollHeight;
}



updateUI();