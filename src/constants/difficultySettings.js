export const DIFFICULTY_SETTINGS = {
    EASY: {
        birdGravity: { x: 0, y: 300 },
        initialBirdVelocity: { x: 0, y: 0 },
        birdFlapVelocity: 275,
        pipeVerticalDistanceRange: [150, 300],
        pipeHorizontalDistanceRange: [350, 500],
        initialPipesVelocity: { x: -150, y: 0 },
        initialPipesGravity: { x: 0, y: 0 },
    },
    NORMAL: {
        birdGravity: { x: 0, y: 600 },
        initialBirdVelocity: { x: 0, y: 0 },
        birdFlapVelocity: 300,
        pipeVerticalDistanceRange: [150, 250],
        pipeHorizontalDistanceRange: [350, 500],
        initialPipesVelocity: { x: -200, y: 0 },
        initialPipesGravity: { x: -5, y: 0 },
    },
    HARD: {
        birdGravity: { x: 0, y: 800 },
        initialBirdVelocity: { x: 0, y: 0 },
        birdFlapVelocity: 400,
        pipeVerticalDistanceRange: [150, 200],
        pipeHorizontalDistanceRange: [300, 450],
        initialPipesVelocity: { x: -200, y: 0 },
        initialPipesGravity: { x: -10, y: 0 },
    },
    MASOCHISM: {
        birdGravity: { x: 0, y: 900 },
        initialBirdVelocity: { x: 0, y: 0 },
        birdFlapVelocity: 500,
        pipeVerticalDistanceRange: [100, 200],
        pipeHorizontalDistanceRange: [250, 400],
        initialPipesVelocity: { x: -250, y: 0 },
        initialPipesGravity: { x: -20, y: 0 },
    },
    ASIAN: {
        birdGravity: { x: 0, y: 1000 },
        initialBirdVelocity: { x: 0, y: 0 },
        birdFlapVelocity: 600,
        pipeVerticalDistanceRange: [100, 150],
        pipeHorizontalDistanceRange: [200, 350],
        initialPipesVelocity: { x: -300, y: 0 },
        initialPipesGravity: { x: -20, y: 0 },
    },
}

export default DIFFICULTY_SETTINGS
