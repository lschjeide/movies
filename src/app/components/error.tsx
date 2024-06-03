import React from 'react';

interface HeadingProps {
  error: string | null;
}

const Heading: React.FC<HeadingProps> = ({ error }) => {
  return (
    <h1 className="mt-5 p-5 rounded-lg w-fit text-2xl mx-5 text-black font-bold bg-coca-cola-red">
      {error}
    </h1>
  );
};

export default Heading;