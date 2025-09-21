const treasureHuntData = {
    teams: {
        "Flames": {
            passcode: "PHOENIX",
            path: [
                { location: "CHILTERN", nextClue: "clues/forge.html" },
                { location: "GUNMAKERS", nextClue: "clues/nexus.html" },
                { location: "WIMPOLE", nextClue: "clues/gateway.html" },
                { location: "GARDEN", nextClue: "clues/atlas.html" },
                { location: "DAUNT", nextClue: "clues/wisdom.html" },
                { location: "WALLACE", nextClue: "clues/sanctuary.html" }
            ]
        },
        "Oracle": {
            passcode: "ORACLE",
            path: [
                { location: "KINGS", nextClue: "clues/harvest.html" },
                { location: "WAITROSE", nextClue: "clues/phoenix.html" },
                { location: "CHILTERN", nextClue: "clues/nexus.html" },
                { location: "WIMPOLE", nextClue: "clues/wisdom.html" },
                { location: "WALLACE", nextClue: "clues/gateway.html" },
                { location: "GARDEN", nextClue: "clues/sanctuary.html" }
            ]
        },
        "Harvest": {
            passcode: "HARVEST",
            path: [
                { location: "WAITROSE", nextClue: "clues/gateway.html" },
                { location: "GARDEN", nextClue: "clues/crown.html" },
                { location: "KINGS", nextClue: "clues/atlas.html" },
                { location: "DAUNT", nextClue: "clues/forge.html" },
                { location: "GUNMAKERS", nextClue: "clues/phoenix.html" },
                { location: "CHILTERN", nextClue: "clues/sanctuary.html" }
            ]
        },
        "Athena": {
            passcode: "WISDOM",
            path: [
                { location: "WALLACE", nextClue: "clues/nexus.html" },
                { location: "WIMPOLE", nextClue: "clues/forge.html" },
                { location: "GUNMAKERS", nextClue: "clues/crown.html" },
                { location: "KINGS", nextClue: "clues/phoenix.html" },
                { location: "CHILTERN", nextClue: "clues/harvest.html" },
                { location: "WAITROSE", nextClue: "clues/sanctuary.html" }
            ]
        },
        "Atlas": {
            passcode: "ATLAS",
            path: [
                { location: "DAUNT", nextClue: "clues/phoenix.html" },
                { location: "CHILTERN", nextClue: "clues/wisdom.html" },
                { location: "WALLACE", nextClue: "clues/harvest.html" },
                { location: "WAITROSE", nextClue: "clues/crown.html" },
                { location: "KINGS", nextClue: "clues/nexus.html" },
                { location: "WIMPOLE", nextClue: "clues/sanctuary.html" }
            ]
        },
        "Cosmos": {
            passcode: "COSMIC",
            path: [
                { location: "WIMPOLE", nextClue: "clues/atlas.html" },
                { location: "DAUNT", nextClue: "clues/harvest.html" },
                { location: "WAITROSE", nextClue: "clues/forge.html" },
                { location: "GUNMAKERS", nextClue: "clues/gateway.html" },
                { location: "GARDEN", nextClue: "clues/crown.html" },
                { location: "KINGS", nextClue: "clues/sanctuary.html" }
            ]
        }
    },
    
    startingLocation: {
        "PHOENIX": { teamName: "Flames", firstClue: "clues/phoenix.html" },
        "ORACLE": { teamName: "Oracle", firstClue: "clues/crown.html" },
        "HARVEST": { teamName: "Harvest", firstClue: "clues/harvest.html" },
        "WISDOM": { teamName: "Athena", firstClue: "clues/wisdom.html" },
        "ATLAS": { teamName: "Atlas", firstClue: "clues/atlas.html" },
        "COSMIC": { teamName: "Cosmos", firstClue: "clues/nexus.html" }
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
