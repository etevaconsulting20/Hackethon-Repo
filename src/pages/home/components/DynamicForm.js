import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Searchbox } from "src/components/searchbox";
import { getNewsfeedAction } from "src/redux/thunks/homeThunk";
import { MdOutlineModeEdit, } from "react-icons/md";
import { TabAccordion } from "src/components/TabAccordion";
import CommonTabComponent from "src/components/schema/CommonTabComponent";
import { getProductTemplateSchemaAction } from "src/redux/thunks/homeThunk";
import _ from 'lodash'


const DynamicForm = () => {
  const [search, changeSearch] = useState("");
  const dispatch = useDispatch();
  const homeState = useSelector(state => state.home)
  const { newsFeedList, } = homeState
  
  useEffect(() => {
    dispatch(getProductTemplateSchemaAction())
  }, [])
  
  
  
  const selectedSchemaFlatten = _.get(homeState, 'selectedProductSchema.productFlattenSchema', [])
  

  const onChangeSearch = (e) => {
    let value = e.target.value;

    changeSearch(value);
  };



  return (
    <>
      <CommonTabComponent 
        isUpdate={false}
      />
    </>
  );
};
export default DynamicForm;
