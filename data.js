export let aircraftCache = {};

export function setAircraftCache(newData) {
    aircraftCache = newData;
}

export function getAircraftCache() {
    return aircraftCache;
}
