import React, { useState } from "react";

function Filter() {
    const [showSortOptions, setShowSortOptions] = useState(false);

    const toggleSortOptions = () => setShowSortOptions(!showSortOptions);

    return (
        <div className="w-1/3 bg-white p-4 ml-6 shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">Filter</h2>
            <div className="flex flex-col space-y-4">
                <div className="flex justify-between">
                    <button className="bg-dark-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">DUCU Score</button>
                    <button className="bg-dark-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">CodeChef</button>
                    <button className="bg-dark-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Vjudge</button>
                </div>
                <div className="flex justify-between">
                    <button className="bg-dark-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">CodeForces</button>
                    <button className="bg-dark-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">AtCoder</button>
                    <button className="bg-dark-blue hover:bg-gray-500 text-white font-bold py-2 px-4 rounded">No filter</button>
                </div>
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Timeline</label>
                <input type="range" min="2010" max="2024" className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"/>
                <div className="flex justify-between text-xs">
                    <span>2010</span>
                    <span>2024</span>
                </div>
            </div>
            <div className="mt-4 relative">
                <button onClick={toggleSortOptions} className="bg-yellow hover:bg-dark-yellow text-black font-bold py-2 px-4 rounded">
                    Sort By
                </button>
                {showSortOptions && (
                    <div className="bg-white border mt-2 rounded shadow-lg z-10">
                        <button className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full" onClick={() => console.log('Sorting Ascending')}>Ascending</button>
                        <button className="block text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full" onClick={() => console.log('Sorting Descending')}>Descending</button>
                    </div>
                )}
            </div>
            <div className="mt-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Batch</label>
                <div className="flex flex-wrap">
                    <button className="bg-dark-blue hover:bg-blue-700 text-white font-bold py-1 px-3 rounded m-1">All Batch</button>
                    {[24, 25, 26, 27, 28, 29].map((year) => (
                        <button key={year} className="bg-dark-blue hover:bg-blue-700 text-white font-bold py-1 px-3 rounded m-1">{year}</button>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Filter;
