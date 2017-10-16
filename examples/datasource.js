const data = [];

for (let i = 1; i <= 5000; ++i) {
    data.push({
        id: i,
        checked: false,
        eventType: `Virus/Malware_${i}`,
        affectedDevices: 20,
        detections: 10
    });
}

module.exports = data;
