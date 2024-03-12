import React, { useState } from 'react';


const FileUpload = ({ setCsvFile, setIsFileUploaded }) => {
    const [dragOver, setDragOver] = useState(false);

    const handleFileUpload = (e) => {
        if (e.target.files.length === 0) return;
        setCsvFile(e.target.files[0]);
        setIsFileUploaded(true);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = () => {
        setDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragOver(false);
        if (e.dataTransfer.files.length > 0) {
            handleFileUpload({ target: { files: e.dataTransfer.files } });
        }
    };

    return (
        <div className="flex items-center justify-center w-5/6 m-5">
            <label
                htmlFor="dropzone-file"
                className={`flex flex-col items-center justify-center w-4/6 h-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-bray-800 bg-green-700 hover:border-green-500 hover:bg-green-600 border-green-300 ring-2 ring-green-700 ${dragOver ? 'bg-green-400' : ''}`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg className="w-8 h-8 mb-4 text-green-900 font-mono" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                    </svg>
                    <p className="mb-2 text-lg text-green-900 font-mono"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                    <p className="text-lg text-green-900 font-mono">CSV format only</p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" accept=".csv" onChange={handleFileUpload} />
            </label>
        </div>
    )
}

export default FileUpload
