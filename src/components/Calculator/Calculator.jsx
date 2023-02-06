import { useState } from 'react';
import { Chart, Slider } from 'components';
import s from './Calculator.module.css';

const Calculator = () => {
  const [storage, setStorage] = useState(0);
  const [transfer, setTransfer] = useState(0);

  return (
    <div className={s.container}>
      <Chart storage={storage} transfer={transfer} />
      <div className={s.sliderBox}>
        <Slider
          name="storage"
          max={1000}
          onChange={value => setStorage(value)}
        />
        <Slider
          name="transfer"
          max={1000}
          onChange={value => setTransfer(value)}
        />
      </div>
    </div>
  );
};

export default Calculator;
