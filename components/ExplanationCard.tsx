
import React from 'react';

interface ExplanationCardProps {
  explanation: string;
}

// Helper function to format the text, including proper list handling
const formatExplanation = (text: string) => {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let listItems: string[] = [];

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-1 my-2 pl-4">
          {listItems.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      );
      listItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
      flushList();
      elements.push(<h4 key={index} className="text-xl font-bold text-slate-100 mt-4 mb-2">{trimmedLine.slice(2, -2)}</h4>);
    } else if (trimmedLine.startsWith('* ')) {
      listItems.push(trimmedLine.slice(2));
    } else {
      flushList();
      if (trimmedLine) {
        elements.push(<p key={index} className="mb-2">{trimmedLine}</p>);
      }
    }
  });

  flushList(); // Add any remaining list items at the end

  return elements;
};


const ExplanationCard: React.FC<ExplanationCardProps> = ({ explanation }) => {
  return (
    <div className="bg-slate-800 p-8 rounded-lg shadow-md border border-slate-700">
      <div className="prose prose-lg max-w-none text-slate-300 prose-strong:text-slate-100">
        {formatExplanation(explanation)}
      </div>
    </div>
  );
};

export default ExplanationCard;