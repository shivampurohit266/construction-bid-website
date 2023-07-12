// utility functions to chain actions

const queues: Map<string, (() => void)[]> = new Map();

const WAIT_DELAY = 230;
const createWait = (delay: number): Promise<void> =>
    new Promise((resolve) => window.setTimeout(resolve, delay));

export const addToQueue = (queueId: string, callback: () => void, delay: number = WAIT_DELAY) => {
    if (!queues.has(queueId)) {
        queues.set(queueId, [callback]);
        executeQueue(queueId, delay);
    } else {
        const currentQueue:any = queues.get(queueId);
        currentQueue.push(callback);
    }
};

const executeQueue = (queueId: string, delay: number) => {
    const nextItem = queues.get(queueId)?.shift() ?? null;

    if (nextItem) {
        nextItem();
        createWait(delay).then(() => {
            if (queues.get(queueId)?.length) {
                executeQueue(queueId, delay);
            } else if (queues.has(queueId)) {
                queues.delete(queueId);
            }
        });
    }
};

export const clearQueue = (queueId: string) => {
    if (queues.has(queueId)) {
        queues.delete(queueId);
    }
};
