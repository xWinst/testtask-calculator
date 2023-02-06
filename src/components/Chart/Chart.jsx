import { useState, useEffect } from 'react';
import conditions from 'db/conditions.json';
import s from './Chart.module.css';

import * as icons from 'images';
import { useWidth } from 'hooks/useWidth';

const Chart = ({ storage, transfer }) => {
  const [price, setPrice] = useState([]);
  const [optionsIndexes, setOptionsIndexes] = useState([0, 0, 0, 0]);
  const width = useWidth();

  useEffect(() => {
    const result = conditions.map((condition, index) => {
      let finalPrice;
      const freeStorage = condition.freeStorage || 0;
      const freeTransfer = condition.freeStorage || 0;

      const options = Object.keys(condition.storage);
      finalPrice =
        (storage - freeStorage) *
          condition.storage[options[optionsIndexes[index]]] +
        (transfer - freeTransfer) * condition.transfer;

      if (condition.minPayment && finalPrice < condition.minPayment) {
        finalPrice = condition.minPayment;
      }
      if (condition.maxPayment && finalPrice > condition.maxPayment) {
        finalPrice = condition.maxPayment;
      }

      if (finalPrice < 0) finalPrice = 0;

      return Math.round(finalPrice * 100) / 100;
    });
    setPrice(result);
  }, [storage, transfer, optionsIndexes]);

  const getStyle = index => {
    const maxSize = width < 768 ? 200 : 400;
    const size = (price[index] / Math.max(...price)) * maxSize;
    const backgroundColor =
      price[index] === Math.min(...price) ? conditions[index].color : 'grey';
    if (width < 768) {
      return { width: 30, height: size, backgroundColor };
    }
    return { width: size, height: 30, backgroundColor };
  };

  const changeOption = (index, selectedOption) => {
    const newOptionIndexes = optionsIndexes.map((optionIndex, i) =>
      i === index ? selectedOption : optionIndex
    );
    setOptionsIndexes(newOptionIndexes);
  };

  const getOptions = index => {
    const options = Object.keys(conditions[index].storage);

    if (options.length < 2) return [];

    return options.map((option, i) => (
      <label key={option} className={s.radioBtn}>
        <input
          className={s.radio}
          name={`${conditions[index].provider}`}
          type="radio"
          checked={i === optionsIndexes[index]}
          onChange={() => changeOption(index, i)}
        />
        {option}
      </label>
    ));
  };

  return (
    <>
      <ul className={s.list}>
        {price.map((cost, index) => {
          const provider = conditions[index].provider;
          return (
            <li key={provider} className={s.item}>
              <div className={s.provider}>
                <p>{provider}</p>
                <div className={s.options}>{getOptions(index)}</div>
              </div>
              <img src={icons[provider]} alt="icon" width={30} />
              <div style={getStyle(index)}></div>
              <p>{cost}$</p>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default Chart;
