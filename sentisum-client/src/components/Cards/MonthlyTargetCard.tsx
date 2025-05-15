import React from 'react';
import { RadialBarChart, RadialBar, PolarAngleAxis } from 'recharts';

export default function MonthlyTarget() {
  const data = [
    {
      name: 'Progress',
      value: 75.55,
      fill: '#465FFF',
    },
  ];

  return (
    <div className="overflow-auto">
      <div className="px-5 shadow-default rounded-2xl pb-11 sm:px-6">
        <div className="relative flex items-center justify-center">
          <div className="relative">
            <RadialBarChart
              width={400} // Adjusted width for better visibility
              height={200} // Adjusted height for semi-circle
              cx="50%"
              cy="50%" // Positioned at the bottom for a semi-circle
              innerRadius="80%" // Adjusted inner radius for better proportions
              outerRadius="100%" // Adjusted outer radius for better proportions
              barSize={20}
              data={data}
              startAngle={90} // Start from the left
              endAngle={-270} // End at the right
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={{ fill: '#E4E7EC' }}
                dataKey="value"
                cornerRadius={10}
              />
            </RadialBarChart>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <span className="block text-2xl font-bold">{data[0].value}%</span>
              <span className="mt-1 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-600">
                +10%
              </span>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-10 w-full max-w-[380px] text-center text-sm text-gray-500 sm:text-base">
          You earn $3287 today, it's higher than last month. Keep up your good
          work!
        </p>
      </div>

      <div className="w-[80%] bg-gray-200 h-px mx-auto"></div>

      <div className="flex items-center justify-center gap-5 px-6 py-3.5 sm:gap-8 sm:py-5">
        {[
          { label: 'Target', value: '$21K', color: '#D92D20' },
          { label: 'Revenue', value: '$20K', color: '#039855' },
          { label: 'Today', value: '$11K', color: '#039855' },
        ].map((item, index) => (
          <React.Fragment key={index}>
            <div>
              <p className="mb-1 text-center text-gray-500 text-theme-xs sm:text-sm">
                {item.label}
              </p>
              <p className="flex items-center justify-center gap-1 text-base font-semibold text-gray-800 sm:text-lg">
                {item.value}
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d={
                      index === 0
                        ? 'M7.26816 13.6632C7.4056 13.8192 7.60686 13.9176 7.8311 13.9176C7.83148 13.9176 7.83187 13.9176 7.83226 13.9176C8.02445 13.9178 8.21671 13.8447 8.36339 13.6981L12.3635 9.70076C12.6565 9.40797 12.6567 8.9331 12.3639 8.6401C12.0711 8.34711 11.5962 8.34694 11.3032 8.63973L8.5811 11.36L8.5811 2.5C8.5811 2.08579 8.24531 1.75 7.8311 1.75C7.41688 1.75 7.0811 2.08579 7.0811 2.5L7.0811 11.3556L4.36354 8.63975C4.07055 8.34695 3.59568 8.3471 3.30288 8.64009C3.01008 8.93307 3.01023 9.40794 3.30321 9.70075L7.26816 13.6632Z'
                        : 'M7.60141 2.33683C7.73885 2.18084 7.9401 2.08243 8.16435 2.08243C8.16475 2.08243 8.16516 2.08243 8.16556 2.08243C8.35773 2.08219 8.54998 2.15535 8.69664 2.30191L12.6968 6.29924C12.9898 6.59203 12.9899 7.0669 12.6971 7.3599C12.4044 7.6529 11.9295 7.65306 11.6365 7.36027L8.91435 4.64004L8.91435 13.5C8.91435 13.9142 8.57856 14.25 8.16435 14.25C7.75013 14.25 7.41435 13.9142 7.41435 13.5L7.41435 4.64442L4.69679 7.36025C4.4038 7.65305 3.92893 7.6529 3.63613 7.35992C3.34333 7.06693 3.34348 6.59206 3.63646 6.29926L7.60141 2.33683Z'
                    }
                    fill={item.color}
                  />
                </svg>
              </p>
            </div>
            {index < 2 && <div className="w-px bg-gray-200 h-7"></div>}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
