import Papa from 'papaparse';

export const convertCsvToJson = (file) => {
    return new Promise((resolve, reject) => {
        Papa.parse(file, {
            header: true,
            complete: (results) => {
                resolve(results.data);
            },
            error: (err) => {
                reject(err);
            },
        });
    });
};