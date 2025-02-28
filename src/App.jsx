import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handleKeyPress = (event) => {
      event.preventDefault();
      const key = event.key;
      const button = document.querySelector(`input[value="${key}"]`);
      
      if (button) {
        button.classList.add("active");
        setTimeout(() => button.classList.remove("active"), 150);
      }

      if (/^[0-9.+\-*/%]$/.test(key)) {
        setValue((prev) => (prev === "Error" ? key : prev + key));
      } else if (key === 'Enter' || key === '=') {
        if (value.trim() === '' || value === "Error") return;
        try {
          setValue(eval(value).toString());
        } catch {
          setValue('Error');
        }
      } else if (key === 'Backspace') {
        setValue((prev) => (prev === "Error" ? '' : prev.slice(0, -1)));
      } else if (key === 'Escape') {
        setValue('');
      }
    };
  
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [value]);

  return (
    <div className="container">
      <div className="calculator">
        <form>
          <div className="display">
            <input type="text" value={value} readOnly />
          </div>
          <div>
            <input type="button" value="AC" onClick={() => setValue('')} />
            <input type="button" value="DEL" onClick={() => setValue(value === "Error" ? '' : value.slice(0, -1))} />
            <input type="button" value="." onClick={() => setValue(value === "Error" ? '.' : value + '.')} />
            <input type="button" value="/" onClick={() => setValue(value === "Error" ? '/' : value + '/')} />
          </div>
          <div>
            <input type="button" value="7" onClick={() => setValue(value === "Error" ? '7' : value + '7')} />
            <input type="button" value="8" onClick={() => setValue(value === "Error" ? '8' : value + '8')} />
            <input type="button" value="9" onClick={() => setValue(value === "Error" ? '9' : value + '9')} />
            <input type="button" value="*" onClick={() => setValue(value === "Error" ? '*' : value + '*')} />
          </div>
          <div>
            <input type="button" value="4" onClick={() => setValue(value === "Error" ? '4' : value + '4')} />
            <input type="button" value="5" onClick={() => setValue(value === "Error" ? '5' : value + '5')} />
            <input type="button" value="6" onClick={() => setValue(value === "Error" ? '6' : value + '6')} />
            <input type="button" value="+" onClick={() => setValue(value === "Error" ? '+' : value + '+')} />
          </div>
          <div>
            <input type="button" value="1" onClick={() => setValue(value === "Error" ? '1' : value + '1')} />
            <input type="button" value="2" onClick={() => setValue(value === "Error" ? '2' : value + '2')} />
            <input type="button" value="3" onClick={() => setValue(value === "Error" ? '3' : value + '3')} />
            <input type="button" value="-" onClick={() => setValue(value === "Error" ? '-' : value + '-')} />
          </div>
          <div>
            <input type="button" value="00" onClick={() => setValue(value === "Error" ? '00' : value + '00')} />
            <input type="button" value="0" onClick={() => setValue(value === "Error" ? '0' : value + '0')} />
            <input type="button" value="=" className="equal" onClick={() => {
              if (value.trim() === '' || value === "Error") return;
              try {
                setValue(eval(value).toString());
              } catch {
                setValue('Error');
              }
            }} />
            <input type="button" value="%" onClick={() => setValue(value === "Error" ? '%' : value + '%')} />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
