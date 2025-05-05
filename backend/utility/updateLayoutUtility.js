export const updateLayoutUtility = (updatedLayouts, dashboardData) => {
    // Iterate through each updated layout in the array
    updatedLayouts.forEach(cardLayout => {
        // Find the index of the card to be updated
        const cardIndex = dashboardData.dashboard.cards.findIndex(card => card.id === cardLayout.id);
        
        // If the card is found, update its layout
        if (cardIndex !== -1) {
            const previousValue = dashboardData.dashboard.cards[cardIndex].layout;
            delete cardLayout.id;
            dashboardData.dashboard.cards[cardIndex].layout = {...previousValue, ...cardLayout };
        } else {
            console.error(`Card with id ${layoutUpdate.id} not found`);
        }
    });

    // Return the updated dashboard data
    return dashboardData;
}