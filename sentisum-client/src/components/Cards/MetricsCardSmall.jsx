import React from "react";
import ShimmerUI from "../ShimmerUI";
const MetricsCardSmall = ({ metrics }) => {
    return (
        <div
            className="flex overflow-x-auto overflow-y-hidden gap-6 h-50"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
            {metrics ? (
                metrics.map((metric, index) => (
                    <div
                        key={index}
                        className="min-w-[10rem] h-30 bg-gray-50 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-center items-center border border-gray-200"
                    >
                        <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                            {metric.value}
                        </h3>
                        <p className="text-sm text-gray-500">{metric.label}</p>
                    </div>
                ))
            ) : (
                <ShimmerUI
                    width="100%"
                    numberOfShimmers={4}
                    alignment="horizontal"
                />
            )}
        </div>
    );
};

export default MetricsCardSmall;
