import React from 'react';
import { useTransition, animated } from '@react-spring/web';

function WinningLine({ winningLine }) {
  const transitions = useTransition(winningLine, null, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return transitions.map(({ item, key, props }) =>
    item ? (
      <animated.div key={key} style={props} className="winning-line">
        {/* Add your winning line styles here */}
      </animated.div>
    ) : null
  );
}

export default WinningLine;
