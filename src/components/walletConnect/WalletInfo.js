import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useWeb3React } from "@web3-react/core";
import { truncateAddress } from './CommonFunction';

const ITEM_HEIGHT = 40;
const ITEM_PADDING_TOP = 0;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};



export default function MultipleSelectPlaceholder() {
  const [personName, setPersonName] = React.useState([]);

  const { account, deactivate} = useWeb3React()

  const handleChange = (event) => { 
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  return (
    <div>
      <FormControl>
        <Select
          multiple
          displayEmpty
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput />}
          style={styles.mainHeader}
          renderValue={(selected) => {
            if (selected.length === 0) {
              return <em>{truncateAddress(account)}</em>;
            }

            return selected.join(', ');
          }}
          MenuProps={MenuProps}
          inputProps={{ 'aria-label': 'Without label' }}
        >
            <MenuItem
            style={{background:"#7237AB", color: "#fff"}}
            onClick={() => {
              console.log("disconnect clicked ===>")
              deactivate()
              localStorage.setItem('isWalletConnected', true)
            }}
            >
            Disconnect
            </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

const styles = {
    mainHeader :{
        // backgroundColor: '#20c6d2',
        // borderRadius: '50px',
        color: '#fff',
        padding: '1.3rem 0 0 0',
        fontSize: '16px',
        fontWeight: '600',
        width: '9.5rem',
        height: '1.3rem',
    }
}