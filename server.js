import express from "express";
import cors from "cors";

import { setAircraftCache, getAircraftCache } from "./data.js";
import { classifyAircraft } from "./classifier.js";

const app = express();
app.use(cors());

const API_URL = "https://24data.ptfs.app/acft-data";

// ---------- POLLING LOOP ----------
async function fetchAircraft() {
    try {
        const res = await fetch(API_URL);
        const data = await res.json();

        const processed = [];

        for (const [callsign, acft] of Object.entries(data)) {
            processed.push({
                callsign,
                aircraft: acft.aircraftType,
                pilot: acft.playerName,
                altitude: acft.altitude,
                speed: acft.speed,
                groundSpeed: acft.groundSpeed,
                isOnGround: acft.isOnGround,
                strip: classifyAircraft(acft)
            });
        }

        setAircraftCache(processed);

    } catch (err) {
        console.log("Fetch error:", err.message);
    }
}

// poll every 3 seconds (as recommended)
setInterval(fetchAircraft, 3000);
fetchAircraft();

// ---------- API ROUTE ----------
app.get("/aircraft", (req, res) => {
    res.json({
        lastUpdate: Date.now(),
        count: getAircraftCache().length,
        aircraft: getAircraftCache()
    });
});

// ---------- START SERVER ----------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Clanker24 backend running on port ${PORT}`);
});
