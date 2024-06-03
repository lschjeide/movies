import React from 'react';

interface HeadingProps {
  title: string;
}

const Heading: React.FC<HeadingProps> = ({ title }) => {
  return (
    <h1 className="mt-5 p-5 rounded-lg w-fit text-2xl mx-5 text-black font-bold bg-yellow-500">
      {title}
    </h1>
  );
};

export default Heading;