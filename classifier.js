export function classifyAircraft(acft, airport) {
    const fp = acft.flightPlan || {};

    const from = fp.departing;
    const to = fp.arriving;

    const isOnGround = acft.isOnGround;
    const groundSpeed = acft.groundSpeed || 0;
    const altitude = acft.altitude || 0;

    // PARKED
    if (isOnGround && groundSpeed < 5) {
        return "PARKED";
    }

    // TAXIING
    if (isOnGround && groundSpeed >= 5) {
        return "TAXIING";
    }

    // DEPARTING (from THIS airport)
    if (!isOnGround && from === airport && altitude < 2000) {
        return "DEPARTING";
    }

    // ARRIVING (TO THIS airport)
    if (!isOnGround && to === airport) {
        return "ARRIVING";
    }

    // ENROUTE
    return "ENROUTE";
}
