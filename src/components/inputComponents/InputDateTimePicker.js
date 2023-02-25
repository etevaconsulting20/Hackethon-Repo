import React, { useEffect } from 'react';
import { MdTextFields } from "react-icons/md";
import { IoIosHelpCircleOutline } from "react-icons/io";
import CustomTooltip from './CustomTooltip';
import dayjs from 'dayjs';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
// import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
// import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker';


export function InputDateTimePicker(props) {
  const {
    name, label, value, className,
    readOnly, showToolTip, tooltipText, errorMsg, onChange, onBlur,
    error, touched, isAllTouched,
    showTranslation, isShowAiDataIcon, onClickAiDataIcon, aiIconHoverText,
  } = props;



  const handleChange = (newValue) => {
    /**
    const date1 = newValue.toISOString();
    const date2 = newValue.toJSON();
    */

    const event = {
      target: {
        name: name,
        value: newValue.toJSON() // dayjs 
      }
    }
    onChange({ ...event, type: "change" })
    onBlur({ ...event, type: "blur" })
  };


  const dayjsValue = value ? dayjs(value) : dayjs()

  return (
    <div className={`form-group inputDateTimePicker col-lg-6 col-md-6 col-sm-6 col-xs-6 ${className ? className : ""}`}>
      <div className="col inputTextWithLabel__label">
        <label >
          {label}
        </label>
        {showTranslation && <MdTextFields />}
        {
          tooltipText &&
          <CustomTooltip
            tooltipContent={<p>{tooltipText}</p>}
          />
        }

      </div>
      <div>
        <div className='inputDateTimePicker__inputwrapper'>
          <LocalizationProvider dateAdapter={AdapterDayjs} >
            <Stack spacing={3}>
              <DesktopDatePicker
                // label="Date desktop"
                inputFormat="DD/MM/YYYY"
                value={dayjsValue}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              {/* <MobileDatePicker
                label="Date mobile"
                inputFormat="DD/MM/YYYY"
                value={dayjsValue}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <TimePicker
                label="Time"
                value={dayjsValue}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
              <DateTimePicker
                label="Date&Time picker"
                value={dayjsValue}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              /> */}
            </Stack>
          </LocalizationProvider>
        </div>
        <div className="text-danger">
          {(isAllTouched || touched) && error}
        </div>
      </div>

    </div>
  );
}