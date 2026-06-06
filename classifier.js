export function classifyAircraft(acft) {
    const isOnGround = acft.isOnGround;
    const altitude = acft.altitude || 0;
    const groundSpeed = acft.groundSpeed || 0;

    // PARKED
    if (isOnGround && groundSpeed < 5) {
        return "PARKED";
    }

    // TAXIING
    if (isOnGround && groundSpeed >= 5) {
        return "TAXIING";
    }

    // DEPARTING (your simplified logic)
    if (!isOnGround && altitude < 2000) {
        return "DEPARTING";
    }

    // ENROUTE
    return "ENROUTE";
}
