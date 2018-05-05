import moment from '../tools/moment';

let initialMilestone, initialSubtangleMilestone, timestamp;

export default function syncVelocity(milestone, subtangleMilestone) {
    if (!initialMilestone || !initialSubtangleMilestone) {
        initialMilestone = milestone;
        initialSubtangleMilestone = subtangleMilestone;
        timestamp = moment();
        return { velocity: 0, minutesLeft: Infinity };
    }
    const diffMilestones = milestone - initialMilestone;
    const diffSubtangleMilestones = subtangleMilestone - initialSubtangleMilestone;
    let diffTime = moment().diff(timestamp);
    if(diffTime === 0) {
        return { velocity: 0, minutesLeft: Infinity };
    }
    const mVelocity = diffMilestones / diffTime * 1000 * 60; // minutes
    const msVelocity = diffSubtangleMilestones / diffTime * 1000 * 60; // minutes
    const velocity = msVelocity - mVelocity;
    const minutesLeft = velocity <= 0 ? Infinity  : (milestone - subtangleMilestone) / velocity;
    console.log('> mVelocity:', mVelocity, ' msVelocity:', msVelocity, ' velocity:', velocity);
    return { velocity, minutesLeft };
}
