const treasureHuntData = {
    teams: {
        "Phoenix Order": {
            passcode: "PHOENIX",
            currentStage: 1,
            path: [
                { location: "CHILTERN", clueUrl: "clues/chiltern.html" },
                { location: "GUNMAKERS", clueUrl: "clues/gunmakers.html" },
                { location: "WIMPOLE", clueUrl: "clues/wimpole.html" },
                { location: "GARDEN", clueUrl: "clues/garden.html" },
                { location: "DAUNT", clueUrl: "clues/daunt.html" },
                { location: "WALLACE", clueUrl: "clues/wallace.html" }
            ]
        },
        "Oracle's Chosen": {
            passcode: "ORACLE",
            currentStage: 1,
            path: [
                { location: "KINGS", clueUrl: "clues/kings.html" },
                { location: "WAITROSE", clueUrl: "clues/waitrose.html" },
                { location: "CHILTERN", clueUrl: "clues/chiltern.html" },
                { location: "WIMPOLE", clueUrl: "clues/wimpole.html" },
                { location: "WALLACE", clueUrl: "clues/wallace.html" },
                { location: "GARDEN", clueUrl: "clues/garden.html" }
            ]
        },
        "Harvest Guardians": {
            passcode: "HARVEST",
            currentStage: 1,
            path: [
                { location: "WAITROSE", clueUrl: "clues/waitrose.html" },
                { location: "GARDEN", clueUrl: "clues/garden.html" },
                { location: "KINGS", clueUrl: "clues/kings.html" },
                { location: "DAUNT", clueUrl: "clues/daunt.html" },
                { location: "GUNMAKERS", clueUrl: "clues/gunmakers.html" },
                { location: "CHILTERN", clueUrl: "clues/chiltern.html" }
            ]
        },
        "Wisdom Seekers": {
            passcode: "WISDOM",
            currentStage: 1,
            path: [
                { location: "WALLACE", clueUrl: "clues/wallace.html" },
                { location: "WIMPOLE", clueUrl: "clues/wimpole.html" },
                { location: "GUNMAKERS", clueUrl: "clues/gunmakers.html" },
                { location: "KINGS", clueUrl: "clues/kings.html" },
                { location: "CHILTERN", clueUrl: "clues/chiltern.html" },
                { location: "WAITROSE", clueUrl: "clues/waitrose.html" }
            ]
        },
        "Cartographer's Guild": {
            passcode: "ATLAS",
            currentStage: 1,
            path: [
                { location: "DAUNT", clueUrl: "clues/daunt.html" },
                { location: "CHILTERN", clueUrl: "clues/chiltern.html" },
                { location: "WALLACE", clueUrl: "clues/wallace.html" },
                { location: "WAITROSE", clueUrl: "clues/waitrose.html" },
                { location: "KINGS", clueUrl: "clues/kings.html" },
                { location: "WIMPOLE", clueUrl: "clues/wimpole.html" }
            ]
        },
        "Numerology Circle": {
            passcode: "COSMIC",
            currentStage: 1,
            path: [
                { location: "WIMPOLE", clueUrl: "clues/wimpole.html" },
                { location: "DAUNT", clueUrl: "clues/daunt.html" },
                { location: "WAITROSE", clueUrl: "clues/waitrose.html" },
                { location: "GUNMAKERS", clueUrl: "clues/gunmakers.html" },
                { location: "GARDEN", clueUrl: "clues/garden.html" },
                { location: "KINGS", clueUrl: "clues/kings.html" }
            ]
        }
    },
    
    startingLocation: {
        "PHOENIX": { teamName: "Phoenix Order", firstClue: "clues/chiltern.html" },
        "ORACLE": { teamName: "Oracle's Chosen", firstClue: "clues/kings.html" },
        "HARVEST": { teamName: "Harvest Guardians", firstClue: "clues/waitrose.html" },
        "WISDOM": { teamName: "Wisdom Seekers", firstClue: "clues/wallace.html" },
        "ATLAS": { teamName: "Cartographer's Guild", firstClue: "clues/daunt.html" },
        "COSMIC": { teamName: "Numerology Circle", firstClue: "clues/wimpole.html" }
    },
    
    finalLocation: {
        location: "JACKALOPE",
        passcode: "SANCTUARY",
        clueUrl: "clues/jackalope.html"
    }
};

function validateTeamAccess(location, passcode) {
    // Handle starting location
    if (location === "START") {
        const startData = treasureHuntData.startingLocation[passcode];
        if (startData) {
            return {
                success: true,
                teamName: startData.teamName,
                clueUrl: startData.firstClue
            };
        }
        return { success: false };
    }
    
    // Handle final location - everyone can access with SANCTUARY
    if (location === "JACKALOPE" && passcode === "SANCTUARY") {
        return {
            success: true,
            teamName: "All Teams",
            clueUrl: treasureHuntData.finalLocation.clueUrl
        };
    }

    // Check if any team with this passcode is supposed to visit this location
    for (const teamName in treasureHuntData.teams) {
        const team = treasureHuntData.teams[teamName];
        
        if (team.passcode === passcode) {
            // Check if this team visits this location at ANY point in their path
            const locationInPath = team.path.find(step => step.location === location);
            
            if (locationInPath) {
                return {
                    success: true,
                    teamName: teamName,
                    clueUrl: locationInPath.clueUrl
                };
            }
        }
    }

    return { success: false };
}

function advanceTeam(teamName) {
    if (treasureHuntData.teams[teamName]) {
        treasureHuntData.teams[teamName].currentStage++;
        console.log(`${teamName} advanced to stage ${treasureHuntData.teams[teamName].currentStage}`);
        return true;
    }
    return false;
}

function getTeamProgress(teamName) {
    const team = treasureHuntData.teams[teamName];
    if (team) {
        return {
            teamName: teamName,
            currentStage: team.currentStage,
            totalStages: team.path.length,
            nextLocation: team.path[team.currentStage - 1]?.location || "COMPLETE"
        };
    }
    return null;
}
