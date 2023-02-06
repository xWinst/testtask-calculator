import { useState, useEffect } from 'react';
import s from './Slider.module.css';

const Slider = ({ name = '', min = 0, max, initialtValue = 0, onChange }) => {
  const [value, setValue] = useState(initialtValue);

  useEffect(() => {
    if (value > max) {
      setValue(max);
      onChange(max);
    }
  }, [max, value, onChange]);

  const handleChange = e => {
    setValue(Number(e.target.value));
    onChange(Number(e.target.value));
  };

  return (
    <div className={s.container}>
      <div className={s.titleBox}>
        <h2 className={s.title}>{name}:</h2>
        <span>{value} GB</span>
      </div>
      <input
        className={s.slider}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
      />
      <div className={s.legend}>
        <p className={s.min}>{min}</p>
        <p className={s.max}>{max}</p>
      </div>
    </div>
  );
};

export default Slider;
