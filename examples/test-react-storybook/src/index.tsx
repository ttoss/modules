import * as React from 'react';

const MyComponent = () => {
  const [count, setCount] = React.useState(0);

  return (
    <div>
      <span>oi</span>
      <span>{count}</span>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};

export default MyComponent;
