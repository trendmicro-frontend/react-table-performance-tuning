const data = [];

for (let i = 1; i < 1000; ++i) {
    data.push({
        id: i,
        checked: false,
        eventType: `Virus/Malware_${i}`,
        affectedDevices: 20 + i,
        detections: 10 + i
    });
}

module.exports = data;
