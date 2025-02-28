import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handleKeyPress = (event) => {
      const key = event.key;
      if (/^[0-9.+\-*/%]$/.test(key)) {
        setValue((prev) => prev + key);
      } else if (key === 'Enter') {
        try {
          setValue((prev) => eval(prev).toString());
        } catch {
          setValue('Error');
        }
      } else if (key === 'Backspace') {
        setValue((prev) => prev.slice(0, -1));
      } else if (key === 'Escape') {
        setValue('');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="container">
      <div className="calculator">
        <form>
          <div className="display">
            <input type="text" value={value} readOnly />
          </div>
          <div>
            <input type="button" value="AC" onClick={() => setValue('')} />
            <input type="button" value="DEL" onClick={() => setValue(value.slice(0, -1))} />
            <input type="button" value="." onClick={() => setValue(value + '.')} />
            <input type="button" value="/" onClick={() => setValue(value + '/')} />
          </div>
          <div>
            <input type="button" value="7" onClick={() => setValue(value + '7')} />
            <input type="button" value="8" onClick={() => setValue(value + '8')} />
            <input type="button" value="9" onClick={() => setValue(value + '9')} />
            <input type="button" value="*" onClick={() => setValue(value + '*')} />
          </div>
          <div>
            <input type="button" value="4" onClick={() => setValue(value + '4')} />
            <input type="button" value="5" onClick={() => setValue(value + '5')} />
            <input type="button" value="6" onClick={() => setValue(value + '6')} />
            <input type="button" value="+" onClick={() => setValue(value + '+')} />
          </div>
          <div>
            <input type="button" value="1" onClick={() => setValue(value + '1')} />
            <input type="button" value="2" onClick={() => setValue(value + '2')} />
            <input type="button" value="3" onClick={() => setValue(value + '3')} />
            <input type="button" value="-" onClick={() => setValue(value + '-')} />
          </div>
          <div>
            <input type="button" value="00" onClick={() => setValue(value + '00')} />
            <input type="button" value="0" onClick={() => setValue(value + '0')} />
            <input type="button" value="=" className="equal" onClick={() => {
              try {
                setValue(eval(value).toString());
              } catch {
                setValue('Error');
              }
            }} />
            <input type="button" value="%" onClick={() => setValue(value + '%')} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
