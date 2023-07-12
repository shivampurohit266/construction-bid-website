const options: any = {
    threshold: 0.7,
};

const referenceAlreadyExists = new Error(
    "reference already exists in the intersection observer's list"
);

const callbacks: any = new Map();

export const addObserverEntry = (reference: HTMLElement, callback: () => void) => {
    if (callbacks.has(reference)) {
        throw referenceAlreadyExists;
    } else {
        callbacks.set(reference, callback);
        intersectionObserver.observe(reference);
    }
};

export const removeObserverEntry = (reference: HTMLElement) => {
    if (callbacks.has(reference)) {
        callbacks.delete(reference);
        intersectionObserver.unobserve(reference);
    }
};

const intersectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(({ intersectionRatio, target: targetRef }) => {
        if (intersectionRatio > options.threshold) {
            callbacks.get(targetRef)();
        }
    });
}, options);
