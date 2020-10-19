import React from 'react'
import Select from '../../Select/Select'
import styles from './index.module.scss'

const Option = ({ style, option, selectValue }) => {
  const { name, ticker, logoUrl } = option
  return (
    <div
      key={name}
      style={style}
      onClick={() => selectValue(option)}
      className={styles.project}
    >
      <img
        className={styles.icon}
        alt='Logo'
        src={logoUrl || '/asset-fallback.svg'}
      />
      {name}
      <span className={styles.ticker}>{ticker}</span>
    </div>
  )
}

const Selector = ({ value, options, onChange }) => {
  return (
    <Select
      searchable
      topDropdown
      placeholder='Select a chart project'
      value={value}
      options={options}
      valueKey='name'
      labelKey='name'
      optionRenderer={Option}
      onChange={onChange}
    />
  )
}

export default Selector
