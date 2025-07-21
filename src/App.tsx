import React, { useCallback, useEffect } from 'react';

type Props = { name: string };

/*A fight between two typescript functions*/
const FunctionFight: React.FC<Props> = props => {
  // use state that will track whether the element is shown
  const [showElement, setShowElement] = React.useState<boolean>(true);
  // use state to track the creator's score
  const [creatorScore, setCreatorScore] = React.useState<number>(0);
  // use state to track the destroyer's score
  const [destroyerScore, setDestroyerScore] = React.useState<number>(0);
  // track who is winning the fight
  const [winner, setWinner] = React.useState<string | null>(null);
  // track whether the fight is ongoing
  const [fightActive, setFightActive] = React.useState<boolean>(true);

  // function to handle the end of the fight
  const onFightEnd = useCallback(() => {
    console.log('Fight ended');
    setFightActive(false);
  }, []);

  useEffect(() => {
    console.log(
      `Creator Score: ${creatorScore}, Destroyer Score: ${destroyerScore}`
    );
    if (!fightActive) {
      setWinner(
        creatorScore === destroyerScore
          ? 'Draw'
          : creatorScore > destroyerScore
          ? 'Creator'
          : 'Destroyer'
      );
      if (winner === 'Creator') {
        setShowElement(true);
      }
    }
  }, [creatorScore, destroyerScore, fightActive, winner]);

  // function to handle the fight starting
  const onFightStart = useCallback(() => {
    console.log('Fight started');
    setCreatorScore(0);
    setDestroyerScore(0);
    setWinner(null);
    setFightActive(true);
    setShowElement(true);
  }, []);

  // function to create the element
  const createElement = useCallback(() => {
    console.log('Creating element');
    setShowElement(true);
    setCreatorScore(prev => prev + 1);
  }, []);

  // function to destroy the element
  const destroyElement = useCallback(() => {
    console.log('Destroying element');
    setShowElement(false);
    setDestroyerScore(prev => prev + 1);
  }, []);

  // useEffect to simulate the fight between the two functions
  // use setInterval to alternate between creating and destroying the element
  useEffect(() => {
    if (!fightActive) return;
    console.log('Fight is active');
    const createOnInterval: ReturnType<typeof setInterval> = setInterval(
      () => createElement(),
      1000
    );

    const destroyOnInterval: ReturnType<typeof setInterval> = setInterval(
      () => destroyElement(),
      2000
    );

    return () => {
      clearInterval(createOnInterval);
      clearInterval(destroyOnInterval);
    };
  }, [fightActive]);

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>{props.name}</h1>
      <div
        style={{
          position: 'fixed',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        {showElement && (
          <p>I&apos;m the DOM element they&apos;re fighting over!</p>
        )}
        <p>Creator Score: {creatorScore}</p>
        <p>Destroyer Score: {destroyerScore}</p>
        {fightActive && <button onClick={onFightEnd}>End Fight</button>}
        {!fightActive && <button onClick={onFightStart}>Start Fight</button>}
        {!fightActive && <h3>Winner: {winner}</h3>}
      </div>
    </div>
  );
};

export default FunctionFight;
