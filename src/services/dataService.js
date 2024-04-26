import Papa from 'papaparse';

let allData = null;

export const getData = async () => {
    const fileUrl = 'https://raw.githubusercontent.com/thedevagyasharma/mteam-dashboard/main/Data_sample2/timeline-multiplayer%20(32).csv?token=GHSAT0AAAAAACRMQX7EZ4SVEKZ4NFTSIPLYZRMDS3A';
    const response = await fetch(fileUrl)
    const csvText = await response.text();

    const {data} = Papa.parse(csvText, {header: true})

    allData = data.map(row => ({
        ...row,
        "timestamp_seconds": convertTimeStampToSeconds(row["Time Stamp[Hr:Min:Sec]"]),
        "type": categorizeAction(row['SubAction Name'])
    }));
    allData = allData.filter((row) => !isNaN(row['timestamp_seconds']))
    return allData;
};


const convertTimeStampToSeconds = (timeStamp) => {
    const [hours, minutes, seconds] = timeStamp.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
}

const categorizeAction = (action) => {
    if(action?.includes('Shock')){
        return 'Shock'
    } else if (action?.includes('Select')){
        return 'Medication'
    } else if (action?.includes('Pulse')){
        return 'Pulse Check'
    } else if (action?.includes('Order')){
        return 'Order'
    } else if(action?.includes('CPR')){
        return 'CPR'
    } else {
        return 'Unknown'
    }
}

export const getActionData = () => {
    if(!allData){
        throw new Error("Data has not been fetched (Actions Filter)")
    }

    return allData.filter(row => row['Action/Vital Name']?.includes("action"));
}

export const getVitalData = () => {
    if(!allData){
        throw new Error("Data has not been fetched (Vitals Filter)")
    }

    return allData.filter(row => row['Action/Vital Name']?.includes("vital"));
}

export const getCPRData = () => {
    if(!allData){
        throw new Error("Data has not been fetched (CPR Filter)")
    }
    const cprCycles = [];
    const cprRows = allData.filter(row => row['SubAction Name']?.includes("CPR"));

    let currentCycle = {
        startCpr: null,
        endCpr: null
    }
    cprRows.forEach(row => {
        if(row['SubAction Name'].includes("Begin CPR") || row['SubAction Name'].includes("Enter CPR")){
            currentCycle.startCpr = row['timestamp_seconds']
        } else if(row['SubAction Name'].includes("Stop CPR")){
            currentCycle.endCpr = row['timestamp_seconds']
            cprCycles.push(currentCycle);
            currentCycle = {
                startCpr: null,
                endCpr: null
            }
        }
    });
    return cprCycles;
}

export const getDuration = () => {
    if(!allData){
        throw new Error("Data has not been fetched (Get Duration)")
    }
    return allData[allData.length - 1]['timestamp_seconds'];
}

