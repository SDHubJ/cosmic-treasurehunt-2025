// ==== UPDATED LOGIC.JS FILE ====

const treasureHuntData = {
    teams: {
        "Flames": {
            passcode: "PHOENIX",
            members: ["Anna T", "Carlo (C)", "Ella L", "George BP", "Harry V", "Michael K"],
            path: [
                { location: "CHILTERN", nextClue: "clues/gunmakers.html" },
                { location: "GUNMAKERS", nextClue: "clues/wimpole.html" },
                { location: "WIMPOLE", nextClue: "clues/garden.html" },
                { location: "GARDEN", nextClue: "clues/daunt.html" },
                { location: "DAUNT", nextClue: "clues/wallace.html" },
                { location: "WALLACE", nextClue: "clues/jackalope-clue.html" }
            ]
        },
        "Oracle": {
            passcode: "ORACLE",
            members: ["Annie", "Flinn", "Guy B (C)", "Helena N", "Sakshi", "Defne"],
            path: [
                { location: "KINGS", nextClue: "clues/waitrose.html" },
                { location: "WAITROSE", nextClue: "clues/chiltern.html" },
                { location: "CHILTERN", nextClue: "clues/wimpole.html" },
                { location: "WIMPOLE", nextClue: "clues/wallace.html" },
                { location: "WALLACE", nextClue: "clues/garden.html" },
                { location: "GARDEN", nextClue: "clues/jackalope-clue.html" }
            ]
        },
        "Harvest": {
            passcode: "HARVEST",
            members: ["Abbe McC", "Arnaud", "Lauren G", "Maggie H", "Miles D (C)", "Tom T"],
            path: [
                { location: "WAITROSE", nextClue: "clues/garden.html" },
                { location: "GARDEN", nextClue: "clues/kings.html" },
                { location: "KINGS", nextClue: "clues/daunt.html" },
                { location: "DAUNT", nextClue: "clues/gunmakers.html" },
                { location: "GUNMAKERS", nextClue: "clues/chiltern.html" },
                { location: "CHILTERN", nextClue: "clues/jackalope-clue.html" }
            ]
        },
        "Athena": {
            passcode: "WISDOM",
            members: ["Amanda", "Amy G", "Darcy N", "Harry R", "Paul A (C)", "Hannah R"],
            path: [
                { location: "WALLACE", nextClue: "clues/wimpole.html" },
                { location: "WIMPOLE", nextClue: "clues/gunmakers.html" },
                { location: "GUNMAKERS", nextClue: "clues/kings.html" },
                { location: "KINGS", nextClue: "clues/chiltern.html" },
                { location: "CHILTERN", nextClue: "clues/waitrose.html" },
                { location: "WAITROSE", nextClue: "clues/jackalope-clue.html" }
            ]
        },
        "Atlas": {
            passcode: "ATLAS",
            members: ["Bea I (C)", "Blake E", "Christine", "Jake", "Remi", "Tom M"],
            path: [
                { location: "DAUNT", nextClue: "clues/chiltern.html" },
                { location: "CHILTERN", nextClue: "clues/wallace.html" },
                { location: "WALLACE", nextClue: "clues/waitrose.html" },
                { location: "WAITROSE", nextClue: "clues/kings.html" },
                { location: "KINGS", nextClue: "clues/wimpole.html" },
                { location: "WIMPOLE", nextClue: "clues/jackalope-clue.html" }
            ]
        },
        "Cosmos": {
            passcode: "COSMIC",
            members: ["Matt S", "Alex A (C)", "Lois D", "Lydia P", "Nick B", "Sophie N"],
            path: [
                { location: "WIMPOLE", nextClue: "clues/daunt.html" },
                { location: "DAUNT", nextClue: "clues/waitrose.html" },
                { location: "WAITROSE", nextClue: "clues/gunmakers.html" },
                { location: "GUNMAKERS", nextClue: "clues/garden.html" },
                { location: "GARDEN", nextClue: "clues/kings.html" },
                { location: "KINGS", nextClue: "clues/jackalope-clue.html" }
            ]
        }
    },
    
    startingLocation: {
        "PHOENIX": { teamName: "Flames", firstClue: "clues/chiltern.html" },
        "ORACLE": { teamName: "Oracle", firstClue: "clues/kings.html" },
        "HARVEST": { teamName: "Harvest", firstClue: "clues/waitrose.html" },
        "WISDOM": { teamName: "Athena", firstClue: "clues/wallace.html" },
        "ATLAS": { teamName: "Atlas", firstClue: "clues/daunt.html" },
        "COSMIC": { teamName: "Cosmos", firstClue: "clues/wimpole.html" }
    }
};

// TIMING FUNCTIONS
function recordStartTime(teamName) {
    const startTime = new Date().getTime();
    localStorage.setItem(`team_${teamName}_start`, startTime);
    console.log(`${teamName} started at ${new Date(startTime)}`);
}

function recordFinishTime(teamName) {
    const finishTime = new Date().getTime();
    localStorage.setItem(`team_${teamName}_finish`, finishTime);
    
    const startTime = localStorage.getItem(`team_${teamName}_start`);
    if (startTime) {
        const totalTime = finishTime - parseInt(startTime);
        localStorage.setItem(`team_${teamName}_total`, totalTime);
        console.log(`${teamName} finished in ${formatTime(totalTime)}`);
        return totalTime;
    }
    return null;
}

function formatTime(milliseconds) {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    
    if (hours > 0) {
        return `${hours}h ${minutes}m ${seconds}s`;
    } else {
        return `${minutes}m ${seconds}s`;
    }
}

function getTeamRanking(teamName) {
    const teams = Object.keys(treasureHuntData.teams);
    const finishedTeams = [];
    
    teams.forEach(team => {
        const totalTime = localStorage.getItem(`team_${team}_total`);
        if (totalTime) {
            finishedTeams.push({
                team: team,
                time: parseInt(totalTime)
            });
        }
    });
    
    finishedTeams.sort((a, b) => a.time - b.time);
    
    const teamIndex = finishedTeams.findIndex(t => t.team === teamName);
    if (teamIndex !== -1) {
        return {
            position: teamIndex + 1,
            total: finishedTeams.length
        };
    }
    return null;
}

function findTeamByPasscode(passcode) {
    for (const teamName in treasureHuntData.teams) {
        if (treasureHuntData.teams[teamName].passcode === passcode) {
            return teamName;
        }
    }
    return null;
}

function validateTeamAccess(location, passcode) {
    // Handle starting location
    if (location === "START") {
        const startData = treasureHuntData.startingLocation[passcode];
        if (startData) {
            recordStartTime(startData.teamName);
            return {
                success: true,
                teamName: startData.teamName,
                clueUrl: startData.firstClue
            };
        }
        return { success: false };
    }
    
    // Handle final location - SANCTUARY passcode
    if (location === "JACKALOPE" && passcode === "SANCTUARY") {
        // Find team that just finished (most recent to reach this point)
        // This is tricky without knowing which team, so we'll check for teams that haven't finished yet
        const teams = Object.keys(treasureHuntData.teams);
        let recentTeam = null;
        let mostRecentStart = 0;
        
        teams.forEach(teamName => {
            const startTime = localStorage.getItem(`team_${teamName}_start`);
            const finishTime = localStorage.getItem(`team_${teamName}_finish`);
            
            if (startTime && !finishTime) {
                const start = parseInt(startTime);
                if (start > mostRecentStart) {
                    mostRecentStart = start;
                    recentTeam = teamName;
                }
            }
        });
        
        if (recentTeam) {
            const totalTime = recordFinishTime(recentTeam);
            const ranking = getTeamRanking(recentTeam);
            
            return {
                success: true,
                teamName: recentTeam,
                clueUrl: `clues/victory.html?team=${recentTeam}&time=${totalTime}&rank=${ranking ? ranking.position : 1}`
            };
        }
        
        return {
            success: true,
            teamName: "Unknown Team",
            clueUrl: "clues/victory.html"
        };
    }

    // Find team by passcode and check if they should be at this location
    for (const teamName in treasureHuntData.teams) {
        const team = treasureHuntData.teams[teamName];
        
        if (team.passcode === passcode) {
            const locationStep = team.path.find(step => step.location === location);
            
            if (locationStep) {
                return {
                    success: true,
                    teamName: teamName,
                    clueUrl: locationStep.nextClue
                };
            }
        }
    }

    return { success: false };
}
