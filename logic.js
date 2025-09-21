const treasureHuntData = {
    teams: {
        "Phoenix Order": {
            passcode: "PHOENIX",
            path: [
                { location: "CHILTERN", nextClue: "clues/gunmakers.html" },
                { location: "GUNMAKERS", nextClue: "clues/wimpole.html" },
                { location: "WIMPOLE", nextClue: "clues/garden.html" },
                { location: "GARDEN", nextClue: "clues/daunt.html" },
                { location: "DAUNT", nextClue: "clues/wallace.html" },
                { location: "WALLACE", nextClue: "clues/jackalope.html" }
            ]
        },
        "Oracle's Chosen": {
            passcode: "ORACLE",
            path: [
                { location: "KINGS", nextClue: "clues/waitrose.html" },
                { location: "WAITROSE", nextClue: "clues/chiltern.html" },
                { location: "CHILTERN", nextClue: "clues/wimpole.html" },
                { location: "WIMPOLE", nextClue: "clues/wallace.html" },
                { location: "WALLACE", nextClue: "clues/garden.html" },
                { location: "GARDEN", nextClue: "clues/jackalope.html" }
            ]
        },
        "Harvest Guardians": {
            passcode: "HARVEST",
            path: [
                { location: "WAITROSE", nextClue: "clues/garden.html" },
                { location: "GARDEN", nextClue: "clues/kings.html" },
                { location: "KINGS", nextClue: "clues/daunt.html" },
                { location: "DAUNT", nextClue: "clues/gunmakers.html" },
                { location: "GUNMAKERS", nextClue: "clues/chiltern.html" },
                { location: "CHILTERN", nextClue: "clues/jackalope.html" }
            ]
        },
        "Wisdom Seekers": {
            passcode: "WISDOM",
            path: [
                { location: "WALLACE", nextClue: "clues/wimpole.html" },
                { location: "WIMPOLE", nextClue: "clues/gunmakers.html" },
                { location: "GUNMAKERS", nextClue: "clues/kings.html" },
                { location: "KINGS", nextClue: "clues/chiltern.html" },
                { location: "CHILTERN", nextClue: "clues/waitrose.html" },
                { location: "WAITROSE", nextClue: "clues/jackalope.html" }
            ]
        },
        "Cartographer's Guild": {
            passcode: "ATLAS",
            path: [
                { location: "DAUNT", nextClue: "clues/chiltern.html" },
                { location: "CHILTERN", nextClue: "clues/wallace.html" },
                { location: "WALLACE", nextClue: "clues/waitrose.html" },
                { location: "WAITROSE", nextClue: "clues/kings.html" },
                { location: "KINGS", nextClue: "clues/wimpole.html" },
                { location: "WIMPOLE", nextClue: "clues/jackalope.html" }
            ]
        },
        "Numerology Circle": {
            passcode: "COSMIC",
            path: [
                { location: "WIMPOLE", nextClue: "clues/daunt.html" },
                { location: "DAUNT", nextClue: "clues/waitrose.html" },
                { location: "WAITROSE", nextClue: "clues/gunmakers.html" },
                { location: "GUNMAKERS", nextClue: "clues/garden.html" },
                { location: "GARDEN", nextClue: "clues/kings.html" },
                { location: "KINGS", nextClue: "clues/jackalope.html" }
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

    // Find team by passcode and check if they should be at this location
    for (const teamName in treasureHuntData.teams) {
        const team = treasureHuntData.teams[teamName];
        
        if (team.passcode === passcode) {
            // Find this location in the team's path
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
