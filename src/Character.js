import React, {
    useState,
    useEffect,
} from 'react';

function Character () {
    const [position, setPosition] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {

        const handleKeyPress = (event) => {
          const keyPressed = event.key;
          const { x, y } = position;
          const collisionDetected = checkCollision(x, y); // 충돌 감지 함수 호출
    
          if (keyPressed === 'ArrowUp') {
            setPosition({ x, y: y - 10 });
          } else if (keyPressed === 'ArrowDown') {
            setPosition({ x, y: y + 10 });
          } else if (keyPressed === 'ArrowLeft') {
            setPosition({ x: x - 10, y });
          } else if (keyPressed === 'ArrowRight') {
            setPosition({ x: x + 10, y });
          }
        };
    
        document.addEventListener('keydown', handleKeyPress);

        return () => {
          document.removeEventListener('keydown', handleKeyPress);
        };
    }, [position]);

      const checkCollision = (x, y) => {
        // 사물의 위치를 하드코딩하여 예시로 나타냄
        const objectX = 100;
        const objectY = 100;
        const objectWidth = 50;
        const objectHeight = 50;
    
        if (
          x < objectX + objectWidth &&
          x + 20 > objectX &&
          y < objectY + objectHeight &&
          y + 20 > objectY
        ) {
          // 충돌이 감지됨
          return true;
        }
    
        // 충돌이 감지되지 않음
        return false;
      };

      return (
        <div
          style={{
            position: 'absolute',
            top: `${position.y}px`,
            left: `${position.x}px`,
          }}
        >
          캐릭터
        </div>
      );
}

export default Character;