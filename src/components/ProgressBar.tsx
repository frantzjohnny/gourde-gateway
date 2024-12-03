interface ProgressBarProps {
  current: number;
  total: number;
  label: string;
}

export const ProgressBar = ({ current, total, label }: ProgressBarProps) => {
  const percentage = (current / total) * 100;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-lg mt-6">
      <h2 className="text-lg font-semibold mb-4">{label}</h2>
      <div className="space-y-2">
        <div className="h-4 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full card-gradient"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <div className="flex justify-between text-sm text-gray-500">
          <span>HTG {current.toLocaleString()}</span>
          <span>HTG {total.toLocaleString()}</span>
        </div>
        <div className="text-right text-sm text-gray-500">
          {percentage.toFixed(1)}%
        </div>
      </div>
    </div>
  );
};